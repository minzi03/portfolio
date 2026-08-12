import type { Skill, SkillLevel, SkillCategory } from "@/data/types";

export type { Skill, SkillLevel, SkillCategory };

/* ─── Canonical skills with evidence graph ─── */

export const skills: Skill[] = [
  // Programming & Querying
  {
    id: "python",
    name: "Python",
    category: "programming",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack", "movie-data-warehouse"],
    experienceIds: ["katalyst-data-engineer-intern", "quanskill-data-engineer-intern"],
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Primary language for ETL pipelines, Spark jobs, and orchestration scripts.",
  },
  {
    id: "sql",
    name: "SQL",
    category: "programming",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack", "movie-data-warehouse"],
    experienceIds: ["katalyst-data-engineer-intern", "quanskill-data-engineer-intern"],
    credentialIds: ["ibm-data-engineering", "hackerrank-sql-intermediate", "hackerrank-sql-advanced"],
    evidenceNote: "Complex queries, window functions, CTEs, query optimization across all projects.",
  },
  {
    id: "apache-spark",
    name: "Apache Spark",
    category: "data-processing",
    level: "professional",
    projectIds: ["banking-data-platform", "azure-ecommerce"],
    experienceIds: ["katalyst-data-engineer-intern"],
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Medallion ETL, Structured Streaming, multi-million-row transformations.",
  },
  {
    id: "apache-kafka",
    name: "Apache Kafka",
    category: "data-processing",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack"],
    experienceIds: ["katalyst-data-engineer-intern"],
    evidenceNote: "Event streaming for CDC pipelines, durable message transport.",
  },
  {
    id: "apache-airflow",
    name: "Apache Airflow",
    category: "data-platforms",
    level: "professional",
    projectIds: ["banking-data-platform"],
    experienceIds: ["quanskill-data-engineer-intern"],
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "DAG orchestration for batch pipelines, config-driven DAG templates.",
  },
  {
    id: "dbt",
    name: "dbt",
    category: "data-platforms",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack"],
    experienceIds: ["katalyst-data-engineer-intern"],
    evidenceNote: "SQL-based transformations on Gold layer, SCD Type 2 dimensions.",
  },
  {
    id: "apache-iceberg",
    name: "Apache Iceberg",
    category: "data-platforms",
    level: "professional",
    projectIds: ["banking-data-platform"],
    experienceIds: ["katalyst-data-engineer-intern"],
    evidenceNote: "Open table format with ACID transactions, time travel, schema evolution.",
  },
  {
    id: "azure-data-factory",
    name: "Azure Data Factory",
    category: "cloud-storage",
    level: "project",
    projectIds: ["azure-ecommerce"],
    credentialIds: ["azure-dp203"],
    evidenceNote: "Cloud ETL orchestration for Azure data platform.",
  },
  {
    id: "azure-databricks-platform",
    name: "Azure Databricks",
    category: "cloud-storage",
    level: "project",
    projectIds: ["azure-ecommerce"],
    credentialIds: ["azure-dp203", "azure-databricks"],
    evidenceNote: "Spark-based processing on Azure with Delta Lake integration.",
  },
  {
    id: "snowflake",
    name: "Snowflake",
    category: "cloud-storage",
    level: "project",
    projectIds: ["modern-data-stack"],
    evidenceNote: "Cloud data warehouse for ELT pipelines with SCD Type 2.",
  },
  {
    id: "docker",
    name: "Docker",
    category: "tools-infrastructure",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack"],
    experienceIds: ["katalyst-data-engineer-intern", "quanskill-data-engineer-intern"],
    evidenceNote: "Containerized development environments for reproducible pipelines.",
  },
  {
    id: "trino",
    name: "Trino",
    category: "data-platforms",
    level: "project",
    projectIds: ["banking-data-platform"],
    evidenceNote: "Interactive SQL query layer on Iceberg tables.",
  },
  {
    id: "openmetadata",
    name: "OpenMetadata",
    category: "data-platforms",
    level: "project",
    projectIds: ["banking-data-platform"],
    evidenceNote: "Data catalog with column-level lineage for 53 tables.",
  },
  {
    id: "apache-superset",
    name: "Apache Superset",
    category: "bi-governance",
    level: "project",
    projectIds: ["banking-data-platform"],
    evidenceNote: "BI visualization layer for banking analytics.",
  },
  {
    id: "delta-lake",
    name: "Delta Lake",
    category: "data-platforms",
    level: "project",
    projectIds: ["azure-ecommerce"],
    credentialIds: ["azure-dp203"],
    evidenceNote: "ACID table format for cloud data lake on Azure.",
  },
  {
    id: "power-bi",
    name: "Power BI",
    category: "bi-governance",
    level: "project",
    projectIds: ["azure-ecommerce"],
    credentialIds: ["azure-dp203"],
    evidenceNote: "Business intelligence dashboards for e-commerce analytics.",
  },
  {
    id: "azure-data-lake",
    name: "ADLS Gen2",
    category: "cloud-storage",
    level: "project",
    projectIds: ["azure-ecommerce"],
    credentialIds: ["azure-dp203"],
    evidenceNote: "Cloud storage layer for Azure data lake architecture.",
  },
  {
    id: "synapse-analytics",
    name: "Synapse Analytics",
    category: "cloud-storage",
    level: "project",
    projectIds: ["azure-ecommerce"],
    credentialIds: ["azure-dp203"],
    evidenceNote: "Azure analytics service for data warehousing.",
  },
  {
    id: "pyspark",
    name: "PySpark",
    category: "data-processing",
    level: "professional",
    projectIds: ["banking-data-platform", "azure-ecommerce"],
    experienceIds: ["katalyst-data-engineer-intern"],
    evidenceNote: "Python API for Spark — used for all distributed transformations.",
  },
  {
    id: "postgreSQL",
    name: "PostgreSQL",
    category: "data-platforms",
    level: "professional",
    projectIds: ["modern-data-stack"],
    experienceIds: ["quanskill-data-engineer-intern"],
    evidenceNote: "Source database with schema-per-tenant multi-tenancy.",
  },
  {
    id: "mysql",
    name: "MySQL",
    category: "data-platforms",
    level: "exploring",
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Relational database for structured data storage.",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    category: "data-platforms",
    level: "exploring",
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "NoSQL document database — explored in IBM coursework.",
  },
  {
    id: "git",
    name: "Git",
    category: "tools-infrastructure",
    level: "project",
    projectIds: ["banking-data-platform", "modern-data-stack", "azure-ecommerce", "movie-data-warehouse"],
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Version control for all projects.",
  },
  {
    id: "github",
    name: "GitHub",
    category: "tools-infrastructure",
    level: "project",
    projectIds: ["banking-data-platform", "modern-data-stack", "azure-ecommerce", "movie-data-warehouse"],
    evidenceNote: "Collaboration and code hosting for all projects.",
  },
  {
    id: "linux",
    name: "Linux",
    category: "tools-infrastructure",
    level: "professional",
    experienceIds: ["katalyst-data-engineer-intern"],
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Server environment for data infrastructure.",
  },
  {
    id: "cmake",
    name: "CMake",
    category: "tools-infrastructure",
    level: "exploring",
    evidenceNote: "Build system — explored in systems programming context.",
  },
  {
    id: "c-language",
    name: "C",
    category: "programming",
    level: "exploring",
    evidenceNote: "Systems programming — foundational knowledge.",
  },
  {
    id: "data-modeling",
    name: "Data Modeling",
    category: "data-platforms",
    level: "professional",
    projectIds: ["banking-data-platform", "movie-data-warehouse"],
    experienceIds: ["quanskill-data-engineer-intern"],
    evidenceNote: "Star schema, Medallion architecture, dimension/fact modeling.",
  },
  {
    id: "etl",
    name: "ETL",
    category: "data-processing",
    level: "professional",
    projectIds: ["banking-data-platform", "azure-ecommerce", "movie-data-warehouse"],
    experienceIds: ["katalyst-data-engineer-intern", "quanskill-data-engineer-intern"],
    evidenceNote: "Extract-Transform-Load pipeline design across all projects.",
  },
  {
    id: "data-quality",
    name: "Data Quality",
    category: "bi-governance",
    level: "professional",
    projectIds: ["banking-data-platform"],
    experienceIds: ["katalyst-data-engineer-intern", "quanskill-data-engineer-intern"],
    evidenceNote: "Validation frameworks, schema checks, completeness verification.",
  },
  {
    id: "data-governance",
    name: "Data Governance",
    category: "bi-governance",
    level: "project",
    projectIds: ["banking-data-platform"],
    evidenceNote: "OpenMetadata cataloging, PII classification, retention policies.",
  },
  {
    id: "metadata-management",
    name: "Metadata Management",
    category: "bi-governance",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack"],
    experienceIds: ["quanskill-data-engineer-intern"],
    evidenceNote: "OpenMetadata for cataloging, metadata-driven pipeline generation.",
  },
  {
    id: "data-lineage",
    name: "Data Lineage",
    category: "bi-governance",
    level: "project",
    projectIds: ["banking-data-platform"],
    evidenceNote: "Column-level lineage tracking with 22 edges across 53 tables.",
  },
  {
    id: "data-warehousing",
    name: "Data Warehousing",
    category: "data-platforms",
    level: "professional",
    projectIds: ["banking-data-platform", "movie-data-warehouse"],
    experienceIds: ["quanskill-data-engineer-intern"],
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Medallion Lakehouse, star schema, dimensional modeling.",
  },
  {
    id: "olap",
    name: "OLAP",
    category: "data-platforms",
    level: "project",
    projectIds: ["banking-data-platform", "movie-data-warehouse"],
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "OLAP cube concepts, analytical query optimization.",
  },
  {
    id: "data-pipelines",
    name: "Data Pipelines",
    category: "data-processing",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack", "azure-ecommerce"],
    experienceIds: ["katalyst-data-engineer-intern", "quanskill-data-engineer-intern"],
    evidenceNote: "End-to-end pipeline design: batch, CDC, and streaming.",
  },
  {
    id: "data-integration",
    name: "Data Integration",
    category: "data-processing",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack"],
    experienceIds: ["quanskill-data-engineer-intern"],
    evidenceNote: "Multi-source ingestion, schema mapping, incremental sync.",
  },
  {
    id: "change-data-capture",
    name: "Change Data Capture",
    category: "data-processing",
    level: "professional",
    projectIds: ["banking-data-platform", "modern-data-stack"],
    experienceIds: ["katalyst-data-engineer-intern"],
    evidenceNote: "Debezium-based WAL capture for near-real-time freshness.",
  },
  {
    id: "lakehouse",
    name: "Lakehouse",
    category: "data-platforms",
    level: "professional",
    projectIds: ["banking-data-platform"],
    experienceIds: ["katalyst-data-engineer-intern"],
    evidenceNote: "Medallion architecture with Iceberg on object storage.",
  },
  {
    id: "pandas",
    name: "pandas",
    category: "data-processing",
    level: "project",
    projectIds: ["movie-data-warehouse"],
    evidenceNote: "Data manipulation for smaller-scale transformations.",
  },
  {
    id: "jupyter",
    name: "Jupyter",
    category: "tools-infrastructure",
    level: "exploring",
    evidenceNote: "Interactive data exploration and prototyping.",
  },
  {
    id: "csv",
    name: "CSV",
    category: "data-platforms",
    level: "project",
    projectIds: ["movie-data-warehouse"],
    evidenceNote: "Flat file format for data exchange.",
  },
  {
    id: "json",
    name: "JSON",
    category: "data-platforms",
    level: "project",
    projectIds: ["banking-data-platform", "modern-data-stack"],
    evidenceNote: "Semi-structured data format for APIs and configs.",
  },
  {
    id: "hive",
    name: "Hive",
    category: "data-platforms",
    level: "exploring",
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Data warehouse infrastructure — explored in IBM coursework.",
  },
  {
    id: "nifi",
    name: "NiFi",
    category: "data-processing",
    level: "exploring",
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Data flow automation — explored in IBM coursework.",
  },
  {
    id: "cockroachdb",
    name: "CockroachDB",
    category: "data-platforms",
    level: "exploring",
    credentialIds: ["ibm-data-engineering"],
    evidenceNote: "Distributed SQL database — explored in IBM coursework.",
  },
  {
    id: "erp",
    name: "ERP",
    category: "bi-governance",
    level: "exploring",
    evidenceNote: "Enterprise Resource Planning concepts — academic coursework.",
  },
];

