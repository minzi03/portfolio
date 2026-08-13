import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import ExperienceHighlightCard from "@/components/experience/ExperienceHighlightCard";
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

/* ═══════════════════════════════════════════════════════════════
   RESUME PAGE
   Print-friendly, structured layout
   ═══════════════════════════════════════════════════════════════ */
export default function ResumePage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const showOnResumeCerts = certifications.slice(0, 6); // Top 6 for resume

  return (
    <div className="bg-bg py-16 sm:py-24 print:bg-white print:py-0">
      <Container>
        {/* Print-only header */}
        <div className="hidden print:block mb-6">
          <h1 className="text-2xl font-bold">{siteConfig.name}</h1>
          <p className="text-sm text-gray-600">Data Engineer · {siteConfig.location} · {siteConfig.email}</p>
        </div>

        {/* Screen header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between print:hidden">
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
              className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              Download PDF
            </a>
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              LinkedIn
            </a>
          </div>
        </div>

        {/* Key highlights */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 print:mt-4 print:gap-2">
          {[
            { value: "4.6M+", label: "Transactions processed" },
            { value: "53", label: "Tables cataloged" },
            { value: "52–68%", label: "Query latency reduction" },
            { value: "16", label: "Source datasets integrated" },
          ].map((h) => (
            <div key={h.label} className="rounded-xl border border-border bg-bg-surface p-4 text-center print:border-gray-300 print:p-2">
              <p className="text-xl font-bold font-mono text-accent print:text-gray-900">{h.value}</p>
              <p className="mt-1 text-[11px] text-text-muted print:text-gray-600">{h.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 space-y-10 print:mt-6 print:space-y-6">
          {/* Summary */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent print:text-gray-900 print:border-b print:border-gray-300 print:pb-1">
              Summary
            </h2>
            <p className="max-w-xl text-sm leading-relaxed text-text-secondary print:text-gray-700">
              Data Engineer with experience building data pipelines, Lakehouse architectures,
              and analytics platforms. Skilled in Spark, Kafka, Airflow, Iceberg, dbt, and cloud
              data services. Passionate about reliable, observable, and well-architected data systems.
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent print:text-gray-900 print:border-b print:border-gray-300 print:pb-1">
              Experience
            </h2>
            <div className="space-y-6 print:space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id} className="print:break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold text-text-primary print:text-gray-900">{exp.company}</h3>
                      <p className="text-sm text-accent print:text-gray-700">{exp.role}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-xs text-text-muted print:text-gray-600">{formatDateRange(exp.startDate, exp.endDate)}</p>
                      <p className="text-xs text-text-muted print:text-gray-500">{exp.location}</p>
                    </div>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {exp.highlights.slice(0, 4).map((h, i) => (
                      <ExperienceHighlightCard key={i} highlight={h} compact />
                    ))}
                  </ul>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {(exp.technologies ?? []).slice(0, 5).map((s) => (
                      <span key={s} className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-text-muted print:border-gray-300 print:text-gray-600">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent print:text-gray-900 print:border-b print:border-gray-300 print:pb-1">
              Featured Projects
            </h2>
            <div className="space-y-4 print:space-y-3">
              {featuredProjects.map((project) => (
                <div key={project.slug} className="rounded-xl border border-border bg-bg-surface p-4 print:border-gray-300 print:p-3 print:break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="text-base font-semibold text-text-primary print:text-gray-900">{project.title}</h3>
                    <span className="font-mono text-[10px] text-text-muted print:text-gray-500">{project.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-text-secondary print:text-gray-700">{project.subtitle}</p>

                  {/* Impact metrics */}
                  {project.impact && project.impact.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-3">
                      {project.impact.slice(0, 3).map((m) => (
                        <span key={m.id} className="text-xs">
                          <span className="font-mono font-bold text-accent print:text-gray-900">{m.value}</span>{" "}
                          <span className="text-text-muted print:text-gray-600">{m.label}</span>
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-2 flex flex-wrap gap-1">
                    {project.tech.slice(0, 6).map((s) => (
                      <span key={s} className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-text-muted print:border-gray-300 print:text-gray-600">
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
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent print:text-gray-900 print:border-b print:border-gray-300 print:pb-1">
              Technical Skills
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 print:grid-cols-3 print:gap-2">
              {skillCategories.map((cat) => (
                <div key={cat.name} className="rounded-sm border border-border bg-bg-surface p-3 print:border-gray-300 print:p-2">
                  <p className="text-xs font-semibold text-text-primary print:text-gray-900">{cat.name}</p>
                  <p className="mt-1 text-[11px] leading-relaxed text-text-secondary print:text-gray-700">
                    {cat.skills.map((s) => s.name).join(" · ")}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent print:text-gray-900 print:border-b print:border-gray-300 print:pb-1">
              Education
            </h2>
            <div className="rounded-xl border border-border bg-bg-surface p-4 print:border-gray-300 print:p-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="text-base font-semibold text-text-primary print:text-gray-900">{education.school}</h3>
                <p className="font-mono text-xs text-text-muted print:text-gray-600">{education.period}</p>
              </div>
              <p className="mt-1 text-sm text-text-secondary print:text-gray-700">
                {education.degree} — {education.major}
              </p>
              <div className="mt-2 flex flex-wrap gap-3 text-xs text-text-muted print:text-gray-600">
                <span>Average: {education.gpa}</span>
                <span>·</span>
                <span>{education.credits} credits</span>
                <span>·</span>
                <span>Classification: {education.classification}</span>
              </div>
            </div>
          </section>

          {/* Certifications */}
          <section>
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-accent print:text-gray-900 print:border-b print:border-gray-300 print:pb-1">
              Certifications
            </h2>
            <div className="grid gap-2 sm:grid-cols-2 print:grid-cols-2 print:gap-1.5">
              {showOnResumeCerts.map((cert) => (
                <div key={cert.name} className="flex items-start gap-3 rounded-sm border border-border bg-bg-surface p-3 print:border-gray-300 print:p-2">
                  <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent print:bg-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-text-primary print:text-gray-900">{cert.name}</p>
                    <p className="text-xs text-text-muted print:text-gray-600">{cert.issuer} · {cert.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <a href="/credentials" className="mt-3 inline-block text-sm text-accent hover:text-accent-hover print:hidden">
              View all credentials &amp; achievements →
            </a>
          </section>
        </div>
      </Container>
    </div>
  );
}
