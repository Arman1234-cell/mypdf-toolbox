import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, meta } from "@/components/layout/Prose";

export const Route = createFileRoute("/terms")({
  head: () =>
    meta(
      "/terms",
      "Terms of Use — MyPDF4U",
      "The terms for using MyPDF4U's free browser-based PDF tools, including acceptable use and limits of liability.",
    ),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell
      breadcrumb="Terms"
      title="Terms of use"
      intro="By using MyPDF4U you agree to the terms below. They're written by the site owner in plain language."
    >
      <Section heading="The service">
        <p>
          MyPDF4U provides free document tools that run in your browser. Tools are offered as-is and
          may change, pause or be removed. Tools labelled “Soon” are not available yet.
        </p>
      </Section>

      <Section heading="Acceptable use">
        <p>
          Only process documents you own or are authorised to handle. Do not use the site to
          infringe copyright, to remove protections from files you have no right to modify, or to
          attempt to disrupt the service.
        </p>
      </Section>

      <Section heading="No warranty">
        <p>
          Document conversion is imperfect: layout, fonts and image quality can shift. We make no
          warranty that output will be error-free or fit for a particular purpose. Always keep your
          original file and check the result before relying on it.
        </p>
      </Section>

      <Section heading="Limitation of liability">
        <p>
          To the extent permitted by law, the site owner is not liable for data loss, corrupted
          output, or indirect losses arising from use of these tools.
        </p>
      </Section>

      <Section heading="Privacy and contact">
        <p>
          File handling is described in the{" "}
          <Link to="/privacy" className="font-semibold text-primary underline">
            privacy policy
          </Link>
          . Reach us via the{" "}
          <Link to="/contact" className="font-semibold text-primary underline">
            contact page
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
