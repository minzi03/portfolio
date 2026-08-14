import { getAllBlogPosts, type BlogPost } from "@/lib/blog";
import { projects } from "@/data/projects";
import { credentials } from "@/data/credentials";

export interface SearchItem {
  id: string;
  title: string;
  description: string;
  category: "blog" | "project" | "credential";
  href: string;
  tags: string[];
}

/**
 * Build a unified search index across blog posts, projects, and credentials.
 */
export function buildSearchIndex(): SearchItem[] {
  const blogPosts: SearchItem[] = getAllBlogPosts().map((post: BlogPost) => ({
    id: `blog-${post.slug}`,
    title: post.title,
    description: post.description,
    category: "blog" as const,
    href: `/blog/${post.slug}`,
    tags: post.tags,
  }));

  const projectItems: SearchItem[] = projects.map((p) => ({
    id: `project-${p.id}`,
    title: p.title,
    description: p.subtitle,
    category: "project" as const,
    href: `/projects/${p.slug}`,
    tags: [...p.tech, p.category.replace(/-/g, " ")],
  }));

  const credentialItems: SearchItem[] = credentials.map((c) => ({
    id: `cred-${c.id}`,
    title: c.title,
    description: c.issuer,
    category: "credential" as const,
    href: "/credentials",
    tags: c.skills?.slice(0, 5) ?? [],
  }));

  return [...blogPosts, ...projectItems, ...credentialItems];
}

/**
 * Full-text search across the search index.
 * Matches on title, description, and tags.
 */
export function searchItems(query: string): SearchItem[] {
  const index = buildSearchIndex();
  const q = query.toLowerCase().trim();
  if (!q) return [];

  return index
    .map((item) => {
      let score = 0;

      // Title match (highest weight)
      if (item.title.toLowerCase().includes(q)) score += 10;

      // Description match
      if (item.description.toLowerCase().includes(q)) score += 5;

      // Tag match
      item.tags.forEach((tag) => {
        if (tag.toLowerCase().includes(q)) score += 3;
      });

      // Exact word match bonus
      const words = q.split(/\s+/);
      words.forEach((word) => {
        if (word.length < 2) return;
        if (item.title.toLowerCase().includes(word)) score += 2;
        if (item.description.toLowerCase().includes(word)) score += 1;
      });

      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.item);
}
