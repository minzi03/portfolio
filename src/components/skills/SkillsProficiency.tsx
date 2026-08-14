"use client";

import { useState } from "react";
import type { Skill, SkillLevel } from "@/data/types";
import { skills } from "@/data/skills";
import { projects } from "@/data/projects";
import Container from "@/components/ui/Container";
import DonutChart from "@/components/ui/DonutChart";

/* ─── Tier configuration ─── */

interface TierConfig {
  level: SkillLevel;
  title: string;
  subtitle: string;
  dots: number; // 1-5 visual proficiency
  accent: boolean;
}

const TIERS: TierConfig[] = [
  {
    level: "professional",
    title: "Used Daily",
    subtitle: "Applied in professional settings — production pipelines, startup environments",
    dots: 5,
    accent: true,
  },
  {
    level: "project",
    title: "Built With",
    subtitle: "Applied in portfolio projects — end-to-end implementations",
    dots: 3,
    accent: false,
  },
  {
    level: "exploring",
    title: "Exploring",
    subtitle: "Learned through coursework or research — foundation for future growth",
    dots: 1,
    accent: false,
  },
];

/* ─── Visual proficiency dots ─── */

function ProficiencyDots({ count, max = 5 }: { count: number; max?: number }) {
  return (
    <span className="inline-flex gap-0.5" aria-label={`${count} of ${max} proficiency`}>
      {Array.from({ length: max }, (_, i) => (
        <span
          key={i}
          className={`h-1.5 w-1.5 rounded-full ${
            i < count
              ? "bg-accent"
              : "bg-border"
          }`}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

/* ─── Skill chip ─── */

interface SkillChipProps {
  skill: Skill;
  dots: number;
  accent: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function SkillChip({ skill, dots, accent, isExpanded, onToggle }: SkillChipProps) {
  const projectCount = skill.projectIds?.length ?? 0;
  const experienceCount = skill.experienceIds?.length ?? 0;
  const credentialCount = skill.credentialIds?.length ?? 0;
  const evidenceCount = projectCount + experienceCount + credentialCount;

  // Resolve linked project names (max 2)
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
          accent
            ? "border-accent/20 bg-accent/5 hover:border-accent/40"
            : "border-border bg-bg-surface hover:border-accent/20"
        } ${isExpanded ? (accent ? "border-accent/40" : "border-accent/20") : ""}`}
      >
        {/* Proficiency dots */}
        <ProficiencyDots count={dots} />

        {/* Skill name */}
        <span className={`flex-1 font-medium ${accent ? "text-accent" : "text-text-primary"}`}>
          {skill.name}
        </span>

        {/* Evidence count badge */}
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
          {/* Evidence note */}
          {skill.evidenceNote && (
            <p className="text-xs text-text-secondary leading-relaxed">
              {skill.evidenceNote}
            </p>
          )}

          {/* Linked projects */}
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

          {/* Evidence breakdown */}
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
  const [filter, setFilter] = useState<SkillLevel | "all">("all");

  const grouped = TIERS.map((tier) => ({
    ...tier,
    skills: skills
      .filter((s) => s.level === tier.level)
      .filter((s) => filter === "all" || s.level === filter),
  })).filter((tier) => tier.skills.length > 0);

  const totalByLevel = {
    professional: skills.filter((s) => s.level === "professional").length,
    project: skills.filter((s) => s.level === "project").length,
    exploring: skills.filter((s) => s.level === "exploring").length,
  };

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
            {skills.length} skills across {Object.keys(totalByLevel).length} proficiency tiers — each backed by evidence from projects, experience, and credentials.
          </p>
        </div>

        {/* Skill distribution chart */}
        <div className="mb-6 flex justify-center sm:justify-start">
          <DonutChart
            segments={[
              { label: "Used Daily", value: totalByLevel.professional, color: "accent" },
              { label: "Built With", value: totalByLevel.project, color: "green" },
              { label: "Exploring", value: totalByLevel.exploring, color: "purple" },
            ]}
          />
        </div>

        {/* Tier summary cards */}
        <div className="mb-6 grid grid-cols-3 gap-3" role="group" aria-label="Filter by proficiency level">
          {TIERS.map((tier) => (
            <button
              key={tier.level}
              type="button"
              onClick={() => setFilter(filter === tier.level ? "all" : tier.level)}
              aria-pressed={filter === tier.level}
              className={`rounded-xl border p-4 text-left transition-all ${
                filter === tier.level
                  ? tier.accent
                    ? "border-accent/40 bg-accent/10"
                    : "border-accent/30 bg-accent/5"
                  : "border-border bg-bg hover:border-accent/20"
              }`}
            >
              <div className="flex items-center gap-2">
                <ProficiencyDots count={tier.dots} />
                <span className="text-lg font-bold font-mono text-accent">
                  {totalByLevel[tier.level]}
                </span>
              </div>
              <p className="mt-1 text-sm font-semibold text-text-primary">{tier.title}</p>
              <p className="mt-0.5 text-[11px] text-text-muted">{tier.subtitle}</p>
            </button>
          ))}
        </div>

        {/* Skill tiers */}
        <div className="space-y-8">
          {grouped.map((tier) => (
            <div key={tier.level}>
              {/* Tier header */}
              <div className="mb-3 flex items-center gap-3">
                <h3 className={`text-sm font-semibold ${tier.accent ? "text-accent" : "text-text-primary"}`}>
                  {tier.title}
                </h3>
                <span className="text-xs text-text-muted">
                  {tier.skills.length} skill{tier.skills.length !== 1 ? "s" : ""}
                </span>
                <div className="h-px flex-1 bg-border" />
              </div>

              {/* Skills grid */}
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {tier.skills.map((skill) => (
                  <SkillChip
                    key={skill.id}
                    skill={skill}
                    dots={tier.dots}
                    accent={tier.accent}
                    isExpanded={expandedId === skill.id}
                    onToggle={() => setExpandedId(expandedId === skill.id ? null : skill.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap items-center gap-4 text-[11px] text-text-muted">
          <span className="flex items-center gap-1.5">
            <ProficiencyDots count={5} /> Professional
          </span>
          <span className="flex items-center gap-1.5">
            <ProficiencyDots count={3} /> Project
          </span>
          <span className="flex items-center gap-1.5">
            <ProficiencyDots count={1} /> Exploring
          </span>
          <span className="text-text-muted/50">·</span>
          <span>Click any skill to see evidence</span>
        </div>
      </Container>
    </section>
  );
}
