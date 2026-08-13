"use client";

import { useState } from "react";

export type GraphNode = {
  id: string;
  label: string;
  type: string;
  description?: string;
  technology?: string[];
  metadata?: Record<string, unknown>;
};

export type GraphEdge = {
  source: string;
  target: string;
  label?: string;
};

export type GraphData = {
  title: string;
  nodes: GraphNode[];
  edges: GraphEdge[];
};

const typeColors: Record<string, { bg: string; border: string; text: string }> = {
  source:     { bg: "bg-purple/10",   border: "border-purple/30",   text: "text-purple" },
  processing: { bg: "bg-accent/10",   border: "border-accent/30",   text: "text-accent" },
  streaming:  { bg: "bg-accent/10",   border: "border-accent/30",   text: "text-accent" },
  cdc:        { bg: "bg-orange/10",   border: "border-orange/30",   text: "text-orange" },
  storage:    { bg: "bg-text-muted/10", border: "border-text-muted/30", text: "text-text-muted" },
  lakehouse:  { bg: "bg-green/10",    border: "border-green/30",    text: "text-green" },
  layer:      { bg: "bg-bg-elevated", border: "border-border",      text: "text-text-secondary" },
  query:      { bg: "bg-accent/10",   border: "border-accent/30",   text: "text-accent" },
  transformation: { bg: "bg-purple/10", border: "border-purple/30", text: "text-purple" },
  orchestration:  { bg: "bg-accent/10", border: "border-accent/30", text: "text-accent" },
  bi:         { bg: "bg-green/10",    border: "border-green/30",    text: "text-green" },
  governance: { bg: "bg-purple/10",   border: "border-purple/30",   text: "text-purple" },
  fact:       { bg: "bg-accent/15",   border: "border-accent/40",   text: "text-accent" },
  dimension:  { bg: "bg-bg-elevated", border: "border-border",      text: "text-text-secondary" },
};

function getNodeStyle(type: string) {
  return typeColors[type] || { bg: "bg-bg-elevated", border: "border-border", text: "text-text-secondary" };
}

export default function GraphExplorer({ data }: { data: GraphData }) {
  const [selected, setSelected] = useState<GraphNode | null>(null);

  // Group nodes by type for layout
  const grouped = data.nodes.reduce<Record<string, GraphNode[]>>((acc, node) => {
    (acc[node.type] ??= []).push(node);
    return acc;
  }, {});

  return (
    <div className="rounded-xl border border-border bg-bg-surface p-4 sm:p-6">
      <h3 className="mb-4 text-sm font-semibold text-text-primary">{data.title}</h3>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Graph */}
        <div className="flex-1">
          <div className="space-y-3">
            {Object.entries(grouped).map(([type, nodes]) => (
              <div key={type}>
                <p className="mb-1.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
                  {type}
                </p>
                <div className="flex flex-wrap gap-2">
                  {nodes.map((node) => {
                    const style = getNodeStyle(node.type);
                    const isSelected = selected?.id === node.id;
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelected(isSelected ? null : node)}
                        className={`min-h-[44px] rounded-sm border px-3 py-2 text-left text-xs font-medium transition-all ${
                          style.bg
                        } ${style.border} ${style.text} ${
                          isSelected ? "ring-2 ring-accent/50" : "hover:opacity-80"
                        }`}
                      >
                        {node.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Edges */}
          <div className="mt-4 rounded-sm border border-border bg-bg p-3">
            <p className="mb-2 font-mono text-[10px] uppercase tracking-wider text-text-muted">Flow</p>
            <div className="space-y-1">
              {data.edges.map((edge, i) => (
                <div key={i} className="flex flex-wrap items-center gap-1 text-xs text-text-muted">
                  <span className="font-mono text-text-secondary break-all">{edge.source}</span>
                  <span className="text-accent shrink-0">→</span>
                  <span className="font-mono text-text-secondary break-all">{edge.target}</span>
                  {edge.label && (
                    <span className="rounded bg-bg-elevated px-1.5 py-0.5 text-[10px]">
                      {edge.label}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail panel */}
        <div className="w-full shrink-0 lg:w-72">
          {selected ? (
            <div className="rounded-sm border border-border bg-bg p-4">
              <div className="flex items-center justify-between">
                <p className="font-mono text-xs font-semibold text-accent">{selected.label}</p>
                <button onClick={() => setSelected(null)} className="flex h-10 w-10 items-center justify-center rounded text-text-muted hover:text-text-primary">
                  ×
                </button>
              </div>
              <p className="mt-1 font-mono text-[10px] uppercase text-text-muted">{selected.type}</p>
              {selected.description && (
                <p className="mt-3 text-sm text-text-secondary">{selected.description}</p>
              )}
              {selected.technology && selected.technology.length > 0 && (
                <div className="mt-3">
                  <p className="text-[10px] uppercase text-text-muted">Technology</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {selected.technology.map((t) => (
                      <span key={t} className="rounded bg-bg-elevated px-1.5 py-0.5 font-mono text-[11px] text-text-secondary">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {/* Connected nodes */}
              <div className="mt-3">
                <p className="text-[10px] uppercase text-text-muted">Connections</p>
                <div className="mt-1 space-y-1">
                  {data.edges
                    .filter((e) => e.source === selected.id || e.target === selected.id)
                    .map((e, i) => {
                      const other = e.source === selected.id ? e.target : e.source;
                      const dir = e.source === selected.id ? "→" : "←";
                      return (
                        <div key={i} className="text-xs text-text-muted">
                          <span className="text-accent">{dir}</span>{" "}
                          <span className="font-mono text-text-secondary">{other}</span>
                          {e.label && <span className="ml-1 text-[10px]">({e.label})</span>}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          ) : (
            <div className="rounded-sm border border-dashed border-border bg-bg p-4 text-center text-sm text-text-muted">
              Click a node to see details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
