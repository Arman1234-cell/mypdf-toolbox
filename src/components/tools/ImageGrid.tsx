import { useState, useMemo } from "react";
import { ArrowLeft, ArrowRight, RotateCw, X, Trash2, Maximize2 } from "lucide-react";
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
  onRemove: (id: string) => void;
  onClearAll?: () => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  onPreview: (item: ImageItem) => void;
};

export function ImageGrid({
  items,
  disabled,
  onRotate,
  onRotateAll,
  onRemove,
  onClearAll,
  onReorder,
  onPreview,
}: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);

  const totalBytes = useMemo(() => items.reduce((sum, item) => sum + item.file.size, 0), [items]);

  const move = (from: number, to: number) => {
    if (to < 0 || to >= items.length || from === to) return;
    onReorder(from, to);
  };

  return (
    <div className="space-y-3">
      {/* Workspace Header & Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <div>
          <p className="text-sm font-semibold text-foreground">
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-foreground shadow-xs transition-colors hover:bg-secondary disabled:opacity-50"
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
              className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-card px-2.5 py-1.5 text-xs font-medium text-destructive shadow-xs transition-colors hover:bg-destructive/10 disabled:opacity-50"
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
                : "border-border"
            } ${disabled ? "opacity-60" : "cursor-grab active:cursor-grabbing"}`}
          >
            {/* Page number badge */}
            <span className="absolute left-2 top-2 z-10 rounded-lg bg-card/95 px-2 py-0.5 text-xs font-bold text-foreground shadow-soft backdrop-blur-xs">
              Page {index + 1}
            </span>

            {/* Top action buttons */}
            <div className="absolute right-2 top-2 z-10 flex gap-1">
              <button
                type="button"
                disabled={disabled}
                onClick={() => onRotate(item.id)}
                title={`Rotate ${item.file.name} 90° clockwise`}
                aria-label={`Rotate page ${index + 1} 90 degrees clockwise`}
                className="rounded-lg bg-card/95 p-1.5 text-foreground shadow-soft transition-colors hover:bg-secondary focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                <RotateCw className="h-4 w-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                disabled={disabled}
                onClick={() => onRemove(item.id)}
                title={`Remove ${item.file.name}`}
                aria-label={`Remove page ${index + 1}`}
                className="rounded-lg bg-card/95 p-1.5 text-foreground shadow-soft transition-colors hover:bg-secondary hover:text-destructive focus-visible:ring-2 focus-visible:ring-primary disabled:opacity-50"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            {/* Thumbnail preview button */}
            <button
              type="button"
              onClick={() => onPreview(item)}
              aria-label={`Preview ${item.file.name} full size`}
              className="relative flex h-36 w-full items-center justify-center bg-mint/50 p-2 transition-colors hover:bg-mint/80 sm:h-40"
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
            <div className="border-t border-border bg-card p-2.5">
              <p className="truncate text-xs font-medium text-foreground" title={item.file.name}>
                {item.file.name}
              </p>
              <div className="mt-0.5 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{formatBytes(item.file.size)}</span>
                {item.rotation > 0 && (
                  <span className="font-medium text-primary">{item.rotation}°</span>
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
