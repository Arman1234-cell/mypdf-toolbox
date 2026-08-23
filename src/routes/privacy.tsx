import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, meta } from "@/components/layout/Prose";

export const Route = createFileRoute("/privacy")({
  head: () =>
    meta(
      "/privacy",
      "Privacy Policy — MyPDF4U",
      "What MyPDF4U does and does not collect: no accounts, no document uploads for live tools, and no analytics profile of you.",
    ),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell
      breadcrumb="Privacy"
      title="Privacy policy"
      intro="Written by the site owner to describe current practice. It will be updated if the site's behaviour changes."
    >
      <Section heading="Documents you process">
        <p>
          Tools marked as live run entirely in your browser. Your files are not uploaded to us, so
          we cannot read, copy, retain or share them. See the{" "}
          <Link to="/security" className="font-semibold text-primary underline">
            security page
          </Link>{" "}
          for the mechanism.
        </p>
      </Section>

      <Section heading="Accounts">
        <p>
          No accounts exist. We do not ask for your name, email address or payment details to use a
          tool.
        </p>
      </Section>

      <Section heading="Analytics and cookies">
        <p>
          No third-party analytics or advertising scripts are installed, and we set no tracking
          cookies. Basic usage counters, where present, run locally in your browser and are not sent
          anywhere. If this changes, this page will be updated before the change ships.
        </p>
      </Section>

      <Section heading="Third-party services">
        <p>
          Our web font is loaded from Google Fonts, which receives your IP address as part of that
          request — the same as any hosted asset. Our hosting provider processes standard server
          logs needed to serve the site.
        </p>
      </Section>

      <Section heading="Your choices">
        <p>
          Because we hold no personal data about you, there is no profile to export or erase. If you
          contact us, keep your message to what's needed to help you and avoid sending confidential
          documents.
        </p>
      </Section>

      <Section heading="Contact">
        <p>
          Questions about this policy can be sent through the{" "}
          <Link to="/contact" className="font-semibold text-primary underline">
            contact page
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
