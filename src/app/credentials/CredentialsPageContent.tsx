"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import CredentialCard from "@/components/credentials/CredentialCard";
import CredentialModal from "@/components/credentials/CredentialModal";
import {
  credentials,
  credentialCategories,
  categoryLabels,
  type CredentialCategory,
} from "@/data/credentials";

export default function CredentialsPageContent() {
  const [active, setActive] = useState<CredentialCategory | "all">("all");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered =
    active === "all"
      ? credentials
      : credentials.filter((c) => c.category === active);

  const selectedCredential = selected
    ? credentials.find((c) => c.id === selected) ?? null
    : null;

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
            Credentials
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            Credentials &amp; Achievements
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            Certifications, technical assessments, academic recognition and milestones
            across my data engineering journey.
          </p>
        </div>

        {/* Summary stats */}
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {[
            { value: credentials.filter((c) => c.category === "data-engineering").length, label: "Data Eng." },
            { value: credentials.filter((c) => c.category === "cloud").length, label: "Cloud" },
            { value: credentials.filter((c) => c.category === "analytics").length, label: "Analytics" },
            { value: credentials.filter((c) => c.category === "sql").length, label: "SQL" },
            { value: credentials.filter((c) => c.category === "academic").length, label: "Academic" },
            { value: credentials.filter((c) => c.category === "award").length, label: "Awards" },
          ].map((s) => (
            <div key={s.label}>
              <p className="text-2xl font-bold font-mono text-accent">{s.value}</p>
              <p className="text-xs text-text-muted">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div className="mt-8 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              active === "all"
                ? "bg-accent text-bg"
                : "border border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            All
          </button>
          {credentialCategories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActive(cat)}
              className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                active === cat
                  ? "bg-accent text-bg"
                  : "border border-border text-text-secondary hover:text-text-primary"
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cred) => (
            <CredentialCard
              key={cred.id}
              credential={cred}
              onClick={() => setSelected(cred.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-8 text-sm text-text-muted">No credentials in this category.</p>
        )}
      </Container>

      {/* Modal */}
      {selectedCredential && (
        <CredentialModal
          credential={selectedCredential}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}
