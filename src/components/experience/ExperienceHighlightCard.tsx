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

  return (
    <li className="flex gap-2 text-sm text-text-secondary">
      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
      <span>
        <span className="font-medium text-text-primary">{action}</span>
        {approach && (
          <>
            {" — "}
            <span className="text-text-secondary">{approach}</span>
          </>
        )}
        {" "}
        <span className="text-text-muted">{outcome}</span>
        {!compact && metrics && metrics.length > 0 && (
          <span className="ml-1 inline-flex gap-2">
            {metrics.map((m, i) => (
              <span key={i} className="font-mono text-[11px] text-accent">
                {m.before && m.after
                  ? `${m.before} → ${m.after}`
                  : m.value}
                <span className="ml-0.5 text-text-muted">{m.label}</span>
              </span>
            ))}
          </span>
        )}
      </span>
    </li>
  );
}
