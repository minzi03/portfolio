import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Loading skeleton for /projects/[slug] — mimics the real layout:
 * back link → header → tech tags → action buttons → content sections.
 */
export default function ProjectLoading() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Breadcrumb nav */}
        <div className="mb-8 flex items-center gap-3">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-1" />
          <Skeleton className="h-4 w-14" />
        </div>

        {/* Header */}
        <div className="max-w-2xl">
          <Skeleton className="mb-2 h-3 w-16" />
          <Skeleton className="h-10 w-96 max-w-full" />
          <Skeleton className="mt-3 h-5 w-72 max-w-full" />

          {/* Tech tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} className="h-5 w-16" rounded="rounded" />
            ))}
          </div>

          {/* Action buttons */}
          <div className="mt-6 flex gap-3">
            <Skeleton className="h-10 w-32" rounded="rounded-lg" />
            <Skeleton className="h-10 w-28" rounded="rounded-lg" />
          </div>
        </div>

        {/* Content sections */}
        <div className="mt-12 space-y-12">
          {/* Section 1 — Problem */}
          <div>
            <Skeleton className="mb-3 h-4 w-24" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mt-1 h-4 w-4/5" />
          </div>

          {/* Section 2 — Constraints */}
          <div>
            <Skeleton className="mb-3 h-4 w-28" />
            <div className="grid gap-2 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" rounded="rounded-lg" />
              ))}
            </div>
          </div>

          {/* Section 3 — Tech Deep-Dive */}
          <div>
            <Skeleton className="mb-3 h-4 w-32" />
            <Skeleton className="mb-4 h-4 w-64" />
            <div className="space-y-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-bg-surface p-4">
                  <Skeleton className="mb-3 h-4 w-36" />
                  <div className="space-y-2">
                    {Array.from({ length: 2 }).map((_, j) => (
                      <div key={j} className="flex gap-3">
                        <Skeleton className="h-4 w-32 shrink-0" />
                        <Skeleton className="h-4 w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4 — ADRs */}
          <div>
            <Skeleton className="mb-3 h-4 w-40" />
            <div className="space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="rounded-xl border border-border bg-bg-surface p-5">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                  <Skeleton className="mt-3 h-3 w-full" />
                  <Skeleton className="mt-1 h-3 w-3/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
