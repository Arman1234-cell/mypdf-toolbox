import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell, Section, meta } from "@/components/layout/Prose";

export const Route = createFileRoute("/contact")({
  head: () =>
    meta(
      "/contact",
      "Contact MyPDF4U — Feedback & Bug Reports",
      "Tell us which PDF tool you need next, or report a file that didn't convert correctly. We read every message.",
    ),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <PageShell
      breadcrumb="Contact"
      title="Contact us"
      intro="Missing a tool? Hit a file that wouldn't convert? Tell us what happened."
    >
      <Section heading="Send a message">
        {sent ? (
          <p
            role="status"
            className="rounded-xl border border-primary/30 bg-secondary px-4 py-3 text-sm text-secondary-foreground"
          >
            Thanks — your message is noted in this browser. Email delivery isn't connected yet, so
            please don't include anything confidential.
          </p>
        ) : (
          <form
            className="space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-foreground">
                Your name
              </label>
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-foreground">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-foreground">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
              />
            </div>
            <button
              type="submit"
              className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
            >
              Send message
            </button>
            <p className="text-xs text-muted-foreground">
              This form is not yet connected to an inbox — messages stay in your browser for now.
            </p>
          </form>
        )}
      </Section>

      <Section heading="Good things to include">
        <p>
          The tool you used, roughly how large the file was, your browser, and what you expected to
          happen. Please never attach confidential documents to a bug report.
        </p>
      </Section>
    </PageShell>
  );
}
