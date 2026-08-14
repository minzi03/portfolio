"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "next-themes";
import { siteConfig } from "@/data/site-config";
import { LazyCommandPalette } from "@/components/ui/LazySection";

interface Section {
  id: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "flagship", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "method", label: "Method" },
  { id: "knowledge", label: "Credentials" },
  { id: "contact", label: "Contact" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => setMounted(true), []);

  // ── Intersection Observer for active section tracking ──
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { rootMargin: "-20% 0px -60% 0px", threshold: 0 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // ── Scroll progress bar ──
  useEffect(() => {
    let ticking = false;

    function updateProgress() {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress(Math.min((window.scrollY / scrollHeight) * 100, 100));
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close mobile menu on escape + lock body scroll ──
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      // Move focus into panel
      requestAnimationFrame(() => {
        const first = panelRef.current?.querySelector<HTMLElement>("button, a");
        first?.focus();
      });
    } else {
      document.body.style.overflow = "";
      // Restore focus to hamburger
      hamburgerRef.current?.focus();
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // ── Focus trap inside mobile panel ──
  useEffect(() => {
    if (!mobileOpen) return;
    const panel = panelRef.current;
    if (!panel) return;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const focusable = panel.querySelectorAll<HTMLElement>("button, a, [tabindex]");
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTab);
    return () => document.removeEventListener("keydown", handleTab);
  }, [mobileOpen]);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const navbarHeight = 64;
    const top = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top, behavior: "smooth" });
    setMobileOpen(false);
  }, []);

  return (
    <>
      <nav
        className="fixed top-0 inset-x-0 z-50 h-16 border-b border-border bg-bg/80 backdrop-blur-md"
        aria-label="Main navigation"
      >
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 sm:px-6">
          {/* ── Logo ── */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex-shrink-0 text-lg font-bold tracking-tight text-text-primary transition-colors hover:text-accent"
            aria-label={`${siteConfig.name} — home`}
          >
            {siteConfig.name.split(" ")[0]}
            <span className="text-accent">.</span>
          </button>

          {/* ── Desktop section links ── */}
          <div className="hidden items-center gap-1 lg:flex" role="list">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                role="listitem"
                aria-current={activeSection === id ? "true" : undefined}
                className={`relative px-3 py-2 text-sm font-medium transition-colors rounded-md ${
                  activeSection === id
                    ? "text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {label}
                {activeSection === id && (
                  <span className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full bg-accent" aria-hidden="true" />
                )}
              </button>
            ))}
          </div>

          {/* ── Right actions ── */}
          <div className="flex items-center gap-2">
            {/* Command palette trigger */}
            <LazyCommandPalette />

            {/* Blog */}
            <a
              href="/blog"
              className="hidden items-center gap-1.5 rounded-lg border border-zinc-700/50 px-3 py-1.5 text-sm font-medium text-text-muted transition-all hover:border-accent/30 hover:text-accent sm:inline-flex"
            >
              Blog
            </a>

            {/* Resume */}
            <a
              href={siteConfig.resumeUrl}
              className="hidden items-center gap-1.5 rounded-lg border border-accent/30 bg-accent/10 px-3.5 py-1.5 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-bg sm:inline-flex"
            >
              <svg aria-hidden="true" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
              </svg>
              Resume
            </a>

            {/* GitHub */}
            <a
              href={siteConfig.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg p-2 text-text-muted transition-colors hover:bg-border/50 hover:text-text-primary sm:block"
              aria-label="GitHub (opens in new tab)"
            >
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-lg p-2 text-text-muted transition-colors hover:bg-border/50 hover:text-text-primary sm:block"
              aria-label="LinkedIn (opens in new tab)"
            >
              <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="rounded-lg p-2 text-text-muted transition-colors hover:bg-border/50 hover:text-text-primary"
              aria-label={resolvedTheme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {mounted && resolvedTheme === "dark" ? (
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
                </svg>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              ref={hamburgerRef}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-text-muted transition-colors hover:bg-border/50 hover:text-text-primary lg:hidden"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? (
                <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <div
          className="absolute bottom-0 left-0 h-0.5 bg-accent/60 transition-[width] duration-150"
          style={{ width: `${scrollProgress}%` }}
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Page scroll progress"
        />
      </nav>

      {/* ── Mobile menu overlay ── */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── Mobile menu panel ── */}
      <div
        ref={panelRef}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-16 right-0 z-[51] h-[calc(100vh-4rem)] w-64 overflow-y-auto border-l border-border bg-bg p-4 shadow-xl transition-transform duration-200 lg:hidden ${
          mobileOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-1" role="list">
          {sections.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              role="listitem"
              aria-current={activeSection === id ? "true" : undefined}
              className={`rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors ${
                activeSection === id
                  ? "bg-accent/10 text-accent"
                  : "text-text-secondary hover:bg-border/50 hover:text-text-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-4 border-t border-border pt-4">
          <a
            href="/blog"
            className="flex items-center gap-2 rounded-lg border border-zinc-700/50 px-3 py-2.5 text-sm font-medium text-text-muted transition-all hover:border-accent/30 hover:text-accent"
          >
            Blog
          </a>
        </div>

        <div className="mt-3 border-t border-border pt-3">
          <a
            href={siteConfig.resumeUrl}
            className="flex items-center gap-2 rounded-lg border border-accent/30 bg-accent/10 px-3 py-2.5 text-sm font-medium text-accent transition-all hover:bg-accent hover:text-bg"
          >
            <svg aria-hidden="true" className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            Resume
          </a>
        </div>

        <div className="mt-3 flex gap-2">
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-border/50 hover:text-text-primary"
            aria-label="GitHub (opens in new tab)"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a
            href={siteConfig.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg p-2 text-text-muted transition-colors hover:bg-border/50 hover:text-text-primary"
            aria-label="LinkedIn (opens in new tab)"
          >
            <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>
      </div>
    </>
  );
}
