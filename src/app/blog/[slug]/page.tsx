import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/ui/Container";
import FadeIn from "@/components/ui/FadeIn";
import { getAllBlogSlugs, getBlogPost } from "@/lib/blog";
import { siteConfig } from "@/data/site-config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};

  return {
    title: `${post.title} — Blog`,
    description: post.description,
    keywords: [...post.tags, "data engineering blog", "Nguyen Minh Duy"],
    openGraph: {
      type: "article",
      title: `${post.title} — Nguyen Minh Duy`,
      description: post.description,
      url: `${siteConfig.url}/blog/${slug}`,
      siteName: "Nguyen Minh Duy — Data Engineer Portfolio",
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: `${siteConfig.url}/opengraph-image`, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} — Nguyen Minh Duy`,
      description: post.description,
      images: [`${siteConfig.url}/opengraph-image`],
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  // Dynamic import of the MDX content
  const { default: PostContent } = await import(
    `@/content/blog/${slug}.mdx`
  );

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* JSON-LD for article */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              author: {
                "@type": "Person",
                name: "Nguyen Minh Duy",
                url: siteConfig.url,
              },
              publisher: {
                "@type": "Organization",
                name: "Nguyen Minh Duy — Data Engineer Portfolio",
                url: siteConfig.url,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${siteConfig.url}/blog/${slug}`,
              },
              keywords: post.tags.join(", "),
            }),
          }}
        />

        {/* Breadcrumb */}
        <FadeIn>
          <nav className="mb-8 flex items-center gap-2 text-sm text-text-muted">
            <Link href="/" className="transition-colors hover:text-accent">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="transition-colors hover:text-accent">
              Blog
            </Link>
            <span>/</span>
            <span className="text-text-primary">{post.title}</span>
          </nav>
        </FadeIn>

        {/* Article header */}
        <FadeIn>
          <article className="mx-auto max-w-3xl">
            {/* Meta */}
            <div className="mb-4 flex items-center gap-3 text-xs text-text-muted">
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
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-text-primary sm:text-5xl">
              {post.title}
            </h1>

            {/* Description */}
            <p className="mb-6 text-lg text-text-muted">{post.description}</p>

            {/* Tags */}
            <div className="mb-10 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-accent/10 px-2.5 py-1 text-xs text-accent"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Divider */}
            <hr className="mb-10 border-zinc-700/30" />

            {/* MDX content */}
            <div className="prose-custom">
              <PostContent />
            </div>

            {/* Footer */}
            <hr className="my-12 border-zinc-700/30" />

            {/* Back link */}
            <div className="flex items-center justify-between">
              <Link
                href="/blog"
                className="text-sm text-accent transition-colors hover:text-accent/80"
              >
                ← Back to all posts
              </Link>
              <Link
                href="/"
                className="text-sm text-text-muted transition-colors hover:text-accent"
              >
                Back to portfolio →
              </Link>
            </div>
          </article>
        </FadeIn>
      </Container>
    </div>
  );
}
