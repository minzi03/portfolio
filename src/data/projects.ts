export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  period: string;
  role: string;
  featured: boolean;
  metrics: { label: string; value: string }[];
  stack: string[];
  tags: string[];
  github?: string;
  caseStudy?: boolean;
}

export const projects: Project[] = [
  {
    slug: "banking-data-platform",
    name: "Banking Data Platform",
    tagline: "Production-like banking Lakehouse with batch + CDC",
    description:
      "Built an end-to-end analytical platform for retail banking data using Python, Apache Spark, Apache Iceberg, Kafka, Debezium, Airflow, dbt, Trino, OpenMetadata, and Apache Superset. Designed a Medallion Lakehouse with batch and CDC pipelines processing 4.6M+ curated financial transactions. Modeled 16 source datasets into 53 cataloged tables with 8 dimensions, 5 fact tables, and 22 lineage edges.",
    period: "Mar 2026 – Apr 2026",
    role: "Solo Data Engineer",
    featured: true,
    metrics: [
      { value: "4.6M+", label: "Transactions" },
      { value: "16", label: "Source datasets" },
      { value: "8", label: "Dimensions" },
      { value: "5", label: "Fact tables" },
      { value: "53", label: "Cataloged tables" },
      { value: "22", label: "Lineage edges" },
    ],
    stack: [
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
    caseStudy: true,
  },
  {
    slug: "modern-data-stack",
    name: "Modern Data Stack Pipeline",
    tagline: "ELT pipeline with CDC, SCD Type 2, and Snowflake",
    description:
      "Built an ELT pipeline using Python, PostgreSQL, Debezium, Kafka, Snowflake, dbt, and MinIO for SCD Type 2 dimension management. Designed a 5-table pipeline handling incremental loads and slowly changing dimensions for analytics-ready data.",
    period: "Feb 2026 – Mar 2026",
    role: "Solo Data Engineer",
    featured: true,
    metrics: [
      { value: "5 tables", label: "Pipeline" },
      { value: "SCD2", label: "Dimensions" },
      { value: "ELT", label: "Pattern" },
    ],
    stack: [
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
    caseStudy: true,
  },
  {
    slug: "azure-ecommerce",
    name: "Azure E-Commerce Data Platform",
    tagline: "Cloud ETL pipeline on Azure with Databricks and Delta Lake",
    description:
      "Built an end-to-end ETL pipeline using Azure Data Factory, ADLS Gen2, Azure Databricks, Delta Lake, Synapse Analytics, and Power BI for e-commerce analytics.",
    period: "Nov 2025 – Jan 2026",
    role: "Solo Data Engineer",
    featured: true,
    metrics: [
      { value: "Cloud", label: "Architecture" },
      { value: "Delta Lake", label: "Table format" },
      { value: "End-to-end", label: "Pipeline" },
    ],
    stack: [
      "Azure Data Factory",
      "ADLS Gen2",
      "Azure Databricks",
      "Delta Lake",
      "Synapse Analytics",
      "Power BI",
    ],
    tags: ["azure", "cloud", "databricks", "delta-lake", "bi"],
    github: "https://github.com/minzi03/Azure-E-commerce-ETL-Pipeline",
    caseStudy: true,
  },
  {
    slug: "movie-data-warehouse",
    name: "Movie Data Warehouse",
    tagline: "Star schema data warehouse for OLAP analytics",
    description:
      "Designed a data warehouse for movie data using SQL and Python, building an ETL pipeline and star schema model to support OLAP analytics.",
    period: "Oct 2025 – Nov 2025",
    role: "Solo Data Engineer",
    featured: false,
    metrics: [
      { value: "Star Schema", label: "Modeling" },
      { value: "ETL", label: "Pipeline" },
    ],
    stack: ["SQL", "Python", "ETL", "Data Modeling"],
    tags: ["data-warehouse", "modeling", "etl", "sql"],
    github: "https://github.com/minzi03/Movie-Data-Warehouse-ETL-OLAP",
    caseStudy: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
