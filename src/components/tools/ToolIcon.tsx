import {
  FileImage,
  FileText,
  Images,
  Minimize2,
  Combine,
  Scissors,
  RotateCw,
  Lock,
  LockOpen,
  Droplets,
  LayoutGrid,
  ScanText,
  FileType2,
  Smartphone,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  "jpg-to-pdf": FileImage,
  "pdf-to-jpg": Images,
  "compress-pdf": Minimize2,
  "merge-pdf": Combine,
  "split-pdf": Scissors,
  "pdf-to-word": FileType2,
  "word-to-pdf": FileText,
  "rotate-pdf": RotateCw,
  "protect-pdf": Lock,
  "unlock-pdf": LockOpen,
  "watermark-pdf": Droplets,
  "organize-pdf": LayoutGrid,
  "pdf-to-png": Images,
  "png-to-pdf": FileImage,
  "heic-to-pdf": Smartphone,
  "image-to-pdf": FileImage,
  "ocr-pdf": ScanText,
};

export function ToolIcon({ slug, className = "h-5 w-5" }: { slug: string; className?: string }) {
  const Icon = icons[slug] ?? FileText;
  return <Icon className={className} aria-hidden="true" />;
}
