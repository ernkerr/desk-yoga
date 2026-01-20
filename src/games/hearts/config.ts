/**
 * Hearts game configuration and constants.
 */

import type { GameConfig, BonusType } from "@core/types";

export const HEARTS_CONFIG: GameConfig = {
  id: "hearts",
  name: "Hearts",
  minPlayers: 3,
  maxPlayers: 5,
  defaultTargetScore: 100,
  winCondition: "lowest",
  description: "Classic Hearts card game. Avoid points to win!",
};

// Hearts-specific scoring constants
export const HEARTS_CONSTANTS = {
  QUEEN_OF_SPADES_PENALTY: 13,
  SHOOT_MOON_VALUE: 26,
  POINTS_PER_HEART: 1,
  MAX_POINTS_PER_ROUND: 26, // 13 hearts + 13 for queen
} as const;

// Hearts bonus types
export const HEARTS_BONUS_TYPES: BonusType[] = [
  {
    id: "queenOfSpades",
    label: "Queen of Spades",
    icon: "Spade",
    value: 13,
  },
  {
    id: "shootMoon",
    label: "Shoot the Moon",
    icon: "Moon",
    value: 26,
  },
];

export type HeartsBonusType = "queenOfSpades" | "shootMoon" | null;
