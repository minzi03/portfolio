export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  type: string;
  description: string;
  highlights: string[];
  stack: string[];
}

export const experiences: Experience[] = [
  {
    id: "quanskill",
    company: "QuanSkill",
    role: "Data Engineer Intern",
    period: "May 2026 – Present",
    location: "Remote",
    type: "Part-time",
    description:
      "Building config-driven data ingestion platform for AI/ML workloads with PostgreSQL and pgvector.",
    highlights: [
      "Config-driven ingestion: Designed a config-driven ingestion framework using YAML-defined pipelines for flexible data source integration.",
      "Schema validation: Built Raw, Staging, Clean layers and schema validation for structured and semi-structured data using Python and SQL.",
      "Storage & search: Implemented PostgreSQL with pgvector for efficient vector search and AI-ready data storage.",
      "Deployment & monitoring: Set up Docker containerization and CI/CD pipelines with GitHub Actions for automated deployment and monitoring.",
      "Data quality: Created automated data quality checks and logging to ensure pipeline reliability and data accuracy.",
    ],
    stack: ["Python", "SQL", "PostgreSQL", "pgvector", "Docker", "GitHub Actions", "YAML"],
  },
  {
    id: "katalyst",
    company: "Katalyst",
    role: "Data Engineer Intern",
    period: "Dec 2025 – Mar 2026",
    location: "Ho Chi Minh City",
    type: "On-site",
    description:
      "Designed and operated data lakehouse infrastructure using Dremio, Iceberg, and Apache NiFi on MinIO object storage.",
    highlights: [
      "Lakehouse: Designed and operated a data lakehouse on MinIO object storage using Dremio, Apache Iceberg, and Apache NiFi.",
      "Ingestion: Migrated Oracle data sources to Iceberg on MinIO with NiFi-based ingestion pipelines.",
      "Modeling: Modeled data in star schema with SCD Type 1 and Type 2 for dimension tables.",
      "Query optimization: Optimized Dremio Reflections for query acceleration, reducing query latency from 25s to 8–12s on analytical workloads.",
      "Security: Built data quality monitoring and configured row access policies and column masking in Dremio for secure data access.",
    ],
    stack: ["Dremio", "Apache Iceberg", "Apache NiFi", "MinIO", "Oracle", "SQL", "Docker"],
  },
];
