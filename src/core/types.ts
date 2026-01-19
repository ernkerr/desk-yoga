/**
 * Core type definitions for the score tracker boilerplate.
 * These types are generic and can be extended by specific game implementations.
 */

/**
 * Base player type - generic for all games
 */
export type Player = {
  id: string;
  name: string;
  color: string;
  isUser: boolean;
};

/**
 * Base round type - extensible for game-specific data
 */
export type BaseRound = {
  date: string;
  scores: Record<string, number>;
};

/**
 * Base game type - extensible for game-specific data
 */
export type BaseGame<TRound extends BaseRound = BaseRound> = {
  id: string;
  date: string;
  players: Player[];
  rounds: TRound[];
  winner: string | null;
  targetScore: number;
  status: "in_progress" | "completed";
};

/**
 * Generic game configuration
 */
export type GameConfig = {
  id: string;
  name: string;
  minPlayers: number;
  maxPlayers: number;
  defaultTargetScore: number;
  winCondition: "lowest" | "highest" | "exact";
  description?: string;
};

/**
 * Bonus type definition for games with special scoring
 */
export type BonusType = {
  id: string;
  label: string;
  icon?: string;
  value?: number;
};

/**
 * Local storage data structure
 */
export type LocalData = {
  games: BaseGame[];
  hasPaid: boolean;
  userName?: string;
};
