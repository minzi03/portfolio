/**
 * Shared portfolio evidence types.
 *
 * These types define the canonical data model for the portfolio.
 * All data files (projects, experience, skills, credentials) reference
 * these types. The graph relationships (Skill → Project, Experience → Project,
 * Credential → Skill) are encoded via ID arrays.
 *
 * Phase 2: Content enrichment + semantic corrections.
 */

/* ─── Projects ─── */

export type ProjectCategory =
  | "data-platform"
  | "streaming"
  | "cloud-data"
  | "data-warehouse"
  | "analytics";

/** Lifecycle — is the project done? */
export type ProjectStatus =
  | "complete"
  | "in-progress"
  | "archived";

/** Scope — what context was it built in? */
export type ProjectScope =
  | "production"
  | "production-like"
  | "portfolio-demo"
  | "academic";

export interface ProjectMetric {
  id: string;
  label: string;
  value: string;
  type: "scale" | "performance" | "quality" | "reliability" | "coverage" | "business";
  before?: string;
  after?: string;
  context?: string;
}

export interface ArchitectureReference {
  summary: string;
  /** Path to architecture graph data (relative to project dir or import) */
  architectureData?: string;
  lineageData?: string;
  modelData?: string;
  pipelineData?: string;
  /** Path to architecture thumbnail image */
  thumbnail?: string;
}

export interface ADR {
  id: string;
  title: string;
  context: string;
  decision: string;
  alternatives?: string[];
  rationale: string;
  tradeoffs: string[];
  status?: "accepted" | "superseded";
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  summary: string;
  category: ProjectCategory;
  status: ProjectStatus;
  scope: ProjectScope;
  featured: boolean;
  period?: string;
  tech: string[];
  github?: string;
  demo?: string;

  /** Engineering reasoning — optional, only if evidence exists */
  problem?: string;
  constraints?: string[];
  architecture?: ArchitectureReference;
  adrs?: ADR[];
  impact?: ProjectMetric[];
  limitations?: string[];
  improvements?: string[];

  relatedExperienceIds?: string[];
  tags?: string[];
}

/* ─── Experience ─── */

export interface ExperienceMetric {
  label: string;
  value: string;
  before?: string;
  after?: string;
}

export interface ExperienceHighlight {
  action: string;
  approach?: string;
  outcome: string;
  metrics?: ExperienceMetric[];
  projectIds?: string[];
  technologies?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  highlights: ExperienceHighlight[];
  relatedProjectIds?: string[];
  technologies?: string[];
}

/* ─── Skills ─── */

export type SkillLevel = "professional" | "project" | "exploring";

export type SkillCategory =
  | "programming"
  | "data-processing"
  | "data-platforms"
  | "cloud-storage"
  | "bi-governance"
  | "tools-infrastructure";

export interface Skill {
  id: string;
  name: string;
  category: SkillCategory;
  level: SkillLevel;
  projectIds?: string[];
  experienceIds?: string[];
  credentialIds?: string[];
  evidenceNote?: string;
}

/* ─── Credentials ─── */

export type CredentialCategory =
  | "data-engineering"
  | "cloud"
  | "analytics"
  | "sql"
  | "academic"
  | "award"
  | "activity"
  | "soft-skills";

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  date: string;
  issued: string;
  category: CredentialCategory;
  level?: string;
  description?: string;
  relatedProjectIds?: string[];
  relatedSkillIds?: string[];
  verifyUrl?: string;
  evidenceLevel?: "verified" | "issued" | "self-reported";
}

/* ─── Evidence Graph Helpers ─── */

/** Resolve an entity by ID from a collection */
export function findById<T extends { id: string }>(
  collection: T[],
  id: string,
): T | undefined {
  return collection.find((item) => item.id === id);
}

/** Resolve multiple entities by IDs from a collection */
export function findManyById<T extends { id: string }>(
  collection: T[],
  ids: string[],
): T[] {
  return ids
    .map((id) => collection.find((item) => item.id === id))
    .filter((item): item is T => item !== undefined);
}
