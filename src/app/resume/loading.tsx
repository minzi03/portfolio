import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Loading skeleton for /resume — mimics the resume layout.
 */
export default function ResumeLoading() {
  return (
    <div className="bg-bg py-16 sm:py-24">
      <Container>
        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <Skeleton className="mb-3 h-10 w-48" />
          <Skeleton className="h-5 w-80 max-w-full" />
        </div>

        {/* Download button */}
        <div className="mb-12">
          <Skeleton className="h-12 w-48" rounded="rounded-xl" />
        </div>

        {/* Content sections */}
        <div className="space-y-12">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i}>
              <Skeleton className="mb-4 h-6 w-40" />
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="rounded-xl border border-border bg-bg-surface p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <Skeleton className="mb-2 h-4 w-48" />
                        <Skeleton className="h-3 w-32" />
                      </div>
                      <Skeleton className="h-3 w-24" />
                    </div>
                    <Skeleton className="mt-3 h-3 w-full" />
                    <Skeleton className="mt-1 h-3 w-3/4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
