# Portfolio Gap Analysis

> **Source of truth**: `ideas-database.ts` (62 patterns, 18 portfolios)
> **Current state**: Audit of all data files + components as of 2026-08-12
> **Scope**: P0 + P1 patterns only (hiring signal + project comprehension)

---

## Status Legend

| Status | Meaning |
|--------|---------|
| ✅ EXISTS | Pattern fully implemented, data model supports it |
| 🔶 PARTIAL | Pattern partially implemented or hardcoded (not in data model) |
| ❌ MISSING | Pattern not implemented at all |
| N/A | Pattern not applicable to this portfolio |

---

## P0 — Hiring Signal (Must-Have)

### ER-001: PATI Case Study (Problem → Architecture → Trade-offs → Impact)

**Status: 🔶 PARTIAL**

| Aspect | Status | Detail |
|--------|--------|--------|
| Banking case study | 🔶 PARTIAL | Fully implemented in `src/app/projects/[slug]/page.tsx` as `BankingCaseStudy()` — 13 sections including Problem, Architecture (GraphExplorer), 7 ADRs, Results. **Hardcoded in component, not driven by data model.** |
| Other project case studies | 🔶 PARTIAL | `GenericCaseStudy()` exists but is thin — only Overview, Metrics, Tech Stack, Limitations. No Problem, Architecture, Trade-offs, or Engineering Decisions. |
| `Project` type fields | ❌ MISSING | `problem`, `architecture`, `tradeoffs`, `impact` are NOT in the `Project` interface. Banking content is hardcoded JSX, not structured data. |
| Architecture JSON data | ✅ EXISTS | `src/data/projects/banking/` has `architecture.json`, `lineage.json`, `model.json`, `pipeline.json` — used by GraphExplorer. **Strongest asset.** |
| Engineering Decisions (ADRs) | ❌ MISSING | 7 ADRs exist in BankingCaseStudy JSX but not in any data file. No `adrs` field in Project type. |
| Limitations section | ✅ EXISTS | Both Banking and Generic case studies have Limitations. |
| "What I Would Improve" | ✅ EXISTS | Banking has 7 improvement items (V2 roadmap). |

**Gap**: Banking case study content is production-quality but lives in JSX, not data. The `Project` TypeScript interface needs `problem`, `architecture`, `adrs`, `impact`, `limitations`, `improvements` fields so case studies become data-driven.

**Target files**:
- `src/data/projects.ts` — extend `Project` interface
- `src/app/projects/[slug]/page.tsx` — refactor BankingCaseStudy to use data model
- Create `src/data/projects/banking/case-study.json` (or similar structured format)

---

### QE-002: Metrics-First Experience (Quantified Outcome Bullets)

**Status: 🔶 PARTIAL**

| Aspect | Status | Detail |
|--------|--------|--------|
| Katalyst metrics | 🔶 PARTIAL | Has 1 good metric: "reducing query latency from 25s to 8–12s" (40–68% improvement). Other bullets are descriptive, not outcome-driven. |
| QuanSkill metrics | ❌ MISSING | All 6 bullets are descriptive: "Config-driven ingestion", "Multi-tenant isolation", "Metadata-driven architecture". No quantified outcomes. |
| `Experience` type fields | ❌ MISSING | No `metrics`, `outcomes`, or `action/architecture/outcome` structure. Bullets are plain `string[]`. |
| Before/After format | ❌ MISSING | Only Katalyst has implicit before/after (25s → 8-12s). No consistent pattern. |

**Gap**: Experience bullets read like job descriptions, not impact stories. Need structured `metrics` field and rewrite bullets to outcome-first format.

**Target files**:
- `src/data/experience.ts` — add `metrics: { before?: string; after: string; delta: string }[]` to Experience
- Rewrite `highlights` to follow: **Action** → **Architecture/Approach** → **Quantified Outcome**

---

### EB-002: Skill → Project Evidence Mapping

**Status: ❌ MISSING**

| Aspect | Status | Detail |
|--------|--------|--------|
| Skill-to-project links | ❌ MISSING | `Skill { name, level }[]` has no `projectIds` or `evidenceLinks`. Skills exist in isolation. |
| Evidence-based skill levels | ❌ MISSING | `level` is self-assessed ("professional"/"project"/"exploring"), not backed by project evidence. |
| Skill verification | ❌ MISSING | No `verifiedBy` field linking skills to credentials or projects. |

