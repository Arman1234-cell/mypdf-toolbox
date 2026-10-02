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
      className="group card-soft flex items-start gap-3.5 p-4 sm:p-5 rounded-2xl transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lift bg-card"
    >
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-primary transition-all duration-200 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-105 shadow-xs">
        <ToolIcon slug={tool.slug} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-bold text-forest group-hover:text-primary transition-colors">
            {tool.name}
          </span>
          {tool.status === "soon" && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-secondary-foreground">
              Soon
            </span>
          )}
        </span>
        {!compact && (
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground line-clamp-2">
            {tool.cardDescription}
          </span>
        )}
      </span>
      <ArrowRight
        className="mt-1 h-4 w-4 shrink-0 text-muted-foreground/60 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-primary"
        aria-hidden="true"
      />
    </Link>
  );
}

export function RelatedTools({
  slugs,
  title = "Related PDF tools",
}: {
  slugs: string[];
  title?: string;
}) {
  const items = slugs.map(getTool).filter((tool): tool is ToolDefinition => Boolean(tool));
  if (!items.length) return null;
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
            className="group rounded-2xl border border-border/80 bg-card p-4 sm:p-5 shadow-soft transition-all duration-200 open:border-primary/40 open:shadow-lift"
          >
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-base font-bold text-forest transition-colors hover:text-primary list-none">
              <span>{item.q}</span>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-all duration-200 group-open:rotate-90 group-open:bg-primary group-open:text-white">
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </summary>
            <p className="mt-3.5 text-sm leading-relaxed text-muted-foreground sm:text-base border-t border-border/60 pt-3">
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

  // Custom step metadata for rich visual presentation
  const stepMeta = [
    {
      num: "01",
      icon: UploadCloud,
      cardBg: "bg-mint/40 border-primary/20",
      pillBg: "bg-mint text-primary ring-1 ring-primary/20",
      defaultTitle: "Upload PDF",
    },
    {
      num: "02",
      icon: RotateCw,
      cardBg: "bg-lavender/40 border-purple-200 dark:border-purple-900/40",
      pillBg: "bg-lavender text-purple-700 ring-1 ring-purple-300/40",
      defaultTitle: "Choose Angle & Pages",
    },
    {
      num: "03",
      icon: Download,
      cardBg: "bg-peach/40 border-amber-200 dark:border-amber-900/40",
      pillBg: "bg-peach text-amber-800 ring-1 ring-amber-300/40",
      defaultTitle: "Save & Download",
    },
  ];

  return (
    <section aria-labelledby="how-to">
      <div className="text-center sm:text-left">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary mb-2">
          <Sparkles className="h-3.5 w-3.5" /> 3 Simple Steps
        </span>
        <h2 id="how-to" className="text-2xl font-extrabold text-forest sm:text-3xl">
          How to use {tool.name}
        </h2>
        <p className="mt-1.5 text-sm text-muted-foreground">
          Quick and straightforward — no accounts or file uploads needed.
        </p>
      </div>

      <ol className="mt-6 grid gap-4 sm:grid-cols-3">
        {tool.steps.map((step, index) => {
          const meta = stepMeta[index % stepMeta.length]!;
          const Icon = meta.icon;
          return (
            <li
              key={step}
              className={`relative flex flex-col justify-between overflow-hidden rounded-3xl border p-5 sm:p-6 shadow-soft transition-all duration-200 hover:-translate-y-1 hover:shadow-lift ${meta.cardBg}`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl shadow-xs ${meta.pillBg}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-2xl font-black text-forest/30 tracking-tight">
                    {meta.num}
                  </span>
                </div>
                <h3 className="mt-4 text-base font-bold text-forest">
                  {index === 0
                    ? "1. Select your PDF"
                    : index === 1
                      ? "2. Pick angle & pages"
                      : "3. Download instantly"}
                </h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
                  {step}
                </p>
              </div>
              <div className="mt-4 flex items-center gap-1 text-[11px] font-bold text-primary">
                <span>
                  Step {index + 1} of {tool.steps.length}
                </span>
              </div>
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
      <h2 id="features" className="text-2xl font-extrabold text-forest sm:text-3xl">
        Key features
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        {tool.features.map((feature, idx) => (
          <div
            key={feature.title}
            className="card-soft rounded-3xl border border-border/80 bg-card p-5 sm:p-6 shadow-soft transition-all duration-200 hover:border-primary/40 hover:-translate-y-0.5"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-mint text-primary shadow-xs ring-1 ring-primary/20">
              <Check className="h-5 w-5" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-bold text-forest">{feature.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
              {feature.body}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
