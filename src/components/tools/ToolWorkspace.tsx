import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Loader2,
  RefreshCw,
  ShieldCheck,
  SlidersHorizontal,
} from "lucide-react";
import { UploadZone } from "./UploadZone";
import { FileList } from "./FileList";
import { ImageGrid, ImageLightbox, type ImageItem } from "./ImageGrid";
import { formatBytes } from "@/lib/format";
import { track } from "@/lib/analytics";
import { operations, ProcessingError, type ProcessedOutput } from "@/lib/pdf/operations";
import { isImageWorkspace, type ToolDefinition } from "@/lib/tools";
import { RelatedTools } from "./ToolSections";

type Status = "empty" | "ready" | "processing" | "success" | "error";
type RenamedFile = File & { isRenamedByUser?: boolean };

const MAX_FILE_BYTES = 100 * 1024 * 1024;

function validate(files: File[], tool: ToolDefinition): string | null {
  const patterns = tool.accept.split(",").map((entry) => entry.trim().toLowerCase());
  for (const file of files) {
    const extension = `.${file.name.split(".").pop()?.toLowerCase() ?? ""}`;
    const matches = patterns.some((pattern) =>
      pattern.startsWith(".") ? pattern === extension : file.type.toLowerCase() === pattern,
    );
    if (!matches) return `“${file.name}” isn't supported here. Expected ${tool.acceptLabel}.`;
    if (file.size > MAX_FILE_BYTES) {
      return `“${file.name}” is ${formatBytes(file.size)}, larger than the current ${formatBytes(MAX_FILE_BYTES)} limit.`;
    }
    if (file.size === 0) return `“${file.name}” appears to be empty.`;
  }
  return null;
}

