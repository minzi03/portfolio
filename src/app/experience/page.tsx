import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { experiences } from "@/data/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional experience of Nguyen Minh Duy — Data Engineer.",
  alternates: { canonical: "/experience" },
  openGraph: { title: "Experience | Nguyen Minh Duy", description: "Data Engineer internships at QuanSkill and Katalyst." },
};

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
                  <p className="font-mono text-sm text-text-muted">{exp.period}</p>
                  <p className="text-xs text-text-muted">{exp.location} · {exp.type}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-text-secondary">{exp.description}</p>

              {/* Highlights */}
              <ul className="mt-5 space-y-2">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="flex gap-2 text-sm text-text-secondary">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              {/* Stack */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {exp.stack.map((s) => (
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
