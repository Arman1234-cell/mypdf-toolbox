import { createFileRoute } from "@tanstack/react-router";
import { PageShell, Section, meta } from "@/components/layout/Prose";

export const Route = createFileRoute("/security")({
  head: () =>
    meta(
      "/security",
      "Security & File Handling — MyPDF4U",
      "How MyPDF4U handles your files: in-browser processing, no uploads for live tools, no storage, and what we deliberately don't claim.",
    ),
  component: SecurityPage,
});

function SecurityPage() {
  return (
    <PageShell
      breadcrumb="Security"
      title="Security and file handling"
      intro="Plain answers about what happens to a document when you use MyPDF4U — including the limits of what we can promise."
    >
      <Section heading="How files are processed">
        <p>
          Every tool currently marked as live processes your file inside your own browser tab using
          JavaScript. Your document is read from your device into browser memory, transformed there,
          and offered back to you as a download. It is not transmitted to MyPDF4U servers, so there
          is no upload step to intercept.
        </p>
      </Section>

      <Section heading="Storage and deletion">
        <p>
          Because live tools do not upload files, we hold no copy of your document — there is
          nothing for us to store or delete. Results exist only as temporary in-memory objects in
          your tab and disappear when you close or reload the page.
        </p>
        <p>
          If we later add tools that genuinely require server-side processing (for example OCR or
          Office conversion), those tools will state so on their page, and we will publish the
          retention window before they go live rather than after.
        </p>
      </Section>

      <Section heading="Encryption">
        <p>
          The site itself is served over HTTPS, so the page and its code arrive encrypted in
          transit. We do not claim end-to-end encryption of your documents, because for in-browser
          tools the document never travels anywhere — encryption in transit simply doesn't apply to
          it.
        </p>
      </Section>

      <Section heading="Validation and abuse prevention">
        <p>
          Files are checked for type and size before processing, and unreadable or
          password-protected documents are reported with a clear message instead of a crash. Because
          processing is local, there is no shared queue to overload; any future server-side tool
          will add rate limiting at the endpoint.
        </p>
      </Section>

      <Section heading="Third parties">
        <p>
          We load a web font from Google Fonts for typography. Beyond that, live tools make no
          third-party requests with your file data. No analytics provider is installed today; if one
          is added, it will be disclosed on our privacy page.
        </p>
      </Section>

      <Section heading="What we deliberately don't claim">
        <p>
          You will not find security certifications, audit badges or “military-grade encryption”
          claims here. We would rather describe the actual mechanism — local processing, no storage
          — and let you judge whether it fits your documents.
        </p>
      </Section>
    </PageShell>
  );
}
