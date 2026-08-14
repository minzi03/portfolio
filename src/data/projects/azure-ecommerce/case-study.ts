import type { ProjectMetric, ADR } from "@/data/types";

export const azureImpact: ProjectMetric[] = [
  {
    id: "source-rows",
    label: "Source Rows",
    value: "1.5M+",
    type: "scale",
    context: "9 source tables across MySQL, MongoDB, HTTP API, and local CSV files (Olist Kaggle dataset)",
  },
  {
    id: "source-tables",
    label: "Source Tables",
    value: "9",
    type: "coverage",
    context: "MySQL (6), MongoDB (1), HTTP/GitHub (1), Local CSV (1) — heterogeneous multi-source ingestion",
  },
  {
    id: "gold-tables",
    label: "Gold Tables",
    value: "13",
    type: "coverage",
    context: "8 dimensions + 5 facts/bridges in Star Schema with surrogate keys and Delta Lake format",
  },
  {
    id: "synapse-views",
    label: "Synapse Views",
    value: "19",
    type: "coverage",
    context: "8 dimension views + 5 fact/bridge views + 6 BI/business views via OPENROWSET over Delta",
  },
  {
    id: "revenue",
    label: "Total Revenue",
    value: "$13.55M",
    type: "business",
    context: "Brazilian Olist e-commerce marketplace, 2017-2018 data period",
  },
  {
    id: "orders",
    label: "Total Orders",
    value: "97K",
    type: "scale",
    context: "99,441 orders with 112,651 item-level entries across 30 states",
  },
  {
    id: "aov",
    label: "Avg Order Value",
    value: "$140",
    type: "business",
    context: "Average order value across 97K orders with 74% credit card payment share",
  },
  {
    id: "customers",
    label: "Customers",
    value: "96K",
    type: "scale",
    context: "96K unique customers, 3% repeat rate, $138 revenue per customer",
  },
  {
    id: "adf-activities",
    label: "ADF Activities",
    value: "8",
    type: "coverage",
    context: "Lookup → ForEach → 5 MySQL copies → 1 HTTP copy → WebActivity callback",
  },
  {
    id: "databricks-notebooks",
    label: "Databricks Notebooks",
    value: "6",
    type: "coverage",
    context: "3 original + 3 refined notebooks for Bronze→Silver and Silver→Gold (dimensions + facts)",
  },
];

export const azureProblem: string =
  "Build an end-to-end, cloud-native data platform on Azure that ingests e-commerce data from multiple heterogeneous sources (MySQL, MongoDB, HTTP APIs, CSV files), transforms it through a Medallion Architecture (Bronze → Silver → Gold), models it into a Star Schema suitable for analytics, and serves it via Azure Synapse Serverless SQL to Power BI dashboards delivering business insights on sales, customer behavior, and logistics performance for the Brazilian Olist e-commerce marketplace (data spanning Jan 2017 – Aug 2018, ~100K orders, ~3M item-level entries).";

export const azureConstraints: string[] = [
  "Multi-source heterogeneous ingestion — MySQL (6 tables), MongoDB (1 collection), HTTP/GitHub API (1 file), local CSV (1 file) — all through a single ADF pipeline with dynamic Lookup→ForEach configuration",
  "Medallion Architecture required — Bronze (raw CSV/JSON), Silver (cleansed Delta), Gold (Star Schema Delta) — with progressive quality improvement at each layer",
  "Delta Lake for ACID guarantees — schema enforcement, time travel, OPTIMIZE/ZORDER/VACUUM for query performance tuning on ADLS Gen2",
  "Star Schema with surrogate keys — 8 dimensions + 5 facts with natural key preservation, many-to-many bridge table for order-product relationships",
  "Hybrid connectivity — Self-hosted Integration Runtime bridges on-premises MySQL (localhost:3306) with cloud-native ADLS",
  "Power BI serving layer — Synapse Serverless SQL with OPENROWSET over Delta/Parquet, 6 pre-built BI views for business stakeholders",
  "Automated alerting — ADF WebActivity → Logic App → Outlook email notification on pipeline completion/failure",
];

