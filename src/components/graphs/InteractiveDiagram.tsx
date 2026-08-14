"use client";

import { useState, useRef, useCallback, useMemo } from "react";

/* ── Types ── */
interface DiagramNode {
  id: string;
  label: string;
  type: string;
  description?: string;
  tech?: string[];
  technology?: string[];
}

interface DiagramLayer {
  id: string;
  label: string;
  nodes: DiagramNode[];
}

interface Connection {
  from: string;
  to: string;
  label?: string;
}

interface DiagramData {
  title: string;
  description?: string;
  layers?: DiagramLayer[];
  nodes?: DiagramNode[];
  connections?: Connection[];
  edges?: { source: string; target: string; label?: string }[];
}

/* ── Node type colors ── */
const TYPE_COLORS: Record<string, string> = {
  source: "#a78bfa",
  processing: "#38bdf8",
  streaming: "#38bdf8",
  cdc: "#fb923c",
  storage: "#94a3b8",
  lakehouse: "#4ade80",
  layer: "#64748b",
  query: "#38bdf8",
  transformation: "#a78bfa",
  orchestration: "#38bdf8",
  bi: "#4ade80",
  governance: "#a78bfa",
  fact: "#38bdf8",
  dimension: "#64748b",
};

function getNodeColor(type: string): string {
  return TYPE_COLORS[type] || "#64748b";
}

/* ── Flatten layers into nodes ── */
function flattenData(data: DiagramData): {
  nodes: DiagramNode[];
  connections: Connection[];
  layers: DiagramLayer[];
} {
  if (data.layers) {
    const nodes = data.layers.flatMap((l) => l.nodes);
    const connections = data.connections || [];
    return { nodes, connections, layers: data.layers };
  }
  // Fallback: group nodes by type for flat data (banking format)
  const nodes = data.nodes || [];
  const connections = (data.edges || []).map((e) => ({
    from: e.source,
    to: e.target,
    label: e.label,
  }));
  // Group by type
  const grouped = nodes.reduce<Record<string, DiagramNode[]>>((acc, n) => {
    (acc[n.type] ??= []).push(n);
    return acc;
  }, {});
  const layers = Object.entries(grouped).map(([type, ns]) => ({
    id: type,
    label: type.charAt(0).toUpperCase() + type.slice(1),
    nodes: ns,
  }));
  return { nodes, connections, layers };
}

/* ── Compute node positions ── */
function computePositions(
  layers: DiagramLayer[],
  width: number,
  nodeWidth: number,
  nodeHeight: number,
  gapX: number,
  gapY: number
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  const layerGap = (width - layers.length * nodeWidth) / (layers.length + 1);

  layers.forEach((layer, li) => {
    const layerX = layerGap + li * (nodeWidth + layerGap);
    const totalHeight =
      layer.nodes.length * nodeHeight + (layer.nodes.length - 1) * gapY;
    const startY = (600 - totalHeight) / 2; // center vertically in 600px

    layer.nodes.forEach((node, ni) => {
      positions.set(node.id, {
        x: layerX,
        y: startY + ni * (nodeHeight + gapY),
      });
    });
  });

  return positions;
}

