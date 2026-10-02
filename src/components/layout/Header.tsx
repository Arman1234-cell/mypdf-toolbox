import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { toolsByCategory, popularTools } from "@/lib/tools";

const navGroups = [
  { label: "Convert", categories: ["Convert PDF", "Documents to PDF"] },
  { label: "Compress", categories: ["Optimize PDF"] },
  { label: "Organize", categories: ["Organize PDF", "Edit PDF"] },
  { label: "More", categories: ["Images to PDF", "Security"] },
] as const;

function groupItems(labels: readonly string[]) {
  return toolsByCategory.filter((group) => labels.includes(group.category));
}

export function Header() {
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-card/85 backdrop-blur-md transition-all">
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Main">
          <Link
            to="/tools"
            className="rounded-xl px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-all duration-150 hover:bg-mint hover:text-forest"
          >
            PDF Tools
          </Link>
          {navGroups.map((group) => (
            <div
              key={group.label}
              className="relative"
              onMouseEnter={() => setOpenGroup(group.label)}
              onMouseLeave={() => setOpenGroup(null)}
            >
              <button
                type="button"
                aria-expanded={openGroup === group.label}
                onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                className={`flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all duration-150 ${
                  openGroup === group.label
                    ? "bg-mint text-forest"
                    : "text-muted-foreground hover:bg-mint hover:text-forest"
                }`}
              >
                {group.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === group.label
                      ? "rotate-180 text-primary"
                      : "text-muted-foreground/70"
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openGroup === group.label && (
                <div className="absolute left-0 top-full w-76 pt-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="overflow-hidden rounded-2xl border border-border/80 bg-card p-3 shadow-hover backdrop-blur-sm">
                    {groupItems(group.categories).map((entry) => (
                      <div key={entry.category} className="mb-2 last:mb-0">
                        <p className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                          {entry.category}
                        </p>
                        <div className="mt-1 space-y-0.5">
                          {entry.items.map((tool) => (
                            <Link
                              key={tool.slug}
                              to="/$slug"
                              params={{ slug: tool.slug }}
                              onClick={() => setOpenGroup(null)}
                              className="flex items-center justify-between rounded-xl px-2.5 py-2 text-sm font-medium text-foreground transition-all duration-150 hover:bg-mint/80 hover:text-forest hover:translate-x-0.5"
                            >
                              <span>{tool.name}</span>
                              {tool.status === "soon" ? (
                                <span className="rounded-md bg-secondary px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                                  Soon
                                </span>
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <Link
            to="/login"
            className="hidden rounded-xl px-3.5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:bg-mint hover:text-forest sm:block"
          >
            Login
          </Link>
          <span
            className="hidden items-center rounded-xl border border-border/80 bg-background/50 px-2.5 py-1.5 text-xs font-semibold text-muted-foreground sm:inline-flex"
            title="English (more languages coming soon)"
          >
            EN
          </span>
          <Link
            to="/tools"
            className="hidden items-center gap-1.5 rounded-2xl bg-primary px-4.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lift transition-all duration-200 hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98] md:inline-flex"
          >
            All tools
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-xl border border-border/80 p-2 text-foreground transition-colors hover:bg-mint lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border/80 bg-card/95 backdrop-blur-md lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="container-page max-h-[75vh] space-y-4 overflow-y-auto py-5">
            <Link
              to="/tools"
              onClick={() => setOpen(false)}
              className="block rounded-2xl bg-primary px-5 py-3 text-center text-sm font-bold text-primary-foreground shadow-lift"
            >
              Browse all PDF tools
            </Link>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Popular Tools
              </p>
              <div className="grid grid-cols-2 gap-2">
                {popularTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to="/$slug"
                    params={{ slug: tool.slug }}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl border border-border/70 bg-mint/40 px-3 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-mint"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 border-t border-border/60 pt-4 text-sm font-medium text-muted-foreground">
              <Link to="/login" onClick={() => setOpen(false)} className="hover:text-forest">
                Login
              </Link>
              <Link to="/pricing" onClick={() => setOpen(false)} className="hover:text-forest">
                Pricing
              </Link>
              <Link to="/blog" onClick={() => setOpen(false)} className="hover:text-forest">
                Blog
              </Link>
              <Link to="/security" onClick={() => setOpen(false)} className="hover:text-forest">
                Security & Privacy
              </Link>
              <Link to="/about" onClick={() => setOpen(false)} className="hover:text-forest">
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
