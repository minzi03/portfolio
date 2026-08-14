/**
 * Shared formatting utilities.
 */

/**
 * Format a date range from "YYYY-MM" strings.
 * e.g. formatDateRange("2025-01", "2025-06") → "Jan 2025 – Jun 2025"
 * e.g. formatDateRange("2025-01") → "Jan 2025 – Present"
 */
export function formatDateRange(start: string, end?: string): string {
  const s = new Date(start + "-01");
  const startStr = s.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  if (!end) return `${startStr} – Present`;
  const e = new Date(end + "-01");
  const endStr = e.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return `${startStr} – ${endStr}`;
}
