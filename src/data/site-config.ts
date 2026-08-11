const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Nguyen Minh Duy",
  shortName: "Duy",
  title: "Nguyen Minh Duy — Data Engineer",
  description:
    "Data Engineer specializing in ETL/ELT, batch and streaming pipelines, Lakehouse architectures, data modeling, orchestration, and analytics-ready data platforms.",
  url: siteUrl,
  email: "minhduy200316@gmail.com",
  phone: "(+84) 795 455 127",
  github: "https://github.com/minzi03",
  linkedin: "https://www.linkedin.com/in/minzi03/",
  location: "Linh Xuan Ward, Thu Duc City, Ho Chi Minh City",
  tagline: "Building reliable data platforms from ingestion and streaming to Lakehouse and analytics.",
  heroMetrics: [
    { value: "4.6M+", label: "Financial transactions", context: "Banking Data Platform" },
    { value: "16", label: "Source datasets", context: "Banking Data Platform" },
    { value: "53", label: "Cataloged tables", context: "Banking Data Platform" },
    { value: "22", label: "Lineage edges", context: "Banking Data Platform" },
  ],
  navLinks: [
    { href: "/", label: "Home" },
    { href: "/experience", label: "Experience" },
    { href: "/projects", label: "Projects" },
    { href: "/writing", label: "Writing" },
    { href: "/about", label: "About" },
  ],
  resumeUrl: "/resume",
} as const;
