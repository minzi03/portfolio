import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SkeletonProps {
  className?: string;
  rounded?: string;
}

export default function Skeleton({ className, rounded }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse bg-bg-surface",
        rounded ?? "rounded-md",
        className
      )}
    />
  );
}

export function CardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-bg-surface p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-20" />
          <Skeleton className="h-5 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}

export function ProjectCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-bg-surface p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="h-40 rounded-lg bg-bg" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex items-center gap-2">
          <Skeleton className="h-10 w-32" />
          <Skeleton className="h-10 w-24" />
        </div>
      </div>
    </div>
  );
}

export function BlogPostSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-bg-surface p-6">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-16" />
        </div>
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
}

export function CredentialCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-bg-surface p-4">
      <div className="flex gap-4">
        <Skeleton className="h-16 w-16 rounded-lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-16" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ExperienceCardSkeleton() {
  return (
    <div className="rounded-xl border border-border bg-bg p-5">
      <div className="space-y-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-4 w-1/3" />
          </div>
          <Skeleton className="h-16 w-24 rounded-lg" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
        <div className="flex gap-2">
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="py-16 sm:py-20">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3 space-y-6">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-12 w-64" />
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-20 w-full max-w-lg" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border bg-bg-surface px-3 py-2 text-center">
                <Skeleton className="mx-auto h-6 w-16" />
                <Skeleton className="mx-auto mt-1 h-3 w-20" />
              </div>
            ))}
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-11 w-32" />
            <Skeleton className="h-11 w-28" />
            <Skeleton className="h-11 w-24" />
          </div>
        </div>
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-md border border-border bg-bg-surface p-5">
            <Skeleton className="mb-3 h-4 w-24" />
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="mt-1 h-4 w-1/2" />
            <Skeleton className="mt-1 h-3 w-2/3" />
            <div className="mt-3 flex gap-3">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-20" />
            </div>
          </div>
          <div className="rounded-md border border-border bg-bg-surface p-5">
            <Skeleton className="mb-3 h-4 w-32" />
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="rounded-md border border-border bg-bg px-3 py-2">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="mt-1 h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
