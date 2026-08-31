import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { PageShell, meta } from "@/components/layout/Prose";
import { articles } from "@/lib/articles";

const title = "PDF Guides & Tutorials — Convert, Compress, Merge | MyPDF4U";
const description =
  "Step-by-step PDF guides: convert PNG and JPG images to PDF, compress large files for email and merge documents into one — with free browser-based tools.";

export const Route = createFileRoute("/blog")({
  head: () => meta("/blog", title, description),
  component: BlogPage,
});

function BlogPage() {
  return (
    <PageShell
      breadcrumb="Blog"
      title="PDF Tips & Guides"
      intro="Simple, step-by-step guides to help you get the most out of your documents."
    >
      <div className="grid gap-6">
        {articles.map((article) => (
          <article
            key={article.slug}
            className="card-soft flex flex-col justify-between p-5 transition-all hover:border-primary/40 hover:shadow-soft sm:p-6"
          >
            <div className="flex flex-col gap-5 sm:flex-row">
              <Link
                to="/blog/$slug"
                params={{ slug: article.slug }}
                className="shrink-0"
                aria-label={`Read: ${article.title}`}
                tabIndex={-1}
              >
                <picture>
                  <source media="(min-width: 640px)" srcSet={article.hero.desktop} />
                  <img
                    src={article.hero.mobile}
                    alt={article.hero.alt}
                    width={article.hero.mobileWidth}
                    height={article.hero.mobileHeight}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[16/9] w-full rounded-xl border border-border object-cover sm:aspect-[4/3] sm:w-40"
                  />
                </picture>
              </Link>
              <div>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readTime}
                  </span>
                  <span aria-hidden="true">•</span>
                  <span>{article.updated ?? article.date}</span>
                </div>
                <h2 className="mt-2 text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  <Link
                    to="/blog/$slug"
                    params={{ slug: article.slug }}
                    className="hover:text-primary hover:underline"
                  >
                    {article.title}
                  </Link>
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {article.description}
                </p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
              <Link
                to="/$slug"
                params={{ slug: article.toolSlug }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline"
              >
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Try {article.toolName}
              </Link>
              <Link
                to="/blog/$slug"
                params={{ slug: article.slug }}
                className="inline-flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-semibold text-foreground hover:text-primary"
              >
                Read guide <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
}
