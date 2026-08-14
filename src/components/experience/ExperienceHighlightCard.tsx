import type { ExperienceHighlight } from "@/data/types";

interface ProjectLink {
  id: string;
  title: string;
  slug: string;
}

interface Props {
  highlight: ExperienceHighlight;
  compact?: boolean;
  linkedProjects?: ProjectLink[];
}

/**
 * Renders a structured ExperienceHighlight with action → approach → outcome + metrics.
 * Used across experience page, homepage, and resume.
 */
export default function ExperienceHighlightCard({ highlight, compact = false, linkedProjects }: Props) {
  const { action, approach, outcome, metrics, projectIds } = highlight;
  const hasMetrics = !compact && metrics && metrics.length > 0;
  const hasProjectLinks = linkedProjects && linkedProjects.length > 0 && projectIds && projectIds.length > 0;

  return (
    <li className="rounded-sm border border-border bg-bg px-4 py-3 text-sm text-text-secondary">
      {/* Action — primary line */}
      <p className="font-medium text-text-primary">{action}</p>

      {/* Approach — supporting detail */}
      {approach && (
        <p className="mt-1 text-xs text-text-muted leading-relaxed">{approach}</p>
      )}

      {/* Outcome + Metrics row */}
      <div className="mt-2 flex flex-wrap items-center gap-2">
        {outcome && (
          <span className="text-xs text-text-secondary">{outcome}</span>
        )}
        {hasMetrics && (
          <span className="inline-flex gap-2">
            {metrics!.map((m, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 rounded-sm bg-accent/10 px-2 py-0.5 font-mono text-[11px] font-medium text-accent"
              >
                {m.before && m.after ? (
                  <>
                    <span className="text-text-muted line-through">{m.before}</span>
                    <span>→</span>
                    <span>{m.after}</span>
                  </>
                ) : (
                  <span>{m.value}</span>
                )}
                {m.label && (
                  <span className="text-text-muted">{m.label}</span>
                )}
              </span>
            ))}
          </span>
        )}
      </div>

      {/* Project cross-links */}
      {hasProjectLinks && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {projectIds!.map((pid) => {
            const project = linkedProjects!.find((p) => p.id === pid);
            if (!project) return null;
            return (
              <a
                key={pid}
                href={`/projects/${project.slug}`}
                className="inline-flex items-center gap-1 rounded-sm border border-accent/20 bg-accent/5 px-2 py-0.5 text-[10px] font-medium text-accent transition-colors hover:border-accent/40 hover:bg-accent/10"
              >
                <span aria-hidden="true">→</span>
                {project.title}
              </a>
            );
          })}
        </div>
      )}
    </li>
  );
}
