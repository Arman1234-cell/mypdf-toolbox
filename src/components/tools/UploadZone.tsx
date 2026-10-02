import { useId, useRef, useState } from "react";
import { UploadCloud, Shield, FileText, UserX } from "lucide-react";
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

  if (compact) {
    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        className={`group relative overflow-hidden rounded-2xl border-2 border-dashed transition-all duration-300 p-5 ${
          dragging ? "border-primary bg-mint scale-[1.01]" : "border-primary/20 bg-mint/50 hover:bg-mint/80 hover:border-primary/40"
        }`}
      >
        <input
          ref={inputRef}
          id={`upload-${describedBy}`}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
        />
        <div className="flex flex-col items-center text-center gap-3">
          <label
            htmlFor={`upload-${describedBy}`}
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-sm transition-all hover:bg-primary-dark active:scale-[0.98]"
            onClick={() => track("upload_started")}
          >
            <UploadCloud className="h-4 w-4" />
            {ctaLabel}
          </label>
          <p className="text-xs text-muted-foreground">or drag and drop</p>
        </div>
      </div>
    );
  }

  return (
    /* Outer white card */
    <div className="w-full rounded-3xl bg-white border border-[#D8EDD9] shadow-sm p-5 sm:p-7">
      {/* Inner dashed light-green upload zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
        className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed transition-all duration-300 px-6 py-14 sm:py-16 ${
          dragging
            ? "border-[#22C55E] bg-[#E8F2E9] scale-[1.01] ring-4 ring-[#22C55E]/20"
            : "border-[#A8D5B0] bg-[#F0F9F1] hover:bg-[#E8F2E9] hover:border-[#22C55E]/70"
        }`}
      >
        <input
          ref={inputRef}
          id={`upload-${describedBy}`}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          aria-describedby={describedBy}
          onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }}
        />

        {/* Upload icon */}
        <div className="relative mb-5">
          <span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-[#16a34a] shadow-sm ring-1 ring-[#D8EDD9] transition-all duration-300 group-hover:scale-[1.03]">
            <UploadCloud className="h-10 w-10" aria-hidden="true" />
          </span>
          <span className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-xl bg-[#16a34a] text-white shadow-sm ring-2 ring-white">
            <FileText className="h-3.5 w-3.5" />
          </span>
        </div>

        {/* CTA button */}
        <label
          htmlFor={`upload-${describedBy}`}
          className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#16a34a] px-8 py-3.5 text-base font-bold text-white shadow-md transition-all duration-300 hover:bg-[#14532D] hover:shadow-lg active:scale-[0.98]"
          onClick={() => track("upload_started")}
        >
          {ctaLabel}
        </label>

        <p className="mt-4 text-sm text-[#6B7C6A]">or drag and drop your PDF here</p>
      </div>

      {/* Three trust badges below the dashed zone */}
      <div id={describedBy} className="mt-4 flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs text-[#6B7C6A]">
          <FileText className="h-3.5 w-3.5 text-[#16a34a]" aria-hidden="true" />
          Supports PDF up to 100 MB
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#6B7C6A]">
          <Shield className="h-3.5 w-3.5 text-[#16a34a]" aria-hidden="true" />
          100% Private
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-[#6B7C6A]">
          <UserX className="h-3.5 w-3.5 text-[#16a34a]" aria-hidden="true" />
          No registration
        </span>
      </div>
    </div>
  );
}
