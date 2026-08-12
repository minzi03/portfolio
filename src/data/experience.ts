import type {
  Experience,
  ExperienceHighlight,
  ExperienceMetric,
} from "@/data/types";

export type { Experience, ExperienceHighlight, ExperienceMetric };

export const experiences: Experience[] = [
  {
    id: "katalyst-data-engineer-intern",
    company: "Katalyst AI",
    role: "Data Engineer Intern",
    location: "Ho Chi Minh City",
    startDate: "2026-01",
    endDate: "2026-04",
    technologies: [
      "Apache Iceberg",
      "Apache Spark",
      "Dremio",
      "CDC",
      "Data Lakehouse",
      "Docker",
    ],
    highlights: [
      {
        action:
          "Optimized analytical query performance for Dremio on Iceberg-backed tables",
        approach:
          "Designed Dremio Reflections over Iceberg-backed analytical tables, tuned reflection strategies for representative query workloads",
        outcome:
          "Reduced representative query latency for benchmark workloads",
        metrics: [
          {
            label: "Query latency",
            before: "~25s",
            after: "~8–12s",
            value: "52–68% reduction",
          },
        ],
        technologies: ["Apache Iceberg", "Dremio"],
      },
      {
        action:
          "Built CDC ingestion pipeline for near-real-time data freshness",
        approach:
          "Implemented Change Data Capture using Debezium + Kafka, integrated with Iceberg MERGE for idempotent loads",
        outcome:
          "Enabled near-real-time analytical data freshness from source systems",
        technologies: ["Apache Kafka", "Debezium", "Apache Iceberg"],
      },
      {
        action:
          "Designed data quality validation framework across Medallion layers",
        approach:
          "Implemented automated quality checks at Bronze/Silver/Gold boundaries with schema validation, completeness checks, and referential integrity verification",
        outcome:
          "Established systematic data quality governance across the Lakehouse",
        technologies: ["Apache Spark", "Apache Iceberg"],
      },
      {
        action:
          "Containerized development environment for reproducible data pipelines",
        approach:
          "Built Docker-based local development stack with Iceberg, Spark, and Trino for team-wide reproducibility",
        outcome:
          "Reduced onboarding time and environment inconsistencies across the team",
        technologies: ["Docker", "Apache Spark", "Trino"],
      },
    ],
  },
  {
    id: "quanskill-data-engineer-intern",
    company: "QuanSkill",
    role: "Data Engineer Intern",
    location: "Ho Chi Minh City",
    startDate: "2025-09",
    endDate: "2025-12",
    technologies: [
      "Python",
      "Apache Airflow",
      "PostgreSQL",
      "Data Modeling",
    ],
    highlights: [
      {
        action:
          "Designed config-driven ingestion framework for multi-source data onboarding",
        approach:
          "Built YAML-configurable DAG templates in Airflow, enabling new data source onboarding without code changes",
        outcome:
          "Reduced new source onboarding time from days to hours through configuration-driven pipeline generation",
        technologies: ["Apache Airflow", "Python", "PostgreSQL"],
        projectIds: ["modern-data-stack"],
      },
      {
        action:
          "Implemented multi-tenant data isolation architecture",
        approach:
          "Designed schema-per-tenant partitioning with Row-Level Security policies in PostgreSQL, ensuring data separation at the database layer",
        outcome:
          "Achieved secure multi-tenant data isolation without application-layer overhead",
        technologies: ["PostgreSQL"],
      },
      {
        action:
          "Built metadata-driven pipeline orchestration system",
        approach:
          "Created a metadata store tracking source schemas, pipeline dependencies, and data lineage, with Airflow DAGs reading configuration from the metadata layer",
        outcome:
          "Enabled automatic pipeline generation and dependency management from metadata definitions",
        technologies: ["Apache Airflow", "Python", "PostgreSQL"],
      },
      {
        action:
          "Developed automated data quality validation framework",
        approach:
          "Implemented configurable quality rules with alerting, running validation checks on each pipeline run with automated Slack notifications on failures",
        outcome:
          "Reduced data quality incident response time through automated detection and alerting",
        technologies: ["Python", "PostgreSQL"],
      },
      {
        action:
          "Built incremental data synchronization with Watermark-based tracking",
        approach:
          "Implemented watermark-based incremental extraction tracking high-water marks per source, processing only new or changed records on each run",
        outcome:
          "Reduced pipeline runtime and resource consumption through selective data extraction",
        technologies: ["Python", "Apache Airflow"],
      },
      {
        action:
          "Designed data warehouse schema for analytics workloads",
        approach:
          "Created star schema modeling with dimension and fact tables optimized for analytical query patterns",
        outcome:
          "Enabled business analytics team to run complex queries without impacting source systems",
        technologies: ["PostgreSQL", "Data Modeling"],
        projectIds: ["movie-data-warehouse"],
      },
    ],
    relatedProjectIds: ["modern-data-stack", "movie-data-warehouse"],
  },
];
