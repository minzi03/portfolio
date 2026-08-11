export interface Certification {
  name: string;
  issuer: string;
  date: string;
  category: string;
  verifyUrl?: string;
}

export const certifications: Certification[] = [
  {
    name: "Data Engineering Professional Certificate",
    issuer: "IBM",
    date: "2026",
    category: "Data Engineering",
  },
  {
    name: "DP-203 Data Engineering on Azure",
    issuer: "Microsoft",
    date: "2025",
    category: "Azure",
  },
  {
    name: "DP-900 Azure Data Fundamentals",
    issuer: "Microsoft",
    date: "2025",
    category: "Azure",
  },
  {
    name: "DP-3027 Databricks",
    issuer: "Databricks",
    date: "2025",
    category: "Databricks",
  },
  {
    name: "Data Engineer",
    issuer: "DataCamp",
    date: "2025",
    category: "Data Engineering",
  },
  {
    name: "Data Engineer Associate",
    issuer: "DataCamp",
    date: "2025",
    category: "Data Engineering",
  },
  {
    name: "Software Development with Scrum",
    issuer: "Axon Active Vietnam",
    date: "2025",
    category: "Agile",
  },
  {
    name: "Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2024",
    category: "Analytics",
  },
  {
    name: "Advanced Data Analytics Professional Certificate",
    issuer: "Google",
    date: "2024",
    category: "Analytics",
  },
  {
    name: "Business Intelligence Professional Certificate",
    issuer: "Google",
    date: "2024",
    category: "BI",
  },
];
