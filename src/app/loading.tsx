import Container from "@/components/ui/Container";
import Skeleton from "@/components/ui/Skeleton";

/**
 * Loading skeleton for / — mimics the hero + sections layout.
 */
export default function HomeLoading() {
  return (
    <div className="bg-bg">
      {/* Hero section skeleton */}
      <div className="relative flex min-h-[85vh] items-center overflow-hidden py-24">
        {/* Background grid pattern placeholder */}
        <div className="pointer-events-none absolute inset-0 opacity-5" />

        <Container className="relative z-10 w-full">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <Skeleton className="mb-4 h-3 w-48" />

            {/* Name */}
            <Skeleton className="mb-3 h-14 w-96 max-w-full" />
            <Skeleton className="mb-3 h-14 w-72 max-w-full" />

            {/* Tagline */}
            <Skeleton className="mb-6 h-5 w-80 max-w-full" />

            {/* Focus area chips */}
            <div className="mb-8 flex flex-wrap gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-36" rounded="rounded-xl" />
              ))}
            </div>

            {/* Stats row */}
            <div className="flex gap-8">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center">
                  <Skeleton className="mx-auto mb-1 h-8 w-16" />
                  <Skeleton className="mx-auto h-3 w-12" />
                </div>
              ))}
            </div>
          </div>
        </Container>
      </div>

      {/* Sections skeleton */}
      <div className="space-y-24 py-24">
        {Array.from({ length: 5 }).map((_, i) => (
          <Container key={i}>
            <Skeleton className="mb-3 h-4 w-32" />
            <Skeleton className="mb-2 h-8 w-64" />
            <Skeleton className="mb-8 h-4 w-96 max-w-full" />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <Skeleton key={j} className="h-64" rounded="rounded-2xl" />
              ))}
            </div>
          </Container>
        ))}
      </div>
    </div>
  );
}
