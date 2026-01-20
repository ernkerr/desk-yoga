/**
 * Hearts-specific type definitions.
 */

import type { BaseRound, BaseGame } from "@core/types";
import type { HeartsBonusType } from "./config";

/**
 * Hearts round with bonus tracking.
 */
export interface HeartsRound extends BaseRound {
  bonusType?: HeartsBonusType;
  bonusPlayerId?: string;
}

/**
 * Hearts game type.
 */
export interface HeartsGame extends BaseGame<HeartsRound> {}
