import type { ReactNode } from "react";
import { Breadcrumbs } from "@/components/tools/ToolSections";
import { getAbsoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/config";

export function PageShell({
  title,
  intro,
  children,
  breadcrumb,
}: {
  title: string;
  intro?: string;
  breadcrumb: string;
  children: ReactNode;
}) {
  return (
    <div className="container-page py-8 sm:py-12">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: breadcrumb }]} />
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{title}</h1>
        {intro && <p className="mt-3 text-base leading-relaxed text-muted-foreground">{intro}</p>}
        <div className="mt-8 space-y-8">{children}</div>
      </div>
    </div>
  );
}

export function Section({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="text-lg font-bold text-foreground">{heading}</h2>
      <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </section>
  );
}

export function meta(path: string, title: string, description: string) {
  const fullUrl = getAbsoluteUrl(path);
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: fullUrl },
      { property: "og:site_name", content: SITE_NAME },
      { property: "og:image", content: DEFAULT_OG_IMAGE },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: DEFAULT_OG_IMAGE },
    ],
    links: [{ rel: "canonical", href: fullUrl }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: getAbsoluteUrl("/") },
            {
              "@type": "ListItem",
              position: 2,
              name: title.replace(` — ${SITE_NAME}`, ""),
              item: fullUrl,
            },
          ],
        }),
      },
    ],
  };
}
