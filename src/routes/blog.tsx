import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { PageShell, meta } from "@/components/layout/Prose";
import { articles } from "@/lib/articles";

const title = "PDF Tips, Guides & Tutorials | MyPDF4U Blog";
const description =
  "Practical tutorials and tips for working with PDF files: converting images, compressing documents, merging files, and making scans searchable.";

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
            className="card-soft flex flex-col justify-between p-6 transition-all hover:border-primary/40 hover:shadow-soft"
          >
            <div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" /> {article.readTime}
                </span>
                <span>•</span>
                <span>{article.date}</span>
              </div>
              <h2 className="mt-2 text-xl font-bold tracking-tight text-foreground">
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
            <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
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
                className="inline-flex items-center gap-1 text-xs font-medium text-foreground hover:text-primary"
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
