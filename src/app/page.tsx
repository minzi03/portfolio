import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import ArchitecturePreview from "@/components/projects/ArchitecturePreview";
import ExperienceHighlightCard from "@/components/experience/ExperienceHighlightCard";
import CredentialCardLink from "@/components/credentials/CredentialCardLink";
import CredentialTrustBadge from "@/components/credentials/CredentialTrustBadge";
import { siteConfig } from "@/data/site-config";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { credentials } from "@/data/credentials";
import { education } from "@/data/education";

function formatDateRange(start: string, end?: string): string {
  const s = new Date(start + "-01");
  const startStr = s.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!end) return `${startStr} – Present`;
  const e = new Date(end + "-01");
  const endStr = e.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${startStr} – ${endStr}`;
}

/* ═══════════════════════════════════════════════════════════════
   01 — HERO
   Engineering philosophy + role + proof
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section id="hero" aria-label="Hero" className="relative overflow-hidden border-b border-border bg-bg py-20 sm:py-28">
      {/* Subtle gradient overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple/5" />
      <Container>
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-sm text-accent">Hello, I&apos;m</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            <span className="gradient-text">{siteConfig.name}</span>
          </h1>
          <div className="mt-2 flex items-center gap-3">
            <p className="text-xl font-semibold text-text-secondary">Data Engineer</p>
            {siteConfig.availability.status === "open" && (
              <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-0.5 text-xs font-medium text-green-400">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                {siteConfig.availability.label}
              </span>
            )}
          </div>

          {/* Engineering philosophy */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
            I build data platforms that stay reliable — from ingestion and CDC
            through modeling to analytics-ready data.
          </p>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-text-muted">
            I care about idempotency, observable pipelines, clear data contracts,
            and architecture that can be explained — not just executed.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#flagship"
              className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-bg shadow-md shadow-accent/20 transition-all hover:bg-accent-hover hover:shadow-lg hover:shadow-accent/30"
            >
              Explore my work
            </a>
            <a
              href={siteConfig.resumeUrl}
              className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:border-text-muted hover:text-text-primary"
            >
              Resume <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* Links */}
          <div className="mt-6 flex gap-4 text-sm text-text-muted">
            <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text-primary">
              GitHub
            </a>
            <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-text-primary">
              LinkedIn
            </a>
            <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-text-primary">
              Email
            </a>
          </div>
        </div>

        {/* Architecture graphic — hidden on mobile */}
        <div aria-hidden="true" className="pointer-events-none absolute bottom-0 right-0 hidden w-80 opacity-[0.06] lg:block">
          <pre className="font-mono text-[10px] leading-tight text-text-primary">
{`    Sources
      │
      ├──────────┐
      ↓          ↓
    Batch      CDC
      │          │
    Spark    Kafka
      │          │
      └────┬─────┘
           ↓
        Bronze
           ↓
        Silver
           ↓
         Gold
           ↓
      Analytics`}
          </pre>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   02 — ABOUT
   Professional summary + education + focus areas
   ═══════════════════════════════════════════════════════════════ */
function About() {
  const focusAreas = [
    { label: "Data Pipelines", detail: "ETL/ELT, batch & streaming" },
    { label: "Lakehouse", detail: "Iceberg, Spark, Medallion" },
    { label: "Orchestration", detail: "Airflow, dbt, scheduling" },
    { label: "Data Quality", detail: "Validation, contracts, lineage" },
  ];

  return (
    <section id="about" aria-label="About" className="border-b border-border bg-bg-surface py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">About</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Who I Am</h2>
        </div>

        <div className="grid gap-10 lg:grid-cols-5">
          {/* ── Left: Summary + Focus ── */}
          <div className="lg:col-span-3 space-y-6">
            {/* Professional summary */}
            <div className="space-y-3">
              <p className="text-sm leading-relaxed text-text-secondary">
                I&apos;m a Data Engineer who builds platforms that stay reliable — from
                ingestion and CDC through modeling to analytics-ready data. I care
                about idempotency, observable pipelines, and architecture that can
                be explained, not just executed.
              </p>
              <p className="text-sm leading-relaxed text-text-secondary">
                With hands-on experience at two startups and multiple production-grade
                projects, I work across the full data lifecycle: designing ingestion
                from heterogeneous sources, building medallion architectures, enforcing
                data contracts, and delivering semantic models for BI.
              </p>
            </div>

            {/* Technical focus areas */}
            <div>
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Technical Focus
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {focusAreas.map((area) => (
                  <div
                    key={area.label}
                    className="rounded-md border border-border bg-bg p-3"
                  >
                    <p className="text-sm font-semibold text-text-primary">{area.label}</p>
                    <p className="mt-0.5 text-[11px] text-text-muted">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: Education + Info ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Education card */}
            <div className="card-hover rounded-md border border-border bg-bg p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Education
              </h3>
              <p className="text-sm font-semibold text-text-primary">
                {education.degree}
              </p>
              <p className="text-sm text-text-secondary">{education.major}</p>
              <p className="mt-1 text-xs text-text-muted">
                {education.school}
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                  GPA {education.gpa}
                </span>
                <span className="text-[11px] text-text-muted">
                  {education.period}
                </span>
              </div>
              {education.awards.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {education.awards.slice(0, 2).map((award) => (
                    <li key={award} className="flex items-start gap-1.5 text-[11px] text-text-muted">
                      <span aria-hidden="true" className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                      {award}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Location */}
            <div className="card-hover rounded-md border border-border bg-bg p-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Location
              </h3>
              <p className="text-sm text-text-secondary">{siteConfig.location}</p>
              {siteConfig.availability.status === "open" && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs text-green-400">{siteConfig.availability.label}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   03 — PROOF STRIP
   High-level signals — no overlap with Flagship metrics
   ═══════════════════════════════════════════════════════════════ */
function ProofStrip() {
  const stats = [
    { value: "4.6M+", label: "Transactions", context: "curated" },
    { value: "16", label: "Sources", context: "ingested" },
    { value: "2", label: "Experiences", context: "professional" },
  ];

  return (
    <section id="proof" aria-label="Key metrics" className="border-b border-border bg-bg-surface py-8">
      <Container>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl font-bold font-mono text-accent">{stat.value}</p>
              <p className="text-sm font-medium text-text-primary">{stat.label}</p>
              <p className="text-[11px] text-text-muted">{stat.context}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   03 — FLAGSHIP PROJECT
   Banking Data Platform — full visual + metrics
   ═══════════════════════════════════════════════════════════════ */
function FlagshipProject() {
  const flagship = projects.find((p) => p.featured);
  if (!flagship) return null;

  return (
    <section id="flagship" aria-label="Featured project" className="border-b border-border bg-bg py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Featured System</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Banking Data Platform</h2>
        </div>

        <Link
          href={`/projects/${flagship.slug}`}
          aria-label={`View case study for ${flagship.title}`}
          className="card-hover group block rounded-md border border-accent/20 bg-bg-surface p-6 transition-colors hover:border-accent/40"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            {/* Left: content */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                  Production-like
                </span>
                <span className="rounded bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-400">
                  Complete
                </span>
              </div>

              <p className="text-sm text-text-secondary">
                Unified batch + CDC analytics platform — 16 sources, 53 tables,
                4.6M+ curated transactions with column-level lineage.
              </p>

              {/* Architecture preview */}
              <ArchitecturePreview projectId={flagship.id} />

              {/* Tech stack */}
              <div className="flex flex-wrap gap-1.5">
                {flagship.tech.slice(0, 6).map((s) => (
                  <span key={s} className="rounded-sm border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-text-muted">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: metrics — these are the detailed breakdown */}
            <div className="flex flex-wrap gap-6 lg:flex-col lg:gap-4">
              {flagship.impact && flagship.impact.slice(0, 3).map((m) => (
                <div key={m.id} className="text-center lg:text-right">
                  <p className="text-xl font-bold font-mono text-accent">{m.value}</p>
                  <p className="text-[11px] text-text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-accent">
            <span>Case Study</span>
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </div>
        </Link>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   04 — PROJECTS GRID
   All projects except the featured one
   ═══════════════════════════════════════════════════════════════ */
function ProjectsGrid() {
  const otherProjects = projects.filter((p) => !p.featured);

  return (
    <section id="projects" aria-label="All projects" className="border-b border-border bg-bg-surface py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Portfolio</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">All Projects</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {otherProjects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.slug}`}
              aria-label={`View case study for ${project.title}`}
              className="card-hover group flex flex-col rounded-md border border-border bg-bg p-5 transition-colors hover:border-accent/30"
            >
              {/* Category + status badges */}
              <div className="flex items-center gap-2">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                  {project.category.replace(/-/g, " ")}
                </span>
                {project.status === "complete" && (
                  <span className="rounded bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-400">
                    Complete
                  </span>
                )}
              </div>

              {/* Title + subtitle */}
              <h3 className="mt-3 text-base font-semibold text-text-primary group-hover:text-accent">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary line-clamp-2">
                {project.subtitle}
              </p>

              {/* Tech stack */}
              <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
                {project.tech.slice(0, 4).map((t) => (
                  <span key={t} className="rounded-sm border border-border bg-bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                    {t}
                  </span>
                ))}
                {project.tech.length > 4 && (
                  <span className="rounded-sm border border-border bg-bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                    +{project.tech.length - 4}
                  </span>
                )}
              </div>

              {/* Link arrow */}
              <div className="mt-3 flex items-center gap-1.5 text-sm text-accent">
                <span>Case Study</span>
                <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   05 — EXPERIENCE
   Best evidence from each role — metric prominently displayed
   ═══════════════════════════════════════════════════════════════ */
