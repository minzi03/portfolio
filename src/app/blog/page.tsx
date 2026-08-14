import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import BlogList from "@/components/blog/BlogList";
import BlogHeader from "@/components/blog/BlogHeader";
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
          <BlogHeader />
        </FadeIn>

        {/* Blog list with pagination */}
        <BlogList posts={posts} />
      </Container>
    </div>
  );
}
