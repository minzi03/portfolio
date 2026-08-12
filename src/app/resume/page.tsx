import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { siteConfig } from "@/data/site-config";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { certifications } from "@/data/credentials";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";

function formatDateRange(start: string, end?: string): string {
  const s = new Date(start + "-01");
  const startStr = s.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!end) return `${startStr} – Present`;
  const e = new Date(end + "-01");
  const endStr = e.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${startStr} – ${endStr}`;
}

export const metadata: Metadata = {
  title: "Resume",
  description: "Resume of Nguyen Minh Duy — Data Engineer.",
  alternates: { canonical: "/resume" },
  openGraph: { title: "Resume | Nguyen Minh Duy", description: "Data Engineer resume — experience, projects, certifications." },
};

export default function ResumePage() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Resume</p>
            <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
              {siteConfig.name}
            </h1>
            <p className="mt-1 text-lg text-text-secondary">Data Engineer</p>
            <p className="mt-2 text-sm text-text-muted">
              {siteConfig.location} ·{" "}
              <a href={`mailto:${siteConfig.email}`} className="text-accent hover:text-accent-hover">
                {siteConfig.email}
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            <a
              href="/CV_Nguyen_Minh_Duy_DataEngineer.pdf"
              download
              className="inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              Download PDF
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-12 space-y-10">
          {/* Summary */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Summary</h2>
            <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
              Data Engineer with experience building data pipelines, Lakehouse architectures,
              and analytics platforms. Skilled in Spark, Kafka, Airflow, Iceberg, dbt, and cloud
              data services. Passionate about reliable, observable, and well-architected data systems.
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Experience</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-text-primary">{exp.company}</h3>
                      <p className="text-sm text-accent">{exp.role}</p>
                    </div>
                    <p className="font-mono text-xs text-text-muted">{formatDateRange(exp.startDate, exp.endDate)}</p>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {exp.highlightsCompat.slice(0, 3).map((h, i) => (
                      <li key={i} className="flex gap-2 text-sm text-text-secondary">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Projects</h2>
            <div className="space-y-4">
              {projects.filter(p => p.featured).map((project) => (
                <div key={project.slug}>
                  <h3 className="text-base font-semibold text-text-primary">{project.title}</h3>
                  <p className="text-sm text-text-secondary">{project.subtitle}</p>
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {project.tech.slice(0, 5).map((s) => (
                      <span key={s} className="rounded border border-border px-2 py-0.5 font-mono text-[11px] text-text-muted">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Skills</h2>
            <div className="space-y-3">
              {skillCategories.map((cat) => (
                <div key={cat.name}>
                  <p className="text-sm font-medium text-text-primary">{cat.name}</p>
                  <p className="text-sm text-text-secondary">
                    {cat.skills.map((s) => s.name).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Education</h2>
            <div>
              <h3 className="text-base font-semibold text-text-primary">{education.school}</h3>
              <p className="text-sm text-text-secondary">
                {education.degree} — {education.major} · Average: {education.gpa}
              </p>
              <p className="text-xs text-text-muted">{education.period} · {education.credits} credits · Classification: {education.classification}</p>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent">Certifications</h2>
            <div className="grid gap-2 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div key={cert.name} className="flex items-start gap-3 rounded-lg border border-border bg-bg-surface p-3">
                  <div>
                    <p className="text-sm font-medium text-text-primary">{cert.name}</p>
                    <p className="text-xs text-text-muted">{cert.issuer} · {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="/credentials" className="mt-3 inline-block text-sm text-accent hover:text-accent-hover">
              View all credentials &amp; achievements →
            </a>
          </section>
        </div>
      </Container>
    </div>
  );
}
