import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Data Engineering projects by Nguyen Minh Duy — Lakehouse, CDC, streaming, analytics.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects | Nguyen Minh Duy", description: "Data Engineering projects — Lakehouse, CDC, streaming, analytics." },
};

export default function ProjectsPage() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">Work</p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">Projects</h1>
          <p className="mt-3 text-base text-text-secondary">
            Data engineering projects — from Lakehouse architectures to streaming pipelines.
            Each project includes a detailed case study with architecture, decisions, and trade-offs.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group block rounded-xl border border-border bg-bg-surface p-6 transition-colors hover:border-accent/30"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-text-primary group-hover:text-accent">
                      {project.name}
                    </h2>
                    {project.caseStudy && (
                      <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                        Case Study
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-text-secondary">{project.tagline}</p>
                  <p className="mt-2 text-sm text-text-muted line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <span
                        key={s}
                        className="rounded border border-border bg-bg px-2 py-0.5 font-mono text-[11px] text-text-muted"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex gap-4 text-center">
                  {project.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <p className="text-lg font-bold font-mono text-accent">{m.value}</p>
                      <p className="text-[11px] text-text-muted">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
