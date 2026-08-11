import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
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
  },

  twitter: {
    card: "summary_large_image",
    title: "Nguyen Minh Duy — Data Engineer",
    description: "Building reliable data platforms from ingestion to analytics.",
  },

  alternates: {
    canonical: "/",
  },

  robots: {
    index: true,
    follow: true,
  },
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
            }),
          }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
