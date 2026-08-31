import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/tools/ToolSections";
import { articles } from "@/lib/articles";
import { getAbsoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/config";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articles.find((a) => a.slug === params.slug);
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
        { title: `${article.title} | ${SITE_NAME}` },
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
            url: fullUrl,
            author: {
              "@type": "Organization",
              name: SITE_NAME,
            },
            publisher: {
              "@type": "Organization",
              name: SITE_NAME,
              logo: {
                "@type": "ImageObject",
                url: DEFAULT_OG_IMAGE,
              },
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

  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "Blog", to: "/blog" },
            { label: article.title },
          ]}
        />

        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readTime}
          </span>
          <span>•</span>
          <span>Published on {article.date}</span>
        </div>

        <h1 className="mt-3 text-2xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          {article.title}
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {article.description}
        </p>

        <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground/90">
          {article.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        {/* CTA Banner to the respective tool */}
        <div className="card-soft mt-10 flex flex-col items-center justify-between gap-4 border-2 border-primary/30 bg-mint/50 p-6 sm:flex-row">
          <div>
            <h2 className="text-lg font-bold text-foreground">Ready to try it out?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Convert, merge, or compress your files directly in your browser.
            </p>
          </div>
          <Link
            to="/$slug"
            params={{ slug: article.toolSlug }}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
          >
            Open {article.toolName} <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
          All tools on MyPDF4U process documents locally in your browser. Your files are never
          uploaded.
        </p>
      </div>
    </div>
  );
}
