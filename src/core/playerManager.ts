/**
 * Reusable player management utilities.
 * Provides functions for creating, updating, and validating players.
 */

import type { Player } from "./types";
import { generateId, getUserName } from "./storage";
import { COLOR_PICKER_PALETTE } from "../components/ui/ColorPicker";

/**
 * Create a new player object.
 */
export function createPlayer(
  name: string,
  options: {
    isUser?: boolean;
    color?: string;
    colorIndex?: number;
  } = {}
): Player {
  const { isUser = false, color, colorIndex = 0 } = options;

  return {
    id: generateId(),
    name: name || (isUser ? getUserName() : ""),
    color: color || COLOR_PICKER_PALETTE[colorIndex % COLOR_PICKER_PALETTE.length],
    isUser,
  };
}

/**
 * Create the initial user player.
 */
export function createUserPlayer(colorIndex = 0): Player {
  return createPlayer(getUserName(), { isUser: true, colorIndex });
}

/**
 * Add a player to the list.
 * Returns the updated players array or the original if max reached.
 */
export function addPlayer(players: Player[], maxPlayers: number): Player[] {
  if (players.length >= maxPlayers) return players;

  const newPlayer = createPlayer("", {
    colorIndex: players.length,
  });

  return [...players, newPlayer];
}

/**
 * Remove a player from the list.
 * Cannot remove the first player (user).
 */
export function removePlayer(players: Player[], index: number): Player[] {
  if (index === 0) return players; // Cannot remove user
  return players.filter((_, i) => i !== index);
}

/**
 * Update a player's name.
 */
export function updatePlayerName(
  players: Player[],
  index: number,
  name: string
): Player[] {
  const updated = [...players];
  updated[index] = { ...updated[index], name };
  return updated;
}

/**
 * Update a player's color.
 */
export function updatePlayerColor(
  players: Player[],
  index: number,
  color: string
): Player[] {
  const updated = [...players];
  updated[index] = { ...updated[index], color };
  return updated;
}

/**
 * Validate players for game start.
 */
export function validatePlayers(
  players: Player[],
  minPlayers: number
): { valid: boolean; error?: string } {
  if (players.length < minPlayers) {
    return {
      valid: false,
      error: `You need at least ${minPlayers} players to start a game`,
    };
  }

  const allNamesValid = players.every((p) => p.name.trim().length > 0);
  if (!allNamesValid) {
    return { valid: false, error: "All players must have names" };
  }

  return { valid: true };
}

/**
 * Get player initials for avatar display.
 */
export function getPlayerInitials(name: string): string {
  if (!name) return "";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Get first name for compact display.
 */
export function getPlayerFirstName(name: string): string {
  if (!name) return "";
  return name.split(" ")[0];
}

/**
 * Find a player by ID.
 */
export function findPlayerById(
  players: Player[],
  playerId: string
): Player | undefined {
  return players.find((p) => p.id === playerId);
}

/**
 * Get the user player from a players array.
 */
export function getUserPlayer(players: Player[]): Player | undefined {
  return players.find((p) => p.isUser);
}
