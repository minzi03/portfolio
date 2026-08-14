import type {
  Project as ProjectBase,
} from "@/data/types";
import { bankingImpact, bankingADRs, bankingProblem, bankingConstraints, bankingLimitations, bankingImprovements } from "./projects/banking/case-study";
import { mdsImpact, mdsADRs, mdsProblem, mdsConstraints, mdsLimitations, mdsImprovements } from "./projects/modern-data-stack/case-study";
import { azureImpact, azureADRs, azureProblem, azureConstraints, azureLimitations, azureImprovements } from "./projects/azure-ecommerce/case-study";
import { movieImpact, movieADRs, movieProblem, movieConstraints, movieLimitations, movieImprovements } from "./projects/movie-data-warehouse/case-study";
import { nexlabImpact, nexlabADRs, nexlabProblem, nexlabConstraints, nexlabLimitations, nexlabImprovements } from "./projects/nexlab-data-platform/case-study";

/** Project type — exported as `Project` for consumers */
export type Project = ProjectBase;

export const projects: Project[] = [
  {
    id: "banking-data-platform",
    slug: "banking-data-platform",
    title: "Banking Data Platform",
    subtitle: "Production-like banking Lakehouse with batch + CDC",
    summary:
      "Built a production-like analytical platform for retail banking data with dual ingestion paths: scheduled batch (Spark JDBC → Iceberg) and near-real-time CDC (PostgreSQL WAL → Debezium → Kafka → Spark Streaming). Designed a Medallion Lakehouse processing 4.6M+ curated financial transactions across 16 source datasets, 53 cataloged tables, 8 dimensions, 5 facts, and 18 Gold analytics marts. Implemented 33 YAML data contracts, 8 DQ check types, RBAC with column masking, and CDC freshness observability (median 49.8s end-to-end). Full stack: 23 Docker services, 16 Airflow DAGs, 312 automated tests.",
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
      "Docker Compose",
      "PostgreSQL",
      "MinIO",
      "Prometheus",
      "Grafana",
      "Streamlit",
    ],
    tags: ["lakehouse", "cdc", "batch", "streaming", "modeling", "governance", "data-quality", "docker"],
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
    title: "Modern Datastack Pipeline",
    subtitle: "CDC-based ELT with Kafka, Snowflake & dbt — 9 Docker services, 28 dbt tests",
    summary:
      "End-to-end CDC pipeline: PostgreSQL WAL → Debezium (pgoutput) → Kafka → Python micro-batch consumer (50 records/30s) → MinIO Parquet lake → Airflow orchestration (10 tasks, 5-min schedule) → Snowflake COPY INTO → dbt (staging views → SCD2 snapshots → star schema marts). 9 dbt models, 28 dbt tests, 13 Python unit tests, 2 CI/CD workflows. Idempotent ingestion via Airflow Variables, SCD Type 2 for customer/account history, ShortCircuitOperator for empty batch optimization.",
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
      "Apache Airflow",
      "Docker Compose",
      "GitHub Actions",
    ],
    tags: ["cdc", "elt", "snowflake", "dbt", "streaming", "scd-type-2", "micro-batch", "docker", "ci-cd"],
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
    tech: ["SQL", "Python", "Data Modeling"],
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
  {
    id: "nexlab-data-platform",
    slug: "nexlab-data-platform",
    title: "NYC Taxi Data Platform",
    subtitle: "Medallion Lakehouse with 78M records, 18 DQ checks, bilingual dashboard",
    summary:
      "Built an end-to-end data platform processing 78M+ NYC TLC taxi trip records across 24 months. Implemented Medallion Lakehouse (Bronze → Silver → Gold) with Apache Spark, Iceberg, MinIO, Trino, Airflow, and Streamlit. 18 data quality checks, 8 ADRs, 6 CI/CD jobs, bilingual EN/VI dashboard.",
    category: "data-platform",
    status: "complete",
    scope: "production-like",
    featured: false,
    period: "Jan 2026 – Feb 2026",
    tech: [
      "Python",
      "Apache Spark",
      "Apache Iceberg",
      "MinIO",
      "Trino",
      "Apache Airflow",
      "Streamlit",
      "PostgreSQL",
      "Plotly",
      "Docker Compose",
    ],
    tags: ["lakehouse", "medallion", "data-quality", "olap", "docker", "etl"],
    github: "https://github.com/minzi03/nexlab_data_platform",
    // Engineering reasoning
    problem: nexlabProblem,
    constraints: nexlabConstraints,
    adrs: nexlabADRs,
    impact: nexlabImpact,
    limitations: nexlabLimitations,
    improvements: nexlabImprovements,
  },
];

/* ─── Queries ─── */

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

