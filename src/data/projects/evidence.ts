import type { ProjectEvidence } from "@/data/types";

/**
 * Project evidence — screenshots, diagrams, dashboards.
 *
 * Place actual evidence files under /public/evidence/projects/<project-id>/
 * and reference them here with the path relative to /public.
 *
 * Supported types:
 * - architecture: system architecture diagrams
 * - pipeline: data pipeline flow visualizations
 * - data-model: schema/model diagrams
 * - dashboard: BI dashboard screenshots
 * - code: code editor screenshots
 * - terminal: terminal/CLI output screenshots
 * - diagram: general diagrams
 */

export const projectEvidence: Record<string, ProjectEvidence[]> = {
  "banking-data-platform": [
    {
      id: "banking-arch",
      title: "Medallion Lakehouse Architecture",
      description: "End-to-end system architecture showing batch + CDC ingestion paths, Bronze/Silver/Gold layers, and analytics serving.",
      asset: "/evidence/projects/banking-data-platform/architecture.webp",
      type: "architecture",
      aspectRatio: "16:9",
    },
    {
      id: "banking-pipeline",
      title: "CDC Pipeline Flow",
      description: "Debezium + Kafka + Spark Structured Streaming pipeline capturing PostgreSQL WAL changes into Iceberg tables.",
      asset: "/evidence/projects/banking-data-platform/pipeline.webp",
      type: "pipeline",
      aspectRatio: "16:9",
    },
    {
      id: "banking-model",
      title: "Dimensional Data Model",
      description: "8 dimensions, 5 fact tables, 22 lineage edges — business-ready models built with Spark and validated with dbt.",
      asset: "/evidence/projects/banking-data-platform/data-model.webp",
      type: "data-model",
      aspectRatio: "4:3",
    },
    {
      id: "banking-dashboard",
      title: "Superset Analytics Dashboard",
      description: "Customer 360, RFM segmentation, and churn analysis dashboards powered by Trino + Superset.",
      asset: "/evidence/projects/banking-data-platform/dashboard.webp",
      type: "dashboard",
      aspectRatio: "16:9",
    },
  ],

  "modern-data-stack": [
    {
      id: "mds-pipeline",
      title: "ELT Pipeline Architecture",
      description: "PostgreSQL → Debezium → Kafka → MinIO → Snowflake → dbt pipeline with SCD Type 2 dimensions.",
      asset: "/evidence/projects/modern-data-stack/pipeline.webp",
      type: "pipeline",
      aspectRatio: "16:9",
    },
    {
      id: "mds-model",
      title: "SCD Type 2 Dimension Model",
      description: "5-table pipeline with slowly changing dimensions for analytics-ready data.",
      asset: "/evidence/projects/modern-data-stack/data-model.webp",
      type: "data-model",
      aspectRatio: "4:3",
    },
  ],

  "azure-ecommerce": [
    {
      id: "azure-pipeline",
      title: "Azure ETL Pipeline",
      description: "Azure Data Factory → ADLS Gen2 → Databricks → Synapse → Power BI end-to-end flow.",
      asset: "/evidence/projects/azure-ecommerce/pipeline.webp",
      type: "pipeline",
      aspectRatio: "16:9",
    },
    {
      id: "azure-dashboard",
      title: "Power BI Dashboard",
      description: "E-commerce analytics dashboards with Delta Lake backend.",
      asset: "/evidence/projects/azure-ecommerce/dashboard.webp",
      type: "dashboard",
      aspectRatio: "16:9",
    },
  ],

  "movie-data-warehouse": [
    {
      id: "movie-model",
      title: "Star Schema Data Model",
      description: "Dimensional model for OLAP analytics with fact and dimension tables.",
      asset: "/evidence/projects/movie-data-warehouse/data-model.webp",
      type: "data-model",
      aspectRatio: "4:3",
    },
  ],
};

export function getProjectEvidence(projectId: string): ProjectEvidence[] {
  return projectEvidence[projectId] ?? [];
}
