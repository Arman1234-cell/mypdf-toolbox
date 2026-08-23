import { createFileRoute } from "@tanstack/react-router";
import { Flame } from "lucide-react";
import { toolsByCategory, liveTools, mostUsedTools, tools } from "@/lib/tools";
import { Breadcrumbs, ToolCard } from "@/components/tools/ToolSections";
import { getAbsoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/config";

const title = "All PDF Tools — Convert, Compress, Edit & Organize | MyPDF4U";
const description =
  "Browse every MyPDF4U online tool: JPG to PDF, Compress PDF, PDF to Word, PDF to JPG, Merge, Split, Rotate, Watermark, and OCR. Free and runs in your browser.";
const fullUrl = getAbsoluteUrl("/tools");

export const Route = createFileRoute("/tools")({
  head: () => ({
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
            { "@type": "ListItem", position: 2, name: "All PDF Tools", item: fullUrl },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "MyPDF4U PDF Tools",
          description,
          url: fullUrl,
          itemListElement: liveTools.map((tool, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: tool.name,
            url: getAbsoluteUrl(`/${tool.slug}`),
          })),
        }),
      },
    ],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  return (
    <div className="container-page py-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "PDF Tools" }]} />
      <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        All PDF tools
      </h1>
      <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
        {liveTools.length} of {tools.length} tools are live today. All live tools run client-side in
        your browser for complete speed and privacy.
      </p>

      {/* Most Used Section */}
      <section aria-labelledby="most-used" className="mt-8">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Flame className="h-4 w-4" aria-hidden="true" />
          </span>
          <h2 id="most-used" className="text-lg font-bold text-foreground">
            Most used
          </h2>
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          The four essential tools our visitors reach for most often.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {mostUsedTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      {/* Categorized Tools */}
      <div className="mt-10 space-y-10">
        {toolsByCategory.map((group) => (
          <section key={group.category} aria-labelledby={group.category}>
            <h2 id={group.category} className="text-lg font-bold text-foreground">
              {group.category}
            </h2>
            <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {group.items.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
