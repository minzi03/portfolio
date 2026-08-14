export type CredentialCategory =
  | "data-engineering"
  | "cloud"
  | "analytics"
  | "sql"
  | "academic"
  | "language"
  | "award"
  | "activity"
  | "soft-skills";

export type CredentialType =
  | "certification"
  | "professional-certificate"
  | "course"
  | "assessment"
  | "language"
  | "academic-award"
  | "scholarship"
  | "activity";

/** Trust tier — what the portfolio can prove about this credential. */
export type TrustLevel =
  | "verified"   // Issuer URL confirmed
  | "evidence"   // Certificate/document publicly visible
  | "redacted"   // Derivative with PII removed
  | "metadata";  // Title + date only, no backing asset

/** Reconciliation gate state — prevents unverified data from migrating. */
export type ReconciliationState =
  | "confirmed"
  | "not-applicable"
  | "pending"
  | "mismatch";

/** Whether an evidence artifact has been visually inspected and approved for public display. */
export type EvidenceReviewState = "confirmed" | "pending";

/** A piece of evidence backing a credential. */
export interface CredentialEvidence {
  asset: string;           // Path under /public (e.g. "/evidence/credentials/ibm-data-engineering.webp")
  trustLevel: TrustLevel;
  source: "certificate-image" | "certificate-document" | "redacted-derivative" | "official-document";
  /** Visual review gate — "pending" assets are not rendered in UI until manually confirmed. */
  reviewState: EvidenceReviewState;
}

/** Phase 0.5 reconciliation status — only "confirmed" records may migrate. */
export interface EvidenceReconciliation {
  certificateChecked: ReconciliationState;
  verifyUrlChecked: ReconciliationState;
  existingDataMatched: ReconciliationState;
}

export interface Credential {
  id: string;
  title: string;
  issuer: string;
  issued?: string;
  expires?: string;
  category: CredentialCategory;
  credentialType: CredentialType;
  description?: string;
  skills?: string[];
  verifyUrl?: string;
  featured?: boolean;
  showOnResume?: boolean;
  evidence: TrustLevel;
  /** Visual evidence backing this credential. Empty = metadata-only. */
  evidenceAssets: CredentialEvidence[];
  /** Phase 0.5 reconciliation gate. Absent = not yet audited. */
  reconciliation?: EvidenceReconciliation;
  relatedProjects?: string[];
}

export const categoryLabels: Record<CredentialCategory, string> = {
  "data-engineering": "Data Engineering",
  cloud: "Cloud & Platform",
  analytics: "Analytics",
  sql: "SQL",
  academic: "Academic",
  language: "Language",
  award: "Awards",
  activity: "Activities",
  "soft-skills": "Soft Skills",
};

export const categoryMeta: Record<
  CredentialCategory,
  { icon: string; color: string; bg: string }
