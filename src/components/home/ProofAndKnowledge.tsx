"use client";

import Link from "next/link";
import { useI18n } from "@/lib/i18n";
import { credentials } from "@/data/credentials";
import Container from "@/components/ui/Container";
import CredentialCardLink from "@/components/credentials/CredentialCardLink";

export default function ProofAndKnowledge() {
  const { t } = useI18n();
  const featuredCredentials = credentials.filter((c) => c.featured);

  return (
    <section id="knowledge" aria-label="Credentials" className="border-b border-border bg-bg-surface py-16">
      <Container>
        <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{t("credentials.badge")}</p>
            <h2 className="text-lg font-bold tracking-tight text-text-primary">
              {t("credentials.title").replace("{count}", String(featuredCredentials.length))}
            </h2>
          </div>
          <Link
            href="/credentials"
            className="text-xs font-medium text-accent hover:text-accent-hover"
          >
            {t("credentials.viewAll").replace("{count}", String(credentials.length))}
          </Link>
        </div>

        {/* Credentials grid — compact 2-col */}
        <div className="grid gap-2 sm:grid-cols-2">
          {featuredCredentials.map((cred) => (
            <CredentialCardLink key={cred.id} credential={cred} />
          ))}
        </div>
      </Container>
    </section>
  );
}
