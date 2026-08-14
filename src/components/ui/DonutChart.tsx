"use client";

import { useEffect, useRef, useState } from "react";

interface DonutSegment {
  label: string;
  value: number;
  color: string; // Tailwind color class (e.g., "text-accent")
}

interface DonutChartProps {
  segments: DonutSegment[];
  size?: number;
  thickness?: number;
}

/**
 * SVG donut chart with animated segment reveal.
 * Pure SVG — no charting library needed.
 */
export default function DonutChart({
  segments,
  size = 120,
  thickness = 14,
}: DonutChartProps) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  const total = segments.reduce((sum, s) => sum + s.value, 0);
  const radius = (size - thickness) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Build segments
  let accumulated = 0;
  const paths = segments.map((seg) => {
    const pct = seg.value / total;
    const dashLength = pct * circumference;
    const dashOffset = -accumulated * circumference;
    accumulated += pct;

    return {
      ...seg,
      dashLength,
      dashOffset,
      pct,
    };
  });

  return (
    <div className="flex items-center gap-4">
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="shrink-0"
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={thickness}
          className="text-border/30"
        />

        {/* Animated segments */}
        {paths.map((seg, i) => (
          <circle
            key={seg.label}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={`var(--donut-${i})`}
            strokeWidth={thickness}
            strokeDasharray={`${animated ? seg.dashLength : 0} ${circumference}`}
            strokeDashoffset={seg.dashOffset}
            strokeLinecap="butt"
            style={{
              transition: `stroke-dasharray 0.8s ease ${i * 0.15}s`,
              // Map Tailwind color classes to CSS variables
              [`--donut-${i}`]: getColorValue(seg.color),
            }}
          />
        ))}
      </svg>

      {/* Legend */}
      <div className="space-y-1.5">
        {segments.map((seg, i) => (
          <div key={seg.label} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-sm"
              style={{ backgroundColor: getColorValue(seg.color) }}
            />
            <span className="text-text-secondary">{seg.label}</span>
            <span className="font-mono text-text-muted">{seg.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Map Tailwind color classes to actual CSS color values.
 * Handles the project's custom theme colors.
 */
function getColorValue(twClass: string): string {
  const colorMap: Record<string, string> = {
    accent: "var(--color-accent, #6366f1)",
    green: "var(--color-green, #22c55e)",
    purple: "var(--color-purple, #a855f7)",
    orange: "var(--color-orange, #f97316)",
    blue: "var(--color-blue, #3b82f6)",
    red: "var(--color-red, #ef4444)",
    yellow: "var(--color-yellow, #eab308)",
    teal: "var(--color-teal, #14b8a6)",
    pink: "var(--color-pink, #ec4899)",
  };

  // Extract color name from class like "text-accent" or "bg-accent"
  const clean = twClass.replace(/^(text|bg|border)-/, "");
  return colorMap[clean] || colorMap.accent;
}
