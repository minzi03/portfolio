import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center bg-bg py-24">
      <div className="mx-auto max-w-2xl px-6 text-center">
        {/* Large 404 */}
        <p className="font-mono text-[80px] font-bold leading-none text-accent/20 sm:text-[120px]">
          404
        </p>

        {/* Data-themed message */}
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
          The dataset you&apos;re looking for isn&apos;t available in this collection.
          It may have been moved, deleted, or never existed.
        </p>

        {/* ASCII data pipeline — decorative */}
        <pre aria-hidden="true" className="mx-auto mt-6 inline-block text-left font-mono text-[11px] leading-tight text-text-muted/40">
{`  request
     │
     ▼
  ┌──────┐
  │ 404  │  ← not found
  └──────┘
     │
     ▼
  redirect → /`}
        </pre>

        {/* Quick links */}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
          >
            Back to home
          </Link>
          <Link
            href="#contact"
            className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            Contact me
          </Link>
        </div>

        {/* Section quick nav */}
        <div className="mt-8 flex flex-wrap justify-center gap-x-4 gap-y-2 text-xs text-text-muted">
          <Link href="/#about" className="transition-colors hover:text-text-primary">About</Link>
          <Link href="/#flagship" className="transition-colors hover:text-text-primary">Projects</Link>
          <Link href="/#experience" className="transition-colors hover:text-text-primary">Experience</Link>
          <Link href="/#method" className="transition-colors hover:text-text-primary">Method</Link>
          <Link href="/resume" className="transition-colors hover:text-text-primary">Resume</Link>
        </div>
      </div>
    </div>
  );
}
