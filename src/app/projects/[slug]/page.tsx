import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import GraphExplorer from "@/components/graphs/graph-explorer";
import { projects, getProjectBySlug } from "@/data/projects";

import archData from "@/data/projects/banking/architecture.json";
import pipeData from "@/data/projects/banking/pipeline.json";
import modelData from "@/data/projects/banking/model.json";
import lineageData from "@/data/projects/banking/lineage.json";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      type: "article",
      title: project.name,
      description: project.tagline,
    },
    twitter: {
      card: "summary_large_image",
      title: project.name,
      description: project.tagline,
    },
  };
}

/* ─── Case Study: Banking Data Platform ─── */
function BankingCaseStudy() {
  return (
    <div className="space-y-12">
      {/* 01 Overview */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">01 — Overview</h3>
        <div className="grid gap-6 sm:grid-cols-2">
          <p className="text-sm leading-relaxed text-text-secondary">
            A production-like batch &amp; streaming Lakehouse for retail banking analytics —
            ingesting customer, account, transaction, card, digital banking, and operational data
            into a unified analytical platform.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Role", value: "Solo Data Engineer" },
              { label: "Domain", value: "Retail Banking" },
              { label: "Architecture", value: "Medallion Lakehouse" },
              { label: "Processing", value: "Batch + CDC" },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border bg-bg-surface p-3">
                <p className="text-[11px] text-text-muted">{item.label}</p>
                <p className="text-sm font-medium text-text-primary">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 02 Problem */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">02 — Problem</h3>
        <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
          A retail banking organization generates customer, account, transaction, card,
          digital banking and operational data across multiple systems. The goal was to design
          a unified analytical platform capable of supporting Customer 360, RFM segmentation,
          churn analysis, AUM analytics, cross-sell, and campaign analysis.
        </p>
      </section>

      {/* 03 Architecture */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">03 — Architecture</h3>
        <GraphExplorer data={archData} />
      </section>

      {/* 04 Data Sources */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">04 — Data Sources</h3>
        <p className="mb-3 text-sm text-text-secondary">16 source datasets across banking domains.</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {[
            "customers", "accounts", "transactions", "cards",
            "digital_banking", "branches", "merchants", "products",
            "loans", "deposits", "transfers", "atm_events",
            "mobile_sessions", "web_events", "alerts", "audit_log",
          ].map((src) => (
            <div key={src} className="rounded-lg border border-border bg-bg-surface px-3 py-2 font-mono text-xs text-text-secondary">
              {src}
            </div>
          ))}
        </div>
      </section>

      {/* 05 CDC Pipeline */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">05 — CDC Pipeline</h3>
        <GraphExplorer data={pipeData} />
      </section>

      {/* 06 Data Model */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">06 — Data Model</h3>
        <GraphExplorer data={modelData} />
      </section>

      {/* 07 Lineage */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">07 — Data Lineage</h3>
        <GraphExplorer data={lineageData} />
      </section>

      {/* 08 Engineering Decisions */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">08 — Engineering Decisions</h3>
        <div className="space-y-4">
          {([
            {
              id: "ADR-001",
              q: "Why Apache Iceberg?",
              context: "Need ACID table semantics, schema evolution, and time travel on object storage.",
              alternatives: ["Plain Parquet", "Delta Lake", "Apache Iceberg"],
              decision: "Apache Iceberg",
              why: "Open table format with snapshot semantics, hidden partitioning, and native Spark/Trino interoperability. Avoids vendor lock-in.",
              tradeoff: "Smaller community than Delta Lake, but open format is critical for multi-engine architectures.",
            },
            {
              id: "ADR-002",
              q: "Why Spark for transformations?",
              context: "Need distributed compute for deduplication, watermarking, MERGE operations on millions of rows.",
              alternatives: ["pandas", "dbt (SQL only)", "Apache Spark"],
              decision: "Apache Spark (PySpark)",
              why: "Handles scale, integrates natively with Iceberg MERGE, supports Structured Streaming for CDC path.",
              tradeoff: "Heavier than pandas, but pandas can't handle 4.6M+ rows with stateful operations.",
            },
            {
              id: "ADR-003",
              q: "Why dbt only above Gold?",
              context: "Business logic changes frequently. Analysts need to iterate without touching Spark pipelines.",
              alternatives: ["All in Spark", "dbt everywhere", "dbt on Gold only"],
              decision: "dbt on Gold layer",
              why: "SQL-native, version-controlled, tested. Analysts can modify business logic independently.",
              tradeoff: "Adds dbt as dependency, but the agility gain for business logic iteration is worth it.",
            },
            {
              id: "ADR-004",
              q: "Why Kafka + Debezium for CDC?",
              context: "Banking transactions need near-real-time freshness. Full refresh is wasteful on append-heavy data.",
              alternatives: ["Full refresh", "Log tailing", "Debezium + Kafka"],
              decision: "Debezium + Kafka",
              why: "Captures WAL changes without polling. Kafka provides durable, ordered, replayable transport. Enables exactly-once semantics with checkpointing.",
              tradeoff: "Adds operational complexity (Kafka, Debezium), but freshness benefit justifies it for banking analytics.",
            },
            {
              id: "ADR-005",
              q: "How is idempotency handled?",
              context: "Pipeline failures require re-runs without data duplication.",
              alternatives: ["INSERT + dedup", "Overwrite", "Iceberg MERGE"],
              decision: "Iceberg MERGE + checkpointing",
              why: "MERGE is inherently idempotent — re-running produces the same result. Spark Structured Streaming uses Kafka offsets + checkpointing for exactly-once.",
              tradeoff: "MERGE is slower than INSERT, but correctness trumps speed for financial data.",
            },
            {
              id: "ADR-006",
              q: "Why Medallion Architecture?",
              context: "Raw data arrives with quality issues — duplicates, nulls, inconsistent formats.",
              alternatives: ["Single layer", "Two layers (raw/curated)", "Bronze/Silver/Gold"],
              decision: "Bronze → Silver → Gold",
              why: "Separates concerns: Bronze = raw, Silver = validated, Gold = business-ready. Each layer is queryable, auditable, and serves different consumers.",
              tradeoff: "More storage, but debugging and reprocessing become trivial.",
            },
            {
              id: "ADR-007",
              q: "Why Trino as query layer?",
              context: "Need interactive SQL queries on Iceberg tables for BI and ad-hoc analysis.",
              alternatives: ["Presto", "Dremio", "Trino"],
              decision: "Trino",
              why: "Native Iceberg connector, good performance on object storage, standard SQL interface.",
              tradeoff: "Trino requires more setup than Dremio, but gives more flexibility for multi-engine queries.",
            },
          ]).map((d) => (
            <div key={d.id} className="rounded-xl border border-border bg-bg-surface p-5">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] text-accent">{d.id}</span>
                <h4 className="text-sm font-semibold text-text-primary">{d.q}</h4>
              </div>
              <div className="mt-3 space-y-2">
                <div>
                  <p className="text-[11px] font-medium uppercase text-text-muted">Context</p>
                  <p className="text-sm text-text-secondary">{d.context}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase text-text-muted">Alternatives</p>
                  <p className="text-sm text-text-secondary">{d.alternatives.join(" · ")}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase text-text-muted">Decision → {d.decision}</p>
                  <p className="text-sm text-text-secondary">{d.why}</p>
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase text-text-muted">Trade-off</p>
                  <p className="text-sm text-text-secondary">{d.tradeoff}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 09 Results */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">09 — Results</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {[
            { value: "4.6M+", label: "Transactions" },
            { value: "16", label: "Sources" },
            { value: "53", label: "Tables" },
            { value: "8", label: "Dimensions" },
            { value: "5", label: "Facts" },
            { value: "22", label: "Lineage edges" },
          ].map((r) => (
            <div key={r.label} className="rounded-lg border border-border bg-bg-surface p-3 text-center">
              <p className="text-xl font-bold font-mono text-accent">{r.value}</p>
              <p className="text-[11px] text-text-muted">{r.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10 Data Quality & Governance */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">10 — Data Quality &amp; Governance</h3>
        <p className="max-w-xl text-sm leading-relaxed text-text-secondary">
          OpenMetadata catalogs all 53 tables with full column-level lineage (22 edges).
          Data quality checks at each Medallion layer validate schema, completeness, and referential integrity.
          Governance metadata includes data owners, PII classification, and retention policies.
        </p>
      </section>

      {/* 11 Limitations */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">11 — Limitations</h3>
        <div className="rounded-xl border border-border bg-bg-surface p-5">
          <ul className="space-y-2 text-sm text-text-secondary">
            {[
              "This project runs in a local, containerized environment.",
              "The dataset is synthetic — designed to model real banking data patterns without PII.",
              "\"Sub-minute freshness\" refers to local end-to-end pipeline execution, not a production SLA.",
              "The architecture is production-inspired, not a claim of production-scale traffic.",
              "Kafka and Debezium run as single-node instances — no replication or fault tolerance.",
            ].map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12 What I Would Improve */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">12 — What I Would Improve in V2</h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {[
            "Separate compute from orchestration more cleanly",
            "Add schema registry (Confluent) for streaming contracts",
            "Introduce Kubernetes for workload isolation",
            "Improve end-to-end observability (Grafana + Prometheus)",
            "Benchmark Iceberg file compaction strategies",
            "Introduce IaC (Terraform) for deployment",
            "Define formal SLOs for freshness and quality",
          ].map((item, i) => (
            <div key={i} className="flex gap-2 rounded-lg border border-border bg-bg p-3 text-sm text-text-secondary">
              <span className="font-mono text-accent">{String(i + 1).padStart(2, "0")}</span>
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* 13 Repository */}
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Repository</h3>
        <a
          href="https://github.com/minzi03/banking_data_platform"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
        >
          View on GitHub →
        </a>
      </section>
    </div>
  );
}

/* ─── Generic Case Study ─── */
function GenericCaseStudy({ project }: { project: NonNullable<ReturnType<typeof getProjectBySlug>> }) {
  return (
    <div className="space-y-10">
      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Overview</h3>
        <p className="max-w-xl text-sm leading-relaxed text-text-secondary">{project.description}</p>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Metrics</h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {project.metrics.map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-bg-surface p-3 text-center">
              <p className="text-xl font-bold font-mono text-accent">{m.value}</p>
              <p className="text-[11px] text-text-muted">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span key={s} className="rounded-lg border border-border bg-bg-surface px-3 py-1.5 font-mono text-sm text-text-secondary">
              {s}
            </span>
          ))}
        </div>
      </section>

      <section>
        <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-accent">Limitations</h3>
        <div className="rounded-xl border border-border bg-bg-surface p-5 text-sm text-text-secondary">
          This project runs in a local/containerized environment with synthetic data.
          The architecture is production-inspired but does not represent production-scale traffic.
        </div>
      </section>

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
            {project.name}
          </h1>
          <p className="mt-3 text-base text-text-secondary">{project.tagline}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span key={s} className="rounded border border-border bg-bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-12">
          {project.slug === "banking-data-platform" ? (
            <BankingCaseStudy />
          ) : (
            <GenericCaseStudy project={project} />
          )}
        </div>
      </Container>
    </div>
  );
}
