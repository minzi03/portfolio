/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { fuzzySearch } from "@/lib/fuzzy-search";
import { credentials } from "@/data/credentials";
import { projects } from "@/data/projects";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  href?: string;
  onClick?: () => void;
}

const NAV_ITEMS: CommandItem[] = [
  { id: "hero", label: "Home", category: "Navigation", href: "#hero" },
  { id: "flagship", label: "Featured Project", category: "Navigation", href: "#flagship" },
  { id: "projects", label: "All Projects", category: "Navigation", href: "#projects" },
  { id: "experience", label: "Experience", category: "Navigation", href: "#experience" },
  { id: "skills", label: "Skills", category: "Navigation", href: "#skills" },
  { id: "method", label: "Engineering Method", category: "Navigation", href: "#method" },
  { id: "credentials", label: "Credentials", category: "Navigation", href: "#credentials" },
  { id: "contact", label: "Contact", category: "Navigation", href: "#contact" },
  { id: "blog", label: "Blog", category: "Navigation", href: "/blog" },
  { id: "resume", label: "Resume", category: "Navigation", href: "/resume" },
  { id: "cred-page", label: "All Credentials", category: "Navigation", href: "/credentials" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Build credential items
  const credItems: CommandItem[] = useMemo(
    () =>
      credentials.map((c) => ({
        id: c.id,
        label: c.title,
        category: c.issuer,
        href: `/credentials`,
      })),
    []
  );

  // Build project items
  const projectItems: CommandItem[] = useMemo(
    () =>
      projects.map((p) => ({
        id: `project-${p.id}`,
        label: p.title,
        category: p.category.replace(/-/g, " "),
        href: `/projects/${p.slug}`,
      })),
    []
  );

  const allItems = useMemo(() => [...NAV_ITEMS, ...projectItems, ...credItems], [credItems, projectItems]);

  const results = useMemo(() => {
    if (!query.trim()) {
      // Show nav items first, then featured projects
      const featuredProjects = projectItems.filter((p) =>
        projects.find((proj) => proj.id === p.id.replace("project-", "") && proj.featured)
      );
      return [...NAV_ITEMS.slice(0, 10), ...featuredProjects.slice(0, 3)];
    }
    const fuzzy = fuzzySearch(allItems, query, [
      (item) => item.label,
      (item) => item.category,
    ]);
    return fuzzy.slice(0, 15).map((r) => r.item);
  }, [query, allItems, projectItems]);

  // Keyboard shortcut: Cmd/Ctrl + K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIdx(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  // Arrow key navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[selectedIdx]) {
      e.preventDefault();
      navigateTo(results[selectedIdx]);
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const item = list.children[selectedIdx] as HTMLElement;
    if (item) item.scrollIntoView({ block: "nearest" });
  }, [selectedIdx]);

  const navigateTo = (item: CommandItem) => {
    setOpen(false);
    if (item.href) {
      if (item.href.startsWith("#")) {
        document.querySelector(item.href)?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.location.href = item.href;
      }
    }
  };

  // Handle backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) setOpen(false);
  };

  return (
    <>
      {/* Trigger button — visible in navbar area or as floating hint */}
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border bg-bg-surface px-3 py-1.5 text-xs text-text-muted transition-colors hover:border-accent/30 hover:text-text-secondary"
        aria-label="Open command palette (Ctrl+K)"
      >
        <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-border bg-bg px-1.5 py-0.5 font-mono text-[10px] text-text-muted sm:inline">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 pt-[15vh] backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="dialog"
          aria-label="Command palette"
        >
          <div className="w-full max-w-lg rounded-xl border border-border bg-bg shadow-2xl">
            {/* Search input */}
            <div className="flex items-center gap-3 border-b border-border px-4">
              <svg className="h-4 w-4 shrink-0 text-text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search sections, projects, credentials..."
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIdx(0); }}
                onKeyDown={handleKeyDown}
                role="combobox"
                aria-expanded={results.length > 0}
                aria-controls="command-results"
                aria-activedescendant={results[selectedIdx] ? `cmd-${results[selectedIdx].id}` : undefined}
                aria-label="Search navigation, projects, and credentials"
                className="h-12 flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-muted focus:outline-none"
              />
              <kbd className="rounded border border-border bg-bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-muted">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={listRef} id="command-results" role="listbox" aria-label="Search results" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="py-8 text-center text-sm text-text-muted">No results found.</p>
              ) : (
                results.map((item, i) => (
                  <button
                    key={item.id}
                    id={`cmd-${item.id}`}
                    role="option"
                    aria-selected={i === selectedIdx}
                    onClick={() => navigateTo(item)}
                    onMouseEnter={() => setSelectedIdx(i)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                      i === selectedIdx
                        ? "bg-accent/10 text-accent"
                        : "text-text-secondary hover:bg-bg-surface"
                    }`}
                  >
                    <span className="flex-1 truncate">{item.label}</span>
                    <span className="shrink-0 text-[11px] text-text-muted">{item.category}</span>
                  </button>
                ))
              )}
            </div>

            {/* Footer hint */}
            <div className="border-t border-border px-4 py-2 text-[11px] text-text-muted">
              <span className="mr-3">↑↓ navigate</span>
              <span className="mr-3">↵ select</span>
              <span>esc close</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
