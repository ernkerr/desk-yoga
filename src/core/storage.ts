/**
 * MMKV storage utilities for the Desk Yoga app.
 */

import { MMKV } from "react-native-mmkv";

// Create a single MMKV storage instance
export const storage = new MMKV();

// Storage keys
const STORAGE_KEYS = {
  hasPaid: "hasPaid",
  userName: "userName",
} as const;

// --- Payment ---

/**
 * Retrieves the payment status (hasPaid) from MMKV storage.
 */
export function getHasPaid(): boolean {
  return storage.getBoolean(STORAGE_KEYS.hasPaid) ?? false;
}

/**
 * Sets the payment status (hasPaid) in MMKV storage.
 */
export function setHasPaid(val: boolean): void {
  storage.set(STORAGE_KEYS.hasPaid, val);
}

// --- User Settings ---

/**
 * Retrieves the user's name from MMKV storage.
 * Defaults to 'You' if not set.
 */
export function getUserName(): string {
  return storage.getString(STORAGE_KEYS.userName) || "You";
}

/**
 * Sets the user's name in MMKV storage.
 */
export function setUserName(name: string): void {
  storage.set(STORAGE_KEYS.userName, name);
}

// --- Utilities ---

/**
 * Generates a unique ID string.
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}

/**
 * Clears all data from MMKV storage.
 */
export function clearAllData(): void {
  storage.clearAll();
}
