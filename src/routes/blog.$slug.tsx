import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/tools/ToolSections";
import { ArticleBody, ArticleFigure, RichText } from "@/components/blog/ArticleBody";
import { articles, getArticle } from "@/lib/articles";
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
          { title: `Article unavailable — ${SITE_NAME}` },
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

        <ArticleFigure image={article.hero} priority className="mt-5" />

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

        <ArticleBody blocks={article.blocks} />

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
