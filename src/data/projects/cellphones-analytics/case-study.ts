import type { ProjectMetric, ADR } from "@/data/types";

export const cellphonesImpact: ProjectMetric[] = [
  {
    id: "pipeline-duration",
    label: "Pipeline Duration",
    value: "0.75s",
    type: "performance",
    context: "Full run: 5 source CSVs → 7 output tables + 5 rejected tables + quality reports",
  },
  {
    id: "output-tables",
    label: "Output Tables",
    value: "7",
    type: "coverage",
    context: "3 dimensions (date, store, product) + 3 facts (sales, inventory, target) + 1 operations mart",
  },
  {
    id: "quality-checks",
    label: "Quality Checks",
    value: "68",
    type: "quality",
    context: "Schema compliance, null detection, uniqueness, FK integrity, inventory balance, grain validation, metric calc",
  },
  {
    id: "test-count",
    label: "Pytest Tests",
    value: "30/30",
    type: "quality",
    context: "25 pipeline tests + 3 data quality framework tests + 2 edge case tests, all passing",
  },
  {
    id: "source-rows",
    label: "Source Rows",
    value: "4,535",
    type: "scale",
    context: "1,815 transactions + 1,350 inventory + 10 products + 15 stores + 45 targets",
  },
  {
    id: "fact-sales",
    label: "Fact Sales",
    value: "1,781",
    type: "scale",
    context: "Cleaned transactions after dedup + rejection (34 records quarantined)",
  },
  {
    id: "net-revenue",
    label: "Net Revenue",
    value: "56.7B",
    type: "business",
    context: "VND net revenue across 1,781 transactions with 5 RETURN records preserved",
  },
  {
    id: "dax-measures",
    label: "DAX Measures",
    value: "35+",
    type: "coverage",
    context: "Revenue, target achievement, inventory status, reconciliation, ranking — Power BI semantic model",
  },
  {
    id: "data-dictionary",
    label: "Data Dictionary",
    value: "125 cols",
    type: "quality",
    context: "125 columns documented with types, nullability, key types, business definitions, examples, quality rules",
  },
  {
    id: "reconciliation",
    label: "Reconciliation",
    value: "4 statuses",
    type: "quality",
    context: "MATCHED, MISMATCH, NO_TRANSACTION_SALES, NO_INVENTORY_SNAPSHOT — dual-source inventory vs sales",
  },
];

export const cellphonesProblem: string =
  "A Vietnamese phone retail chain (CellphoneS) has sales, inventory, and organizational data scattered across multiple systems with different grains. The objective is to build a unified, BI-ready analytics pipeline that ingests 5 CSV source files, cleans and normalizes with full traceability, creates a Star Schema data warehouse (3 dimensions, 3 facts, 1 operations mart), produces Power BI-ready outputs, validates data quality with 68 structured checks, preserves grain integrity across fact tables with different levels of detail, and supports BigQuery deployment with partitioning/clustering.";

export const cellphonesConstraints: string[] = [
  "String-first ingestion required — all CSVs read as dtype='string' to preserve leading zeros in IDs (e.g., 001 stays 001, not 1); type coercion controlled explicitly",
  "Grain integrity across 3 fact tables — transaction grain, periodic snapshot grain, and monthly target grain kept intentionally separate with no fact-to-fact joins to prevent fan-out",
  "Dual-source reconciliation — inventory 'Sold' must be cross-checked against transaction 'Gross_Units_Sold' with 4 reconciliation statuses (MATCHED, MISMATCH, NO_TRANSACTION_SALES, NO_INVENTORY_SNAPSHOT)",
  "Quarantine-first approach — ALL versions of a conflicting business key are quarantined (not just the bad one) because without authoritative source, choosing one version is arbitrary",
  "Missing is not zero philosophy — missing inventory snapshots are NOT treated as zero inventory; missing sales days get zero for additive measures but null for ratios",
  "Windows UTF-8 compatibility — console must handle Vietnamese text on legacy Windows code pages (CP1258) with explicit reconfiguration",
  "Dual-format output — every table written as both CSV (UTF-8-SIG for human inspection) and Parquet (Snappy for production BigQuery/Power BI ingestion)",
];