> = {
  "data-engineering": { icon: "⚙", color: "text-accent", bg: "bg-accent/10" },
  cloud: { icon: "☁", color: "text-blue-400", bg: "bg-blue-500/10" },
  analytics: { icon: "📊", color: "text-purple-400", bg: "bg-purple-500/10" },
  sql: { icon: "⟨/⟩", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  academic: { icon: "🎓", color: "text-amber-400", bg: "bg-amber-500/10" },
  language: { icon: "🌐", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  award: { icon: "★", color: "text-yellow-400", bg: "bg-yellow-500/10" },
  activity: { icon: "→", color: "text-pink-400", bg: "bg-pink-500/10" },
  "soft-skills": { icon: "◇", color: "text-indigo-400", bg: "bg-indigo-500/10" },
};

export const credentialTypeLabels: Record<CredentialType, string> = {
  certification: "Certification",
  "professional-certificate": "Professional Certificate",
  course: "Course",
  assessment: "Assessment",
  language: "Language",
  "academic-award": "Academic Award",
  scholarship: "Scholarship",
  activity: "Activity",
};

export const credentials: Credential[] = [
  /* ─── Featured: Data Engineering ─── */
  {
    id: "ibm-data-engineering",
    title: "Data Engineering Professional Certificate",
    issuer: "IBM",
    issued: "Apr 2026",
    category: "data-engineering",
    credentialType: "professional-certificate",
    description:
      "16-course professional certificate covering Python, SQL, ETL, data warehousing, Spark, and data engineering capstone project.",
    skills: ["Python", "SQL", "ETL", "Data Warehousing", "Apache Spark", "Shell Scripting"],
    featured: true,
    showOnResume: true,
    evidence: "verified",
    verifyUrl: "https://coursera.org/verify/professional-cert/RDVQOIJ79PWI",
    evidenceAssets: [
      { asset: "/evidence/credentials/ibm-data-engineering.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
    relatedProjects: ["banking-data-platform", "modern-data-stack"],
  },
  {
    id: "confluent-streaming",
    title: "Data Streaming Engineer Foundations",
    issuer: "Confluent",
    issued: "2025",
    category: "data-engineering",
    credentialType: "certification",
    description:
      "Foundations of event-driven architecture and real-time data streaming with Apache Kafka.",
    skills: ["Apache Kafka", "Event-Driven Architecture", "Streaming"],
    featured: true,
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://www.credly.com/badges/confluent",
    evidenceAssets: [
      { asset: "/evidence/credentials/confluent-streaming.pdf", trustLevel: "evidence", source: "certificate-document", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
    relatedProjects: ["banking-data-platform", "modern-data-stack"],
  },
  {
    id: "oracle-data-platform",
    title: "Oracle Data Platform 2025 Certified Foundations Associate",
    issuer: "Oracle",
    issued: "Oct 2025",
    category: "cloud",
    credentialType: "certification",
    description: "Oracle Cloud data platform fundamentals — autonomous database, analytics, and data lake.",
    skills: ["Oracle Cloud", "Autonomous Database", "Data Lake"],
    featured: true,
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://mylearn.oracle.com/ou/learning-path/oracle-data-platform-2025/148670",
    evidenceAssets: [
      { asset: "/evidence/credentials/oracle-data-platform.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "datacamp-data-engineer",
    title: "Data Engineer",
    issuer: "DataCamp",
    issued: "Oct 2025",
    category: "data-engineering",
    credentialType: "certification",
    description: "Intermediate data engineering certification covering data pipelines, warehouses, and cloud.",
    skills: ["Python", "SQL", "Data Pipelines", "Cloud"],
    featured: true,
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://www.datacamp.com/certificate/DE0019952373125",
    evidenceAssets: [
      { asset: "/evidence/credentials/datacamp-data-engineer.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "datacamp-associate-da",
    title: "Data Engineer Associate",
    issuer: "DataCamp",
    issued: "Sep 2025",
    category: "data-engineering",
    credentialType: "certification",
    description: "Foundational data engineering certification — data pipelines, SQL, and Python.",
    skills: ["SQL", "Python", "Data Pipelines"],
    featured: true,
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://www.datacamp.com/certificate/DEA0011335828080",
    evidenceAssets: [
      { asset: "/evidence/credentials/datacamp-associate-da.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "datacamp-associate-de",
    title: "Associate Data Engineer",
    issuer: "DataCamp",
    issued: "Oct 2025",
    category: "data-engineering",
    credentialType: "certification",
    description: "Foundational data engineering certification — data pipelines, SQL, and Python.",
    skills: ["SQL", "Python", "Data Pipelines"],
    showOnResume: true,
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/credentials/datacamp-associate-de.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "datacamp-associate-da-cert",
    title: "Data Analyst Associate",
    issuer: "DataCamp",
    issued: "2025",
    category: "analytics",
    credentialType: "certification",
    description: "Foundational data analytics certification — SQL, Python, and data visualization.",
    skills: ["SQL", "Python", "Data Literacy", "Data Visualization"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://www.datacamp.com/certificate/DAA0018128133270",
    evidenceAssets: [
      { asset: "/evidence/credentials/datacamp-da-associate.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "databricks-fundamentals",
    title: "Databricks Accredited Databricks Fundamentals",
    issuer: "Databricks",
    issued: "Oct 2025",
    category: "data-engineering",
    credentialType: "certification",
    description: "Lakehouse platform fundamentals — Delta Lake, Spark, and collaborative data analytics.",
    skills: ["Databricks", "Delta Lake", "Apache Spark", "Lakehouse"],
    featured: true,
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://credentials.databricks.com/accreditation/view/databricks-fundamentals",
    evidenceAssets: [
      { asset: "/evidence/credentials/databricks-fundamentals.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },

  /* ─── Cloud & Platform ─── */
  {
    id: "azure-databricks",
    title: "DP-3027 Databricks",
    issuer: "Microsoft",
    issued: "Nov 2025",
    category: "cloud",
    credentialType: "certification",
    description: "Azure Databricks data engineering — Delta Lake, Spark, and pipeline orchestration.",
    skills: ["Azure Databricks", "Delta Lake", "Apache Spark"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://learn.microsoft.com/en-us/users/me/credentials",
    evidenceAssets: [
      { asset: "/evidence/credentials/microsoft-azure-databricks-v2.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
    relatedProjects: ["azure-ecommerce"],
  },
  {
    id: "azure-fundamentals",
    title: "DP-900 Azure Data Fundamentals",
    issuer: "Microsoft",
    issued: "Nov 2025",
    category: "cloud",
    credentialType: "certification",
    description: "Azure data fundamentals — relational and non-relational data, analytics, and data services.",
    skills: ["Azure", "Data Fundamentals", "Azure SQL", "Cosmos DB"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://learn.microsoft.com/en-us/users/me/credentials",
    evidenceAssets: [
      { asset: "/evidence/credentials/microsoft-azure-fundamentals-v2.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },

  /* ─── Analytics ─── */
  {
    id: "google-data-analytics",
    title: "Google Data Analytics Professional Certificate",
    issuer: "Google",
    issued: "Aug 2025",
    category: "analytics",
    credentialType: "professional-certificate",
    description:
      "8-course certificate covering spreadsheets, SQL, Tableau, and R for data-driven decision making.",
    skills: ["SQL", "Tableau", "R", "Spreadsheets"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://coursera.org/verify/professional-cert/LH80SWNTCC",
    evidenceAssets: [
      { asset: "/evidence/credentials/google-data-analytics.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "google-advanced-analytics",
    title: "Google Advanced Data Analytics Professional Certificate",
    issuer: "Google",
    issued: "Aug 2025",
    category: "analytics",
    credentialType: "professional-certificate",
    description:
      "7-course certificate covering Python, statistics, regression analysis, and machine learning.",
    skills: ["Python", "Statistics", "Machine Learning", "Regression"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://coursera.org/verify/professional-cert/2VDUMA1LE5CS",
    evidenceAssets: [
      { asset: "/evidence/credentials/google-advanced-analytics.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "google-bi",
    title: "Google Business Intelligence Professional Certificate",
    issuer: "Google",
    issued: "Aug 2025",
    category: "analytics",
    credentialType: "professional-certificate",
    description:
      "4-course certificate covering data modeling, dashboard design, and BI reporting.",
    skills: ["Data Modeling", "Dashboard Design", "BI"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://coursera.org/verify/professional-cert/IT5T0UEIHHC",
    evidenceAssets: [
      { asset: "/evidence/credentials/google-bi.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },
  /* NOTE: Data Engineer Associate is datacamp-associate-da above (Data Engineering section) */
  {
    id: "testcenter-data-analysis",
    title: "Data Analysis — Top 20%",
    issuer: "Testcenter",
    issued: "Jan 2025",
    category: "analytics",
    credentialType: "assessment",
    description: "Technical assessment — ranked in the top 20% of candidates for data analysis skills.",
    skills: ["Data Analysis", "Problem Solving"],
    showOnResume: true,
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/credentials/testcenter-data-analysis.pdf", trustLevel: "evidence", source: "certificate-document", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },

  /* ─── SQL ─── */
  {
    id: "hackerrank-sql-advanced",
    title: "SQL (Advanced)",
    issuer: "HackerRank",
    issued: "Aug 2025",
    category: "sql",
    credentialType: "assessment",
    description: "Advanced SQL certification — complex queries, window functions, optimization.",
    skills: ["SQL", "Window Functions", "Query Optimization"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://www.hackerrank.com/certificates/sql-advanced",
    evidenceAssets: [
      { asset: "/evidence/credentials/hackerrank-sql-advanced.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "hackerrank-sql-intermediate",
    title: "SQL (Intermediate)",
    issuer: "HackerRank",
    issued: "Feb 2025",
    category: "sql",
    credentialType: "assessment",
    description: "Intermediate SQL certification — joins, subqueries, aggregation, and indexing.",
    skills: ["SQL", "Joins", "Aggregation"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://www.hackerrank.com/certificates/sql-intermediate",
    evidenceAssets: [
      { asset: "/evidence/credentials/hackerrank-sql-intermediate.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },

  /* ─── Soft Skills ─── */
  {
    id: "google-project-management",
    title: "Google Project Management Professional Certificate",
    issuer: "Google",
    issued: "Aug 2025",
    category: "soft-skills",
    credentialType: "professional-certificate",
    description:
      "7-course certificate covering Agile, Scrum, project planning, and execution.",
    skills: ["Agile", "Scrum", "Project Planning"],
    showOnResume: true,
    evidence: "verified",
    verifyUrl: "https://coursera.org/verify/professional-cert/73C2VT8L7B3S",
    evidenceAssets: [
      { asset: "/evidence/credentials/google-project-management.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "confirmed",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "axon-scrum",
    title: "Software Development with Scrum",
    issuer: "Axon Active Vietnam",
    issued: "Nov 2025",
    category: "soft-skills",
    credentialType: "course",
    description: "Scrum framework training — Agile Manifesto, Sprint planning, roles, and artifacts.",
    skills: ["Scrum", "Agile"],
    showOnResume: true,
    evidence: "evidence",
    verifyUrl: "https://verified.sertifier.com/en/verify/09675129761516/",
    evidenceAssets: [
      { asset: "/evidence/credentials/axon-active-scrum.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "thinking-school-1",
    title: "Tu Duy Phan Bien — Chua Lanh 7 Can Benh Cua Tu Duy",
    issuer: "Thinking School",
    issued: "Jul 2022",
    category: "soft-skills",
    credentialType: "course",
    description: "Critical thinking course — identifying and addressing 7 common thinking biases.",
    skills: ["Critical Thinking"],
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/credentials/thinking-school-1.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "thinking-school-2",
    title: "Tu Duy Phan Bien — Thuc Hanh Can Ban",
    issuer: "Thinking School",
    issued: "Aug 2022",
    category: "soft-skills",
    credentialType: "course",
    description: "Practical critical thinking — applied reasoning and analytical frameworks.",
    skills: ["Critical Thinking"],
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/credentials/thinking-school-2.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },

  /* ─── Language ─── */
  {
    id: "vstep-b2",
    title: "English Proficiency — VSTEP Level 4 (B2)",
    issuer: "Van Lang University",
    issued: "Apr 2026",
    category: "language",
    credentialType: "language",
    description:
      "Vietnamese Standardized Test of English — Level 4 / CEFR B2. Overall 6.0/10.",
    skills: ["English"],
    showOnResume: true,
    evidence: "redacted",
    evidenceAssets: [
      { asset: "/evidence/academic/vstep-b2-redacted.webp", trustLevel: "redacted", source: "redacted-derivative", reviewState: "pending" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },

  /* ─── Academic ─── */
  {
    id: "graduation-certificate",
    title: "Graduation Certificate — Information Technology",
    issuer: "VNU-HCM UIT",
    issued: "Jul 2026",
    category: "academic",
    credentialType: "academic-award",
    description:
      "Bachelor of Engineering in IT — Information Systems. Classification: Good. Graduation decision May 25, 2026.",
    skills: [],
    showOnResume: true,
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/academic/graduation-certificate.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },

  /* ─── Awards ─── */
  {
    id: "academic-excellence-2022",
    title: "Academic & Conduct — Excellent (2022–2023)",
    issuer: "VNU-HCM UIT",
    issued: "2023",
    category: "award",
    credentialType: "academic-award",
    description: "Ranked Excellent in academic performance and conduct — Semester 2, Academic Year 2022–2023.",
    skills: [],
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/academic/academic-excellence-2022.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "academic-excellence-2023",
    title: "Academic & Conduct — Excellent (2023–2024)",
    issuer: "VNU-HCM UIT",
    issued: "2024",
    category: "award",
    credentialType: "academic-award",
    description: "Ranked Excellent in academic performance and conduct — Semester 2, Academic Year 2023–2024.",
    skills: [],
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/academic/academic-excellence-2023.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  {
    id: "academic-excellence-2024",
    title: "Academic & Conduct — Excellent (2024–2025)",
    issuer: "VNU-HCM UIT",
    issued: "2025",
    category: "award",
    credentialType: "academic-award",
    description: "Ranked Excellent in academic performance and conduct — Semester 1, Academic Year 2024–2025.",
    skills: [],
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/academic/academic-excellence-2024.webp", trustLevel: "evidence", source: "certificate-image", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
  /* ─── Activities ─── */
  {
    id: "volunteer-manhghetmoi",
    title: "Manh Ghep Moi 2023 — Volunteer Campaign",
    issuer: "UIT — University of Information Technology",
    issued: "2023",
    category: "activity",
    credentialType: "activity",
    description:
      "Student community volunteer campaign at VNU-HCM University of Information Technology.",
    skills: [],
    evidence: "evidence",
    evidenceAssets: [
      { asset: "/evidence/activities/volunteer-manhghetmoi.pdf", trustLevel: "evidence", source: "certificate-document", reviewState: "confirmed" },
    ],
    reconciliation: {
      certificateChecked: "confirmed",
      verifyUrlChecked: "not-applicable",
      existingDataMatched: "confirmed",
    },
  },
];

/* ─── Derived exports ─── */

export const credentialCategories: CredentialCategory[] = [
  "data-engineering",
  "cloud",
  "analytics",
  "sql",
  "academic",
  "language",
  "award",
  "soft-skills",
  "activity",
];

/** Canonical source — certifications for resume (subset) */
export const certifications = credentials
  .filter((c) => c.showOnResume)
  .map((c) => ({
    name: c.title,
    issuer: c.issuer,
    date: c.issued ?? "",
    category: categoryLabels[c.category],
    verifyUrl: c.verifyUrl,
  }));
