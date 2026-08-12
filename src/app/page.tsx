import Link from "next/link";
import Container from "@/components/ui/Container";
import PipelineStatus from "@/components/data/pipeline-status";
import ArchitecturePreview from "@/components/projects/ArchitecturePreview";
import { siteConfig } from "@/data/site-config";
import { experiences } from "@/data/experience";
import { projects, getFeaturedProjects } from "@/data/projects";
import { articles } from "@/data/writing";
import { education } from "@/data/education";
import { getFeaturedCredentials } from "@/data/credentials";

function formatDateRange(start: string, end?: string): string {
  const s = new Date(start + "-01");
  const startStr = s.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!end) return `${startStr} – Present`;
  const e = new Date(end + "-01");
  const endStr = e.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${startStr} – ${endStr}`;
}

/* ─── Section Header ─── */
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-8">
      <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{label}</p>
      <h2 className="text-2xl font-bold tracking-tight text-text-primary">{title}</h2>
    </div>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border bg-bg py-20 sm:py-28">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-3 font-mono text-sm text-accent">Hello, I&apos;m</p>
          <h1 className="text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
            {siteConfig.name}
          </h1>
          <p className="mt-2 text-xl font-semibold text-text-secondary">Data Engineer</p>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-text-secondary">
            {siteConfig.tagline}
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              Explore my work
            </Link>
            <a
              href={siteConfig.resumeUrl}
              className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:border-text-muted hover:text-text-primary"
            >
              Resume ↗
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

        {/* Architecture graphic */}
        <div className="pointer-events-none absolute bottom-0 right-0 hidden w-80 opacity-[0.06] lg:block">
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

/* ─── Metrics ─── */
function GlanceMetrics() {
  return (
    <section className="border-b border-border bg-bg-surface py-16">
      <Container>
        <SectionHeader label="Overview" title="Engineering at a Glance" />
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {siteConfig.heroMetrics.map((m) => (
            <div key={m.label}>
              <p className="text-3xl font-bold font-mono text-accent">{m.value}</p>
              <p className="mt-1 text-sm text-text-secondary">{m.label}</p>
              <p className="text-xs text-text-muted">{m.context}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── What I Build ─── */
function WhatIBuild() {
  const cards = [
    {
      title: "Data Pipelines",
      items: ["Batch processing", "CDC", "Streaming", "ETL / ELT"],
    },
    {
      title: "Data Platforms",
      items: ["Lakehouse", "Warehouse", "Medallion", "Data Modeling"],
    },
    {
      title: "Platform Engineering",
      items: ["Orchestration", "Quality", "Contracts", "Governance"],
    },
    {
      title: "Analytics",
      items: ["Semantic models", "BI", "Customer 360", "Analytics marts"],
    },
  ];

  return (
    <section className="border-b border-border bg-bg py-16">
      <Container>
        <SectionHeader label="Capabilities" title="What I Build" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-border bg-bg-surface p-5 transition-colors hover:border-accent/30"
            >
              <h3 className="mb-3 text-sm font-semibold text-text-primary">{card.title}</h3>
              <ul className="space-y-1.5">
                {card.items.map((item) => (
                  <li key={item} className="text-sm text-text-secondary">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

/* ─── Featured Projects ─── */
function FeaturedProjects() {
  const flagship = projects.find((p) => p.featured);
  const supporting = projects.filter((p) => !p.featured).slice(0, 2);

  return (
    <section className="border-b border-border bg-bg-surface py-16">
      <Container>
        <SectionHeader label="Work" title="Featured Projects" />

        {/* Flagship */}
        {flagship && (
          <Link
            href={`/projects/${flagship.slug}`}
            className="group block rounded-xl border border-accent/20 bg-bg p-6 transition-colors hover:border-accent/40"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="flex-1 space-y-3">
                <p className="font-mono text-xs uppercase tracking-widest text-accent">Flagship</p>
                <h3 className="text-xl font-bold text-text-primary group-hover:text-accent">
                  {flagship.title}
                </h3>
                <p className="text-sm text-text-secondary">{flagship.subtitle}</p>
                <ArchitecturePreview projectId={flagship.id} />
                <div className="flex flex-wrap gap-1.5">
                  {flagship.tech.slice(0, 6).map((s) => (
                    <span key={s} className="rounded border border-border bg-bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-center">
                {flagship.impact && flagship.impact.slice(0, 3).map((m) => (
                  <div key={m.id}>
                    <p className="text-lg font-bold font-mono text-accent">{m.value}</p>
                    <p className="text-[11px] text-text-muted">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </Link>
        )}

        {/* Supporting */}
        {supporting.length > 0 && (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {supporting.map((project) => (
              <Link
                key={project.slug}
                href={`/projects/${project.slug}`}
                className="group block rounded-xl border border-border bg-bg p-5 transition-colors hover:border-accent/30"
              >
                <h4 className="text-sm font-semibold text-text-primary group-hover:text-accent">
                  {project.title}
                </h4>
                <p className="mt-1 text-xs text-text-muted line-clamp-2">{project.subtitle}</p>
                <div className="mt-2 flex flex-wrap gap-1">
                  {project.tech.slice(0, 4).map((s) => (
                    <span key={s} className="rounded border border-border bg-bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                      {s}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}

        <Link href="/projects" className="mt-6 inline-block text-sm text-accent hover:text-accent-hover">
          View all projects →
        </Link>
      </Container>
    </section>
  );
}

/* ─── Experience ─── */
function ExperienceSection() {
  return (
    <section className="border-b border-border bg-bg py-16">
      <Container>
        <SectionHeader label="Career" title="Experience" />
        <div className="space-y-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:rounded-full before:bg-accent">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-base font-semibold text-text-primary">{exp.company}</h3>
                <span className="font-mono text-xs text-text-muted">{formatDateRange(exp.startDate, exp.endDate)}</span>
              </div>
              <p className="text-sm text-accent">{exp.role}</p>
              <p className="mt-1 text-sm text-text-secondary">{exp.highlightsCompat[0]}</p>
            </div>
          ))}
        </div>
        <Link href="/experience" className="mt-6 inline-block text-sm text-accent hover:text-accent-hover">
          View full experience →
        </Link>
      </Container>
    </section>
  );
}

/* ─── Education ─── */
function EducationSection() {
  return (
    <section className="border-b border-border bg-bg-surface py-16">
      <Container>
        <SectionHeader label="Education" title="Academic Background" />
        <div className="rounded-xl border border-border bg-bg p-6">
          <h3 className="text-lg font-semibold text-text-primary">{education.school}</h3>
          <p className="text-sm text-text-secondary">{education.degree} — {education.major}</p>
          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
            <span>{education.period}</span>
            <span>Average: {education.gpa}</span>
            <span>{education.credits} credits</span>
          </div>
          {education.awards.length > 0 && (
            <ul className="mt-4 space-y-1.5">
              {education.awards.map((award) => (
                <li key={award} className="flex gap-2 text-sm text-text-secondary">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  {award}
                </li>
              ))}
            </ul>
          )}
        </div>
      </Container>
    </section>
  );
}

/* ─── Credentials Teaser ─── */
function CredentialsTeaser() {
  const featured = getFeaturedCredentials();

  return (
    <section className="border-b border-border bg-bg py-16">
      <Container>
        <SectionHeader label="Credentials" title="Certifications & Achievements" />
        <p className="mb-6 text-sm text-text-secondary">
          {featured.length} featured credentials across data engineering, cloud, and streaming.
        </p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cred) => (
            <div key={cred.id} className="rounded-xl border border-border bg-bg-surface p-4">
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{cred.issuer}</p>
              <p className="mt-1 text-sm font-semibold text-text-primary">{cred.title}</p>
              {cred.issued && <p className="mt-1 text-xs text-text-muted">{cred.issued}</p>}
            </div>
          ))}
        </div>
        <Link href="/credentials" className="mt-6 inline-block text-sm text-accent hover:text-accent-hover">
          Explore all credentials →
        </Link>
      </Container>
    </section>
  );
}

/* ─── Latest Writing ─── */
function LatestWriting() {
  return (
    <section className="border-b border-border bg-bg-surface py-16">
      <Container>
        <SectionHeader label="Writing" title="Latest Notes" />
        <div className="space-y-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/writing/${article.slug}`}
              className="group block rounded-xl border border-border bg-bg p-5 transition-colors hover:border-accent/30"
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-text-muted">{article.date}</span>
                <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                  {article.category}
                </span>
              </div>
              <h3 className="mt-2 text-base font-semibold text-text-primary group-hover:text-accent">
                {article.title}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">{article.description}</p>
            </Link>
          ))}
        </div>
        <Link href="/writing" className="mt-6 inline-block text-sm text-accent hover:text-accent-hover">
          View all writing →
        </Link>
      </Container>
    </section>
  );
}

