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
    <header className="sticky top-0 z-40 border-b border-border bg-card/95 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          <Link
            to="/tools"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
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
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
              >
                {group.label}
                <ChevronDown className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              </button>
              {openGroup === group.label && (
                <div className="absolute left-0 top-full w-72 pt-2">
                  <div className="card-soft p-2">
                    {groupItems(group.categories).map((entry) => (
                      <div key={entry.category} className="p-1">
                        <p className="px-2 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {entry.category}
                        </p>
                        {entry.items.map((tool) => (
                          <Link
                            key={tool.slug}
                            to="/$slug"
                            params={{ slug: tool.slug }}
                            onClick={() => setOpenGroup(null)}
                            className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm text-foreground transition-colors hover:bg-secondary"
                          >
                            {tool.name}
                            {tool.status === "soon" && (
                              <span className="text-[11px] font-medium text-muted-foreground">
                                Soon
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary sm:block"
          >
            Login
          </Link>
          <span
            className="hidden rounded-lg border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground sm:block"
            title="English (more languages coming soon)"
          >
            EN
          </span>
          <Link
            to="/tools"
            className="hidden rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark md:block"
          >
            All tools
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-lg border border-border p-2 text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-card lg:hidden">
          <div className="container-page max-h-[70vh] space-y-4 overflow-y-auto py-4">
            <Link
              to="/tools"
              onClick={() => setOpen(false)}
              className="block rounded-xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Browse all PDF tools
            </Link>
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Popular
              </p>
              <div className="grid grid-cols-2 gap-2">
                {popularTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to="/$slug"
                    params={{ slug: tool.slug }}
                    onClick={() => setOpen(false)}
                    className="rounded-xl border border-border px-3 py-2 text-sm font-medium text-foreground"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
              <Link to="/login" onClick={() => setOpen(false)}>
                Login
              </Link>
              <Link to="/pricing" onClick={() => setOpen(false)}>
                Pricing
              </Link>
              <Link to="/blog" onClick={() => setOpen(false)}>
                Blog
              </Link>
              <Link to="/security" onClick={() => setOpen(false)}>
                Security
              </Link>
              <Link to="/about" onClick={() => setOpen(false)}>
                About
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
