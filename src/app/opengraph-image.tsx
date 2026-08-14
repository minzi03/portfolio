import { ImageResponse } from "next/og";

export const alt =
  "Nguyen Minh Duy — Data Engineer Portfolio | ETL, Lakehouse, CDC Pipelines";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
          padding: 80,
          fontFamily: "sans-serif",
        }}
      >
        {/* Title */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 52,
              fontWeight: 700,
              lineHeight: 1.1,
              color: "white",
            }}
          >
            Nguyen Minh Duy
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 22,
              color: "#38bdf8",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Data Engineer
          </div>
        </div>

        {/* Accent line */}
        <div
          style={{
            display: "flex",
            width: 120,
            height: 4,
            background: "linear-gradient(90deg, #38bdf8, #a78bfa, #4ade80)",
            marginTop: 32,
            marginBottom: 32,
            borderRadius: 2,
          }}
        />

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: 20,
            color: "#94a3b8",
            lineHeight: 1.5,
            marginBottom: 40,
          }}
        >
          Transforming raw data into actionable insights
        </div>

        {/* Stats */}
        <div
          style={{
            display: "flex",
            gap: 48,
          }}
        >
          {[
            { value: "10", label: "Projects" },
            { value: "95M+", label: "Records" },
            { value: "28", label: "Credentials" },
            { value: "47", label: "Skills" },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 36,
                  fontWeight: 700,
                  color: "#38bdf8",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  display: "flex",
                  fontSize: 14,
                  color: "#64748b",
                  marginTop: 4,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
