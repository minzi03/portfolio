"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ArchitecturePreview from "@/components/projects/ArchitecturePreview";
import ProjectStatusBadge from "@/components/projects/ProjectStatusBadge";
import { projects } from "@/data/projects";
import type { ProjectCategory } from "@/data/types";

type ProjectFilter = "all" | ProjectCategory;

const FILTER_OPTIONS: { value: ProjectFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "data-platform", label: "Data Platform" },
  { value: "cloud-data", label: "Cloud" },
  { value: "data-warehouse", label: "Data Warehouse" },
];

/* ─── Featured (Flagship) Card ─── */

function FeaturedCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-accent/20 bg-bg p-6 sm:p-8 transition-colors hover:border-accent/40"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        {/* Left: content */}
        <div className="flex-1 space-y-4">
          <ProjectStatusBadge status={project.status} scope={project.scope} />

          <div>
            <h2 className="text-2xl font-bold text-text-primary group-hover:text-accent">
              {project.title}
            </h2>
            <p className="mt-1 text-sm text-text-secondary">{project.subtitle}</p>
          </div>

          {/* Architecture preview */}
          <ArchitecturePreview projectId={project.id} />

          <p className="max-w-xl text-sm leading-relaxed text-text-muted line-clamp-3">
            {project.summary}
          </p>

          {/* Impact metrics */}
          {project.impact && project.impact.length > 0 && (
            <div className="flex flex-wrap gap-6">
              {project.impact.slice(0, 4).map((m) => (
                <div key={m.id}>
                  <p className="text-xl font-bold font-mono text-accent">{m.value}</p>
                  <p className="text-[11px] text-text-muted">{m.label}</p>
                </div>
              ))}
            </div>
          )}

          {/* Tech stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 6).map((t) => (
              <span
                key={t}
                className="rounded border border-border bg-bg-surface px-2 py-0.5 font-mono text-[11px] text-text-muted"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Right: CTAs */}
        <div className="flex flex-col gap-2 lg:items-end">
          <span className="inline-flex h-10 items-center gap-2 rounded-lg bg-accent px-5 text-sm font-medium text-bg transition-colors group-hover:bg-accent-hover">
            View Case Study →
          </span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex h-10 items-center gap-2 rounded-lg border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── Supporting Card ─── */

function SupportingCard({ project }: { project: (typeof projects)[number] }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-xl border border-border bg-bg-surface p-5 transition-colors hover:border-accent/30"
    >
      <div className="space-y-3">
        <ProjectStatusBadge status={project.status} scope={project.scope} />

        <h3 className="text-base font-semibold text-text-primary group-hover:text-accent">
          {project.title}
        </h3>

        <p className="text-sm text-text-muted line-clamp-2">{project.summary}</p>

        {/* Impact — compact */}
        {project.impact && project.impact.length > 0 && (
          <div className="flex flex-wrap gap-4">
            {project.impact.slice(0, 2).map((m) => (
              <span key={m.id} className="text-sm">
                <span className="font-mono font-bold text-accent">{m.value}</span>{" "}
                <span className="text-text-muted">{m.label}</span>
              </span>
            ))}
          </div>
        )}

        {/* Tech — compact */}
        <div className="flex flex-wrap gap-1">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-1">
          <span className="text-xs text-accent">Case Study →</span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-text-muted hover:text-text-primary"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}

/* ─── Page ─── */

export default function ProjectsPageContent() {
  const [activeFilter, setActiveFilter] = useState<ProjectFilter>("all");

  const featured = projects.find((p) => p.featured);
  const visibleSupporting =
    activeFilter === "all"
      ? projects.filter((p) => !p.featured)
      : projects.filter((p) => !p.featured && p.category === activeFilter);

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Work</p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Projects
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            Data engineering projects — from Lakehouse architectures to streaming pipelines.
            Each project includes a detailed case study with architecture, decisions, and trade-offs.
          </p>
        </div>

        {/* Featured / Flagship */}
        {featured && (
          <div className="mt-12">
            <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent">
              Flagship
            </p>
            <FeaturedCard project={featured} />
          </div>
        )}

        {/* Supporting projects */}
        <div className="mt-12">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-xs uppercase tracking-widest text-accent">
              Supporting Projects
            </p>

            {/* Filters */}
            <div
              className="flex flex-wrap gap-2"
              role="radiogroup"
              aria-label="Filter projects by category"
              onKeyDown={(e) => {
                if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                const currentIndex = FILTER_OPTIONS.findIndex((o) => o.value === activeFilter);
                const nextIndex =
                  e.key === "ArrowRight"
                    ? (currentIndex + 1) % FILTER_OPTIONS.length
                    : (currentIndex - 1 + FILTER_OPTIONS.length) % FILTER_OPTIONS.length;
                setActiveFilter(FILTER_OPTIONS[nextIndex].value);
              }}
            >
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={activeFilter === opt.value}
                  onClick={() => setActiveFilter(opt.value)}
                  className={`rounded-lg px-3 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-accent ${
                    activeFilter === opt.value
                      ? "bg-accent text-bg"
                      : "border border-border text-text-secondary hover:text-text-primary"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleSupporting.map((project) => (
              <SupportingCard key={project.slug} project={project} />
            ))}
          </div>

          {visibleSupporting.length === 0 && (
            <p className="mt-8 text-sm text-text-muted">No projects in this category.</p>
          )}
        </div>
      </Container>
    </div>
  );
}
