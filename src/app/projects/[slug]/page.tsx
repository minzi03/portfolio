import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { LazyGraphExplorer, LazyProjectEvidence, LazyInteractiveDiagram } from "@/components/ui/LazySection";
import { projects, getProjectBySlug } from "@/data/projects";
import { getProjectEvidence } from "@/data/projects/evidence";
import { getArchitectureData, type ArchitectureData } from "@/lib/architecture";
import { siteConfig } from "@/data/site-config";
import type { Project, ADR, ProjectMetric } from "@/data/types";

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

  const description = `${project.subtitle} — ${project.tech.slice(0, 5).join(", ")}. ${project.scope} scope project by Nguyen Minh Duy.`;

  return {
    title: `${project.title} — Data Engineering Case Study`,
    description,
    keywords: [
      project.title,
      project.category.replace(/-/g, " "),
      ...project.tech,
      "Data Engineering",
      "Portfolio",
      "Case Study",
    ],
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: "article",
      title: `${project.title} — Data Engineering Case Study`,
      description,
      url: `${siteConfig.url}/projects/${slug}`,
      siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
      images: [
        {
          url: `${siteConfig.url}/projects/${slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${project.title} — Nguyen Minh Duy Data Engineering Portfolio`,
        },
      ],
      authors: ["Nguyen Minh Duy"],
      publishedTime: project.period?.split("–")[0]?.trim(),
      tags: project.tech,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Data Engineering Case Study`,
      description,
      images: [`${siteConfig.url}/projects/${slug}/opengraph-image`],
      creator: "@minzi03",
    },
    robots: {
      index: true,
      follow: true,
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

/* ─── Tech Deep-Dive Section ─── */

interface TechRole {
  name: string;
  role: string;
  why: string;
}

const TECH_ROLES: Record<string, TechRole> = {
  // Ingestion & Streaming
  "Apache Kafka": { name: "Apache Kafka", role: "Event streaming platform", why: "Durable, ordered message buffer for CDC events with exactly-once semantics" },
  "Debezium": { name: "Debezium", role: "CDC connector", why: "Reads database WAL logs for zero-impact change capture" },
  "Apache NiFi": { name: "Apache NiFi", role: "Data flow automation", why: "Visual, config-driven ingestion from heterogeneous sources with backpressure control" },
  "Azure Data Factory": { name: "Azure Data Factory", role: "Cloud orchestration", why: "Managed ETL orchestration with native Azure connectors" },
  "Azure Databricks": { name: "Azure Databricks", role: "Cloud Spark platform", why: "Managed Spark cluster with Delta Lake and collaborative notebooks" },
  "Synapse Analytics": { name: "Synapse Analytics", role: "Cloud data warehouse", why: "Serverless SQL pool for analytics serving with Power BI integration" },
  // Processing & Transformation
  "Apache Spark": { name: "Apache Spark", role: "Distributed processing engine", why: "Handles millions of rows with MERGE, deduplication, and Structured Streaming" },
  PySpark: { name: "PySpark", role: "Spark Python API", why: "Python-native interface for Spark's distributed compute" },
  dbt: { name: "dbt", role: "SQL transformation framework", why: "Version-controlled, testable SQL models with documentation built in" },
  Python: { name: "Python", role: "Pipeline orchestration & logic", why: "Flexibility for custom ingestion, validation, and transformation logic" },
  SQL: { name: "SQL", role: "Data transformation & queries", why: "Declarative transformations for analytics-ready models" },
  // Storage & Table Formats
  "Apache Iceberg": { name: "Apache Iceberg", role: "Open table format", why: "ACID transactions, schema evolution, time travel on object storage" },
  "Delta Lake": { name: "Delta Lake", role: "Table format", why: "ACID transactions with native Databricks integration" },
  "ADLS Gen2": { name: "ADLS Gen2", role: "Cloud data lake storage", why: "Hierarchical namespace with HDFS compatibility for big data workloads" },
  MinIO: { name: "MinIO", role: "S3-compatible object storage", why: "Local development parity with production S3 APIs" },
  Snowflake: { name: "Snowflake", role: "Cloud data warehouse", why: "Elastic compute + storage separation with automatic optimization" },
  PostgreSQL: { name: "PostgreSQL", role: "Source database", why: "Transactional source with WAL-based CDC support" },
  // Compute & Query
  Trino: { name: "Trino", role: "Distributed SQL engine", why: "Sub-second federated queries across Iceberg, PostgreSQL, and other sources" },
  "Apache Superset": { name: "Apache Superset", role: "BI & visualization", why: "Open-source dashboards with SQL-first approach" },
  "Power BI": { name: "Power BI", role: "Business intelligence", why: "Enterprise dashboards with Azure ecosystem integration" },
  // Governance & Quality
  OpenMetadata: { name: "OpenMetadata", role: "Data catalog & governance", why: "Centralized metadata, lineage, and access policies across all tables" },
  "Apache Airflow": { name: "Apache Airflow", role: "Workflow orchestration", why: "DAG-based scheduling with dependency management and retry logic" },
  Docker: { name: "Docker", role: "Containerization", why: "Reproducible environments across development and deployment" },
  "GitHub Actions": { name: "GitHub Actions", role: "CI/CD automation", why: "Automated testing and deployment gates on every push" },
  pgvector: { name: "pgvector", role: "Vector search extension", why: "Embedding storage and similarity search in PostgreSQL" },
  Streamlit: { name: "Streamlit", role: "Data app framework", why: "Rapid prototyping of data dashboards and interactive tools" },
  Dremio: { name: "Dremio", role: "Lakehouse query engine", why: "Reflection-based acceleration for Iceberg analytical queries" },
  "Data Modeling": { name: "Data Modeling", role: "Dimensional design", why: "Star schema design for predictable OLAP query patterns" },
};

function TechStackSection({ tech }: { tech: string[] }) {
  // Categorize technologies
  const categories = [
    {
      label: "Ingestion & Streaming",
      icon: "⚡",
      match: ["Apache Kafka", "Debezium", "Apache NiFi", "Azure Data Factory"],
    },
    {
      label: "Processing & Transformation",
      icon: "🔄",
      match: ["Apache Spark", "PySpark", "dbt", "Python", "SQL"],
    },
    {
      label: "Storage & Tables",
      icon: "💾",
      match: ["Apache Iceberg", "Delta Lake", "ADLS Gen2", "MinIO", "Snowflake", "PostgreSQL"],
    },
    {
      label: "Compute & Analytics",
      icon: "🔍",
      match: ["Trino", "Apache Superset", "Power BI", "Dremio", "Streamlit"],
    },
    {
      label: "Governance & Ops",
      icon: "🛡️",
      match: ["OpenMetadata", "Apache Airflow", "Docker", "GitHub Actions"],
    },
  ];

  // Filter to only categories that have matching tech
  const activeCategories = categories
    .map((cat) => ({
      ...cat,
      items: tech.filter((t) => cat.match.includes(t)),
    }))
    .filter((cat) => cat.items.length > 0);

  // Any tech not categorized
  const categorizedTech = new Set(categories.flatMap((c) => c.match));
  const uncategorized = tech.filter((t) => !categorizedTech.has(t));

  return (
    <section>
      <SectionHeader n="03" title="Tech Deep-Dive" />
      <p className="mb-4 text-sm text-text-secondary">
        Why each technology was chosen and what role it plays in the system.
      </p>

      <div className="space-y-4">
        {activeCategories.map((cat) => (
          <div key={cat.label} className="rounded-xl border border-border bg-bg-surface p-4">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm">{cat.icon}</span>
              <p className="font-mono text-[11px] uppercase tracking-wider text-accent">{cat.label}</p>
            </div>
            <div className="space-y-2">
              {cat.items.map((t) => {
                const info = TECH_ROLES[t];
                return (
                  <div key={t} className="flex flex-col gap-1 sm:flex-row sm:items-start sm:gap-3">
                    <div className="shrink-0 sm:w-44">
                      <p className="text-sm font-semibold text-text-primary">{info?.name ?? t}</p>
                      <p className="font-mono text-[10px] text-accent">{info?.role ?? "Tool"}</p>
                    </div>
                    <p className="text-xs leading-relaxed text-text-muted">{info?.why ?? `Part of the ${t} ecosystem.`}</p>
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Uncategorized tech */}
        {uncategorized.length > 0 && (
          <div className="rounded-xl border border-border bg-bg-surface p-4">
            <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">Other</p>
            <div className="flex flex-wrap gap-1.5">
              {uncategorized.map((t) => (
                <span key={t} className="rounded-md border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-text-secondary">
                  {t}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ArchitectureSection({ data }: { data: ArchitectureData }) {
  return (
    <section>
      <SectionHeader n="04" title="Architecture" />
      <LazyInteractiveDiagram data={data} />
    </section>
  );
}

function DataSourcesSection({ sources }: { sources: string[] }) {
  return (
    <section>
      <SectionHeader n="05" title="Data Sources" />
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
      <SectionHeader n="06" title="CDC Pipeline" />
      <LazyGraphExplorer data={pipeData} />
    </section>
  );
}

function DataModelSection() {
  return (
    <section>
      <SectionHeader n="07" title="Data Model" />
      <LazyGraphExplorer data={modelData} />
    </section>
  );
}

function LineageSection() {
  return (
    <section>
      <SectionHeader n="08" title="Data Lineage" />
      <LazyGraphExplorer data={lineageData} />
    </section>
  );
}

function AdrSection({ adrs }: { adrs: ADR[] }) {
  return (
    <section>
      <SectionHeader n="10" title="Engineering Decisions" />
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
      <SectionHeader n="11" title="Impact" />
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
      <SectionHeader n="12" title="Limitations" />
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
      <SectionHeader n="13" title="What I Would Improve" />
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
        <SectionHeader n="09" title="Data Quality & Governance" />
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

interface ProjectNav {
  slug: string;
  title: string;
}

function ProjectCaseStudy({
  project,
  prevProject,
  nextProject,
  architectureData,
}: {
  project: Project;
  prevProject?: ProjectNav;
  nextProject?: ProjectNav;
  architectureData?: ArchitectureData | null;
}) {
  const hasBankingGraphs = project.slug === "banking-data-platform";
  const evidence = getProjectEvidence(project.id);

  return (
    <div className="space-y-12">
      {project.problem && <ProblemSection problem={project.problem} />}
      {project.constraints && project.constraints.length > 0 && (
        <ConstraintsSection constraints={project.constraints} />
      )}
      {project.tech && project.tech.length > 0 && <TechStackSection tech={project.tech} />}
      {architectureData && <ArchitectureSection data={architectureData} />}
      {hasBankingGraphs && <BankingExtraSections />}
      {evidence.length > 0 && <LazyProjectEvidence evidence={evidence} />}
      {project.adrs && project.adrs.length > 0 && <AdrSection adrs={project.adrs} />}
      {project.impact && project.impact.length > 0 && <ImpactSection metrics={project.impact} />}
      {project.limitations && project.limitations.length > 0 && (
        <LimitationsSection limitations={project.limitations} />
      )}
      {project.improvements && project.improvements.length > 0 && (
        <ImprovementsSection improvements={project.improvements} />
      )}
      {/* Bottom CTA */}
      <div className="rounded-xl border border-border bg-bg-surface p-6">
        <h3 className="text-sm font-semibold text-text-primary">Interested in this project?</h3>
        <p className="mt-1 text-xs text-text-muted">Explore the code or see it in action.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-bg px-5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              View Source Code
              <span className="sr-only">(opens in new tab)</span>
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
            >
              Live Demo →
              <span className="sr-only">(opens in new tab)</span>
            </a>
          )}
        </div>
      </div>

      {/* Prev / Next navigation */}
      {(prevProject || nextProject) && (
        <nav className="grid gap-4 sm:grid-cols-2" aria-label="Project navigation">
          {prevProject ? (
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex flex-col rounded-xl border border-border bg-bg-surface p-5 transition-colors hover:border-accent/30"
            >
              <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                ← Previous
              </span>
              <span className="mt-1 text-sm font-semibold text-text-primary group-hover:text-accent">
                {prevProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {nextProject ? (
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex flex-col items-end rounded-xl border border-border bg-bg-surface p-5 text-right transition-colors hover:border-accent/30"
            >
              <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                Next →
              </span>
              <span className="mt-1 text-sm font-semibold text-text-primary group-hover:text-accent">
                {nextProject.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}

      {/* Back navigation */}
      <nav className="mt-4 flex items-center gap-3 text-sm" aria-label="Breadcrumbs">
        <Link href="/#hero" className="text-text-muted transition-colors hover:text-text-primary">
          ← Portfolio
        </Link>
        <span className="text-text-muted/30">/</span>
        <Link href="/#projects" className="text-text-muted transition-colors hover:text-text-primary">
          Projects
        </Link>
      </nav>
    </div>
  );
}

/* ─── Page ─── */
export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  // Load architecture data for this project
  const architectureData = await getArchitectureData(slug);

  // Compute prev/next navigation
  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0
    ? { slug: projects[currentIndex - 1].slug, title: projects[currentIndex - 1].title }
    : undefined;
  const nextProject = currentIndex < projects.length - 1
    ? { slug: projects[currentIndex + 1].slug, title: projects[currentIndex + 1].title }
    : undefined;

  return (
    <div className="bg-bg py-16 sm:py-24">
      {/* ── Structured Data ── */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": siteConfig.url,
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Projects",
                  "item": `${siteConfig.url}/projects`,
                },
                {
                  "@type": "ListItem",
                  "position": 3,
                  "name": project.title,
                  "item": `${siteConfig.url}/projects/${project.slug}`,
                },
              ],
            },
            {
              "@context": "https://schema.org",
              "@type": "SoftwareSourceCode",
              "name": project.title,
              "description": project.summary,
              "url": `${siteConfig.url}/projects/${project.slug}`,
              "codeRepository": siteConfig.github ?? undefined,
              "programmingLanguage": project.tech.slice(0, 5),
              "author": {
                "@type": "Person",
                "name": "Nguyen Minh Duy",
                "url": siteConfig.url,
                "jobTitle": "Data Engineer",
              },
              "dateCreated": project.period?.split("–")[0]?.trim(),
              "keywords": project.tech.join(", "),
              "about": {
                "@type": "Thing",
                "name": project.category.replace(/-/g, " "),
              },
            },
            {
              "@context": "https://schema.org",
              "@type": "Article",
              "headline": project.title,
              "description": project.subtitle,
              "url": `${siteConfig.url}/projects/${project.slug}`,
              "author": {
                "@type": "Person",
                "name": "Nguyen Minh Duy",
                "url": siteConfig.url,
              },
              "publisher": {
                "@type": "Person",
                "name": "Nguyen Minh Duy",
              },
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/projects/${project.slug}`,
              },
              "image": `${siteConfig.url}/projects/${project.slug}/opengraph-image`,
              "datePublished": project.period?.split("–")[0]?.trim(),
              "keywords": project.tech.slice(0, 5).join(", "),
            },
          ]),
        }}
      />

      <Container>
        {/* Top navigation */}
        <nav className="mb-8 flex items-center gap-3 text-sm" aria-label="Project navigation">
          <Link href="/#hero" className="text-text-muted transition-colors hover:text-text-primary">
            ← Portfolio
          </Link>
          <span className="text-text-muted/30">/</span>
          <Link href="/projects" className="text-text-muted transition-colors hover:text-text-primary">
            Projects
          </Link>
        </nav>

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

          {/* Prominent action links */}
          <div className="mt-6 flex flex-wrap gap-3">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-border bg-bg-surface px-5 text-sm font-medium text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                GitHub
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
              >
                Live Demo →
                <span className="sr-only">(opens in new tab)</span>
              </a>
            )}
          </div>
        </div>

        <div className="mt-12">
          <ProjectCaseStudy project={project} prevProject={prevProject} nextProject={nextProject} architectureData={architectureData} />
        </div>
      </Container>
    </div>
  );
}
