import type { Metadata } from "next";
import CredentialsPageContent from "./CredentialsPageContent";

export const metadata: Metadata = {
  title: "Credentials",
  description:
    "Certifications, technical assessments, academic recognition and milestones of Nguyen Minh Duy — Data Engineer.",
  alternates: { canonical: "/credentials" },
  openGraph: {
    title: "Credentials | Nguyen Minh Duy",
    description:
      "27 credentials across data engineering, cloud, analytics, SQL, and academic achievements.",
  },
};

export default function CredentialsPage() {
  return <CredentialsPageContent />;
}
