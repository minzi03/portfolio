import type { Metadata } from "next";
import InteractiveArchitecture from "@/components/projects/InteractiveArchitecture";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Architecture — Data Engineering Portfolio",
  description:
    "Interactive data architecture diagram showing the complete data pipeline from sources to analytics.",
  keywords: [
    "data architecture",
    "data pipeline",
    "lakehouse architecture",
    "medallion architecture",
    "Nguyen Minh Duy",
  ],
  alternates: { canonical: "/architecture" },
  openGraph: {
    title: "Architecture | Nguyen Minh Duy",
    description:
      "Interactive data architecture diagram showing the complete data pipeline from sources to analytics.",
    url: `${siteConfig.url}/architecture`,
    siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
  },
};

export default function ArchitecturePage() {
  return <InteractiveArchitecture />;
}
