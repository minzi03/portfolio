import Link from "next/link";
import { siteConfig } from "@/data/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-bg-surface">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-8 text-center text-sm text-text-muted sm:flex-row sm:justify-between sm:text-left">
        <div>
          <span className="font-mono font-bold text-text-secondary">
            {siteConfig.shortName}<span className="text-accent">.</span>
          </span>
          <span className="ml-2">© {new Date().getFullYear()}</span>
        </div>

        <div className="flex gap-4">
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text-primary">
            GitHub
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text-primary">
            LinkedIn
          </a>
          <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-text-primary">
            Email
          </a>
          <Link href="/resume" className="transition-colors hover:text-text-primary">
            Resume
          </Link>
        </div>
      </div>
    </footer>
  );
}
