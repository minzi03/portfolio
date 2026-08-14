const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const siteConfig = {
  name: "Nguyen Minh Duy",
  description:
    "Data Engineer specializing in ETL/ELT, batch and streaming pipelines, Lakehouse architectures, data modeling, orchestration, and analytics-ready data platforms.",
  url: siteUrl,
  email: "minhduy200316@gmail.com",
  github: "https://github.com/minzi03",
  linkedin: "https://www.linkedin.com/in/minzi03/",
  location: "Linh Xuan Ward, Thu Duc City, Ho Chi Minh City",
  availability: {
    status: "open" as const,
    label: "Open to opportunities",
  },
  resumeUrl: "/resume",
} as const;
