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

/** A piece of visual evidence for a project */
export interface ProjectEvidence {
  id: string;
  title: string;
  description?: string;
  asset: string; // Path under /public (e.g. "/evidence/projects/banking/architecture.webp")
  type: "architecture" | "pipeline" | "data-model" | "dashboard" | "code" | "terminal" | "diagram";
  aspectRatio?: "16:9" | "4:3" | "1:1";
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

  /** Visual evidence — screenshots, diagrams, dashboards */
  evidence?: ProjectEvidence[];

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

// Credential types are defined in @/data/credentials (canonical source)
// Import from there: import { type Credential, type CredentialCategory } from "@/data/credentials";
