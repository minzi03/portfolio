"use client";

import { useI18n } from "@/lib/i18n";
import Container from "@/components/ui/Container";

export default function EngineeringMethod() {
  const { t } = useI18n();

  const stages = [
    {
      step: "01",
      title: t("method.stages.ingest.title"),
      icon: "⚡",
      tools: "NiFi · Kafka · Airflow",
      detail: t("method.stages.ingest.detail"),
      evidence: "Katalyst — NiFi Oracle→MinIO · QuanSkill — config-driven multi-source",
    },
    {
      step: "02",
      title: t("method.stages.model.title"),
      icon: "🏗️",
      tools: "Spark · Iceberg · dbt",
      detail: t("method.stages.model.detail"),
      evidence: "Banking — Iceberg + Spark Medallion · Movie DW — star schema",
    },
    {
      step: "03",
      title: t("method.stages.reliability.title"),
      icon: "🛡️",
      tools: "OpenMetadata · Great Expectations",
      detail: t("method.stages.reliability.detail"),
      evidence: "Banking — 53 tables · Katalyst — row access + masking",
    },
    {
      step: "04",
      title: t("method.stages.serve.title"),
      icon: "📊",
      tools: "Trino · Superset · Power BI",
      detail: t("method.stages.serve.detail"),
      evidence: "Banking — Trino + Superset · Azure — Power BI dashboards",
    },
  ];

  const principles = [
    t("method.principles.iac"),
    t("method.principles.contracts"),
    t("method.principles.observability"),
    t("method.principles.testing"),
  ];

  return (
    <section id="method" aria-label="Engineering method" className="border-b border-border bg-bg py-16">
      <Container>
        {/* Header */}
        <div className="mb-8">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{t("method.badge")}</p>
          <h2 className="text-2xl font-bold tracking-tight text-text-primary">
            {t("method.title")}
          </h2>
        </div>

        {/* Pipeline stages — compact 4-col */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, i) => (
            <div
              key={stage.step}
              className="group relative flex flex-col rounded-xl border border-border bg-bg-surface p-4 transition-all hover:border-accent/30"
            >
              {i < stages.length - 1 && (
                <div className="absolute right-0 top-1/2 hidden h-px w-3 -translate-y-1/2 bg-border lg:block" />
              )}
              <div className="flex items-center gap-2">
                <span className="text-base">{stage.icon}</span>
                <p className="font-mono text-[11px] text-accent">{stage.step}</p>
              </div>
              <h3 className="mt-1.5 text-base font-bold text-text-primary">{stage.title}</h3>
              <p className="mt-1 font-mono text-[10px] text-text-muted">{stage.tools}</p>
              <p className="mt-1.5 text-[11px] leading-relaxed text-text-secondary">{stage.detail}</p>
              <p className="mt-2 border-t border-border pt-2 text-[10px] text-text-muted">
                {stage.evidence}
              </p>
            </div>
          ))}
        </div>

        {/* Principles — compact inline row */}
        <div className="mt-6 rounded-xl border border-border bg-bg-surface p-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            {t("method.principles.badge")}
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            {principles.map((p) => (
              <span key={p} className="flex items-center gap-1.5 text-xs text-text-secondary">
                <span aria-hidden="true" className="h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                {p}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
