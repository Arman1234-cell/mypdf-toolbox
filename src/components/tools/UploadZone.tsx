import { useId, useRef, useState } from "react";
import { UploadCloud } from "lucide-react";
import { track } from "@/lib/analytics";

type Props = {
  accept: string;
  acceptLabel: string;
  multiple: boolean;
  ctaLabel: string;
  onFiles: (files: File[]) => void;
  compact?: boolean;
};

export function UploadZone({ accept, acceptLabel, multiple, ctaLabel, onFiles, compact }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const describedBy = useId();

  const handleFiles = (list: FileList | null) => {
    const files = Array.from(list ?? []);
    if (files.length) {
      track("file_selected", { count: files.length });
      onFiles(files);
    }
  };

  return (
    <div
      onDragOver={(event) => {
        event.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer.files);
      }}
      className={`rounded-2xl border-2 border-dashed transition-colors ${
        dragging ? "border-primary bg-secondary" : "border-border bg-mint"
      } ${compact ? "p-5" : "px-6 py-10 sm:py-14"}`}
    >
      <input
        ref={inputRef}
        id={`upload-${describedBy}`}
        type="file"
        accept={accept}
        multiple={multiple}
        className="sr-only"
        aria-describedby={describedBy}
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = "";
        }}
      />
      <div className="flex flex-col items-center text-center">
        {!compact && (
          <span className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-primary shadow-soft">
            <UploadCloud className="h-8 w-8" aria-hidden="true" />
          </span>
        )}
        <label
          htmlFor={`upload-${describedBy}`}
          className="inline-flex cursor-pointer items-center justify-center rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark focus-within:ring-2"
          onClick={() => track("upload_started")}
        >
          {ctaLabel}
        </label>
        <p className="mt-3 text-sm text-muted-foreground">or drag and drop files here</p>
        <p id={describedBy} className="mt-1 text-xs text-muted-foreground">
          Supported: {acceptLabel}
        </p>
      </div>
    </div>
  );
}
