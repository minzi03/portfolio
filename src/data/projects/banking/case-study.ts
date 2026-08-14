import type { ProjectMetric, ADR } from "@/data/types";

export const bankingImpact: ProjectMetric[] = [
  {
    id: "txn-volume",
    label: "Transactions",
    value: "4.6M+",
    type: "scale",
    context: "Curated financial transactions across 16 source datasets",
  },
  {
    id: "source-count",
    label: "Sources",
    value: "16",
    type: "coverage",
    context: "3 schemas: core_banking (8), card_crm (3), digital_banking (5)",
  },
  {
    id: "table-count",
    label: "Tables",
    value: "53",
    type: "coverage",
    context: "22 Bronze + 15 Silver + 18 Gold across Medallion layers",
  },
  {
    id: "cdc-freshness",
    label: "CDC Freshness",
    value: "<60s",
    type: "performance",
    context: "Median 49.8s end-to-end: PostgreSQL change → Silver Current (5 local trials)",
  },
  {
    id: "dag-count",
    label: "Airflow DAGs",
    value: "16",
    type: "coverage",
    context: "Bronze (3) + Silver (1) + Gold (1) + CDC (3) + dbt (2) + Ops (6)",
  },
  {
    id: "test-count",
    label: "Tests",
    value: "312",
    type: "quality",
    context: "Automated tests across ETL, governance, integration, operations",
  },
  {
    id: "contract-count",
    label: "Data Contracts",
    value: "33",
    type: "quality",
    context: "YAML contracts with Pydantic validation, 9 enforcement checks",
  },
  {
    id: "dq-checks",
    label: "DQ Check Types",
    value: "8",
    type: "quality",
    context: "Row count, null, unique, range, referential integrity, anomaly, freshness, schema drift",
  },
  {
    id: "lineage-edges",
    label: "Lineage Edges",
    value: "22",
    type: "quality",
    context: "Column-level lineage tracked across all transformation types via OpenMetadata",
  },
  {
    id: "docker-services",
    label: "Docker Services",
    value: "23",
    type: "scale",
    context: "Full platform stack running locally (~18GB memory allocation)",
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
  {
    id: "ADR-008",
    title: "Why config-driven CDC consolidation?",
    context:
      "Multiple entities (customer, account) need CDC consolidation with identical dedup/merge logic.",
    decision: "Generic YAML-configured consolidation engine",
    alternatives: ["Hardcode per entity", "Config-driven engine", "Flink CDC"],
    rationale:
      "Reduces code duplication — same engine handles customer and account via config. Easy to extend to new entities.",
    tradeoffs: [
      "Config abstraction adds indirection, but the reusability gain justifies it for a multi-entity system.",
    ],
  },
  {
    id: "ADR-009",
    title: "Why per-partition watermarks?",
    context:
      "CDC streaming jobs must be restart-safe without duplicating data.",
    decision: "Per-partition watermarks in lakehouse.meta.cdc_watermark",
    alternatives: ["Kafka offsets only", "Per-partition watermarks", "Global checkpoint"],
    rationale:
      "Watermarks track (timestamp_ms, batch_id) per partition. On restart, resume from last successful watermark. Deterministic dedup via (timestamp_ms, batch_id) ordering.",
    tradeoffs: [
      "Watermark storage adds metadata overhead, but restart safety is critical for streaming reliability.",
    ],
  },
  {
    id: "ADR-010",
    title: "Why governance-as-code with data contracts?",
    context:
      "Need automated enforcement of schema, quality, and AI governance policies across 53 tables.",
    decision: "33 YAML data contracts + Pydantic validation + 9 check types",
    alternatives: ["Manual documentation", "Schema registry only", "YAML contracts + enforcement"],
    rationale:
      "Contracts define quality rules, freshness SLAs, and AI governance policies. ContractEnforcer validates DataFrames before writing to lakehouse.",
    tradeoffs: [
      "Contract maintenance adds overhead, but catching quality issues at write time prevents downstream failures.",
    ],
  },
];

export const bankingProblem = `A retail banking organization generates customer, account, transaction, card, digital banking, and operational data across multiple source systems. The platform needed to answer two distinct analytical questions: "What was true then?" (historical analytics via SCD Type 2) and "What is true now?" (near-real-time current state via CDC). The goal was to build a unified analytical platform supporting Customer 360 views, RFM behavioral segmentation, churn risk scoring, cross-sell opportunity identification, and campaign targeting — with both batch and streaming ingestion paths.`;

export const bankingConstraints: string[] = [
  "16 source datasets across 3 schemas (core_banking, card_crm, digital_banking) — 2.6M+ seed rows",
  "Dual ingestion: scheduled batch (Spark JDBC) + near-real-time CDC (Debezium WAL → Kafka → Spark Streaming)",
  "Medallion Lakehouse architecture: Bronze (raw) → Silver (validated, SCD1/SCD2) → Gold (business-ready marts)",
  "CDC consolidation engine with per-partition watermarks, deterministic deduplication, and idempotent Iceberg MERGE",
  "33 YAML data contracts with Pydantic validation and 9 enforcement check types",
  "Solo Data Engineer — end-to-end ownership of 23 Docker services (~18GB memory)",
];

export const bankingLimitations: string[] = [
  "Runs in a local containerized environment (Docker Desktop), not a distributed cloud cluster.",
  "Dataset is synthetic — modeled after real banking data patterns without actual PII.",
  "Sub-minute CDC freshness (median 49.8s) measured locally, not a production SLA guarantee.",
  "Architecture is production-inspired — single-node Kafka, no replication or fault tolerance.",
  "CDC consolidation currently covers only customer and account; other CDC entities remain append-only Bronze history.",
  "Gold analytics are batch-derived; Silver Current does not yet feed Gold layer.",
  "Churn prediction is rule-based, not an ML model.",
];

export const bankingImprovements: string[] = [
  "Extend CDC consolidation to all 6 CDC entities (transaction, card_account, card_transaction, online_transaction)",
  "Implement ML-based churn prediction (replace rule-based scoring)",
  "Add Confluent Schema Registry for streaming data contracts",
  "Deploy Kubernetes for workload isolation and production scalability",
  "Add Kafka consumer lag monitoring to CDC observability",
  "Implement end-to-end exactly-once with two-phase commit across PostgreSQL → Debezium → Kafka → Spark → Iceberg",
  "Introduce IaC (Terraform) for reproducible infrastructure deployment",
  "Define formal SLOs for freshness and quality with automated alerting",
];


export const bankingDataSources: string[] = [
  "branch (100 rows)",
  "product (13 rows)",
  "customer (10,000 rows)",
  "account (25,000 rows)",
  "deposit (15,000 rows)",
  "loan (8,000 rows)",
  "txn_account (2,000,000 rows)",
  "employee (500 rows)",
  "card (15,000 rows)",
  "card_txn (500,000 rows)",
  "crm_interaction (20,000 rows)",
  "device (20,000 rows)",
  "location (500 rows)",
  "online_transaction (300,000 rows)",
  "support_ticket (10,000 rows)",
  "mcc_code (200 rows)",
];
