"use client";

import { useState, useMemo } from "react";
import Container from "@/components/ui/Container";
import CredentialCard from "@/components/credentials/CredentialCard";
import CredentialModal from "@/components/credentials/CredentialModal";
import {
  credentials,
  credentialCategories,
  categoryLabels,
  type Credential,
  type CredentialCategory,
} from "@/data/credentials";
import { fuzzySearch } from "@/lib/fuzzy-search";
import { useI18n } from "@/lib/i18n";

type SortOption = "newest" | "oldest" | "alpha" | "category";

const SORT_LABELS: Record<SortOption, string> = {
  newest: "Newest first",
  oldest: "Oldest first",
  alpha: "A → Z",
  category: "By category",
};

function parseIssuedDate(cred: Credential): Date {
  const raw = cred.issued ?? "";
  // Handle "Apr 2026", "2025", "Oct 2025" etc.
  const match = raw.match(/(\w+)\s+(\d{4})/);
  if (match) {
    const month = new Date(`${match[1]} 1, 2000`).getMonth();
    return new Date(parseInt(match[2]), month);
  }
  const yearMatch = raw.match(/(\d{4})/);
  if (yearMatch) return new Date(parseInt(yearMatch[1]), 0);
  return new Date(0);
}

function sortCredentials(items: Credential[], sort: SortOption): Credential[] {
  const sorted = [...items];
  switch (sort) {
    case "newest":
      return sorted.sort((a, b) => parseIssuedDate(b).getTime() - parseIssuedDate(a).getTime());
    case "oldest":
      return sorted.sort((a, b) => parseIssuedDate(a).getTime() - parseIssuedDate(b).getTime());
    case "alpha":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "category":
      return sorted.sort((a, b) => a.category.localeCompare(b.category) || parseIssuedDate(b).getTime() - parseIssuedDate(a).getTime());
  }
}

export default function CredentialsPageContent() {
  const { t } = useI18n();
  const [active, setActive] = useState<CredentialCategory | "all">("all");
  const [sort, setSort] = useState<SortOption>("newest");
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = active === "all" ? credentials : credentials.filter((c) => c.category === active);

    if (search.trim()) {
      const fuzzyResults = fuzzySearch(
        result,
        search,
        [
          (c) => c.title,
          (c) => c.issuer,
          (c) => c.skills?.join(" "),
        ]
      );
      result = fuzzyResults.map((r) => r.item);
    }

    return sortCredentials(result, sort);
  }, [active, sort, search]);

  const selectedCredential = selected
    ? credentials.find((c) => c.id === selected) ?? null
    : null;

  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">
            {t("credentials.badge")}
          </p>
          <h1 className="text-3xl font-bold tracking-tight text-text-primary sm:text-4xl">
            {t("credentials.pageTitle")}
          </h1>
          <p className="mt-3 text-base text-text-secondary">
            {t("credentials.pageDescription")}
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

        {/* Controls row: search + sort */}
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative max-w-xs flex-1">
            <label htmlFor="credential-search" className="sr-only">
              Search credentials
            </label>
            <input
              id="credential-search"
              type="search"
              placeholder="Search by title, issuer, or skill..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-border bg-bg-surface px-3 py-2 pl-9 text-sm text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
            <svg
              className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-muted"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <label htmlFor="credential-sort" className="text-xs text-text-muted">
              Sort:
            </label>
            <select
              id="credential-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="rounded-lg border border-border bg-bg-surface px-3 py-2 text-sm text-text-secondary focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
            >
              {(Object.entries(SORT_LABELS) as [SortOption, string][]).map(([key, label]) => (
                <option key={key} value={key}>{label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Category filter */}
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActive("all")}
            className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
              active === "all"
                ? "bg-accent text-bg"
                : "border border-border text-text-secondary hover:text-text-primary"
            }`}
          >
            All ({credentials.length})
          </button>
          {credentialCategories.map((cat) => {
            const count = credentials.filter((c) => c.category === cat).length;
            if (count === 0) return null;
            return (
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
                {categoryLabels[cat]} ({count})
              </button>
            );
          })}
        </div>

        {/* Results count — live region for screen readers */}
        <div className="mt-4 flex items-center gap-2">
          <p className="text-xs text-text-muted" aria-live="polite" aria-atomic="true">
            {filtered.length} credential{filtered.length !== 1 ? "s" : ""}
            {active !== "all" && <> in {categoryLabels[active]}</>}
            {search.trim() && <> matching &ldquo;{search.trim()}&rdquo;</>}
          </p>
          {(active !== "all" || search.trim()) && (
            <button
              type="button"
              onClick={() => { setActive("all"); setSearch(""); }}
              className="text-xs text-accent hover:text-accent-hover"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((cred) => (
            <CredentialCard
              key={cred.id}
              credential={cred}
              onClick={() => setSelected(cred.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 text-center">
            <p className="text-sm text-text-muted">No credentials match your filters.</p>
            <button
              type="button"
              onClick={() => { setActive("all"); setSearch(""); }}
              className="mt-2 text-sm text-accent hover:text-accent-hover"
            >
              Reset filters
            </button>
          </div>
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
