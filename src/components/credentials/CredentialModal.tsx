"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Credential } from "@/data/credentials";
import { categoryLabels, categoryMeta, credentialTypeLabels } from "@/data/credentials";
import { getProjectBySlug } from "@/data/projects";
import CredentialTrustBadge from "./CredentialTrustBadge";

interface CredentialModalProps {
  credential: Credential;
  onClose: () => void;
}

export default function CredentialModal({ credential, onClose }: CredentialModalProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const relatedProjects = credential.relatedProjects
    ?.map((slug) => getProjectBySlug(slug))
    .filter(Boolean);

  /* ─── Derived evidence state ─── */

  const confirmedAssets = credential.evidenceAssets.filter(
    (a) => a.reviewState === "confirmed"
  );
  const pendingAssets = credential.evidenceAssets.filter(
    (a) => a.reviewState === "pending"
  );
  const hasRenderableEvidence = confirmedAssets.length > 0;
  const hasPendingEvidence = pendingAssets.length > 0;

  const hasVerifyUrl = Boolean(credential.verifyUrl);
  const isVerified = credential.evidence === "verified" && hasVerifyUrl;

  const meta = categoryMeta[credential.category];

  /* ─── Focus management ─── */

  useEffect(() => {
    containerRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "Tab" && containerRef.current) {
        const focusable = containerRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        // Always trap focus within the modal
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        } else if (!containerRef.current.contains(document.activeElement)) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  /* ─── Render ─── */

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`${credential.title} — evidence details`}
    >
      <div
        ref={containerRef}
        tabIndex={-1}
        className="relative max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-xl border border-border bg-bg p-6 shadow-xl focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-bg-surface hover:text-text-primary"
          aria-label="Close"
        >
          ✕
        </button>

        {/* ─── Credential header ─── */}
        <div className="flex items-center gap-2">
          <span className={`inline-flex h-10 w-10 items-center justify-center rounded-sm ${meta.bg} text-base ${meta.color}`}>
            {meta.icon}
          </span>
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-accent">
              {credential.issuer}
            </p>
            <p className="text-[10px] text-text-muted">
              {credentialTypeLabels[credential.credentialType]}
            </p>
          </div>
        </div>

        <h2 className="mt-3 text-lg font-bold leading-snug text-text-primary">
          {credential.title}
        </h2>

        {/* Meta row */}
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-text-secondary">
          {credential.issued && (
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">Issued</span>
              <p>{credential.issued}</p>
            </div>
          )}
          {credential.expires && (
            <div>
              <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">Expires</span>
              <p>{credential.expires}</p>
            </div>
          )}
          <div>
            <span className="text-[10px] font-medium uppercase tracking-wider text-text-muted">Category</span>
            <p className={meta.color}>{categoryLabels[credential.category]}</p>
          </div>
        </div>

        {credential.description && (
          <p className="mt-4 text-sm leading-relaxed text-text-secondary">
            {credential.description}
          </p>
        )}

        {/* Skills */}
        {credential.skills && credential.skills.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Relevant skills
            </p>
            <div className="flex flex-wrap gap-1.5">
              {credential.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-sm border border-border bg-bg-surface px-2.5 py-1 text-sm text-text-secondary"
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
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
              Applied in portfolio
            </p>
            <ul className="space-y-1.5">
              {relatedProjects.map((p) => (
                <li key={p!.slug} className="flex items-center gap-2 text-sm">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  <Link
                    href={`/projects/${p!.slug}`}
                    className="text-text-secondary transition-colors hover:text-accent"
                  >
                    {p!.title}
                  </Link>
                  <span className="text-[10px] text-text-muted">· {p!.scope}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* ─── Trust section ─── */}
        <div className="mt-5 rounded-xl border border-border bg-bg-surface p-4">
          <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Trust & Verification
          </p>
          <div className="flex items-center gap-3">
            <CredentialTrustBadge level={credential.evidence} />
            {hasVerifyUrl && (
              <a
                href={credential.verifyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20"
              >
                {isVerified ? "Verify on issuer site" : "View credential"} ↗
              </a>
            )}
          </div>
          {credential.verifyUrl && (
            <p className="mt-2 text-[10px] text-text-muted break-all">
              {credential.verifyUrl}
            </p>
          )}
        </div>

        {/* ─── Evidence section ─── */}
        <div className="mt-4 rounded-xl border border-border bg-bg-surface p-4">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-wider text-text-muted">
            Evidence
          </p>

          {hasRenderableEvidence ? (
            <div className="space-y-3">
              {confirmedAssets.map((ev, i) => {
                const isPdf = ev.asset.endsWith(".pdf");
                const isImage = /\.(jpg|jpeg|png|webp)$/i.test(ev.asset);
                const basename = ev.asset.split("/").pop() ?? "";

                return (
                  <div key={i}>
                    {isImage && (
                      <div className="overflow-hidden rounded-sm border border-border">
                        <Image
                          src={ev.asset}
                          alt={`${credential.title} — certificate issued by ${credential.issuer}`}
                          width={600}
                          height={420}
                          className="h-auto w-full object-contain"
                          loading="lazy"
                        />
                      </div>
                    )}

                    {isPdf && (
                      <a
                        href={ev.asset}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 rounded-sm border border-border bg-bg px-4 py-3 text-sm text-text-secondary transition-colors hover:border-accent/30 hover:text-accent"
                      >
                        <span className="text-2xl">📄</span>
                        <div>
                          <p className="font-medium">Evidence document</p>
                          <p className="text-xs text-text-muted">{basename}</p>
                        </div>
                        <span className="ml-auto text-xs">Open ↗</span>
                      </a>
                    )}

                    <p className="text-xs text-text-muted">
                      {isPdf
                        ? "PDF document — open in new tab to view full evidence."
                        : "Certificate image — visual evidence of credential completion."}
                    </p>
                  </div>
                );
              })}
            </div>
          ) : credential.evidence === "redacted" ? (
            <p className="text-sm text-text-secondary">
              Redacted for privacy — sensitive identifiers have been removed from the public derivative.
              Original document available upon request.
            </p>
          ) : credential.evidence === "metadata" ? (
            <p className="text-sm text-text-secondary">
              No public evidence file is currently exposed.
              Credential metadata is retained for portfolio context.
            </p>
          ) : (
            <p className="text-sm text-text-secondary">
              Evidence not yet available for this credential.
            </p>
          )}

          {/* Pending evidence notice */}
          {hasPendingEvidence && (
            <p className="mt-3 text-xs text-text-muted">
              Additional evidence prepared — awaiting privacy review before public display.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
