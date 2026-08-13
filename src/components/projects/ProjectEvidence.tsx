"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectEvidence as ProjectEvidenceType } from "@/data/types";

const TYPE_ICONS: Record<ProjectEvidenceType["type"], string> = {
  architecture: "◻",
  pipeline: "⟳",
  "data-model": "◇",
  dashboard: "📊",
  code: "⟨/⟩",
  terminal: ">_",
  diagram: "▭",
};

const TYPE_COLORS: Record<ProjectEvidenceType["type"], string> = {
  architecture: "text-purple-400",
  pipeline: "text-blue-400",
  "data-model": "text-emerald-400",
  dashboard: "text-amber-400",
  code: "text-text-primary",
  terminal: "text-green-400",
  diagram: "text-text-muted",
};

interface ProjectEvidenceProps {
  evidence: ProjectEvidenceType[];
}

export default function ProjectEvidence({ evidence }: ProjectEvidenceProps) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  if (evidence.length === 0) return null;

  const selected = evidence.find((e) => e.id === selectedId);

  function handleError(id: string) {
    setImageErrors((prev) => new Set(prev).add(id));
  }

  return (
    <section id="evidence">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
        <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-accent/10 font-mono text-[11px]">
          E
        </span>
        Evidence
      </h3>

      {/* Thumbnail grid */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {evidence.map((item) => {
          const hasError = imageErrors.has(item.id);
          const isSelected = selectedId === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setSelectedId(isSelected ? null : item.id)}
              className={`group overflow-hidden rounded-md border bg-bg-surface text-left transition-all ${
                isSelected
                  ? "border-accent ring-1 ring-accent/20"
                  : "border-border hover:border-accent/30"
              }`}
            >
              {/* Image or placeholder */}
              <div
                className={`relative overflow-hidden bg-bg ${
                  item.aspectRatio === "16:9"
                    ? "aspect-video"
                    : item.aspectRatio === "1:1"
                    ? "aspect-square"
                    : "aspect-[4/3]"
                }`}
              >
                {!hasError ? (
                  <Image
                    src={item.asset}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    onError={() => handleError(item.id)}
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="text-center">
                      <span className={`text-2xl ${TYPE_COLORS[item.type]}`}>
                        {TYPE_ICONS[item.type]}
                      </span>
                      <p className="mt-1 text-[10px] text-text-muted">No image</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-2.5">
                <div className="flex items-center gap-1.5">
                  <span className={`text-xs ${TYPE_COLORS[item.type]}`}>
                    {TYPE_ICONS[item.type]}
                  </span>
                  <h4 className="text-xs font-medium text-text-primary line-clamp-1">
                    {item.title}
                  </h4>
                </div>
                {item.description && (
                  <p className="mt-0.5 text-[10px] text-text-muted line-clamp-2">
                    {item.description}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {/* Expanded view */}
      {selected && (
        <div className="mt-4 rounded-md border border-border bg-bg-surface p-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className={`text-sm ${TYPE_COLORS[selected.type]}`}>
                  {TYPE_ICONS[selected.type]}
                </span>
                <h4 className="text-sm font-semibold text-text-primary">
                  {selected.title}
                </h4>
              </div>
              {selected.description && (
                <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                  {selected.description}
                </p>
              )}
            </div>
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="flex h-6 w-6 shrink-0 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-bg hover:text-text-primary"
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          {/* Full image */}
          <div className="mt-3 overflow-hidden rounded-sm border border-border">
            {!imageErrors.has(selected.id) ? (
              <Image
                src={selected.asset}
                alt={selected.title}
                width={1200}
                height={675}
                className="h-auto w-full object-contain"
                loading="lazy"
                onError={() => handleError(selected.id)}
              />
            ) : (
              <div className="flex h-64 w-full items-center justify-center bg-bg">
                <div className="text-center">
                  <span className={`text-4xl ${TYPE_COLORS[selected.type]}`}>
                    {TYPE_ICONS[selected.type]}
                  </span>
                  <p className="mt-2 text-sm text-text-muted">
                    Evidence file not yet available
                  </p>
                  <p className="mt-1 text-xs text-text-muted">
                    Place file at: {selected.asset}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
