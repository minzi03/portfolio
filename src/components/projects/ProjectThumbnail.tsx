"use client";

import type { ProjectCategory } from "@/data/types";

/**
 * SVG thumbnail that visually represents a project's data architecture category.
 * Pure SVG — no images needed.
 */

interface ThumbnailProps {
  category: ProjectCategory;
  tech: string[];
  className?: string;
}

const CATEGORY_PALETTES: Record<ProjectCategory, string[]> = {
  "data-platform": ["#38bdf8", "#0ea5e9", "#0284c7"],
  streaming: ["#a78bfa", "#8b5cf6", "#7c3aed"],
  "cloud-data": ["#4ade80", "#22c55e", "#16a34a"],
  "data-warehouse": ["#fb923c", "#f97316", "#ea580c"],
  analytics: ["#f472b6", "#ec4899", "#db2777"],
};

function DataPlatformThumb({ colors }: { colors: string[] }) {
  return (
    <>
      {/* Ingestion layer */}
      <rect x="8" y="12" width="22" height="8" rx="2" fill={colors[0]} opacity="0.3" />
      <rect x="10" y="14" width="4" height="4" rx="1" fill={colors[0]} />
      <rect x="16" y="14" width="4" height="4" rx="1" fill={colors[0]} opacity="0.7" />
      <rect x="22" y="14" width="4" height="4" rx="1" fill={colors[0]} opacity="0.5" />

      {/* Arrow */}
      <line x1="19" y1="22" x2="19" y2="28" stroke={colors[1]} strokeWidth="1.5" />

      {/* Process layer */}
      <rect x="8" y="28" width="22" height="8" rx="2" fill={colors[1]} opacity="0.3" />
      <rect x="10" y="30" width="6" height="4" rx="1" fill={colors[1]} />
      <rect x="18" y="30" width="10" height="4" rx="1" fill={colors[1]} opacity="0.6" />

      {/* Arrow */}
      <line x1="19" y1="38" x2="19" y2="44" stroke={colors[2]} strokeWidth="1.5" />

      {/* Storage layer */}
      <rect x="8" y="44" width="22" height="8" rx="2" fill={colors[2]} opacity="0.3" />
      <circle cx="14" cy="48" r="2.5" fill={colors[2]} />
      <circle cx="24" cy="48" r="2.5" fill={colors[2]} opacity="0.6" />

      {/* Arrow */}
      <line x1="19" y1="54" x2="19" y2="60" stroke={colors[0]} strokeWidth="1.5" />

      {/* Serve layer */}
      <rect x="10" y="60" width="18" height="6" rx="2" fill={colors[0]} opacity="0.4" />
    </>
  );
}

function StreamingThumb({ colors }: { colors: string[] }) {
  return (
    <>
    {/* Left: producers */}
    <rect x="4" y="20" width="12" height="6" rx="2" fill={colors[0]} opacity="0.4" />
    <rect x="4" y="32" width="12" height="6" rx="2" fill={colors[0]} opacity="0.3" />
    <rect x="4" y="44" width="12" height="6" rx="2" fill={colors[0]} opacity="0.2" />

    {/* Center: stream processing */}
    <polygon points="22,18 32,38 22,58 12,38" fill={colors[1]} opacity="0.3" />
    <polygon points="22,24 28,38 22,52 16,38" fill={colors[1]} opacity="0.5" />
    <circle cx="22" cy="38" r="3" fill={colors[1]} />

    {/* Right: consumers */}
    <rect x="36" y="20" width="10" height="6" rx="2" fill={colors[2]} opacity="0.4" />
    <rect x="36" y="32" width="10" height="6" rx="2" fill={colors[2]} opacity="0.3" />
    <rect x="36" y="44" width="10" height="6" rx="2" fill={colors[2]} opacity="0.2" />

    {/* Arrows left → center */}
    <line x1="16" y1="23" x2="18" y2="34" stroke={colors[0]} strokeWidth="1" />
    <line x1="16" y1="35" x2="18" y2="37" stroke={colors[0]} strokeWidth="1" />
    <line x1="16" y1="47" x2="18" y2="42" stroke={colors[0]} strokeWidth="1" />

    {/* Arrows center → right */}
    <line x1="26" y1="34" x2="36" y2="23" stroke={colors[2]} strokeWidth="1" />
    <line x1="26" y1="37" x2="36" y2="35" stroke={colors[2]} strokeWidth="1" />
    <line x1="26" y1="42" x2="36" y2="47" stroke={colors[2]} strokeWidth="1" />
    </>
  );
}

