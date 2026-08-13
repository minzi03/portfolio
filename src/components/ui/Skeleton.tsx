/**
 * Reusable skeleton loading primitive.
 * Renders an animated placeholder with configurable shape.
 */
export default function Skeleton({
  className = "",
  rounded = "rounded",
}: {
  className?: string;
  rounded?: string;
}) {
  return (
    <div
      className={`animate-pulse bg-bg-surface ${rounded} ${className}`}
      aria-hidden="true"
    />
  );
}
