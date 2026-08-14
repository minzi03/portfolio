"use client";

import { useState } from "react";
import Link from "next/link";
import FadeIn from "@/components/ui/FadeIn";
import Pagination from "@/components/ui/Pagination";
import type { BlogPost } from "@/lib/blog";

const POSTS_PER_PAGE = 5;

interface BlogListProps {
  posts: BlogPost[];
}

export default function BlogList({ posts }: BlogListProps) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);
  const startIdx = (page - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(startIdx, startIdx + POSTS_PER_PAGE);

  return (
    <div id="blog-list">
      {/* Post list */}
      <div className="space-y-6">
        {currentPosts.map((post) => (
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

      {/* Pagination */}
      <Pagination totalPages={totalPages} onPageChange={setPage} />

      {/* Page info */}
      {totalPages > 1 && (
        <p className="mt-6 text-center text-xs text-text-muted">
          Page {page} of {totalPages} · {posts.length} posts
        </p>
      )}
    </div>
  );
}
