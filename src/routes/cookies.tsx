import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, Section, meta } from "@/components/layout/Prose";

const title = "Cookie Policy — MyPDF4U";
const description =
  "MyPDF4U uses zero tracking or advertising cookies. Learn how your privacy is protected when using our browser-based PDF tools.";

export const Route = createFileRoute("/cookies")({
  head: () => meta("/cookies", title, description),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <PageShell
      breadcrumb="Cookies"
      title="Cookie Policy"
      intro="Plain facts about cookies and local storage on MyPDF4U."
    >
      <Section heading="No tracking or advertising cookies">
        <p>
          MyPDF4U does not use any third-party tracking, advertising, or profiling cookies. When you
          visit the website and use our PDF tools, no tracking identifiers are placed on your device
          to follow your activity across other websites.
        </p>
      </Section>

      <Section heading="Essential local browser storage">
        <p>
          Our application may use temporary browser memory and standard session storage purely to
          remember your active workspace preferences (such as selected compression levels or
          rotation angles) while your tab remains open. This data stays entirely on your device and
          is never transmitted to us.
        </p>
      </Section>

      <Section heading="Third-party assets">
        <p>
          We load high-performance typography from Google Fonts. Like standard web assets, this
          request transmits basic network information needed to serve font files, but does not
          install tracking cookies.
        </p>
      </Section>

      <Section heading="Managing cookies">
        <p>
          You can clear your browser cache and local storage at any time through your browser
          settings. Because we do not use tracking cookies, our tools will continue to function
          normally.
        </p>
      </Section>

      <Section heading="Questions">
        <p>
          If you have any questions regarding our cookie policy or file privacy, please reach out
          via our{" "}
          <Link to="/contact" className="font-semibold text-primary underline">
            contact page
          </Link>
          .
        </p>
      </Section>
    </PageShell>
  );
}
