import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { PageShell, Section, meta } from "@/components/layout/Prose";

const title = "Pricing — Free PDF Tools | MyPDF4U";
const description =
  "MyPDF4U is 100% free to use. Convert, merge, split, compress, and edit PDF files in your browser with no hidden costs or subscription walls.";

export const Route = createFileRoute("/pricing")({
  head: () => meta("/pricing", title, description),
  component: PricingPage,
});

function PricingPage() {
  return (
    <PageShell
      breadcrumb="Pricing"
      title="Simple, Transparent Pricing"
      intro="Every tool on MyPDF4U is free to use right now. No subscriptions, no hidden limits, and no credit card required."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {/* Free Forever Plan */}
        <div className="card-soft relative flex flex-col justify-between border-2 border-primary p-6 shadow-lift">
          <span className="absolute -top-3 right-4 rounded-full bg-primary px-3 py-0.5 text-xs font-semibold text-primary-foreground">
            Current Plan
          </span>
          <div>
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" aria-hidden="true" />
              <h2 className="text-xl font-bold text-foreground">Free Forever</h2>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Everything you need for fast, private everyday PDF tasks.
            </p>
            <p className="mt-4 text-3xl font-extrabold text-foreground">
              $0 <span className="text-sm font-normal text-muted-foreground">/ free</span>
            </p>

            <ul className="mt-6 space-y-3 text-sm text-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                All 15+ live browser PDF tools
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                100% private client-side processing
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                Files up to 100 MB per task
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                Unlimited daily conversions
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-primary" aria-hidden="true" />
                No registration or account needed
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              to="/tools"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
            >
              Start using tools now <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Pro / Cloud Plan (Soon) */}
        <div className="card-soft flex flex-col justify-between p-6 opacity-80">
          <div>
            <h2 className="text-xl font-bold text-foreground">Pro & Teams</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For high-volume automation and multi-gigabyte document batches.
            </p>
            <p className="mt-4 text-3xl font-extrabold text-foreground">Coming Soon</p>

            <ul className="mt-6 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Saved history & cloud backup
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Extended multi-hundred MB file limits
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                REST API for batch conversion
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                Priority cloud OCR engine
              </li>
            </ul>
          </div>

          <div className="mt-8">
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-card px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
            >
              Join the waitlist
            </Link>
          </div>
        </div>
      </div>

      <Section heading="Frequently Asked Questions">
        <div className="space-y-4">
          <div>
            <h3 className="font-semibold text-foreground">Why are these tools free?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Because our tools run directly inside your web browser using JavaScript and
              WebAssembly, we do not incur expensive server processing costs for each file. This
              lets us keep standard tools free and instant.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Are there any hidden limits?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              No hidden daily counters or paywalls. Files up to 100 MB can be processed smoothly in
              your browser.
            </p>
          </div>
        </div>
      </Section>
    </PageShell>
  );
}
