import type { ProjectStatus, ProjectScope } from "@/data/types";

const STATUS_LABELS: Record<ProjectStatus, string> = {
  complete: "Complete",
  "in-progress": "In Progress",
  archived: "Archived",
};

const SCOPE_LABELS: Record<ProjectScope, string> = {
  production: "Production",
  "production-like": "Production-Like",
  "portfolio-demo": "Portfolio Demo",
  academic: "Academic",
};

export default function ProjectStatusBadge({
  status,
  scope,
}: {
  status: ProjectStatus;
  scope: ProjectScope;
}) {
  return (
    <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider">
      <span className="text-text-muted">{STATUS_LABELS[status]}</span>
      <span className="text-text-muted/40">·</span>
      <span className="text-text-muted">{SCOPE_LABELS[scope]}</span>
    </div>
  );
}
