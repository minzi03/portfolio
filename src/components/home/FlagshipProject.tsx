"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import ArchitecturePreview from "@/components/projects/ArchitecturePreview";
import ArchitectureTeaser from "@/components/projects/ArchitectureTeaser";

export default function FlagshipProject() {
  const { t } = useI18n();
  const flagship = projects.find((p) => p.featured);
  if (!flagship) return null;

  return (
    <section id="flagship" aria-label="Featured project" className="border-b border-border bg-bg py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{t("featured.badge")}</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">{t("featured.title")}</h2>
        </div>

        <Link
          href={`/projects/${flagship.slug}`}
          aria-label={`View case study for ${flagship.title}`}
          className="card-hover group block rounded-md border border-accent/20 bg-bg-surface p-6 transition-colors hover:border-accent/40"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                  Production-like
                </span>
                <span className="rounded bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-400">
                  Complete
                </span>
              </div>

              <p className="text-sm text-text-secondary">
                Unified batch + CDC analytics platform — 16 sources, 53 tables,
                4.6M+ curated transactions with column-level lineage.
              </p>

              {/* Architecture preview */}
              <ArchitecturePreview projectId={flagship.id} />

              {/* Interactive architecture teaser */}
              <ArchitectureTeaser />

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {flagship.tech.slice(0, 6).map((s) => (
                  <span key={s} className="rounded-sm border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: metrics — these are the detailed breakdown */}
            <div className="flex flex-wrap gap-6 lg:flex-col lg:gap-4">
              {flagship.impact && flagship.impact.slice(0, 3).map((m) => (
                <div key={m.id} className="text-center lg:text-right">
                  <p className="text-xl font-bold font-mono text-accent">{m.value}</p>
                  <p className="text-[11px] text-text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-accent">
            <span>{t("featured.cta")}</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </Link>
      </Container>
    </section>
  );
}
