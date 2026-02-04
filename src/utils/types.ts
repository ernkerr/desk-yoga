/**
 * Core type definitions for the Desk Yoga app.
 */

// Re-export yoga types
export * from "../types/pose";
export * from "../types/session";

/**
 * Local storage data structure
 */
export type LocalData = {
  hasPaid: boolean;
  userName?: string;
};
