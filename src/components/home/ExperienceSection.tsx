"use client";

import { useI18n } from "@/lib/i18n";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { formatDateRange } from "@/lib/format";
import Container from "@/components/ui/Container";
import ExperienceHighlightCard from "@/components/experience/ExperienceHighlightCard";

export default function ExperienceSection() {
  const { t } = useI18n();

  // Build project lookup for cross-links
  const projectMap = projects.map((p) => ({ id: p.id, title: p.title, slug: p.slug }));

  return (
    <section id="experience" aria-label="Experience" className="border-b border-border bg-bg-surface py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{t("experience.badge")}</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">{t("experience.title")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            {t("experience.description")}
          </p>
        </div>

        <div className="space-y-5">
          {experiences.map((exp) => {
            const topHighlights = exp.highlights.slice(0, 2);
            const primaryMetric = exp.highlights[0]?.metrics?.[0];

            // Resolve project links from highlight projectIds
            const highlightProjectIds = topHighlights.flatMap((h) => h.projectIds ?? []);
            const linkedProjects = projectMap.filter((p) => highlightProjectIds.includes(p.id));

            return (
              <div
                key={exp.id}
                className="card-hover group rounded-xl border border-border bg-bg p-5 transition-colors hover:border-accent/30"
              >
                {/* Header row */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-base font-bold text-text-primary">
                        {exp.company}
                      </h3>
                      <span className="font-mono text-xs text-text-muted">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-accent">{exp.role}</p>
                      {exp.location && (
                        <span className="text-xs text-text-muted">· {exp.location}</span>
                      )}
                    </div>
                  </div>

                  {/* Metric badge */}
                  {primaryMetric && (
                    <div className="shrink-0 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2 text-center">
                      <p className="text-lg font-bold font-mono text-accent">{primaryMetric.value}</p>
                      <p className="text-[10px] text-text-muted">{primaryMetric.label}</p>
                    </div>
                  )}
                </div>

                {/* Top highlights */}
                {topHighlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {topHighlights.map((h, i) => (
                      <ExperienceHighlightCard key={i} highlight={h} compact linkedProjects={linkedProjects} />
                    ))}
                  </ul>
                )}

                {/* Tech tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {exp.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-bg-surface px-2 py-0.5 font-mono text-[10px] text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 6 && (
                      <span className="px-1 py-0.5 text-[10px] text-text-muted">
                        +{exp.technologies.length - 6} {t("experience.more")}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
