export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-bg px-6 py-32">
      <article className="mx-auto max-w-3xl">
        {/* Back link skeleton */}
        <div className="mb-8 h-4 w-32 animate-pulse rounded bg-border/30" />

        {/* Header skeleton */}
        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-3">
            <div className="h-4 w-24 animate-pulse rounded bg-border/40" />
            <div className="h-4 w-32 animate-pulse rounded bg-border/30" />
          </div>
          <div className="h-10 w-full animate-pulse rounded bg-border/50" />
          <div className="h-10 w-3/4 animate-pulse rounded bg-border/50" />
          <div className="flex gap-2">
            <div className="h-5 w-16 animate-pulse rounded-full bg-border/30" />
            <div className="h-5 w-20 animate-pulse rounded-full bg-border/30" />
            <div className="h-5 w-14 animate-pulse rounded-full bg-border/30" />
          </div>
        </header>

        {/* Content skeleton */}
        <div className="space-y-4">
          <div className="h-4 w-full animate-pulse rounded bg-border/30" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-border/30" />
          <div className="h-4 w-full animate-pulse rounded bg-border/30" />
          <div className="h-4 w-2/3 animate-pulse rounded bg-border/30" />
          <div className="h-8 w-48 animate-pulse rounded bg-border/40 mt-8" />
          <div className="h-4 w-full animate-pulse rounded bg-border/30" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-border/30" />
          <div className="h-4 w-full animate-pulse rounded bg-border/30" />
        </div>
      </article>
    </div>
  );
}
