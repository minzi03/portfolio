"use client";

import { useI18n } from "@/lib/i18n";
import { siteConfig } from "@/data/site-config";
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactSection() {
  const { t } = useI18n();

  return (
    <section id="contact" aria-label="Contact" className="bg-bg py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left — info + links */}
          <div>
            <div className="mb-8">
              <p className="mb-1 font-mono text-xs uppercase tracking-widest text-accent">{t("contact.badge")}</p>
              <h2 className="text-2xl font-bold tracking-tight text-text-primary">{t("contact.title")}</h2>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-text-secondary">
              {t("contact.description")}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary"
              >
                {t("contact.channels.email")}
              </a>
              <a href={siteConfig.github} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                GitHub <span className="sr-only">(opens in new tab)</span>
              </a>
              <a href={siteConfig.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                LinkedIn <span className="sr-only">(opens in new tab)</span>
              </a>
              <a href={siteConfig.resumeUrl} className="inline-flex h-11 items-center rounded-md border border-border px-5 text-sm font-medium text-text-secondary transition-colors hover:text-text-primary">
                {t("contact.channels.resume")}
              </a>
            </div>
          </div>

          {/* Right — contact form */}
          <div className="rounded-2xl border border-border bg-bg-surface p-6">
            <h3 className="mb-4 text-lg font-semibold text-text-primary">{t("contact.form.title")}</h3>
            <ContactForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
