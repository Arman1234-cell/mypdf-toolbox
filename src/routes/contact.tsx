import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, meta } from "@/components/layout/Prose";
import { Mail } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () =>
    meta(
      "/contact",
      "Contact MyPDF4U — Feedback & Bug Reports",
      "Send feedback, report a bug, or request a tool at MyPDF4U. We read every message sent to our support email.",
    ),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell
      breadcrumb="Contact"
      title="Contact us"
      intro="Missing a tool? Hit a file that wouldn't convert? Tell us what happened."
    >
      <Section heading="Email us directly">
        <p>
          The fastest way to reach us is by email. Send your message — including
          which tool you used, roughly how large the file was, your browser, and
          what you expected to happen — to:
        </p>
        <a
          href="mailto:support@mypdf4u.com"
          className="mt-3 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
        >
          <Mail className="h-4 w-4" aria-hidden="true" />
          support@mypdf4u.com
        </a>
      </Section>

      <Section heading="Good things to include">
        <ul className="list-disc space-y-1 pl-4">
          <li>The tool you used (e.g. Compress PDF, JPG to PDF)</li>
          <li>Roughly how large the file was</li>
          <li>Your browser and device type</li>
          <li>What you expected to happen vs. what actually happened</li>
        </ul>
        <p className="mt-3">
          Please never attach confidential documents to a bug report.
        </p>
      </Section>

      <Section heading="Feature requests">
        <p>
          Want a PDF tool that isn't here yet? Let us know at{" "}
          <a
            href="mailto:support@mypdf4u.com"
            className="font-semibold text-primary underline hover:no-underline"
          >
            support@mypdf4u.com
          </a>
          . We prioritise tools based on what visitors actually need.
        </p>
      </Section>
    </PageShell>
  );
}
