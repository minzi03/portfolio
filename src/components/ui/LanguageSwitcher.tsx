"use client";

import { useI18n, type Locale } from "@/lib/i18n";

const LABELS: Record<Locale, string> = {
  en: "EN",
  vi: "VI",
};

const FULL_LABELS: Record<Locale, string> = {
  en: "English",
  vi: "Tiếng Việt",
};

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Language">
      {(Object.keys(LABELS) as Locale[]).map((l) => (
        <button
          key={l}
          type="button"
          role="radio"
          aria-checked={locale === l}
          aria-label={FULL_LABELS[l]}
          onClick={() => setLocale(l)}
          className={`rounded-md px-2 py-1 text-[11px] font-mono font-medium transition-colors ${
            locale === l
              ? "bg-accent/15 text-accent border border-accent/30"
              : "text-text-muted hover:text-text-secondary border border-transparent"
          }`}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  );
}
