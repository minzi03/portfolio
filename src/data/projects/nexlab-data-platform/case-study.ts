import type { ProjectMetric, ADR } from "@/data/types";

export const nexlabImpact: ProjectMetric[] = [
  {
    id: "record-volume",
    label: "Records",
    value: "78M+",
    type: "scale",
    context: "NYC TLC Yellow Taxi trips across 24 months (2022–2023)",
  },
  {
    id: "data-volume",
    label: "Raw Data",
    value: "~10 GB",
    type: "scale",
    context: "24 Parquet files compressed, ~18 GB uncompressed",
  },
  {
    id: "table-count",
    label: "Iceberg Tables",
    value: "7",
    type: "coverage",
    context: "2 Bronze + 2 Silver + 3 Gold across Medallion layers",
  },
  {
    id: "dq-checks",
    label: "DQ Checks",
    value: "18",
    type: "quality",
    context: "not_null (9), uniqueness (1), row_count (4), range (4) — 83% pass rate",
  },
  {
    id: "pipeline-runtime",
    label: "Pipeline Runtime",
    value: "~57 min",
    type: "performance",
    context: "Single Spark worker (1 core, 1 GB) processing 78M rows",
  },
  {
    id: "dag-count",
    label: "Airflow Tasks",
    value: "7",
    type: "coverage",
    context: "Bronze (1) → Silver (2) → Gold (3) → DQ (1) via SparkSubmitOperator",
  },
  {
    id: "docker-services",
    label: "Docker Services",
    value: "11",
    type: "scale",
    context: "~7 GB RAM: Spark, Airflow, Trino, MinIO, PostgreSQL, Streamlit, Iceberg REST",
  },
  {
    id: "ci-jobs",
    label: "CI/CD Jobs",
    value: "6",
    type: "quality",
    context: "Lint, unit tests, integration, security scan, Docker build, full-stack E2E",
  },
  {
    id: "zones",
    label: "NYC Zones",
    value: "265",
    type: "coverage",
    context: "Taxi zone lookup with borough, zone, and service zone classifications",
  },
  {
    id: "dashboard-langs",
    label: "Dashboard Languages",
    value: "2",
    type: "coverage",
    context: "English/Vietnamese bilingual with full translation dictionary",
  },
];

export const nexlabADRs: ADR[] = [
  {
    id: "ADR-001",
    title: "Why Apache Iceberg over Delta Lake?",
    context:
      "Need open table format with REST catalog for multi-engine architecture (Spark + Trino).",
    decision: "Apache Iceberg 1.4.3 with REST catalog",
    alternatives: ["Delta Lake", "Apache Hudi", "Apache Iceberg"],
    rationale:
      "Open format, native REST catalog decouples metadata from compute. Time travel, schema evolution, hidden partitioning. REST catalog allows Trino and Spark to share the same catalog without metastore coupling.",
    tradeoffs: [
      "Smaller community than Delta Lake, but open format is critical for multi-engine architectures.",
    ],
  },
  {
    id: "ADR-002",
    title: "Why Trino for dashboard serving?",
    context:
      "Dashboard needs fast interactive OLAP queries on Iceberg tables.",
    decision: "Trino 435",
    alternatives: ["Spark SQL", "Presto", "Trino"],
    rationale:
      "Fast interactive queries without spinning up Spark. Streamlit queries execute in seconds via Trino vs. minutes via Spark.",
    tradeoffs: [
      "Trino is read-only for serving; cannot write to Iceberg. Additional service to maintain.",
    ],
  },
  {
    id: "ADR-003",
    title: "Why MinIO over AWS S3?",
    context:
      "Need S3-compatible object storage for local development.",
    decision: "Self-hosted MinIO",
    alternatives: ["AWS S3", "Azure Blob", "MinIO"],
    rationale:
      "Zero cloud cost, runs locally, full S3 API compatibility. Enables identical code to work on cloud S3 in production.",
    tradeoffs: [
      "No cloud redundancy, no managed lifecycle policies.",
    ],
  },
  {
    id: "ADR-004",
    title: "Why overwritePartitions over MERGE?",
    context:
      "Silver and Gold layers need idempotent write strategy.",
    decision: "overwritePartitions()",
    alternatives: ["Iceberg MERGE", "INSERT + dedup", "overwritePartitions"],
    rationale:
      "Simpler implementation; re-processing is acceptable for batch pipeline. Full partition overwrite ensures consistency.",
    tradeoffs: [
      "Cannot do incremental updates; entire partition rewritten on each run.",
    ],
  },
  {
    id: "ADR-005",
    title: "Why SHA-256 surrogate keys?",
    context:
      "Need deterministic, collision-resistant trip IDs without coordination.",
    decision: "SHA-256 hash of natural key",
    alternatives: ["Auto-increment", "UUID", "SHA-256 hash"],
    rationale:
      "Deterministic (same input = same key), enables dedup without state, works across distributed processing without coordination.",
    tradeoffs: [
      "64-char string keys less efficient than integer keys for indexing.",
    ],
  },
  {
    id: "ADR-006",
    title: "Why individual Parquet file reading?",
    context:
      "Different Parquet files have INT32 vs INT64 physical types for the same logical column.",
    decision: "Read each file individually, then unionByName",
    alternatives: ["glob() single read", "Read individually + union", "Schema merge"],
    rationale:
      "Avoids Spark's 'fail on schema merge' when physical types differ. unionByName(allowMissingColumns=True) handles schema variation.",
    tradeoffs: [
      "More code than a single glob read, but avoids silent type coercion bugs.",
    ],
  },
  {
    id: "ADR-007",
    title: "Why separate PostgreSQL for metadata?",
    context:
      "Need ETL flag tracking, DQ results, and pipeline audit log.",
    decision: "Separate ops schema in PostgreSQL",
    alternatives: ["Airflow metadata DB", "Separate PostgreSQL", "File-based"],
    rationale:
      "Clean separation of concerns; enables cross-system queries (dashboard reads DQ results from PostgreSQL). ON CONFLICT upsert for idempotent flag updates.",
    tradeoffs: [
      "Additional schema to manage; potential for drift with Airflow's own metadata DB.",
    ],
  },
  {
    id: "ADR-008",
    title: "Why structlog over Python logging?",
    context:
      "Need machine-parseable logs for observability.",
    decision: "structlog with JSON rendering",
    alternatives: ["Python logging", "loguru", "structlog"],
    rationale:
      "Structured JSON logs suitable for observability tools; consistent format across all 7 ETL jobs. ISO timestamps and bound job names.",
    tradeoffs: [
      "JSON output less human-readable in terminal; slightly more setup.",
    ],
  },
];

