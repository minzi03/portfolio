import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import BlogList from "@/components/blog/BlogList";
import { getAllBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/data/site-config";

export const metadata: Metadata = {
  title: "Blog — Data Engineering Insights",
  description:
    "Articles on data engineering, Lakehouse architecture, Kafka CDC pipelines, dbt, and analytics engineering by Nguyen Minh Duy.",
  keywords: [
    "data engineering blog",
    "Lakehouse architecture",
    "Kafka CDC",
    "dbt",
    "analytics engineering",
    "Nguyen Minh Duy",
  ],
  openGraph: {
    type: "website",
    title: "Blog — Data Engineering Insights | Nguyen Minh Duy",
    description:
      "Articles on data engineering, Lakehouse architecture, Kafka CDC pipelines, dbt, and analytics engineering.",
    url: `${siteConfig.url}/blog`,
    siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
    images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Data Engineering Insights | Nguyen Minh Duy",
    description:
      "Articles on data engineering, Lakehouse architecture, Kafka CDC pipelines, dbt, and analytics engineering.",
    images: [`${siteConfig.url}/opengraph-image`],
  },
};

export default function BlogPage() {
  const posts = getAllBlogPosts();

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <FadeIn>
          <div className="mb-12 max-w-2xl">
            <div className="flex items-center gap-3">
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
                Blog
              </p>
              <a
                href="/feed.xml"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 rounded-md border border-border px-2 py-0.5 text-[10px] font-mono text-text-muted transition-colors hover:border-accent/30 hover:text-accent"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="6.18" cy="17.82" r="2.18" />
                  <path d="M4 4.44v2.83c7.03 0 12.73 5.7 12.73 12.73h2.83c0-8.59-6.97-15.56-15.56-15.56zm0 5.66v2.83c3.9 0 7.07 3.17 7.07 7.07h2.83c0-5.47-4.43-9.9-9.9-9.9z" />
                </svg>
                RSS
              </a>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary">
              Data Engineering Insights
            </h1>
            <p className="mt-3 text-lg text-text-muted">
              Practical lessons from building production data platforms, real-time
              pipelines, and analytics systems.
            </p>
          </div>
        </FadeIn>

        {/* Blog list with pagination */}
        <BlogList posts={posts} />
      </Container>
    </div>
  );
}