/* ─── Pipeline Status ─── */
function PipelineSection() {
  return (
    <section className="border-b border-border bg-bg py-16">
      <Container>
        <SectionHeader label="Live" title="Data Pipeline" />
        <PipelineStatus />
        <p className="mt-3 text-xs text-text-muted">
          Daily batch — GitHub REST API → Python/DuckDB → DQ checks → JSON/Parquet
        </p>
        <a
          href="https://github.com/minzi03/portfolio/tree/main/pipeline"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-block text-xs text-accent hover:text-accent-hover"
        >
          View pipeline source ↗
        </a>
      </Container>
    </section>
  );
}

/* ─── Contact ─── */
function Contact() {
  return (
    <section className="bg-bg-surface py-16">
      <Container>
        <SectionHeader label="Connect" title="Let&apos;s Build with Data" />
        <p className="max-w-md text-sm leading-relaxed text-text-secondary">
          I&apos;m interested in Data Engineer and Data Platform opportunities.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href={`mailto:${siteConfig.email}`}
            className="inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
          >
            Email me
          </a>
          <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
            GitHub
          </a>
          <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
            LinkedIn
          </a>
          <a href={siteConfig.resumeUrl} className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
            Resume
          </a>
        </div>
      </Container>
    </section>
  );
}

/* ─── Page ─── */
export default function Home() {
  return (
    <>
      <Hero />
      <GlanceMetrics />
      <WhatIBuild />
      <FeaturedProjects />
      <ExperienceSection />
      <EducationSection />
      <LatestWriting />
      <CredentialsTeaser />
      <PipelineSection />
      <Contact />
    </>
  );
}
