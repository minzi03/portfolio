import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/layout/ScrollToTop";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/data/site-config";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),

  title: {
    default: "Nguyen Minh Duy — Data Engineer",
    template: "%s | Nguyen Minh Duy",
  },

  description: siteConfig.description,

  authors: [{ name: "Nguyen Minh Duy" }],
  creator: "Nguyen Minh Duy",

  keywords: [
    "Nguyen Minh Duy",
    "Data Engineer",
    "Data Engineering",
    "Apache Spark",
    "Apache Kafka",
    "Apache Iceberg",
    "Apache Airflow",
    "dbt",
    "Lakehouse",
    "ETL",
    "ELT",
    "CDC",
    "Data Pipeline",
  ],

  openGraph: {
    type: "website",
    url: siteConfig.url,
    locale: "en_US",
    siteName: "Nguyen Minh Duy — Data Engineer",
    title: "Nguyen Minh Duy — Data Engineer",
    description: "Building reliable data platforms from ingestion to analytics.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Nguyen Minh Duy — Data Engineer",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nguyen Minh Duy — Data Engineer",
    description: "Building reliable data platforms from ingestion to analytics.",
    images: ["/og.png"],
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1a" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme');
                if (t === 'light') document.documentElement.classList.remove('dark');
              } catch(e) {}
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Nguyen Minh Duy",
              "jobTitle": "Data Engineer",
              "url": siteConfig.url,
              "email": siteConfig.email,
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ho Chi Minh City",
                "addressCountry": "VN",
              },
              "sameAs": [
                siteConfig.github,
                siteConfig.linkedin,
              ],
              "knowsAbout": [
                "Data Engineering",
                "Apache Spark",
                "Apache Kafka",
                "Apache Airflow",
                "Apache Iceberg",
                "dbt",
                "SQL",
                "Python",
                "Lakehouse Architecture",
                "ETL",
                "ELT",
                "CDC",
                "Data Modeling",
              ],
              "hasCredential": [
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "degree",
                  "educationalLevel": "Bachelor's Degree",
                  "name": "Bachelor of Engineering in Information Technology",
                },
                {
                  "@type": "EducationalOccupationalCredential",
                  "credentialCategory": "certificate",
                  "name": "IBM Data Engineering Professional Certificate",
                },
              ],
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pt-16">{children}</main>
        <Footer />
        <ScrollToTop />
        <Analytics />
      </body>
    </html>
  );
}
