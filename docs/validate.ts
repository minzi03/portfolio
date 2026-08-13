/**
 * Evidence Graph Validator
 *
 * Validates the portfolio data layer for consistency:
 *   1. Unique IDs across all entities
 *   2. No dangling references (every ID reference resolves)
 *   3. Skill level matches evidence graph
 *   4. Experience ↔ Project links are factual
 *   5. No fabricated metrics or empty impact values
 *   6. Evidence integrity (types, trust, reconciliation, assets)
 *   7. Filesystem evidence validation (existence, orphans, naming)
 *
 * Run: npx tsx src/data/validate.ts
 * Or import and call validatePortfolioData() from a test/build step.
 */

import fs from "node:fs";
import path from "node:path";
import { projects } from "./projects";
import { experiences } from "./experience";
import { skills, checkSkillLevelConsistency } from "./skills";
import { credentials } from "./credentials";
import type { CredentialEvidence, TrustLevel } from "./credentials";

interface ValidationIssue {
  severity: "error" | "warning";
  entity: string;
  id: string;
  message: string;
  section: string;
}

/* ─── Filesystem helpers ─── */

const ALLOWED_EVIDENCE_EXTENSIONS = new Set([".webp", ".png", ".jpg", ".jpeg", ".pdf"]);

const TIMESTAMP_FILENAME_PATTERN = /^\d{10,}\./;

const SUSPICIOUS_PATTERNS = ["-original", "-raw", "-source", "-scan", "mssv", "img_", "dsc_"];

const REDACTED_DERIVATIVE_PATTERN = /redacted/;

