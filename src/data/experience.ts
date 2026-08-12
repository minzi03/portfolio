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
    startDate: "2025-12",
    endDate: "2026-03",
    technologies: [
      "Apache Iceberg",
      "Dremio",
      "Apache NiFi",
      "Star Schema",
      "SCD Type 1/2",
      "Row Access Policies",
      "Column Masking",
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
          "Built Oracle-to-MinIO data ingestion pipeline using Apache NiFi",
        approach:
          "Configured NiFi processors for Oracle source extraction, transformed and loaded data into MinIO object storage as Iceberg-compatible files",
        outcome:
          "Established automated data ingestion from Oracle sources into the Lakehouse storage layer",
        technologies: ["Apache NiFi", "Apache Iceberg"],
      },
      {
        action:
          "Implemented Dremio API automation for dataset management",
        approach:
          "Built automated workflows using Dremio REST API to manage dataset configurations, promotion, and reflection scheduling",
        outcome:
          "Reduced manual dataset management overhead through API-driven automation",
        technologies: ["Dremio"],
      },
      {
        action:
          "Evaluated Dremio v25 vs v24 for analytical workloads",
        approach:
          "Conducted benchmark comparison of Dremio versions on Iceberg tables, documenting performance differences and feature improvements",
        outcome:
          "Provided evidence-based recommendation for version upgrade",
        technologies: ["Dremio", "Apache Iceberg"],
      },
      {
        action:
          "Designed Row Access Policies and Column Masking for data governance",
        approach:
          "Implemented Dremio row-level access policies and column masking rules to enforce data access controls across analytical layers",
        outcome:
          "Enabled role-based data access without application-layer overhead",
        technologies: ["Dremio"],
      },
    ],
  },
  {
    id: "quanskill-data-engineer-intern",
    company: "QuanSkill",
    role: "Data Engineer Intern",
    location: "Ho Chi Minh City",
    startDate: "2026-05",
    endDate: undefined,
    technologies: [
      "Python",
      "Docker",
      "GitHub Actions",
      "PostgreSQL",
      "pgvector",
      "Streamlit",
      "PDF Processing",
    ],
    highlights: [
      {
        action:
          "Built config-driven ingestion framework for multi-format data onboarding",
        approach:
          "Designed YAML-configurable ingestion templates supporting CSV, Excel, REST API, and PDF sources, with a Raw → Staging → Clean pipeline flow for each",
        outcome:
          "Enabled new source onboarding through configuration changes without code modifications",
        technologies: ["Python", "PostgreSQL"],
        projectIds: ["modern-data-stack"],
      },
      {
        action:
          "Implemented validation, logging, and file manifest tracking",
        approach:
          "Built automated validation checks at each pipeline stage with structured logging and file manifest generation for auditability",
        outcome:
          "Improved pipeline observability and debugging through systematic validation and tracking",
        technologies: ["Python"],
      },
      {
        action:
          "Developed page-level PDF extraction pipeline",
        approach:
          "Built PDF processing pipeline with page-level extraction, parsing structured data from multi-page documents into normalized outputs",
        outcome:
          "Enabled automated ingestion of PDF-sourced data into downstream systems",
        technologies: ["Python"],
      },
      {
        action:
          "Designed shared data contracts for standardized outputs",
        approach:
          "Created standardized output schemas consumed by PostgreSQL/pgvector, RAG pipelines, classification models, and Streamlit dashboards",
        outcome:
          "Established consistent data interfaces across multiple downstream consumers",
        technologies: ["Python", "PostgreSQL", "pgvector"],
      },
      {
        action:
          "Containerized pipeline infrastructure with Docker Compose",
        approach:
          "Built Docker Compose stacks for local development and deployment, packaging pipeline services with their dependencies",
        outcome:
          "Enabled reproducible development environments and consistent deployment across team",
        technologies: ["Docker"],
      },
      {
        action:
          "Implemented CI/CD pipelines with GitHub Actions",
        approach:
          "Built GitHub Actions workflows for automated testing, validation, and deployment of pipeline code",
        outcome:
          "Established automated quality gates and deployment processes",
        technologies: ["GitHub Actions", "Docker"],
      },
    ],
    relatedProjectIds: ["modern-data-stack", "movie-data-warehouse"],
  },
];