function ExperienceSection() {
  return (
    <section id="experience" aria-label="Experience" className="border-b border-border bg-bg-surface py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Career</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Experience</h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            Hands-on experience building production data systems at startups — from ingestion pipelines to governance frameworks.
          </p>
        </div>

        <div className="space-y-5">
          {experiences.map((exp) => {
            const topHighlights = exp.highlights.slice(0, 2);
            const primaryMetric = exp.highlights[0]?.metrics?.[0];

            return (
              <div
                key={exp.id}
                className="card-hover group rounded-xl border border-border bg-bg p-5 transition-colors hover:border-accent/30"
              >
                {/* Header row */}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="text-base font-bold text-text-primary">
                        {exp.company}
                      </h3>
                      <span className="font-mono text-xs text-text-muted">
                        {formatDateRange(exp.startDate, exp.endDate)}
                      </span>
                    </div>
                    <div className="mt-0.5 flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-accent">{exp.role}</p>
                      {exp.location && (
                        <span className="text-xs text-text-muted">· {exp.location}</span>
                      )}
                    </div>
                  </div>

                  {/* Metric badge */}
                  {primaryMetric && (
                    <div className="shrink-0 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2 text-center">
                      <p className="text-lg font-bold font-mono text-accent">{primaryMetric.value}</p>
                      <p className="text-[10px] text-text-muted">{primaryMetric.label}</p>
                    </div>
                  )}
                </div>

                {/* Top highlights */}
                {topHighlights.length > 0 && (
                  <ul className="mt-4 space-y-2">
                    {topHighlights.map((h, i) => (
                      <ExperienceHighlightCard key={i} highlight={h} compact />
                    ))}
                  </ul>
                )}

                {/* Tech tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1">
                    {exp.technologies.slice(0, 6).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-border bg-bg-surface px-2 py-0.5 font-mono text-[10px] text-text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.technologies.length > 6 && (
                      <span className="px-1 py-0.5 text-[10px] text-text-muted">
                        +{exp.technologies.length - 6} more
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   05 — HOW I BUILD DATA SYSTEMS
   4 stages with evidence links
   ═══════════════════════════════════════════════════════════════ */
function EngineeringMethod() {
  const stages = [
    {
      step: "01",
      title: "Ingest",
      icon: "⚡",
      tools: "Apache NiFi · Kafka · Airflow · Python",
      detail:
        "Extract from Oracle, PostgreSQL, REST APIs, flat files. Schema-on-read validation at ingestion boundary. Idempotent writes prevent duplicate processing.",
      evidence: "Katalyst AI — NiFi Oracle→MinIO · QuanSkill — config-driven multi-source",
    },
    {
      step: "02",
      title: "Model",
      icon: "🏗️",
      tools: "Spark · Iceberg · dbt · Star Schema",
      detail:
        "Medallion architecture (Bronze→Silver→Gold). Dimensional modeling with SCD Type 2. Data contracts define schema expectations between teams.",
      evidence: "Banking — Iceberg + Spark Medallion · Movie DW — star schema",
    },
    {
      step: "03",
      title: "Reliability",
      icon: "🛡️",
      tools: "Great Expectations · Monte Carlo · OpenMetadata",
      detail:
        "Automated DQ checks at pipeline boundaries. Data freshness SLAs. Column-level lineage across 53+ tables. Row-level security and masking.",
      evidence: "Banking — OpenMetadata 53 tables · Katalyst — row access + masking",
    },
    {
      step: "04",
      title: "Serve",
      icon: "📊",
      tools: "Trino · Superset · Power BI · Presto",
      detail:
        "Sub-second analytics on petabyte-scale. Semantic layers hide complexity. Materialized views for dashboards. Self-service BI for analysts.",
      evidence: "Banking — Trino + Superset · Azure — Power BI dashboards",
    },
  ];

  const principles = [
    {
      title: "Infrastructure as Code",
      desc: "Every pipeline versioned, reproducible, peer-reviewed.",
      icon: "⚙️",
    },
    {
      title: "Data Contracts First",
      desc: "Schema and SLA agreed before code is written.",
      icon: "📋",
    },
    {
      title: "Observability by Default",
      desc: "If it runs, it's monitored. If it breaks, it alerts.",
      icon: "📡",
    },
    {
      title: "Test at the Boundary",
      desc: "Validate on ingest, not after a 3-hour transform.",
      icon: "🧪",
    },
  ];

  const techEcosystem = [
    { category: "Orchestration", tools: ["Airflow", "Dagster", "NiFi"] },
    { category: "Processing", tools: ["Spark", "Flink", "dbt"] },
    { category: "Storage", tools: ["Iceberg", "Delta Lake", "MinIO"] },
    { category: "Quality", tools: ["Great Expectations", "Monte Carlo"] },
    { category: "Governance", tools: ["OpenMetadata", "DataHub"] },
    { category: "Analytics", tools: ["Trino", "Superset", "Power BI"] },
  ];

  return (
    <section id="method" aria-label="Engineering method" className="border-b border-border bg-bg py-16">
      <Container>
        {/* Header */}
        <div className="mb-10">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Method</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            How I Build Data Systems
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            A structured approach to data engineering — from raw ingestion to actionable analytics.
            Every stage is deliberate, testable, and observable.
          </p>
        </div>

        {/* Pipeline visualization */}
        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <div
              key={stage.step}
              className="card-hover group relative flex flex-col rounded-xl border border-border bg-bg-surface p-5 transition-all hover:border-accent/30"
            >
              {/* Connector line (hidden on mobile) */}
              {i < stages.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-4 -translate-y-1/2 bg-border lg:block" />
              )}

              <div className="flex items-center gap-2">
                <span className="text-lg">{stage.icon}</span>
                <p className="font-mono text-xs text-accent">{stage.step}</p>
              </div>
              <h3 className="mt-2 text-lg font-bold text-text-primary">{stage.title}</h3>
              <p className="mt-1 font-mono text-[11px] text-text-muted">{stage.tools}</p>
              <p className="mt-2 text-xs leading-relaxed text-text-secondary">{stage.detail}</p>
              <p className="mt-3 border-t border-border pt-3 text-[11px] text-text-muted">
                {stage.evidence}
              </p>
            </div>
          ))}
        </div>

        {/* Principles + Tech Ecosystem side by side */}
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Principles */}
          <div className="lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Engineering Principles
            </h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {principles.map((p) => (
                <div
                  key={p.title}
                  className="flex items-start gap-3 rounded-lg border border-border bg-bg-surface p-4"
                >
                  <span className="text-base">{p.icon}</span>
                  <div>
                    <p className="text-sm font-semibold text-text-primary">{p.title}</p>
                    <p className="mt-0.5 text-xs text-text-muted">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Ecosystem */}
          <div className="lg:col-span-2">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-text-secondary">
              Tech Ecosystem
            </h3>
            <div className="rounded-xl border border-border bg-bg-surface p-4">
              <div className="space-y-3">
                {techEcosystem.map((cat) => (
                  <div key={cat.category}>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-accent">
                      {cat.category}
                    </p>
                    <div className="mt-1 flex flex-wrap gap-1">
                      {cat.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-text-secondary"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   06 — PROOF & KNOWLEDGE
   Writing + Credentials combined
   ═══════════════════════════════════════════════════════════════ */
function ProofAndKnowledge() {
  const featuredCredentials = credentials.filter((c) => c.featured);

  return (
    <section id="knowledge" aria-label="Credentials" className="border-b border-border bg-bg-surface py-16">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Knowledge</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
            Certifications & Achievements
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-text-muted">
            {featuredCredentials.length} key certifications in data engineering, streaming, cloud, and governance.
          </p>
        </div>

        {/* Credentials grid — same card style as /credentials */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCredentials.map((cred) => (
            <CredentialCardLink key={cred.id} credential={cred} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-6">
          <Link
            href="/credentials"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent-hover"
          >
            View all credentials with evidence →
          </Link>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   07 — CONTACT
   ═══════════════════════════════════════════════════════════════ */
function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="bg-bg py-16">
      <Container>
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Connect</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">Let&apos;s Build with Data</h2>
        </div>

        <p className="max-w-md text-sm leading-relaxed text-text-secondary">
          I&apos;m interested in Data Engineer and Data Platform opportunities.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
          >
            Email me
          </a>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
            GitHub <span className="sr-only">(opens in new tab)</span>
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
            LinkedIn <span className="sr-only">(opens in new tab)</span>
          </a>
          <a href={siteConfig.resumeUrl} className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
            Resume
          </a>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Hero />
      <FadeIn><About /></FadeIn>
      <FadeIn><ProofStrip /></FadeIn>
      <FadeIn><FlagshipProject /></FadeIn>
      <FadeIn><ProjectsGrid /></FadeIn>
      <FadeIn><ExperienceSection /></FadeIn>
      <FadeIn><EngineeringMethod /></FadeIn>
      <FadeIn><ProofAndKnowledge /></FadeIn>
      <FadeIn><Contact /></FadeIn>
    </>
  );
}