function publicAssetExists(assetPath: string): boolean {
  const relative = assetPath.replace(/^\//, "");
  const filePath = path.join(process.cwd(), "public", relative);
  return fs.existsSync(filePath);
}

function scanEvidenceDirectory(dir: string): string[] {
  const fullDir = path.join(process.cwd(), "public", dir);
  if (!fs.existsSync(fullDir)) return [];
  const entries: string[] = [];
  const walk = (d: string) => {
    for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
      const fullPath = path.join(d, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else {
        // Skip .gitkeep placeholders
        if (entry.name === ".gitkeep") continue;
        // Convert absolute path to URL path
        const relative = fullPath.replace(path.join(process.cwd(), "public"), "").replace(/\\/g, "/");
        entries.push(relative);
      }
    }
  };
  walk(fullDir);
  return entries;
}

/* ─── Main validator ─── */

export function validatePortfolioData(): ValidationIssue[] {
  const issues: ValidationIssue[] = [];

  const projectIds = new Set(projects.map((p) => p.id));
  const experienceIds = new Set(experiences.map((e) => e.id));
  const skillIds = new Set(skills.map((s) => s.id));
  const credentialIds = new Set(credentials.map((c) => c.id));

  /* ═══════════════════════════════════════════════════
     SECTION 1: Unique IDs
     ═══════════════════════════════════════════════════ */

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
        section: "GRAPH",
      });
    }
    seenIds.set(id, type);
  }

  /* ═══════════════════════════════════════════════════
     SECTION 2: Project references
     ═══════════════════════════════════════════════════ */

  for (const project of projects) {
    for (const expId of project.relatedExperienceIds ?? []) {
      if (!experienceIds.has(expId)) {
        issues.push({
          severity: "error",
          entity: "project",
          id: project.id,
          message: `relatedExperienceId "${expId}" does not exist`,
          section: "GRAPH",
        });
      }
    }

    if (project.adrs && project.adrs.length > 0 && (!project.impact || project.impact.length === 0)) {
      issues.push({
        severity: "warning",
        entity: "project",
        id: project.id,
        message: "Has ADRs but no impact metrics — consider adding quantified outcomes",
        section: "GRAPH",
      });
    }

    if (project.scope === "production" && !project.github) {
      issues.push({
        severity: "warning",
        entity: "project",
        id: project.id,
        message: 'scope "production" but no GitHub link — production projects should have source',
        section: "GRAPH",
      });
    }
  }

  /* ═══════════════════════════════════════════════════
     SECTION 3: Experience references
     ═══════════════════════════════════════════════════ */

  for (const exp of experiences) {
    for (const projId of exp.relatedProjectIds ?? []) {
      if (!projectIds.has(projId)) {
        issues.push({
          severity: "error",
          entity: "experience",
          id: exp.id,
          message: `relatedProjectId "${projId}" does not exist`,
          section: "GRAPH",
        });
      }
    }

    for (const highlight of exp.highlights) {
      for (const projId of highlight.projectIds ?? []) {
        if (!projectIds.has(projId)) {
          issues.push({
            severity: "error",
            entity: "experience",
            id: exp.id,
            message: `highlight projectIds "${projId}" does not exist`,
            section: "GRAPH",
          });
        }
      }
    }
  }

  /* ═══════════════════════════════════════════════════
     SECTION 4: Skill references
     ═══════════════════════════════════════════════════ */

  for (const skill of skills) {
    for (const projId of skill.projectIds ?? []) {
      if (!projectIds.has(projId)) {
        issues.push({
          severity: "error",
          entity: "skill",
          id: skill.id,
          message: `projectIds "${projId}" does not exist`,
          section: "GRAPH",
        });
      }
    }

    for (const expId of skill.experienceIds ?? []) {
      if (!experienceIds.has(expId)) {
        issues.push({
          severity: "error",
          entity: "skill",
          id: skill.id,
          message: `experienceIds "${expId}" does not exist`,
          section: "GRAPH",
        });
      }
    }

    for (const credId of skill.credentialIds ?? []) {
      if (!credentialIds.has(credId)) {
        issues.push({
          severity: "error",
          entity: "skill",
          id: skill.id,
          message: `credentialIds "${credId}" does not exist`,
          section: "GRAPH",
        });
      }
    }

    const levelWarning = checkSkillLevelConsistency(skill);
    if (levelWarning) {
      issues.push({
        severity: "warning",
        entity: "skill",
        id: skill.id,
        message: levelWarning,
        section: "GRAPH",
      });
    }
  }

  /* ═══════════════════════════════════════════════════
     SECTION 5: Self-references
     ═══════════════════════════════════════════════════ */

  for (const project of projects) {
    if (project.relatedExperienceIds?.includes(project.id)) {
      issues.push({
        severity: "error",
        entity: "project",
        id: project.id,
        message: "Project references itself in relatedExperienceIds",
        section: "GRAPH",
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
        section: "GRAPH",
      });
    }
  }

  /* ═══════════════════════════════════════════════════
     SECTION 6: Evidence integrity (type-level)
     ═══════════════════════════════════════════════════ */

  const trustRank: Record<TrustLevel, number> = {
    verified: 4,
    evidence: 3,
    redacted: 2,
    metadata: 1,
  };

  for (const cred of credentials) {
    // 6a. Metadata-only must have empty evidenceAssets
    if (cred.evidence === "metadata" && cred.evidenceAssets.length > 0) {
      issues.push({
        severity: "error",
        entity: "credential",
        id: cred.id,
        message: `evidence is "metadata" but has ${cred.evidenceAssets.length} evidenceAsset(s)`,
        section: "CREDENTIAL TRUST",
      });
    }

    // 6b. Evidence/redacted should have at least one asset
    if ((cred.evidence === "evidence" || cred.evidence === "redacted") && cred.evidenceAssets.length === 0) {
      issues.push({
        severity: "warning",
        entity: "credential",
        id: cred.id,
        message: `evidence is "${cred.evidence}" but evidenceAssets is empty — needs asset or downgrade to metadata`,
        section: "CREDENTIAL TRUST",
      });
    }

    // 6c. Evidence asset paths must be valid
    for (const ev of cred.evidenceAssets) {
      if (!ev.asset || ev.asset.trim() === "") {
        issues.push({
          severity: "error",
          entity: "credential",
          id: cred.id,
          message: "evidenceAsset has empty asset path",
          section: "EVIDENCE ASSETS",
        });
        continue;
      }
      if (!ev.asset.startsWith("/evidence/")) {
        issues.push({
          severity: "error",
          entity: "credential",
          id: cred.id,
          message: `evidenceAsset path "${ev.asset}" does not start with /evidence/`,
          section: "EVIDENCE ASSETS",
        });
      }
    }

    // 6d. Credential trust level must be ≥ strongest asset trust level
    const assetTrustLevels = cred.evidenceAssets.map((a) => a.trustLevel);
    if (assetTrustLevels.length > 0) {
      const strongestAsset = assetTrustLevels.reduce((max, t) =>
        trustRank[t] > trustRank[max] ? t : max
      );
      if (trustRank[cred.evidence] < trustRank[strongestAsset]) {
        issues.push({
          severity: "warning",
          entity: "credential",
          id: cred.id,
          message: `Credential trust "${cred.evidence}" is weaker than strongest asset trust "${strongestAsset}" — consider upgrading credential trust`,
          section: "CREDENTIAL TRUST",
        });
      }
    }

    // 6e. Verified credential requires HTTPS verifyUrl
    if (cred.evidence === "verified" && (!cred.verifyUrl || !cred.verifyUrl.startsWith("https://"))) {
      issues.push({
        severity: "error",
        entity: "credential",
        id: cred.id,
        message: 'Credential trust is "verified" but no HTTPS verifyUrl — verified requires issuer URL',
        section: "CREDENTIAL TRUST",
      });
    }

    // 6f. verifyUrl should use HTTPS
    if (cred.verifyUrl && !cred.verifyUrl.startsWith("https://")) {
      issues.push({
        severity: "warning",
        entity: "credential",
        id: cred.id,
        message: `verifyUrl does not use HTTPS: "${cred.verifyUrl}"`,
        section: "CREDENTIAL TRUST",
      });
    }

    // 6f2. verifyUrl must be raw URL, not Markdown
    if (cred.verifyUrl && (cred.verifyUrl.includes("[") || cred.verifyUrl.includes("](") || cred.verifyUrl.includes(")"))) {
      issues.push({
        severity: "error",
        entity: "credential",
        id: cred.id,
        message: `verifyUrl contains Markdown formatting — must be raw HTTPS URL: "${cred.verifyUrl}"`,
        section: "CREDENTIAL TRUST",
      });
    }

    // 6f3. verifyUrlChecked: "confirmed" requires verifyUrl to exist
    if (cred.reconciliation?.verifyUrlChecked === "confirmed" && !cred.verifyUrl) {
      issues.push({
        severity: "error",
        entity: "credential",
        id: cred.id,
        message: 'reconciliation.verifyUrlChecked is "confirmed" but no verifyUrl is defined — set verifyUrl or change to "not-applicable"',
        section: "CREDENTIAL TRUST",
      });
    }

    // 6g. Migration gate — allow-list: assets only with full reconciliation
    if (cred.evidenceAssets.length > 0) {
      const r = cred.reconciliation;
      if (!r) {
        issues.push({
          severity: "error",
          entity: "credential",
          id: cred.id,
          message: "Has evidence assets but no reconciliation — complete Phase 0.5 audit first",
          section: "CREDENTIAL TRUST",
        });
      } else {
        const isReady =
          r.certificateChecked === "confirmed" &&
          r.existingDataMatched === "confirmed" &&
          (r.verifyUrlChecked === "confirmed" || r.verifyUrlChecked === "not-applicable");

        if (!isReady) {
          const blocked = [
            r.certificateChecked !== "confirmed" ? `certificateChecked=${r.certificateChecked}` : "",
            r.existingDataMatched !== "confirmed" ? `existingDataMatched=${r.existingDataMatched}` : "",
            r.verifyUrlChecked !== "confirmed" && r.verifyUrlChecked !== "not-applicable"
              ? `verifyUrlChecked=${r.verifyUrlChecked}`
              : "",
          ]
            .filter(Boolean)
            .join(", ");
          issues.push({
            severity: "error",
            entity: "credential",
            id: cred.id,
            message: `Evidence assets blocked by reconciliation gate: ${blocked}`,
            section: "CREDENTIAL TRUST",
          });
        }
      }
    }

    // 6h. Source/trust consistency
    for (const ev of cred.evidenceAssets) {
      // redacted-derivative must have trustLevel=redacted
      if (ev.source === "redacted-derivative" && ev.trustLevel !== "redacted") {
        issues.push({
          severity: "error",
          entity: "credential",
          id: cred.id,
          message: `source is "redacted-derivative" but trustLevel is "${ev.trustLevel}" — must be "redacted"`,
          section: "EVIDENCE ASSETS",
        });
      }

      // certificate-image must have trustLevel=evidence (trust of artifact, not credential)
      if (ev.source === "certificate-image" && ev.trustLevel !== "evidence") {
        issues.push({
          severity: "warning",
          entity: "credential",
          id: cred.id,
          message: `source is "certificate-image" but trustLevel is "${ev.trustLevel}" — artifact trust should be "evidence"`,
          section: "EVIDENCE ASSETS",
        });
      }
    }

    // 6i. Review state — every asset must have reviewState
    for (const ev of cred.evidenceAssets) {
      if (!ev.reviewState) {
        issues.push({
          severity: "error",
          entity: "credential",
          id: cred.id,
          message: `Evidence asset "${ev.asset}" is missing reviewState — every asset must have "confirmed" or "pending"`,
          section: "EVIDENCE REVIEW",
        });
      }

      // Pending redacted derivatives produce privacy-review warning
      if (ev.reviewState === "pending" && ev.source === "redacted-derivative") {
        issues.push({
          severity: "warning",
          entity: "credential",
          id: cred.id,
          message: `Redacted derivative "${path.basename(ev.asset)}" awaiting manual privacy review before public display`,
          section: "EVIDENCE REVIEW",
        });
      }
    }

    // 6j. Redaction naming convention
    for (const ev of cred.evidenceAssets) {
      if (ev.source === "redacted-derivative") {
        const basename = path.basename(ev.asset);
        if (!REDACTED_DERIVATIVE_PATTERN.test(basename)) {
          issues.push({
            severity: "error",
            entity: "credential",
            id: cred.id,
            message: `Redacted derivative "${basename}" should contain "-redacted" in filename`,
            section: "PRIVACY",
          });
        }
      }
    }

    // 6j. Timestamp filename check
    for (const ev of cred.evidenceAssets) {
      const basename = path.basename(ev.asset);
      if (TIMESTAMP_FILENAME_PATTERN.test(basename)) {
        issues.push({
          severity: "error",
          entity: "credential",
          id: cred.id,
          message: `Evidence asset "${basename}" uses timestamp filename — must use semantic name`,
          section: "EVIDENCE ASSETS",
        });
      }
    }

    // 6k. Suspicious filename check
    for (const ev of cred.evidenceAssets) {
      const basename = path.basename(ev.asset).toLowerCase();
      for (const pattern of ["-original", "-raw"]) {
        if (basename.includes(pattern)) {
          issues.push({
            severity: "error",
            entity: "credential",
            id: cred.id,
            message: `Evidence asset "${path.basename(ev.asset)}" contains suspicious pattern "${pattern}" — original/source files must not be published`,
            section: "PRIVACY",
          });
        }
      }
      for (const pattern of SUSPICIOUS_PATTERNS.filter((p) => p !== "-original" && p !== "-raw")) {
        if (basename.includes(pattern)) {
          issues.push({
            severity: "warning",
            entity: "credential",
            id: cred.id,
            message: `Evidence asset "${path.basename(ev.asset)}" contains suspicious pattern "${pattern}" — verify this is not a source original`,
            section: "PRIVACY",
          });
        }
      }
    }
  }

  /* ═══════════════════════════════════════════════════
     SECTION 7: Filesystem evidence validation
     ═══════════════════════════════════════════════════ */

  // 7a. Every declared asset must exist on disk
  for (const cred of credentials) {
    for (const ev of cred.evidenceAssets) {
      if (ev.asset && !publicAssetExists(ev.asset)) {
        issues.push({
          severity: "error",
          entity: "credential",
          id: cred.id,
          message: `Declared asset "${ev.asset}" does not exist on disk`,
          section: "EVIDENCE ASSETS",
        });
      }
    }
  }

  // 7b. No duplicate asset paths across credentials
  const assetToCredentials = new Map<string, string[]>();
  for (const cred of credentials) {
    for (const ev of cred.evidenceAssets) {
      if (!ev.asset) continue;
      const existing = assetToCredentials.get(ev.asset) ?? [];
      existing.push(cred.id);
      assetToCredentials.set(ev.asset, existing);
    }
  }
  for (const [asset, creds] of assetToCredentials) {
    if (creds.length > 1) {
      issues.push({
        severity: "error",
        entity: "credential",
        id: creds[0],
        message: `Duplicate evidence asset "${asset}" referenced by: ${creds.join(", ")}`,
        section: "EVIDENCE ASSETS",
      });
    }
  }

  // 7c. Extension validation for declared assets
  for (const cred of credentials) {
    for (const ev of cred.evidenceAssets) {
      if (!ev.asset) continue;
      const ext = path.extname(ev.asset).toLowerCase();
      if (!ALLOWED_EVIDENCE_EXTENSIONS.has(ext)) {
        issues.push({
          severity: "error",
          entity: "credential",
          id: cred.id,
          message: `Evidence asset "${ev.asset}" has disallowed extension "${ext}" — allowed: ${[...ALLOWED_EVIDENCE_EXTENSIONS].join(", ")}`,
          section: "EVIDENCE ASSETS",
        });
      }
    }
  }

  // 7d. Filesystem scan — find orphans
  const evidenceDirs = ["evidence/credentials", "evidence/academic", "evidence/activities", "evidence/personal"];
  const declaredAssetPaths = new Set(
    credentials.flatMap((c) => c.evidenceAssets.map((e) => e.asset)).filter(Boolean)
  );

  const orphanReport: { credential: string[]; academic: string[]; activities: string[]; personal: string[] } = {
    credential: [],
    academic: [],
    activities: [],
    personal: [],
  };

  const dirToCategory: Record<string, keyof typeof orphanReport> = {
    "evidence/credentials": "credential",
    "evidence/academic": "academic",
    "evidence/activities": "activities",
    "evidence/personal": "personal",
  };

  for (const dir of evidenceDirs) {
    const filesOnDisk = scanEvidenceDirectory(dir);
    const category = dirToCategory[dir];

    for (const file of filesOnDisk) {
      if (!declaredAssetPaths.has(file)) {
        orphanReport[category].push(file);
      }
    }
  }

  // Credential/academic/activity orphans are errors; personal orphans are warnings
  for (const orphan of [...orphanReport.credential, ...orphanReport.academic, ...orphanReport.activities]) {
    issues.push({
      severity: "error",
      entity: "filesystem",
      id: orphan,
      message: `Orphan evidence file not referenced by any credential: ${orphan}`,
      section: "ORPHANS",
    });
  }
  for (const orphan of orphanReport.personal) {
    issues.push({
      severity: "warning",
      entity: "filesystem",
      id: orphan,
      message: `Personal evidence file not referenced by credentials (may be used by components): ${orphan}`,
      section: "ORPHANS",
    });
  }

  // 7e. Timestamp filenames on disk (even if not declared)
  for (const dir of evidenceDirs) {
    const filesOnDisk = scanEvidenceDirectory(dir);
    for (const file of filesOnDisk) {
      const basename = path.basename(file);
      if (TIMESTAMP_FILENAME_PATTERN.test(basename)) {
        issues.push({
          severity: "error",
          entity: "filesystem",
          id: file,
          message: `File "${file}" uses timestamp filename — rename to semantic before publishing`,
          section: "PRIVACY",
        });
      }
    }
  }

  // 7f. Suspicious filenames on disk
  for (const dir of evidenceDirs) {
    const filesOnDisk = scanEvidenceDirectory(dir);
    for (const file of filesOnDisk) {
      const basename = path.basename(file).toLowerCase();
      for (const pattern of ["-original", "-raw"]) {
        if (basename.includes(pattern)) {
          issues.push({
            severity: "error",
            entity: "filesystem",
            id: file,
            message: `File "${file}" contains "${pattern}" — original/source files must not be published`,
            section: "PRIVACY",
          });
        }
      }
    }
  }

  return issues;
}

