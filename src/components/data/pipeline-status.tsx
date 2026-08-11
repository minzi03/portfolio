"use client";

import { useEffect, useState } from "react";

type PipelineStatus = {
  pipeline: string;
  status: string;
  started_at: string;
  completed_at: string;
  duration_seconds: number;
  records_processed: number;
  dq: { total: number; passed: number; failed: number; checks: Record<string, string> };
};

function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diffMs = now.getTime() - then.getTime();
  if (diffMs < 0) return "just now";
  const minutes = Math.floor(diffMs / (1000 * 60));
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  if (days > 0) return `${days}d ago`;
  if (hours > 0) return `${hours}h ago`;
  if (minutes > 0) return `${minutes}m ago`;
  return "just now";
}

export default function PipelineStatus() {
  const [data, setData] = useState<PipelineStatus | "loading" | "unavailable">("loading");

  useEffect(() => {
    fetch("/data/pipeline-status.json")
      .then((r) => (r.ok ? r.json() : "unavailable"))
      .then(setData)
      .catch(() => setData("unavailable"));
  }, []);

  if (data === "loading") return null;

  if (data === "unavailable") {
    return (
      <div className="rounded-xl border border-border bg-bg-surface p-5">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-text-muted" />
          <span className="text-sm font-semibold text-text-primary">Live Data Pipeline</span>
        </div>
        <p className="mt-3 text-xs text-text-muted">○ Awaiting first run</p>
      </div>
    );
  }

  const healthy = data.status === "success" && data.dq.failed === 0;

  return (
    <div className="rounded-xl border border-border bg-bg-surface p-5">
      <div className="flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${healthy ? "bg-green" : "bg-red-500"}`} />
        <span className="text-sm font-semibold text-text-primary">Live Data Pipeline</span>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
        <div>
          <p className="text-text-muted">Status</p>
          <p className={`font-medium ${healthy ? "text-green" : "text-red-500"}`}>
            {data.status}
          </p>
        </div>
        <div>
          <p className="text-text-muted">Last run</p>
          <p className="font-medium text-text-secondary">{timeAgo(data.completed_at)}</p>
        </div>
        <div>
          <p className="text-text-muted">Records</p>
          <p className="font-medium text-text-secondary">{data.records_processed}</p>
        </div>
        <div>
          <p className="text-text-muted">DQ</p>
          <p className="font-medium text-text-secondary">
            {data.dq.passed}/{data.dq.total} passed
          </p>
        </div>
      </div>
      <p className="mt-2 text-[11px] text-text-muted">
        Duration: {data.duration_seconds}s · Source: GitHub REST API
      </p>
    </div>
  );
}
