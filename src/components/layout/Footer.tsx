import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/brand/Logo";
import { tools } from "@/lib/tools";

const popular = ["jpg-to-pdf", "compress-pdf", "merge-pdf", "split-pdf", "pdf-to-jpg"];
const convert = ["pdf-to-png", "png-to-pdf", "image-to-pdf", "pdf-to-word", "word-to-pdf"];

function ToolLinks({ slugs }: { slugs: string[] }) {
  return (
    <ul className="mt-4 space-y-2.5">
      {slugs.map((slug) => {
        const tool = tools.find((item) => item.slug === slug);
        if (!tool) return null;
        return (
          <li key={slug}>
            <Link
              to="/$slug"
              params={{ slug }}
              className="text-sm text-muted-foreground transition-colors hover:text-primary"
            >
              {tool.name}
              {tool.status === "soon" && " (soon)"}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-card">
      <div className="container-page grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 text-primary">
            <LogoMark className="h-8 w-8" />
            <span className="text-base font-bold text-foreground">
              MyPDF<span className="text-primary">4U</span>
            </span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Simple PDF tools for everyday work. Convert, compress and organize documents right in
            your browser.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Popular tools</h2>
          <ToolLinks slugs={popular} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Convert PDF</h2>
          <ToolLinks slugs={convert} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Company</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            <li>
              <Link to="/about" className="transition-colors hover:text-primary">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/blog" className="transition-colors hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/security" className="transition-colors hover:text-primary">
                Security
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors hover:text-primary">
                Privacy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="transition-colors hover:text-primary">
                Terms
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="transition-colors hover:text-primary">
                Cookies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MyPDF4U</p>
          <p>Built for students, freelancers and teams who just need the file done.</p>
        </div>
      </div>
    </footer>
  );
}
