/**
 * Hearts game engine implementation.
 * Implements the scoring rules specific to Hearts.
 */

import { BaseGameEngine } from "@core/gameEngine";
import type { Player, BonusType } from "@core/types";
import { HEARTS_CONFIG, HEARTS_CONSTANTS, HEARTS_BONUS_TYPES } from "./config";
import type { HeartsGame, HeartsRound } from "./types";

export class HeartsEngine extends BaseGameEngine<HeartsGame, HeartsRound> {
  config = HEARTS_CONFIG;

  /**
   * Calculate the winner of a Hearts game.
   * Winner = player with LOWEST score when ANY player reaches targetScore.
   */
  calculateWinner(
    rounds: HeartsRound[],
    players: Player[],
    targetScore: number
  ): string | null {
    if (!targetScore || targetScore <= 0) return null;

    const totals = this.getAllPlayerTotals(rounds, players);

    // Check if any player reached target
    const hasReachedTarget = Object.values(totals).some(
      (score) => score >= targetScore
    );
    if (!hasReachedTarget) return null;

    // Find player with LOWEST score (Hearts rule)
    let lowestScore = Infinity;
    let winnerId: string | null = null;
    Object.entries(totals).forEach(([playerId, score]) => {
      if (score < lowestScore) {
        lowestScore = score;
        winnerId = playerId;
      }
    });

    return winnerId;
  }

  /**
   * Get available bonus types for Hearts.
   */
  getBonusTypes(): BonusType[] {
    return [...HEARTS_BONUS_TYPES];
  }

  /**
   * Apply a bonus to scores.
   */
  applyBonus(
    scores: Record<string, number>,
    bonusType: string,
    bonusPlayerId: string
  ): Record<string, number> {
    if (bonusType === "shootMoon") {
      return this.applyShootMoonBonus(scores, bonusPlayerId);
    }
    // queenOfSpades doesn't change scores - it's just tracking
    return scores;
  }

  /**
   * Apply "Shoot the Moon" bonus scoring.
   * The shooter gets 0 points, all other players get 26 points.
   */
  applyShootMoonBonus(
    baseScores: Record<string, number>,
    shooterId: string
  ): Record<string, number> {
    const result: Record<string, number> = {};

    Object.keys(baseScores).forEach((playerId) => {
      if (playerId === shooterId) {
        result[playerId] = 0;
      } else {
        result[playerId] = HEARTS_CONSTANTS.SHOOT_MOON_VALUE;
      }
    });

    return result;
  }

  /**
   * Validate Hearts round (total points must equal MAX_POINTS_PER_ROUND or less).
   */
  validateRound(scores: Record<string, number>): boolean {
    const total = Object.values(scores).reduce((sum, s) => sum + s, 0);
    return total <= HEARTS_CONSTANTS.MAX_POINTS_PER_ROUND;
  }
}

// Export singleton instance
export const heartsEngine = new HeartsEngine();
