/**
 * Common utility functions for the score tracker boilerplate.
 */

/**
 * Format a date as relative time (e.g., "Just now", "2h ago", "3d ago").
 */
export function formatTimeAgo(dateString: string): string {
  const gameDate = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - gameDate.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 1) return "Just now";
  if (diffHours < 24) return `${Math.floor(diffHours)}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return "1d ago";
  return `${diffDays}d ago`;
}

/**
 * Format a number with commas for display.
 */
export function formatNumber(num: number): string {
  return num.toLocaleString();
}

/**
 * Clamp a number between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Check if a value is a non-empty string.
 */
export function isNonEmptyString(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

/**
 * Parse a numeric string safely, returning a default value if invalid.
 */
export function parseIntSafe(value: string, defaultValue = 0): number {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? defaultValue : parsed;
}

/**
 * Format a date string for display.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