export const nexlabProblem = `NYC taxi operators and city planners need to analyze trip patterns, revenue trends, and zone-level performance across millions of taxi trips. Raw trip data is published monthly as Parquet files by the NYC Taxi & Limousine Commission, spanning 24 months (2022–2023) with approximately 78 million records across 24 files (~10 GB compressed). There is no pre-built analytics layer, no automated quality checks, and manual analysis requires downloading and joining multiple datasets. The goal was to build an automated data platform answering three business questions: daily revenue trends, zone-level revenue performance, and hourly demand patterns.`;

export const nexlabConstraints: string[] = [
  "78M+ records across 24 monthly Parquet files (~10 GB compressed, ~18 GB uncompressed)",
  "6-layer architecture: Serving → Query Engine → Orchestration → Processing → Lakehouse → Metadata",
  "Single Spark worker (1 core, 1 GB) — full pipeline ~57 min",
  "18 data quality checks with persistent results in PostgreSQL",
  "Bilingual dashboard (English/Vietnamese) with Plotly interactive charts",
];

export const nexlabLimitations: string[] = [
  "Single Spark worker — full pipeline takes ~57 minutes (scaling to 4+ workers would reduce to <10 min)",
  "Manual trigger only — no automated scheduling or freshness guarantees",
  "83.3% DQ pass rate — 3 failing checks (uniqueness outlier, range outliers in fare/tip amounts)",
  "overwritePartitions strategy — full partition rewrite, no incremental updates",
  "Local-only deployment — no cloud redundancy or managed services",
  "No streaming path — batch-only architecture",
  "No alerting on pipeline failures — silent failures require manual monitoring",
];

export const nexlabImprovements: string[] = [
  "Scale to 4+ Spark workers for <10 min pipeline runtime",
  "Add cron scheduling for automated daily/weekly freshness",
  "Implement Iceberg MERGE for incremental updates instead of full partition overwrite",
  "Add Kafka + Spark Structured Streaming for near-real-time ingestion",
  "Deploy to GCP/AWS with Terraform for production scalability",
  "Investigate and fix 3 failing DQ checks (uniqueness, range outliers)",
  "Add Slack/email alerting via Airflow callbacks",
  "Leverage Iceberg time travel for data versioning and rollback",
  "Adopt dbt for testable, documented SQL transformations",
  "Add data catalog (OpenMetadata) for discoverability",
];
