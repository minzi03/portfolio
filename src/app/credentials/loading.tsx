import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Loading skeleton for /credentials — mimics the real layout:
 * header → stats row → filter chips → 3-column card grid.
 */
export default function CredentialsLoading() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="max-w-2xl">
          <Skeleton className="mb-3 h-3 w-20" />
          <Skeleton className="h-9 w-80 max-w-full" />
          <Skeleton className="mt-3 h-4 w-96 max-w-full" />
        </div>

        {/* Stats row */}
        <div className="mt-8 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="mb-1 h-7 w-8" />
              <Skeleton className="h-3 w-16" />
            </div>
          ))}
        </div>

        {/* Filter chips */}
        <div className="mt-8 flex flex-wrap gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20" rounded="rounded-lg" />
          ))}
        </div>

        {/* Card grid */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 9 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-border bg-bg-surface"
            >
              {/* Image placeholder */}
              <Skeleton className="aspect-[4/3] w-full rounded-none" rounded="rounded-none" />
              {/* Info */}
              <div className="p-3 space-y-2">
                <div className="flex gap-1.5">
                  <Skeleton className="h-4 w-16" rounded="rounded-sm" />
                  <Skeleton className="h-4 w-12" rounded="rounded-sm" />
                </div>
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-3 w-2/3" />
                <Skeleton className="h-4 w-20" rounded="rounded" />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
