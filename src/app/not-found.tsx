import Link from "next/link";
import Container from "@/components/ui/Container";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center bg-bg py-24">
      <Container>
        <p className="font-mono text-sm text-accent">404</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-text-primary">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm text-text-secondary">
          The dataset you&apos;re looking for isn&apos;t available in this collection.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex h-10 items-center rounded-lg bg-accent px-5 text-sm font-medium text-bg transition-colors hover:bg-accent-hover"
        >
          Back to home
        </Link>
      </Container>
    </div>
  );
}
