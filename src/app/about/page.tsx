import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import { education } from "@/data/education";
import { credentials } from "@/data/credentials";

export const metadata: Metadata = {
  title: "About",
  description: "About Nguyen Minh Duy — Data Engineer based in Ho Chi Minh City.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About | Nguyen Minh Duy",
    description: "From data warehousing at UIT to data engineering at Katalyst and QuanSkill.",
  },
};

const journeySteps = [
  "Database Systems & SQL",
  "Data Warehousing / OLAP",
  "Big Data / Spark / Kafka",
  "Katalyst — Lakehouse Infrastructure",
  "QuanSkill — Config-Driven Ingestion",
  "Data Engineering",
];

const academicAwards = credentials.filter((c) => c.category === "award");
const vstep = credentials.find((c) => c.id === "vstep-b2");
const activities = credentials.filter((c) => c.category === "activity" || c.category === "soft-skills");

export default function AboutPage() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">About</p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            A bit about me
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            From data warehousing at UIT to data engineering at Katalyst and QuanSkill.
          </p>
        </div>

        {/* 01 — Who I am */}
        <div className="mt-16 grid gap-8 sm:grid-cols-[4rem_1fr]">
          <p className="font-mono text-sm text-accent">01</p>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Who I am</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
              I&apos;m Nguyen Minh Duy, a Data Engineer based in Ho Chi Minh City. I graduated from VNU-HCM
              University of Information Technology (UIT) with a Bachelor of Engineering in Information
              Technology, majoring in Information Systems. I&apos;ve spent the past year building data
              infrastructure — from data warehouses and ETL pipelines to Lakehouse architectures and
              real-time CDC systems.
            </p>
          </div>
        </div>

        {/* 02 — Education */}
        <div className="mt-12 grid gap-8 sm:grid-cols-[4rem_1fr]">
          <p className="font-mono text-sm text-accent">02</p>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Education</h2>
            <div className="mt-3 rounded-xl border border-border bg-bg-surface p-5">
              <h3 className="text-base font-semibold text-text-primary">{education.school}</h3>
              <p className="text-sm text-text-secondary">{education.degree} — {education.major}</p>
              <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
                <span>{education.period}</span>
                <span>Average: {education.gpa}</span>
                <span>{education.credits} credits</span>
                <span>Classification: {education.classification}</span>
              </div>
            </div>

            {/* Graduation photo placeholder */}
            <div className="mt-4 rounded-xl border border-border bg-bg-surface p-4">
              <p className="text-xs text-text-muted">
                🎓 Graduated Jul 2026 — Classification: Good
              </p>
            </div>
          </div>
        </div>

        {/* 03 — Path into data */}
        <div className="mt-12 grid gap-8 sm:grid-cols-[4rem_1fr]">
          <p className="font-mono text-sm text-accent">03</p>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">My path into data</h2>
            <div className="mt-3 space-y-0">
              {journeySteps.map((step, i) => (
                <div key={step} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <span className="h-3 w-3 shrink-0 rounded-full bg-accent" />
                    {i < journeySteps.length - 1 && (
                      <span className="h-8 w-px bg-border" />
                    )}
                  </div>
                  <p className={`text-sm ${i === journeySteps.length - 1 ? "font-semibold text-accent" : "text-text-secondary"}`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 04 — Academic Recognition */}
        <div className="mt-12 grid gap-8 sm:grid-cols-[4rem_1fr]">
          <p className="font-mono text-sm text-accent">04</p>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Academic recognition</h2>
            <div className="mt-3 space-y-2">
              {academicAwards.map((award) => (
                <div key={award.id} className="flex items-baseline gap-3 rounded-lg border border-border bg-bg-surface px-4 py-2.5">
                  <span className="font-mono text-xs text-text-muted">{award.issued}</span>
                  <span className="text-sm text-text-secondary">{award.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 05 — English */}
        {vstep && (
          <div className="mt-12 grid gap-8 sm:grid-cols-[4rem_1fr]">
            <p className="font-mono text-sm text-accent">05</p>
            <div>
              <h2 className="text-lg font-semibold text-text-primary">English</h2>
              <div className="mt-3 rounded-xl border border-border bg-bg-surface p-5">
                <div className="flex items-baseline gap-3">
                  <p className="text-base font-semibold text-text-primary">VSTEP Level 4 (B2)</p>
                  <span className="text-xs text-text-muted">Overall 6.0 / 10</span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-x-8 gap-y-1.5 text-sm">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Reading</span>
                    <span className="font-mono text-text-secondary">7.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Writing</span>
                    <span className="font-mono text-text-secondary">6.0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Speaking</span>
                    <span className="font-mono text-text-secondary">5.5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Listening</span>
                    <span className="font-mono text-text-secondary">4.5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 06 — Beyond Engineering */}
        <div className="mt-12 grid gap-8 sm:grid-cols-[4rem_1fr]">
          <p className="font-mono text-sm text-accent">06</p>
          <div>
            <h2 className="text-lg font-semibold text-text-primary">Beyond engineering</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {activities.map((a) => (
                <span
                  key={a.id}
                  className="rounded-lg border border-border bg-bg-surface px-3 py-1.5 text-sm text-text-secondary"
                >
                  {a.title.split("—")[0].trim()}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Philosophy */}
        <div className="mt-16 rounded-xl border border-border bg-bg-surface p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-accent">What I care about</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              "Reliability",
              "Observability",
              "Data Quality",
              "Maintainability",
              "Clear Architecture",
              "Idempotent Pipelines",
            ].map((v) => (
              <span
                key={v}
                className="rounded-lg border border-border bg-bg px-3 py-1.5 text-sm text-text-secondary"
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
