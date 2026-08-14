"use client";

import { useI18n } from "@/lib/i18n";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { formatDateRange } from "@/lib/format";
import Container from "@/components/ui/Container";
import Link from "next/link";

export default function Timeline() {
  const { t } = useI18n();

  // Sort experiences by start date (newest first)
  const sortedExperiences = [...experiences].sort(
    (a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
  );

  // Build project lookup
  const projectMap = new Map(projects.map((p) => [p.id, p]));

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
            {t("timeline.badge")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("timeline.title")}
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            {t("timeline.description")}
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 top-0 bottom-0 w-px bg-border md:left-1/2" />

          {sortedExperiences.map((exp, index) => {
            const isEven = index % 2 === 0;
            const topHighlights = exp.highlights.slice(0, 3);

            return (
              <div
                key={exp.id}
                className={`relative mb-12 ${
                  isEven ? "md:pr-[calc(50%+2rem)]" : "md:pl-[calc(50%+2rem)]"
                } pl-12 md:pl-0`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 top-6 h-4 w-4 -translate-x-1/2 rounded-full border-2 border-accent bg-bg md:left-1/2" />

                {/* Content card */}
                <div className="rounded-xl border border-border bg-bg-surface p-6 transition-colors hover:border-accent/30">
                  {/* Date badge */}
                  <div className="mb-3">
                    <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
                      {formatDateRange(exp.startDate, exp.endDate)}
                    </span>
                  </div>

                  {/* Role & Company */}
                  <h3 className="text-lg font-bold text-text-primary">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-medium text-accent">
                    {exp.company}
                  </p>
                  {exp.location && (
                    <p className="mt-1 text-xs text-text-muted">
                      📍 {exp.location}
                    </p>
                  )}

                  {/* Highlights */}
                  {topHighlights.length > 0 && (
                    <div className="mt-4 space-y-2">
                      {topHighlights.map((highlight, i) => (
                        <div key={i} className="text-sm text-text-secondary">
                          <p>{highlight.action}</p>
                          {highlight.projectIds && highlight.projectIds.length > 0 && (
                            <div className="mt-2 flex flex-wrap gap-2">
                              {highlight.projectIds.map((projectId) => {
                                const project = projectMap.get(projectId);
                                if (!project) return null;
                                return (
                                  <Link
                                    key={projectId}
                                    href={`/projects/${project.slug}`}
                                    className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent hover:bg-accent/20 transition-colors"
                                  >
                                    📂 {project.title}
                                  </Link>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technologies */}
                  {exp.technologies && exp.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1">
                      {exp.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border bg-bg px-2 py-0.5 font-mono text-[10px] text-text-muted"
                        >
                          {tech}
                        </span>
                      ))}
                      {exp.technologies.length > 5 && (
                        <span className="px-1 py-0.5 text-[10px] text-text-muted">
                          +{exp.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </div>
  );
}
