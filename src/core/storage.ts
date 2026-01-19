/**
 * Generic MMKV storage utilities for the score tracker boilerplate.
 * Provides type-safe storage operations that can be used with any game type.
 */

import { MMKV } from "react-native-mmkv";
import type { BaseGame, BaseRound } from "./types";

// Create a single MMKV storage instance
export const storage = new MMKV();

// Storage keys - can be overridden via config
const STORAGE_KEYS = {
  games: "games",
  hasPaid: "hasPaid",
  userName: "userName",
  targetScore: "targetScore",
} as const;

// --- Generic Game Storage ---

/**
 * Retrieves the list of games from MMKV storage.
 * Returns an empty array if not set.
 */
export function getGames<T extends BaseGame>(): T[] {
  const data = storage.getString(STORAGE_KEYS.games);
  return data ? JSON.parse(data) : [];
}

/**
 * Saves the list of games to MMKV storage.
 */
export function saveGames<T extends BaseGame>(games: T[]): void {
  storage.set(STORAGE_KEYS.games, JSON.stringify(games));
}

/**
 * Retrieves a specific game by ID from MMKV storage.
 * Returns null if not found.
 */
export function getGameById<T extends BaseGame>(id: string): T | null {
  const games = getGames<T>();
  return games.find((game) => game.id === id) || null;
}

/**
 * Updates a specific game in MMKV storage.
 */
export function updateGame<T extends BaseGame>(
  id: string,
  updates: Partial<T>
): void {
  const games = getGames<T>();
  const index = games.findIndex((game) => game.id === id);
  if (index !== -1) {
    games[index] = { ...games[index], ...updates };
    saveGames(games);
  }
}

/**
 * Deletes a specific game from MMKV storage.
 */
export function deleteGame(id: string): void {
  const games = getGames();
  const filtered = games.filter((game) => game.id !== id);
  saveGames(filtered);
}

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

/**
 * Retrieves the default Target Score value from MMKV storage.
 * Defaults to 100 if not set.
 */
export function getTargetScore(): number {
  const value = storage.getString(STORAGE_KEYS.targetScore);
  return value !== undefined && value !== null ? parseInt(value, 10) : 100;
}

/**
 * Sets the default Target Score value in MMKV storage.
 */
export function setTargetScore(val: number): void {
  storage.set(STORAGE_KEYS.targetScore, val.toString());
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
