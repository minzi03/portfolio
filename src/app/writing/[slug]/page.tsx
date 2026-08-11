import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { articles, getArticleBySlug } from "@/data/writing";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: `/writing/${slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
    },
  };
}

/* ─── Article Content Placeholders ─── */
const articleContent: Record<string, React.ReactNode> = {
  "building-banking-lakehouse": (
    <div className="space-y-8">
      <section>
        <h2>The Problem</h2>
        <p>
          Retail banking generates data across multiple systems — customer profiles, accounts,
          transactions, cards, digital banking events, and operational logs. The challenge was to
          design a unified analytical platform that could support Customer 360, RFM segmentation,
          churn analysis, and AUM analytics while maintaining data quality and governance.
        </p>
      </section>

      <section>
        <h2>Architecture Choices</h2>
        <p>
          I chose a Medallion Lakehouse architecture with Apache Iceberg as the table format.
          The pipeline has two ingestion paths: batch (full and incremental) via PySpark, and
          near-real-time CDC via Debezium + Kafka + Spark Structured Streaming.
        </p>
        <p>
          The Bronze layer stores raw ingested data. Silver applies deduplication, schema validation,
          and watermarking. Gold contains business-ready dimensional models built with Spark and
          validated with dbt.
        </p>
      </section>

      <section>
        <h2>Engineering Decisions</h2>
        <p>
          The most interesting decisions were around idempotency (Iceberg MERGE), the boundary between
          Spark and dbt for transformations, and why I chose micro-batch over true streaming for the
          CDC pipeline. Each decision is documented in the project case study with full context,
          alternatives considered, and trade-offs.
        </p>
      </section>

      <section>
        <h2>Key Takeaway</h2>
        <p>
          The biggest lesson was that architecture decisions compound. Choosing Iceberg early meant
          CDC writes were naturally idempotent. Choosing dbt for Gold-layer business logic meant
          analysts could iterate without touching Spark pipelines. Each choice made the next one easier.
        </p>
      </section>
    </div>
  ),

  "spark-vs-dbt": (
    <div className="space-y-8">
      <section>
        <h2>The Question</h2>
        <p>
          In a Lakehouse architecture, where should transformation logic live? Spark handles heavy
          compute — deduplication, watermarks, MERGE operations. dbt handles business logic —
          aggregations, joins, metrics. But the boundary isn&apos;t always obvious.
        </p>
      </section>

      <section>
        <h2>My Approach</h2>
        <p>
          I split transformations by compute requirements. Spark handles anything that needs:
          distributed compute, stateful streaming operations, schema evolution handling, or
          write-path transformations (MERGE into Iceberg). dbt handles anything that&apos;s:
          SQL-native, business-logic-heavy, frequently changed, or needs testing and documentation.
        </p>
      </section>

      <section>
        <h2>Practical Split</h2>
        <p>
          In my Banking Data Platform: Spark does Bronze → Silver (dedup, validate, watermark) and
          Silver → Gold (heavy joins, aggregations). dbt sits on top of Gold for dimensional
          modeling, metric definitions, and business logic that analysts need to iterate on quickly.
        </p>
      </section>

      <section>
        <h2>When to Reconsider</h2>
        <p>
          If I were rebuilding, I might move some Silver-layer transformations to dbt — the pure SQL
          ones that don&apos;t need Spark&apos;s compute. The key insight: dbt isn&apos;t just for
          analytics engineering. It&apos;s a transformation framework that can complement Spark when
          the compute requirements are moderate.
        </p>
      </section>
    </div>
  ),

  "understanding-cdc": (
    <div className="space-y-8">
      <section>
        <h2>What is CDC?</h2>
        <p>
          Change Data Capture (CDC) is a pattern for capturing row-level changes (INSERT, UPDATE,
          DELETE) from a source database and propagating them to downstream systems. Instead of
          polling the entire table, CDC reads the database&apos;s transaction log to capture only
          what changed.
        </p>
      </section>

      <section>
        <h2>Debezium + PostgreSQL</h2>
        <p>
          Debezium connects to PostgreSQL&apos;s WAL (Write-Ahead Log) via logical replication.
          It captures every row change as a CDC event with the operation type (c=create, u=update,
          d=delete), the before state, and the after state. These events are published to Kafka
          topics — one per table.
        </p>
      </section>

      <section>
        <h2>Kafka as Transport</h2>
        <p>
          Kafka provides durable, ordered, replayable transport for CDC events. Each event includes
          the source database LSN (Log Sequence Number), Kafka offset, and timestamp. This means
          consumers can exactly replay from any point — critical for pipeline recovery.
        </p>
      </section>

      <section>
        <h2>Iceberg MERGE</h2>
        <p>
          The consumer side is where it gets interesting. Spark Structured Streaming reads CDC events
          from Kafka and applies them to Iceberg tables using MERGE operations. This makes writes
          idempotent — re-running the same batch produces the same result. The combination of
          Debezium + Kafka + Iceberg MERGE gives us: exactly-once semantics (effectively), event-time
          ordering, and time travel on the result.
        </p>
      </section>
    </div>
  ),
};

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const content = articleContent[slug];

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        <Link href="/writing" className="mb-8 inline-block text-sm text-accent hover:text-accent-hover">
          ← All articles
        </Link>

        <article className="max-w-2xl">
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Article",
                "headline": article.title,
                "description": article.description,
                "author": { "@type": "Person", "name": "Nguyen Minh Duy" },
                "datePublished": article.date,
                "keywords": article.tags.join(", "),
              }),
            }}
          />

          <div className="flex items-baseline gap-3">
            <span className="font-mono text-xs text-text-muted">{article.date}</span>
            <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
              {article.category}
            </span>
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {article.title}
          </h1>
          <p className="mt-3 text-base text-text-secondary">{article.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {article.tags.map((tag) => (
              <span key={tag} className="rounded border border-border bg-bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted">
                {tag}
              </span>
            ))}
          </div>
        </article>

        <div className="prose mt-10 max-w-2xl space-y-6 text-text-secondary [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-text-primary [&_p]:text-sm [&_p]:leading-relaxed">
          {content || <p>Article content coming soon.</p>}
        </div>
      </Container>
    </div>
  );
}
