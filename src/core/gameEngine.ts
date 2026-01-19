/**
 * Abstract game engine interface and base implementation.
 * Each game type (Hearts, Spades, etc.) implements this interface
 * with their specific scoring rules and win conditions.
 */

import type { BaseGame, BaseRound, Player, GameConfig, BonusType } from "./types";

/**
 * Abstract interface for game scoring logic.
 * Each game type implements this interface with their specific rules.
 */
export interface GameEngine<
  TGame extends BaseGame = BaseGame,
  TRound extends BaseRound = BaseRound
> {
  /** Game configuration */
  config: GameConfig;

  /**
   * Calculate the winner of a game.
   * @returns Player ID of winner, or null if game is not over
   */
  calculateWinner(
    rounds: TRound[],
    players: Player[],
    targetScore: number
  ): string | null;

  /**
   * Get total score for a specific player.
   */
  getTotalScore(rounds: TRound[], playerId: string): number;

  /**
   * Get all player totals as a map.
   */
  getAllPlayerTotals(
    rounds: TRound[],
    players: Player[]
  ): Record<string, number>;

  /**
   * Validate if a round can be added (paywall logic).
   */
  canAddRound(
    rounds: TRound[],
    players: Player[],
    hasPaid: boolean,
    maxFreeScore?: number
  ): boolean;

  /**
   * Create a new round with scores.
   */
  createRound(scores: Record<string, number>, extras?: Partial<TRound>): TRound;

  /**
   * Validate round scores (game-specific rules).
   */
  validateRound?(scores: Record<string, number>, players: Player[]): boolean;

  /**
   * Get bonus types available for this game (optional).
   */
  getBonusTypes?(): BonusType[];

  /**
   * Apply a bonus to scores (optional, game-specific).
   */
  applyBonus?(
    scores: Record<string, number>,
    bonusType: string,
    bonusPlayerId: string
  ): Record<string, number>;
}

/**
 * Base implementation with common logic.
 * Extend this class for specific game implementations.
 */
export abstract class BaseGameEngine<
  TGame extends BaseGame = BaseGame,
  TRound extends BaseRound = BaseRound
> implements GameEngine<TGame, TRound>
{
  abstract config: GameConfig;

  abstract calculateWinner(
    rounds: TRound[],
    players: Player[],
    targetScore: number
  ): string | null;

  /**
   * Calculate total score for a specific player across all rounds.
   */
  getTotalScore(rounds: TRound[], playerId: string): number {
    return rounds.reduce((sum, round) => {
      return sum + (round.scores[playerId] || 0);
    }, 0);
  }

  /**
   * Get all player totals as a map of playerId to total score.
   */
  getAllPlayerTotals(
    rounds: TRound[],
    players: Player[]
  ): Record<string, number> {
    const totals: Record<string, number> = {};

    // Initialize all players with 0
    players.forEach((p) => (totals[p.id] = 0));

    // Sum up scores from all rounds
    rounds.forEach((round) => {
      Object.entries(round.scores).forEach(([playerId, score]) => {
        totals[playerId] = (totals[playerId] || 0) + score;
      });
    });

    return totals;
  }

  /**
   * Check if a new round can be added, enforcing free version's score limit.
   */
  canAddRound(
    rounds: TRound[],
    players: Player[],
    hasPaid: boolean,
    maxFreeScore = 100
  ): boolean {
    if (hasPaid) return true;

    const totals = this.getAllPlayerTotals(rounds, players);

    // Check if any player has exceeded the free limit
    return Object.values(totals).every((score) => score <= maxFreeScore);
  }

  /**
   * Create a new round with the given scores.
   */
  createRound(scores: Record<string, number>, extras?: Partial<TRound>): TRound {
    return {
      date: new Date().toISOString(),
      scores,
      ...extras,
    } as TRound;
  }
}