/* ═══════════════════════════════════════════════════════
   CLI runner — categorized output + evidence manifest
   ═══════════════════════════════════════════════════════ */

if (require.main === module) {
  const issues = validatePortfolioData();
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");

  /* ─── Credential trust summary ─── */

  const trustCounts: Record<string, number> = { verified: 0, evidence: 0, redacted: 0, metadata: 0 };
  for (const c of credentials) {
    trustCounts[c.evidence] = (trustCounts[c.evidence] ?? 0) + 1;
  }

  /* ─── Reconciliation blocked ─── */

  const reconciliationBlocked = credentials.filter((c) => {
    const r = c.reconciliation;
    return (
      r &&
      (r.certificateChecked === "pending" ||
        r.certificateChecked === "mismatch" ||
        r.existingDataMatched === "pending" ||
        r.existingDataMatched === "mismatch" ||
        r.verifyUrlChecked === "pending" ||
        r.verifyUrlChecked === "mismatch")
    );
  }).length;

  /* ─── Asset manifest ─── */

  const allAssets = credentials.flatMap((c) => c.evidenceAssets);
  const declaredCount = allAssets.length;
  const foundCount = allAssets.filter((a) => publicAssetExists(a.asset)).length;
  const missingCount = declaredCount - foundCount;
  const imageCount = allAssets.filter((a) => /\.(jpg|jpeg|png|webp)$/i.test(a.asset)).length;
  const pdfCount = allAssets.filter((a) => /\.pdf$/i.test(a.asset)).length;
  const redactedAssetCount = allAssets.filter((a) => a.source === "redacted-derivative").length;
  const officialDocCount = allAssets.filter((a) => a.source === "official-document").length;
  const confirmedReviewCount = allAssets.filter((a) => a.reviewState === "confirmed").length;
  const pendingReviewCount = allAssets.filter((a) => a.reviewState === "pending").length;

  /* ─── Orphan scan ─── */

  const evidenceDirs = ["evidence/credentials", "evidence/academic", "evidence/activities", "evidence/personal"];
  const declaredAssetPaths = new Set(allAssets.map((a) => a.asset).filter(Boolean));
  let orphanCount = 0;
  for (const dir of evidenceDirs) {
    for (const file of scanEvidenceDirectory(dir)) {
      if (!declaredAssetPaths.has(file)) orphanCount++;
    }
  }

  /* ─── Group issues by section ─── */

  const sectionOrder = ["GRAPH", "CREDENTIAL TRUST", "EVIDENCE ASSETS", "EVIDENCE REVIEW", "ORPHANS", "PRIVACY"];
  const issuesBySection = new Map<string, typeof issues>();
  for (const issue of issues) {
    const list = issuesBySection.get(issue.section) ?? [];
    list.push(issue);
    issuesBySection.set(issue.section, list);
  }

  /* ─── Print output ─── */

  const R = "═".repeat(55);
  const r = "─".repeat(55);

  console.log();
  console.log("Evidence Integrity");
  console.log(R);
  console.log();

  // Credential trust
  console.log("  Credential Trust");
  console.log("  " + "─".repeat(40));
  console.log(`    Verified:              ${trustCounts.verified ?? 0}`);
  console.log(`    Evidence:              ${trustCounts.evidence ?? 0}`);
  console.log(`    Redacted:              ${trustCounts.redacted ?? 0}`);
  console.log(`    Metadata-only:         ${trustCounts.metadata ?? 0}`);
  console.log(`    Reconciliation blocked: ${reconciliationBlocked}`);
  console.log();

  // Asset manifest
  console.log("  Asset Manifest");
  console.log("  " + "─".repeat(40));
  console.log(`    Declared:              ${declaredCount}`);
  console.log(`    Found on disk:         ${foundCount}`);
  console.log(`    Missing:               ${missingCount}`);
  console.log(`    Certificate images:    ${imageCount}`);
  console.log(`    PDF documents:         ${pdfCount}`);
  console.log(`    Redacted derivatives:  ${redactedAssetCount}`);
  console.log(`    Official documents:    ${officialDocCount}`);
  console.log();

  // Evidence review
  console.log("  Evidence Review");
  console.log("  " + "─".repeat(40));
  console.log(`    Confirmed:             ${confirmedReviewCount}`);
  console.log(`    Pending privacy review: ${pendingReviewCount}`);
  console.log();

  // Orphans
  console.log("  Orphans");
  console.log("  " + "─".repeat(40));
  console.log(`    Unreferenced files:    ${orphanCount}`);
  console.log();

  // Section results
  for (const section of sectionOrder) {
    const sectionIssues = issuesBySection.get(section) ?? [];
    const sectionErrors = sectionIssues.filter((i) => i.severity === "error");
    const sectionWarnings = sectionIssues.filter((i) => i.severity === "warning");

    const icon = sectionErrors.length > 0 ? "✗" : "✓";
    console.log(`  [${section}] ${icon} ${sectionIssues.length === 0 ? "pass" : `${sectionErrors.length} error(s), ${sectionWarnings.length} warning(s)`}`);

    for (const issue of sectionIssues) {
      const prefix = issue.severity === "error" ? "  ✗" : "  ⚠";
      console.log(`    ${prefix} [${issue.id}] ${issue.message}`);
    }
  }

  // Summary
  console.log();
  console.log(R);
  if (errors.length === 0 && warnings.length === 0) {
    console.log("  Result: ✓ PASS — all checks passed");
  } else {
    console.log(`  Result: ${errors.length > 0 ? "✗ FAIL" : "⚠ WARN"} — ${errors.length} error(s), ${warnings.length} warning(s)`);
  }
  console.log();

  process.exit(errors.length > 0 ? 1 : 0);
}
