import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, meta } from "@/components/layout/Prose";
import { liveTools, tools } from "@/lib/tools";

export const Route = createFileRoute("/about")({
  head: () =>
    meta(
      "/about",
      "About MyPDF4U — Your Simple PDF Toolbox",
      "MyPDF4U is a lightweight set of browser-based PDF tools built around one idea: open the page, do the job, download the file.",
    ),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell
      breadcrumb="About"
      title="About MyPDF4U"
      intro="A small, fast toolbox for the PDF jobs that keep interrupting your day."
    >
      <Section heading="What we're building">
        <p>
          MyPDF4U exists because most document tasks are tiny — join two files, shrink a scan, pull
          out three pages — and most tools make them feel big. Every page here does one job, opens
          straight onto the upload area, and gets out of your way once the download is ready.
        </p>
      </Section>

      <Section heading="How we decide what ships">
        <p>
          {liveTools.length} of our {tools.length} planned tools are live. The rest are visible but
          clearly marked “Soon”, because a converter that quietly mangles your layout is worse than
          one that isn't there yet. When a tool appears without that label, it works.
        </p>
      </Section>

      <Section heading="Free, without the usual catches">
        <p>
          No account, no email wall before your first conversion, no popup between you and the
          download button. Live tools run in your browser, so we don't carry server costs for them —
          which is what makes free sustainable rather than a bait for an upsell.
        </p>
      </Section>

      <Section heading="Where to start">
        <p>
          Browse the{" "}
          <Link to="/tools" className="font-semibold text-primary underline">
            full tool list
          </Link>
          , or read how we handle documents on the{" "}
          <Link to="/security" className="font-semibold text-primary underline">
            security page
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
