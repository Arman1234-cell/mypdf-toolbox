import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { ShieldCheck, BookOpen, Laptop, Smartphone, CheckCircle2, Lock } from "lucide-react";
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

const toolGuideMap: Record<string, { slug: string; title: string }> = {
  "jpg-to-pdf": { slug: "how-to-convert-jpg-to-pdf", title: "How to Convert JPG to PDF (Free, No Quality Loss)" },
  "pdf-to-jpg": { slug: "how-to-convert-jpg-to-pdf", title: "How to Extract JPG Images from PDF" },
  "image-to-pdf": { slug: "how-to-convert-jpg-to-pdf", title: "How to Combine Images into a PDF on Any Device" },
  "heic-to-pdf": { slug: "how-to-convert-jpg-to-pdf", title: "How to Convert iPhone HEIC Photos to PDF" },
  "png-to-pdf": { slug: "how-to-convert-png-to-pdf", title: "How to Convert PNG to PDF Online for Free" },
  "pdf-to-png": { slug: "how-to-convert-png-to-pdf", title: "How to Render Lossless PNGs from PDF" },
  "compress-pdf": { slug: "how-to-compress-pdf-for-email", title: "How to Compress Large PDF Files for Email" },
  "merge-pdf": { slug: "how-to-merge-pdf-files", title: "How to Merge PDF Files on Windows, Mac, iPhone & Android" },
  "split-pdf": { slug: "how-to-merge-pdf-files", title: "How to Split and Organize PDF Pages Free" },
  "organize-pdf": { slug: "how-to-merge-pdf-files", title: "How to Reorder and Delete PDF Pages" },
};

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

    const howToSchema =
      tool.steps && tool.steps.length > 0
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "HowTo",
                name: tool.h1,
                description: tool.metaDescription,
                step: tool.steps.map((stepText, index) => ({
                  "@type": "HowToStep",
                  position: index + 1,
                  name: `Step ${index + 1}`,
                  text: stepText,
                  url: fullUrl,
                })),
              }),
            },
          ]
        : [];

    return {
      meta: [
        { title: tool.metaTitle },
        { name: "description", content: tool.metaDescription },
        { name: "robots", content: "index, follow" },
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
            operatingSystem: "All (Windows, macOS, Linux, iOS, Android)",
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
        ...howToSchema,
        ...faqSchema,
      ],
    };
  },
  component: ToolPage,
});

function ToolPage() {
  const { tool } = Route.useLoaderData();
  const relatedGuide = toolGuideMap[tool.slug];

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

        {/* Step-by-Step Tutorial Banner for Long-tail Searchers */}
        {relatedGuide && (
          <aside aria-label="Step-by-step guide" className="card-soft flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6 bg-mint/50 border-primary/20">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-foreground">Detailed Step-by-Step Tutorial</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Learn how to use {tool.name} with tips for Windows 11, Mac, iPhone, and Android.
                </p>
              </div>
            </div>
            <Link
              to="/blog/$slug"
              params={{ slug: relatedGuide.slug }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
            >
              Read guide
            </Link>
          </aside>
        )}

        <section aria-labelledby="why">
          <h2 id="why" className="text-xl font-bold text-foreground sm:text-2xl">
            Why use MyPDF4U for {tool.name}?
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            No account, no installation, and no queue. Every tool opens directly to the upload area
            with zero watermarks and no file count restrictions. Your files are converted and processed
            locally in client memory, keeping your documents confidential while delivering instant results.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-2.5">
              <Laptop className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-foreground">Windows, Mac & Linux</p>
                <p className="text-xs text-muted-foreground mt-0.5">Works in Chrome, Edge, Safari, and Firefox with no software download.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Smartphone className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-foreground">iPhone, iPad & Android</p>
                <p className="text-xs text-muted-foreground mt-0.5">Mobile-first design lets you process files directly from photo galleries and Files.</p>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Lock className="h-5 w-5 shrink-0 text-primary mt-0.5" aria-hidden="true" />
              <div>
                <p className="text-xs font-bold text-foreground">100% Private & Free</p>
                <p className="text-xs text-muted-foreground mt-0.5">Zero server uploads, no subscription walls, and no watermarks.</p>
              </div>
            </div>
          </div>
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

