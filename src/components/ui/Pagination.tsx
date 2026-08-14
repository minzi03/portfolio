"use client";

import { useState } from "react";

interface PaginationProps {
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, onPageChange }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);

  if (totalPages <= 1) return null;

  const goTo = (page: number) => {
    setCurrentPage(page);
    onPageChange(page);
    // Scroll to top of blog list
    document.getElementById("blog-list")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav aria-label="Blog pagination" className="mt-12 flex items-center justify-center gap-2">
      {/* Previous */}
      <button
        type="button"
        onClick={() => goTo(currentPage - 1)}
        disabled={currentPage === 1}
        className="flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm text-text-muted transition-colors hover:border-accent/30 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Previous page"
      >
        ← Prev
      </button>

      {/* Page numbers */}
      {pages.map((page) => {
        // Show: first, last, current, and neighbors
        const show =
          page === 1 ||
          page === totalPages ||
          Math.abs(page - currentPage) <= 1;

        if (!show) {
          // Show ellipsis only once between gaps
          if (page === currentPage - 2 || page === currentPage + 2) {
            return (
              <span key={`ellipsis-${page}`} className="px-2 text-text-muted">
                …
              </span>
            );
          }
          return null;
        }

        return (
          <button
            key={page}
            type="button"
            onClick={() => goTo(page)}
            aria-current={page === currentPage ? "page" : undefined}
            className={`h-9 w-9 rounded-md text-sm font-medium transition-colors ${
              page === currentPage
                ? "bg-accent/15 text-accent border border-accent/30"
                : "border border-border text-text-muted hover:border-accent/20 hover:text-text-secondary"
            }`}
          >
            {page}
          </button>
        );
      })}

      {/* Next */}
      <button
        type="button"
        onClick={() => goTo(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="flex h-9 items-center gap-1 rounded-md border border-border px-3 text-sm text-text-muted transition-colors hover:border-accent/30 hover:text-accent disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Next page"
      >
        Next →
      </button>
    </nav>
  );
}
