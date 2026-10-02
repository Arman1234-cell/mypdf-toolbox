import { useState, useMemo, useRef } from "react";
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  RotateCcw,
  X,
  Trash2,
  Maximize2,
  Pencil,
  FileCheck,
  Check,
  Sparkles,
  Layers,
} from "lucide-react";
import { formatBytes } from "@/lib/format";

export type ImageItem = {
  id: string;
  file: File;
  url: string;
  width: number;
  height: number;
  /** Clockwise rotation in degrees: 0, 90, 180 or 270. */
  rotation: number;
};

type Props = {
  items: ImageItem[];
  disabled?: boolean;
  onRotate: (id: string) => void;
  onRotateAll?: () => void;
  onSetRotation?: (id: string, angle: number) => void;
  onSetRotationAll?: (angle: number) => void;
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onPreview: (item: ImageItem) => void;
  hideBadge?: boolean;
  /** When true, shows PDF-specific UI (hides reorder hints, shows rotate controls) */
  isPdfMode?: boolean;
  /** Called when the user renames a file */
  onRename?: (id: string, newName: string) => void;
  /** Selective page targeting string (e.g. "1, 3, 5-8") */
  pageSelection?: string;
  onPageSelectionChange?: (pages: string) => void;
};

export function ImageGrid({
  items,
  disabled,
  onRotate,
  onRotateAll,
  onSetRotation,
  onSetRotationAll,
  onRemove,
  onClearAll,
  onReorder,
  onPreview,
  hideBadge,
  isPdfMode,
  onRename,
  pageSelection = "",
  onPageSelectionChange,
}: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [targetScope, setTargetScope] = useState<"all" | "custom">(() =>
    pageSelection ? "custom" : "all",
  );
  const renameInputRef = useRef<HTMLInputElement>(null);

  const totalBytes = useMemo(() => items.reduce((sum, item) => sum + item.file.size, 0), [items]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return;
    onReorder(from, to);
  };

  // Dedicated PDF Mode view (e.g. Rotate PDF tool)
  if (isPdfMode && items.length > 0) {
    const item = items[0]!;
    const currentRotation = item.rotation;

    const handleAngle = (angle: number) => {
      if (onSetRotation) {
        onSetRotation(item.id, angle);
      } else {
        // Fallback: rotate until target angle is reached
        const diff = (angle - (item.rotation % 360) + 360) % 360;
        const clicks = Math.round(diff / 90);
        for (let i = 0; i < clicks; i++) onRotate(item.id);
      }
    };

    return (
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* PDF Preview Showcase Card (Left Side on Desktop) */}
        <div className="flex-1 w-full overflow-hidden rounded-3xl border border-border/80 bg-card shadow-soft flex flex-col">
          {/* Card Header & Inline Rename */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 bg-mint/30 px-5 py-3.5">
            <div className="flex items-center gap-2.5 min-w-0">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary text-white shadow-xs">
                <FileCheck className="h-4 w-4" />
              </span>

              {editingId === item.id && onRename ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const val = renameInputRef.current?.value.trim();
                    if (val) onRename(item.id, val);
                    setEditingId(null);
                  }}
                  className="flex items-center gap-1.5"
                >
                  <input
                    ref={renameInputRef}
                    type="text"
                    defaultValue={item.file.name.replace(/\.[^.]+$/, "")}
                    autoFocus
                    onBlur={() => {
                      const val = renameInputRef.current?.value.trim();
                      if (val) onRename(item.id, val);
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="rounded-lg border border-primary bg-background px-2 py-1 text-xs font-semibold text-foreground outline-none focus:ring-2 focus:ring-primary/30"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-primary px-2 py-1 text-xs font-bold text-white shadow-xs"
                  >
                    Save
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-1.5 min-w-0">
                  <p
                    className="truncate text-sm font-bold text-forest max-w-[180px] sm:max-w-xs"
                    title={item.file.name}
                  >
                    {item.file.name}
                  </p>
                  {onRename && (
                    <button
                      type="button"
                      onClick={() => setEditingId(item.id)}
                      title="Rename output file"
                      className="animate-pencil-nudge shrink-0 rounded-lg bg-primary/10 p-1.5 text-primary hover:bg-primary hover:text-white transition-all duration-200 shadow-sm"
                    >
                      <Pencil className="h-3.5 w-3.5" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
              <span>{formatBytes(item.file.size)}</span>
              {currentRotation > 0 && (
                <span className="rounded-md bg-primary/10 px-2 py-0.5 font-bold text-primary">
                  +{currentRotation}°
                </span>
              )}
            </div>
          </div>

          {/* Interactive Preview Canvas */}
          <div className="relative flex min-h-[260px] sm:min-h-[300px] lg:min-h-[340px] w-full flex-1 items-center justify-center p-4 sm:p-6 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800/60 dark:to-slate-900/60 overflow-hidden">
            <div
              className="relative max-h-[280px] sm:max-h-[310px] max-w-[260px] sm:max-w-[320px] rounded-lg shadow-2xl transition-transform duration-300 ease-out"
              style={{ transform: `rotate(${currentRotation}deg)` }}
            >
              <img
                src={item.url}
                alt={item.file.name}
                loading="lazy"
                decoding="async"
                className="max-h-[260px] sm:max-h-[290px] w-auto rounded-lg object-contain bg-white"
              />
            </div>

            {/* Floating Quick Action Overlay */}
            <div className="absolute bottom-3 right-3 flex items-center gap-2">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onRotate(item.id)}
                title="Rotate +90° clockwise"
                className="flex items-center gap-1.5 rounded-xl bg-card/95 backdrop-blur px-3 py-1.5 text-xs font-bold text-forest shadow-lift hover:bg-primary hover:text-white transition-all duration-150"
              >
                <RotateCw className="h-4 w-4" />
                <span>+90°</span>
              </button>
              <button
                type="button"
                onClick={() => onPreview(item)}
                title="View full-size preview"
                className="rounded-xl bg-card/95 backdrop-blur p-1.5 text-muted-foreground shadow-lift hover:bg-secondary hover:text-forest transition-all duration-150"
              >
                <Maximize2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Rotation Preset Controls Card (Right Side on Desktop) */}
        <div className="w-full lg:w-[320px] xl:w-[350px] shrink-0 rounded-3xl border border-primary/20 bg-gradient-to-br from-mint/50 via-card to-lavender/30 p-4 sm:p-5 shadow-soft h-fit flex flex-col">
          <div className="flex flex-col gap-3 border-b border-border/60 pb-4">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary">
                <Sparkles className="h-3.5 w-3.5" /> Quick Controls
              </span>
              <h3 className="mt-1.5 text-base sm:text-lg font-extrabold text-forest">
                Rotation settings
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Click any angle to apply it.
              </p>
            </div>

            {/* Current rotation status pill & Trash */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-primary/25 bg-card px-2.5 py-1 text-xs font-bold text-forest shadow-xs">
                <RotateCw className="h-3.5 w-3.5 text-primary" />
                {currentRotation === 0
                  ? "Original (0°)"
                  : currentRotation === 90
                    ? "90° CW"
                    : currentRotation === 180
                      ? "180° Flip"
                      : "270° CW (-90°)"}
              </span>
              <button
                type="button"
                onClick={() => onRemove(item.id)}
                className="rounded-xl border border-border bg-card p-1.5 text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                title="Remove file"
                aria-label="Remove PDF file"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Quick preset buttons: 90, 180, 270 */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => handleAngle(90)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-3 py-3 text-sm font-bold transition-all duration-200 ${
                currentRotation === 90
                  ? "border-primary bg-primary text-white shadow-lift scale-[1.02]"
                  : "border-border/80 bg-card text-foreground hover:border-primary/40 hover:bg-mint/60"
              }`}
            >
              <RotateCw className="h-5 w-5" />
              <span>90° Right</span>
            </button>

            <button
              type="button"
              onClick={() => handleAngle(180)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-3 py-3 text-sm font-bold transition-all duration-200 ${
                currentRotation === 180
                  ? "border-primary bg-primary text-white shadow-lift scale-[1.02]"
                  : "border-border/80 bg-card text-foreground hover:border-primary/40 hover:bg-mint/60"
              }`}
            >
              <RotateCw className="h-5 w-5 rotate-90" />
              <span>180° Flip</span>
            </button>

            <button
              type="button"
              onClick={() => handleAngle(270)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-3 py-3 text-sm font-bold transition-all duration-200 ${
                currentRotation === 270
                  ? "border-primary bg-primary text-white shadow-lift scale-[1.02]"
                  : "border-border/80 bg-card text-foreground hover:border-primary/40 hover:bg-mint/60"
              }`}
            >
              <RotateCcw className="h-5 w-5" />
              <span>270° Left</span>
            </button>

            <button
              type="button"
              onClick={() => handleAngle(0)}
              className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border px-3 py-3 text-sm font-bold transition-all duration-200 ${
                currentRotation === 0
                  ? "border-primary/40 bg-secondary text-forest"
                  : "border-border/80 bg-card text-muted-foreground hover:border-primary/40 hover:bg-mint/60 hover:text-forest"
              }`}
            >
              <X className="h-5 w-5 opacity-70" />
              <span>Reset (0°)</span>
            </button>
          </div>

          {/* Page Scope Selection (All vs Selective Pages) */}
          <div className="mt-4 rounded-2xl border border-border/70 bg-card/80 p-3 sm:p-3.5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold uppercase tracking-wider text-forest">
                  Target Pages
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-xl bg-secondary/80 p-1 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setTargetScope("all");
                    onPageSelectionChange?.("");
                  }}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition-all ${
                    targetScope === "all"
                      ? "bg-card text-forest shadow-xs font-bold"
                      : "text-muted-foreground hover:text-forest"
                  }`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => setTargetScope("custom")}
                  className={`flex-1 rounded-lg px-2 py-1.5 text-xs font-semibold transition-all ${
                    targetScope === "custom"
                      ? "bg-card text-forest shadow-xs font-bold"
                      : "text-muted-foreground hover:text-forest"
                  }`}
                >
                  Specific
                </button>
              </div>
            </div>

            {targetScope === "custom" && (
              <div className="mt-3 animate-in fade-in-50 duration-200">
                <input
                  type="text"
                  placeholder="e.g. 1, 3, 5-8"
                  value={pageSelection}
                  onChange={(e) => onPageSelectionChange?.(e.target.value)}
                  className="w-full rounded-xl border border-primary/30 bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
                <p className="mt-1.5 text-[11px] text-muted-foreground leading-snug">
                  Page numbers separated by commas or ranges. Leave blank for all.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard Image Grid view for other multi-image tools (e.g. JPG to PDF)
  return (
    <div className="space-y-4">
      {/* Workspace Header & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/80 pb-3">
        <div>
          <p className="text-sm font-bold text-forest">
            {items.length} {items.length === 1 ? "image" : "images"}
            <span className="ml-1.5 text-xs font-normal text-muted-foreground">
              ({formatBytes(totalBytes)} total)
            </span>
          </p>
          <p className="text-xs text-muted-foreground">
            Drag cards or use arrows to change the PDF page order.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {onRotateAll && items.length > 0 && (
            <button
              type="button"
              disabled={disabled}
              onClick={onRotateAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-foreground shadow-xs transition-colors hover:bg-mint hover:text-forest disabled:opacity-50"
              title="Rotate all images 90° clockwise"
            >
              <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
              Rotate all
            </button>
          )}

          {onClearAll && items.length > 1 && (
            <button
              type="button"
              disabled={disabled}
              onClick={onClearAll}
              className="inline-flex items-center gap-1.5 rounded-xl border border-border/80 bg-card px-3 py-1.5 text-xs font-semibold text-destructive shadow-xs transition-colors hover:bg-destructive/10 disabled:opacity-50"
              title="Clear all images"
            >
              <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Grid of Image Cards */}
      <ul
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
        role="list"
        aria-label="List of images to convert to PDF"
      >
        {items.map((item, index) => (
          <li
            key={item.id}
            draggable={!disabled}
            onDragStart={(event) => {
              if (disabled) return;
              setDragIndex(index);
              event.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(event) => {
              if (disabled || dragIndex === null) return;
              event.preventDefault();
              setOverIndex(index);
            }}
            onDragLeave={() => setOverIndex((current) => (current === index ? null : current))}
            onDrop={(event) => {
              event.preventDefault();
              if (dragIndex !== null) move(dragIndex, index);
              setDragIndex(null);
              setOverIndex(null);
            }}
            onDragEnd={() => {
              setDragIndex(null);
              setOverIndex(null);
            }}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-card shadow-soft transition-all duration-200 ${
              dragIndex === index ? "scale-[0.97] opacity-50 ring-2 ring-primary" : ""
            } ${
              overIndex === index && dragIndex !== index
                ? "border-primary ring-2 ring-primary/40"
                : "border-border/80"
            } ${disabled ? "opacity-60" : "cursor-grab active:cursor-grabbing"}`}
          >
            {/* Page number badge */}
            {!hideBadge && (
              <span className="absolute left-2 top-2 z-10 rounded-lg bg-card/95 px-2 py-0.5 text-xs font-bold text-foreground shadow-soft backdrop-blur-xs">
                Page {index + 1}
              </span>
            )}

            {/* Top action buttons */}
            <div className="absolute right-2 top-2 z-10 flex gap-1">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onRotate(item.id)}
                title={`Rotate ${item.file.name} 90° clockwise`}
                aria-label={`Rotate page ${index + 1} 90 degrees clockwise`}
                className="rounded-lg bg-card/95 p-1.5 text-foreground shadow-soft transition-colors hover:bg-primary hover:text-white focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                <RotateCw className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onRemove(item.id)}
                title={`Remove ${item.file.name}`}
                aria-label={`Remove page ${index + 1}`}
                className="rounded-lg bg-card/95 p-1.5 text-foreground shadow-soft transition-colors hover:bg-destructive hover:text-white focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Thumbnail preview button */}
            <button
              type="button"
              onClick={() => onPreview(item)}
              aria-label={`Preview ${item.file.name} full size`}
              className="relative flex h-36 w-full items-center justify-center p-2 bg-mint/40 hover:bg-mint/70 transition-colors sm:h-40"
            >
              <img
                src={item.url}
                alt={item.file.name}
                loading="lazy"
                decoding="async"
                className="max-h-full max-w-full object-contain transition-transform duration-200"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              />
              <span className="absolute bottom-2 right-2 rounded-md bg-card/80 p-1 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
            </button>

            {/* Card footer details & reorder buttons */}
            <div className="border-t border-border/80 bg-card p-2.5">
              {editingId === item.id && onRename ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const val = renameInputRef.current?.value.trim();
                    if (val) onRename(item.id, val);
                    setEditingId(null);
                  }}
                  className="flex items-center gap-1"
                >
                  <input
                    ref={renameInputRef}
                    type="text"
                    defaultValue={item.file.name.replace(/\.[^.]+$/, "")}
                    autoFocus
                    onBlur={() => {
                      const val = renameInputRef.current?.value.trim();
                      if (val) onRename(item.id, val);
                      setEditingId(null);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Escape") setEditingId(null);
                    }}
                    className="w-full rounded border border-border bg-background px-1.5 py-0.5 text-xs font-medium text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </form>
              ) : (
                <div className="flex items-center gap-1">
                  <p
                    className="flex-1 truncate text-xs font-medium text-foreground"
                    title={item.file.name}
                  >
                    {item.file.name}
                  </p>
                  {onRename && (
                    <button
                      type="button"
                      onClick={() => setEditingId(item.id)}
                      title="Rename file"
                      className="animate-pencil-nudge shrink-0 rounded-md bg-primary/10 p-1 text-primary transition-all duration-200 hover:bg-primary hover:text-white shadow-sm"
                    >
                      <Pencil className="h-3 w-3" aria-hidden="true" />
                    </button>
                  )}
                </div>
              )}
              <div className="mt-0.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{formatBytes(item.file.size)}</span>
                {item.rotation > 0 && (
                  <span className="font-semibold text-primary">{item.rotation}°</span>
                )}
              </div>

              {items.length > 1 && (
                <div className="mt-2 flex items-center justify-between gap-1 border-t border-border/60 pt-1.5">
                  <button
                    type="button"
                    disabled={disabled || index === 0}
                    onClick={() => move(index, index - 1)}
                    title="Move earlier"
                    aria-label={`Move page ${index + 1} earlier`}
                    className="flex flex-1 items-center justify-center rounded-lg border border-border p-1 text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    disabled={disabled || index === items.length - 1}
                    onClick={() => move(index, index + 1)}
                    title="Move later"
                    aria-label={`Move page ${index + 1} later`}
                    className="flex flex-1 items-center justify-center rounded-lg border border-border p-1 text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-30"
                  >
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ImageLightbox({ item, onClose }: { item: ImageItem; onClose: () => void }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Preview of ${item.file.name}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/75 p-4 backdrop-blur-sm"
    >
      <div
        className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-2xl bg-card p-4 shadow-lift"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
          <div>
            <p className="truncate text-sm font-semibold text-foreground" title={item.file.name}>
              {item.file.name}
            </p>
            <p className="text-xs text-muted-foreground">
              {formatBytes(item.file.size)}
              {item.width > 0 ? ` · ${item.width} × ${item.height}px` : ""}
              {item.rotation > 0 ? ` · Rotated ${item.rotation}°` : ""}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close preview"
            className="rounded-lg border border-border p-1.5 text-foreground transition-colors hover:bg-secondary"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-3 flex max-h-[70vh] items-center justify-center overflow-auto rounded-xl bg-mint p-4">
          <img
            src={item.url}
            alt={item.file.name}
            className="max-h-[65vh] max-w-full object-contain"
            style={{ transform: `rotate(${item.rotation}deg)` }}
          />
        </div>
      </div>
    </div>
  );
}
