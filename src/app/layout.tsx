import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { I18nProvider } from "@/lib/i18n";
import { ToastProvider } from "@/components/ui/Toast";
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
    default: "Nguyen Minh Duy — Data Engineer | ETL, Lakehouse, CDC Pipelines",
    template: "%s | Nguyen Minh Duy",
  },

  description:
    "Data Engineer portfolio — 10 production-grade projects with 95M+ records processed across Lakehouse, CDC, ETL/ELT, and analytics platforms. Apache Spark, Kafka, Iceberg, Airflow, dbt.",

  authors: [{ name: "Nguyen Minh Duy" }],
  creator: "Nguyen Minh Duy",
  publisher: "Nguyen Minh Duy",

  keywords: [
    "Nguyen Minh Duy",
    "Data Engineer",
    "Data Engineering Portfolio",
    "Apache Spark",
    "Apache Kafka",
    "Apache Iceberg",
    "Apache Airflow",
    "dbt",
    "Lakehouse Architecture",
    "ETL",
    "ELT",
    "CDC Pipeline",
    "Data Pipeline",
    "Medallion Architecture",
    "Star Schema",
    "Data Quality",
    "OpenMetadata",
    "Docker",
    "Python",
    "SQL",
    "Trino",
    "Snowflake",
    "Azure Databricks",
    "Power BI",
    "Data Modeling",
    "SCD Type 2",
    "Data Governance",
    "Portfolio",
    "Resume",
  ],

  openGraph: {
    type: "website",
    url: siteConfig.url,
    locale: "en_US",
    siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
    title: "Nguyen Minh Duy — Data Engineer | ETL, Lakehouse, CDC Pipelines",
    description:
      "Data Engineer portfolio — 10 production-grade projects with 95M+ records processed. Apache Spark, Kafka, Iceberg, Airflow, dbt.",
    images: [
      {
        url: `${siteConfig.url}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: "Nguyen Minh Duy — Data Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Nguyen Minh Duy — Data Engineer | ETL, Lakehouse, CDC Pipelines",
    description:
      "Data Engineer portfolio — 10 production-grade projects with 95M+ records processed. Apache Spark, Kafka, Iceberg, Airflow, dbt.",
    images: [`${siteConfig.url}/opengraph-image`],
    creator: "@minzi03",
  },

  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
    types: {
      "application/rss+xml": `${siteConfig.url}/feed.xml`,
    },
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
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
                  "Medallion Architecture",
                  "Star Schema",
                  "Data Quality",
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
                  {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "certificate",
                    "name": "Google Advanced Data Analytics Professional Certificate",
                  },
                  {
                    "@type": "EducationalOccupationalCredential",
                    "credentialCategory": "certificate",
                    "name": "Databricks Fundamentals",
                  },
                ],
                "memberOf": [
                  {
                    "@type": "Organization",
                    "name": "Katalyst",
                    "description": "Data Engineer Intern — built production dimensional models and ingestion pipelines on Hanas Data Platform",
                  },
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Nguyen Minh Duy — Data Engineer Portfolio",
                "url": siteConfig.url,
                "description": "Data Engineer portfolio with 10 production-grade projects, 95M+ records processed, and 28 professional credentials.",
                "author": {
                  "@type": "Person",
                  "name": "Nguyen Minh Duy",
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${siteConfig.url}/?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              },
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
                ],
              },
            ]),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <I18nProvider>
          <ToastProvider>
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>
          <Navbar />
          <main id="main-content" className="flex-1 pt-16">{children}</main>
          <Footer />
          <ScrollToTop />
          <Analytics />
          </ToastProvider>
          </I18nProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