**Gap**: Skills are floating labels. A recruiter can't see *where* a skill was applied. The strongest evidence graph is in `credentials.ts` (which has `relatedProjects`), but skills don't connect to it.

**Target files**:
- `src/data/skills.ts` — add `projectIds?: string[]` and `verifiedBy?: string[]` to Skill type
- Map existing skills to projects (e.g., "Apache Spark" → "banking-data-platform")

---

## P1 — Project Comprehension (Should-Have)

### PD-010: Featured + Supporting Project Hierarchy

**Status: 🔶 PARTIAL**

| Aspect | Status | Detail |
|--------|--------|--------|
| `featured` flag | ✅ EXISTS | `Project.featured: boolean` — 3 projects are featured, 1 is not. |
| Featured vs Supporting distinction | ❌ MISSING | Homepage shows featured projects in a flat grid. No visual hierarchy between "flagship" and "supporting". |
| Project category filters | ❌ MISSING | Projects page is flat list — no filter by category, tech, or maturity. |
| Portfolio-style project grouping | ❌ MISSING | No "This is what I do" (featured) vs "This is what I've done" (supporting) narrative. |

**Gap**: `featured` flag exists but isn't leveraged for visual hierarchy or filtering.

**Target files**:
- `src/app/projects/page.tsx` — add category filters + featured/supporting sections
- `src/app/page.tsx` — differentiate featured projects visually (larger cards, architecture thumbnails)

---

### AV-001: Architecture Diagram as Visual Thumbnail

**Status: 🔶 PARTIAL**

| Aspect | Status | Detail |
|--------|--------|--------|
| Architecture JSON data | ✅ EXISTS | Banking has `architecture.json` with full graph data. |
| GraphExplorer component | ✅ EXISTS | Interactive architecture viewer on Banking case study page. |
| Architecture thumbnail on project cards | ❌ MISSING | Project cards show text only — no architecture preview/thumbnail. |
| Architecture data for other projects | ❌ MISSING | Only Banking has architecture JSON. Modern Data Stack, Azure E-Commerce, Movie DW have none. |

**Gap**: Architecture is Banking's strongest asset but only visible if you click into the case study. Should be surfaced as a visual hook on project cards.

**Target files**:
- Create architecture JSON for other projects (or use simplified representations)
- `src/app/page.tsx` (FeaturedProjects) — add architecture thumbnail preview
- Consider: static OG image per project showing architecture overview

---

### PD-008: Project Maturity / Status States

**Status: ❌ MISSING**

| Aspect | Status | Detail |
|--------|--------|--------|
| Status field | ❌ MISSING | No `status` field in Project type. No LIVE/IN_DEV/PLANNED distinction. |
| Visual status indicators | ❌ MISSING | No badges, dots, or labels showing project state. |
| Maturity-appropriate language | ❌ MISSING | All projects look "done" — no nuance about what's production-inspired vs production-ready. |

**Gap**: All 4 projects appear at the same maturity level. Banking (containerized, synthetic data) and Movie DW (local, personal use) are very different but look identical.

**Target files**:
- `src/data/projects.ts` — add `status: "live" | "production-ready" | "prototype" | "learning"` to Project
- Components — add status badge styling

---

### RP-004: Availability Badge

**Status: ❌ MISSING**

| Aspect | Status | Detail |
|--------|--------|--------|
| Availability indicator | ❌ MISSING | Hero has no signal about open-to-work status. No badge, no text. |

**Gap**: Simple to implement, high recruiter signal.

**Target files**:
- `src/data/site-config.ts` — add `availability: { status: string; label: string }`
- `src/app/page.tsx` — add availability badge near name/title in Hero

---

### QE-001: Outcome-First Hero Copy

**Status: 🔶 PARTIAL**

| Aspect | Status | Detail |
|--------|--------|--------|
| Hero metrics | ✅ EXISTS | 4 Banking metrics in GlanceMetrics: "4.6M+ curated transactions", "53 cataloged tables", etc. |
| Hero tagline | 🔶 PARTIAL | "I build data systems that turn raw data into decisions." — good but not outcome-first. |
| Hero integration with Experience | ❌ MISSING | Hero metrics are project metrics, not career-level outcomes. No "Reduced query latency by 60%" or "Built 3 production-grade platforms". |

**Gap**: Hero metrics are project-specific (Banking only). Should include career-level outcomes.

