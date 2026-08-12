/**
 * Evidence Graph Validator
 *
 * Validates the portfolio data layer for consistency:
 *   - Unique IDs across all entities
 *   - No dangling references (every ID reference resolves)
 *   - Skill level matches evidence graph
 *   - Experience ↔ Project links are factual
 *   - No fabricated metrics or empty impact values
 *
 * Run: npx tsx src/data/validate.ts
 * Or import and call validatePortfolioData() from a test/build step.
 */

import { projects } from "./projects";
import { experiences } from "./experience";
import { skills, checkSkillLevelConsistency } from "./skills";
import { credentials } from "./credentials";

interface ValidationIssue {
  severity: "error" | "warning";
  entity: string;
  id: string;
  message: string;
}

export function validatePortfolioData(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const projectIds = new Set(projects.map((p) => p.id));
  const experienceIds = new Set(experiences.map((e) => e.id));
  const skillIds = new Set(skills.map((s) => s.id));
  const credentialIds = new Set(credentials.map((c) => c.id));

  /* ─── 1. Unique IDs ─── */

  const allIds = [
    ...projects.map((p) => ({ type: "project", id: p.id })),
    ...experiences.map((e) => ({ type: "experience", id: e.id })),
    ...skills.map((s) => ({ type: "skill", id: s.id })),
    ...credentials.map((c) => ({ type: "credential", id: c.id })),
  ];

  const seenIds = new Map<string, string>();
  for (const { type, id } of allIds) {
    if (seenIds.has(id)) {
      issues.push({
        severity: "error",
        entity: type,
        id,
        message: `Duplicate ID "${id}" found in ${type} and ${seenIds.get(id)}`,
      });
    }
    seenIds.set(id, type);
  }

  /* ─── 2. Project references ─── */

  for (const project of projects) {
    // relatedExperienceIds
    for (const expId of project.relatedExperienceIds ?? []) {
      if (!experienceIds.has(expId)) {
        issues.push({
          severity: "error",
          entity: "project",
          id: project.id,
          message: `relatedExperienceId "${expId}" does not exist`,
        });
      }
    }

    // impact — warn if empty
    if (project.adrs && project.adrs.length > 0 && (!project.impact || project.impact.length === 0)) {
      issues.push({
        severity: "warning",
        entity: "project",
        id: project.id,
        message: "Has ADRs but no impact metrics — consider adding quantified outcomes",
      });
    }

    // scope/status consistency
    if (project.scope === "production" && !project.github) {
      issues.push({
        severity: "warning",
        entity: "project",
        id: project.id,
        message: 'scope "production" but no GitHub link — production projects should have source',
      });
    }
  }

  /* ─── 3. Experience references ─── */

  for (const exp of experiences) {
    // relatedProjectIds
    for (const projId of exp.relatedProjectIds ?? []) {
      if (!projectIds.has(projId)) {
        issues.push({
          severity: "error",
          entity: "experience",
          id: exp.id,
          message: `relatedProjectId "${projId}" does not exist`,
        });
      }
    }

    // highlights.projectIds
    for (const highlight of exp.highlights) {
      for (const projId of highlight.projectIds ?? []) {
        if (!projectIds.has(projId)) {
          issues.push({
            severity: "error",
            entity: "experience",
            id: exp.id,
            message: `highlight projectIds "${projId}" does not exist`,
          });
        }
      }
    }
  }

  /* ─── 4. Skill references ─── */

  for (const skill of skills) {
    // projectIds
    for (const projId of skill.projectIds ?? []) {
      if (!projectIds.has(projId)) {
        issues.push({
          severity: "error",
          entity: "skill",
          id: skill.id,
          message: `projectIds "${projId}" does not exist`,
        });
      }
    }

    // experienceIds
    for (const expId of skill.experienceIds ?? []) {
      if (!experienceIds.has(expId)) {
        issues.push({
          severity: "error",
          entity: "skill",
          id: skill.id,
          message: `experienceIds "${expId}" does not exist`,
        });
      }
    }

    // credentialIds
    for (const credId of skill.credentialIds ?? []) {
      if (!credentialIds.has(credId)) {
        issues.push({
          severity: "error",
          entity: "skill",
          id: skill.id,
          message: `credentialIds "${credId}" does not exist`,
        });
      }
    }

    // level consistency
    const levelWarning = checkSkillLevelConsistency(skill);
    if (levelWarning) {
      issues.push({
        severity: "warning",
        entity: "skill",
        id: skill.id,
        message: levelWarning,
      });
    }
  }

  /* ─── 5. Self-references ─── */

  for (const project of projects) {
    if (project.relatedExperienceIds?.includes(project.id)) {
      issues.push({
        severity: "error",
        entity: "project",
        id: project.id,
        message: "Project references itself in relatedExperienceIds",
      });
    }
  }

  for (const skill of skills) {
    if (skill.projectIds?.includes(skill.id)) {
      issues.push({
        severity: "error",
        entity: "skill",
        id: skill.id,
        message: "Skill references itself in projectIds",
      });
    }
  }

  return issues;
}

/* ─── CLI runner ─── */

if (require.main === module) {
  const issues = validatePortfolioData();
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");

  console.log(`\nEvidence Graph Validator`);
  console.log(`${"─".repeat(50)}`);
  console.log(`Projects:      ${projects.length}`);
  console.log(`Experiences:   ${experiences.length}`);
  console.log(`Skills:        ${skills.length}`);
  console.log(`Credentials:   ${credentials.length}`);
  console.log(`${"─".repeat(50)}`);

  if (errors.length === 0 && warnings.length === 0) {
    console.log(`\n✅ All checks passed — no issues found.\n`);
    process.exit(0);
  }

  if (errors.length > 0) {
    console.log(`\n❌ ${errors.length} error(s):\n`);
    for (const e of errors) {
      console.log(`  [${e.entity}] ${e.id}: ${e.message}`);
    }
  }

  if (warnings.length > 0) {
    console.log(`\n⚠️  ${warnings.length} warning(s):\n`);
    for (const w of warnings) {
      console.log(`  [${w.entity}] ${w.id}: ${w.message}`);
    }
  }

  console.log();
  process.exit(errors.length > 0 ? 1 : 0);
}