function CloudDataThumb({ colors }: { colors: string[] }) {
  return (
    <>
    {/* Cloud shape */}
    <ellipse cx="24" cy="24" rx="16" ry="10" fill={colors[0]} opacity="0.2" />
    <circle cx="16" cy="22" r="8" fill={colors[0]} opacity="0.15" />
    <circle cx="30" cy="22" r="8" fill={colors[0]} opacity="0.15" />
    <text x="24" y="28" textAnchor="middle" fill={colors[0]} fontSize="8" fontFamily="monospace">☁</text>

    {/* Data flow down */}
    <line x1="24" y1="34" x2="24" y2="42" stroke={colors[1]} strokeWidth="1.5" />
    <polygon points="22,40 24,44 26,40" fill={colors[1]} />

    {/* Storage nodes */}
    <circle cx="12" cy="52" r="5" fill={colors[1]} opacity="0.4" />
    <circle cx="24" cy="52" r="5" fill={colors[1]} opacity="0.6" />
    <circle cx="36" cy="52" r="5" fill={colors[1]} opacity="0.4" />

    {/* Connecting lines */}
    <line x1="12" y1="47" x2="12" y2="46" stroke={colors[2]} strokeWidth="1" />
    <line x1="24" y1="47" x2="24" y2="46" stroke={colors[2]} strokeWidth="1" />
    <line x1="36" y1="47" x2="36" y2="46" stroke={colors[2]} strokeWidth="1" />
    </>
  );
}

function DataWarehouseThumb({ colors }: { colors: string[] }) {
  return (
    <>
    {/* Star schema center */}
    <rect x="16" y="30" width="16" height="12" rx="2" fill={colors[1]} opacity="0.5" />
    <text x="24" y="39" textAnchor="middle" fill={colors[1]} fontSize="6" fontWeight="bold" fontFamily="monospace">DW</text>

    {/* Fact table */}
    <rect x="18" y="46" width="12" height="8" rx="1" fill={colors[0]} opacity="0.3" />
    <line x1="24" y1="42" x2="24" y2="46" stroke={colors[0]} strokeWidth="1" />

    {/* Dimension tables */}
    <rect x="4" y="14" width="10" height="6" rx="1" fill={colors[2]} opacity="0.3" />
    <line x1="12" y1="20" x2="18" y2="30" stroke={colors[2]} strokeWidth="1" />

    <rect x="34" y="14" width="10" height="6" rx="1" fill={colors[2]} opacity="0.3" />
    <line x1="36" y1="20" x2="30" y2="30" stroke={colors[2]} strokeWidth="1" />

    <rect x="4" y="46" width="10" height="6" rx="1" fill={colors[2]} opacity="0.2" />
    <line x1="14" y1="49" x2="18" y2="49" stroke={colors[2]} strokeWidth="1" />

    <rect x="34" y="46" width="10" height="6" rx="1" fill={colors[2]} opacity="0.2" />
    <line x1="34" y1="49" x2="30" y2="49" stroke={colors[2]} strokeWidth="1" />
    </>
  );
}

function AnalyticsThumb({ colors }: { colors: string[] }) {
  return (
    <>
    {/* Bar chart */}
    <rect x="6" y="36" width="5" height="20" rx="1" fill={colors[0]} opacity="0.3" />
    <rect x="13" y="28" width="5" height="28" rx="1" fill={colors[0]} opacity="0.5" />
    <rect x="20" y="20" width="5" height="36" rx="1" fill={colors[0]} opacity="0.7" />
    <rect x="27" y="32" width="5" height="24" rx="1" fill={colors[1]} opacity="0.5" />
    <rect x="34" y="24" width="5" height="32" rx="1" fill={colors[1]} opacity="0.6" />

    {/* Trend line */}
    <polyline
      points="8,34 15,26 22,18 29,30 36,22"
      fill="none"
      stroke={colors[2]}
      strokeWidth="1.5"
      strokeLinecap="round"
    />

    {/* Data points */}
    <circle cx="8" cy="34" r="2" fill={colors[2]} />
    <circle cx="15" cy="26" r="2" fill={colors[2]} />
    <circle cx="22" cy="18" r="2" fill={colors[2]} />
    <circle cx="29" cy="30" r="2" fill={colors[2]} />
    <circle cx="36" cy="22" r="2" fill={colors[2]} />
    </>
  );
}

const THUMBNAILS: Record<ProjectCategory, React.FC<{ colors: string[] }>> = {
  "data-platform": DataPlatformThumb,
  streaming: StreamingThumb,
  "cloud-data": CloudDataThumb,
  "data-warehouse": DataWarehouseThumb,
  analytics: AnalyticsThumb,
};

export default function ProjectThumbnail({ category, tech, className = "" }: ThumbnailProps) {
  const colors = CATEGORY_PALETTES[category];
  const Thumb = THUMBNAILS[category];

  return (
    <div
      className={`relative overflow-hidden rounded-md border border-border bg-bg-surface ${className}`}
    >
      <svg
        viewBox="0 0 48 72"
        className="h-full w-full"
        aria-hidden="true"
      >
        <Thumb colors={colors} />

        {/* Tech labels */}
        {tech.slice(0, 3).map((t, i) => (
          <text
            key={t}
            x={8 + i * 14}
            y={68}
            fill={colors[i % 3]}
            fontSize="4"
            fontFamily="monospace"
            opacity="0.6"
          >
            {t.length > 6 ? t.slice(0, 5) : t}
          </text>
        ))}
      </svg>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg/80" />
    </div>
  );
}
