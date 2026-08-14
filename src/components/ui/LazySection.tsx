"use client";

import dynamic from "next/dynamic";

/* ── Lazy-loaded components (client-side only) ── */

export const LazyCommandPalette = dynamic(
  () => import("@/components/ui/CommandPalette"),
  {
    ssr: false,
    loading: () => (
      <button
        className="rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-2 py-1.5 text-xs text-zinc-500 opacity-50"
        disabled
        aria-label="Loading command palette"
      >
        ⌘K
      </button>
    ),
  }
);

export const LazyProjectGrid = dynamic(
  () => import("@/components/projects/ProjectGrid"),
  {
    ssr: false,
    loading: () => (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-2xl bg-zinc-800/30"
          />
        ))}
      </div>
    ),
  }
);

export const LazySkillsProficiency = dynamic(
  () => import("@/components/skills/SkillsProficiency"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse rounded-2xl bg-zinc-800/30" />
    ),
  }
);

export const LazyGraphExplorer = dynamic(
  () => import("@/components/graphs/graph-explorer"),
  {
    ssr: false,
    loading: () => (
      <div className="h-80 animate-pulse rounded-xl border border-zinc-700/30 bg-zinc-800/20" />
    ),
  }
);

export const LazyProjectEvidence = dynamic(
  () => import("@/components/projects/ProjectEvidence"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 animate-pulse rounded-xl bg-zinc-800/20" />
    ),
  }
);

export const LazyInteractiveDiagram = dynamic(
  () => import("@/components/graphs/InteractiveDiagram"),
  {
    ssr: false,
    loading: () => (
      <div className="h-96 animate-pulse rounded-xl border border-zinc-700/30 bg-zinc-800/20" />
    ),
  }
);
