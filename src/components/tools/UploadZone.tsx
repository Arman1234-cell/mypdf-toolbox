import { useId, useRef, useState } from "react";
import { UploadCloud, Shield, FileText } from "lucide-react";
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
      className={`group relative overflow-hidden rounded-3xl border-2 border-dashed transition-all duration-200 ${
        dragging
          ? "border-primary bg-mint scale-[1.01] ring-4 ring-primary/15 shadow-lift"
          : "border-primary/30 bg-mint/45 hover:bg-mint/65 hover:border-primary/50 shadow-soft"
      } ${compact ? "p-5" : "px-6 py-12 sm:py-16"}`}
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
          <div className="relative mb-5">
            <span className="flex h-20 w-20 items-center justify-center rounded-3xl bg-card text-primary shadow-soft ring-1 ring-primary/20 transition-all duration-300 group-hover:scale-105 group-hover:shadow-lift">
              <UploadCloud
                className="h-10 w-10 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-xl bg-primary text-white shadow-soft">
              <FileText className="h-4 w-4" />
            </span>
          </div>
        )}

        <label
          htmlFor={`upload-${describedBy}`}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-lift transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] focus-within:ring-2 focus-within:ring-ring"
          onClick={() => track("upload_started")}
        >
          <UploadCloud className="h-5 w-5" aria-hidden="true" />
          {ctaLabel}
        </label>

        <p className="mt-3.5 text-sm font-medium text-foreground/80">
          or drag and drop your PDF here
        </p>

        {/* Clear file restrictions & trust badge */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span
            id={describedBy}
            className="inline-flex items-center gap-1 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-muted-foreground ring-1 ring-border/80"
          >
            Supported: {acceptLabel} · Up to 100 MB
          </span>
          <span className="inline-flex items-center gap-1 rounded-full bg-card/80 px-3 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20">
            <Shield className="h-3 w-3" /> Zero Server Uploads
          </span>
        </div>
      </div>
    </div>
  );
}
