"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/data/site-config";
import { education } from "@/data/education";
import { focusAreas } from "@/data/site-config";
import Container from "@/components/ui/Container";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function HeroSection() {
  const { t } = useI18n();

  const proofStats = [
    { target: 10, suffix: "", decimals: 0, label: t("stats.projects") },
    { target: 95, suffix: "M+", decimals: 0, label: t("stats.records") },
    { target: 28, suffix: "", decimals: 0, label: t("stats.credentials") },
    { target: 47, suffix: "", decimals: 0, label: t("stats.tech") },
  ];

  return (
    <section id="hero" aria-label="Hero" className="relative overflow-hidden border-b border-border bg-bg py-16 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-purple/5" />
      <Container>
        <div className="grid gap-10 lg:grid-cols-5">
          {/* Left: Identity + proof */}
          <div className="lg:col-span-3">
            <p className="mb-3 font-mono text-sm text-accent">Hello, I&apos;m</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="gradient-text">{siteConfig.name}</span>
            </h1>
            <div className="mt-2 flex items-center gap-3">
              <p className="text-xl font-semibold text-text-secondary">{t("hero.greeting")}</p>
              {siteConfig.availability.status === "open" && (
                <span className="inline-flex items-center gap-1.5 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-0.5 text-xs font-medium text-green-400">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                  {siteConfig.availability.label}
                </span>
              )}
            </div>

            <p className="mt-5 max-w-lg text-base leading-relaxed text-text-secondary">
              {t("hero.tagline")}
            </p>

            {/* Proof metrics */}
            <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4" role="list" aria-label="Portfolio statistics">
              {proofStats.map((stat) => (
                <div key={stat.label} role="listitem" className="rounded-lg border border-border bg-bg-surface px-3 py-2 text-center">
                  <p className="text-lg font-bold font-mono text-accent">
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} decimals={stat.decimals} />
                  </p>
                  <p className="text-[11px] text-text-muted">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover">
                {t("hero.cta.projects")}
              </a>
              <a href="#contact" className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                {t("hero.cta.contact")}
              </a>
              <Link href="/resume" className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                {t("nav.resume")}
              </Link>
            </div>
          </div>

          {/* Right: Education + Focus */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-md border border-border bg-bg-surface p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Education
              </h3>
              <p className="text-sm font-semibold text-text-primary">{education.degree}</p>
              <p className="text-sm text-text-secondary">{education.major}</p>
              <p className="mt-1 text-xs text-text-muted">{education.school}</p>
              <div className="mt-3 flex items-center gap-3">
                <span className="rounded bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                  GPA {education.gpa}
                </span>
                <span className="text-[11px] text-text-muted">{education.period}</span>
              </div>
              {education.awards.length > 0 && (
                <ul className="mt-3 space-y-1">
                  {education.awards.map((award) => (
                    <li key={award} className="flex items-start gap-1.5 text-[11px] text-text-muted">
                      <span aria-hidden="true" className="mt-1 h-1 w-1 shrink-0 rounded-full bg-accent/50" />
                      {award}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="rounded-md border border-border bg-bg-surface p-5">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-text-muted">
                Technical Focus
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {focusAreas.map((area) => (
                  <div key={area.label} className="rounded-md border border-border bg-bg px-3 py-2">
                    <p className="text-xs font-semibold text-text-primary">{area.label}</p>
                    <p className="mt-0.5 text-[10px] text-text-muted">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
