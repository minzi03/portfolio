import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { articles } from "@/data/writing";

export const metadata: Metadata = {
  title: "Writing",
  description: "Technical notes on Data Engineering by Nguyen Minh Duy.",
  alternates: { canonical: "/writing" },
  openGraph: { title: "Writing | Nguyen Minh Duy", description: "Technical notes on Data Engineering — architecture, pipelines, streaming." },
};

export default function WritingPage() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Writing</p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Data Notes
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            Technical notes on Data Engineering — architecture, pipelines, streaming, and the decisions behind them.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/writing/${article.slug}`}
              className="group block rounded-xl border border-border bg-bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-text-muted">{article.date}</span>
                <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                  {article.category}
                </span>
              </div>
              <h2 className="mt-2 text-lg font-semibold text-text-primary group-hover:text-accent">
                {article.title}
              </h2>
              <p className="mt-1 text-sm text-text-secondary">{article.description}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {article.tags.map((tag) => (
                  <span key={tag} className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-text-muted">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
