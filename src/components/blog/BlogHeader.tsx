"use client";

import { useI18n } from "@/lib/i18n";

export default function BlogHeader() {
  const { t } = useI18n();

  return (
    <div className="mb-12 max-w-2xl">
      <div className="flex items-center gap-3">
        <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
          {t("blog.badge")}
        </p>
        <a
          href="/feed.xml"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[10px] font-mono text-text-muted transition-colors hover:border-accent/30 hover:text-accent"
        >
          <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
            <circle cx="6.18" cy="17.82" r="2.18" />
            <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
          </svg>
          {t("blog.rss")}
        </a>
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-text-primary">
        {t("blog.title")}
      </h1>
      <p className="mt-3 text-lg text-text-muted">
        {t("blog.description")}
      </p>
    </div>
  );
}
