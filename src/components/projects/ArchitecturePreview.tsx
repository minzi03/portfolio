"use client";

/**
 * Simplified architecture flow for project cards.
 * Shows a 5-second comprehension of the system, not the full GraphExplorer.
 */

interface ArchStep {
  label: string;
  detail?: string;
}

const ARCHITECTURES: Record<string, ArchStep[]> = {
  "banking-data-platform": [
    { label: "Sources", detail: "16 datasets" },
    { label: "Spark + Debezium", detail: "Batch + CDC" },
    { label: "Iceberg", detail: "Bronze → Silver → Gold" },
    { label: "Trino + dbt", detail: "SQL analytics" },
    { label: "Superset", detail: "BI dashboards" },
  ],
  "modern-data-stack": [
    { label: "PostgreSQL", detail: "Source" },
    { label: "Debezium + Kafka", detail: "CDC stream" },
    { label: "MinIO", detail: "S3 landing" },
    { label: "Snowflake + dbt", detail: "ELT + SCD2" },
  ],
  "azure-ecommerce": [
    { label: "ADF", detail: "Ingestion" },
    { label: "ADLS + Databricks", detail: "Delta Lake" },
    { label: "Synapse", detail: "Analytics" },
    { label: "Power BI", detail: "Dashboards" },
  ],
  "movie-data-warehouse": [
    { label: "SQL Server", detail: "Source" },
    { label: "ETL Pipeline", detail: "Transform" },
    { label: "Star Schema", detail: "Dimensional model" },
    { label: "OLAP", detail: "Analytics" },
  ],
};

export default function ArchitecturePreview({ projectId }: { projectId: string }) {
  const steps = ARCHITECTURES[projectId];
  if (!steps) return null;

  return (
    <div className="flex items-center gap-1.5 text-[11px] text-text-muted overflow-x-auto">
      {steps.map((step, i) => (
        <span key={i} className="flex items-center gap-1.5 whitespace-nowrap">
          <span className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono">
            {step.label}
          </span>
          {i < steps.length - 1 && (
            <span className="text-text-muted/50">→</span>
          )}
        </span>
      ))}
    </div>
  );
}
