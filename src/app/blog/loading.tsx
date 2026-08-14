export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-bg px-6 py-32">
      <div className="mx-auto max-w-4xl">
        {/* Header skeleton */}
        <div className="mb-12 space-y-3">
          <div className="h-8 w-48 animate-pulse rounded bg-border/50" />
          <div className="h-4 w-96 animate-pulse rounded bg-border/30" />
        </div>

        {/* Post cards skeleton */}
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-4 w-20 animate-pulse rounded bg-border/40" />
                <div className="h-4 w-16 animate-pulse rounded bg-border/30" />
              </div>
              <div className="h-5 w-64 animate-pulse rounded bg-border/50 mb-2" />
              <div className="h-4 w-full animate-pulse rounded bg-border/30 mb-2" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-border/30 mb-4" />
              <div className="flex gap-2">
                <div className="h-5 w-14 animate-pulse rounded-full bg-border/30" />
                <div className="h-5 w-18 animate-pulse rounded-full bg-border/30" />
                <div className="h-5 w-12 animate-pulse rounded-full bg-border/30" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
