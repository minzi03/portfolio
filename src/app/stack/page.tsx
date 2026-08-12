import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { skills, levelLabels, levelColors, type SkillLevel, type SkillCategory } from "@/data/skills";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Stack",
  description: "Technology stack and skills of Nguyen Minh Duy — Data Engineer.",
  alternates: { canonical: "/stack" },
  openGraph: { title: "Stack | Nguyen Minh Duy", description: "Technology stack — Python, Spark, Kafka, Iceberg, dbt, Azure." },
};

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  programming: "Programming & Querying",
  "data-processing": "Big Data & Processing",
  "data-platforms": "Data Platforms",
  "cloud-storage": "Cloud & Storage",
  "bi-governance": "BI & Governance",
  "tools-infrastructure": "Tools & Infrastructure",
};

/* Build lookup maps for evidence labels */
const projectMap = new Map(projects.map((p) => [p.id, p.title]));
const experienceMap = new Map(experiences.map((e) => [e.id, `${e.role} @ ${e.company}`]));

function evidenceSummary(skill: { projectIds?: string[]; experienceIds?: string[] }): string[] {
  const links: string[] = [];
  if (skill.projectIds) {
    for (const id of skill.projectIds) {
      const title = projectMap.get(id);
      if (title) links.push(title);
    }
  }
  if (skill.experienceIds) {
    for (const id of skill.experienceIds) {
      const label = experienceMap.get(id);
      if (label) links.push(label);
    }
  }
  return links;
}

/* Group skills by category */
const skillGroups = (Object.keys(CATEGORY_LABELS) as SkillCategory[]).map((cat) => ({
  name: CATEGORY_LABELS[cat],
  skills: skills.filter((s) => s.category === cat),
}));

export default function StackPage() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Skills</p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            My Data Stack
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            Technologies I&apos;ve used in production, in projects, or am actively learning.
            Levels derived from evidence — projects and professional experience.
          </p>
        </div>

        {/* Legend */}
        <div className="mt-8 flex flex-wrap gap-3">
          {(Object.keys(levelLabels) as SkillLevel[]).map((level) => (
            <div key={level} className="flex items-center gap-2">
              <span className={`inline-block h-2.5 w-2.5 rounded-full ${levelColors[level].split(" ")[0]}`} />
              <span className="text-xs text-text-muted">{levelLabels[level]}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-text-muted/30" />
            <span className="text-xs text-text-muted">Has evidence</span>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-10 space-y-8">
          {skillGroups.map((cat) => (
            <div key={cat.name}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-primary">
                {cat.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => {
                  const evidence = evidenceSummary(skill);
                  const hasEvidence = evidence.length > 0;
                  return (
                    <span
                      key={skill.name}
                      className={`group relative rounded-lg px-3 py-1.5 text-sm font-medium ${levelColors[skill.level]} ${
                        hasEvidence ? "ring-1 ring-accent/20" : ""
                      }`}
                      title={hasEvidence ? `Evidence: ${evidence.join(", ")}` : undefined}
                    >
                      {skill.name}
                      {hasEvidence && (
                        <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-accent/60" />
                      )}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
