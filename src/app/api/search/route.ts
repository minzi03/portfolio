import { NextResponse } from "next/server";
import { getAllBlogPosts, type BlogPost } from "@/lib/blog";
import { projects } from "@/data/projects";
import { credentials } from "@/data/credentials";

export interface SearchItem {
  id: string;
  label: string;
  category: string;
  description: string;
  href: string;
}

export async function GET() {
  const blogItems: SearchItem[] = getAllBlogPosts().map((post: BlogPost) => ({
    id: `blog-${post.slug}`,
    label: post.title,
    category: "Blog",
    description: post.description,
    href: `/blog/${post.slug}`,
  }));

  const projectItems: SearchItem[] = projects.map((p) => ({
    id: `project-${p.id}`,
    label: p.title,
    category: p.category.replace(/-/g, " "),
    description: p.subtitle,
    href: `/projects/${p.slug}`,
  }));

  const credentialItems: SearchItem[] = credentials.map((c) => ({
    id: `cred-${c.id}`,
    label: c.title,
    category: c.issuer,
    description: "",
    href: "/credentials",
  }));

  return NextResponse.json([...blogItems, ...projectItems, ...credentialItems]);
}
