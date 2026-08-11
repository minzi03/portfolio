import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { skillCategories, levelLabels, levelColors, type SkillLevel } from "@/data/skills";

export const metadata: Metadata = {
  title: "Stack",
  description: "Technology stack and skills of Nguyen Minh Duy — Data Engineer.",
  alternates: { canonical: "/stack" },
  openGraph: { title: "Stack | Nguyen Minh Duy", description: "Technology stack — Python, Spark, Kafka, Iceberg, dbt, Azure." },
};

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
            Honest levels — no logo collecting.
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
        </div>

        {/* Categories */}
        <div className="mt-10 space-y-8">
          {skillCategories.map((cat) => (
            <div key={cat.name}>
              <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-text-primary">
                {cat.name}
              </h2>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`rounded-lg px-3 py-1.5 text-sm font-medium ${levelColors[skill.level]}`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
