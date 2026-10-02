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
      className={`group relative overflow-hidden rounded-[2rem] border-2 border-dashed transition-all duration-300 ${
        dragging
          ? "border-primary bg-mint scale-[1.01] ring-4 ring-primary/10 shadow-lift"
          : "border-primary/20 bg-mint/50 hover:bg-mint/80 hover:border-primary/40 shadow-sm"
      } ${compact ? "p-5" : "px-6 py-14 sm:py-20"}`}
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
          <div className="relative mb-6">
            <span className="flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-card text-primary shadow-sm ring-1 ring-border transition-all duration-300 group-hover:scale-[1.03] group-hover:shadow-soft">
              <UploadCloud
                className="h-10 w-10 transition-transform duration-300 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </span>
            <span className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm ring-2 ring-card">
              <FileText className="h-4 w-4" />
            </span>
          </div>
        )}

        <label
          htmlFor={`upload-${describedBy}`}
          className="inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full bg-primary px-8 py-3.5 text-base font-bold text-primary-foreground shadow-sm transition-all duration-300 hover:bg-primary-dark hover:shadow-soft active:scale-[0.98] focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-card"
          onClick={() => track("upload_started")}
        >
          <UploadCloud className="h-5 w-5" aria-hidden="true" />
          {ctaLabel}
        </label>

        <p className="mt-4 text-sm font-medium text-forest/80">
          or drag and drop your PDF here
        </p>

        {/* Clear file restrictions & trust badge */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <span
            id={describedBy}
            className="inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-1 text-xs font-medium text-muted-foreground ring-1 ring-border"
          >
            Supported: {acceptLabel} <span className="opacity-50">|</span> Up to 100 MB
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-card px-3.5 py-1 text-xs font-medium text-primary ring-1 ring-primary/20 shadow-sm">
            <Shield className="h-3.5 w-3.5" /> 100% Private (Browser-only)
          </span>
        </div>
      </div>
    </div>
  );
}
