import type { ProjectMetric, ADR } from "@/data/types";

export const mdsImpact: ProjectMetric[] = [
  {
    id: "pipeline-tables",
    label: "Tables",
    value: "5",
    type: "coverage",
    context: "Source + staging + SCD2 dimensions",
  },
  {
    id: "scd-type",
    label: "SCD Type",
    value: "Type 2",
    type: "quality",
    context: "Slowly changing dimensions with full history tracking",
  },
  {
    id: "pattern",
    label: "Pattern",
    value: "ELT",
    type: "scale",
    context: "Extract-Load-Transform with dbt",
  },
];

export const mdsADRs: ADR[] = [
  {
    id: "MDS-ADR-001",
    title: "Why Debezium + Kafka for CDC?",
    context:
      "Need to capture PostgreSQL changes without impacting source performance.",
    decision: "Debezium CDC → Kafka → Snowflake",
    alternatives: [
      "Polling-based extraction",
      "Trigger-based capture",
      "Debezium CDC",
    ],
    rationale:
      "Debezium reads WAL directly — zero impact on source queries. Kafka provides durable, ordered buffer for downstream consumers.",
    tradeoffs: [
      "Adds Kafka and Debezium operational complexity, but source impact is critical for production databases.",
    ],
  },
  {
    id: "MDS-ADR-002",
    title: "Why SCD Type 2 for dimensions?",
    context:
      "Analytics team needs to track historical changes — who was the account holder 6 months ago?",
    decision: "SCD Type 2 with dbt snapshots",
    alternatives: ["SCD Type 1 (overwrite)", "SCD Type 2 (dbt snapshots)", "SCD Type 3"],
    rationale:
      "Full historical tracking with minimal pipeline complexity. dbt snapshots handle the mechanical work; analysts query valid_from/valid_to directly.",
    tradeoffs: [
      "Storage cost grows with history, but analytical value of temporal queries justifies it.",
    ],
  },
  {
    id: "MDS-ADR-003",
    title: "Why MinIO as S3-compatible landing zone?",
    context:
      "Need cost-effective object storage for raw CDC data before Snowflake ingestion.",
    decision: "MinIO for local S3-compatible storage",
    alternatives: ["Direct to Snowflake", "Local filesystem", "MinIO (S3-compatible)"],
    rationale:
      "S3-compatible API means production code works unchanged in local dev. MinIO runs as a single container — no cloud dependency for development.",
    tradeoffs: [
      "Single-node MinIO has no replication, but acceptable for portfolio demonstration.",
    ],
  },
];

export const mdsProblem =
  "Build an ELT pipeline that captures CDC events from PostgreSQL, lands them in object storage, and transforms them into analytics-ready SCD Type 2 dimensions in Snowflake — demonstrating a modern data stack pattern.";

export const mdsConstraints: string[] = [
  "Source: PostgreSQL with active transactional workload",
  "CDC capture must not impact source query performance",
  "Snowflake as cloud data warehouse destination",
  "dbt for SQL-based transformations and SCD2 snapshots",
  "MinIO for S3-compatible local landing zone",
];

export const mdsLimitations: string[] = [
  "Runs in local Docker environment, not production cloud infrastructure",
  "MinIO is single-node — no replication or fault tolerance",
  "Kafka runs as single broker — no partitioning or consumer groups",
  "Snowflake stage uses local emulation for development",
  "CDC latency depends on Kafka consumer poll interval",
];

export const mdsImprovements: string[] = [
  "Add schema registry for CDC event contract enforcement",
  "Implement dead letter queue for failed CDC events",
  "Add data quality checks between landing and staging layers",
  "Deploy to cloud with managed Kafka (Confluent / MSK)",
  "Add dbt tests for source freshness and freshness monitoring",
];
