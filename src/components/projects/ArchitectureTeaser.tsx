"use client";

import { useState } from "react";

interface FlowNode {
  id: string;
  label: string;
  type: "source" | "process" | "layer" | "serve";
  detail: string;
}

const FLOW_NODES: FlowNode[] = [
  { id: "sources", label: "Sources", type: "source", detail: "16 data sources" },
  { id: "ingest", label: "Spark + CDC", type: "process", detail: "Batch & streaming" },
  { id: "bronze", label: "Bronze", type: "layer", detail: "Raw ingested data" },
  { id: "silver", label: "Silver", type: "layer", detail: "Validated & deduped" },
  { id: "gold", label: "Gold", type: "layer", detail: "Business-ready models" },
  { id: "analytics", label: "Analytics", type: "serve", detail: "Trino + Superset" },
];

const typeStyles: Record<string, string> = {
  source: "border-purple/30 bg-purple/10 text-purple",
  process: "border-accent/30 bg-accent/10 text-accent",
  layer: "border-border bg-bg-elevated text-text-secondary",
  serve: "border-green/30 bg-green/10 text-green",
};

export default function ArchitectureTeaser() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const hoveredNode = FLOW_NODES.find((n) => n.id === hoveredId);

  return (
    <div className="rounded-lg border border-border bg-bg p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="font-mono text-[10px] uppercase tracking-wider text-text-muted">
          Architecture Flow
        </p>
        {hoveredNode && (
          <p className="text-[11px] text-text-muted transition-opacity">
            {hoveredNode.detail}
          </p>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        {FLOW_NODES.map((node, i) => (
          <div key={node.id} className="flex items-center gap-1.5">
            <button
              onMouseEnter={() => setHoveredId(node.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`rounded-sm border px-2.5 py-1.5 font-mono text-[10px] font-medium transition-all ${
                typeStyles[node.type]
              } ${hoveredId === node.id ? "ring-1 ring-accent/50 scale-105" : ""}`}
            >
              {node.label}
            </button>
            {i < FLOW_NODES.length - 1 && (
              <span
                aria-hidden="true"
                className="text-[10px] text-text-muted/50 shrink-0"
              >
                →
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
