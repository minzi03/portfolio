import type { ProjectMetric, ADR } from "@/data/types";

export const bankingImpact: ProjectMetric[] = [
  {
    id: "txn-volume",
    label: "Transactions",
    value: "4.6M+",
    type: "scale",
    context: "Curated across 16 source datasets",
  },
  {
    id: "source-count",
    label: "Sources",
    value: "16",
    type: "coverage",
    context: "Banking domains: customer, account, transaction, card, digital, operational",
  },
  {
    id: "table-count",
    label: "Tables",
    value: "53",
    type: "coverage",
    context: "Bronze / Silver / Gold Medallion layers",
  },
  {
    id: "dimension-count",
    label: "Dimensions",
    value: "8",
    type: "coverage",
  },
  {
    id: "fact-count",
    label: "Facts",
    value: "5",
    type: "coverage",
  },
  {
    id: "lineage-edges",
    label: "Lineage edges",
    value: "22",
    type: "quality",
    context: "Column-level lineage via OpenMetadata",
  },
];

export const bankingADRs: ADR[] = [
  {
    id: "ADR-001",
    title: "Why Apache Iceberg?",
    context:
      "Need ACID table semantics, schema evolution, and time travel on object storage.",
    decision: "Apache Iceberg",
    alternatives: ["Plain Parquet", "Delta Lake", "Apache Iceberg"],
    rationale:
      "Open table format with snapshot semantics, hidden partitioning, and native Spark/Trino interoperability. Avoids vendor lock-in.",
    tradeoffs: [
      "Smaller community than Delta Lake, but open format is critical for multi-engine architectures.",
    ],
  },
  {
    id: "ADR-002",
    title: "Why Spark for transformations?",
    context:
      "Need distributed compute for deduplication, watermarking, MERGE operations on millions of rows.",
    decision: "Apache Spark (PySpark)",
    alternatives: ["pandas", "dbt (SQL only)", "Apache Spark"],
    rationale:
      "Handles scale, integrates natively with Iceberg MERGE, supports Structured Streaming for CDC path.",
    tradeoffs: [
      "Heavier than pandas, but pandas can't handle 4.6M+ rows with stateful operations.",
    ],
  },
  {
    id: "ADR-003",
    title: "Why dbt only above Gold?",
    context:
      "Business logic changes frequently. Analysts need to iterate without touching Spark pipelines.",
    decision: "dbt on Gold layer",
    alternatives: ["All in Spark", "dbt everywhere", "dbt on Gold only"],
    rationale:
      "SQL-native, version-controlled, tested. Analysts can modify business logic independently.",
    tradeoffs: [
      "Adds dbt as dependency, but the agility gain for business logic iteration is worth it.",
    ],
  },
  {
    id: "ADR-004",
    title: "Why Kafka + Debezium for CDC?",
    context:
      "Banking transactions need near-real-time freshness. Full refresh is wasteful on append-heavy data.",
    decision: "Debezium + Kafka",
    alternatives: ["Full refresh", "Log tailing", "Debezium + Kafka"],
    rationale:
      "Captures WAL changes without polling. Kafka provides durable, ordered, replayable transport. Enables exactly-once semantics with checkpointing.",
    tradeoffs: [
      "Adds operational complexity (Kafka, Debezium), but freshness benefit justifies it for banking analytics.",
    ],
  },
  {
    id: "ADR-005",
    title: "How is idempotency handled?",
    context: "Pipeline failures require re-runs without data duplication.",
    decision: "Iceberg MERGE + checkpointing",
    alternatives: ["INSERT + dedup", "Overwrite", "Iceberg MERGE"],
    rationale:
      "MERGE is inherently idempotent — re-running produces the same result. Spark Structured Streaming uses Kafka offsets + checkpointing for exactly-once.",
    tradeoffs: [
      "MERGE is slower than INSERT, but correctness trumps speed for financial data.",
    ],
  },
  {
    id: "ADR-006",
    title: "Why Medallion Architecture?",
    context:
      "Raw data arrives with quality issues — duplicates, nulls, inconsistent formats.",
    decision: "Bronze → Silver → Gold",
    alternatives: ["Single layer", "Two layers (raw/curated)", "Bronze/Silver/Gold"],
    rationale:
      "Separates concerns: Bronze = raw, Silver = validated, Gold = business-ready. Each layer is queryable, auditable, and serves different consumers.",
    tradeoffs: [
      "More storage, but debugging and reprocessing become trivial.",
    ],
  },
  {
    id: "ADR-007",
    title: "Why Trino as query layer?",
    context:
      "Need interactive SQL queries on Iceberg tables for BI and ad-hoc analysis.",
    decision: "Trino",
    alternatives: ["Presto", "Dremio", "Trino"],
    rationale:
      "Native Iceberg connector, good performance on object storage, standard SQL interface.",
    tradeoffs: [
      "Trino requires more setup than Dremio, but gives more flexibility for multi-engine queries.",
    ],
  },
];

export const bankingProblem = `A retail banking organization generates customer, account, transaction, card, digital banking and operational data across multiple systems. The goal was to design a unified analytical platform capable of supporting Customer 360, RFM segmentation, churn analysis, AUM analytics, cross-sell, and campaign analysis.`;

export const bankingConstraints: string[] = [
  "16 source datasets across banking domains",
  "Batch + CDC (Change Data Capture) ingestion",
  "Medallion Lakehouse architecture (Bronze / Silver / Gold)",
  "Solo Data Engineer — end-to-end ownership",
];

export const bankingLimitations: string[] = [
  "This project runs in a local, containerized environment.",
  "The dataset is synthetic — designed to model real banking data patterns without PII.",
  '"Sub-minute freshness" refers to local end-to-end pipeline execution, not a production SLA.',
  "The architecture is production-inspired, not a claim of production-scale traffic.",
  "Kafka and Debezium run as single-node instances — no replication or fault tolerance.",
];

export const bankingImprovements: string[] = [
  "Separate compute from orchestration more cleanly",
  "Add schema registry (Confluent) for streaming contracts",
  "Introduce Kubernetes for workload isolation",
  "Improve end-to-end observability (Grafana + Prometheus)",
  "Benchmark Iceberg file compaction strategies",
  "Introduce IaC (Terraform) for deployment",
  "Define formal SLOs for freshness and quality",
];

export const bankingOverview = {
  role: "Solo Data Engineer",
  domain: "Retail Banking",
  architecture: "Medallion Lakehouse",
  processing: "Batch + CDC",
};

export const bankingDataSources: string[] = [
  "customers",
  "accounts",
  "transactions",
  "cards",
  "digital_banking",
  "branches",
  "merchants",
  "products",
  "loans",
  "deposits",
  "transfers",
  "atm_events",
  "mobile_sessions",
  "web_events",
  "alerts",
  "audit_log",
];