**Target files**:
- `src/data/site-config.ts` — expand `heroMetrics` to include career-level metrics
- `src/app/page.tsx` — integrate availability badge + career outcomes into Hero

---

### EX-001: Experience ↔ Project Cross-Links

**Status: ❌ MISSING**

| Aspect | Status | Detail |
|--------|--------|--------|
| Experience → Project links | ❌ MISSING | No `relatedProjects` field in Experience type. |
| Project → Experience links | ❌ MISSING | No `relatedExperience` field in Project type. |
| Visual cross-links | ❌ MISSING | Experience section doesn't mention projects. Projects don't mention which experience they relate to. |

**Gap**: Experience and Projects are isolated. A recruiter reading "Built multi-tenant data isolation" at QuanSkill can't click through to the relevant project.

**Target files**:
- `src/data/experience.ts` — add `relatedProjects?: string[]`
- `src/data/projects.ts` — add `relatedExperience?: string`
- Components — render cross-links

---

### CR-001: Verified Credentials (Consistent Pattern)

**Status: 🔶 PARTIAL**

| Aspect | Status | Detail |
|--------|--------|--------|
| `verifyUrl` field | ✅ EXISTS | 6 credentials have `verifyUrl` (IBM, Google, Databricks, Huawei, FPT, QLS). |
| Visual verification badge | 🔶 PARTIAL | Credentials show verify link but no distinct visual badge (✓ icon, green indicator). |
| Consistent verification across all credentials | ❌ MISSING | 22 of 28 credentials have no `verifyUrl`. Some may genuinely not have verification URLs, but the pattern isn't consistent. |

**Gap**: Verification pattern exists but isn't visually prominent or consistently applied.

**Target files**:
- `src/data/credentials.ts` — audit: can more credentials have `verifyUrl`?
- `src/app/page.tsx` — add verification badge visual treatment

---

### SK-001: Skills with Visual Proficiency

**Status: 🔶 PARTIAL**

| Aspect | Status | Detail |
|--------|--------|--------|
| Skill levels | ✅ EXISTS | Three tiers: professional (24), project (14), exploring (8). |
| Visual proficiency indicators | 🔶 PARTIAL | Current `SkillLevel` type uses text labels. No bars, dots, or visual meters. |
| Skill grouping/narrative | ❌ MISSING | Skills are in 6 flat categories. No "What I Use Daily" vs "What I've Explored" narrative. |

**Gap**: Skill data is solid (3-tier system) but presentation is flat. DarktheDE's visual proficiency model is stronger.

**Target files**:
- `src/data/skills.ts` — already good, minor refinements
- Skills UI component — add visual proficiency indicators + narrative grouping

---

## Summary: Implementation Matrix

### Priority Score (Impact × Effort⁻¹)

| Pattern | Status | Impact | Effort | Priority | Target |
|---------|--------|--------|--------|----------|--------|
| ER-001 PATI (data model) | 🔶 PARTIAL | 🔴 HIGH | 🟡 MED | **P0-1** | `projects.ts` + case study refactor |
| QE-002 Metrics Experience | 🔶 PARTIAL | 🔴 HIGH | 🟢 LOW | **P0-2** | `experience.ts` rewrite |
| EB-002 Skill→Project | ❌ MISSING | 🔴 HIGH | 🟢 LOW | **P0-3** | `skills.ts` add projectIds |
| PD-010 Featured hierarchy | 🔶 PARTIAL | 🟡 MED | 🟢 LOW | **P1-1** | `projects/page.tsx` |
| AV-001 Architecture thumb | 🔶 PARTIAL | 🟡 MED | 🟡 MED | **P1-2** | Project cards + arch data |
| PD-008 Maturity states | ❌ MISSING | 🟡 MED | 🟢 LOW | **P1-3** | `projects.ts` add status |
| RP-004 Availability badge | ❌ MISSING | 🟡 MED | 🟢 LOW | **P1-4** | `site-config.ts` + Hero |
| QE-001 Outcome-first Hero | 🔶 PARTIAL | 🟡 MED | 🟢 LOW | **P1-5** | `site-config.ts` heroMetrics |
| EX-001 Experience↔Project | ❌ MISSING | 🟡 MED | 🟡 MED | **P1-6** | `experience.ts` + `projects.ts` |
| CR-001 Verified credentials | 🔶 PARTIAL | 🟢 LOW | 🟢 LOW | **P1-7** | `credentials.ts` + UI |
| SK-001 Skills visual | 🔶 PARTIAL | 🟢 LOW | 🟡 MED | **P1-8** | Skills UI component |

