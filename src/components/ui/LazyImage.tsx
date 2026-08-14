"use client";

import { useState, useEffect, useRef } from "react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface LazyImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  blurDataURL?: string;
  priority?: boolean;
}

export default function LazyImage({
  src,
  alt,
  width,
  height,
  className,
  blurDataURL,
  priority = false,
}: LazyImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (priority) {
      const img = new Image();
      img.src = src;
      img.onload = () => setLoaded(true);
      img.onerror = () => setError(true);
    }
  }, [src, priority]);

  const defaultBlur = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgZmlsbD0iIzBhMGYxYSIvPjwvc3ZnPg==";

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Blur placeholder */}
      {!loaded && !error && (
        <div
          className="absolute inset-0 bg-bg-surface animate-pulse"
          style={{
            backgroundImage: `url(${blurDataURL || defaultBlur})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(20px)",
            transform: "scale(1.1)",
          }}
        />
      )}

      {/* Actual image */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        className={cn(
          "transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
          error && "opacity-0"
        )}
      />

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-bg-surface">
          <svg
            className="h-8 w-8 text-text-muted"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a1.5 1.5 0 001.5-1.5V5.25a1.5 1.5 0 00-1.5-1.5H3.75a1.5 1.5 0 00-1.5 1.5v14.25a1.5 1.5 0 001.5 1.5z"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
