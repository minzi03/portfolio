import type { ProjectMetric, ADR } from "@/data/types";

export const katalystImpact: ProjectMetric[] = [
  {
    id: "dim-customer",
    label: "Dim Customer",
    value: "24 cols",
    type: "coverage",
    context: "20 business attributes + 4 audit/SCD metadata columns, SCD Type 1 (1 attr) + Type 2 (19 attrs)",
  },
  {
    id: "star-schema",
    label: "Star Schema",
    value: "1F + 3D",
    type: "coverage",
    context: "Fact Account + Dim Customer + Dim Branch + Dim Account with surrogate keys",
  },
  {
    id: "scd-type2",
    label: "SCD Type 2",
    value: "19 attrs",
    type: "quality",
    context: "EFFECTIVE_FROM, EFFECTIVE_TO, IS_CURRENT for full historical tracking on Customer dimension",
  },
  {
    id: "source-tables",
    label: "Source Tables",
    value: "5",
    type: "scale",
    context: "Core Banking customer (raw + individual + corporate), account, branch — across database, Excel, Oracle",
  },
  {
    id: "ingest-sources",
    label: "Ingest Sources",
    value: "3",
    type: "coverage",
    context: "Database (Core Banking), Excel files (Account/Branch), Oracle (relational + XML)",
  },
  {
    id: "technologies",
    label: "Technologies",
    value: "4",
    type: "coverage",
    context: "Apache NiFi (ingest), Apache Iceberg (storage), Dremio (query), MinIO (object storage)",
  },
  {
    id: "dim-branch",
    label: "Dim Branch",
    value: "15 cols",
    type: "coverage",
    context: "2-level hierarchy (area_4 → area_6) for regional analysis, SCD Type 2 with row_hash change detection",
  },
  {
    id: "dim-account",
    label: "Dim Account",
    value: "14 cols",
    type: "coverage",
    context: "SCD Type 2 with from_date, to_date, is_current, row_hash for change detection",
  },
  {
    id: "fact-account",
    label: "Fact Account",
    value: "6 cols",
    type: "coverage",
    context: "account_sk, customer_sk, branch_sk, current_balance, account_status, ngay_dulieu",
  },
  {
    id: "internship-duration",
    label: "Duration",
    value: "2 months",
    type: "scale",
    context: "Full-time internship at Katalyst, Oct 25 – Dec 23, 2025, under mentor Vương Xương Linh",
  },
];

export const katalystProblem: string =
  "Enterprise data platform (Hanas Data Platform) at Katalyst requires building production-quality dimensional models and ingestion pipelines for a banking client. Core Banking data (customers, accounts, branches) must be ingested from multiple sources (database, Excel, Oracle), transformed into a Star Schema with SCD Type 2 historical tracking, and made queryable via Dremio on Apache Iceberg Tables in a Lakehouse architecture.";

export const katalystConstraints: string[] = [
  "Lakehouse architecture required — Apache Iceberg for table format, Dremio as query engine, MinIO as S3-compatible object storage, Apache NiFi for data ingestion",
  "SCD Type 2 for most Customer attributes — EFFECTIVE_FROM, EFFECTIVE_TO, IS_CURRENT columns with row_hash for change detection; SCD Type 1 only for CUS_BIRTH_INCORP_DATE",
  "Multi-source integration — Core Banking database (customer), Excel files (account, branch), Oracle (relational + XML) — all must be ingested into unified Iceberg Tables",
  "Star Schema design — Fact Account (6 columns) with 3 Dimensions (Customer 24 cols, Branch 15 cols, Account 14 cols), all with surrogate keys",
  "Banking-grade governance — data lineage, audit columns (RECORD_SOURCE, SRC_SCN, LOAD_TIMESTAMP), and metadata management via Dremio",
  "Enterprise data modeling — customer dimension must handle both individual (gender, birth date) and corporate (incorporation date, employee count) customers in unified schema",
];

