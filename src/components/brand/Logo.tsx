import { Link } from "@tanstack/react-router";

/** Original MyPDF4U mark: a rounded document with a folded corner and a leaf. */
export function LogoMark({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} role="img" aria-label="MyPDF4U logo">
      <rect x="3" y="2" width="34" height="36" rx="10" fill="currentColor" opacity="0.12" />
      <path
        d="M12 8h11l7 7v17a2 2 0 0 1-2 2H12a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z"
        fill="currentColor"
        opacity="0.9"
      />
      <path d="M23 8l7 7h-5a2 2 0 0 1-2-2V8Z" fill="currentColor" opacity="0.55" />
      <path
        d="M20.5 27c-3.6 0-5.5-2.1-5.5-5.2 3.9-.5 6.4 1 7 3.7.9-2.9 3-4.9 6-5.2.2 4.1-2.7 6.7-7.5 6.7Z"
        fill="var(--color-mint)"
      />
    </svg>
  );
}

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-primary" aria-label="MyPDF4U home">
      <LogoMark />
      <span className="text-lg font-bold tracking-tight text-foreground">
        MyPDF<span className="text-primary">4U</span>
      </span>
    </Link>
  );
}
