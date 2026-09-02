import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/brand/Logo";
import { tools } from "@/lib/tools";

const popular = ["jpg-to-pdf", "compress-pdf", "merge-pdf", "split-pdf", "pdf-to-word"];
const convert = ["pdf-to-jpg", "pdf-to-png", "png-to-pdf", "image-to-pdf", "word-to-pdf"];
const organize = ["rotate-pdf", "organize-pdf", "watermark-pdf", "ocr-pdf", "unlock-pdf", "protect-pdf"];

function ToolLinks({ slugs }: { slugs: string[] }) {
  return (
    <ul className="mt-3 space-y-2 text-sm">
      {slugs.map((slug) => {
        const tool = tools.find((item) => item.slug === slug);
        if (!tool) return null;
        return (
          <li key={slug}>
            <Link
              to="/$slug"
              params={{ slug }}
              className="text-muted-foreground transition-colors hover:text-primary"
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
      <div className="container-page grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 text-primary">
            <LogoMark className="h-8 w-8" />
            <span className="text-base font-bold text-foreground">
              MyPDF<span className="text-primary">4U</span>
            </span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
            Simple PDF tools for everyday work. Convert, compress, merge, and edit documents privately inside your browser.
          </p>
          <div className="mt-4">
            <Link
              to="/tools"
              className="text-xs font-semibold text-primary underline hover:text-primary-dark"
            >
              Browse all 17 PDF tools →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Most Popular</h2>
          <ToolLinks slugs={popular} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Convert PDF</h2>
          <ToolLinks slugs={convert} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Edit & Security</h2>
          <ToolLinks slugs={organize} />
        </div>

        <div>
          <h2 className="text-sm font-semibold text-foreground">Guides & Company</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/blog" className="hover:text-primary">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/blog/$slug" params={{ slug: "how-to-convert-jpg-to-pdf" }} className="hover:text-primary">
                JPG to PDF Guide
              </Link>
            </li>
            <li>
              <Link to="/blog/$slug" params={{ slug: "how-to-merge-pdf-files" }} className="hover:text-primary">
                Merge PDF Guide
              </Link>
            </li>
            <li>
              <Link to="/blog/$slug" params={{ slug: "how-to-compress-pdf-for-email" }} className="hover:text-primary">
                Compress PDF Guide
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-primary">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/security" className="hover:text-primary">
                Security & Privacy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-primary">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-primary">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-primary">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-primary">
                Cookie Policy
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
