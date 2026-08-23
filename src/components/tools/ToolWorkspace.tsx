import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Loader2,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";
import { UploadZone } from "./UploadZone";
import { FileList } from "./FileList";
import { ImageGrid, ImageLightbox, type ImageItem } from "./ImageGrid";
import { formatBytes } from "@/lib/format";
import { track } from "@/lib/analytics";
import { operations, ProcessingError, type ProcessedOutput } from "@/lib/pdf/operations";
import { isImageWorkspace, type ToolDefinition } from "@/lib/tools";

type Status = "empty" | "ready" | "processing" | "success" | "error";

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

export function ToolWorkspace({ tool }: { tool: ToolDefinition }) {
  const imageMode = isImageWorkspace(tool);
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
        const url = URL.createObjectURL(file);
        thumbUrls.current.push(url);
        const size = await readImageSize(url);
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
      setOutputs(result);
      setUrls(result.map((output) => URL.createObjectURL(output.blob)));
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
    <section aria-labelledby="workspace" className="card-soft border-primary/25 p-4 sm:p-6 lg:p-8">
      <h2 id="workspace" className="sr-only">
        {tool.name} workspace
      </h2>

      <div aria-live="polite" className="space-y-5">
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

            {tool.options && tool.options.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2">
                {tool.options.map((option) => (
                  <div key={option.key}>
                    <label
                      htmlFor={`option-${option.key}`}
                      className="mb-1.5 block text-sm font-medium text-foreground"
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
                        className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
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
                        className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
                      />
                    )}
                    {option.help && (
                      <p className="mt-1.5 text-xs text-muted-foreground">{option.help}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {status === "error" && message && (
              <p
                role="alert"
                className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
              >
                <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {message}
              </p>
            )}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-muted-foreground">{tool.outputHint}</p>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
                >
                  Start over
                </button>
                <button
                  type="button"
                  onClick={run}
                  className="rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
                >
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
              className="flex items-start gap-2 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive"
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
          <div className="rounded-2xl bg-mint px-6 py-10 text-center">
            <Loader2 className="mx-auto h-9 w-9 animate-spin text-primary" aria-hidden="true" />
            <p className="mt-4 text-base font-bold text-foreground">Processing your files…</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {stage ?? `${tool.actionLabel} · ${activeFiles.length} file(s)`}
            </p>
            <div className="mx-auto mt-5 h-2.5 w-full max-w-md overflow-hidden rounded-full bg-card shadow-inner">
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
            <p className="mt-2 text-xs font-semibold text-primary">
              {Math.round(progress * 100)}% completed
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="rounded-2xl bg-mint px-6 py-10 text-center">
            <span className="mx-auto flex h-16 w-16 animate-in zoom-in items-center justify-center rounded-2xl bg-card text-primary shadow-soft">
              <CheckCircle2 className="h-8 w-8" aria-hidden="true" />
            </span>
            <p className="mt-4 text-xl font-bold text-foreground">Your file is ready</p>
            <p className="mt-1 text-sm text-muted-foreground">
              {outputs.length} {outputs.length === 1 ? "output" : "outputs"} ·{" "}
              {formatBytes(totalOutputSize)}
            </p>
            {tool.slug === "compress-pdf" && inputBytes > 0 && (
              <p className="mt-2 text-sm font-medium text-foreground">
                {formatBytes(inputBytes)} → {formatBytes(totalOutputSize)}{" "}
                {savedPercent > 0 ? (
                  <span className="text-primary font-semibold">({savedPercent}% smaller)</span>
                ) : (
                  <span className="text-muted-foreground">
                    (already well optimised — try a stronger level)
                  </span>
                )}
              </p>
            )}
            <div className="mt-6 flex flex-col items-center gap-3">
              {outputs.map((output, index) => (
                <a
                  key={output.name}
                  href={urls[index]}
                  download={output.name}
                  onClick={() => track("download_clicked", { tool: tool.slug })}
                  className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
                >
                  <Download className="h-5 w-5" aria-hidden="true" />
                  Download {output.name.split(".").pop()?.toUpperCase() || "PDF"}
                </a>
              ))}
              <p className="max-w-sm break-all text-xs text-muted-foreground">
                {outputs.map((o) => o.name).join(", ")}
              </p>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                <RefreshCw className="h-4 w-4" aria-hidden="true" />
                Process another file
              </button>
            </div>
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
