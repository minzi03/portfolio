import fs from "node:fs";
import path from "node:path";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readTime: string;
}

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

/**
 * Get all blog post slugs (without .mdx extension).
 */
export function getAllBlogSlugs(): string[] {
  const files = fs.readdirSync(BLOG_DIR);
  return files
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}

/**
 * Extract metadata from an MDX file by reading the exported metadata object.
 * This is a simple parser that reads the `export const metadata = {...}` block.
 */
function extractMetadata(filePath: string): Omit<BlogPost, "slug"> {
  const content = fs.readFileSync(filePath, "utf-8");

  // Match export const metadata = { ... }
  const match = content.match(
    /export\s+const\s+metadata\s*=\s*(\{[\s\S]*?\})\s*;/
  );
  if (!match) {
    throw new Error(`No metadata found in ${filePath}`);
  }

  // Parse the metadata object (safe eval for build-time)
  const metaStr = match[1];
  const title = metaStr.match(/title:\s*["']([^"']+)["']/)?.[1] || "";
  const description =
    metaStr.match(/description:\s*["']([^"']+)["']/)?.[1] || "";
  const date = metaStr.match(/date:\s*["']([^"']+)["']/)?.[1] || "";
  const readTime = metaStr.match(/readTime:\s*["']([^"']+)["']/)?.[1] || "";
  const tagsMatch = metaStr.match(/tags:\s*\[([^\]]+)\]/);
  const tags = tagsMatch
    ? tagsMatch[1].split(",").map((t) => t.trim().replace(/["']/g, ""))
    : [];

  return { title, description, date, tags, readTime };
}

/**
 * Get metadata for all blog posts, sorted by date descending.
 */
export function getAllBlogPosts(): BlogPost[] {
  const slugs = getAllBlogSlugs();
  const posts = slugs.map((slug) => {
    const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
    const meta = extractMetadata(filePath);
    return { slug, ...meta };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

/**
 * Get metadata for a single blog post.
 */
export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const meta = extractMetadata(filePath);
  return { slug, ...meta };
}

/**
 * Get related blog posts based on shared tags.
 * Returns up to `limit` posts, sorted by tag overlap count descending.
 */
export function getRelatedPosts(slug: string, limit = 3): BlogPost[] {
  const currentPost = getBlogPost(slug);
  if (!currentPost) return [];

  const allPosts = getAllBlogPosts();
  const currentTags = new Set(currentPost.tags);

  return allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      sharedTags: p.tags.filter((t) => currentTags.has(t)).length,
    }))
    .filter((item) => item.sharedTags > 0)
    .sort((a, b) => b.sharedTags - a.sharedTags)
    .slice(0, limit)
    .map((item) => item.post);
}
