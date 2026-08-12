import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import GraphExplorer from "@/components/graphs/graph-explorer";
import { projects, getProjectBySlug } from "@/data/projects";
import type { Project, ADR, ProjectMetric } from "@/data/types";

import archData from "@/data/projects/banking/architecture.json";
import pipeData from "@/data/projects/banking/pipeline.json";
import modelData from "@/data/projects/banking/model.json";
import lineageData from "@/data/projects/banking/lineage.json";
import { bankingDataSources } from "@/data/projects/banking/case-study";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.subtitle,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.subtitle,
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.subtitle,
    },
  };
}

/* ─── Section components ─── */

function SectionHeader({ n, title }: { n: string; title: string }) {
  return (
    <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">
      {n} — {title}
    </h3>
  );
}

function ProblemSection({ problem }: { problem: string }) {
  return (
    <section>
      <SectionHeader n="01" title="Problem" />
      <p className="max-w-xl text-sm leading-relaxed text-text-secondary">{problem}</p>
    </section>
  );
}

function ConstraintsSection({ constraints }: { constraints: string[] }) {
  return (
    <section>
      <SectionHeader n="02" title="Constraints" />
      <div className="grid gap-2 sm:grid-cols-2">
        {constraints.map((c, i) => (
          <div key={i} className="rounded-lg border border-border bg-bg-surface px-3 py-2 text-sm text-text-secondary">
            {c}
          </div>
        ))}
      </div>
    </section>
  );
}

function ArchitectureSection() {
  return (
    <section>
      <SectionHeader n="03" title="Architecture" />
      <GraphExplorer data={archData} />
    </section>
  );
}

function DataSourcesSection({ sources }: { sources: string[] }) {
  return (
    <section>
      <SectionHeader n="04" title="Data Sources" />
      <p className="mb-3 text-sm text-text-secondary">{sources.length} source datasets.</p>
      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {sources.map((src) => (
          <div key={src} className="rounded-lg border border-border bg-bg-surface px-3 py-2 font-mono text-xs text-text-secondary">
            {src}
          </div>
        ))}
      </div>
    </section>
  );
}

function PipelineSection() {
  return (
    <section>
      <SectionHeader n="05" title="CDC Pipeline" />
      <GraphExplorer data={pipeData} />
    </section>
  );
}

function DataModelSection() {
  return (
    <section>
      <SectionHeader n="06" title="Data Model" />
      <GraphExplorer data={modelData} />
    </section>
  );
}

function LineageSection() {
  return (
    <section>
      <SectionHeader n="07" title="Data Lineage" />
      <GraphExplorer data={lineageData} />
    </section>
  );
}

function AdrSection({ adrs }: { adrs: ADR[] }) {
  return (
    <section>
      <SectionHeader n={adrs.length > 3 ? "08" : "03"} title="Engineering Decisions" />
      <div className="space-y-4">
        {adrs.map((d) => (
          <div key={d.id} className="rounded-xl border border-border bg-bg-surface p-5">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[11px] text-accent">{d.id}</span>
              <h4 className="text-sm font-semibold text-text-primary">{d.title}</h4>
            </div>
            <div className="mt-3 space-y-2">
              <div>
                <p className="text-[11px] font-medium uppercase text-text-muted">Context</p>
                <p className="text-sm text-text-secondary">{d.context}</p>
              </div>
              {d.alternatives && d.alternatives.length > 0 && (
                <div>
                  <p className="text-[11px] font-medium uppercase text-text-muted">Alternatives</p>
                  <p className="text-sm text-text-secondary">{d.alternatives.join(" · ")}</p>
                </div>
              )}
              <div>
                <p className="text-[11px] font-medium uppercase text-text-muted">Decision → {d.decision}</p>
                <p className="text-sm text-text-secondary">{d.rationale}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium uppercase text-text-muted">Trade-offs</p>
                <ul className="text-sm text-text-secondary">
                  {d.tradeoffs.map((t, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/50" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ImpactSection({ metrics }: { metrics: ProjectMetric[] }) {
  return (
    <section>
      <SectionHeader n="09" title="Impact" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {metrics.map((m) => (
          <div key={m.id} className="rounded-lg border border-border bg-bg-surface p-3 text-center">
            <p className="text-xl font-bold font-mono text-accent">{m.value}</p>
            <p className="text-[11px] text-text-muted">{m.label}</p>
            {m.context && <p className="mt-1 text-[10px] text-text-muted">{m.context}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function LimitationsSection({ limitations }: { limitations: string[] }) {
  return (
    <section>
      <SectionHeader n="10" title="Limitations" />
      <div className="rounded-xl border border-border bg-bg-surface p-5">
        <ul className="space-y-2 text-sm text-text-secondary">
          {limitations.map((item, i) => (
            <li key={i} className="flex gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function ImprovementsSection({ improvements }: { improvements: string[] }) {
  return (
    <section>
      <SectionHeader n="11" title="What I Would Improve" />
      <div className="grid gap-3 sm:grid-cols-2">
        {improvements.map((item, i) => (
          <div key={i} className="flex gap-2 rounded-lg border border-border bg-bg p-3 text-sm text-text-secondary">
            <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── Banking-specific sections (GraphExplorer data) ─── */

function BankingExtraSections() {
  return (
    <>
      <DataSourcesSection sources={bankingDataSources} />
      <PipelineSection />
      <DataModelSection />
      <LineageSection />
      <section>
        <SectionHeader n="10" title="Data Quality & Governance" />
        <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
          OpenMetadata catalogs all 53 tables with full column-level lineage (22 edges).
          Data quality checks at each Medallion layer validate schema, completeness, and referential integrity.
          Governance metadata includes data owners, PII classification, and retention policies.
        </p>
      </section>
    </>
  );
}

/* ─── Unified data-driven case study ─── */

function ProjectCaseStudy({ project }: { project: Project }) {
  const sectionNumbers = { adr: project.slug === "banking-data-platform" ? "08" : "03" };
  const hasBankingGraphs = project.slug === "banking-data-platform";

  return (
    <div className="space-y-12">
      {project.problem && <ProblemSection problem={project.problem} />}
      {project.constraints && project.constraints.length > 0 && (
        <ConstraintsSection constraints={project.constraints} />
      )}
      {hasBankingGraphs && <ArchitectureSection />}
      {hasBankingGraphs && <BankingExtraSections />}
      {project.adrs && project.adrs.length > 0 && <AdrSection adrs={project.adrs} />}
      {project.impact && project.impact.length > 0 && <ImpactSection metrics={project.impact} />}
      {project.limitations && project.limitations.length > 0 && (
        <LimitationsSection limitations={project.limitations} />
      )}
      {project.improvements && project.improvements.length > 0 && (
        <ImprovementsSection improvements={project.improvements} />
      )}
      {project.github && (
        <section>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Repository</h3>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
          >
            View on GitHub →
          </a>
        </section>
      )}
    </div>
  );
}

/* ─── Page ─── */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        <Link href="/projects" className="mb-8 inline-block text-sm text-accent hover:text-accent-hover">
          ← All projects
        </Link>

        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Project</p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-base text-text-secondary">{project.subtitle}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((s) => (
              <span key={s} className="rounded border border-border bg-bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <ProjectCaseStudy project={project} />
        </div>
      </Container>
    </div>
  );
}
