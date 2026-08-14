import type { Experience } from "@/data/types";

export const experiences: Experience[] = [
  {
    id: "katalyst-data-engineer-intern",
    company: "Katalyst",
    role: "Data Engineer Intern",
    location: "Ho Chi Minh City",
    startDate: "2025-10",
    endDate: "2025-12",
    technologies: [
      "Apache Iceberg",
      "Apache NiFi",
      "Dremio",
      "MinIO",
      "Star Schema",
      "SCD Type 1/2",
      "SQL",
      "Lakehouse Architecture",
    ],
    highlights: [
      {
        action:
          "Built Dimension Customer with SCD Type 1 & 2 from Core Banking source on Iceberg Table",
        approach:
          "Analyzed 20-attribute corebank_customer_raw schema, designed SCD logic: Type 1 for CUS_BIRTH_INCORP_DATE (overwrite), Type 2 for remaining attributes (history tracking with EFFECTIVE_FROM, EFFECTIVE_TO, IS_CURRENT). Implemented on Iceberg Table via Dremio with surrogate key generation.",
        outcome:
          "Created enterprise Dimension Customer with full historical tracking, enabling time-travel queries and audit trail on customer attribute changes.",
        metrics: [
          {
            label: "SCD attributes",
            value: "19 Type 2 + 1 Type 1",
          },
          {
            label: "Dimension columns",
            value: "24 (incl. audit & SCD metadata)",
          },
        ],
        technologies: ["Apache Iceberg", "Dremio", "SQL"],
        projectIds: ["katalyst-internship"],
      },
      {
        action:
          "Expanded Dimension Customer by integrating individual and corporate customer data from multiple staging sources",
        approach:
          "Joined stg_customer_raw_i (individual: gender, birth date) and stg_customer_raw_c (corporate: incorporation date, employee count) with main customer table via CUS_CUSTOMER_CODE. Applied conditional logic: individual → CUS_BIRTH, corporate → INCORP_DATE.",
        outcome:
          "Unified dimension covering both individual and corporate customers with enriched attributes for segmented analytics.",
        metrics: [
          {
            label: "source tables integrated",
            value: "3 (corebank + individual + corporate)",
          },
        ],
        technologies: ["Apache Iceberg", "Dremio", "SQL"],
        projectIds: ["katalyst-internship"],
      },
      {
        action:
          "Designed and implemented Star Schema with Fact Account and 3 Dimensions (Customer, Branch, Account)",
        approach:
          "Built Fact Account (account_sk, customer_sk, branch_sk, current_balance, account_status) with surrogate keys from all 3 dimensions. Dimension Branch organized with 2-level hierarchy (area_4, area_6) for regional analysis. All dimensions use SCD Type 2 with row_hash for change detection.",
        outcome:
          "Star Schema model enabling analytical queries across account balances, customer segments, and branch hierarchy.",
        metrics: [
          {
            label: "model",
            value: "1 Fact + 3 Dimensions",
          },
          {
            label: "total attributes",
            value: "6 (fact) + 24 (customer) + 15 (branch) + 14 (account)",
          },
        ],
        technologies: ["Apache Iceberg", "Dremio", "Star Schema", "DBML"],
        projectIds: ["katalyst-internship"],
      },
      {
        action:
          "Ingested Excel source data (Account, Branch) into Lakehouse via Dremio and MinIO",
        approach:
          "Uploaded corebank_account.xlsx and corebank_branch.xlsx to MinIO (S3-compatible storage), created datasets in Dremio, and converted to Iceberg Tables in lakehouse.etladmin schema for downstream query and analytics.",
        outcome:
          "Established file-to-Lakehouse ingestion pattern for Excel-based source systems.",
        technologies: ["Dremio", "MinIO", "Apache Iceberg"],
        projectIds: ["katalyst-internship"],
      },
      {
        action:
          "Built Oracle-to-Lakehouse ingestion pipeline using Apache NiFi",
        approach:
          "Designed NiFi dataflow connecting to Oracle database, configured ExecuteSQL/ExecuteSQLRecord processors for extraction, ConvertRecord for format transformation, and PutS3Object for writing to MinIO. Data stored as Iceberg-compatible files queryable via Dremio.",
        outcome:
          "Automated ingestion from Oracle (relational + XML data) into Lakehouse storage layer.",
        metrics: [
          {
            label: "Oracle data formats",
            value: "2 (relational + XML)",
          },
        ],
        technologies: ["Apache NiFi", "MinIO", "Apache Iceberg", "Dremio"],
        projectIds: ["katalyst-internship"],
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
        metrics: [
          {
            label: "source formats",
            before: "Manual code per source",
            after: "5 formats via YAML config",
            value: "5 formats",
          },
        ],
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
        metrics: [
          {
            label: "extraction capability",
            value: "Page-level structured extraction",
          },
        ],
        technologies: ["Python"],
      },
      {
        action:
          "Designed shared data contracts for standardized outputs",
        approach:
          "Created standardized output schemas consumed by PostgreSQL/pgvector, RAG pipelines, classification models, and Streamlit dashboards",
        outcome:
          "Established consistent data interfaces across multiple downstream consumers",
        metrics: [
          {
            label: "downstream consumers",
            value: "4 (PostgreSQL, RAG, ML, Streamlit)",
          },
        ],
        technologies: ["Python", "PostgreSQL", "pgvector"],
      },
      {
        action:
          "Containerized pipeline infrastructure with Docker Compose",
        approach:
          "Built Docker Compose stacks for local development and deployment, packaging pipeline services with their dependencies",
        outcome:
          "Enabled reproducible development environments and consistent deployment across team",
        metrics: [
          {
            label: "setup time",
            before: "Manual dependency install",
            after: "Single docker-compose up",
            value: "Minutes → seconds",
          },
        ],
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
