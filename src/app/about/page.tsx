import type { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "About",
  description: "About Nguyen Minh Duy — Data Engineer based in Ho Chi Minh City.",
  alternates: { canonical: "/about" },
  openGraph: { title: "About | Nguyen Minh Duy", description: "From data warehousing at UIT to data engineering." },
};

const sections = [
  {
    num: "01",
    title: "Who I am",
    content:
      "I'm Nguyen Minh Duy, a Data Engineer based in Ho Chi Minh City. I graduated from VNU-HCM University of Information Technology (UIT) with a Bachelor of Information Technology, majoring in Information Systems. I've spent the past year building data infrastructure — from data warehouses and ETL pipelines to Lakehouse architectures and real-time CDC systems.",
  },
  {
    num: "02",
    title: "How I got into data",
    content:
      "My journey started at UIT with database systems, data warehousing, and BI projects. I built ETL pipelines and star schema models as academic projects, which sparked my interest in the infrastructure behind analytics. That curiosity led me to Katalyst, where I worked on data lakehouse infrastructure with Dremio, Iceberg, and Apache NiFi — and I never looked back.",
  },
  {
    num: "03",
    title: "What I enjoy building",
    content:
      "I'm most interested in the intersection of data infrastructure, distributed systems, and analytics. I like building pipelines that are reliable, observable, and maintainable — systems where data quality is built in, not bolted on. The Lakehouse paradigm excites me because it combines the flexibility of data lakes with the reliability of warehouses.",
  },
  {
    num: "04",
    title: "How I approach engineering",
    content:
      "I believe in understanding the 'why' before the 'how.' Every technology choice should have a reason — Iceberg over Parquet because of ACID transactions, CDC over polling because of freshness requirements, dbt over raw SQL because of maintainability. I care about clean architecture, idempotent pipelines, and systems that are designed for reliability.",
  },
  {
    num: "05",
    title: "Currently",
    content:
      "I'm currently a Data Engineer Intern at QuanSkill, building config-driven data ingestion platforms. I'm deepening my knowledge of streaming architectures, data governance, and cloud data platforms. I'm also writing technical notes to solidify what I learn — because if you can't explain it simply, you don't understand it well enough.",
  },
];

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

        {/* Sections */}
        <div className="mt-16 space-y-12">
          {sections.map((s) => (
            <div key={s.num} className="grid gap-4 sm:grid-cols-[4rem_1fr]">
              <p className="font-mono text-sm text-accent">{s.num}</p>
              <div>
                <h2 className="text-lg font-semibold text-text-primary">{s.title}</h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-text-secondary">
                  {s.content}
                </p>
              </div>
            </div>
          ))}
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