export const katalystADRs: ADR[] = [
  {
    id: "KAT-ADR-001",
    title: "Apache Iceberg as table format over raw Parquet",
    context:
      "Hanas Data Platform needs a table format that supports versioning, schema evolution, and time travel for banking-grade data management.",
    decision:
      "Use Apache Iceberg for all tables in the Lakehouse, managed via Dremio.",
    rationale:
      "Iceberg provides snapshot isolation, schema evolution without rewriting data, time travel for audit, and copy-on-write/merge-on-read semantics. Integrates natively with Dremio as query engine.",
    tradeoffs: [
      "Requires Iceberg-compatible compute (Dremio); not directly queryable by all tools",
    ],
  },
  {
    id: "KAT-ADR-002",
    title: "SCD Type 2 with EFFECTIVE_FROM/TO and row_hash",
    context:
      "Customer and Branch dimensions need full historical tracking for banking audit requirements.",
    decision:
      "Implement SCD Type 2 with EFFECTIVE_FROM, EFFECTIVE_TO (9999-12-31 for current), IS_CURRENT flag, and row_hash for change detection.",
    rationale:
      "Standard enterprise pattern for historical dimension tracking; row_hash enables efficient change detection without comparing all columns; IS_CURRENT flag simplifies current-state queries.",
    tradeoffs: [
      "Increases storage requirements; queries need WHERE is_current = true for current state",
    ],
  },
  {
    id: "KAT-ADR-003",
    title: "Dremio as semantic layer and query engine",
    context:
      "Need a centralized query layer that connects Iceberg Tables, manages metadata, and serves both ETL and analytical workloads.",
    decision:
      "Use Dremio as the primary query engine and semantic layer for all Lakehouse data.",
    rationale:
      "Dremio provides SQL interface over Iceberg, manages spaces/datasets/views, supports CTE and Information Schema, and optimizes queries on large datasets. Decouples compute from storage.",
    tradeoffs: [
      "Additional infrastructure component; team must learn Dremio-specific features",
    ],
  },
  {
    id: "KAT-ADR-004",
    title: "Apache NiFi for multi-source ingestion",
    context:
      "Data arrives from database (Core Banking), Excel files, and Oracle (relational + XML) — need a unified ingestion tool.",
    decision:
      "Use Apache NiFi for all data ingestion pipelines, with processor chains for each source type.",
    rationale:
      "NiFi provides visual dataflow design, supports both batch and near real-time, handles multiple formats (SQL, Excel, XML), and integrates with S3/MinIO via PutS3Object. Provenance tracking for audit.",
    tradeoffs: [
      "NiFi has learning curve for processor configuration; requires flowFile/repository management",
    ],
  },
  {
    id: "KAT-ADR-005",
    title: "Unified Customer dimension for individual + corporate",
    context:
      "Core Banking has separate staging tables for individual (stg_customer_raw_i) and corporate (stg_customer_raw_c) customers, but analytics needs a single dimension.",
    decision:
      "Build unified Dim Customer with conditional logic: individual → CUS_BIRTH, corporate → INCORP_DATE mapped to CUS_BIRTH_INCORP_DATE; TOTAL_EMP only for corporate.",
    rationale:
      "Single dimension simplifies analytical queries; conditional mapping preserves business meaning; TOTAL_EMP as nullable column handles both customer types.",
    tradeoffs: [
        "Some columns only meaningful for one customer type (e.g., GENDER for individual, TOTAL_EMP for corporate)",
    ],
  },
  {
    id: "KAT-ADR-006",
    title: "Star Schema with DBML documentation",
    context:
      "Need a clear data model documentation format that communicates relationships between Fact and Dimension tables.",
    decision:
      "Design Star Schema (1 Fact + 3 Dimensions) and document with DBML chart format.",
    rationale:
      "Star Schema is the standard for analytical workloads; DBML provides visual ERD documentation; surrogate keys (account_sk, customer_sk, branch_sk) decouple from source system keys.",
    tradeoffs: [
      "Branch hierarchy (2 levels) adds complexity to the dimension",
    ],
  },
];

export const katalystLimitations: string[] = [
  "2-month internship limits depth — unable to tackle complex optimization, real-time streaming, or ML/AI integration",
  "Mentor-guided initial work — some tasks required significant guidance to understand enterprise architecture and best practices",
  "No production pipeline monitoring — system monitoring, resource optimization, and incident response only at introductory level",
  "Static dataset — no ongoing data ingestion or real-time pipeline operation",
  "No CI/CD for data pipelines — manual execution via Dremio UI and NiFi",
];

export const katalystImprovements: string[] = [
  "Optimize Iceberg table layout with partitioning and sorting strategies for common query patterns",
  "Implement real-time ingestion pipeline for streaming transaction data via NiFi",
  "Add data quality validation at each pipeline stage (schema checks, null detection, referential integrity)",
  "Deploy NiFi flows with version control and automated deployment",
  "Extend Star Schema with additional dimensions (Product, Time) and facts (Transactions)",
  "Implement Dremio Reflections for query performance optimization on analytical workloads",
  "Add monitoring and alerting for pipeline health and data freshness",
];
