import type { Metadata } from "next";
import ProjectsPageContent from "./ProjectsPageContent";

export const metadata: Metadata = {
  title: "Projects",
  description: "Data Engineering projects by Nguyen Minh Duy — Lakehouse, CDC, streaming, analytics.",
  alternates: { canonical: "/projects" },
  openGraph: { title: "Projects | Nguyen Minh Duy", description: "Data Engineering projects — Lakehouse, CDC, streaming, analytics." },
};

export default function ProjectsPage() {
  return <ProjectsPageContent />;
}
