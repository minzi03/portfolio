import type { Metadata } from "next";
import Timeline from "@/components/experience/Timeline";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Timeline — Data Engineering Portfolio",
  description:
    "Professional development journey in data engineering. Career timeline with experience and project highlights.",
  keywords: [
    "data engineering career",
    "professional timeline",
    "career journey",
    "Nguyen Minh Duy",
  ],
  alternates: { canonical: "/timeline" },
  openGraph: {
    title: "Timeline | Nguyen Minh Duy",
    description:
      "Professional development journey in data engineering.",
    url: `${siteConfig.url}/timeline`,
    siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
  },
};

export default function TimelinePage() {
  return <Timeline />;
}
