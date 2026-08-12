"use client";

import type { Credential } from "@/data/credentials";
import { categoryLabels } from "@/data/credentials";

interface CredentialCardProps {
  credential: Credential;
  onClick: () => void;
}

export default function CredentialCard({ credential, onClick }: CredentialCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group w-full rounded-xl border border-border bg-bg-surface p-5 text-left transition-colors hover:border-accent/30"
    >
      {/* Issuer badge */}
      <p className="mb-2 font-mono text-[11px] uppercase tracking-wider text-accent">
        {credential.issuer}
      </p>

      {/* Title */}
      <h3 className="text-sm font-semibold leading-snug text-text-primary group-hover:text-accent">
        {credential.title}
      </h3>

      {/* Date + Category */}
      <div className="mt-2 flex items-center gap-2 text-xs text-text-muted">
        {credential.issued && <span>{credential.issued}</span>}
        <span className="h-1 w-1 rounded-full bg-text-muted" />
        <span>{categoryLabels[credential.category]}</span>
      </div>

      {/* Skills preview */}
      {credential.skills && credential.skills.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {credential.skills.slice(0, 4).map((skill) => (
            <span
              key={skill}
              className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-text-muted"
            >
              {skill}
            </span>
          ))}
          {credential.skills.length > 4 && (
            <span className="rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
              +{credential.skills.length - 4}
            </span>
          )}
        </div>
      )}

      {/* Evidence indicator */}
      {credential.evidence === "redacted" && (
        <p className="mt-2 text-[10px] text-text-muted">🔒 Sensitive — redacted</p>
      )}
      {credential.evidence === "metadata-only" && (
        <p className="mt-2 text-[10px] text-text-muted">📋 Metadata only</p>
      )}
    </button>
  );
}
