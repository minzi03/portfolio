"use client";

import { useState } from "react";
import type { Skill } from "@/data/types";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";

/* ─── Featured skills — the most important ones ─── */

const FEATURED_SKILLS = [
  "Python", "SQL", "Apache Spark", "Apache Kafka", "Apache Iceberg",
  "Apache Airflow", "dbt", "Docker", "PostgreSQL", "Azure Databricks",
  "Data Modeling", "ETL", "Data Quality", "Data Warehousing",
];

/* ─── Skill chip ─── */

interface SkillChipProps {
  skill: Skill;
  featured?: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function SkillChip({ skill, featured, isExpanded, onToggle }: SkillChipProps) {
  const projectCount = skill.projectIds?.length ?? 0;
  const experienceCount = skill.experienceIds?.length ?? 0;
  const credentialCount = skill.credentialIds?.length ?? 0;
  const evidenceCount = projectCount + experienceCount + credentialCount;

  const linkedProjects = (skill.projectIds ?? [])
    .slice(0, 2)
    .map((pid) => projects.find((p) => p.id === pid))
    .filter(Boolean);

  return (
    <div className="group">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isExpanded}
        className={`flex w-full items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-all ${
          featured
            ? "border-accent/20 bg-accent/5 hover:border-accent/40"
            : "border-border bg-bg-surface hover:border-accent/20"
        } ${isExpanded ? "border-accent/40" : ""}`}
      >
        {/* Skill name */}
        <span className={`flex-1 font-medium ${featured ? "text-accent" : "text-text-primary"}`}>
          {skill.name}
        </span>

        {/* Evidence count */}
        {evidenceCount > 0 && (
          <span className="shrink-0 rounded-full bg-bg-elevated px-1.5 py-0.5 text-[9px] font-mono text-text-muted">
            {evidenceCount}
          </span>
        )}

        {/* Expand indicator */}
        <svg
          className={`h-3 w-3 shrink-0 text-text-muted transition-transform ${isExpanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Expanded detail */}
      {isExpanded && (
        <div className="mt-1.5 rounded-lg border border-border bg-bg px-3 py-2.5">
          {skill.evidenceNote && (
            <p className="text-xs text-text-secondary leading-relaxed">
              {skill.evidenceNote}
            </p>
          )}

          {linkedProjects.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {linkedProjects.map((p) => (
                <a
                  key={p!.slug}
                  href={`/projects/${p!.slug}`}
                  className="inline-flex items-center gap-1 rounded-sm border border-accent/20 bg-accent/5 px-1.5 py-0.5 text-[10px] font-medium text-accent transition-colors hover:border-accent/40"
                  onClick={(e) => e.stopPropagation()}
                >
                  <span aria-hidden="true">→</span>
                  {p!.title}
                </a>
              ))}
            </div>
          )}

          <div className="mt-2 flex gap-3 text-[10px] text-text-muted">
            {experienceCount > 0 && (
              <span>{experienceCount} experience{experienceCount > 1 ? "s" : ""}</span>
            )}
            {projectCount > 0 && (
              <span>{projectCount} project{projectCount > 1 ? "s" : ""}</span>
            )}
            {credentialCount > 0 && (
              <span>{credentialCount} credential{credentialCount > 1 ? "s" : ""}</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Main component ─── */

export default function SkillsProficiency() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const featuredSkills = skills.filter((s) => FEATURED_SKILLS.includes(s.name));
  const otherSkills = skills.filter((s) => !FEATURED_SKILLS.includes(s.name));

  return (
    <section id="skills" aria-label="Skills" className="border-b border-border bg-bg-surface py-16">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Skills</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            Technical Proficiency
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            {skills.length} technologies across data engineering, cloud platforms, and analytics tools.
          </p>
        </div>

        {/* Featured skills — prominent grid */}
        <div className="mb-8">
          <h3 className="mb-3 text-sm font-semibold text-accent">Core Skills</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {featuredSkills.map((skill) => (
              <SkillChip
                key={skill.id}
                skill={skill}
                featured
                isExpanded={expandedId === skill.id}
                onToggle={() => setExpandedId(expandedId === skill.id ? null : skill.id)}
              />
            ))}
          </div>
        </div>

        {/* Other skills — compact grid */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-text-primary">Also Proficient In</h3>
          <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {otherSkills.map((skill) => (
              <SkillChip
                key={skill.id}
                skill={skill}
                isExpanded={expandedId === skill.id}
                onToggle={() => setExpandedId(expandedId === skill.id ? null : skill.id)}
              />
            ))}
          </div>
        </div>

        {/* Hint */}
        <p className="mt-6 text-[11px] text-text-muted">
          Click any skill to see evidence from projects and experience
        </p>
      </Container>
    </section>
  );
}
