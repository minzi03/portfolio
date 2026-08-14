import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
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
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
              Blog
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-text-primary">
              Data Engineering Insights
            </h1>
            <p className="mt-3 text-lg text-text-muted">
              Practical lessons from building production data platforms, real-time
              pipelines, and analytics systems.
            </p>
          </div>
        </FadeIn>

        {/* Post list */}
        <div className="space-y-6">
          {posts.map((post) => (
            <FadeIn key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group block rounded-2xl border border-border bg-bg-surface p-6 transition-all hover:border-accent/30 hover:bg-accent/5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex-1">
                    {/* Date + read time */}
                    <div className="mb-2 flex items-center gap-3 text-xs text-text-muted">
                      <time dateTime={post.date}>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                      <span>·</span>
                      <span>{post.readTime}</span>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold text-text-primary transition-colors group-hover:text-accent">
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 text-sm text-text-muted line-clamp-2">
                      {post.description}
                    </p>

                    {/* Tags */}
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md bg-accent/10 px-2 py-0.5 text-xs text-accent"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="hidden text-2xl text-zinc-600 transition-colors group-hover:text-accent sm:block">
                    →
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-text-muted">No posts yet. Check back soon!</p>
          </div>
        )}
      </Container>
    </div>
  );
}
