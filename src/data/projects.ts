import type {
  Project as ProjectBase,
  ProjectCategory,
  ProjectStatus,
  ProjectScope,
  ProjectMetric,
  ArchitectureReference,
  ADR,
} from "@/data/types";
import { bankingImpact, bankingADRs, bankingProblem, bankingConstraints, bankingLimitations, bankingImprovements } from "./projects/banking/case-study";
import { mdsImpact, mdsADRs, mdsProblem, mdsConstraints, mdsLimitations, mdsImprovements } from "./projects/modern-data-stack/case-study";
import { azureImpact, azureADRs, azureProblem, azureConstraints, azureLimitations, azureImprovements } from "./projects/azure-ecommerce/case-study";
import { movieImpact, movieADRs, movieProblem, movieConstraints, movieLimitations, movieImprovements } from "./projects/movie-data-warehouse/case-study";

/** Project type — exported as `Project` for consumers */
export type Project = ProjectBase;

export type {
  ProjectCategory,
  ProjectStatus,
  ProjectScope,
  ProjectMetric,
  ArchitectureReference,
  ADR,
};

export const projects: Project[] = [
  {
    id: "banking-data-platform",
    slug: "banking-data-platform",
    title: "Banking Data Platform",
    subtitle: "Production-like banking Lakehouse with batch + CDC",
    summary:
      "Built an end-to-end analytical platform for retail banking data using Python, Apache Spark, Apache Iceberg, Kafka, Debezium, Airflow, dbt, Trino, OpenMetadata, and Apache Superset. Designed a Medallion Lakehouse with batch and CDC pipelines processing 4.6M+ curated financial transactions. Modeled 16 source datasets into 53 cataloged tables with 8 dimensions, 5 fact tables, and 22 lineage edges.",
    category: "data-platform",
    status: "complete",
    scope: "production-like",
    featured: true,
    period: "Mar 2026 – Apr 2026",
    tech: [
      "Python",
      "Apache Spark",
      "Apache Iceberg",
      "Apache Kafka",
      "Debezium",
      "Apache Airflow",
      "dbt",
      "Trino",
      "OpenMetadata",
      "Apache Superset",
    ],
    tags: ["lakehouse", "cdc", "batch", "streaming", "modeling", "governance"],
    github: "https://github.com/minzi03/banking_data_platform",
    // Engineering reasoning
    problem: bankingProblem,
    constraints: bankingConstraints,
    adrs: bankingADRs,
    impact: bankingImpact,
    limitations: bankingLimitations,
    improvements: bankingImprovements,
  },
  {
    id: "modern-data-stack",
    slug: "modern-data-stack",
    title: "Modern Data Stack Pipeline",
    subtitle: "ELT pipeline with CDC, SCD Type 2, and Snowflake",
    summary:
      "Built an ELT pipeline using Python, PostgreSQL, Debezium, Kafka, Snowflake, dbt, and MinIO for SCD Type 2 dimension management. Designed a 5-table pipeline handling incremental loads and slowly changing dimensions for analytics-ready data.",
    category: "data-platform",
    status: "complete",
    scope: "portfolio-demo",
    featured: false,
    period: "Feb 2026 – Mar 2026",
    tech: [
      "Python",
      "PostgreSQL",
      "Debezium",
      "Apache Kafka",
      "Snowflake",
      "dbt",
      "MinIO",
    ],
    tags: ["cdc", "elt", "snowflake", "dbt", "streaming"],
    github: "https://github.com/minzi03/Modern-Datastack-Pipeline",
    relatedExperienceIds: ["quanskill-data-engineer-intern"],
    // Engineering reasoning
    problem: mdsProblem,
    constraints: mdsConstraints,
    adrs: mdsADRs,
    impact: mdsImpact,
    limitations: mdsLimitations,
    improvements: mdsImprovements,
  },
  {
    id: "azure-ecommerce",
    slug: "azure-ecommerce",
    title: "Azure E-Commerce Data Platform",
    subtitle: "Cloud ETL pipeline on Azure with Databricks and Delta Lake",
    summary:
      "Built an end-to-end ETL pipeline using Azure Data Factory, ADLS Gen2, Azure Databricks, Delta Lake, Synapse Analytics, and Power BI for e-commerce analytics.",
    category: "cloud-data",
    status: "complete",
    scope: "portfolio-demo",
    featured: false,
    period: "Nov 2025 – Jan 2026",
    tech: [
      "Azure Data Factory",
      "ADLS Gen2",
      "Azure Databricks",
      "Delta Lake",
      "Synapse Analytics",
      "Power BI",
    ],
    tags: ["azure", "cloud", "databricks", "delta-lake", "bi"],
    github: "https://github.com/minzi03/Azure-E-commerce-ETL-Pipeline",
    // Engineering reasoning
    problem: azureProblem,
    constraints: azureConstraints,
    adrs: azureADRs,
    impact: azureImpact,
    limitations: azureLimitations,
    improvements: azureImprovements,
  },
  {
    id: "movie-data-warehouse",
    slug: "movie-data-warehouse",
    title: "Movie Data Warehouse",
    subtitle: "Star schema data warehouse for OLAP analytics",
    summary:
      "Designed a data warehouse for movie data using SQL and Python, building an ETL pipeline and star schema model to support OLAP analytics.",
    category: "data-warehouse",
    status: "complete",
    scope: "academic",
    featured: false,
    period: "Oct 2025 – Nov 2025",
    tech: ["SQL", "Python", "ETL", "Data Modeling"],
    tags: ["data-warehouse", "modeling", "etl", "sql"],
    github: "https://github.com/minzi03/Movie-Data-Warehouse-ETL-OLAP",
    // Engineering reasoning
    problem: movieProblem,
    constraints: movieConstraints,
    adrs: movieADRs,
    impact: movieImpact,
    limitations: movieLimitations,
    improvements: movieImprovements,
  },
];

/* ─── Queries ─── */

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
