import type { ExperienceHighlight } from "@/data/types";

interface Props {
  highlight: ExperienceHighlight;
  compact?: boolean;
}

/**
 * Renders a structured ExperienceHighlight with action → approach → outcome + metrics.
 * Used across experience page, homepage, and resume.
 */
export default function ExperienceHighlightCard({ highlight, compact = false }: Props) {
  const { action, approach, outcome, metrics } = highlight;
  const hasMetrics = !compact && metrics && metrics.length > 0;

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
    </li>
  );
}
