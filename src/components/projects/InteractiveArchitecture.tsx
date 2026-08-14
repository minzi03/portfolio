"use client";

import { useState } from "react";
import { useI18n } from "@/lib/i18n";
import Container from "@/components/ui/Container";
import { cn } from "@/lib/utils";

interface ArchitectureNode {
  id: string;
  label: string;
  type: "source" | "process" | "layer" | "serve" | "tool";
  detail: string;
  technologies?: string[];
  connections: string[];
}

const ARCHITECTURE_NODES: ArchitectureNode[] = [
  {
    id: "sources",
    label: "Data Sources",
    type: "source",
    detail: "16+ data sources including Oracle, PostgreSQL, MongoDB, REST APIs, and Kafka topics",
    technologies: ["Oracle", "PostgreSQL", "MongoDB", "REST API", "Kafka"],
    connections: ["ingest"],
  },
  {
    id: "ingest",
    label: "Ingestion",
    type: "process",
    detail: "Batch and CDC ingestion with Apache NiFi and Kafka Connect",
    technologies: ["Apache NiFi", "Kafka Connect", "CDC"],
    connections: ["bronze"],
  },
  {
    id: "bronze",
    label: "Bronze Layer",
    type: "layer",
    detail: "Raw ingested data with full history and audit trails",
    technologies: ["Apache Iceberg", "MinIO", "S3"],
    connections: ["silver"],
  },
  {
    id: "silver",
    label: "Silver Layer",
    type: "layer",
    detail: "Validated, deduplicated, and cleansed data",
    technologies: ["Apache Spark", "dbt", "Great Expectations"],
    connections: ["gold"],
  },
  {
    id: "gold",
    label: "Gold Layer",
    type: "layer",
    detail: "Business-ready dimensional models and aggregates",
    technologies: ["Apache Spark", "dbt", "Star Schema"],
    connections: ["analytics", "ml"],
  },
  {
    id: "analytics",
    label: "Analytics",
    type: "serve",
    detail: "Interactive dashboards and self-service BI",
    technologies: ["Trino", "Apache Superset", "Power BI"],
    connections: [],
  },
  {
    id: "ml",
    label: "ML/AI",
    type: "serve",
    detail: "Machine learning and AI workloads",
    technologies: ["MLflow", "Jupyter", "Python"],
    connections: [],
  },
  {
    id: "governance",
    label: "Governance",
    type: "tool",
    detail: "Data catalog, lineage, and access control",
    technologies: ["OpenMetadata", "Apache Atlas"],
    connections: ["bronze", "silver", "gold"],
  },
  {
    id: "orchestration",
    label: "Orchestration",
    type: "tool",
    detail: "Pipeline scheduling and monitoring",
    technologies: ["Apache Airflow", "dbt Cloud"],
    connections: ["ingest", "silver", "gold"],
  },
];

