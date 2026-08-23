import { createFileRoute, notFound } from "@tanstack/react-router";
import { useEffect } from "react";
import { ShieldCheck } from "lucide-react";
import { getTool } from "@/lib/tools";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import {
  Breadcrumbs,
  Faq,
  HowToUse,
  KeyFeatures,
  RelatedTools,
} from "@/components/tools/ToolSections";
import { track } from "@/lib/analytics";
import { getAbsoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/config";

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    const tool = getTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ params, loaderData }) => {
    const tool = loaderData?.tool;
    if (!tool) {
      return {
        meta: [
          { title: `Tool not found — ${SITE_NAME}` },
          { name: "robots", content: "noindex, nofollow" },
        ],
      };
    }
    const fullUrl = getAbsoluteUrl(params.slug);
    const faqSchema =
      tool.faqs.length > 0
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: tool.faqs.map((faq) => ({
                  "@type": "Question",
                  name: faq.q,
                  acceptedAnswer: { "@type": "Answer", text: faq.a },
                })),
              }),
            },
          ]
        : [];

    return {
      meta: [
        { title: tool.metaTitle },
        { name: "description", content: tool.metaDescription },
        { property: "og:title", content: tool.metaTitle },
        { property: "og:description", content: tool.metaDescription },
        { property: "og:type", content: "website" },
        { property: "og:url", content: fullUrl },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:image", content: DEFAULT_OG_IMAGE },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: tool.metaTitle },
        { name: "twitter:description", content: tool.metaDescription },
        { name: "twitter:image", content: DEFAULT_OG_IMAGE },
      ],
      links: [{ rel: "canonical", href: fullUrl }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: `${tool.name} — ${SITE_NAME}`,
            applicationCategory: "UtilitiesApplication",
            operatingSystem: "All (Modern Web Browser)",
            browserRequirements: "Requires JavaScript. Requires HTML5 Canvas.",
            description: tool.metaDescription,
            url: fullUrl,
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
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
              {
                "@type": "ListItem",
                position: 2,
                name: "PDF Tools",
                item: getAbsoluteUrl("/tools"),
              },
              { "@type": "ListItem", position: 3, name: tool.name, item: fullUrl },
            ],
          }),
        },
        ...faqSchema,
      ],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { tool } = Route.useLoaderData();

  useEffect(() => {
    track("tool_page_view", { tool: tool.slug });
  }, [tool.slug]);

  return (
    <div className="container-page py-6 sm:py-8">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs
          items={[
            { label: "Home", to: "/" },
            { label: "PDF Tools", to: "/tools" },
            { label: tool.name },
          ]}
        />
        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">{tool.h1}</h1>
        <p className="mt-2 text-base text-muted-foreground">{tool.tagline}</p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl">
        <ToolWorkspace tool={tool} />
        <p className="mt-4 flex items-start gap-2 rounded-xl bg-secondary px-4 py-3 text-xs leading-relaxed text-secondary-foreground">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          Your documents are processed securely inside this browser tab. Nothing is uploaded, stored
          or shared — read more on our{" "}
          <a href="/security" className="font-semibold underline">
            security page
          </a>
          .
        </p>
      </div>

      <div className="mx-auto mt-14 max-w-4xl space-y-14">
        <HowToUse tool={tool} />

        <section aria-labelledby="why">
          <h2 id="why" className="text-xl font-bold text-foreground sm:text-2xl">
            Why use MyPDF4U?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            No account, no installation and no queue. Every tool opens straight onto the upload
            area, so the task you came for is the first thing on the page. Supported tools run
            inside your browser, which means your files stay on your device and results appear as
            soon as your computer finishes the work.
          </p>
        </section>

        <KeyFeatures tool={tool} />
        <Faq items={tool.faqs} />

        <section aria-labelledby="learn">
          <h2 id="learn" className="text-xl font-bold text-foreground sm:text-2xl">
            Good to know
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {tool.learn}
          </p>
        </section>

        <RelatedTools slugs={tool.related} />
      </div>
    </div>
  );
}
