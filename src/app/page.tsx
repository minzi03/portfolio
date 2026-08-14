import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import ArchitecturePreview from "@/components/projects/ArchitecturePreview";
import ExperienceHighlightCard from "@/components/experience/ExperienceHighlightCard";
import SkillsProficiency from "@/components/skills/SkillsProficiency";
import ArchitectureTeaser from "@/components/projects/ArchitectureTeaser";
import CredentialCardLink from "@/components/credentials/CredentialCardLink";
import CredentialTrustBadge from "@/components/credentials/CredentialTrustBadge";
import { siteConfig } from "@/data/site-config";
import { experiences } from "@/data/experience";
import { projects } from "@/data/projects";
import { credentials } from "@/data/credentials";
import { education } from "@/data/education";
import { formatDateRange } from "@/lib/format";

/* ═══════════════════════════════════════════════════════════════
   01 — HERO (merged with About)
   Identity + proof + education — single above-the-fold section
   ═══════════════════════════════════════════════════════════════ */
function Hero() {
  const focusAreas = [
    { label: "Data Pipelines", detail: "ETL/ELT, batch & streaming" },
    { label: "Lakehouse", detail: "Iceberg, Spark, Medallion" },
    { label: "Orchestration", detail: "Airflow, dbt, scheduling" },
    { label: "Data Quality", detail: "Validation, contracts, lineage" },
  ];

  const proofStats = [
    { target: 4.6, suffix: "M+", decimals: 1, label: "Transactions" },
    { target: 53, suffix: "", decimals: 0, label: "Tables" },
    { target: 28, suffix: "", decimals: 0, label: "Credentials" },
    { target: 47, suffix: "", decimals: 0, label: "Skills" },
  ];

  return (
    <section id="hero" aria-label="Hero" className="relative overflow-hidden border-b border-border bg-bg py-16 sm:py-20">
      {/* Subtle gradient overlay */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple/5" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* ── Left: Identity + proof ── */}
          <div className="lg:col-span-3">
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

            {/* Outcome-first tagline */}
            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
              I build data platforms that turn raw data into decisions — from ingestion
              and CDC through modeling to analytics-ready data.
            </p>

            {/* Proof metrics — inline strip */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {proofStats.map((stat) => (
                <div key={stat.label} className="rounded-lg border border-border bg-bg-surface px-3 py-2 text-center">
                  <p className="text-lg font-bold font-mono text-accent">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="text-[11px] text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs + links */}
            <div className="mt-6 flex flex-wrap gap-3">
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
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                GitHub
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                LinkedIn
              </a>
              <a href={`mailto:${siteConfig.email}`} className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                Email
              </a>
            </div>
          </div>

          {/* ── Right: Education + Focus ── */}
          <div className="lg:col-span-2 space-y-4">
            {/* Education card */}
            <div className="rounded-md border border-border bg-bg-surface p-5">
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

            {/* Technical focus areas */}
            <div className="rounded-md border border-border bg-bg-surface p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Technical Focus
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {focusAreas.map((area) => (
                  <div key={area.label} className="rounded-md border border-border bg-bg px-3 py-2">
                    <p className="text-xs font-semibold text-text-primary">{area.label}</p>
                    <p className="mt-0.5 text-[10px] text-text-muted">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="rounded-md border border-border bg-bg-surface p-5">
              <p className="text-xs text-text-muted">{siteConfig.location}</p>
            </div>
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

              {/* Interactive architecture teaser */}
              <ArchitectureTeaser />

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
  // Build project lookup for cross-links
  const projectMap = projects.map((p) => ({ id: p.id, title: p.title, slug: p.slug }));

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

            // Resolve project links from highlight projectIds
            const highlightProjectIds = topHighlights.flatMap((h) => h.projectIds ?? []);
            const linkedProjects = projectMap.filter((p) => highlightProjectIds.includes(p.id));

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
                      <ExperienceHighlightCard key={i} highlight={h} compact linkedProjects={linkedProjects} />
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
   4 stages with evidence links + principles
   ═══════════════════════════════════════════════════════════════ */
function EngineeringMethod() {
  const stages = [
    {
      step: "01",
      title: "Ingest",
      icon: "⚡",
      tools: "NiFi · Kafka · Airflow",
      detail:
        "Schema-on-read validation at ingestion boundary. Idempotent writes prevent duplicate processing.",
      evidence: "Katalyst — NiFi Oracle→MinIO · QuanSkill — config-driven multi-source",
    },
    {
      step: "02",
      title: "Model",
      icon: "🏗️",
      tools: "Spark · Iceberg · dbt",
      detail:
        "Medallion architecture (Bronze→Silver→Gold). Dimensional modeling with SCD Type 2.",
      evidence: "Banking — Iceberg + Spark Medallion · Movie DW — star schema",
    },
    {
      step: "03",
      title: "Reliability",
      icon: "🛡️",
      tools: "OpenMetadata · Great Expectations",
      detail:
        "Column-level lineage across 53+ tables. Row-level security and masking. DQ at pipeline boundaries.",
      evidence: "Banking — 53 tables · Katalyst — row access + masking",
    },
    {
      step: "04",
      title: "Serve",
      icon: "📊",
      tools: "Trino · Superset · Power BI",
      detail:
        "Sub-second analytics. Semantic layers hide complexity. Self-service BI for analysts.",
      evidence: "Banking — Trino + Superset · Azure — Power BI dashboards",
    },
  ];

  const principles = [
    "Infrastructure as Code — every pipeline versioned, reproducible",
    "Data Contracts First — schema and SLA agreed before code",
    "Observability by Default — if it runs, it&apos;s monitored",
    "Test at the Boundary — validate on ingest, not after transform",
  ];

  return (
    <section id="method" aria-label="Engineering method" className="border-b border-border bg-bg py-16">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Method</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            How I Build Data Systems
          </h2>
        </div>

        {/* Pipeline stages — compact 4-col */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <div
              key={stage.step}
              className="group relative flex flex-col rounded-xl border border-border bg-bg-surface p-4 transition-all hover:border-accent/30"
            >
              {i < stages.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-3 -translate-y-1/2 bg-border lg:block" />
              )}
              <div className="flex items-center gap-2">
                <span className="text-base">{stage.icon}</span>
                <p className="font-mono text-[11px] text-accent">{stage.step}</p>
              </div>
              <h3 className="mt-1.5 text-base font-bold text-text-primary">{stage.title}</h3>
              <p className="mt-1 font-mono text-[10px] text-text-muted">{stage.tools}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-text-secondary">{stage.detail}</p>
              <p className="mt-2 border-t border-border pt-2 text-[10px] text-text-muted">
                {stage.evidence}
              </p>
            </div>
          ))}
        </div>

        {/* Principles — compact inline row */}
        <div className="mt-6 rounded-xl border border-border bg-bg-surface p-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Engineering Principles
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {principles.map((p) => (
              <span key={p} className="flex items-center gap-1.5 text-xs text-text-secondary">
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                {p}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   06 — CREDENTIALS
   Featured certifications — compact grid
   ═══════════════════════════════════════════════════════════════ */
function ProofAndKnowledge() {
  const featuredCredentials = credentials.filter((c) => c.featured);

  return (
    <section id="knowledge" aria-label="Credentials" className="border-b border-border bg-bg-surface py-16">
      <Container>
        <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Credentials</p>
            <h2 className="text-2xl font-bold tracking-tight text-text-primary">
              {featuredCredentials.length} Key Certifications
            </h2>
          </div>
          <Link
            href="/credentials"
            className="text-sm font-medium text-accent hover:text-accent-hover"
          >
            View all {credentials.length} credentials →
          </Link>
        </div>

        {/* Credentials grid — compact 2-col */}
        <div className="grid gap-3 sm:grid-cols-2">
          {featuredCredentials.map((cred) => (
            <CredentialCardLink key={cred.id} credential={cred} />
          ))}
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
   PAGE — 8 sections (compressed from 10)
   ═══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <Hero />
      <FadeIn><FlagshipProject /></FadeIn>
      <FadeIn><ProjectsGrid /></FadeIn>
      <FadeIn><ExperienceSection /></FadeIn>
      <FadeIn><SkillsProficiency /></FadeIn>
      <FadeIn><EngineeringMethod /></FadeIn>
      <FadeIn><ProofAndKnowledge /></FadeIn>
      <FadeIn><Contact /></FadeIn>
    </>
  );
}