export const azureADRs: ADR[] = [
  {
    id: "AZ-ADR-001",
    title: "Medallion Architecture (Bronze → Silver → Gold)",
    context:
      "E-commerce data arrives from 4 heterogeneous sources with different formats, quality levels, and schemas. Need progressive quality improvement with auditability at each layer.",
    decision:
      "Adopt Databricks Medallion Architecture with three distinct storage layers in ADLS: Bronze (raw CSV/JSON), Silver (cleansed Delta), Gold (Star Schema Delta).",
    rationale:
      "Industry-standard Lakehouse pattern; separates raw ingestion from cleansing from business modeling; enables data governance and progressive quality improvement. Each layer is independently queryable for debugging.",
    tradeoffs: [
      "Three distinct storage layers require three transformation stages in Databricks",
      "Delta log files consume additional storage",
    ],
  },
  {
    id: "AZ-ADR-002",
    title: "Delta Lake over raw Parquet",
    context:
      "Silver and Gold layers need reliable storage with ACID guarantees for concurrent reads and writes.",
    decision:
      "Use Delta Lake format for Silver and Gold layers on ADLS Gen2.",
    rationale:
      "ACID transactions prevent partial writes; schema enforcement prevents data corruption; time travel enables debugging and reproducibility; OPTIMIZE/ZORDER/VACUUM provide query performance tuning.",
    tradeoffs: [
      "Delta log files consume additional storage",
      "Requires Delta-aware compute (Databricks)",
      "Synapse needs DELTA format support in OPENROWSET",
    ],
  },
  {
    id: "AZ-ADR-003",
    title: "Star Schema with surrogate keys for Gold layer",
    context:
      "Gold layer must serve Power BI dashboards and ad-hoc SQL queries with efficient joins and clear business semantics.",
    decision:
      "Model Gold layer as Star Schema with surrogate keys (monotonically_increasing_id) and natural key preservation.",
    rationale:
      "Industry standard for analytical queries; optimal for Power BI and Synapse; surrogate keys decouple from source system keys; bridge table resolves many-to-many order-product relationships.",
    tradeoffs: [
      "monotonically_increasing_id() values change on each execution (not deterministic)",
      "Bridge table adds complexity for many-to-many resolution",
    ],
  },
  {
    id: "AZ-ADR-004",
    title: "ADF for ingestion, Databricks for transformation",
    context:
      "Need to handle 4 different source types (MySQL, MongoDB, HTTP, CSV) with complex PySpark transformations.",
    decision:
      "Azure Data Factory handles extraction and loading (EL); Azure Databricks handles transformation (T).",
    rationale:
      "ADF is purpose-built for connecting to diverse sources with minimal code; Lookup→ForEach pattern enables dynamic configuration. Databricks provides powerful distributed Spark compute for complex Delta Lake operations.",
    tradeoffs: [
      "Two separate services to manage",
      "ADF pipeline is JSON-configured (declarative); Databricks notebooks are Python (imperative)",
    ],
  },
  {
    id: "AZ-ADR-005",
    title: "Synapse Serverless SQL for serving layer",
    context:
      "Power BI needs a SQL endpoint over Delta Lake without additional compute or data movement.",
    decision:
      "Use Synapse Serverless SQL pool with OPENROWSET over Delta/Parquet in ADLS.",
    rationale:
      "No data movement required; pay-per-query model; native integration with Power BI DirectQuery; supports both Delta and Parquet formats; Managed Identity authentication for passwordless access.",
    tradeoffs: [
      "Query performance depends on data layout and file sizing",
      "Per-query billing can spike costs with heavy ad-hoc usage",
    ],
  },
  {
    id: "AZ-ADR-006",
    title: "Parameterized ADF pipeline with ForEach",
    context:
      "Multiple source files and tables need to be ingested through the same pipeline pattern without hardcoding.",
    decision:
      "Use Lookup → ForEach pattern with JSON-driven configuration (ForEachInput.json, ForEachInput_MySQL.json).",
    rationale:
      "JSON-driven configuration allows adding/removing sources without modifying pipeline logic; supports both GitHub files and MySQL tables through the same pattern.",
    tradeoffs: [
      "Sequential ForEach execution (isSequential: true) for GitHub files",
      "MySQL tables chained with explicit dependencies (Orders → Items → Payments → Customers → Sellers)",
    ],
  },
  {
    id: "AZ-ADR-007",
    title: "Self-hosted Integration Runtime for on-prem sources",
    context:
      "MySQL database runs on localhost and geolocation CSV is on local filesystem. Cloud-only IR cannot access these.",
    decision:
      "Deploy Self-hosted Integration Runtime on a Windows machine for MySQL and local file system access.",
    rationale:
      "Bridges on-premises network perimeter with cloud ADLS; enables ADF to copy from localhost:3306 and local filesystem.",
    tradeoffs: [
      "Requires installation and maintenance of IR agent on a Windows machine",
      "Adds infrastructure dependency for on-prem connectivity",
    ],
  },
  {
    id: "AZ-ADR-008",
    title: "Dual notebook versions (original + refined)",
    context:
      "Initial implementation was functional but lacked production-quality patterns like proper header handling, derived business fields, and data quality flags.",
    decision:
      "Maintain both original (azure_databricks/) and refined (azure_databricks/new/) notebook versions.",
    rationale:
      "Original notebooks were the first implementation; new version adds improvements like header=true, try_to_timestamp with multiple formats, derived business fields, data quality flags, Portuguese character normalization, and OPTIMIZE/ZORDER/VACUUM helper.",
    tradeoffs: [
      "Code duplication between original and refined versions",
      "The new/ version is the production-quality implementation",
    ],
  },
  {
    id: "AZ-ADR-009",
    title: "Partitioning and Z-Order optimization",
    context:
      "Gold layer fact tables grow large with many partitions. Query performance depends on file layout and data skipping.",
    decision:
      "Apply partitioning (year_month, payment_type, purchase_date) and Z-Order on frequently filtered columns (customer_sk, product_sk, seller_sk) for data skipping.",
    rationale:
      "Partitioning reduces files scanned per query; Z-Order enables multi-dimensional data skipping within partitions; OPTIMIZE compacts small files; VACUUM cleans old versions after 168 hours.",
    tradeoffs: [
      "Over-partitioning can create too many small files",
      "Z-Order requires knowledge of query patterns",
    ],
  },
  {
    id: "AZ-ADR-010",
    title: "Six BI-ready views in Synapse",
    context:
      "Business stakeholders need pre-built analytical views beyond raw dimension and fact tables.",
    decision:
      "Create 6 business/BI views in Synapse: vw_sales_summary, vw_top_product_categories, vw_sales_by_seller, vw_customer_value, vw_delivery_performance, vw_payment_analysis.",
    rationale:
      "Pre-built views accelerate Power BI development; encapsulate complex joins and aggregations; provide consistent business logic across dashboards.",
    tradeoffs: [
      "Views add maintenance overhead when underlying schemas change",
    ],
  },
];

