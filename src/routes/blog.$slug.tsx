import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/tools/ToolSections";
import { articles, getArticle, type ArticleBlock } from "@/lib/articles";
import { getAbsoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/config";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = getArticle(params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ params, loaderData }) => {
    const article = loaderData?.article;
    if (!article) {
      return {
        meta: [
          { title: `Article not found — ${SITE_NAME}` },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }
    const fullUrl = getAbsoluteUrl(`/blog/${params.slug}`);
    return {
      meta: [
        { title: article.metaTitle ?? `${article.title} | ${SITE_NAME}` },
        { name: "description", content: article.description },
        { property: "og:title", content: article.title },
        { property: "og:description", content: article.description },
        { property: "og:type", content: "article" },
        { property: "og:url", content: fullUrl },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:image", content: DEFAULT_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: article.title },
        { name: "twitter:description", content: article.description },
        { name: "twitter:image", content: DEFAULT_OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: fullUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: article.title,
            description: article.description,
            datePublished: article.date,
            ...(article.updated ? { dateModified: article.updated } : {}),
            url: fullUrl,
            mainEntityOfPage: { "@type": "WebPage", "@id": fullUrl },
            author: { "@type": "Organization", name: SITE_NAME },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: { "@type": "ImageObject", url: DEFAULT_OG_IMAGE },
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: getAbsoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Blog", item: getAbsoluteUrl("/blog") },
              { "@type": "ListItem", position: 3, name: article.title, item: fullUrl },
            ],
          }),
        },
      ],
    };
  },
  component: ArticlePage,
});

/** Render inline [text](url) markdown links in a string */
function RichText({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return (
    <>
      {parts.map((part, i) => {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, label, href] = match;
          const isInternal = href.startsWith("/");
          if (isInternal) {
            return (
              <Link key={i} to={href as "/" } className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark">
                {label}
              </Link>
            );
          }
          return (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-primary underline underline-offset-2 hover:text-primary-dark">
              {label}
            </a>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function Block({ block }: { block: ArticleBlock }) {
  switch (block.type) {
    case "h2":
      return <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">{block.text}</h2>;
    case "h3":
      return <h3 className="text-lg font-semibold text-foreground">{block.text}</h3>;
    case "p":
      return (
        <p className="text-base leading-relaxed text-foreground/90">
          <RichText text={block.text} />
        </p>
      );
    case "list":
      return (
        <ul className="space-y-2 pl-5">
          {block.items.map((item, i) => (
            <li key={i} className="list-disc text-sm leading-relaxed text-foreground/90">
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {i + 1}
              </span>
              <span className="pt-0.5"><RichText text={item} /></span>
            </li>
          ))}
        </ol>
      );
    case "note":
      return (
        <div className="rounded-xl border border-primary/20 bg-mint/40 px-4 py-3 text-sm leading-relaxed text-foreground/80">
          <span className="mr-1 font-semibold text-primary">Note:</span>
          <RichText text={block.text} />
        </div>
      );
    case "cta":
      return (
        <div className="card-soft flex flex-col items-start justify-between gap-4 border-2 border-primary/30 bg-mint/50 p-5 sm:flex-row sm:items-center">
          <p className="text-sm leading-relaxed text-muted-foreground">{block.text}</p>
          <Link
            to="/$slug"
            params={{ slug: block.toolSlug }}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
          >
            Open {block.toolName} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      );
    default:
      return null;
  }
}

function ArticlePage() {
  const { article } = Route.useLoaderData();
  const related = article.related
    .map((slug) => articles.find((item) => item.slug === slug))
    .filter((item): item is (typeof articles)[number] => Boolean(item));

  return (
    <div className="container-page py-6 sm:py-10">
      <article className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: article.title },
          ]}
        />

        <h1 className="mt-3 text-[1.6rem] font-extrabold leading-tight tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>

        <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readTime}
          </span>
          <span aria-hidden="true">•</span>
          <span>Published {article.date}</span>
          {article.updated && (
            <>
              <span aria-hidden="true">•</span>
              <span>Updated {article.updated}</span>
            </>
          )}
        </div>

        {/* Hero image — uses public URL, no JS module import */}
        <figure className="mt-5 overflow-hidden rounded-2xl border border-border">
          <picture>
            <source media="(min-width: 640px)" srcSet={article.hero.desktop} />
            <img
              src={article.hero.mobile}
              alt={article.hero.alt}
              width={article.hero.mobileWidth}
              height={article.hero.mobileHeight}
              className="w-full object-cover"
              loading="eager"
              decoding="async"
            />
          </picture>
          {article.hero.caption && (
            <figcaption className="px-4 py-2 text-center text-xs text-muted-foreground">
              {article.hero.caption}
            </figcaption>
          )}
        </figure>

        {/* Intro paragraphs */}
        <div className="mt-6 space-y-4">
          {article.intro.map((paragraph, idx) => (
            <p
              key={idx}
              className={
                idx === 0
                  ? "text-base leading-relaxed text-foreground sm:text-lg"
                  : "text-base leading-relaxed text-foreground/90"
              }
            >
              <RichText text={paragraph} />
            </p>
          ))}
        </div>

        {/* Rich content blocks */}
        <div className="mt-8 space-y-6">
          {article.blocks.map((block, idx) => (
            <Block key={idx} block={block} />
          ))}
        </div>

        {/* FAQs */}
        {article.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Frequently asked questions
            </h2>
            <dl className="mt-4 space-y-4">
              {article.faqs.map((faq) => (
                <div key={faq.q} className="card-soft p-5">
                  <dt className="text-base font-semibold text-foreground">{faq.q}</dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{faq.a}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* Bottom CTA */}
        <div className="card-soft mt-10 flex flex-col items-start justify-between gap-4 border-2 border-primary/30 bg-mint/50 p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-foreground">Ready to try it yourself?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Everything runs in your browser — your files are never uploaded.
            </p>
          </div>
          <Link
            to="/$slug"
            params={{ slug: article.toolSlug }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
          >
            Open {article.toolName} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        {/* Related guides */}
        {related.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold tracking-tight text-foreground">Related guides</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {related.map((item) => (
                <Link
                  key={item.slug}
                  to="/blog/$slug"
                  params={{ slug: item.slug }}
                  className="card-soft p-5 transition-all hover:border-primary/40 hover:shadow-soft"
                >
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <p className="mt-10 flex items-center justify-center gap-2 text-center text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
          All MyPDF4U tools process documents locally in your browser. Your files are never uploaded.
        </p>
      </article>
    </div>
  );
}
