import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Download,
  Gauge,
  Laptop,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Wand2,
} from "lucide-react";
import { popularTools, toolsByCategory, liveTools } from "@/lib/tools";
import { Faq, ToolCard } from "@/components/tools/ToolSections";

import { getAbsoluteUrl, SITE_NAME, DEFAULT_OG_IMAGE } from "@/lib/config";

const title = "MyPDF4U — Simple PDF Tools, Fast Results";
const description =
  "Convert, compress, merge, split, OCR and organize PDF files free in your browser. No account, no installation — fast, private, and easy to use.";
const fullUrl = getAbsoluteUrl("/");

export const Route = createFileRoute("/")({
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
          "@type": "WebSite",
          name: SITE_NAME,
          url: fullUrl,
          description,
          potentialAction: {
            "@type": "SearchAction",
            target: `${getAbsoluteUrl("/tools")}?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: SITE_NAME,
          url: fullUrl,
          logo: DEFAULT_OG_IMAGE,
          description: "Online browser-based PDF conversion and optimization tools.",
        }),
      },
    ],
  }),
  component: Home,
});

const homeFaqs = [
  {
    q: "Do I need an account to use MyPDF4U?",
    a: "No. Every working tool can be used straight away without signing up or installing anything.",
  },
  {
    q: "Are my files uploaded to a server?",
    a: "Our live tools process files inside your browser using JavaScript, so documents are not sent to us at all.",
  },
  {
    q: "Which tools work right now?",
    a: `${liveTools.length} tools are live, including JPG to PDF, PDF to JPG, compress, merge, split, rotate, watermark and organize. Tools still in development are clearly marked "Soon".`,
  },
  {
    q: "Is there a file size limit?",
    a: "Files up to 100 MB are accepted. Because processing happens on your device, very large files depend on your computer's memory.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes. The interface is built mobile-first, with large upload targets and thumb-friendly buttons.",
  },
];

const useCases = [
  { title: "Job applications", body: "Merge a CV and cover letter into one PDF before uploading." },
  {
    title: "Invoices & receipts",
    body: "Turn photographed receipts into a single PDF for expenses.",
  },
  { title: "Coursework", body: "Combine handwritten pages into one file for submission." },
  {
    title: "Email attachments",
    body: "Compress a scanned contract until it slips under the size limit.",
  },
];

function Home() {
  return (
    <>
      <section className="border-b border-border bg-mint">
        <div className="container-page py-12 sm:py-16">
          <div className="mx-auto max-w-2xl text-center">
            <p className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-secondary-foreground">
              <Sparkles className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Your simple PDF toolbox
            </p>
            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              Simple PDF tools. Fast results.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Convert, compress, merge, split and manage your PDF files online — right in your
              browser.
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a
                href="#popular"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark sm:w-auto"
              >
                Explore PDF tools
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <Link
                to="/tools"
                className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-6 py-3 text-base font-medium text-foreground transition-colors hover:bg-secondary sm:w-auto"
              >
                All tools
              </Link>
            </div>
            <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <Laptop className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> No installation
                required
              </li>
              <li className="flex items-center gap-1.5">
                <Wand2 className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Easy to use
              </li>
              <li className="flex items-center gap-1.5">
                <Gauge className="h-3.5 w-3.5 text-primary" aria-hidden="true" /> Works in your
                browser
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section id="popular" className="container-page scroll-mt-20 py-12 sm:py-14">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              Popular PDF tools
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              The tasks people come here for most.
            </p>
          </div>
          <Link
            to="/tools"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
          >
            See all tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {popularTools.map((tool) => (
            <ToolCard key={tool.slug} tool={tool} />
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card py-12 sm:py-14">
        <div className="container-page">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            All PDF tools
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Grouped by what you're trying to do. Tools still in development are labelled.
          </p>
          <div className="mt-8 space-y-8">
            {toolsByCategory.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {group.category}
                </h3>
                <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {group.items.map((tool) => (
                    <ToolCard key={tool.slug} tool={tool} compact />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-14">
        <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
          Why MyPDF4U
        </h2>
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground">
          MyPDF4U is a small toolbox for the document jobs that come up every week: turning photos
          into a PDF, shrinking a scan so it fits an upload limit, joining separate files into one,
          pulling a few pages out of a long report, or exporting pages as images. Each tool lives on
          its own page and opens straight onto the upload area — there is no dashboard to learn and
          no sign-up before you can try it.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Gauge, title: "Fast", body: "Work starts the moment you choose a file." },
            {
              icon: ShieldCheck,
              title: "Private by design",
              body: "Live tools never upload your documents.",
            },
            { icon: Wand2, title: "Simple", body: "One task per page, one obvious next step." },
            { icon: Laptop, title: "Browser-based", body: "Nothing to install on any device." },
          ].map((item) => (
            <div key={item.title} className="card-soft p-5">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-primary">
                <item.icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground">{item.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-mint py-12 sm:py-14">
        <div className="container-page">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            How it works
          </h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              {
                icon: UploadCloud,
                title: "Upload your file.",
                body: "Click or drag and drop — no account needed.",
              },
              {
                icon: Wand2,
                title: "We process it.",
                body: "Your browser does the work, with clear progress.",
              },
              {
                icon: Download,
                title: "Download your result.",
                body: "One button, straight to your device.",
              },
            ].map((step, index) => (
              <div key={step.title} className="card-soft p-6 text-center">
                <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary text-primary">
                  <step.icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <p className="mt-4 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Step {index + 1}
                </p>
                <p className="mt-1 text-base font-semibold text-foreground">{step.title}</p>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-12 sm:py-14">
        <div className="card-soft grid gap-6 p-6 sm:p-8 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-foreground">
              Built for everyday documents
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Contracts, invoices, resumes and coursework all pass through these tools. Our live
              tools run entirely on your device, so the file you pick never travels over the
              network. We don't claim certifications we don't hold — instead we explain exactly how
              processing works.
            </p>
            <Link
              to="/security"
              className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
            >
              Read about security and privacy <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {useCases.map((useCase) => (
              <div key={useCase.title} className="rounded-2xl bg-mint p-4">
                <p className="text-sm font-semibold text-foreground">{useCase.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{useCase.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container-page pb-12">
        <Faq items={homeFaqs} />
      </div>

      <section className="container-page pb-16">
        <div className="rounded-3xl border border-border bg-card p-8 text-center shadow-soft sm:p-12">
          <h2 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Ready when your file is
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
            Pick a tool, drop your document in and download the result. That's the whole flow.
          </p>
          <Link
            to="/tools"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-base font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
          >
            Browse all PDF tools <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