/* ─── Backward-compatible exports ─── */
/* Phase 1: keep existing consumers working. Remove after component migration. */

export type { SkillLevel as SkillLevelCompat };

export const levelLabels: Record<SkillLevel, string> = {
  professional: "Professional",
  project: "Project",
  exploring: "Exploring",
};

export const levelColors: Record<SkillLevel, string> = {
  professional:
    "border-accent/30 bg-accent/10 text-accent",
  project:
    "border-border bg-bg-surface text-text-secondary",
  exploring:
    "border-border bg-bg text-text-muted",
};

export interface SkillCategoryGroup {
  name: string;
  skills: { name: string; level: SkillLevel }[];
}

const CATEGORY_LABELS: Record<SkillCategory, string> = {
  programming: "Programming & Querying",
  "data-processing": "Big Data & Processing",
  "data-platforms": "Data Platforms",
  "cloud-storage": "Cloud & Storage",
  "bi-governance": "BI & Governance",
  "tools-infrastructure": "Tools & Infrastructure",
};

/** Grouped skills by category — backward-compatible shape for Stack/Resume pages */
export const skillCategories: SkillCategoryGroup[] = (
  Object.keys(CATEGORY_LABELS) as SkillCategory[]
).map((cat) => ({
  name: CATEGORY_LABELS[cat],
  skills: skills
    .filter((s) => s.category === cat)
    .map((s) => ({ name: s.name, level: s.level })),
}));

