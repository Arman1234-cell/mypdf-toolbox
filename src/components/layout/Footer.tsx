import { Link } from "@tanstack/react-router";
import { LogoMark } from "@/components/brand/Logo";
import { tools } from "@/lib/tools";

const popular = ["jpg-to-pdf", "compress-pdf", "merge-pdf", "split-pdf", "pdf-to-word"];
const convert = ["pdf-to-jpg", "pdf-to-png", "png-to-pdf", "image-to-pdf", "word-to-pdf"];
const organize = [
  "rotate-pdf",
  "organize-pdf",
  "watermark-pdf",
  "ocr-pdf",
  "unlock-pdf",
  "protect-pdf",
];

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
    <footer className="mt-32 border-t border-border bg-card">
      <div className="container-page grid gap-12 py-20 sm:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-1">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-[1.25rem] bg-mint text-primary ring-1 ring-border shadow-sm">
              <LogoMark className="h-full w-full" />
            </div>
            <span className="text-base font-extrabold text-forest">
              MyPDF<span className="text-primary">4U</span>
            </span>
          </div>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            Simple, private PDF tools for everyday work. Convert, compress, rotate, and edit
            documents locally inside your browser.
          </p>
          <div className="mt-4">
            <Link
              to="/tools"
              className="inline-flex items-center gap-1 text-xs font-bold text-primary underline underline-offset-2 hover:text-primary-dark transition-colors"
            >
              Browse all 17 PDF tools →
            </Link>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-forest">Most Popular</h2>
          <ToolLinks slugs={popular} />
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-forest">Convert PDF</h2>
          <ToolLinks slugs={convert} />
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-forest">
            Edit & Security
          </h2>
          <ToolLinks slugs={organize} />
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-forest">
            Guides & Company
          </h2>
          <ul className="mt-3.5 space-y-2 text-sm text-muted-foreground">
            <li>
              <Link to="/blog" className="hover:text-forest transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/blog/$slug"
                params={{ slug: "how-to-convert-jpg-to-pdf" }}
                className="hover:text-forest transition-colors"
              >
                JPG to PDF Guide
              </Link>
            </li>
            <li>
              <Link
                to="/blog/$slug"
                params={{ slug: "how-to-merge-pdf-files" }}
                className="hover:text-forest transition-colors"
              >
                Merge PDF Guide
              </Link>
            </li>
            <li>
              <Link
                to="/blog/$slug"
                params={{ slug: "how-to-compress-pdf-for-email" }}
                className="hover:text-forest transition-colors"
              >
                Compress PDF Guide
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-forest transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/security" className="hover:text-forest transition-colors">
                Security & Privacy
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-forest transition-colors">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-forest transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-forest transition-colors">
                Terms of Service
              </Link>
            </li>
            <li>
              <Link to="/cookies" className="hover:text-forest transition-colors">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border bg-card/60">
        <div className="container-page flex flex-col gap-3 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 MyPDF4U · All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            <span>Built for students, freelancers, and teams who just need the file done.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
