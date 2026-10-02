import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  Check,
  UploadCloud,
  RotateCw,
  Download,
  HelpCircle,
  Sparkles,
} from "lucide-react";
import { ToolIcon } from "./ToolIcon";
import { getTool, type ToolDefinition } from "@/lib/tools";

export function Breadcrumbs({ items }: { items: { label: string; to?: string; slug?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="inline-flex flex-wrap items-center gap-1.5 rounded-full border border-border/80 bg-card/80 px-3.5 py-1.5 text-xs text-muted-foreground shadow-xs">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && (
              <ChevronRight className="h-3 w-3 text-muted-foreground/50" aria-hidden="true" />
            )}
            {item.slug ? (
              <Link
                to="/$slug"
                params={{ slug: item.slug }}
                className="hover:text-forest transition-colors"
              >
                {item.label}
              </Link>
            ) : item.to === "/" ? (
              <Link to="/" className="hover:text-forest transition-colors">
                {item.label}
              </Link>
            ) : item.to === "/tools" ? (
              <Link to="/tools" className="hover:text-forest transition-colors">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-bold text-forest">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function ToolCard({ tool, compact }: { tool: ToolDefinition; compact?: boolean }) {
  return (
    <Link
      to="/$slug"
      params={{ slug: tool.slug }}
      className="group flex items-start gap-4 p-5 rounded-[1.5rem] border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-soft"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] bg-mint text-primary shadow-sm ring-1 ring-border transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 group-hover:ring-primary/50">
        <ToolIcon slug={tool.slug} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-[15px] font-bold text-forest group-hover:text-primary transition-colors">
            {tool.name}
          </span>
          {tool.status === "soon" && (
            <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Soon
            </span>
          )}
        </span>
        {!compact && (
          <span className="mt-1.5 block text-[13px] leading-relaxed text-muted-foreground line-clamp-2">
            {tool.cardDescription}
          </span>
        )}
      </span>
      <ArrowRight
        className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  );
}

export function RelatedTools({
  slugs,
  title = "Related PDF tools",
  compact = false,
}: {
  slugs: string[];
  title?: string;
  compact?: boolean;
}) {
  const items = slugs.map(getTool).filter((tool): tool is ToolDefinition => Boolean(tool));
  if (!items.length) return null;

  if (compact) {
    return (
      <section aria-labelledby="related-compact">
        <div className="flex items-center justify-between mb-4">
          <h3 id="related-compact" className="text-base font-extrabold text-forest">
            What would you like to do next?
          </h3>
          <Link
            to="/tools"
            className="text-xs font-bold text-primary hover:text-primary-dark underline underline-offset-2"
          >
            All tools →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {items.map((tool) => (
            <Link
              key={tool.slug}
              to="/$slug"
              params={{ slug: tool.slug }}
              className="flex flex-col items-center gap-2.5 rounded-[1.25rem] border border-border bg-card p-4 text-center text-xs font-semibold text-forest transition-all duration-300 hover:border-primary/30 hover:bg-secondary hover:-translate-y-0.5 hover:shadow-sm"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary ring-1 ring-border shadow-sm">
                <ToolIcon slug={tool.slug} className="h-4 w-4" />
              </span>
              <span className="leading-snug">{tool.name}</span>
            </Link>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section aria-labelledby="related">
      <div className="flex items-center justify-between">
        <h2 id="related" className="text-2xl font-extrabold text-forest sm:text-3xl">
          {title}
        </h2>
        <Link
          to="/tools"
          className="text-xs font-bold text-primary hover:text-primary-dark underline underline-offset-2"
        >
          View all 17 tools →
        </Link>
      </div>
      <div className="mt-5 grid gap-3.5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((tool) => (
          <ToolCard key={tool.slug} tool={tool} />
        ))}
      </div>
    </section>
  );
}


export function Faq({ items }: { items: { q: string; a: string }[] }) {
  if (!items.length) return null;
  return (
    <section aria-labelledby="faq">
      <div className="flex items-center gap-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-mint text-primary">
          <HelpCircle className="h-4 w-4" />
        </div>
        <h2 id="faq" className="text-2xl font-extrabold text-forest sm:text-3xl">
          Frequently asked questions
        </h2>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => (
          <details
            key={item.q}
            className="group rounded-[1.5rem] border border-border bg-card p-5 sm:p-6 shadow-sm transition-all duration-300 open:border-primary/30 open:shadow-soft"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold text-forest transition-colors hover:text-primary list-none">
              <span>{item.q}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-all duration-200 group-open:rotate-90 group-open:bg-primary group-open:text-white">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </summary>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground border-t border-border pt-4">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function HowToUse({ tool }: { tool: ToolDefinition }) {
  if (!tool.steps.length) return null;

  const stepCards = [
    {
      num: "01",
      bg: "bg-[#E8F2E9] border-[#A8D5B0]",
      numColor: "text-[#16a34a]/25",
      icon: UploadCloud,
      iconBg: "bg-white text-[#16a34a]",
      title: "Select your PDF",
    },
    {
      num: "02",
      bg: "bg-[#F0EBD9] border-[#D4C8A8]",
      numColor: "text-[#14532D]/20",
      icon: RotateCw,
      iconBg: "bg-white text-[#14532D]",
      title: "Choose compression",
    },
    {
      num: "03",
      bg: "bg-[#E8F2E9] border-[#A8D5B0]",
      numColor: "text-[#16a34a]/25",
      icon: Download,
      iconBg: "bg-white text-[#16a34a]",
      title: "Download instantly",
    },
  ];

  return (
    <section aria-labelledby="how-to">
      <h2 id="how-to" className="text-2xl font-extrabold text-[#14532D] sm:text-3xl">
        How to use {tool.name}
      </h2>
      <p className="mt-2 text-sm text-[#6B7C6A]">
        Just 3 simple steps to reduce your PDF file size quickly.
      </p>

      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {tool.steps.map((step, index) => {
          const card = stepCards[index % stepCards.length]!;
          const Icon = card.icon;
          const isLast = index === tool.steps.length - 1;
          return (
            <li
              key={step}
              className={`relative flex flex-col rounded-2xl border p-5 shadow-sm ${card.bg}`}
            >
              {/* Number + arrow connector */}
              <div className="flex items-center justify-between mb-4">
                <span className={`text-3xl font-black tracking-tight leading-none ${card.numColor}`}>
                  {card.num}
                </span>
                {!isLast && (
                  <span className="hidden sm:block text-[#6B7C6A]/40 text-lg font-light">→</span>
                )}
              </div>

              {/* Icon */}
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/5 mb-3 ${card.iconBg}`}>
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>

              <h3 className="text-[15px] font-bold text-[#14532D]">{card.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#6B7C6A]">{step}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}


export function KeyFeatures({ tool }: { tool: ToolDefinition }) {
  if (!tool.features.length) return null;
  return (
    <section aria-labelledby="features">
      <h2 id="features" className="text-2xl font-extrabold text-[#14532D] sm:text-3xl">
        Key features
      </h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tool.features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-[#D8EDD9] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[#16a34a]/40 hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E8F2E9] text-[#16a34a]">
              <Check className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-sm font-bold text-[#14532D]">{feature.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#6B7C6A]">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
