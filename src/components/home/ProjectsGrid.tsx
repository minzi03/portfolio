"use client";

import { useI18n } from "@/lib/i18n";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import { LazyProjectGrid } from "@/components/ui/LazySection";

export default function ProjectsGrid() {
  const { t } = useI18n();

  return (
    <section id="projects" aria-label="All projects" className="border-b border-border bg-bg-surface py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{t("projects.badge")}</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">{t("projects.title")}</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            {t("projects.description").replace("{count}", String(projects.length - 1))}
          </p>
        </div>

        <LazyProjectGrid />
      </Container>
    </section>
  );
}
