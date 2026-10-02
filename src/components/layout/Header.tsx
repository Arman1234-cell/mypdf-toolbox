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
    <header className="sticky top-0 z-40 border-b border-[#D8EDD9] bg-[#FAF7ED] transition-all">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Main">
          <Link
            to="/tools"
            className="rounded-xl px-3.5 py-2 text-sm font-semibold text-[#14532D] transition-all duration-150 hover:bg-[#E8F2E9] hover:text-[#14532D]"
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
                    ? "bg-[#E8F2E9] text-[#14532D]"
                    : "text-[#14532D] hover:bg-[#E8F2E9] hover:text-[#14532D]"
                }`}
              >
                {group.label}
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    openGroup === group.label
                      ? "rotate-180 text-[#22C55E]"
                      : "text-[#14532D]/60"
                  }`}
                  aria-hidden="true"
                />
              </button>
              {openGroup === group.label && (
                <div className="absolute left-0 top-full w-76 pt-2 animate-in fade-in-50 zoom-in-95 duration-150">
                  <div className="overflow-hidden rounded-2xl border border-[#D8EDD9] bg-white p-3 shadow-lg shadow-black/[0.04]">
                    {groupItems(group.categories).map((entry) => (
                      <div key={entry.category} className="mb-2 last:mb-0">
                        <p className="px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#6B7C6A]">
                          {entry.category}
                        </p>
                        <div className="mt-1 space-y-0.5">
                          {entry.items.map((tool) => (
                            <Link
                              key={tool.slug}
                              to="/$slug"
                              params={{ slug: tool.slug }}
                              onClick={() => setOpenGroup(null)}
                              className="flex items-center justify-between rounded-xl px-2.5 py-2 text-sm font-medium text-[#14532D] transition-all duration-150 hover:bg-[#E8F2E9] hover:text-[#14532D] hover:translate-x-0.5"
                            >
                              <span>{tool.name}</span>
                              {tool.status === "soon" ? (
                                <span className="rounded-md bg-[#E8F2E9] px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-[#6B7C6A]">
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
            className="hidden rounded-xl px-3.5 py-2 text-sm font-semibold text-[#14532D] transition-colors hover:bg-[#E8F2E9] hover:text-[#14532D] sm:block"
          >
            Login
          </Link>
          <span
            className="hidden items-center rounded-xl border border-[#D8EDD9] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#14532D] sm:inline-flex"
            title="English (more languages coming soon)"
          >
            EN
          </span>
          <Link
            to="/tools"
            className="hidden items-center gap-1.5 rounded-2xl bg-[#16a34a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#14532D] hover:scale-[1.02] active:scale-[0.98] md:inline-flex"
          >
            All tools
          </Link>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="rounded-xl border border-[#D8EDD9] p-2 text-[#14532D] transition-colors hover:bg-[#E8F2E9] lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#D8EDD9] bg-[#FAF7ED] lg:hidden animate-in slide-in-from-top-2 duration-200">
          <div className="container-page max-h-[75vh] space-y-4 overflow-y-auto py-5">
            <Link
              to="/tools"
              onClick={() => setOpen(false)}
              className="block rounded-2xl bg-[#16a34a] px-5 py-3 text-center text-sm font-bold text-white shadow-sm"
            >
              Browse all PDF tools
            </Link>
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#6B7C6A]">
                Popular Tools
              </p>
              <div className="grid grid-cols-2 gap-2">
                {popularTools.map((tool) => (
                  <Link
                    key={tool.slug}
                    to="/$slug"
                    params={{ slug: tool.slug }}
                    onClick={() => setOpen(false)}
                    className="flex items-center rounded-xl border border-[#D8EDD9] bg-white px-3 py-2.5 text-sm font-semibold text-[#14532D] transition-colors hover:bg-[#E8F2E9]"
                  >
                    {tool.name}
                  </Link>
                ))}
              </div>
            </div>
            <div className="flex flex-wrap gap-4 border-t border-[#D8EDD9] pt-4 text-sm font-medium text-[#14532D]">
              <Link to="/login" onClick={() => setOpen(false)} className="hover:text-[#16a34a]">Login</Link>
              <Link to="/pricing" onClick={() => setOpen(false)} className="hover:text-[#16a34a]">Pricing</Link>
              <Link to="/blog" onClick={() => setOpen(false)} className="hover:text-[#16a34a]">Blog</Link>
              <Link to="/security" onClick={() => setOpen(false)} className="hover:text-[#16a34a]">Security &amp; Privacy</Link>
              <Link to="/about" onClick={() => setOpen(false)} className="hover:text-[#16a34a]">About</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