export const cellphonesADRs: ADR[] = [
  {
    id: "ADR-001",
    title: "String-first ingestion over automatic type inference",
    context:
      "CSVs contain IDs with leading zeros and mixed numeric/string columns. Pandas read_csv with default dtype inference corrupts IDs (e.g., 001 → 1).",
    decision:
      "Read all CSV columns as dtype='string' then parse types explicitly via ColumnSpec contracts.",
    rationale:
      "Prevents ID corruption; maintains full control over type coercion; enables schema validation before any processing.",
    tradeoffs: [
      "More parsing code required, but guarantees data integrity for ID columns",
    ],
  },
  {
    id: "ADR-002",
    title: "Quarantine all conflicting versions instead of picking one",
    context:
      "Multiple records with the same business key but different data (e.g., same transaction_id with different amounts). Without authoritative source or effective date, choosing one version is arbitrary.",
    decision:
      "ALL versions of a conflicting business key are quarantined to rejected files for manual review.",
    rationale:
      "No silent data loss; maintains auditability; forces explicit resolution rather than automated guesswork.",
    tradeoffs: [
      "More rejected records than selective dedup",
      "Requires downstream process to resolve conflicts",
    ],
  },
  {
    id: "ADR-003",
    title: "Return handling with sign preservation",
    context:
      "Negative quantities represent returns. Need to correctly reflect revenue reduction while providing positive magnitudes for reporting.",
    decision:
      "Keep quantity < 0 as RETURN type with negative revenue; return_quantity and return_revenue store positive magnitudes separately.",
    rationale:
      "Net revenue correctly reflects returns reducing revenue; positive magnitudes for reporting clarity; avoids double-counting in DAX measures.",
    tradeoffs: [
      "Requires careful DAX measure design to avoid double-counting",
    ],
  },
  {
    id: "ADR-004",
    title: "Star schema over snowflake for Power BI",
    context:
      "Dimensions are small (10 products, 15 stores) with stable hierarchies. Self-service BI use case requires fast dashboard rendering.",
    decision:
      "Denormalized dimensions — Region/RSM/AM in dim_store, Brand/Category in dim_product.",
    rationale:
      "Reduces joins in Power BI; small dimensions make redundancy negligible; simpler semantic model for business users.",
    tradeoffs: [
      "Slight data redundancy in dimensions",
      "SCD Type 1 only (no effective date tracking)",
    ],
  },
  {
    id: "ADR-005",
    title: "TREATAS for target-to-date filtering instead of physical join",
    context:
      "Target grain is Store-Month; Date grain is daily. Physical join would create fan-out or many-to-many relationship.",
    decision:
      "Connect Target to Date via TREATAS in DAX, not a physical relationship in the semantic model.",
    rationale:
      "Prevents fan-out; correct aggregation at monthly level; Power BI optimizes TREATAS internally.",
    tradeoffs: [
      "More complex DAX for target measures",
    ],
  },
  {
    id: "ADR-006",
    title: "Snapshot-centric mart with inventory as LEFT side",
    context:
      "Operations mart should reflect inventory reality. Missing inventory snapshot does not mean zero inventory.",
    decision:
      "Mart only produces rows where inventory snapshot exists; inventory is the LEFT side of the join.",
    rationale:
      "Missing snapshot ≠ zero inventory; filling with zero would be misleading for operational decisions.",
    tradeoffs: [
      "Fewer rows than a full calendar grid",
      "No inventory KPIs for periods without snapshots",
    ],
  },
  {
    id: "ADR-007",
    title: "Calendared DRR denominator (not just sales days)",
    context:
      "Daily Run Rate should reflect realistic demand. A product selling 7 units in 1 day then nothing for 6 days should have DRR=1, not DRR=7.",
    decision:
      "DRR denominator is calendar days observed (min_periods=1), not just days with sales.",
    rationale:
      "Lower DRR values but realistic demand signal; prevents overstock decisions based on inflated run rates.",
    tradeoffs: [
      "May understate demand for products with sporadic sales patterns",
    ],
  },
  {
    id: "ADR-008",
    title: "In-memory staging over materialized intermediate tables",
    context:
      "Dataset fits entirely in memory (4,535 source rows). No need for persistent staging for this scope.",
    decision:
      "No physicalized staging layer; all transformations happen in Pandas DataFrames in memory.",
    rationale:
      "Simpler architecture; faster execution (0.75s full run); appropriate for test/portfolio scope.",
    tradeoffs: [
      "No replay capability for intermediate steps",
      "Production deployment would benefit from materialized staging",
    ],
  },
  {
    id: "ADR-009",
    title: "Frozen immutable dataclasses for configuration",
    context:
      "Pipeline configuration (thresholds, schema contracts) should not be mutated during execution.",
    decision:
      "PipelineConfig and InventoryStatusThresholds use frozen=True, slots=True dataclasses.",
    rationale:
      "Guarantees immutability during pipeline execution; slots for memory efficiency; explicit validation in __post_init__.",
    tradeoffs: [
      "Must create new instances for any configuration change",
    ],
  },
  {
    id: "ADR-010",
    title: "68 structured quality checks with audit trail",
    context:
      "Data quality must be validated systematically with results persisted for audit and debugging.",
    decision:
      "Implement 68 automated quality checks across schema compliance, null detection, uniqueness, FK integrity, inventory balance, grain validation, and metric calculation — all serialized to data_quality_summary.csv.",
    rationale:
      "Automated, reproducible quality validation; CSV output enables non-technical stakeholders to review results; structured output (PASS/FAIL) enables programmatic gating.",
    tradeoffs: [
      "Quality check execution adds to pipeline runtime (minimal for this dataset size)",
    ],
  },
];

