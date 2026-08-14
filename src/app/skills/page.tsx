import type { Metadata } from "next";
import SkillsRadar from "@/components/skills/SkillsRadar";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Skills Radar — Data Engineering Portfolio",
  description:
    "Visual illustration of data engineering technical skills including Apache Spark, Kafka, Airflow, and more.",
  keywords: [
    "data engineering skills",
    "technical skills",
    "Apache Spark",
    "Apache Kafka",
    "Apache Airflow",
    "Nguyen Minh Duy",
  ],
  alternates: { canonical: "/skills" },
  openGraph: {
    title: "Skills Radar | Nguyen Minh Duy",
    description:
      "Visual illustration of data engineering technical skills.",
    url: `${siteConfig.url}/skills`,
    siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
  },
};

export default function SkillsPage() {
  return <SkillsRadar />;
}
