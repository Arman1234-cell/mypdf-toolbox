import { Link } from "@tanstack/react-router";
import { ArrowRight, ChevronRight, Check } from "lucide-react";
import { ToolIcon } from "./ToolIcon";
import { getTool, type ToolDefinition } from "@/lib/tools";

export function Breadcrumbs({ items }: { items: { label: string; to?: string; slug?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-xs text-muted-foreground">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1">
            {index > 0 && <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />}
            {item.slug ? (
              <Link to="/$slug" params={{ slug: item.slug }} className="hover:text-primary">
                {item.label}
              </Link>
            ) : item.to === "/" ? (
              <Link to="/" className="hover:text-primary">
                {item.label}
              </Link>
            ) : item.to === "/tools" ? (
              <Link to="/tools" className="hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">
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
      className="group card-soft flex items-start gap-3 p-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
        <ToolIcon slug={tool.slug} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex items-center gap-2">
          <span className="text-sm font-semibold text-foreground">{tool.name}</span>
          {tool.status === "soon" && (
            <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground">
              Soon
            </span>
          )}
        </span>
        {!compact && (
          <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">
            {tool.cardDescription}
          </span>
        )}
      </span>
      <ArrowRight
        className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
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
      <h2 id="related" className="text-xl font-bold text-foreground sm:text-2xl">
        {title}
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
      <h2 id="faq" className="text-xl font-bold text-foreground sm:text-2xl">
        Frequently asked questions
      </h2>
      <div className="mt-4 space-y-3">
        {items.map((item) => (
          <details key={item.q} className="card-soft group p-4 open:border-primary/30">
            <summary className="flex cursor-pointer items-center justify-between gap-3 text-sm font-semibold text-foreground">
              {item.q}
              <ChevronRight
                className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-90"
                aria-hidden="true"
              />
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function HowToUse({ tool }: { tool: ToolDefinition }) {
  if (!tool.steps.length) return null;
  return (
    <section aria-labelledby="how-to">
      <h2 id="how-to" className="text-xl font-bold text-foreground sm:text-2xl">
        How to use {tool.name}
      </h2>
      <ol className="mt-4 grid gap-3 sm:grid-cols-3">
        {tool.steps.map((step, index) => (
          <li key={step} className="card-soft p-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {index + 1}
            </span>
            <p className="mt-3 text-sm leading-relaxed text-foreground">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function KeyFeatures({ tool }: { tool: ToolDefinition }) {
  if (!tool.features.length) return null;
  return (
    <section aria-labelledby="features">
      <h2 id="features" className="text-xl font-bold text-foreground sm:text-2xl">
        Key features
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {tool.features.map((feature) => (
          <div key={feature.title} className="card-soft p-4">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Check className="h-4 w-4 text-primary" aria-hidden="true" />
              {feature.title}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{feature.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
