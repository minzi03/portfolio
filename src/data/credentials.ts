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

export type EvidenceLevel = "public" | "redacted" | "metadata-only";

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
  image?: string;
  verifyUrl?: string;
  featured?: boolean;
  showOnResume?: boolean;
  evidence: EvidenceLevel;
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
    evidence: "public",
    verifyUrl: "https://coursera.org/verify/professional-cert/RDVQOIJ79PWI",
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
    evidence: "public",
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
    evidence: "public",
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
    evidence: "public",
  },
  {
    id: "datacamp-associate-de",
    title: "Associate Data Engineer",
    issuer: "DataCamp",
    issued: "Sep 2025",
    category: "data-engineering",
    credentialType: "certification",
    description: "Foundational data engineering certification — data literacy, SQL, and Python for data.",
    skills: ["SQL", "Python", "Data Literacy"],
    featured: true,
    showOnResume: true,
    evidence: "public",
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
    evidence: "public",
  },

  /* ─── Cloud & Platform ─── */
  {
    id: "azure-dp203",
    title: "Azure Data Platform 2025 Certified Foundations Associate",
    issuer: "Microsoft",
    issued: "Oct 2025",
    category: "cloud",
    credentialType: "certification",
    description: "Azure data services fundamentals — data lake, analytics, and database services.",
    skills: ["Azure", "Data Lake", "Azure SQL"],
    showOnResume: true,
    evidence: "public",
  },
  {
    id: "azure-databricks",
    title: "Implement a Data Engineering Solution with Azure Databricks",
    issuer: "Microsoft",
    issued: "Nov 2025",
    category: "cloud",
    credentialType: "course",
    description: "Hands-on data engineering on Azure Databricks — Delta Lake, Spark, and pipeline orchestration.",
    skills: ["Azure Databricks", "Delta Lake", "Apache Spark"],
    showOnResume: true,
    evidence: "public",
    relatedProjects: ["azure-ecommerce"],
  },
  {
    id: "azure-fundamentals",
    title: "Azure Fundamentals",
    issuer: "Microsoft / Simplilearn",
    issued: "Nov 2025",
    category: "cloud",
    credentialType: "course",
    description: "Cloud computing fundamentals — Azure services, pricing, and governance.",
    skills: ["Azure", "Cloud Computing"],
    showOnResume: true,
    evidence: "public",
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
    evidence: "public",
    verifyUrl: "https://coursera.org/verify/professional-cert/LH80SWNTCC",
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
    evidence: "public",
    verifyUrl: "https://coursera.org/verify/professional-cert/2VDUMA1LE5CS",
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
    evidence: "public",
    verifyUrl: "https://coursera.org/verify/professional-cert/IT5T0UEIHHC",
  },
  {
    id: "datacamp-data-analyst",
    title: "Associate Data Analyst",
    issuer: "DataCamp",
    issued: "Sep 2025",
    category: "analytics",
    credentialType: "certification",
    description: "Foundational data analytics certification — SQL, Python, and data visualization.",
    skills: ["SQL", "Python", "Data Visualization"],
    showOnResume: true,
    evidence: "public",
  },
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
    evidence: "public",
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
    evidence: "public",
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
    evidence: "public",
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
    evidence: "public",
    verifyUrl: "https://coursera.org/verify/professional-cert/73C2VT8L7B3S",
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
    evidence: "public",
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
    evidence: "public",
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
    evidence: "public",
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
  },

  /* ─── Academic ─── */
  {
    id: "academic-transcript",
    title: "Official Academic Transcript",
    issuer: "VNU-HCM UIT",
    issued: "Jul 2026",
    category: "academic",
    credentialType: "academic-award",
    description:
      "Bachelor of Engineering in IT — Information Systems. 158 accumulated credits. Cumulative average: 7.65 / 10. Classification: Good.",
    skills: [],
    evidence: "metadata-only",
  },
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
    evidence: "redacted",
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
    evidence: "public",
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
    evidence: "public",
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
    evidence: "public",
  },
  {
    id: "tuition-scholarship",
    title: "50% Tuition Merit Scholarship",
    issuer: "VNU-HCM UIT",
    issued: "2025",
    category: "award",
    credentialType: "scholarship",
    description:
      "50% tuition scholarship for academic merit — Semester 1, Academic Year 2025–2026.",
    skills: [],
    evidence: "public",
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
    evidence: "redacted",
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

export function getFeaturedCredentials(): Credential[] {
  return credentials.filter((c) => c.featured);
}

export function getCredentialsByCategory(cat: CredentialCategory): Credential[] {
  return credentials.filter((c) => c.category === cat);
}