export const azureLimitations: string[] = [
  "No CI/CD pipeline — no automated testing, deployment scripts, or infrastructure-as-code",
  "No data quality framework — no Great Expectations, Deequ, or similar validation between layers",
  "Credentials in code — service principal secrets, MongoDB passwords, and MySQL passwords hardcoded in notebooks and config files (security risk)",
  "Sequential ADF ForEach — GitHub file ingestion is sequential (isSequential: true), not parallel",
  "Overwrite-only writes — all Delta writes use mode('overwrite'), no incremental MERGE/UPSERT patterns",
  "No SCD handling — dimension tables are full refresh, no slowly changing dimension support",
  "monotonically_increasing_id() for surrogate keys — not deterministic across reruns, values change on each execution",
  "No unit tests or integration tests — no test framework for pipeline validation",
  "No logging/observability — no structured logging, no DataDog/Application Insights integration",
  "No data catalog — no Azure Purview/Unity Catalog integration for lineage and discovery",
  "No real-time/streaming — batch-only pipeline; no Spark Structured Streaming or Event Hubs",
];

export const azureImprovements: string[] = [
  "Add data validation between layers (row count checks, schema validation, null percentage thresholds) with Great Expectations or Deequ",
  "Implement incremental loading with Delta Lake MERGE/UPSERT instead of overwrite-only writes",
  "Move credentials to Azure Key Vault with managed identity access for security",
  "Add Databricks Jobs for scheduling instead of manual notebook execution",
  "Implement SCD Type 2 for dimensions (customer, seller, product) with effective dates",
  "Add dbt or similar transformation framework for testability and documentation",
  "Deploy Azure Purview for data cataloging and lineage tracking",
  "Add unit tests with pytest for transformation logic",
  "Use Delta Lake Change Data Feed for incremental downstream consumption",
  "Add data profiling and anomaly detection for proactive quality monitoring",
  "Implement parallel ForEach execution in ADF for faster ingestion",
  "Add monitoring with Azure Monitor and Log Analytics for pipeline observability",
];
