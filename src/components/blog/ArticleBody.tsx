import { Link } from "@tanstack/react-router";
import { ArrowRight, Info } from "lucide-react";
import type { ReactNode } from "react";
import type { ArticleBlock, ArticleImage } from "@/lib/articles";

const LINK_PATTERN = /\[([^\]]+)\]\(([^)]+)\)/g;

/** Renders paragraph text with inline [label](/path) links. */
export function RichText({ text }: { text: string }) {
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  LINK_PATTERN.lastIndex = 0;

  while ((match = LINK_PATTERN.exec(text)) !== null) {
    if (match.index > lastIndex) nodes.push(text.slice(lastIndex, match.index));
    const label = match[1] ?? "";
    const href = match[2] ?? "/";
    const key = `${href}-${match.index}`;
    const linkClass =
      "font-medium text-primary underline decoration-primary/40 underline-offset-2 hover:decoration-primary";

    if (href.startsWith("/blog/")) {
      nodes.push(
        <Link key={key} to="/blog/$slug" params={{ slug: href.slice("/blog/".length) }} className={linkClass}>
          {label}
        </Link>,
      );
    } else if (/^\/[a-z0-9-]+$/.test(href)) {
      nodes.push(
        <Link key={key} to="/$slug" params={{ slug: href.slice(1) }} className={linkClass}>
          {label}
        </Link>,
      );
    } else {
      nodes.push(
        <a key={key} href={href} className={linkClass}>
          {label}
        </a>,
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) nodes.push(text.slice(lastIndex));

  return <>{nodes}</>;
}

export function ArticleFigure({
  image,
  priority = false,
  className = "",
}: {
  image: ArticleImage;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={className}>
      <picture>
        <source media="(min-width: 640px)" srcSet={image.desktop} />
        <img
          src={image.mobile}
          alt={image.alt}
          width={image.mobileWidth}
          height={image.mobileHeight}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          {...(priority ? { fetchPriority: "high" as const } : {})}
          className="w-full rounded-2xl border border-border bg-card object-cover aspect-[4/3] sm:aspect-[2/1]"
        />
      </picture>
      {image.caption && (
        <figcaption className="mt-2 text-xs text-muted-foreground">{image.caption}</figcaption>
      )}
    </figure>
  );
}

function ToolCta({ toolSlug, toolName, text }: { toolSlug: string; toolName: string; text: string }) {
  return (
    <div className="card-soft not-prose flex flex-col gap-3 border-2 border-primary/30 bg-mint/50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-sm text-foreground">{text}</p>
      <Link
        to="/$slug"
        params={{ slug: toolSlug }}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
      >
        Open {toolName} <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </div>
  );
}

export function ArticleBody({ blocks }: { blocks: ArticleBlock[] }) {
  return (
    <div className="mt-8 space-y-6">
      {blocks.map((block, idx) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={idx}
                className="pt-2 text-xl font-bold tracking-tight text-foreground sm:text-2xl"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={idx} className="text-base font-semibold text-foreground sm:text-lg">
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={idx} className="text-base leading-relaxed text-foreground/90">
                <RichText text={block.text} />
              </p>
            );
          case "list":
            return (
              <ul key={idx} className="space-y-2 pl-1">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-2.5 text-base leading-relaxed text-foreground/90">
                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ul>
            );
          case "steps":
            return (
              <ol key={idx} className="space-y-3">
                {block.items.map((item, i) => (
                  <li key={i} className="flex gap-3 text-base leading-relaxed text-foreground/90">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {i + 1}
                    </span>
                    <span>
                      <RichText text={item} />
                    </span>
                  </li>
                ))}
              </ol>
            );
          case "note":
            return (
              <div
                key={idx}
                className="flex gap-3 rounded-2xl border border-border bg-secondary/60 p-4 text-sm leading-relaxed text-foreground/90"
              >
                <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                <p>
                  <RichText text={block.text} />
                </p>
              </div>
            );
          case "image":
            return <ArticleFigure key={idx} image={block.image} />;
          case "cta":
            return (
              <ToolCta
                key={idx}
                toolSlug={block.toolSlug}
                toolName={block.toolName}
                text={block.text}
              />
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
