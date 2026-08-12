import type { ProjectMetric, ADR } from "@/data/types";

export const movieImpact: ProjectMetric[] = [
  {
    id: "modeling-pattern",
    label: "Modeling",
    value: "Star Schema",
    type: "quality",
    context: "Dimensional model for OLAP analytics",
  },
  {
    id: "pipeline-type",
    label: "Pipeline",
    value: "ETL",
    type: "scale",
    context: "Extract-Transform-Load from source to warehouse",
  },
];

export const movieADRs: ADR[] = [
  {
    id: "MOV-ADR-001",
    title: "Why Star Schema over Snowflake?",
    context:
      "Need a dimensional model optimized for analytical query performance and BI tool compatibility.",
    decision: "Star Schema",
    alternatives: ["Star Schema", "Snowflake Schema", "3NF"],
    rationale:
      "Star Schema provides simpler joins, better BI tool compatibility, and predictable query patterns. Analysts can navigate the model intuitively.",
    tradeoffs: [
      "More data duplication than snowflake schema, but query performance and simplicity justify the tradeoff.",
    ],
  },
];

export const movieProblem =
  "Design a data warehouse for movie data using SQL and Python, building an ETL pipeline and dimensional model to support OLAP analytics.";

export const movieConstraints: string[] = [
  "SQL Server as relational source and warehouse platform",
  "Star schema dimensional modeling for OLAP",
  "ETL pipeline from source to warehouse",
  "Python for transformation logic",
];

export const movieLimitations: string[] = [
  "Academic project — not production-scale data or traffic",
  "SQL Server local instance — no high availability",
  "Single-user access pattern — no concurrency testing",
  "Static dataset — no ongoing data ingestion",
];

export const movieImprovements: string[] = [
  "Add slowly changing dimensions (SCD Type 2) for temporal analysis",
  "Implement data quality checks at ETL boundaries",
  "Add aggregate tables for common query patterns",
  "Create materialized views for BI dashboard performance",
  "Add scheduling for automated ETL runs",
];
