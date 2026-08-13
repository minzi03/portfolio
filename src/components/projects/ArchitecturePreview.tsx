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
    <div className="rounded-sm border border-border bg-bg px-3 py-2.5 overflow-x-auto">
      <div className="flex items-center gap-1 text-[11px] text-text-muted min-w-max">
        {steps.map((step, i) => (
          <span key={i} className="flex items-center gap-1">
            <span className="flex flex-col items-center rounded-sm border border-border bg-bg-surface px-2 py-1">
              <span className="font-mono text-[10px] font-medium text-text-primary">{step.label}</span>
              {step.detail && (
                <span className="text-[9px] text-text-muted">{step.detail}</span>
              )}
            </span>
            {i < steps.length - 1 && (
              <svg
                className="mx-0.5 h-3 w-3 shrink-0 text-accent/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
