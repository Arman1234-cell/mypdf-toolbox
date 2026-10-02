import { createFileRoute, notFound, redirect, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShieldCheck,
  BookOpen,
  Laptop,
  Smartphone,
  CheckCircle2,
  Lock,
  Sparkles,
  RotateCw,
  Lightbulb,
} from "lucide-react";
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
  "jpg-to-pdf": {
    slug: "how-to-convert-jpg-to-pdf",
    title: "How to Convert JPG to PDF (Free, No Quality Loss)",
  },
  "pdf-to-jpg": {
    slug: "how-to-convert-pdf-to-jpg",
    title: "How to Convert PDF Pages to JPG Images",
  },
  "image-to-pdf": {
    slug: "how-to-convert-images-to-pdf",
    title: "How to Convert Images to PDF in One Document",
  },
  "heic-to-pdf": {
    slug: "how-to-convert-jpg-to-pdf",
    title: "How to Convert iPhone HEIC Photos to PDF",
  },
  "png-to-pdf": {
    slug: "how-to-convert-png-to-pdf",
    title: "How to Convert PNG to PDF Online for Free",
  },
  "pdf-to-png": {
    slug: "how-to-convert-pdf-to-png",
    title: "How to Convert PDF to PNG Without Losing Sharpness",
  },
  "pdf-to-word": {
    slug: "how-to-convert-pdf-to-word",
    title: "How to Convert a PDF into an Editable Word Document",
  },
  "word-to-pdf": {
    slug: "how-to-convert-word-to-pdf",
    title: "How to Convert a Word Document to PDF",
  },
  "ocr-pdf": {
    slug: "how-to-ocr-scanned-pdf",
    title: "How to Make a Scanned PDF Searchable with OCR",
  },
  "compress-pdf": {
    slug: "how-to-compress-pdf-for-email",
    title: "How to Compress Large PDF Files for Email",
  },
  "merge-pdf": {
    slug: "how-to-merge-pdf-files",
    title: "How to Merge PDF Files on Windows, Mac, iPhone & Android",
  },
  "split-pdf": {
    slug: "how-to-split-pdf-pages",
    title: "How to Split a PDF and Extract the Pages You Need",
  },
  "rotate-pdf": {
    slug: "how-to-rotate-pdf-pages",
    title: "How to Rotate PDF Pages and Save the Change",
  },
  "organize-pdf": {
    slug: "how-to-organize-pdf-pages",
    title: "How to Reorder and Delete Pages in a PDF",
  },
  "watermark-pdf": {
    slug: "how-to-add-watermark-to-pdf",
    title: "How to Add a Watermark to a PDF",
  },
  "unlock-pdf": {
    slug: "how-to-remove-pdf-password",
    title: "How to Remove a Password from a PDF You Own",
  },
  "protect-pdf": {
    slug: "how-to-remove-pdf-password",
    title: "How to Remove or Add a Password on a PDF",
  },
};

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => {
    if (params.slug === "$slug" || params.slug === "%24slug" || params.slug.startsWith("$")) {
      throw redirect({
        to: "/tools",
        statusCode: 301,
      });
    }
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
  const isRotate = tool.slug === "rotate-pdf";
  const [hasUploadedFile, setHasUploadedFile] = useState(false);

  useEffect(() => {
    setHasUploadedFile(false);
  }, [tool.slug]);

  useEffect(() => {
    track("tool_page_view", { tool: tool.slug });
  }, [tool.slug]);

  // Scroll to top for ALL tools when a file is uploaded so the workspace is always visible
  useEffect(() => {
    if (hasUploadedFile) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hasUploadedFile]);

  return (
    <div
      className={`container-page transition-all duration-300 ${
        hasUploadedFile ? "pt-6 sm:pt-8 pb-10" : "py-6 sm:py-10"
      }`}
    >
      {/* Hero Section — collapsed when a file is uploaded */}
      {!hasUploadedFile ? (
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-2 flex justify-center">
            <Breadcrumbs
              items={[
                { label: "Home", to: "/" },
                { label: "PDF Tools", to: "/tools" },
                { label: tool.name },
              ]}
            />
          </div>

          {isRotate && (
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-mint/90 px-3.5 py-1 text-xs font-semibold text-primary shadow-xs">
              <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Free Browser Tool · Permanent Rotation · No Uploads</span>
            </div>
          )}

          <h1 className="text-3xl font-extrabold tracking-tight text-forest sm:text-4xl lg:text-[2.6rem] leading-tight">
            {isRotate ? "Rotate PDF pages easily" : tool.h1}
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground sm:text-lg leading-relaxed animate-in fade-in duration-300">
            {isRotate
              ? "Permanently fix upside-down or sideways PDF pages by 90°, 180°, or 270°. Rotate all pages or target specific pages with instant lossless saving directly in your browser."
              : tool.tagline}
          </p>
        </div>
      ) : (
        /* Keep h1 in DOM for SEO, but hidden visually */
        <h1 className="sr-only">{isRotate ? "Rotate PDF pages easily" : tool.h1}</h1>
      )}

      {/* Main Tool Workspace */}
      <div
        className={`mx-auto transition-all duration-300 max-w-3xl ${
          hasUploadedFile ? "mt-0" : "mt-8"
        }`}
      >
        <ToolWorkspace tool={tool} onHasFilesChange={setHasUploadedFile} />

        {/* Privacy Banner */}
        <aside
          aria-label="Security guarantee"
          className="mt-5 rounded-2xl border border-primary/20 bg-mint/80 p-4 sm:p-5 shadow-soft transition-all"
        >
          <div className="flex items-start gap-3.5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-soft ring-1 ring-primary/20">
              <ShieldCheck className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-sm font-bold text-forest">100% Private In-Browser Processing</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Your documents are processed securely inside this browser tab. Your files never
                leave your device, and are never uploaded, stored, or shared. Read our full{" "}
                <a
                  href="/security"
                  className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
                >
                  security page
                </a>
                .
              </p>
            </div>
          </div>
        </aside>
      </div>

      {/* Supporting Sections */}
      <div className="mx-auto mt-16 max-w-4xl space-y-16">
        <HowToUse tool={tool} />

        {/* Step-by-Step Tutorial Banner for Long-tail Searchers */}
        {relatedGuide && (
          <aside
            aria-label="Step-by-step guide"
            className="card-soft flex flex-col items-start justify-between gap-4 p-5 sm:flex-row sm:items-center sm:p-6 bg-mint/50 border-primary/20"
          >
            <div className="flex items-start gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-card text-primary shadow-soft ring-1 ring-primary/20">
                <BookOpen className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-bold text-forest">Detailed Step-by-Step Tutorial</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Learn how to use {tool.name} with tips for Windows 11, Mac, iPhone, and Android.
                </p>
              </div>
            </div>
            <Link
              to="/blog/$slug"
              params={{ slug: relatedGuide.slug }}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-primary px-4.5 py-2.5 text-xs font-semibold text-primary-foreground shadow-lift transition-all hover:bg-primary-dark hover:scale-[1.02] active:scale-[0.98]"
            >
              Read guide →
            </Link>
          </aside>
        )}

        {/* Why Use Section */}
        <section aria-labelledby="why">
          <div className="text-center sm:text-left">
            <h2 id="why" className="text-2xl font-extrabold text-forest sm:text-3xl">
              Why use MyPDF4U for {tool.name}?
            </h2>
            <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              No account, no software installation, and no waiting queues. Every tool opens directly
              to the upload area with zero watermarks and no file count restrictions. Your files are
              processed locally in client memory, keeping your documents confidential while
              delivering instant results.
            </p>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="card-soft p-5 bg-card/80 transition-all hover:border-primary/40 hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-primary">
                <Laptop className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-forest">Windows, Mac & Linux</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Works in Chrome, Edge, Safari, and Firefox with no software download.
              </p>
            </div>

            <div className="card-soft p-5 bg-card/80 transition-all hover:border-primary/40 hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-lavender text-purple-700">
                <Smartphone className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-forest">iPhone & Android</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Mobile-first design lets you process files directly from photo galleries and Files.
              </p>
            </div>

            <div className="card-soft p-5 bg-card/80 transition-all hover:border-primary/40 hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mint text-primary">
                <RotateCw className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-forest">Permanent Metadata</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Rotations are written directly into the PDF specification, so it stays fixed
                forever.
              </p>
            </div>

            <div className="card-soft p-5 bg-card/80 transition-all hover:border-primary/40 hover:-translate-y-0.5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-peach text-amber-700">
                <Lock className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-3.5 text-sm font-bold text-forest">100% Private & Free</h3>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                Zero server uploads, no subscription walls, and no added watermarks.
              </p>
            </div>
          </div>
        </section>

        <KeyFeatures tool={tool} />
        <Faq items={tool.faqs} />

        {/* Good to Know Section */}
        <section aria-labelledby="learn">
          <div className="card-soft border-primary/20 bg-gradient-to-br from-mint/50 via-card to-lavender/30 p-6 sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-card text-primary shadow-soft ring-1 ring-primary/20">
                <Lightbulb className="h-6 w-6" aria-hidden="true" />
              </div>
              <div>
                <h2 id="learn" className="text-xl font-bold text-forest sm:text-2xl">
                  Good to know
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {tool.learn}
                </p>
              </div>
            </div>
          </div>
        </section>

        <RelatedTools slugs={tool.related} />
      </div>
    </div>
  );
}
