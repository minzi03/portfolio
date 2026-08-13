import type { TrustLevel } from "@/data/credentials";

const TRUST_CONFIG: Record<
  TrustLevel,
  { label: string; icon: string; className: string }
> = {
  verified: {
    label: "Verified",
    icon: "✓",
    className:
      "border-green-500/30 bg-green-500/10 text-green-400",
  },
  evidence: {
    label: "Evidence Available",
    icon: "▣",
    className:
      "border-blue-500/30 bg-blue-500/10 text-blue-400",
  },
  redacted: {
    label: "Redacted Evidence",
    icon: "🔒",
    className:
      "border-amber-500/30 bg-amber-500/10 text-amber-400",
  },
  metadata: {
    label: "Metadata Only",
    icon: "📋",
    className:
      "border-border text-text-muted",
  },
};

export default function CredentialTrustBadge({
  level,
  className = "",
}: {
  level: TrustLevel;
  className?: string;
}) {
  const config = TRUST_CONFIG[level];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded border px-2 py-0.5 text-[10px] font-medium ${config.className} ${className}`}
    >
      {config.icon} {config.label}
    </span>
  );
}
