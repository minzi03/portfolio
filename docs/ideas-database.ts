/**
 * Master Ideas Database
 * =====================
 * Deduplicated patterns from 18 reverse-engineered portfolios.
 * Source of truth for all design/implementation decisions.
 * Research phase completed: 2026-08-12.
 *
 * Portfolios analyzed (18):
 * 1.  Koketso Raphasha (portfolio-iota-eight-90.vercel.app)
 * 2.  Kazim Haider Syed (kazimhaiderportfolio.lovable.app)
 * 3.  Erwin Glenn Capitan II (glcapitan.github.io)
 * 4.  Bodin Krongchon (bodinkc30-pete.github.io)
 * 5.  Ishaq Omotosho (tosholadipo.netlify.app)
 * 6.  Surafel Asfawosen (surafelasfawosen.github.io)
 * 7.  Zeineb Ghrab (zeinebghrab.vercel.app)
 * 8.  F1LEO / Maaskk (maaskk.github.io)
 * 9.  Raju Nalla (raju-nalla.github.io)
 * 10. Hemanth Sai Kumar P (0iamhsk0.github.io)
 * 11. Franz Monzales / ikidevs (ikidevs.vercel.app)
 * 12. Alex Merced (alexmercedcoder.dev)
 * 13. Mohamed Taha Abo Heiba (motahaaboheiba.github.io)
 * 14. Ahmed Raoofuddin (ahmedraoofuddin.github.io/portfolio/)
 * 15. Dinesh Daki (dakidinesh.github.io/portfolio/)
 * 16. Crystal Jacobs (crystal888.co.za)
 * 17. Milton N. Ngwenya (ngwenya-mn.github.io/project_portfolio/)
 * 18. Đỗ Kiến Hưng / darktheDE (darktheDE.github.io)
 *
 * Last updated: 2026-08-12
 */

// ─── Types ───────────────────────────────────────────────────────────

export type IdeaCategory =
  | "Hero"
  | "Navigation"
  | "Layout"
  | "Typography"
  | "Animation"
  | "Projects"
  | "Experience"
  | "Skills"
  | "Credentials"
  | "About"
  | "Contact"
  | "Interaction"
  | "Data"
  | "SEO"
  | "Performance"
  | "Architecture"
  | "Other";

export type ReuseTier = "HIGH" | "MEDIUM" | "LOW" | "DO_NOT_COPY";

export type EvidenceStrength = "STRONG" | "MEDIUM" | "WEAK";

export type PortfolioSlug =
  | "koketso"
  | "kazim"
  | "erwin"
  | "bodin"
  | "ishaq"
  | "surafel"
  | "zeineb"
  | "f1leo"
  | "raju"
  | "hemanth"
  | "franz"
  | "alex"
  | "mohamed"
  | "ahmed"
  | "dinesh"
  | "crystal"
  | "milton"
  | "darkthe";

export interface PatternFamily {
  id: string;
  name: string;
  description: string;
  /** Core insight that unifies all patterns in this family */
  coreInsight: string;
  /** Which portfolio demonstrated this family most strongly */
  bestExample: PortfolioSlug;
}

export interface PortfolioIdea {
  id: string;
  /** Short descriptive name */
  idea: string;
  /** Family this pattern belongs to */
  family: string;
  /** UI/content category */
  category: IdeaCategory;

  primarySource: PortfolioSlug;
  alsoSeenIn: PortfolioSlug[];

  /** 1–10: impact on hiring signal */
  impact: number;
  /** 1–10: implementation difficulty */
  effort: number;

  /** 1–10: value for recruiter (30-sec scan) */
  recruiterValue: number;
  /** 1–10: value for engineer (10-min review) */
  engineerValue: number;
  /** 1–10: value for designer/reviewer */
  designerValue: number;

  evidenceStrength: EvidenceStrength;
  reuseTier: ReuseTier;

  /** Why this matters — the analytical rationale */
  rationale: string;
  risks?: string[];
  implementationNotes?: string[];

  /** Whether this applies to a Data Engineering portfolio */
  applicableToDE: boolean;
}

// ─── Pattern Families ────────────────────────────────────────────────

export const FAMILIES: PatternFamily[] = [
  {
    id: "QUANTIFIED_EVIDENCE",
    name: "Quantified Evidence",
    description:
      "Every claim is backed by a measurable metric — scale, performance, improvement, or quality.",
    coreInsight:
      "Metrics replace adjectives. '80→12min' beats 'significantly faster'. Numbers are the universal engineering language.",
    bestExample: "mohamed",
  },
  {
    id: "ENGINEERING_REASONING",
    name: "Engineering Reasoning",
    description:
      "Projects are presented as engineering narratives: problem, constraints, architecture, decisions, trade-offs, and impact.",
    coreInsight:
      "Senior engineers evaluate candidates by HOW they think, not WHAT tools they list. Trade-offs reveal thinking.",
    bestExample: "mohamed",
  },
  {
    id: "ARCHITECTURE_VISUALIZATION",
    name: "Architecture Visualization",
    description:
      "Data flow diagrams, system architecture, and visual data models that explain how systems work.",
    coreInsight:
      "A good architecture diagram communicates more in 5 seconds than a paragraph of text. It's the closest thing to 'show, don't tell' in engineering.",
    bestExample: "mohamed",
  },
  {
    id: "EVIDENCE_BASED_SKILLS",
    name: "Evidence-Based Skills",
    description:
      "Skills are proven through project/work references, not self-rated percentages.",
    coreInsight:
      "A skill without evidence is a claim. A skill with a project reference is proof. Built vs Studied is more honest than 95%.",
    bestExample: "f1leo",
  },
  {
    id: "PROGRESSIVE_PROJECT_DEPTH",
    name: "Progressive Project Depth",
    description:
      "Homepage shows summary; depth is available on demand via expanders, modals, or dedicated pages.",
    coreInsight:
      "Two visitors have different needs: recruiter wants 30-sec scan, engineer wants 10-min deep dive. Progressive disclosure serves both.",
    bestExample: "hemanth",
  },
  {
    id: "RECRUITER_FIRST_POSITIONING",
    name: "Recruiter-First Positioning",
    description:
      "Hero, navigation, and above-fold content are optimized for recruiter 30-second scan.",
    coreInsight:
      "The #1 hiring funnel filter is 30-second recruiter scan. If they can't identify your role, proof, and resume in 30 seconds, the portfolio fails its primary purpose.",
    bestExample: "ahmed",
  },
  {
    id: "EXPERIENCE_STORYTELLING",
    name: "Experience Storytelling",
    description:
      "Work history is presented with quantified outcomes, technical depth, and career progression.",
    coreInsight:
      "Experience section is where 'good candidate' becomes 'hired candidate'. Metrics in bullets are the strongest signal.",
    bestExample: "ahmed",
  },
  {
    id: "PROJECT_DISCOVERY",
    name: "Project Discovery",
    description:
      "Projects are categorized, filterable, and linked to show ecosystem relationships.",
    coreInsight:
      "When projects compose into systems, the candidate demonstrates systems thinking — a senior signal.",
    bestExample: "alex",
  },
  {
    id: "TECHNICAL_KNOWLEDGE",
    name: "Technical Knowledge",
    description:
      "Integrated technical writing, data lab, experiments, and tooling that demonstrate thought leadership.",
    coreInsight:
      "Writing is thinking made visible. A portfolio with writing demonstrates communication + depth — two signals in one.",
    bestExample: "alex",
  },
  {
    id: "DATA_DRIVEN_ARCHITECTURE",
    name: "Data-Driven Portfolio Architecture",
    description:
      "Portfolio content is decoupled from UI — data in TypeScript/JSON, components render from data.",
    coreInsight:
      "A portfolio built with good architecture signals engineering maturity before anyone reads a single project. Code quality = engineering signal.",
    bestExample: "franz",
  },
  {
    id: "TRUST_VERIFICATION",
    name: "Trust & Verification",
    description:
      "Credentials, claims, and status are verifiable — not just claimed.",
    coreInsight:
      "Trust is built by making claims verifiable. Verified credentials > claimed credentials. Honest limitations > false confidence.",
    bestExample: "f1leo",
  },
  {
    id: "USEFUL_INTERACTION",
    name: "Useful Interaction",
    description:
      "Interactions serve information comprehension (filters, expanders, theme) rather than decoration (particles, cursors).",
    coreInsight:
      "Interaction should serve information, not compete with it. An interactive architecture diagram > a particle background.",
    bestExample: "mohamed",
  },
];

