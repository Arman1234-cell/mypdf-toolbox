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
    <Link
      to="/"
      className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-[1.02]"
      aria-label="MyPDF4U home"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint/90 p-1.5 text-primary ring-1 ring-primary/20 shadow-soft transition-all duration-200 group-hover:ring-primary/40 group-hover:shadow-lift">
        <LogoMark className="h-full w-full" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-extrabold tracking-tight text-forest leading-tight">
          MyPDF<span className="text-primary">4U</span>
        </span>
        <span className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase -mt-0.5">
          Fast & Private
        </span>
      </div>
    </Link>
  );
}
