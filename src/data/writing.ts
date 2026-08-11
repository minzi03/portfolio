export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
}

export const articles: Article[] = [
  {
    slug: "building-banking-lakehouse",
    title: "Building a Banking Lakehouse from Batch to CDC",
    description:
      "How I designed a production-like banking data platform with Medallion architecture, batch pipelines, and near-real-time CDC using Spark, Iceberg, Kafka, and Airflow.",
    date: "2026-08",
    category: "Data Engineering",
    tags: ["lakehouse", "iceberg", "cdc", "spark"],
  },
  {
    slug: "spark-vs-dbt",
    title: "Spark vs dbt: Where Should Transformations Live?",
    description:
      "An engineering perspective on splitting transformation logic between Spark (heavy compute, Python) and dbt (business logic, SQL, testing) in a Lakehouse architecture.",
    date: "2026-08",
    category: "Data Engineering",
    tags: ["spark", "dbt", "architecture"],
  },
  {
    slug: "understanding-cdc",
    title: "Understanding CDC: Debezium, Kafka and Iceberg",
    description:
      "A practical walkthrough of Change Data Capture — from PostgreSQL WAL to Kafka topics to Iceberg MERGE operations, with real pipeline examples.",
    date: "2026-07",
    category: "Streaming",
    tags: ["cdc", "debezium", "kafka", "iceberg"],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}
