import type { Metadata } from "next";
import ProjectComparison from "@/components/projects/ProjectComparison";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Compare Projects — Data Engineering Portfolio",
  description:
    "Compare data engineering projects side by side. Analyze technology stacks, scope, and impact metrics.",
  keywords: [
    "project comparison",
    "data engineering projects",
    "technology comparison",
    "Nguyen Minh Duy",
  ],
  alternates: { canonical: "/compare" },
  openGraph: {
    title: "Compare Projects | Nguyen Minh Duy",
    description:
      "Compare data engineering projects side by side. Analyze technology stacks, scope, and impact metrics.",
    url: `${siteConfig.url}/compare`,
    siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
  },
};

export default function ComparePage() {
  return <ProjectComparison />;
}