/* ─── Evidence-derived level ─── */

/**
 * Derive skill level from evidence graph.
 *
 * Rules:
 *   experienceIds → "professional" (used in professional context)
 *   projectIds only → "project" (used in personal/academic projects)
 *   neither → "exploring" (learned but not applied)
 *
 * Credentials do NOT automatically elevate skill level.
 */
export function deriveSkillLevel(skill: Skill): SkillLevel {
  if (skill.experienceIds && skill.experienceIds.length > 0) {
    return "professional";
  }
  if (skill.projectIds && skill.projectIds.length > 0) {
    return "project";
  }
  return "exploring";
}

/**
 * Check if a skill's declared level matches its evidence-derived level.
 * Returns null if consistent, or a warning message if inconsistent.
 */
export function checkSkillLevelConsistency(skill: Skill): string | null {
  const derived = deriveSkillLevel(skill);
  if (derived === skill.level) return null;

  if (skill.level === "professional" && !skill.experienceIds?.length) {
    return `${skill.name}: level "professional" but no experienceIds — needs professional evidence or downgrade to "${derived}"`;
  }
  if (skill.level === "project" && !skill.projectIds?.length && !skill.experienceIds?.length) {
    return `${skill.name}: level "project" but no projectIds or experienceIds — needs project evidence or downgrade to "${derived}"`;
  }
  return `${skill.name}: declared "${skill.level}" but evidence suggests "${derived}"`;
}