/* ── Main Component ── */
export default function InteractiveDiagram({ data }: { data: DiagramData }) {
  const [selected, setSelected] = useState<DiagramNode | null>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  const { nodes, connections, layers } = useMemo(() => flattenData(data), [data]);

  const NODE_W = 140;
  const NODE_H = 56;
  const GAP_X = 24;
  const GAP_Y = 12;
  const SVG_W = Math.max(900, layers.length * (NODE_W + GAP_X) + GAP_X);
  const SVG_H = 600;

  const positions = useMemo(
    () => computePositions(layers, SVG_W, NODE_W, NODE_H, GAP_X, GAP_Y),
    [layers, SVG_W]
  );

  /* ── Zoom ── */
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom((z) => Math.min(2, Math.max(0.4, z + delta)));
    },
    []
  );

  /* ── Pan ── */
  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (e.button !== 0) return;
      setDragging(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    },
    [pan]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!dragging) return;
      setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
    },
    [dragging, dragStart]
  );

  const handleMouseUp = useCallback(() => setDragging(false), []);

  const resetView = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelected(null);
  }, []);

  /* ── Find connections for a node ── */
  const getNodeConnections = useCallback(
    (nodeId: string) =>
      connections.filter((c) => c.from === nodeId || c.to === nodeId),
    [connections]
  );

  return (
    <div className="rounded-xl border border-border bg-bg-surface overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div>
          <h3 className="text-sm font-semibold text-text-primary">
            {data.title}
          </h3>
          {data.description && (
            <p className="mt-0.5 text-xs text-text-muted">{data.description}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.min(2, z + 0.2))}
            className="rounded-md border border-border px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
            aria-label="Zoom in"
          >
            +
          </button>
          <span className="min-w-[3rem] text-center text-xs text-text-muted font-mono">
            {Math.round(zoom * 100)}%
          </span>
          <button
            onClick={() => setZoom((z) => Math.max(0.4, z - 0.2))}
            className="rounded-md border border-border px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
            aria-label="Zoom out"
          >
            −
          </button>
          <button
            onClick={resetView}
            className="rounded-md border border-border px-2 py-1 text-xs text-text-muted hover:text-text-primary transition-colors"
            aria-label="Reset view"
          >
            Reset
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* SVG Canvas */}
        <div
          className="flex-1 overflow-hidden"
          style={{ cursor: dragging ? "grabbing" : "grab" }}
        >
          <svg
            ref={svgRef}
            width="100%"
            height={SVG_H}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            onWheel={handleWheel}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="select-none"
          >
            <g
              transform={`translate(${pan.x},${pan.y}) scale(${zoom})`}
              style={{ transformOrigin: "center center" }}
            >
              {/* Connections */}
              {connections.map((conn, i) => {
                const from = positions.get(conn.from);
                const to = positions.get(conn.to);
                if (!from || !to) return null;

                const x1 = from.x + NODE_W / 2;
                const y1 = from.y + NODE_H / 2;
                const x2 = to.x + NODE_W / 2;
                const y2 = to.y + NODE_H / 2;

                const isHighlighted =
                  selected &&
                  (conn.from === selected.id || conn.to === selected.id);

                return (
                  <g key={i}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={isHighlighted ? "#38bdf8" : "#2d3a4f"}
                      strokeWidth={isHighlighted ? 2 : 1}
                      strokeDasharray={isHighlighted ? "none" : "4 4"}
                      opacity={selected ? (isHighlighted ? 1 : 0.3) : 0.6}
                    />
                    {conn.label && (
                      <text
                        x={(x1 + x2) / 2}
                        y={(y1 + y2) / 2 - 6}
                        textAnchor="middle"
                        fill="#64748b"
                        fontSize={9}
                        fontFamily="monospace"
                        opacity={selected ? (isHighlighted ? 1 : 0.3) : 0.7}
                      >
                        {conn.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Nodes */}
              {nodes.map((node) => {
                const pos = positions.get(node.id);
                if (!pos) return null;

                const color = getNodeColor(node.type);
                const isSelected = selected?.id === node.id;
                const isDimmed =
                  selected &&
                  !isSelected &&
                  !getNodeConnections(selected.id).some(
                    (c) => c.from === node.id || c.to === node.id
                  );

                return (
                  <g
                    key={node.id}
                    onClick={() =>
                      setSelected(isSelected ? null : node)
                    }
                    style={{ cursor: "pointer" }}
                    opacity={isDimmed ? 0.3 : 1}
                  >
                    {/* Node background */}
                    <rect
                      x={pos.x}
                      y={pos.y}
                      width={NODE_W}
                      height={NODE_H}
                      rx={8}
                      fill={isSelected ? `${color}20` : `${color}10`}
                      stroke={isSelected ? color : `${color}40`}
                      strokeWidth={isSelected ? 2 : 1}
                    />
                    {/* Node label */}
                    <text
                      x={pos.x + NODE_W / 2}
                      y={pos.y + NODE_H / 2 - 4}
                      textAnchor="middle"
                      fill={color}
                      fontSize={12}
                      fontWeight={600}
                      fontFamily="system-ui, sans-serif"
                    >
                      {node.label}
                    </text>
                    {/* Node type */}
                    <text
                      x={pos.x + NODE_W / 2}
                      y={pos.y + NODE_H / 2 + 12}
                      textAnchor="middle"
                      fill="#64748b"
                      fontSize={9}
                      fontFamily="monospace"
                    >
                      {node.type}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Detail panel */}
        <div className="w-full shrink-0 border-t border-border bg-bg-surface p-4 lg:w-72 lg:border-t-0 lg:border-l">
          {selected ? (
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: getNodeColor(selected.type) }}
                  />
                  <p className="font-mono text-sm font-semibold text-text-primary">
                    {selected.label}
                  </p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-text-muted hover:text-text-primary text-lg leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                    Type
                  </p>
                  <p className="text-sm text-text-secondary capitalize">
                    {selected.type}
                  </p>
                </div>

                {selected.description && (
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                      Description
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {selected.description}
                    </p>
                  </div>
                )}

                {(selected.tech || selected.technology) &&
                  (selected.tech || selected.technology)!.length > 0 && (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                        Technology
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {(selected.tech || selected.technology)!.map(
                          (t: string) => (
                            <span
                              key={t}
                              className="rounded bg-bg-elevated px-1.5 py-0.5 text-[10px] text-text-muted"
                            >
                              {t}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Connections */}
                {(() => {
                  const conns = getNodeConnections(selected.id);
                  if (conns.length === 0) return null;
                  return (
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-text-muted mb-1">
                        Connections
                      </p>
                      <div className="space-y-1">
                        {conns.map((c, i) => {
                          const isOutgoing = c.from === selected.id;
                          const otherId = isOutgoing ? c.to : c.from;
                          const otherNode = nodes.find((n) => n.id === otherId);
                          return (
                            <div
                              key={i}
                              className="flex items-center gap-1 text-xs text-text-muted"
                            >
                              <span
                                className={`rounded px-1 py-0.5 text-[10px] ${
                                  isOutgoing
                                    ? "bg-accent/10 text-accent"
                                    : "bg-green/10 text-green"
                                }`}
                              >
                                {isOutgoing ? "→" : "←"}
                              </span>
                              <span className="text-text-secondary">
                                {otherNode?.label || otherId}
                              </span>
                              {c.label && (
                                <span className="text-[10px] text-text-muted">
                                  ({c.label})
                                </span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-sm text-text-muted">
                Click a node to see details
              </p>
              <p className="mt-1 text-xs text-text-muted">
                Scroll to zoom · Drag to pan
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
