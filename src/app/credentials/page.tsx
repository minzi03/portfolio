import type { Metadata } from "next";
import CredentialsPageContent from "./CredentialsPageContent";
import { siteConfig } from "@/data/site-config";
import { certifications } from "@/data/credentials";

export const metadata: Metadata = {
  title: "Credentials — 28 Certifications & Achievements",
  description:
    "28 professional certifications including IBM Data Engineering, Google Advanced Analytics, Databricks Fundamentals, HackerRank SQL, and academic honors from Nguyen Minh Duy — Data Engineer.",
  keywords: [
    "Data Engineer Certifications",
    "IBM Data Engineering",
    "Google Data Analytics",
    "Databricks",
    "HackerRank SQL",
    "Professional Certifications",
    "Nguyen Minh Duy",
  ],
  alternates: { canonical: "/credentials" },
  openGraph: {
    title: "28 Credentials & Certifications | Nguyen Minh Duy",
    description:
      "Professional certifications across data engineering, cloud platforms, analytics, SQL, and academic achievements.",
    url: `${siteConfig.url}/credentials`,
    siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630, alt: "Nguyen Minh Duy — Data Engineering Credentials" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "28 Credentials & Certifications | Nguyen Minh Duy",
    description:
      "Professional certifications across data engineering, cloud platforms, analytics, SQL, and academic achievements.",
    images: [`${siteConfig.url}/opengraph-image`],
    creator: "@minzi03",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CredentialsPage() {
  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": siteConfig.url,
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Credentials",
                  "item": `${siteConfig.url}/credentials`,
                },
              ],
            },
            ...certifications.map((cert) => ({
              "@context": "https://schema.org",
              "@type": "EducationalOccupationalCredential",
              "name": cert.name,
              "credentialCategory": "certificate",
              "url": cert.verifyUrl ?? undefined,
              "recognizedBy": {
                "@type": "Organization",
                "name": cert.issuer,
              },
              "dateCreated": cert.date,
            })),
          ]),
        }}
      />
      <CredentialsPageContent />
    </>
  );
}
