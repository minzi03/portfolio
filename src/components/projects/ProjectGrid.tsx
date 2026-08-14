"use client";

import { useState } from "react";
import Link from "next/link";
import type { ProjectCategory, ProjectScope } from "@/data/types";
import { projects } from "@/data/projects";

/* ─── Filter configuration ─── */

const CATEGORIES: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "data-platform", label: "Data Platform" },
  { value: "cloud-data", label: "Cloud Data" },
  { value: "data-warehouse", label: "Data Warehouse" },
  { value: "analytics", label: "Analytics" },
  { value: "streaming", label: "Streaming" },
];

const SCOPES: { value: ProjectScope | "all"; label: string }[] = [
  { value: "all", label: "All Scopes" },
  { value: "production", label: "Production" },
  { value: "production-like", label: "Production-like" },
  { value: "portfolio-demo", label: "Demo" },
  { value: "academic", label: "Academic" },
];

const SCOPE_COLORS: Record<ProjectScope, string> = {
  production: "bg-green-500/10 text-green-400",
  "production-like": "bg-accent/10 text-accent",
  "portfolio-demo": "bg-purple/10 text-purple",
  academic: "bg-orange-500/10 text-orange-400",
};

export default function ProjectGrid() {
  const [catFilter, setCatFilter] = useState<ProjectCategory | "all">("all");
  const [scopeFilter, setScopeFilter] = useState<ProjectScope | "all">("all");

  const otherProjects = projects.filter((p) => !p.featured);

  const filtered = otherProjects.filter((p) => {
    if (catFilter !== "all" && p.category !== catFilter) return false;
    if (scopeFilter !== "all" && p.scope !== scopeFilter) return false;
    return true;
  });

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Category filters */}
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.value}
              type="button"
              onClick={() => setCatFilter(cat.value)}
              className={`rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
                catFilter === cat.value
                  ? "bg-accent/15 text-accent border border-accent/30"
                  : "border border-border bg-bg-surface text-text-muted hover:border-accent/20 hover:text-text-secondary"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scope filter */}
        <div className="flex flex-wrap gap-1.5">
          {SCOPES.map((scope) => (
            <button
              key={scope.value}
              type="button"
              onClick={() => setScopeFilter(scope.value)}
              className={`rounded-md px-2.5 py-1.5 text-[11px] font-medium transition-all ${
                scopeFilter === scope.value
                  ? "bg-accent/15 text-accent border border-accent/30"
                  : "border border-border bg-bg-surface text-text-muted hover:border-accent/20 hover:text-text-secondary"
              }`}
            >
              {scope.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <p className="mb-4 text-xs text-text-muted">
        {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        {(catFilter !== "all" || scopeFilter !== "all") && (
          <button
            type="button"
            onClick={() => { setCatFilter("all"); setScopeFilter("all"); }}
            className="ml-2 text-accent hover:text-accent-hover"
          >
            Clear filters
          </button>
        )}
      </p>

      {/* Projects grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((project) => (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            aria-label={`View case study for ${project.title}`}
            className="card-hover group flex flex-col rounded-md border border-border bg-bg p-5 transition-colors hover:border-accent/30"
          >
            {/* Category + status badges */}
            <div className="flex items-center gap-2">
              <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                {project.category.replace(/-/g, " ")}
              </span>
              <span className={`rounded px-2 py-0.5 text-[11px] font-medium ${SCOPE_COLORS[project.scope]}`}>
                {project.scope.replace(/-/g, " ")}
              </span>
              {project.status === "complete" && (
                <span className="rounded bg-green-500/10 px-2 py-0.5 text-[11px] font-medium text-green-400">
                  Complete
                </span>
              )}
            </div>

            {/* Title + subtitle */}
            <h3 className="mt-3 text-base font-semibold text-text-primary group-hover:text-accent">
              {project.title}
            </h3>
            <p className="mt-1 text-sm text-text-secondary line-clamp-2">
              {project.subtitle}
            </p>

            {/* Period */}
            {project.period && (
              <p className="mt-2 text-[11px] text-text-muted">{project.period}</p>
            )}

            {/* Tech stack */}
            <div className="mt-auto pt-3 flex flex-wrap gap-1.5">
              {project.tech.slice(0, 4).map((t) => (
                <span key={t} className="rounded-sm border border-border bg-bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                  {t}
                </span>
              ))}
              {project.tech.length > 4 && (
                <span className="rounded-sm border border-border bg-bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                  +{project.tech.length - 4}
                </span>
              )}
            </div>

            {/* Link arrow */}
            <div className="mt-3 flex items-center gap-1.5 text-sm text-accent">
              <span>Case Study</span>
              <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Empty state */}
      {filtered.length === 0 && (
        <div className="rounded-xl border border-border bg-bg-surface p-8 text-center">
          <p className="text-sm text-text-muted">No projects match the selected filters.</p>
          <button
            type="button"
            onClick={() => { setCatFilter("all"); setScopeFilter("all"); }}
            className="mt-2 text-sm text-accent hover:text-accent-hover"
          >
            Reset filters
          </button>
        </div>
      )}
    </div>
  );
}
