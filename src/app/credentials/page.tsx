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
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Credentials — Nguyen Minh Duy" }],
  },
};

export default function CredentialsPage() {
  return <CredentialsPageContent />;
}
