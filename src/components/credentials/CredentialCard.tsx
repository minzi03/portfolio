import Image from "next/image";
import type { Credential } from "@/data/credentials";
import { categoryLabels, categoryMeta, credentialTypeLabels } from "@/data/credentials";
import CredentialTrustBadge from "./CredentialTrustBadge";

interface CredentialCardProps {
  credential: Credential;
  onClick: (trigger: HTMLElement) => void;
}

export default function CredentialCard({ credential, onClick }: CredentialCardProps) {
  const confirmedAssets = credential.evidenceAssets.filter(
    (a) => a.reviewState === "confirmed"
  );
  const hasImage = confirmedAssets.some((a) =>
    /\.(jpg|jpeg|png|webp)$/i.test(a.asset)
  );
  const imageAsset = confirmedAssets.find((a) =>
    /\.(jpg|jpeg|png|webp)$/i.test(a.asset)
  );
  const hasPdf = confirmedAssets.some((a) => /\.pdf$/i.test(a.asset));
  const pdfAsset = confirmedAssets.find((a) => /\.pdf$/i.test(a.asset));
  const hasVerifyUrl = Boolean(credential.verifyUrl);

  const meta = categoryMeta[credential.category];

  return (
    <button
      type="button"
      onClick={(e) => onClick(e.currentTarget)}
      aria-label={`${credential.title} — ${credential.issuer} — ${categoryLabels[credential.category]}`}
      className={`group w-full overflow-hidden rounded-xl border bg-bg-surface text-left transition-all hover:shadow-md cursor-pointer ${
        credential.featured
          ? "border-accent/30 hover:border-accent/50"
          : "border-border hover:border-accent/30"
      }`}
    >
      {/* Certificate image, PDF, or placeholder */}
      {hasImage && imageAsset ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-bg">
          <Image
            src={imageAsset.asset}
            alt={`${credential.title} — certificate issued by ${credential.issuer}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : hasPdf && pdfAsset ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-bg">
          <object
            data={pdfAsset.asset}
            type="application/pdf"
            className="absolute inset-0 h-full w-full"
            aria-label={`${credential.title} — PDF certificate`}
          >
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-4xl text-text-muted/30">📄</span>
            </div>
          </object>
        </div>
      ) : (
        <div className={`flex aspect-[4/3] items-center justify-center ${meta.bg}`}>
          <span className={`text-4xl ${meta.color}`}>{meta.icon}</span>
        </div>
      )}

      {/* Info */}
      <div className="p-3">
        {/* Category + Type badges */}
        <div className="flex items-center gap-1.5">
          <span className={`inline-flex items-center gap-1 rounded-sm ${meta.bg} px-1.5 py-0.5 text-[9px] font-medium ${meta.color}`}>
            {meta.icon} {categoryLabels[credential.category]}
          </span>
          <span className="text-[9px] text-text-muted">
            {credentialTypeLabels[credential.credentialType]}
          </span>
        </div>

        {/* Title — max 2 lines */}
        <h3 className="mt-2 text-sm font-semibold leading-snug text-text-primary group-hover:text-accent line-clamp-2">
          {credential.title}
        </h3>

        {/* Issuer · Date */}
        <p className="mt-1 text-xs text-text-muted">
          {credential.issuer}
          {credential.issued && (
            <>
              <span className="mx-1.5">·</span>
              {credential.issued}
            </>
          )}
        </p>

        {/* Skills preview — show first 2 */}
        {credential.skills && credential.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {credential.skills.slice(0, 2).map((skill) => (
              <span
                key={skill}
                className="rounded border border-border bg-bg px-1.5 py-0.5 text-[9px] text-text-muted"
              >
                {skill}
              </span>
            ))}
            {credential.skills.length > 2 && (
              <span className="text-[9px] text-text-muted">
                +{credential.skills.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Trust badge + CTA */}
        <div className="mt-2.5 flex items-center justify-between">
          <CredentialTrustBadge level={credential.evidence} />

          {hasVerifyUrl ? (
            <span className="text-[11px] text-accent transition-colors hover:text-accent-hover">
              Verify ↗
            </span>
          ) : (hasImage || hasPdf) ? (
            <span className="text-[11px] text-text-muted transition-colors group-hover:text-accent">
              View evidence →
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
