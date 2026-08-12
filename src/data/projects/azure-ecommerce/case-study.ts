import type { ProjectMetric, ADR } from "@/data/types";

export const azureImpact: ProjectMetric[] = [
  {
    id: "architecture",
    label: "Architecture",
    value: "Cloud",
    type: "scale",
    context: "End-to-end Azure data platform",
  },
  {
    id: "table-format",
    label: "Table format",
    value: "Delta Lake",
    type: "quality",
    context: "ACID transactions on cloud data lake",
  },
  {
    id: "pipeline-type",
    label: "Pipeline",
    value: "End-to-end ETL",
    type: "scale",
    context: "ADF → ADLS → Databricks → Synapse → Power BI",
  },
];

export const azureADRs: ADR[] = [
  {
    id: "AZ-ADR-001",
    title: "Why Delta Lake over plain Parquet?",
    context:
      "Cloud data lake needs ACID transactions, schema enforcement, and time travel for reliable analytics.",
    decision: "Delta Lake on ADLS Gen2",
    alternatives: ["Plain Parquet", "Apache Iceberg", "Delta Lake"],
    rationale:
      "Delta Lake integrates natively with Databricks and provides ACID transactions, schema enforcement, OPTIMIZE/Z-ORDER for query performance, and time travel for debugging.",
    tradeoffs: [
      "Ties storage format to Databricks ecosystem more than Iceberg would, but Databricks integration is the primary platform choice.",
    ],
  },
  {
    id: "AZ-ADR-002",
    title: "Why ADF for orchestration?",
    context:
      "Need cloud-native orchestration that integrates with Azure ecosystem services.",
    decision: "Azure Data Factory",
    alternatives: ["Apache Airflow", "Azure Data Factory", "Databricks Workflows"],
    rationale:
      "ADF provides visual pipeline design, native connectors to ADLS/Synapse, and managed infrastructure. No cluster management required.",
    tradeoffs: [
      "Less flexible than Airflow for complex DAG logic, but sufficient for ETL orchestration in Azure ecosystem.",
    ],
  },
  {
    id: "AZ-ADR-003",
    title: "Why Synapse for serving layer?",
    context:
      "Need dedicated analytics warehouse for Power BI and ad-hoc SQL queries separate from Databricks processing.",
    decision: "Synapse Analytics (serverless)",
    alternatives: ["Databricks SQL", "Synapse dedicated pool", "Synapse serverless"],
    rationale:
      "Synapse serverless provides SQL endpoint over Delta Lake without additional compute. Power BI connects natively. Cost-effective for query-only workloads.",
    tradeoffs: [
      "Serverless has query-level pricing — heavy ad-hoc usage can spike costs, but predictable for dashboard workloads.",
    ],
  },
];

export const azureProblem =
  "Build a cloud-native ETL pipeline on Azure that ingests e-commerce data, transforms it using Delta Lake on Databricks, and serves analytics through Synapse and Power BI.";

export const azureConstraints: string[] = [
  "Azure ecosystem: Data Factory, ADLS Gen2, Databricks, Synapse",
  "Delta Lake as table format for ACID guarantees",
  "Power BI as business intelligence layer",
  "Serverless compute where possible to minimize cost",
];

export const azureLimitations: string[] = [
  "Uses Azure free tier / student credits — not production-scale",
  "Synapse serverless has per-query billing model",
  "Single-region deployment — no geo-redundancy",
  "ADF pipelines are scheduled, not event-driven",
  "Delta Lake OPTIMIZE not automated in portfolio demo",
];

export const azureImprovements: string[] = [
  "Add Delta Lake OPTIMIZE and Z-ORDER for query performance",
  "Implement event-driven triggers (Blob Storage events → ADF)",
  "Add data quality rules with Great Expectations or dbt tests",
  "Set up CI/CD for ADF pipeline deployment",
  "Add monitoring with Azure Monitor and Log Analytics",
  "Implement multi-region failover for disaster recovery",
];
