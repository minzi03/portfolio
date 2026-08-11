export type SkillLevel = "professional" | "project" | "exploring";

export interface SkillCategory {
  name: string;
  skills: { name: string; level: SkillLevel }[];
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Programming & Querying",
    skills: [
      { name: "Python", level: "professional" },
      { name: "PySpark", level: "project" },
      { name: "SQL", level: "professional" },
    ],
  },
  {
    name: "Big Data & Processing",
    skills: [
      { name: "Apache Spark", level: "project" },
      { name: "Spark Structured Streaming", level: "project" },
      { name: "Kafka", level: "project" },
      { name: "Airflow", level: "project" },
    ],
  },
  {
    name: "Data Platforms",
    skills: [
      { name: "Snowflake", level: "project" },
      { name: "Apache Iceberg", level: "professional" },
      { name: "Delta Lake", level: "project" },
      { name: "dbt", level: "project" },
      { name: "Docker", level: "professional" },
    ],
  },
  {
    name: "Cloud & Storage",
    skills: [
      { name: "Azure Data Factory", level: "project" },
      { name: "ADLS Gen2", level: "project" },
      { name: "Azure Databricks", level: "project" },
      { name: "Synapse Analytics", level: "project" },
    ],
  },
  {
    name: "BI & Governance",
    skills: [
      { name: "Power BI", level: "project" },
      { name: "Apache Superset", level: "project" },
      { name: "MS BI (SSIS, SSAS, SSRS)", level: "project" },
      { name: "OpenMetadata", level: "project" },
    ],
  },
  {
    name: "Tools & Infrastructure",
    skills: [
      { name: "Git", level: "professional" },
      { name: "GitHub Actions", level: "professional" },
      { name: "PostgreSQL", level: "professional" },
      { name: "pgvector", level: "professional" },
      { name: "MinIO", level: "professional" },
      { name: "Dremio", level: "professional" },
      { name: "Apache NiFi", level: "professional" },
      { name: "Oracle", level: "professional" },
      { name: "Trino", level: "project" },
      { name: "Debezium", level: "project" },
    ],
  },
];

export const levelLabels: Record<SkillLevel, string> = {
  professional: "Professional Experience",
  project: "Project Experience",
  exploring: "Currently Exploring",
};

export const levelColors: Record<SkillLevel, string> = {
  professional: "bg-green/15 text-green border border-green/30",
  project: "bg-accent/15 text-accent border border-accent/30",
  exploring: "bg-purple/15 text-purple border border-purple/30",
};
