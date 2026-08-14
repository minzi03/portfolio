import { ImageResponse } from "next/og";
import { projects } from "@/data/projects";

export const alt = "Data Engineering Case Study — Nguyen Minh Duy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CATEGORY_COLORS: Record<string, string> = {
  "data-platform": "#38bdf8",
  "cloud-data": "#a78bfa",
  "data-warehouse": "#4ade80",
  analytics: "#fbbf24",
  streaming: "#f472b6",
};

const SCOPE_LABELS: Record<string, string> = {
  production: "Production",
  "production-like": "Production-like",
  "portfolio-demo": "Demo",
  academic: "Academic",
};

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#0f172a",
            color: "white",
            fontSize: 32,
            fontFamily: "sans-serif",
          }}
        >
          Project Not Found
        </div>
      ),
      { ...size }
    );
  }

  const color = CATEGORY_COLORS[project.category] || "#38bdf8";
  const scopeLabel = SCOPE_LABELS[project.scope] || project.scope;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 14,
              color: "#64748b",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Data Engineering Portfolio
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 12,
              color: color,
              background: `${color}20`,
              padding: "6px 16px",
              borderRadius: 8,
            }}
          >
            {scopeLabel}
          </div>
        </div>

        {/* Accent line */}
        <div
          style={{
            display: "flex",
            width: 80,
            height: 4,
            background: color,
            marginBottom: 24,
            borderRadius: 2,
          }}
        />

        {/* Project title */}
        <div
          style={{
            display: "flex",
            fontSize: 44,
            fontWeight: 700,
            color: "white",
            lineHeight: 1.15,
            marginBottom: 16,
          }}
        >
          {project.title}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: "flex",
            fontSize: 18,
            color: "#94a3b8",
            lineHeight: 1.4,
            marginBottom: 32,
          }}
        >
          {project.subtitle}
        </div>

        {/* Spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* Tech stack tags */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 8,
            flexWrap: "wrap",
          }}
        >
          {project.tech.slice(0, 8).map((tech: string) => (
            <div
              key={tech}
              style={{
                display: "flex",
                fontSize: 13,
                color: "#e2e8f0",
                background: "rgba(255, 255, 255, 0.08)",
                padding: "6px 14px",
                borderRadius: 6,
              }}
            >
              {tech}
            </div>
          ))}
        </div>

        {/* Author */}
        <div
          style={{
            display: "flex",
            fontSize: 14,
            color: "#475569",
            marginTop: 24,
          }}
        >
          Nguyen Minh Duy
        </div>
      </div>
    ),
    { ...size }
  );
}
