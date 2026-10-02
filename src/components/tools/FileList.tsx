import { useState, useRef } from "react";
import { ArrowDown, ArrowUp, FileIcon, X, Pencil } from "lucide-react";
import { formatBytes } from "@/lib/format";

type Props = {
  files: File[];
  reorder?: boolean | undefined;
  onRemove: (index: number) => void;
  onMove?: (index: number, direction: -1 | 1) => void;
  onRename?: (index: number, newName: string) => void;
};

export function FileList({ files, reorder, onRemove, onMove, onRename }: Props) {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const renameInputRef = useRef<HTMLInputElement>(null);

  const handleSaveRename = (index: number) => {
    const val = renameInputRef.current?.value.trim();
    if (val && onRename) {
      onRename(index, val);
    }
    setEditingIndex(null);
  };

  return (
    <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {files.map((file, index) => (
        <li key={`${file.name}-${index}`} className="flex items-center gap-3 p-3 sm:p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <FileIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          
          <div className="min-w-0 flex-1">
            {editingIndex === index && onRename ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSaveRename(index);
                }}
                className="flex items-center gap-1.5"
              >
                <input
                  ref={renameInputRef}
                  type="text"
                  defaultValue={file.name.replace(/\.[^.]+$/, "")}
                  autoFocus
                  onBlur={() => handleSaveRename(index)}
                  onKeyDown={(e) => {
                    if (e.key === "Escape") setEditingIndex(null);
                  }}
                  className="rounded-lg border border-primary bg-background px-2 py-1 text-sm font-medium text-foreground outline-none focus:ring-2 focus:ring-primary/30 max-w-[200px]"
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
                <p className="truncate text-sm font-medium text-foreground max-w-[200px] sm:max-w-xs" title={file.name}>
                  {file.name}
                </p>
                {onRename && (
                  <button
                    type="button"
                    onClick={() => setEditingIndex(index)}
                    title="Rename file"
                    className="shrink-0 rounded-lg bg-primary/10 p-1 text-primary hover:bg-primary hover:text-white transition-all duration-200"
                  >
                    <Pencil className="h-3 w-3" aria-hidden="true" />
                  </button>
                )}
              </div>
            )}
            <p className="text-xs text-muted-foreground mt-0.5">{formatBytes(file.size)}</p>
          </div>

          {reorder && onMove && files.length > 1 && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onMove(index, -1)}
                disabled={index === 0}
                aria-label={`Move ${file.name} earlier`}
                className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-40"
              >
                <ArrowUp className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={() => onMove(index, 1)}
                disabled={index === files.length - 1}
                aria-label={`Move ${file.name} later`}
                className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:bg-secondary disabled:opacity-40"
              >
                <ArrowDown className="h-4 w-4" />
              </button>
            </div>
          )}
          <button
            type="button"
            onClick={() => onRemove(index)}
            aria-label={`Remove ${file.name}`}
            className="rounded-lg border border-border p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </button>
        </li>
      ))}
    </ul>
  );
}
