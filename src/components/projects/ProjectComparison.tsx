"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { projects, type Project } from "@/data/projects";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

type ComparisonMetric = "tech" | "scope" | "category" | "impact";

export default function ProjectComparison() {
  const { t } = useI18n();
  const [selected, setSelected] = useState<[string, string]>(["", ""]);
  const [activeMetric, setActiveMetric] = useState<ComparisonMetric>("tech");

  const project1 = useMemo(() => projects.find((p) => p.id === selected[0]) ?? null, [selected[0]]);
  const project2 = useMemo(() => projects.find((p) => p.id === selected[1]) ?? null, [selected[1]]);

  const handleSelect = (index: 0 | 1, projectId: string) => {
    const newSelected = [...selected] as [string, string];
    newSelected[index] = projectId;
    setSelected(newSelected);
  };

  const metrics: { key: ComparisonMetric; label: string }[] = [
    { key: "tech", label: t("comparison.metrics.tech") },
    { key: "scope", label: t("comparison.metrics.scope") },
    { key: "category", label: t("comparison.metrics.category") },
    { key: "impact", label: t("comparison.metrics.impact") },
  ];

  const getComparisonData = (project: Project, metric: ComparisonMetric) => {
    switch (metric) {
      case "tech":
        return project.tech;
      case "scope":
        return [project.scope];
      case "category":
        return [project.category.replace(/-/g, " ")];
      case "impact":
        return project.impact?.map((m) => `${m.value} ${m.label}`) ?? [];
    }
  };

  const findCommonItems = (arr1: string[], arr2: string[]) => {
    return arr1.filter((item) =>
      arr2.some((item2) => item.toLowerCase() === item2.toLowerCase())
    );
  };

  const findUniqueItems = (arr1: string[], arr2: string[], side: "left" | "right") => {
    return arr1.filter((item) =>
      !arr2.some((item2) => item.toLowerCase() === item2.toLowerCase())
    );
  };

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
            {t("comparison.badge")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("comparison.title")}
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            {t("comparison.description")}
          </p>
        </div>

        {/* Project selectors */}
        <div className="grid gap-4 sm:grid-cols-2">
          {[0, 1].map((index) => (
            <div key={index}>
              <label className="mb-2 block text-sm font-medium text-text-secondary">
                {t("comparison.selectProject")} {index + 1}
              </label>
              <select
                value={selected[index]}
                onChange={(e) => handleSelect(index as 0 | 1, e.target.value)}
                className="w-full rounded-lg border border-border bg-bg-surface px-4 py-3 text-text-primary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
              >
                <option value="">{t("comparison.selectPlaceholder")}</option>
                {projects.map((project) => (
                  <option key={project.id} value={project.id}>
                    {project.title}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* Metric tabs */}
        <div className="mt-8 flex flex-wrap gap-2">
          {metrics.map((metric) => (
            <button
              key={metric.key}
              onClick={() => setActiveMetric(metric.key)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                activeMetric === metric.key
                  ? "bg-accent text-bg"
                  : "border border-border text-text-secondary hover:text-text-primary"
              )}
            >
              {metric.label}
            </button>
          ))}
        </div>

        {/* Comparison display */}
        {project1 && project2 && (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {/* Project 1 */}
            <ComparisonCard
              project={project1}
              metric={activeMetric}
              items={getComparisonData(project1, activeMetric)}
              otherItems={getComparisonData(project2, activeMetric)}
              side="left"
              commonItems={findCommonItems(
                getComparisonData(project1, activeMetric),
                getComparisonData(project2, activeMetric)
              )}
              uniqueItems={findUniqueItems(
                getComparisonData(project1, activeMetric),
                getComparisonData(project2, activeMetric),
                "left"
              )}
            />

            {/* Project 2 */}
            <ComparisonCard
              project={project2}
              metric={activeMetric}
              items={getComparisonData(project2, activeMetric)}
              otherItems={getComparisonData(project1, activeMetric)}
              side="right"
              commonItems={findCommonItems(
                getComparisonData(project1, activeMetric),
                getComparisonData(project2, activeMetric)
              )}
              uniqueItems={findUniqueItems(
                getComparisonData(project2, activeMetric),
                getComparisonData(project1, activeMetric),
                "right"
              )}
            />
          </div>
        )}

        {/* Empty state */}
        {!project1 && !project2 && (
          <div className="mt-12 rounded-xl border border-border bg-bg-surface p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
              />
            </svg>
            <p className="mt-4 text-sm text-text-muted">
              {t("comparison.emptyState")}
            </p>
          </div>
        )}
      </Container>
    </div>
  );
}

function ComparisonCard({
  project,
  metric,
  items,
  otherItems,
  side,
  commonItems,
  uniqueItems,
}: {
  project: Project;
  metric: ComparisonMetric;
  items: string[];
  otherItems: string[];
  side: "left" | "right";
  commonItems: string[];
  uniqueItems: string[];
}) {
  return (
    <div className="rounded-xl border border-border bg-bg-surface p-6">
      <div className="mb-4">
        <Link
          href={`/projects/${project.slug}`}
          className="text-lg font-bold text-text-primary hover:text-accent transition-colors"
        >
          {project.title}
        </Link>
        <p className="mt-1 text-sm text-text-muted">{project.subtitle}</p>
      </div>

      <div className="space-y-3">
        {items.map((item, index) => {
          const isCommon = commonItems.some(
            (c) => c.toLowerCase() === item.toLowerCase()
          );
          const isUnique = uniqueItems.some(
            (u) => u.toLowerCase() === item.toLowerCase()
          );

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2",
                isCommon && "bg-accent/10 border border-accent/20",
                isUnique && "bg-green-500/10 border border-green-500/20"
              )}
            >
              {isCommon && (
                <span className="text-xs font-medium text-accent">✓</span>
              )}
              {isUnique && (
                <span className="text-xs font-medium text-green-400">★</span>
              )}
              <span className="text-sm text-text-secondary">{item}</span>
            </div>
          );
        })}

        {items.length === 0 && (
          <p className="text-sm text-text-muted">No data available</p>
        )}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-accent/50" />
          Common
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-green-500/50" />
          Unique
        </span>
      </div>
    </div>
  );
}