export const cellphonesLimitations: string[] = [
  "Inventory only covers July 2026 (sparse); no inventory KPIs for Aug-Sep transactions",
  "No traffic source data — no footfall, conversion rate, or customer journey tracking",
  "No return reason, promotion code, tax, COGS, or payment method information",
  "No price history for promotion attribution or dynamic pricing analysis",
  "Target only at Store-Month grain — no product-level allocation for granular performance tracking",
  "Reconciliation detects differences but cannot determine authoritative source between inventory and transactions",
  "Pandas appropriate for test scale (4,535 rows); production deployment needs BigQuery/Spark for millions of rows",
  "SCD Type 1 only for dimensions — no effective date tracking for historical dimension changes",
  "No scheduling or orchestration framework (Airflow/Prefect) — single-run CLI pipeline",
  "No containerization — not Dockerized for reproducible deployment across environments",
];

export const cellphonesImprovements: string[] = [
  "Replace Python transforms with dbt models for version-controlled transformations, documentation, and built-in testing",
  "Add Airflow/Prefect DAG for scheduling, dependency management, and monitoring of pipeline runs",
  "Implement watermark-based MERGE for BigQuery incremental loading instead of full refresh",
  "Add SCD Type 2 with surrogate keys and effective dates for dim_store and dim_product",
  "Add dim_promotion dimension when promotion data becomes available for campaign analytics",
  "Add fact_store_traffic at Date-Store-TimeSlot grain for footfall and conversion rate analysis",
  "Add dbt schema tests (unique, not_null, relationships) beyond Python unit tests",
  "Add data freshness checks, volume anomaly detection, and alerting for production monitoring",
  "Containerize with Docker for reproducible execution across environments",
  "Add GitHub Actions CI/CD for automated testing on pull requests",
];