---

## Data Model Improvement Roadmap

### Phase 1: Core Type Extensions (P0)

```typescript
// src/data/projects.ts — extend Project interface
interface Project {
  // ... existing fields ...
  
  // P0 additions
  status: "live" | "production-ready" | "prototype" | "learning";
  problem: string;                          // What problem does this solve?
  architecture: ArchitectureData;           // Structured architecture description
  adrs: ADR[];                              // Engineering Decision Records
  impact: ImpactMetrics;                    // Quantified outcomes
  limitations: string[];                    // Honest scope boundaries
  improvements: string[];                   // V2 roadmap
  relatedExperience?: string;               // Link to experience entry

  // P1 additions
  category: "data-platform" | "analytics" | "pipeline" | "warehouse";
  maturity: number;                         // 0-100, drives visual indicators
}

interface ADR {
  id: string;
  question: string;
  context: string;
  alternatives: string[];
  decision: string;
  rationale: string;
  tradeoff: string;
}

interface ImpactMetrics {
  quantitative: { label: string; value: string }[];
  qualitative: string[];                    // "Enabled Customer 360 analytics"
}
```

```typescript
// src/data/skills.ts — extend Skill interface
interface Skill {
  name: string;
  level: SkillLevel;
  
  // P0 additions
  projectIds?: string[];                    // Which projects use this skill
  verifiedBy?: string[];                    // Credentials that verify this skill
}
```

```typescript
// src/data/experience.ts — extend Experience interface
interface Experience {
  // ... existing fields ...
  
  // P0 additions
  highlights: ExperienceHighlight[];
  relatedProjects?: string[];
}

interface ExperienceHighlight {
  action: string;                           // What I did
  architecture?: string;                    // How I approached it
  outcome: string;                          // What happened (quantified)
  metrics?: { before?: string; after: string; delta: string }[];
}
```

### Phase 2: Content Enrichment (P1)

- Write structured `problem`, `adrs`, `impact` for all 4 projects (not just Banking)
- Create architecture JSON for Modern Data Stack, Azure E-Commerce, Movie DW
- Rewrite Experience highlights to outcome-first format
- Map all 46 skills to projects and credentials
- Add availability config to site-config

### Phase 3: UI Implementation (P1)

- Project cards: add status badge, architecture thumbnail, category filter
- Experience section: add metrics callouts, project cross-links
- Skills section: add visual proficiency, evidence links
- Hero: integrate availability badge, career-level metrics
- Credentials: add verification badge visual treatment

---

## Anti-Pattern Check

Current portfolio does NOT exhibit any of the 17 documented anti-patterns:

| Anti-Pattern | Risk | Current Status |
|-------------|------|----------------|
| AP-01: Skill List Without Evidence | 🔴 | ⚠️ **AT RISK** — Skills have levels but no project evidence (EB-002 gap) |
| AP-02: Buzzword Dump | 🟢 | Safe — skills are categorized, not listed as buzzwords |
| AP-03: No Metrics Anywhere | 🟢 | Safe — Banking has strong metrics |
| AP-04: Resume PDF Embed | 🟢 | Safe — no PDF embed |
| AP-05: Generic Template Feel | 🟢 | Safe — dark theme + ASCII architecture is distinctive |
| AP-06: No Case Study Depth | 🟢 | Safe — Banking case study is 13 sections deep |
| AP-07: Missing GitHub Links | 🟢 | Safe — all projects have GitHub links |
| AP-08: No Limitations Acknowledged | 🟢 | Safe — Banking has explicit Limitations + V2 Improvements |
| AP-09: Overly Complex Navigation | 🟢 | Safe — simple 6-link nav |
| AP-10: No Mobile Responsiveness | 🟢 | Safe — Tailwind responsive classes throughout |

**Key risk**: AP-01 (Skill List Without Evidence) is the only anti-pattern at risk. P0-3 (EB-002) addresses this directly.

---

## Next Steps

1. **Immediately**: Extend TypeScript interfaces in `projects.ts`, `skills.ts`, `experience.ts`
2. **Then**: Enrich content — write structured data for all 4 projects, rewrite experience bullets
3. **Then**: Implement P0 UI changes (data-driven case studies, metrics experience, skill→project links)
4. **Finally**: P1 UI polish (filters, thumbnails, badges, cross-links)