// ─── All Patterns (Deduplicated) ─────────────────────────────────────

export const IDEAS: PortfolioIdea[] = [
  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 01: QUANTIFIED EVIDENCE
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "QE-001",
    idea: "Outcome-first Hero with business metrics",
    family: "QUANTIFIED_EVIDENCE",
    category: "Hero",
    primarySource: "erwin",
    alsoSeenIn: ["mohamed", "ahmed", "raju", "zeineb"],
    impact: 10,
    effort: 2,
    recruiterValue: 10,
    engineerValue: 7,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Hero metrics like '80→12min' or '4 end-to-end projects' replace vague adjectives with proof. Recruiter gets scale signal in 3 seconds.",
    implementationNotes: [
      "Pick 3 metrics max: scale, impact, credibility",
      "Use real numbers from actual projects",
      "Avoid vanity metrics (GitHub stars, followers)",
    ],
    applicableToDE: true,
  },
  {
    id: "QE-002",
    idea: "Metrics-first Experience bullets",
    family: "QUANTIFIED_EVIDENCE",
    category: "Experience",
    primarySource: "ahmed",
    alsoSeenIn: ["zeineb", "ishaq", "mohamed"],
    impact: 10,
    effort: 1,
    recruiterValue: 10,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "p95 <800ms, -80% manual processing, 1.5k req/min — these are the strongest signals in any portfolio. They replace 'responsible for' with 'achieved'.",
    risks: [
      "Don't fabricate metrics — engineer will ask about them",
      "If no real metrics exist, use scale metrics instead",
    ],
    implementationNotes: [
      "Structure: Action → Architecture → Outcome → Metric",
      "Every bullet should answer 'so what?'",
      "Quantify everything possible: rows, time, reduction, coverage",
    ],
    applicableToDE: true,
  },
  {
    id: "QE-003",
    idea: "Before/after performance metrics",
    family: "QUANTIFIED_EVIDENCE",
    category: "Projects",
    primarySource: "raju",
    alsoSeenIn: ["mohamed", "erwin"],
    impact: 10,
    effort: 2,
    recruiterValue: 9,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Single before/after metric (80min→12min) has more impact than entire animation system. It's the most concise proof of engineering value.",
    implementationNotes: [
      "Pick the ONE most impressive improvement per project",
      "Format: 'Before → After' or '-X% improvement'",
      "Can be used in Hero, Experience, or Project cards",
    ],
    applicableToDE: true,
  },
  {
    id: "QE-004",
    idea: "Project scale metrics",
    family: "QUANTIFIED_EVIDENCE",
    category: "Projects",
    primarySource: "mohamed",
    alsoSeenIn: ["f1leo", "ahmed", "erwin"],
    impact: 9,
    effort: 2,
    recruiterValue: 8,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Scale metrics (4.6M rows, 70K records, 15+ labs) prove the candidate has handled real data volumes, not just tutorials.",
    implementationNotes: [
      "Use data volume, processing time, or system complexity",
      "Be honest about what 'scale' means in context",
      "Pair with architecture for full credibility",
    ],
    applicableToDE: true,
  },
  {
    id: "QE-005",
    idea: "Reliability and quality metrics",
    family: "QUANTIFIED_EVIDENCE",
    category: "Projects",
    primarySource: "mohamed",
    alsoSeenIn: ["f1leo", "erwin"],
    impact: 9,
    effort: 2,
    recruiterValue: 8,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "25+ DQ checks, 90% test coverage, zero-downtime — reliability metrics signal maturity beyond just building things.",
    implementationNotes: [
      "Include DQ checks, test coverage, uptime, or error rates",
      "These are especially valuable for Data Engineering",
      "Pair with Quality layer in architecture",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 02: ENGINEERING_REASONING
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "ER-001",
    idea: "Problem → Architecture → Tradeoff → Impact case study",
    family: "ENGINEERING_REASONING",
    category: "Projects",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin", "f1leo", "alex"],
    impact: 10,
    effort: 3,
    recruiterValue: 8,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "This is the single most powerful project presentation pattern. It transforms a project from 'what I built' to 'how I think'. Senior engineers evaluate candidates by reasoning, not tool lists.",
    implementationNotes: [
      "Problem: Why does this project exist? What business need?",
      "Architecture: How is the system designed? Data flow?",
      "Tradeoff: Why A not B? What constraints? What failed?",
      "Impact: What changed? Measurable improvement?",
      "This is the #1 pattern for Data Engineering portfolio",
    ],
    applicableToDE: true,
  },
  {
    id: "ER-002",
    idea: "Constraints as context for decisions",
    family: "ENGINEERING_REASONING",
    category: "Projects",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin", "alex"],
    impact: 9,
    effort: 2,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed explained CDC was not chosen due to Databricks Free Edition constraints. This shows real-world engineering thinking: you work within constraints.",
    risks: [
      "Must be honest — fabricated constraints are worse than none",
    ],
    applicableToDE: true,
  },
  {
    id: "ER-003",
    idea: "Failure and lessons learned",
    family: "ENGINEERING_REASONING",
    category: "Projects",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin", "alex"],
    impact: 9,
    effort: 2,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed documented a 10x row-inflation defect. Alex disclosed what projects are NOT ready for. Honesty about failures signals maturity more than false confidence.",
    risks: [
      "Choose failures that show learning, not incompetence",
      "Keep it brief — one sentence per failure is enough",
    ],
    applicableToDE: true,
  },
  {
    id: "ER-004",
    idea: "Decision rationale for technology choices",
    family: "ENGINEERING_REASONING",
    category: "Projects",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin", "f1leo", "alex"],
    impact: 9,
    effort: 2,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Why Spark not Flink? Why Delta not Parquet? Why batch not streaming? Decision rationale separates engineers from tool users.",
    implementationNotes: [
      "One sentence per decision is enough",
      "Focus on the 2-3 most interesting decisions per project",
      "Pair with constraints for full context",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 03: ARCHITECTURE_VISUALIZATION
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "AV-001",
    idea: "Data flow / architecture diagram per project",
    family: "ARCHITECTURE_VISUALIZATION",
    category: "Projects",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin", "hemanth", "f1leo"],
    impact: 10,
    effort: 5,
    recruiterValue: 8,
    engineerValue: 10,
    designerValue: 9,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Architecture diagram is the closest thing to 'show, don't tell' in engineering. Recruiter sees Sources→Ingestion→Storage→Transform→Serving. Engineer sees ownership, boundaries, format choices.",
    risks: [
      "Diagrams must be accurate — engineer will verify",
      "Keep them readable on mobile",
    ],
    implementationNotes: [
      "Use simple node-arrow or layered layout",
      "Label data formats at each stage",
      "Show orchestration layer explicitly",
      "Consider SVG for crisp rendering at any scale",
    ],
    applicableToDE: true,
  },
  {
    id: "AV-004",
    idea: "Architecture screenshot as project card thumbnail",
    family: "ARCHITECTURE_VISUALIZATION",
    category: "Projects",
    primarySource: "darkthe",
    alsoSeenIn: ["mohamed"],
    impact: 9,
    effort: 3,
    recruiterValue: 9,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "darktheDE uses architecture diagrams as project thumbnails instead of dashboard screenshots. Recruiter immediately sees 'this candidate thinks in systems'. Engineer can quickly assess technical depth from the diagram alone.",
    implementationNotes: [
      "Export architecture diagram as PNG/SVG for card thumbnail",
      "Keep diagram simple enough to read at card size",
      "Full-size version opens on click/modal",
      "Better than dashboard screenshot for Data Engineering",
    ],
    applicableToDE: true,
  },
  {
    id: "AV-002",
    idea: "Medallion Architecture as website IA concept",
    family: "ARCHITECTURE_VISUALIZATION",
    category: "Layout",
    primarySource: "hemanth",
    alsoSeenIn: [],
    impact: 8,
    effort: 6,
    recruiterValue: 7,
    engineerValue: 9,
    designerValue: 8,
    evidenceStrength: "MEDIUM",
    reuseTier: "MEDIUM",
    rationale:
      "Hemanth used Bronze/Silver/Gold as the website IA itself — not just a data architecture concept. This creates a clever parallel between content and domain.",
    risks: [
      "May confuse non-technical recruiters",
      "Requires careful explanation",
    ],
    applicableToDE: true,
  },
  {
    id: "AV-003",
    idea: "Engineering workflow as interactive visualization",
    family: "ARCHITECTURE_VISUALIZATION",
    category: "Interaction",
    primarySource: "mohamed",
    alsoSeenIn: [],
    impact: 10,
    effort: 7,
    recruiterValue: 8,
    engineerValue: 10,
    designerValue: 9,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed's 8-stage workflow (Business Need→Ingestion→Storage→Transformation→Modeling→DQ→Orchestration→Serving) maps to projects. It demonstrates process thinking, not just tool knowledge.",
    risks: [
      "High implementation cost",
      "Must map to real projects — generic workflow is useless",
    ],
    implementationNotes: [
      "Start with simpler version: static workflow with links",
      "Make it interactive later if time allows",
      "Key: bidirectional mapping between workflow and projects",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 04: EVIDENCE_BASED_SKILLS
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "EB-001",
    idea: "Built vs Studied skill state",
    family: "EVIDENCE_BASED_SKILLS",
    category: "Skills",
    primarySource: "mohamed",
    alsoSeenIn: ["f1leo", "alex"],
    impact: 10,
    effort: 3,
    recruiterValue: 9,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed distinguished .skill-chip.built from .skill-chip.studied. This is honest and more credible than 95%. It answers 'have you actually used this?'",
    implementationNotes: [
      "built = used in a real project or work",
      "studied = completed courses/tutorials, not yet applied",
      "Consider adding project reference for 'built' skills",
    ],
    applicableToDE: true,
  },
  {
    id: "EB-002",
    idea: "Skill → Project evidence mapping",
    family: "EVIDENCE_BASED_SKILLS",
    category: "Skills",
    primarySource: "f1leo",
    alsoSeenIn: ["mohamed", "alex"],
    impact: 10,
    effort: 4,
    recruiterValue: 9,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "F1LEO derived skills from actual work. Showing 'Spark — used in Banking Platform (4.6M rows)' is infinitely more credible than 'Spark 90%'.",
    implementationNotes: [
      "Each skill links to 1-2 projects where it was used",
      "Show scale/context: 'used in Banking Platform, 4.6M rows'",
      "This requires good project data first",
    ],
    applicableToDE: true,
  },
  {
    id: "EB-003",
    idea: "Evidence-derived skill taxonomy",
    family: "EVIDENCE_BASED_SKILLS",
    category: "Skills",
    primarySource: "f1leo",
    alsoSeenIn: ["mohamed"],
    impact: 9,
    effort: 4,
    recruiterValue: 8,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Instead of generic categories (Frontend, Backend), derive skill categories from actual work: Pipeline Engineering, Storage, Quality, Cloud. This shows domain expertise.",
    applicableToDE: true,
  },
  {
    id: "EB-004",
    idea: "Avoid skill percentage bars",
    family: "EVIDENCE_BASED_SKILLS",
    category: "Skills",
    primarySource: "ahmed",
    alsoSeenIn: ["koketso", "kazim", "ishaq"],
    impact: 10,
    effort: 1,
    recruiterValue: 9,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Skill percentages (Python 95%, Spark 90%) are the most common anti-pattern across all 18 portfolios. They create precision without measurement. Every senior engineer knows these are meaningless.",
    risks: [
      "Removing percentages requires replacement — evidence mapping",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 05: PROGRESSIVE_PROJECT_DEPTH
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "PD-001",
    idea: "Expandable engineering details per project",
    family: "PROGRESSIVE_PROJECT_DEPTH",
    category: "Projects",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin"],
    impact: 9,
    effort: 3,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed's accordion shows Problem/Architecture/Tradeoff/Impact on click. Recruiter sees summary; engineer can expand for depth. Best of both worlds.",
    implementationNotes: [
      "Use semantic <button> with aria-expanded",
      "Default collapsed — summary is the default view",
      "Keep expanded content concise — 2-4 sentences per field",
    ],
    applicableToDE: true,
  },
  {
    id: "PD-002",
    idea: "README modal for on-demand depth",
    family: "PROGRESSIVE_PROJECT_DEPTH",
    category: "Projects",
    primarySource: "hemanth",
    alsoSeenIn: ["mohamed", "erwin"],
    impact: 10,
    effort: 4,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Hemanth's modal shows full technical README without leaving the page. Engineer gets depth; recruiter is not overwhelmed.",
    implementationNotes: [
      "Modal should have clear close button and Escape handling",
      "Content: README-style with code blocks, architecture, setup",
      "Consider making this a separate page for SEO",
    ],
    applicableToDE: true,
  },
  {
    id: "PD-003",
    idea: "Separate case-study page per flagship project",
    family: "PROGRESSIVE_PROJECT_DEPTH",
    category: "Projects",
    primarySource: "erwin",
    alsoSeenIn: ["mohamed"],
    impact: 10,
    effort: 6,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Erwin's separate case-study pages had honest notes and validation results. Deep-dive pages serve engineer visitors who want full context.",
    risks: [
      "Only for flagship projects — not every project needs a page",
      "Requires unique URL for SEO benefit",
    ],
    applicableToDE: true,
  },
  {
    id: "PD-004",
    idea: "Direct code link per project",
    family: "PROGRESSIVE_PROJECT_DEPTH",
    category: "Projects",
    primarySource: "zeineb",
    alsoSeenIn: ["f1leo", "mohamed", "ahmed", "alex"],
    impact: 10,
    effort: 1,
    recruiterValue: 8,
    engineerValue: 10,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Direct GitHub link is the simplest trust signal. It says 'I have nothing to hide'. Every strong portfolio has this.",
    implementationNotes: [
      "Link to specific repo, not just GitHub profile",
      "Consider linking to specific branch/commit if relevant",
      "Include live demo link when available",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 06: RECRUITER_FIRST_POSITIONING
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "RP-001",
    idea: "One clear primary role in Hero",
    family: "RECRUITER_FIRST_POSITIONING",
    category: "Hero",
    primarySource: "alex",
    alsoSeenIn: ["erwin", "mohamed", "f1leo"],
    impact: 10,
    effort: 1,
    recruiterValue: 10,
    engineerValue: 6,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Multiple portfolios showed that 3-5 rotating roles dilute positioning. 'Data Engineer' is stronger than 'Data Engineer | Cloud Engineer | Pipeline Architect'.",
    risks: [
      "Typing animation with 5 roles adds novelty but dilutes identity",
    ],
    implementationNotes: [
      "One fixed role: 'Data Engineer'",
      "If typing animation is used, keep max 2-3 related roles",
      "Primary role should be visible without JS",
    ],
    applicableToDE: true,
  },
  {
    id: "RP-002",
    idea: "Projects + CV dual primary CTA in Hero",
    family: "RECRUITER_FIRST_POSITIONING",
    category: "Hero",
    primarySource: "darkthe",
    alsoSeenIn: ["mohamed", "ahmed", "erwin", "zeineb"],
    impact: 10,
    effort: 1,
    recruiterValue: 10,
    engineerValue: 7,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "darktheDE's Hero has 'View Data Projects' + 'Download Data CV' as dual primary CTAs. This serves both recruiter (CV) and engineer (projects) simultaneously. Mohamed also had Resume in Hero, but darktheDE adds Projects as equal-weight CTA.",
    implementationNotes: [
      "Primary CTA: View Projects (for engineers)",
      "Secondary CTA: Download CV (for recruiters)",
      "Both should be visible without scrolling",
      "Use distinct visual weight: filled vs outline button",
    ],
    applicableToDE: true,
  },
  {
    id: "RP-003",
    idea: "Quantified proof cards in Hero",
    family: "RECRUITER_FIRST_POSITIONING",
    category: "Hero",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin", "raju", "ahmed"],
    impact: 9,
    effort: 2,
    recruiterValue: 9,
    engineerValue: 7,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed's Hero showed '4 projects, ~240ms latency, 2 certifications' as proof cards. Recruiter gets scale + credibility in 3 seconds.",
    implementationNotes: [
      "3 metrics max in Hero",
      "Mix: scale metric + quality metric + credibility metric",
      "Use static HTML values (not JS-animated) for SEO",
    ],
    applicableToDE: true,
  },
  {
    id: "RP-004",
    idea: "Availability badge above Hero name",
    family: "RECRUITER_FIRST_POSITIONING",
    category: "Hero",
    primarySource: "ishaq",
    alsoSeenIn: ["erwin", "zeineb", "alex"],
    impact: 9,
    effort: 1,
    recruiterValue: 10,
    engineerValue: 5,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Ishaq's 'Available for opportunities' badge above the name is the strongest availability signal. It's the first thing recruiter sees — removes ambiguity about hiring status instantly. Erwin/Zeineb also had availability but less prominent placement.",
    risks: [
      "Only show if actually available",
      "Must be accurate — stale availability hurts trust",
    ],
    implementationNotes: [
      "Place above name, not below",
      "Use distinct color (green/success token)",
      "Keep text short: 'Available for opportunities'",
      "Consider removing or changing to 'Currently employed' when not available",
    ],
    applicableToDE: true,
  },
  {
    id: "RP-005",
    idea: "Interactive Career Arc (Education → Work → Projects) in Hero",
    family: "RECRUITER_FIRST_POSITIONING",
    category: "Hero",
    primarySource: "dinesh",
    alsoSeenIn: [],
    impact: 9,
    effort: 5,
    recruiterValue: 10,
    engineerValue: 7,
    designerValue: 9,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Dinesh's Career Story Reel compresses entire career trajectory into Hero: Education → Work → Projects, each with metrics. Recruiter sees seniority + proof in 10 seconds without scrolling. First-of-its-kind in all 18 portfolios reviewed.",
    risks: [
      "Auto-rotation must pause on hover/focus",
      "Must respect prefers-reduced-motion",
      "Content must be genuinely strong — weak metrics hurt more than help",
    ],
    implementationNotes: [
      "3 chapters max: Education, Work, Projects",
      "Auto-rotate every 4-6s with click-to-select override",
      "Use AnimatePresence or CSS transitions for chapter switching",
      "Each chapter shows 2-3 quantified metrics",
      "Accessibility: aria-current='step', real buttons, pause on focus",
    ],
    applicableToDE: true,
  },
  {
    id: "RP-006",
    idea: "Role-specific code/visual Hero (Data Engineer → ETL snippet)",
    family: "RECRUITER_FIRST_POSITIONING",
    category: "Hero",
    primarySource: "milton",
    alsoSeenIn: [],
    impact: 8,
    effort: 3,
    recruiterValue: 8,
    engineerValue: 7,
    designerValue: 9,
    evidenceStrength: "MEDIUM",
    reuseTier: "MEDIUM",
    rationale:
      "Milton's ETL code-editor Hero shows extract→transform→load as a visual metaphor. It communicates 'Data Engineer' faster than text alone. BUT: it's decorative, not evidence. Must be paired with real project evidence to avoid looking like the only thing the candidate can show.",
    risks: [
      "Decorative code can create false impression of depth",
      "Must NOT substitute for real project evidence",
      "Keep it simple — one snippet, not a full codebase",
    ],
    implementationNotes: [
      "Use a simplified, accurate data flow snippet",
      "Show on desktop only (hide on mobile for performance)",
      "Pair with real metrics: '4.6M rows processed'",
      "Consider: is this better than an architecture diagram?",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 07: EXPERIENCE_STORYTELLING
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "ES-001",
    idea: "Quantified business impact in work bullets",
    family: "EXPERIENCE_STORYTELLING",
    category: "Experience",
    primarySource: "ahmed",
    alsoSeenIn: ["zeineb", "ishaq", "mohamed"],
    impact: 10,
    effort: 1,
    recruiterValue: 10,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Ahmed's bullets: '+35% qualified leads', '-80% manual screening', 'p95 <800ms'. These replace 'responsible for' with 'achieved'.",
    implementationNotes: [
      "Every bullet should have a number",
      "If no business metric, use scale metric (rows, records, time)",
      "Action → Context → Outcome format",
    ],
    applicableToDE: true,
  },
  {
    id: "ES-002",
    idea: "Career progression narrative",
    family: "EXPERIENCE_STORYTELLING",
    category: "Experience",
    primarySource: "ahmed",
    alsoSeenIn: ["alex", "zeineb"],
    impact: 8,
    effort: 2,
    recruiterValue: 8,
    engineerValue: 7,
    designerValue: 7,
    evidenceStrength: "MEDIUM",
    reuseTier: "MEDIUM",
    rationale:
      "Ahmed showed Full Stack → Solutions → AI Engineer progression. Clear growth narrative helps recruiter assess trajectory.",
    risks: [
      "Only works if there IS a progression to show",
      "Don't force narrative where none exists",
    ],
    applicableToDE: true,
  },
  {
    id: "ES-003",
    idea: "Best-performer / achievement highlight",
    family: "EXPERIENCE_STORYTELLING",
    category: "Experience",
    primarySource: "mohamed",
    alsoSeenIn: ["zeineb"],
    impact: 8,
    effort: 1,
    recruiterValue: 9,
    engineerValue: 6,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "MEDIUM",
    rationale:
      "Mohamed's '#1 / 30+ trainee' and 'best-performing trainee' are strong credibility signals for fresh graduates.",
    risks: [
      "Must be verifiable — don't fabricate rankings",
    ],
    applicableToDE: true,
  },
  {
    id: "ES-004",
    idea: "Internship as mini case study",
    family: "EXPERIENCE_STORYTELLING",
    category: "Experience",
    primarySource: "zeineb",
    alsoSeenIn: ["mohamed", "ishaq"],
    impact: 9,
    effort: 3,
    recruiterValue: 9,
    engineerValue: 8,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Zeineb treated each internship as a mini case study with context, contribution, and outcome. Much stronger than just listing company + role.",
    implementationNotes: [
      "For each role: What was the context? What did you do? What changed?",
      "Include technology tags per role",
      "Quantify contribution when possible",
    ],
    applicableToDE: true,
  },
  {
    id: "ES-005",
    idea: "Domain-to-engineering career evolution narrative",
    family: "EXPERIENCE_STORYTELLING",
    category: "Experience",
    primarySource: "crystal",
    alsoSeenIn: [],
    impact: 9,
    effort: 3,
    recruiterValue: 9,
    engineerValue: 7,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "MEDIUM",
    rationale:
      "Crystal's Agriculture → Operations → Business Systems → Analytics → Automation → AI/IoT narrative is the most distinctive career story across all 18 portfolios. It demonstrates deliberate evolution, not random job changes. Especially powerful for career-transition candidates.",
    risks: [
      "Only works if there IS a genuine evolution story",
      "Don't force narrative where none exists",
      "Must connect to current technical positioning",
    ],
    implementationNotes: [
      "Show clear progression: domain → systems → data → engineering",
      "Connect each step to the next: 'This led to...'",
      "Use timeline or visual roadmap format",
      "Most powerful for non-traditional backgrounds",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 08: PROJECT_DISCOVERY
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "PD-005",
    idea: "Project category filters",
    family: "PROJECT_DISCOVERY",
    category: "Projects",
    primarySource: "ahmed",
    alsoSeenIn: ["f1leo", "alex"],
    impact: 8,
    effort: 3,
    recruiterValue: 8,
    engineerValue: 8,
    designerValue: 7,
    evidenceStrength: "MEDIUM",
    reuseTier: "HIGH",
    rationale:
      "Filters let recruiter find relevant projects fast. 'Show me Data Pipeline projects' vs scrolling through everything.",
    implementationNotes: [
      "Categories should match how recruiter thinks: domain-based",
      "Use 'All' as default",
      "Keep to 3-5 categories max",
    ],
    applicableToDE: true,
  },
  {
    id: "PD-006",
    idea: "Separate tooling vs platform projects",
    family: "PROJECT_DISCOVERY",
    category: "Projects",
    primarySource: "franz",
    alsoSeenIn: ["alex"],
    impact: 10,
    effort: 2,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Franz separated 'Tools' (reusable libraries, quality utilities) from 'Platform' (data pipelines). This signals higher engineering capability — building tools for others.",
    implementationNotes: [
      "Tools/Utilities section vs Platform/Systems section",
      "Tools signal abstraction ability — a senior trait",
      "Even one tool project changes perception significantly",
    ],
    applicableToDE: true,
  },
  {
    id: "PD-007",
    idea: "Project ecosystem relationships",
    family: "PROJECT_DISCOVERY",
    category: "Projects",
    primarySource: "alex",
    alsoSeenIn: ["franz", "mohamed"],
    impact: 10,
    effort: 4,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Alex showed MagGraph → MagAgent → Mag Command Center. Projects compose into systems = systems thinking. Senior signal.",
    implementationNotes: [
      "Show how projects relate: dependencies, shared data, evolution",
      "Can be visual (arrow diagram) or text-based",
      "Only for projects that actually relate",
    ],
    applicableToDE: true,
  },
  {
    id: "PD-008",
    idea: "Project maturity states with summary counts",
    family: "PROJECT_DISCOVERY",
    category: "Projects",
    primarySource: "crystal",
    alsoSeenIn: ["mohamed", "alex", "erwin"],
    impact: 10,
    effort: 1,
    recruiterValue: 10,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Crystal's LIVE / IN DEVELOPMENT / PLANNED model with summary counts ('2 Live, 2 In Dev, 5 Planned') is the strongest maturity disclosure pattern. It prevents roadmap from being mistaken for experience. Mohamed and Alex also showed status but without summary counts.",
    implementationNotes: [
      "Status: LIVE | IN_DEVELOPMENT | PLANNED",
      "Show maturity count summary at top of projects section",
      "LIVE projects must have source/demo link",
      "PLANNED projects must never imply implementation",
      "Color-code status badges for quick scanning",
    ],
    applicableToDE: true,
  },
  {
    id: "PD-009",
    idea: "Experience ↔ Project evidence mapping (bidirectional)",
    family: "PROJECT_DISCOVERY",
    category: "Projects",
    primarySource: "ishaq",
    alsoSeenIn: [],
    impact: 10,
    effort: 4,
    recruiterValue: 9,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Ishaq's strongest pattern: the same systems appear across Experience AND Projects. Agrandi work → Retayl project, Astradrop work → Astradrop project. Projects become evidence for professional claims, not isolated demos.",
    implementationNotes: [
      "Each project links to related experience entry",
      "Each experience entry links to related projects",
      "Only works for real production work, not personal demos",
    ],
    applicableToDE: true,
  },
  {
    id: "PD-010",
    idea: "Featured + supporting project hierarchy",
    family: "PROJECT_DISCOVERY",
    category: "Projects",
    primarySource: "darkthe",
    alsoSeenIn: [],
    impact: 10,
    effort: 3,
    recruiterValue: 10,
    engineerValue: 9,
    designerValue: 9,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "darktheDE shows one featured project (large card) + supporting projects (smaller cards) after category filter. This creates visual hierarchy — recruiter sees best work first, can browse more if interested. Much stronger than flat 3×3 grid of equal cards.",
    implementationNotes: [
      "Filter by category first",
      "First project = featured (larger card, more detail)",
      "Rest = supporting (smaller cards, summary only)",
      "Featured project should be your strongest work",
      "Supporting projects still need GitHub/live links",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 09: TECHNICAL_KNOWLEDGE
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "TK-001",
    idea: "Integrated technical blog",
    family: "TECHNICAL_KNOWLEDGE",
    category: "Other",
    primarySource: "alex",
    alsoSeenIn: ["ahmed"],
    impact: 9,
    effort: 6,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "MEDIUM",
    rationale:
      "Alex and Ahmed had integrated blogs. Writing demonstrates communication + depth — two signals in one. Especially powerful for thought leadership.",
    risks: [
      "Only valuable if content is genuinely good",
      "Stale blog is worse than no blog",
      "Consider starting with 2-3 articles, not 20",
    ],
    applicableToDE: true,
  },
  {
    id: "TK-002",
    idea: "Data Lab / Experiments section",
    family: "TECHNICAL_KNOWLEDGE",
    category: "Other",
    primarySource: "franz",
    alsoSeenIn: ["alex"],
    impact: 9,
    effort: 7,
    recruiterValue: 6,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "MEDIUM",
    reuseTier: "MEDIUM",
    rationale:
      "Franz had a Data Lab with live experiments. This demonstrates curiosity and technical depth beyond assigned work.",
    risks: [
      "High implementation cost",
      "Must show actual experiments, not just placeholder",
    ],
    applicableToDE: true,
  },
  {
    id: "TK-003",
    idea: "Technical writing as portfolio section",
    family: "TECHNICAL_KNOWLEDGE",
    category: "Other",
    primarySource: "alex",
    alsoSeenIn: ["ahmed", "franz"],
    impact: 8,
    effort: 5,
    recruiterValue: 6,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "MEDIUM",
    reuseTier: "MEDIUM",
    rationale:
      "Alex's blog covered specific technical niches (Apache Iceberg, Delta Lake). This establishes authority in a domain.",
    risks: [
      "Quality > quantity — 3 good articles > 20 mediocre ones",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 10: DATA_DRIVEN_ARCHITECTURE
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "DA-001",
    idea: "Centralized TypeScript content file",
    family: "DATA_DRIVEN_ARCHITECTURE",
    category: "Data",
    primarySource: "franz",
    alsoSeenIn: ["mohamed", "alex"],
    impact: 10,
    effort: 4,
    recruiterValue: 6,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Franz centralized all portfolio content in TypeScript data files. Components render from data. This is the cleanest architecture pattern across all 18 portfolios.",
    implementationNotes: [
      "One file per content type: projects.ts, skills.ts, experience.ts",
      "Components receive data as props — no hardcoded content",
      "Makes adding new projects trivial",
      "Type safety catches data errors at build time",
    ],
    applicableToDE: true,
  },
  {
    id: "DA-002",
    idea: "Content-as-data for all repeated UI",
    family: "DATA_DRIVEN_ARCHITECTURE",
    category: "Data",
    primarySource: "franz",
    alsoSeenIn: ["mohamed", "alex"],
    impact: 9,
    effort: 4,
    recruiterValue: 5,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed's PROJECTS[] and WORKFLOW_STAGES[] are data-driven. No repeated HTML for each project card. This scales.",
    implementationNotes: [
      "Every repeated UI pattern should be driven by data",
      "Projects, skills, experience, credentials — all data",
      "Template renders from data, not from hardcoded HTML",
    ],
    applicableToDE: true,
  },
  {
    id: "DA-003",
    idea: "Atomic / component-based design system",
    family: "DATA_DRIVEN_ARCHITECTURE",
    category: "Architecture",
    primarySource: "franz",
    alsoSeenIn: ["hemanth"],
    impact: 9,
    effort: 6,
    recruiterValue: 5,
    engineerValue: 10,
    designerValue: 9,
    evidenceStrength: "STRONG",
    reuseTier: "MEDIUM",
    rationale:
      "Franz used Atomic Design: page → template → organisms → molecules → atoms. This is the cleanest component architecture.",
    risks: [
      "May be overkill for small portfolio",
      "Only worth it if portfolio will grow significantly",
    ],
    applicableToDE: true,
  },
  {
    id: "DA-004",
    idea: "Avoid monolithic one-file architecture",
    family: "DATA_DRIVEN_ARCHITECTURE",
    category: "Architecture",
    primarySource: "mohamed",
    alsoSeenIn: ["ahmed"],
    impact: 9,
    effort: 1,
    recruiterValue: 5,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed's 3,271-line index.html and Ahmed's 1,739-line CSS are the clearest technical debt examples. Content, CSS, JS, SVG all in one file.",
    risks: [
      "The site can still look good — but maintenance suffers",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 11: TRUST_VERIFICATION
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "TV-001",
    idea: "Verified credentials with ID + verification URL",
    family: "TRUST_VERIFICATION",
    category: "Credentials",
    primarySource: "crystal",
    alsoSeenIn: ["f1leo", "erwin", "zeineb"],
    impact: 10,
    effort: 2,
    recruiterValue: 10,
    engineerValue: 8,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Crystal's credential cards show badge + issuer + credential ID + ACTIVE status + direct verification URL. F1LEO pioneered 'Verified, Not Just Claimed'. Crystal's implementation is the most complete — every credential is independently verifiable.",
    implementationNotes: [
      "Card: badge image + issuer + credential name + ID + status + verify link",
      "Link to issuer verification page (Credly, Microsoft Learn, etc.)",
      "Show credential ID for manual verification",
      "Status badge: ACTIVE | EXPIRED",
      "Credly embed is ideal if available",
    ],
    applicableToDE: true,
  },
  {
    id: "TV-002",
    idea: "Curate credentials — quality over quantity",
    family: "TRUST_VERIFICATION",
    category: "Credentials",
    primarySource: "f1leo",
    alsoSeenIn: ["erwin", "alex"],
    impact: 9,
    effort: 2,
    recruiterValue: 9,
    engineerValue: 8,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "20+ certificates without verify links (Ahmed) hurts more than helps. 3-5 relevant, verified credentials are stronger than 20 unverified ones.",
    implementationNotes: [
      "Show max 3-5 in main portfolio",
      "Link to /credentials page for full list",
      "Prioritize: domain cert > cloud cert > general cert",
    ],
    applicableToDE: true,
  },
  {
    id: "TV-003",
    idea: "Maturity and limitations disclosure",
    family: "TRUST_VERIFICATION",
    category: "Projects",
    primarySource: "alex",
    alsoSeenIn: ["mohamed", "erwin"],
    impact: 10,
    effort: 1,
    recruiterValue: 8,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Alex: 'Portfolio demonstration. Not ready for production deployment.' Mohamed: documented a 10x row-influx defect. Honesty about limitations creates more trust than false confidence.",
    implementationNotes: [
      "Add status to each project: Complete | Portfolio Demo | WIP",
      "One sentence about what it's ready for and what it's not",
    ],
    applicableToDE: true,
  },
  {
    id: "TV-004",
    idea: "Source-confirmed portfolio architecture",
    family: "TRUST_VERIFICATION",
    category: "Architecture",
    primarySource: "erwin",
    alsoSeenIn: ["f1leo", "mohamed", "ahmed"],
    impact: 8,
    effort: 1,
    recruiterValue: 7,
    engineerValue: 10,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "MEDIUM",
    rationale:
      "When repo matches live site exactly, engineer knows candidate is honest about their work. Stale README (Ahmed) breaks this trust.",
    risks: [
      "Requires keeping repo and live site synchronized",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY 12: USEFUL_INTERACTION
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "UI-001",
    idea: "Theme toggle (light/dark)",
    family: "USEFUL_INTERACTION",
    category: "Interaction",
    primarySource: "mohamed",
    alsoSeenIn: ["hemanth", "franz"],
    impact: 7,
    effort: 3,
    recruiterValue: 7,
    engineerValue: 6,
    designerValue: 8,
    evidenceStrength: "MEDIUM",
    reuseTier: "MEDIUM",
    rationale:
      "Theme toggle is expected in technical portfolios but doesn't differentiate. Good to have, not worth spending excessive time on.",
    implementationNotes: [
      "Persist preference in localStorage",
      "Respect prefers-color-scheme as default",
      "CSS variables make this trivial",
    ],
    applicableToDE: true,
  },
  {
    id: "UI-002",
    idea: "Real contact form with error handling",
    family: "USEFUL_INTERACTION",
    category: "Contact",
    primarySource: "mohamed",
    alsoSeenIn: ["f1leo"],
    impact: 8,
    effort: 3,
    recruiterValue: 8,
    engineerValue: 6,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed's Formspree form had real loading/success/error states. Ahmed's mailto form was a UI expectation mismatch. Real form > fake form > no form.",
    risks: [
      "mailto: disguised as form is worse than explicit email link",
    ],
    implementationNotes: [
      "Formspree or similar — zero backend needed",
      "Show loading state during submission",
      "Show real error on failure, not fake success",
    ],
    applicableToDE: true,
  },
  {
    id: "UI-009",
    idea: "Contact intent split: Message vs Meeting",
    family: "USEFUL_INTERACTION",
    category: "Contact",
    primarySource: "dinesh",
    alsoSeenIn: [],
    impact: 8,
    effort: 3,
    recruiterValue: 9,
    engineerValue: 6,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Dinesh split contact into 'Send Message' (mailto) and 'Book Meeting' (lazy Calendly embed). Matches user intent: quick email vs scheduled call. Calendly only loads when tab is selected — zero cost until needed.",
    implementationNotes: [
      "Two tabs: Message + Meeting",
      "Message → email form or mailto",
      "Meeting → lazy Calendly iframe (only render when tab active)",
      "Show availability context: 'Open to full-time, remote US'",
    ],
    applicableToDE: true,
  },
  {
    id: "UI-003",
    idea: "Scroll reveal animations",
    family: "USEFUL_INTERACTION",
    category: "Animation",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin", "hemanth", "ishaq"],
    impact: 6,
    effort: 2,
    recruiterValue: 6,
    engineerValue: 5,
    designerValue: 7,
    evidenceStrength: "MEDIUM",
    reuseTier: "MEDIUM",
    rationale:
      "Fade-up on scroll is standard polish. Not a differentiator but adds professional feel. Low cost, moderate value.",
    implementationNotes: [
      "Use IntersectionObserver, not scroll listeners",
      "Keep animation subtle — fade + slight translate",
      "Respect prefers-reduced-motion",
    ],
    applicableToDE: true,
  },
  {
    id: "UI-004",
    idea: "Hover feedback on interactive elements",
    family: "USEFUL_INTERACTION",
    category: "Animation",
    primarySource: "ahmed",
    alsoSeenIn: ["mohamed", "f1leo"],
    impact: 7,
    effort: 1,
    recruiterValue: 6,
    engineerValue: 5,
    designerValue: 8,
    evidenceStrength: "MEDIUM",
    reuseTier: "HIGH",
    rationale:
      "Card lift, border glow, scale on hover — basic but essential affordance. Signals 'this is interactive'.",
    applicableToDE: true,
  },
  {
    id: "UI-005",
    idea: "Active navigation via IntersectionObserver",
    family: "USEFUL_INTERACTION",
    category: "Navigation",
    primarySource: "mohamed",
    alsoSeenIn: ["erwin", "hemanth"],
    impact: 8,
    effort: 3,
    recruiterValue: 8,
    engineerValue: 6,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Scroll-spy active nav helps visitor know where they are. Mohamed used IntersectionObserver (not manual offset), which is the correct approach.",
    implementationNotes: [
      "Use IntersectionObserver for accuracy",
      "Update active state based on viewport, not click",
    ],
    applicableToDE: true,
  },
  {
    id: "UI-006",
    idea: "Avoid decorative particles/canvas animations",
    family: "USEFUL_INTERACTION",
    category: "Animation",
    primarySource: "mohamed",
    alsoSeenIn: ["kazim", "ishaq", "koketso"],
    impact: 8,
    effort: 1,
    recruiterValue: 7,
    engineerValue: 8,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Particle canvas runs continuously with CPU cost. It's decorative, not informational. In portfolios focused on engineering evidence, particles add noise.",
    risks: [
      "Some visitors may find it cool — but it doesn't help hiring",
    ],
    applicableToDE: true,
  },
  {
    id: "UI-007",
    idea: "prefers-reduced-motion support",
    family: "USEFUL_INTERACTION",
    category: "Animation",
    primarySource: "f1leo",
    alsoSeenIn: [],
    impact: 9,
    effort: 2,
    recruiterValue: 5,
    engineerValue: 9,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "F1LEO was the only portfolio with proper reduced-motion support. It's an accessibility requirement and signals engineering thoroughness.",
    implementationNotes: [
      "Check matchMedia('(prefers-reduced-motion: reduce)')",
      "Disable or simplify all animations when true",
      "Apply globally, not per-animation",
    ],
    applicableToDE: true,
  },
  {
    id: "UI-008",
    idea: "Accessible mobile menu (aria-expanded, Escape)",
    family: "USEFUL_INTERACTION",
    category: "Navigation",
    primarySource: "f1leo",
    alsoSeenIn: ["mohamed", "ahmed"],
    impact: 8,
    effort: 2,
    recruiterValue: 5,
    engineerValue: 9,
    designerValue: 7,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed and Ahmed both had mobile menu a11y gaps. F1LEO had proper aria-expanded, Escape close, and focus management. Small detail, big engineering signal.",
    implementationNotes: [
      "Button with aria-expanded='true/false'",
      "Escape key closes menu",
      "Focus trap inside open menu",
      "Backdrop click closes menu",
    ],
    applicableToDE: true,
  },

  // ═══════════════════════════════════════════════════════════════════
  // FAMILY: PORTFOLIO_CODE_QUALITY (bonus — not in original 12)
  // ═══════════════════════════════════════════════════════════════════

  {
    id: "CQ-001",
    idea: "Portfolio code as engineering signal",
    family: "DATA_DRIVEN_ARCHITECTURE",
    category: "Architecture",
    primarySource: "franz",
    alsoSeenIn: ["mohamed", "erwin"],
    impact: 9,
    effort: 4,
    recruiterValue: 5,
    engineerValue: 10,
    designerValue: 8,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Franz's clean Atomic Design + TypeScript data files signal engineering maturity before anyone reads a project. Code quality = engineering signal.",
    implementationNotes: [
      "Clean component structure",
      "Typed data models",
      "Consistent naming conventions",
      "No hardcoded content in components",
    ],
    applicableToDE: true,
  },
  {
    id: "CQ-002",
    idea: "Static site + GitHub Pages CI/CD",
    family: "DATA_DRIVEN_ARCHITECTURE",
    category: "Architecture",
    primarySource: "ahmed",
    alsoSeenIn: ["mohamed", "erwin", "f1leo"],
    impact: 7,
    effort: 2,
    recruiterValue: 5,
    engineerValue: 8,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "MEDIUM",
    rationale:
      "Ahmed and Mohamed both used GitHub Actions → GitHub Pages. Simple, reliable, free. For portfolio, simplicity beats complexity.",
    risks: [
      "Next.js may be overkill if content is static",
    ],
    applicableToDE: true,
  },
  {
    id: "CQ-003",
    idea: "SEO: static HTML values for counters",
    family: "DATA_DRIVEN_ARCHITECTURE",
    category: "SEO",
    primarySource: "mohamed",
    alsoSeenIn: ["ahmed"],
    impact: 9,
    effort: 1,
    recruiterValue: 7,
    engineerValue: 8,
    designerValue: 6,
    evidenceStrength: "STRONG",
    reuseTier: "HIGH",
    rationale:
      "Mohamed shipped '0 projects' in HTML and animated to '4' with JS. Crawlers saw 0. Always put real values in static HTML first.",
    implementationNotes: [
      "Static HTML shows real values (4 projects)",
      "JS animation can enhance but not replace",
      "Crawler sees: '4 end-to-end projects'",
    ],
    applicableToDE: true,
  },
  {
    id: "CQ-004",
    idea: "Person/Project JSON-LD structured data",
    family: "DATA_DRIVEN_ARCHITECTURE",
    category: "SEO",
    primarySource: "alex",
    alsoSeenIn: [],
    impact: 8,
    effort: 3,
    recruiterValue: 5,
    engineerValue: 7,
    designerValue: 6,
    evidenceStrength: "MEDIUM",
    reuseTier: "MEDIUM",
    rationale:
      "Alex had Person structured data. This helps Google understand entities: Name, Role, Projects, Technologies. Most portfolios skip this.",
    implementationNotes: [
      "Add Person JSON-LD with name, jobTitle, sameAs",
      "Add Project structured data for flagship projects",
      "Include sitemap.xml",
    ],
    applicableToDE: true,
  },
];

// ─── Normalized Cross-Portfolio Scores ────────────────────────────────
// Based on all 16 portfolio analyses. Sorted by score (descending).

export interface PortfolioScore {
  slug: PortfolioSlug;
  name: string;
  url: string;
  recruiterScore: number;
  engineerScore: number;
  designerScore: number;
  overallScore: number;
  style: string;
  framework: string;
}

export const PORTFOLIO_SCORES: PortfolioScore[] = [
  {
    slug: "f1leo",
    name: "F1LEO / Maaskk",
    url: "maaskk.github.io",
    recruiterScore: 8.9,
    engineerScore: 9.0,
    designerScore: 9.1,
    overallScore: 8.9,
    style: "Evidence-first cybersecurity journal",
    framework: "Static HTML + custom pipeline",
  },
  {
    slug: "alex",
    name: "Alex Merced",
    url: "alexmercedcoder.dev",
    recruiterScore: 9.1,
    engineerScore: 9.4,
    designerScore: 8.8,
    overallScore: 8.9,
    style: "Authority-driven technical brand",
    framework: "Custom static",
  },
  {
    slug: "erwin",
    name: "Erwin Glenn Capitan II",
    url: "glcapitan.github.io",
    recruiterScore: 9.0,
    engineerScore: 8.9,
    designerScore: 8.6,
    overallScore: 8.7,
    style: "Content-driven static HTML",
    framework: "Static HTML/CSS/JS",
  },
  {
    slug: "franz",
    name: "Franz Monzales / ikidevs",
    url: "ikidevs.vercel.app",
    recruiterScore: 8.9,
    engineerScore: 9.2,
    designerScore: 8.8,
    overallScore: 8.7,
    style: "Developer-tool + Atomic Design",
    framework: "Next.js 16 + Atomic Design",
  },
  {
    slug: "mohamed",
    name: "Mohamed Taha Abo Heiba",
    url: "motahaaboheiba.github.io",
    recruiterScore: 8.9,
    engineerScore: 9.0,
    designerScore: 8.7,
    overallScore: 8.6,
    style: "Engineering workflow + systems-oriented",
    framework: "Static HTML/CSS/Vanilla JS",
  },
  {
    slug: "zeineb",
    name: "Zeineb Ghrab",
    url: "zeinebghrab.vercel.app",
    recruiterScore: 9.3,
    engineerScore: 8.5,
    designerScore: 8.3,
    overallScore: 8.5,
    style: "Credibility stacking + localization",
    framework: "Next.js",
  },
  {
    slug: "raju",
    name: "Raju Nalla",
    url: "raju-nalla.github.io",
    recruiterScore: 8.9,
    engineerScore: 8.7,
    designerScore: 8.4,
    overallScore: 8.5,
    style: "Before/after metrics focus",
    framework: "Static HTML",
  },
  {
    slug: "hemanth",
    name: "Hemanth Sai Kumar P",
    url: "0iamhsk0.github.io",
    recruiterScore: 8.7,
    engineerScore: 8.5,
    designerScore: 8.9,
    overallScore: 8.5,
    style: "Medallion Architecture IA + README modal",
    framework: "Static HTML/CSS/JS",
  },
  {
    slug: "ahmed",
    name: "Ahmed Raoofuddin",
    url: "ahmedraoofuddin.github.io/portfolio/",
    recruiterScore: 8.8,
    engineerScore: 8.1,
    designerScore: 8.1,
    overallScore: 8.1,
    style: "Resume sidebar + metrics-first experience",
    framework: "Static HTML/CSS/Vanilla JS",
  },
  {
    slug: "dinesh",
    name: "Dinesh Daki",
    url: "dakidinesh.github.io/portfolio/",
    recruiterScore: 9.1,
    engineerScore: 8.0,
    designerScore: 8.7,
    overallScore: 8.2,
    style: "Career story reel + metrics-first experience",
    framework: "React 19 + Vite 7 + Framer Motion 12",
  },
  {
    slug: "crystal",
    name: "Crystal Jacobs",
    url: "crystal888.co.za",
    recruiterScore: 8.9,
    engineerScore: 8.0,
    designerScore: 8.7,
    overallScore: 8.3,
    style: "Project maturity + verified credentials + career evolution",
    framework: "React 18 + custom dc-runtime",
  },
  {
    slug: "milton",
    name: "Milton N. Ngwenya",
    url: "ngwenya-mn.github.io/project_portfolio/",
    recruiterScore: 8.0,
    engineerScore: 6.4,
    designerScore: 8.6,
    overallScore: 7.5,
    style: "Polished frontend, empty projects — visual ≠ evidence",
    framework: "React 19 + TypeScript + Vite + Tailwind + GSAP",
  },
  {
    slug: "darkthe",
    name: "Đỗ Kiến Hưng / darktheDE",
    url: "darktheDE.github.io",
    recruiterScore: 9.0,
    engineerScore: 8.9,
    designerScore: 8.8,
    overallScore: 8.6,
    style: "9 structured projects + Bento + architecture evidence",
    framework: "React 19 + Vite + Tailwind + Framer Motion",
  },
  {
    slug: "ishaq",
    name: "Ishaq Omotosho",
    url: "tosholadipo.netlify.app",
    recruiterScore: 9.2,
    engineerScore: 8.2,
    designerScore: 8.6,
    overallScore: 8.5,
    style: "Metrics-first + Experience↔Project convergence",
    framework: "Next.js + Framer Motion",
  },
  {
    slug: "koketso",
    name: "Koketso Raphasha",
    url: "portfolio-iota-eight-90.vercel.app",
    recruiterScore: 8.3,
    engineerScore: 7.5,
    designerScore: 8.0,
    overallScore: 7.9,
    style: "Data science + analytics focus",
    framework: "React",
  },
  {
    slug: "surafel",
    name: "Surafel Asfawosen",
    url: "surafelasfawosen.github.io",
    recruiterScore: 8.2,
    engineerScore: 7.6,
    designerScore: 7.8,
    overallScore: 7.9,
    style: "Domain-specific Ethiopian ML",
    framework: "Static HTML",
  },
  {
    slug: "kazim",
    name: "Kazim Haider Syed",
    url: "kazimhaiderportfolio.lovable.app",
    recruiterScore: 8.0,
    engineerScore: 7.2,
    designerScore: 7.5,
    overallScore: 7.6,
    style: "Lovable-generated AI portfolio",
    framework: "Lovable (generated)",
  },
  {
    slug: "bodin",
    name: "Bodin Krongchon",
    url: "bodinkc30-pete.github.io",
    recruiterScore: 8.5,
    engineerScore: 8.0,
    designerScore: 7.8,
    overallScore: 8.1,
    style: "Current vs Roadmap skills + trust architecture",
    framework: "Static HTML/CSS/JS",
  },
];

// ─── Summary Statistics ───────────────────────────────────────────────

export const SUMMARY = {
  totalPortfoliosAnalyzed: 18,
  totalPatterns: IDEAS.length,
  totalFamilies: FAMILIES.length,
  patternsByTier: {
    HIGH: IDEAS.filter((i) => i.reuseTier === "HIGH").length,
    MEDIUM: IDEAS.filter((i) => i.reuseTier === "MEDIUM").length,
    LOW: IDEAS.filter((i) => i.reuseTier === "LOW").length,
    DO_NOT_COPY: IDEAS.filter((i) => i.reuseTier === "DO_NOT_COPY").length,
  },
  patternsByFamily: FAMILIES.map((f) => ({
    family: f.name,
    count: IDEAS.filter((i) => i.family === f.id).length,
  })),
  topPatternsByImpact: [...IDEAS]
    .sort((a, b) => b.impact - a.impact)
    .slice(0, 10)
    .map((i) => ({ id: i.id, idea: i.idea, impact: i.impact })),
  topPatternsByEfficiency: [...IDEAS]
    .map((i) => ({
      id: i.id,
      idea: i.idea,
      efficiency: Number((i.impact / Math.max(i.effort, 1)).toFixed(2)),
    }))
    .sort((a, b) => b.efficiency - a.efficiency)
    .slice(0, 10),
};

// ─── Anti-Patterns (DO NOT COPY) ─────────────────────────────────────

export const ANTI_PATTERNS: string[] = [
  "Skill percentage bars (Python 95%, Spark 90%)",
  "Certificate wall without verify links",
  "Particle-heavy background (decorative, CPU cost)",
  "Rotating 5-6 job titles (dilutes identity)",
  "Custom cursor (no hiring signal)",
  "Decorative terminal to look technical",
  "8-10 theme variations",
  "Autoplay animations without information",
  "Homepage listing all projects without hierarchy",
  "Project cards with only tech-stack logos",
  "Claim 'production-ready' without evidence",
  "Huge one-file frontend (3000+ lines)",
  "Fake contact form (mailto: disguised as form)",
  "Fake live statistics",
  "README stale relative to implementation",
  "JavaScript-animated counters showing 0 to crawlers",
  "Non-semantic clickable divs instead of buttons",
];
