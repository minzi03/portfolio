"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/data/site-config";

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur-md">
      <nav className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="font-mono text-sm font-bold tracking-tight text-text-primary">
          {siteConfig.shortName}<span className="text-accent">.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {siteConfig.navLinks.map((link) => {
            const active = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-accent/10 text-accent"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.resumeUrl}
            className="rounded-lg px-3 py-1.5 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Resume ↗
          </a>
          <div className="ml-1 border-l border-border pl-2">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          aria-expanded={mobileOpen}
        >
          <svg className="h-5 w-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {mobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-border bg-bg px-6 py-4 md:hidden">
          {siteConfig.navLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-lg px-3 py-2 text-sm transition-colors ${
                  active ? "bg-accent/10 text-accent" : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <a
            href={siteConfig.resumeUrl}
            onClick={() => setMobileOpen(false)}
            className="block rounded-lg px-3 py-2 text-sm text-text-secondary transition-colors hover:text-text-primary"
          >
            Resume ↗
          </a>
          <div className="mt-3 border-t border-border pt-3">
            <ThemeToggle />
          </div>
        </div>
      )}
    </header>
  );
}
