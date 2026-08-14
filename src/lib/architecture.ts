import type { Project } from "@/data/types";

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

export interface ArchitectureData {
  title: string;
  description?: string;
  layers?: DiagramLayer[];
  nodes?: DiagramNode[];
  connections?: Connection[];
  edges?: { source: string; target: string; label?: string }[];
}

// Map slugs to their architecture data imports
const architectureModules: Record<
  string,
  () => Promise<{ default: ArchitectureData }>
> = {
  "banking-data-platform": () =>
    import("@/data/projects/banking/architecture.json"),
  "modern-data-stack": () =>
    import("@/data/projects/modern-data-stack/architecture.json"),
  "azure-ecommerce": () =>
    import("@/data/projects/azure-ecommerce/architecture.json"),
  "movie-data-warehouse": () =>
    import("@/data/projects/movie-data-warehouse/architecture.json"),
  "nexlab-data-platform": () =>
    import("@/data/projects/nexlab-data-platform/architecture.json"),
  "cellphones-analytics": () =>
    import("@/data/projects/cellphones-analytics/architecture.json"),
  "data-analysis-business": () =>
    import("@/data/projects/data-analysis-business/architecture.json"),
  "da-ie224": () =>
    import("@/data/projects/da-ie224/architecture.json"),
  "katalyst-internship": () =>
    import("@/data/projects/katalyst-internship/architecture.json"),
  "is405-bigdata": () =>
    import("@/data/projects/is405-bigdata/architecture.json"),
};

/**
 * Get architecture data for a project (server-side).
 * Returns null if no architecture data exists.
 */
export async function getArchitectureData(
  slug: string
): Promise<ArchitectureData | null> {
  const loader = architectureModules[slug];
  if (!loader) return null;
  const mod = await loader();
  return mod.default;
}

/**
 * Check if a project has architecture data.
 */
export function hasArchitectureData(slug: string): boolean {
  return slug in architectureModules;
}
