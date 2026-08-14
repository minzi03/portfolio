"use client";

import { useRouter } from "next/navigation";
import CredentialCard from "./CredentialCard";
import type { Credential } from "@/data/credentials";

/**
 * Client wrapper that makes CredentialCard navigate to /credentials on click.
 * Used on the Home page where the parent is a server component.
 */
export default function CredentialCardLink({ credential, compact = false }: { credential: Credential; compact?: boolean }) {
  const router = useRouter();

  return (
    <CredentialCard
      credential={credential}
      onClick={() => router.push("/credentials")}
      compact={compact}
    />
  );
}
