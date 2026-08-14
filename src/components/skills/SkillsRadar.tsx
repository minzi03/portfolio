"use client";

import { useMemo } from "react";
import { useI18n } from "@/lib/i18n";
import { skillCategories } from "@/data/skills";
import Container from "@/components/ui/Container";

interface SkillData {
  name: string;
  value: number;
  category: string;
}

export default function SkillsRadar() {
  const { t } = useI18n();

  const skillData = useMemo(() => {
    const data: SkillData[] = [];

    skillCategories.forEach((category) => {
      category.skills.forEach((skill) => {
        // Convert skill level to numeric value
        const levelValue = skill.level === "professional" ? 5 : skill.level === "project" ? 3 : 1;
        data.push({
          name: skill.name,
          value: levelValue,
          category: category.name,
        });
      });
    });

    return data;
  }, []);

  // Group skills by category for display
  const skillsByCategory = useMemo(() => {
    const grouped: Record<string, SkillData[]> = {};
    skillData.forEach((skill) => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  }, [skillData]);

  // Generate radar chart data points
  const radarPoints = useMemo(() => {
    const categories = Object.keys(skillsByCategory);
    const angleStep = (2 * Math.PI) / categories.length;
    const centerX = 150;
    const centerY = 150;
    const maxRadius = 120;

    return categories.map((category, index) => {
      const skills = skillsByCategory[category];
      const avgValue = skills.reduce((sum, s) => sum + s.value, 0) / skills.length;
      const normalizedValue = avgValue / 5; // Normalize to 0-1

      const angle = angleStep * index - Math.PI / 2;
      const x = centerX + maxRadius * normalizedValue * Math.cos(angle);
      const y = centerY + maxRadius * normalizedValue * Math.sin(angle);

      return {
        category,
        x,
        y,
        value: avgValue,
        skills,
        angle: (angle * 180) / Math.PI,
      };
    });
  }, [skillsByCategory]);

  // Generate polygon path for radar
  const radarPath = useMemo(() => {
    if (radarPoints.length === 0) return "";
    const points = radarPoints.map((p) => `${p.x},${p.y}`).join(" ");
    return `M ${points} Z`;
  }, [radarPoints]);

  // Generate grid circles
  const gridCircles = [0.25, 0.5, 0.75, 1];

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
            {t("skills.radar.badge")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("skills.radar.title")}
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            {t("skills.radar.description")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Radar Chart */}
          <div className="flex items-center justify-center">
            <svg viewBox="0 0 300 300" className="w-full max-w-md">
              {/* Grid circles */}
              {gridCircles.map((ratio) => (
                <circle
                  key={ratio}
                  cx="150"
                  cy="150"
                  r={120 * ratio}
                  fill="none"
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth="1"
                />
              ))}

              {/* Grid lines */}
              {radarPoints.map((point, index) => (
                <line
                  key={index}
                  x1="150"
                  y1="150"
                  x2={point.x}
                  y2={point.y}
                  stroke="currentColor"
                  className="text-border"
                  strokeWidth="1"
                />
              ))}

              {/* Radar polygon */}
              <path
                d={radarPath}
                fill="currentColor"
                className="text-accent/20"
                stroke="currentColor"
                strokeWidth="2"
              />

              {/* Data points */}
              {radarPoints.map((point, index) => (
                <g key={index}>
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r="4"
                    fill="currentColor"
                    className="text-accent"
                  />
                  {/* Labels */}
                  <text
                    x={
                      150 +
                      140 * Math.cos((point.angle * Math.PI) / 180)
                    }
                    y={
                      150 +
                      140 * Math.sin((point.angle * Math.PI) / 180)
                    }
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-text-secondary text-[10px] font-medium"
                  >
                    {point.category}
                  </text>
                </g>
              ))}
            </svg>
          </div>

          {/* Skills by category */}
          <div className="space-y-6">
            {Object.entries(skillsByCategory).map(([category, skills]) => (
              <div key={category}>
                <h3 className="mb-3 text-sm font-semibold text-text-primary">
                  {category}
                </h3>
                <div className="space-y-2">
                  {skills.map((skill) => (
                    <div key={skill.name} className="flex items-center gap-3">
                      <span className="w-32 text-xs text-text-muted truncate">
                        {skill.name}
                      </span>
                      <div className="flex-1 h-2 rounded-full bg-bg-surface overflow-hidden">
                        <div
                          className="h-full rounded-full bg-accent transition-all duration-500"
                          style={{ width: `${(skill.value / 5) * 100}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs font-mono text-text-muted">
                        {skill.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
