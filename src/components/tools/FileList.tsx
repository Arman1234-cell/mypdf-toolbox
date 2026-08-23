import { ArrowDown, ArrowUp, FileIcon, X } from "lucide-react";
import { formatBytes } from "@/lib/format";

type Props = {
  files: File[];
  reorder?: boolean | undefined;
  onRemove: (index: number) => void;
  onMove?: (index: number, direction: -1 | 1) => void;
};

export function FileList({ files, reorder, onRemove, onMove }: Props) {
  return (
    <ul className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-card">
      {files.map((file, index) => (
        <li key={`${file.name}-${index}`} className="flex items-center gap-3 p-3 sm:p-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
            <FileIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
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
