"use client";

import { useEffect, useRef } from "react";
import type { Credential } from "@/data/credentials";
import { categoryLabels } from "@/data/credentials";
import { getProjectBySlug } from "@/data/projects";

interface CredentialModalProps {
  credential: Credential;
  onClose: () => void;
}

export default function CredentialModal({ credential, onClose }: CredentialModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const relatedProjects = credential.relatedProjects
    ?.map((slug) => getProjectBySlug(slug))
    .filter(Boolean);

  /* Focus the modal on mount */
  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  /* Escape key handler */
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      /* Focus trap: Tab cycles within modal */
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={credential.title}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-border bg-bg p-6 shadow-xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-text-muted transition-colors hover:bg-bg-surface hover:text-text-primary"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Header */}
        <p className="pr-8 font-mono text-xs uppercase tracking-wider text-accent">
          {credential.issuer}
        </p>
        <h2 className="mt-1 text-lg font-bold leading-snug text-text-primary">
          {credential.title}
        </h2>

        {/* Meta */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-secondary">
          {credential.issued && (
            <div>
              <span className="text-xs text-text-muted">Issued</span>
              <p>{credential.issued}</p>
            </div>
          )}
          {credential.expires && (
            <div>
              <span className="text-xs text-text-muted">Expires</span>
              <p>{credential.expires}</p>
            </div>
          )}
          <div>
            <span className="text-xs text-text-muted">Category</span>
            <p>{categoryLabels[credential.category]}</p>
          </div>
        </div>

        {/* Description */}
        {credential.description && (
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {credential.description}
          </p>
        )}

        {/* Skills */}
        {credential.skills && credential.skills.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Relevant skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {credential.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-lg border border-border bg-bg-surface px-2.5 py-1 text-sm text-text-secondary"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Related projects */}
        {relatedProjects && relatedProjects.length > 0 && (
          <div className="mt-5 rounded-xl border border-border bg-bg-surface p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
              Applied in portfolio
            </p>
            <ul className="space-y-1.5">
              {relatedProjects.map((p) => (
                <li key={p!.slug} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <a
                    href={`/projects/${p!.slug}`}
                    className="text-text-secondary transition-colors hover:text-accent"
                  >
                    {p!.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Evidence status */}
        <div className="mt-5 rounded-xl border border-border bg-bg-surface p-4">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-text-muted">
            Evidence
          </p>
          {credential.evidence === "public" && (
            <p className="text-sm text-text-secondary">
              This credential is publicly verifiable.
              {credential.verifyUrl && (
                <>
                  {" "}
                  <a
                    href={credential.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover"
                  >
                    Verify online ↗
                  </a>
                </>
              )}
            </p>
          )}
          {credential.evidence === "redacted" && (
            <p className="text-sm text-text-secondary">
              Sensitive information has been redacted. Original document available upon request.
            </p>
          )}
          {credential.evidence === "metadata-only" && (
            <p className="text-sm text-text-secondary">
              Summary shown above. Official document available upon request.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
