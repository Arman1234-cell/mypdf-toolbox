import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, ShieldCheck } from "lucide-react";
import { PageShell, meta } from "@/components/layout/Prose";

const title = "Login — MyPDF4U Accounts";
const description =
  "Accounts are optional at MyPDF4U: every PDF tool works without signing in. Join the waiting list for saved history and larger files.";

export const Route = createFileRoute("/login")({
  head: () => meta("/login", title, description),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  return (
    <PageShell
      breadcrumb="Login"
      title="Login to MyPDF4U"
      intro="You don't need an account to use MyPDF4U. Every tool runs in your browser, so there is nothing to sync and nothing to pay for."
    >
      <div className="card-soft p-6">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-mint text-primary">
          <Lock className="h-6 w-6" aria-hidden="true" />
        </span>
        <h2 className="mt-4 text-lg font-bold text-foreground">Accounts are on the way</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          We're building optional accounts for people who want a saved history of the files they've
          processed and higher limits for very large documents. Leave your email and we'll tell you
          the moment it's ready.
        </p>

        {submitted ? (
          <p
            role="status"
            className="mt-5 rounded-xl border border-primary/30 bg-mint px-4 py-3 text-sm text-foreground"
          >
            Thanks — we've noted your interest. Nothing has been sent anywhere yet; this page stores
            your email only in this browser tab.
          </p>
        ) : (
          <form
            className="mt-5 flex flex-col gap-3 sm:flex-row"
            onSubmit={(event) => {
              event.preventDefault();
              setSubmitted(true);
            }}
          >
            <label htmlFor="login-email" className="sr-only">
              Email address
            </label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="flex-1 rounded-xl border border-border bg-card px-3 py-2.5 text-sm text-foreground"
            />
            <button
              type="submit"
              className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lift transition-colors hover:bg-primary-dark"
            >
              Notify me
            </button>
          </form>
        )}
      </div>

      <div className="card-soft p-6">
        <h2 className="text-lg font-bold text-foreground">Use every tool right now, no login</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          Merging, splitting, compressing, converting, OCR and unlocking all work without an account
          because your files never leave your device.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/tools"
            className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition-colors hover:bg-primary-dark"
          >
            Browse all PDF tools
          </Link>
          <Link
            to="/security"
            className="inline-flex items-center gap-2 rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-secondary"
          >
            <ShieldCheck className="h-4 w-4 text-primary" aria-hidden="true" />
            How we handle your files
          </Link>
        </div>
      </div>
    </PageShell>
  );
}