const readImageSize = (url: string) =>
  new Promise<{ width: number; height: number }>((resolve) => {
    const image = new Image();
    image.onload = () => resolve({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => resolve({ width: 0, height: 0 });
    image.src = url;
  });

export function ToolWorkspace({
  tool,
  onHasFilesChange,
}: {
  tool: ToolDefinition;
  onHasFilesChange?: (hasFiles: boolean) => void;
}) {
  const imageMode = isImageWorkspace(tool) || tool.slug === "rotate-pdf";
  const [files, setFiles] = useState<File[]>([]);
  const [items, setItems] = useState<ImageItem[]>([]);
  const [preview, setPreview] = useState<ImageItem | null>(null);
  const [status, setStatus] = useState<Status>("empty");
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [outputs, setOutputs] = useState<ProcessedOutput[]>([]);
  const [urls, setUrls] = useState<string[]>([]);
  const [inputBytes, setInputBytes] = useState(0);
  const [optionValues, setOptionValues] = useState<Record<string, string>>(() =>
    Object.fromEntries((tool.options ?? []).map((option) => [option.key, option.defaultValue])),
  );
  const thumbUrls = useRef<string[]>([]);

  useEffect(() => () => urls.forEach((url) => URL.revokeObjectURL(url)), [urls]);
  useEffect(
    () => () => {
      thumbUrls.current.forEach((url) => URL.revokeObjectURL(url));
    },
    [],
  );

  const activeFiles = imageMode ? items.map((item) => item.file) : files;

  const reset = useCallback(() => {
    setFiles([]);
    setItems([]);
    setPreview(null);
    setOutputs([]);
    setUrls((current) => {
      current.forEach((url) => URL.revokeObjectURL(url));
      return [];
    });
    thumbUrls.current.forEach((url) => URL.revokeObjectURL(url));
    thumbUrls.current = [];
    setMessage(null);
    setStage(null);
    setProgress(0);
    setStatus("empty");
  }, []);

  const addFiles = async (incoming: File[]) => {
    const existing = activeFiles;
    const next = tool.multiple ? [...existing, ...incoming] : incoming.slice(0, 1);
    const error = validate(next, tool);
    if (error) {
      setMessage(error);
      setStatus("error");
      return;
    }

    if (imageMode) {
      const added: ImageItem[] = [];
      for (const [index, file] of incoming.entries()) {
        let url: string = "";
        let size = { width: 0, height: 0 };
        try {
          if (tool.slug === "rotate-pdf") {
            const { generatePdfThumbnail } = await import("@/lib/pdf/operations");
            const blob = await generatePdfThumbnail(file);
            url = URL.createObjectURL(blob);
            size = await readImageSize(url);
          } else {
            url = URL.createObjectURL(file);
            size = await readImageSize(url);
          }
        } catch (e) {
          console.error("Error generating thumbnail:", e);
          setMessage("Failed to generate PDF thumbnail. Check the browser console for details.");
          setStatus("error");
          return;
        }
        thumbUrls.current.push(url);
        added.push({
          id: `${file.name}-${file.size}-${Date.now()}-${index}`,
          file,
          url,
          rotation: 0,
          ...size,
        });
      }
      setItems((current) => (tool.multiple ? [...current, ...added] : added.slice(0, 1)));
    } else {
      setFiles(next);
    }
    setMessage(null);
    setStatus("ready");
  };

  const run = async () => {
    if (!tool.operation) return;
    const target = activeFiles;
    const error = validate(target, tool);
    if (error) {
      setMessage(error);
      setStatus("error");
      return;
    }
    const missing = (tool.options ?? []).find(
      (option) => option.required && !(optionValues[option.key] ?? "").trim(),
    );
    if (missing) {
      setMessage(`Please fill in “${missing.label}” before continuing.`);
      setStatus("error");
      return;
    }

    setStatus("processing");
    setProgress(0.02);
    setStage("Starting process...");
    setMessage(null);
    setInputBytes(target.reduce((sum, file) => sum + file.size, 0));
    track("conversion_started", { tool: tool.slug, files: target.length });

    try {
      const result = await operations[tool.operation](target, {
        onProgress: (fraction) => setProgress(Math.max(0.05, Math.min(1, fraction))),
        onStage: (text) => setStage(text),
        options: optionValues,
        ...(imageMode ? { rotations: items.map((item) => item.rotation) } : {}),
      });

      // Smart-rename: If the user explicitly renamed a file, we respect their exact name
      // instead of appending suffixes like "-rotated", ONLY if the tool produces a 1:1 output.
      const smartResult = result.map((output, i) => {
        const original = target[i];
        if (
          result.length === target.length &&
          original &&
          (original as RenamedFile).isRenamedByUser
        ) {
          const outExt = output.name.match(/\.[^.]+$/)?.[0] || "";
          const newBase = original.name.replace(/\.[^.]+$/, "");
          return { ...output, name: `${newBase}${outExt}` };
        }
        return output;
      });

      setOutputs(smartResult);
      setUrls(smartResult.map((output) => URL.createObjectURL(output.blob)));
      setStatus("success");
      setProgress(1);
      setStage(null);
      track("conversion_completed", { tool: tool.slug, outputs: result.length });
    } catch (caught) {
      if (!(caught instanceof ProcessingError)) console.error(caught);
      const text =
        caught instanceof ProcessingError
          ? caught.message
          : "We couldn't process this file. Please try again with a different file.";
      setMessage(text);
      setStatus("error");
      setStage(null);
      track("conversion_failed", { tool: tool.slug });
    }
  };

  const totalOutputSize = useMemo(
    () => outputs.reduce((sum, output) => sum + output.blob.size, 0),
    [outputs],
  );
  const savedPercent =
    inputBytes > 0 && totalOutputSize > 0
      ? Math.round((1 - totalOutputSize / inputBytes) * 100)
      : 0;
  const hasFiles = imageMode ? items.length > 0 : files.length > 0;

  useEffect(() => {
    onHasFilesChange?.(hasFiles);
  }, [hasFiles, onHasFilesChange]);

  if (tool.status === "soon") {
    return (
      <section aria-labelledby="workspace" className="card-soft border-primary/25 p-6 sm:p-8">
        <h2 id="workspace" className="sr-only">
          {tool.name} status
        </h2>
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-mint px-6 py-10 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-card text-primary shadow-soft">
            <Clock className="h-7 w-7" aria-hidden="true" />
          </span>
          <p className="text-lg font-semibold text-foreground">{tool.name} is in development</p>
          <p className="max-w-md text-sm text-muted-foreground">
            This tool is currently in active development. All our converting, merging, splitting,
            compression, Word, OCR and unlock tools are 100% live and ready to use in your browser
            today.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section
      id="workspace-section"
      aria-labelledby="workspace"
      className={`rounded-[2.5rem] border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-soft ${
        hasFiles && tool.slug === "rotate-pdf" ? "p-4 sm:p-6 lg:p-7" : "p-6 sm:p-10"
      }`}
    >
      <h2 id="workspace" className="sr-only">
        {tool.name} workspace
      </h2>

      <div aria-live="polite" className="space-y-6">
        {status === "empty" && (
          <UploadZone
            accept={tool.accept}
            acceptLabel={tool.acceptLabel}
            multiple={tool.multiple}
            ctaLabel={tool.ctaLabel}
            onFiles={addFiles}
          />
        )}

        {(status === "ready" || status === "error") && hasFiles && (
          <>
            {imageMode ? (
              <ImageGrid
                items={items}
                onPreview={setPreview}
                onRotate={(id) =>
                  setItems((current) =>
                    current.map((item) =>
                      item.id === id ? { ...item, rotation: (item.rotation + 90) % 360 } : item,
                    ),
                  )
                }
                onRotateAll={() =>
                  setItems((current) =>
                    current.map((item) => ({ ...item, rotation: (item.rotation + 90) % 360 })),
                  )
                }
                onSetRotation={(id, angle) =>
                  setItems((current) =>
                    current.map((item) =>
                      item.id === id ? { ...item, rotation: angle % 360 } : item,
                    ),
                  )
                }
                onClearAll={reset}
                onRemove={(id) =>
                  setItems((current) => {
                    const next = current.filter((item) => item.id !== id);
                    if (!next.length) setStatus("empty");
                    setMessage(null);
                    return next;
                  })
                }
                onReorder={(from, to) =>
                  setItems((current) => {
                    const next = [...current];
                    const [moved] = next.splice(from, 1);
                    next.splice(to, 0, moved!);
                    return next;
                  })
                }
                onRename={(id, newName) =>
                  setItems((current) =>
                    current.map((item) => {
                      if (item.id === id) {
                        const ext = item.file.name.match(/\.[^.]+$/)?.[0] || "";
                        const newFile = new File([item.file], `${newName}${ext}`, {
                          type: item.file.type,
                        });
                        (newFile as RenamedFile).isRenamedByUser = true;
                        return { ...item, file: newFile };
                      }
                      return item;
                    }),
                  )
                }
                hideBadge={tool.slug === "rotate-pdf"}
                isPdfMode={tool.slug === "rotate-pdf"}
                pageSelection={optionValues["pages"] ?? ""}
                onPageSelectionChange={(pages) => setOptionValues((cur) => ({ ...cur, pages }))}
              />
            ) : (
              <FileList
                files={files}
                reorder={tool.reorder}
                onRemove={(index) => {
                  const next = files.filter((_, i) => i !== index);
                  setFiles(next);
                  setStatus(next.length ? "ready" : "empty");
                  setMessage(null);
                }}
                onMove={(index, direction) => {
                  const target = index + direction;
                  if (target < 0 || target >= files.length) return;
                  const next = [...files];
                  const [moved] = next.splice(index, 1);
                  next.splice(target, 0, moved!);
                  setFiles(next);
                }}
              />
            )}

            {tool.options && tool.options.length > 0 && tool.slug !== "rotate-pdf" && (
              <div className="grid gap-4 sm:grid-cols-2">
                {tool.options.map((option) => {
                  const val = optionValues[option.key] ?? option.defaultValue;
                  const numVal = Number(val);

                  if (option.type === "range") {
                    const isLow = numVal < 40;
                    const isMed = numVal >= 40 && numVal <= 75;

                    // Color helpers
                    const levelColor = isLow
                      ? { badge: "bg-sky-100 text-sky-700 border-sky-200", pct: "bg-sky-50 text-sky-700 border-sky-300", accent: "accent-sky-500" }
                      : isMed
                        ? { badge: "bg-emerald-100 text-emerald-700 border-emerald-200", pct: "bg-emerald-50 text-emerald-700 border-emerald-300", accent: "accent-emerald-600" }
                        : { badge: "bg-orange-100 text-orange-700 border-orange-200", pct: "bg-orange-50 text-orange-700 border-orange-300", accent: "accent-orange-500" };

                    return (
                      <div
                        key={option.key}
                        className="col-span-full rounded-2xl border border-border/80 bg-secondary/30 p-4 sm:p-5"
                      >
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <label
                            htmlFor={`option-${option.key}`}
                            className="text-sm font-bold text-forest flex items-center gap-2"
                          >
                            <span>{option.label}</span>
                            <span className={`rounded-md px-2 py-0.5 text-xs font-extrabold border transition-colors ${levelColor.pct}`}>
                              {val}%
                            </span>
                          </label>

                          <span
                            className={`rounded-full px-3 py-1 text-xs font-bold border transition-all ${levelColor.badge}`}
                          >
                            {isLow
                              ? "🟦 Light — High Quality"
                              : isMed
                                ? "🟢 Balanced — Recommended"
                                : "🟠 Strong — Smallest File"}
                          </span>
                        </div>

                        {/* Slide bar */}
                        <div className="relative py-2">
                          <input
                            id={`option-${option.key}`}
                            type="range"
                            min={option.min ?? 10}
                            max={option.max ?? 95}
                            step={option.step ?? 5}
                            value={val}
                            onChange={(event) =>
                              setOptionValues((current) => ({
                                ...current,
                                [option.key]: event.target.value,
                              }))
                            }
                            className={`w-full h-2.5 bg-card border border-border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${levelColor.accent}`}
                          />
                          <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mt-2">
                            <span>🔵 Less compression (Sharpest detail)</span>
                            <span>Smaller file (More compression) 🔴</span>
                          </div>
                        </div>

                        {/* Quick Presets */}
                        <div className="mt-3 flex flex-wrap items-center gap-2 pt-3 border-t border-border/60">
                          <span className="text-xs text-muted-foreground font-medium mr-1">Presets:</span>
                          {[
                            { label: "🟦 Light (30%)", val: "30", active: "bg-sky-500 text-white border-sky-600", hover: "hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300" },
                            { label: "🟢 Balanced (65%)", val: "65", active: "bg-emerald-500 text-white border-emerald-600", hover: "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300" },
                            { label: "🟠 Strong (85%)", val: "85", active: "bg-orange-500 text-white border-orange-600", hover: "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300" },
                          ].map((p) => {
                            const isSelected = val === p.val;
                            return (
                              <button
                                key={p.val}
                                type="button"
                                onClick={() =>
                                  setOptionValues((current) => ({
                                    ...current,
                                    [option.key]: p.val,
                                  }))
                                }
                                className={`rounded-xl px-3 py-1.5 text-xs font-semibold border transition-all ${
                                  isSelected
                                    ? `${p.active} shadow-sm scale-[1.02]`
                                    : `bg-card border-border text-foreground ${p.hover}`
                                }`}
                              >
                                {p.label}
                              </button>
                            );
                          })}
                        </div>

                        {option.help && (
                          <p className="mt-2.5 text-xs text-muted-foreground leading-relaxed">
                            {option.help}
                          </p>
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={option.key}>
                      <label
                        htmlFor={`option-${option.key}`}
                        className="mb-1.5 block text-sm font-semibold text-forest"
                      >
                        {option.label}
                      </label>
                      {option.type === "select" ? (
                        <select
                          id={`option-${option.key}`}
                          value={optionValues[option.key] ?? option.defaultValue}
                          onChange={(event) =>
                            setOptionValues((current) => ({
                              ...current,
                              [option.key]: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-border/80 bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          {option.choices?.map((choice) => (
                            <option key={choice.value} value={choice.value}>
                              {choice.label}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          id={`option-${option.key}`}
                          type={option.type === "password" ? "password" : "text"}
                          autoComplete={option.type === "password" ? "off" : undefined}
                          value={optionValues[option.key] ?? ""}
                          placeholder={option.placeholder}
                          onChange={(event) =>
                            setOptionValues((current) => ({
                              ...current,
                              [option.key]: event.target.value,
                            }))
                          }
                          className="w-full rounded-2xl border border-border/80 bg-card px-3.5 py-2.5 text-sm text-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      )}
                      {option.help && (
                        <p className="mt-1.5 text-xs text-muted-foreground">{option.help}</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {status === "error" && message && (
              <p
                role="alert"
                className="flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {message}
              </p>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-border/70 pt-4">
              <p className="text-xs font-medium text-muted-foreground">{tool.outputHint}</p>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-2xl border border-border/80 bg-card px-5 py-3 text-sm font-semibold text-muted-foreground transition-all hover:bg-secondary hover:text-forest"
                >
                  Start over
                </button>
                <button
                  type="button"
                  onClick={run}
                  className="inline-flex items-center gap-2 rounded-2xl bg-primary px-7 py-3.5 text-base font-bold text-primary-foreground shadow-lift transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                >
                  <RefreshCw className="h-4 w-4" />
                  {tool.actionLabel}
                </button>
              </div>
            </div>

            {tool.multiple && (
              <UploadZone
                compact
                accept={tool.accept}
                acceptLabel={tool.acceptLabel}
                multiple
                ctaLabel="Add more files"
                onFiles={addFiles}
              />
            )}
          </>
        )}

        {status === "error" && !hasFiles && (
          <>
            <p
              role="alert"
              className="flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm font-medium text-destructive"
            >
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              {message}
            </p>
            <UploadZone
              accept={tool.accept}
              acceptLabel={tool.acceptLabel}
              multiple={tool.multiple}
              ctaLabel={tool.ctaLabel}
              onFiles={addFiles}
            />
          </>
        )}

        {status === "processing" && (
          <div className="rounded-3xl border border-primary/20 bg-gradient-to-b from-mint/50 via-card to-card px-6 py-12 text-center shadow-soft">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-primary shadow-soft ring-1 ring-primary/20">
              <Loader2 className="h-8 w-8 animate-spin text-primary" aria-hidden="true" />
            </div>
            <p className="mt-5 text-lg font-extrabold text-forest">Processing your PDF…</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {stage ?? `${tool.actionLabel} · ${activeFiles.length} file(s)`}
            </p>
            <div className="mx-auto mt-6 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-mint shadow-inner">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${Math.round(progress * 100)}%` }}
                role="progressbar"
                aria-valuenow={Math.round(progress * 100)}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label="Processing progress"
              />
            </div>
            <p className="mt-2.5 text-xs font-bold text-primary">
              {Math.round(progress * 100)}% completed
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="rounded-[2rem] border border-border bg-gradient-to-br from-secondary/50 via-card to-card p-6 shadow-sm animate-in zoom-in-95 duration-300">

            {/* Horizontal success banner */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              {/* Left: icon + text */}
              <div className="flex items-center gap-4">
                <div className="relative shrink-0 flex h-14 w-14 items-center justify-center">
                  <span className="absolute inset-0 rounded-full bg-primary/20 animate-ping opacity-30" />
                  <span className="relative flex h-14 w-14 items-center justify-center rounded-[1.25rem] bg-primary text-primary-foreground shadow-sm">
                    <CheckCircle2 className="h-7 w-7" aria-hidden="true" />
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-lg font-extrabold text-forest">
                    {tool.slug === "rotate-pdf" ? "Your rotated PDF is ready!" : "Your file is ready!"}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                    <span className="truncate max-w-[200px] font-medium text-forest/90" title={outputs[0]?.name}>
                      {outputs[0]?.name}
                    </span>
                    <span className="opacity-60">·</span>
                    <span>{formatBytes(totalOutputSize)}</span>
                    <span className="inline-flex items-center rounded-md bg-secondary px-2 py-0.5 font-bold text-primary">
                      {tool.slug === "rotate-pdf"
                        ? `Rotated ${items[0]?.rotation || 90}°`
                        : "Processed"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: action buttons */}
              <div className="flex shrink-0 items-center gap-2.5">
                {outputs.map((output, index) => (
                  <a
                    key={output.name}
                    href={urls[index]}
                    download={output.name}
                    onClick={() => track("download_clicked", { tool: tool.slug })}
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary-dark hover:shadow-soft active:scale-[0.98]"
                  >
                    <Download className="h-4 w-4" aria-hidden="true" />
                    Download
                  </a>
                ))}
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex h-[44px] w-[44px] items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-all duration-300 hover:border-primary/40 hover:bg-secondary hover:text-primary"
                  title="Start over with a new file"
                >
                  <RefreshCw className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            </div>

            {tool.slug === "compress-pdf" && inputBytes > 0 && (
              <p className="mt-3 border-t border-border/60 pt-3 text-sm font-semibold text-foreground">
                {formatBytes(inputBytes)} → {formatBytes(totalOutputSize)}{" "}
                {savedPercent > 0 ? (
                  <span className="text-primary font-bold">({savedPercent}% smaller)</span>
                ) : (
                  <span className="text-muted-foreground">
                    (already well optimised — try a stronger level)
                  </span>
                )}
              </p>
            )}

            {/* Option to change compression level after compression */}
            {tool.slug === "compress-pdf" && (() => {
              const reLevel = Number(optionValues["level"] ?? "65");
              const reIsLow = reLevel < 40;
              const reIsMed = reLevel >= 40 && reLevel <= 75;
              const reLevelColor = reIsLow
                ? { pct: "bg-sky-50 text-sky-700 border-sky-300", badge: "bg-sky-100 text-sky-700 border-sky-200", accent: "accent-sky-500", label: "🟦 Light — High Quality" }
                : reIsMed
                  ? { pct: "bg-emerald-50 text-emerald-700 border-emerald-300", badge: "bg-emerald-100 text-emerald-700 border-emerald-200", accent: "accent-emerald-600", label: "🟢 Balanced — Recommended" }
                  : { pct: "bg-orange-50 text-orange-700 border-orange-300", badge: "bg-orange-100 text-orange-700 border-orange-200", accent: "accent-orange-500", label: "🟠 Strong — Smallest File" };
              return (
              <div className="mt-5 rounded-2xl border border-primary/20 bg-secondary/30 p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <SlidersHorizontal className="h-4 w-4" />
                    </span>
                    <div>
                      <span className="text-sm font-bold text-forest block">Change Compression Level</span>
                      <span className="text-[11px] text-muted-foreground">Adjust slider to get a smaller file or sharper quality</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`rounded-full px-3 py-0.5 text-xs font-bold border transition-all ${reLevelColor.badge}`}>
                      {reLevelColor.label}
                    </span>
                    <span className={`rounded-md px-2.5 py-0.5 text-xs font-extrabold border transition-colors ${reLevelColor.pct}`}>
                      {optionValues["level"] ?? "85"}%
                    </span>
                  </div>
                </div>

                {/* Slider bar */}
                <div className="py-2">
                  <input
                    type="range"
                    min={10}
                    max={95}
                    step={5}
                    value={optionValues["level"] ?? "85"}
                    onChange={(event) =>
                      setOptionValues((current) => ({
                        ...current,
                        level: event.target.value,
                      }))
                    }
                    className={`w-full h-2.5 bg-card border border-border rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${reLevelColor.accent}`}
                  />
                  <div className="flex justify-between text-[11px] font-semibold text-muted-foreground mt-1.5">
                    <span>🔵 Less compression (High quality)</span>
                    <span>Smaller file (More compression) 🔴</span>
                  </div>
                </div>

                {/* Presets & Re-compress button */}
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border/60">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs text-muted-foreground font-medium mr-1">Presets:</span>
                    {[
                      { label: "🟦 Light (30%)", val: "30", active: "bg-sky-500 text-white border-sky-600", hover: "hover:bg-sky-50 hover:text-sky-700 hover:border-sky-300" },
                      { label: "🟢 Balanced (65%)", val: "65", active: "bg-emerald-500 text-white border-emerald-600", hover: "hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300" },
                      { label: "🟠 Strong (85%)", val: "85", active: "bg-orange-500 text-white border-orange-600", hover: "hover:bg-orange-50 hover:text-orange-700 hover:border-orange-300" },
                    ].map((p) => {
                      const isSelected = (optionValues["level"] ?? "85") === p.val;
                      return (
                        <button
                          key={p.val}
                          type="button"
                          onClick={() =>
                            setOptionValues((current) => ({
                              ...current,
                              level: p.val,
                            }))
                          }
                          className={`rounded-xl px-2.5 py-1 text-xs font-semibold border transition-all ${
                            isSelected
                              ? `${p.active} shadow-sm scale-[1.02]`
                              : `bg-card border-border text-foreground ${p.hover}`
                          }`}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    onClick={run}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-lift transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <RefreshCw className="h-3.5 w-3.5" />
                    Re-compress with this level
                  </button>
                </div>
              </div>
              );
            })()}

            {/* Related Tools — shown immediately after success */}
            {tool.related && tool.related.length > 0 && (
              <div className="mt-5 border-t border-border/60 pt-4">
                <RelatedTools slugs={tool.related} compact />
              </div>
            )}
          </div>
        )}
      </div>

      {preview && <ImageLightbox item={preview} onClose={() => setPreview(null)} />}

      <p className="mt-5 flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
        Files are processed securely in your browser and are never uploaded to our servers.
      </p>
    </section>
  );
}