const typeStyles: Record<string, { bg: string; border: string; text: string }> = {
  source: { bg: "bg-purple/10", border: "border-purple/30", text: "text-purple" },
  process: { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent" },
  layer: { bg: "bg-blue/10", border: "border-blue/30", text: "text-blue" },
  serve: { bg: "bg-green/10", border: "border-green/30", text: "text-green" },
  tool: { bg: "bg-orange/10", border: "border-orange/30", text: "text-orange" },
};

export default function InteractiveArchitecture() {
  const { t } = useI18n();
  const [selectedNode, setSelectedNode] = useState<ArchitectureNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const handleNodeClick = (node: ArchitectureNode) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const isHighlighted = (nodeId: string) => {
    if (!selectedNode) return false;
    return (
      selectedNode.id === nodeId ||
      selectedNode.connections.includes(nodeId) ||
      ARCHITECTURE_NODES.find((n) => n.id === nodeId)?.connections.includes(selectedNode.id)
    );
  };

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
            {t("architecture.badge")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("architecture.title")}
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            {t("architecture.description")}
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Architecture Diagram */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-border bg-bg-surface p-6">
              <div className="mb-4 flex items-center justify-between">
                <p className="font-mono text-xs uppercase tracking-wider text-text-muted">
                  {t("architecture.diagramTitle")}
                </p>
                {selectedNode && (
                  <button
                    onClick={() => setSelectedNode(null)}
                    className="text-xs text-accent hover:text-accent-hover"
                  >
                    {t("architecture.clearSelection")}
                  </button>
                )}
              </div>

              {/* Main flow */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                {ARCHITECTURE_NODES.filter((n) => n.type !== "tool").map((node, i, arr) => {
                  const styles = typeStyles[node.type];
                  const highlighted = isHighlighted(node.id);
                  const isSelected = selectedNode?.id === node.id;
                  const isHovered = hoveredNode === node.id;

                  return (
                    <div key={node.id} className="flex items-center gap-2">
                      <button
                        onClick={() => handleNodeClick(node)}
                        onMouseEnter={() => setHoveredNode(node.id)}
                        onMouseLeave={() => setHoveredNode(null)}
                        className={cn(
                          "rounded-lg border px-4 py-3 font-mono text-xs font-medium transition-all",
                          styles.bg,
                          styles.border,
                          styles.text,
                          highlighted && "ring-2 ring-accent/50",
                          isSelected && "scale-105 shadow-lg",
                          isHovered && "scale-102"
                        )}
                      >
                        <div className="text-center">
                          <p className="font-semibold">{node.label}</p>
                          {isSelected && (
                            <p className="mt-1 text-[10px] opacity-75">
                              {node.detail}
                            </p>
                          )}
                        </div>
                      </button>
                      {i < arr.length - 1 && (
                        <span className="text-text-muted/50">→</span>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Tool nodes */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                {ARCHITECTURE_NODES.filter((n) => n.type === "tool").map((node) => {
                  const styles = typeStyles[node.type];
                  const highlighted = isHighlighted(node.id);
                  const isSelected = selectedNode?.id === node.id;

                  return (
                    <button
                      key={node.id}
                      onClick={() => handleNodeClick(node)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                      className={cn(
                        "rounded-lg border px-4 py-2 font-mono text-xs font-medium transition-all",
                        styles.bg,
                        styles.border,
                        styles.text,
                        highlighted && "ring-2 ring-accent/50",
                        isSelected && "scale-105 shadow-lg"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <span>⚙️</span>
                        <span>{node.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs text-text-muted">
                {Object.entries(typeStyles).map(([type, styles]) => (
                  <div key={type} className="flex items-center gap-2">
                    <span className={cn("h-3 w-3 rounded", styles.bg, styles.border, "border")} />
                    <span className="capitalize">{type}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Details panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-border bg-bg-surface p-6">
              {selectedNode ? (
                <>
                  <div className="mb-4">
                    <span
                      className={cn(
                        "inline-block rounded-full px-3 py-1 text-xs font-medium",
                        typeStyles[selectedNode.type].bg,
                        typeStyles[selectedNode.type].text
                      )}
                    >
                      {selectedNode.type}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-text-primary">
                    {selectedNode.label}
                  </h3>
                  <p className="mt-2 text-sm text-text-secondary">
                    {selectedNode.detail}
                  </p>

                  {selectedNode.technologies && selectedNode.technologies.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Technologies
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-md border border-border bg-bg px-2 py-1 text-xs text-text-muted"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedNode.connections.length > 0 && (
                    <div className="mt-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-text-muted">
                        Connected To
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {selectedNode.connections.map((connId) => {
                          const connNode = ARCHITECTURE_NODES.find((n) => n.id === connId);
                          if (!connNode) return null;
                          return (
                            <button
                              key={connId}
                              onClick={() => handleNodeClick(connNode)}
                              className="rounded-md border border-accent/20 bg-accent/10 px-2 py-1 text-xs text-accent hover:bg-accent/20"
                            >
                              {connNode.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-text-muted"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m9.124-2.376a4.5 4.5 0 00-6.364-6.364L4.5 8.25a4.5 4.5 0 006.364 6.364l4.5-4.5z"
                    />
                  </svg>
                  <p className="mt-4 text-sm text-text-muted">
                    {t("architecture.selectNode")}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
