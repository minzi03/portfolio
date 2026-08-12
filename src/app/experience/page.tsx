import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ExperienceHighlightCard from "@/components/experience/ExperienceHighlightCard";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience of Nguyen Minh Duy — Data Engineer.",
  alternates: { canonical: "/experience" },
  openGraph: { title: "Experience | Nguyen Minh Duy", description: "Data Engineer internships at QuanSkill and Katalyst." },
};

function formatDateRange(start: string, end?: string): string {
  const s = new Date(start + "-01");
  const startStr = s.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!end) return `${startStr} – Present`;
  const e = new Date(end + "-01");
  const endStr = e.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${startStr} – ${endStr}`;
}

export default function ExperiencePage() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Career</p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Experience
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            Two data engineering internships — each teaching me something different about building data systems.
          </p>
        </div>

        <div className="mt-16 space-y-12">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="relative rounded-xl border border-border bg-bg-surface p-6 sm:p-8"
            >
              {/* Header */}
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-bold text-text-primary">{exp.company}</h2>
                  <p className="text-sm text-accent">{exp.role}</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm text-text-muted">{formatDateRange(exp.startDate, exp.endDate)}</p>
                  <p className="text-xs text-text-muted">{exp.location}</p>
                </div>
              </div>

              {/* Highlights — structured evidence */}
              <ul className="mt-5 space-y-3">
                {exp.highlights.map((h, i) => (
                  <ExperienceHighlightCard key={i} highlight={h} />
                ))}
              </ul>

              {/* Stack */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {(exp.technologies ?? []).map((s) => (
                  <span
                    key={s}
                    className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-text-muted"
                  >
                    {s}
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
