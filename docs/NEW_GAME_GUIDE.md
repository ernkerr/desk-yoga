# Creating a New Game

This guide walks through creating a new score tracking game using this boilerplate.

## Overview

The boilerplate is designed so that game-specific logic is isolated in `src/games/`. To add a new game, you:

1. Create a new game module in `src/games/your-game/`
2. Implement the `GameEngine` interface with your scoring rules
3. Create any game-specific UI components
4. Update the app screens to use your new game engine

## Step 1: Create Game Directory Structure

```
src/games/your-game/
├── config.ts      # Game configuration and constants
├── types.ts       # TypeScript types for rounds/games
├── engine.ts      # Scoring logic implementation
├── index.ts       # Public exports
└── components/    # Game-specific UI components (optional)
    └── YourGameScoreModal.tsx
```

## Step 2: Define Configuration

Create `src/games/your-game/config.ts`:

```typescript
import type { GameConfig, BonusType } from "@core/types";

export const YOUR_GAME_CONFIG: GameConfig = {
  id: "your-game",
  name: "Your Game Name",
  minPlayers: 2,
  maxPlayers: 4,
  defaultTargetScore: 500,
  winCondition: "highest", // "lowest", "highest", or "exact"
  description: "Description of your game rules",
};

// Game-specific constants
export const YOUR_GAME_CONSTANTS = {
  POINTS_PER_WIN: 100,
  BONUS_MULTIPLIER: 2,
} as const;

// Bonus types (if your game has them)
export const YOUR_GAME_BONUS_TYPES: BonusType[] = [
  { id: "doublePoints", label: "Double Points", icon: "Star", value: 2 },
];

export type YourGameBonusType = "doublePoints" | null;
```

## Step 3: Define Types

Create `src/games/your-game/types.ts`:

```typescript
import type { BaseRound, BaseGame } from "@core/types";
import type { YourGameBonusType } from "./config";

// Extend BaseRound with game-specific fields
export interface YourGameRound extends BaseRound {
  bonusType?: YourGameBonusType;
  bonusPlayerId?: string;
  // Add any other round-specific data
}

// Extend BaseGame with game-specific fields
export interface YourGame extends BaseGame<YourGameRound> {
  // Add any game-level custom fields if needed
}
```

## Step 4: Implement the Game Engine

Create `src/games/your-game/engine.ts`:

```typescript
import { BaseGameEngine } from "@core/gameEngine";
import type { Player, BonusType } from "@core/types";
import { YOUR_GAME_CONFIG, YOUR_GAME_CONSTANTS, YOUR_GAME_BONUS_TYPES } from "./config";
import type { YourGame, YourGameRound } from "./types";

export class YourGameEngine extends BaseGameEngine<YourGame, YourGameRound> {
  config = YOUR_GAME_CONFIG;

  /**
   * Calculate the winner based on your game's rules.
   * This example: highest score wins when any player reaches target.
   */
  calculateWinner(
    rounds: YourGameRound[],
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

    // Find player with HIGHEST score (change logic for your game)
    let highestScore = -Infinity;
    let winnerId: string | null = null;

    Object.entries(totals).forEach(([playerId, score]) => {
      if (score > highestScore) {
        highestScore = score;
        winnerId = playerId;
      }
    });

    return winnerId;
  }

  /**
   * Return available bonus types for this game.
   */
  getBonusTypes(): BonusType[] {
    return [...YOUR_GAME_BONUS_TYPES];
  }

  /**
   * Apply bonus to scores if your game has special scoring.
   */
  applyBonus(
    scores: Record<string, number>,
    bonusType: string,
    bonusPlayerId: string
  ): Record<string, number> {
    if (bonusType === "doublePoints") {
      return {
        ...scores,
        [bonusPlayerId]: scores[bonusPlayerId] * YOUR_GAME_CONSTANTS.BONUS_MULTIPLIER,
      };
    }
    return scores;
  }

  /**
   * Validate that round scores are valid for your game.
   */
  validateRound(scores: Record<string, number>): boolean {
    // Add your validation logic
    return Object.values(scores).every((score) => score >= 0);
  }
}

// Export singleton instance
export const yourGameEngine = new YourGameEngine();
```

## Step 5: Create Index Exports

Create `src/games/your-game/index.ts`:

```typescript
// Configuration
export { YOUR_GAME_CONFIG, YOUR_GAME_CONSTANTS, YOUR_GAME_BONUS_TYPES } from "./config";
export type { YourGameBonusType } from "./config";

// Types
export type { YourGame, YourGameRound } from "./types";

// Engine
export { YourGameEngine, yourGameEngine } from "./engine";
```

## Step 6: Create Score Modal (If Needed)

If your game has special scoring UI (like bonus buttons), create a custom modal.

Create `src/games/your-game/components/YourGameScoreModal.tsx`:

```typescript
import React, { useState, useEffect } from "react";
// ... import UI components from @ui/
import type { Player } from "@core/types";
import type { YourGameBonusType } from "../config";

interface YourGameScoreModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (
    scores: Record<string, number>,
    bonusType?: YourGameBonusType,
    bonusPlayerId?: string
  ) => void;
  players: Player[];
  // ... other props for editing
}

export function YourGameScoreModal({
  visible,
  onClose,
  onSave,
  players,
}: YourGameScoreModalProps) {
  // Implement your score entry UI
  // See HeartsScoreModal.tsx for reference
}
```

## Step 7: Update App Screens

### Update `app/game/[id].tsx`

```typescript
// Change imports
import { yourGameEngine, type YourGame, type YourGameRound } from "@games/your-game";
import { YourGameScoreModal } from "@games/your-game/components/YourGameScoreModal";

// Update types
const [game, setGame] = useState<YourGame | null>(null);

// Use your engine
const winnerId = yourGameEngine.calculateWinner(
  updatedRounds,
  game.players,
  game.targetScore
);
```

### Update `app/game/index.tsx`

```typescript
import type { YourGame } from "@games/your-game";

const [games, setGames] = useState<YourGame[]>([]);
const allGames = getGames<YourGame>();
```

### Update `app/game/new.tsx`

```typescript
import type { YourGame } from "@games/your-game";

const newGame: YourGame = {
  // ...
};
```

## Step 8: Update App Configuration

Update `src/config/app.config.ts` for your new game:

```typescript
export const APP_CONFIG = {
  name: "Your Game Score Tracker",
  slug: "your-game-score-tracker",
  displayName: "Your Game",
  // ...
};

export const FEATURES = {
  minPlayers: 2,  // Match your game config
  maxPlayers: 4,
  defaultTargetScore: 500,
  // ...
};
```

## Testing Checklist

After implementing your game:

- [ ] Players can be added/removed correctly
- [ ] Min/max player limits are enforced
- [ ] Scores are calculated properly per round
- [ ] Total scores accumulate correctly
- [ ] Winner is determined by your game's rules
- [ ] Bonuses apply correctly (if applicable)
- [ ] Paywall triggers at correct thresholds
- [ ] Game state persists after app restart

## Example: Implementing a "Highest Score Wins" Game

For games like Gin Rummy where highest score wins:

1. Set `winCondition: "highest"` in config
2. In `calculateWinner()`, find the player with the highest score
3. Display a crown icon on the player with the highest current score
4. Update winner message to congratulate high scorer

## Tips

- Keep game-specific logic in the `src/games/` folder
- Reuse core components (`PlayerSetup`, `GameCard`) when possible
- The `BaseGameEngine` provides common functionality - only override what's different
- Use TypeScript generics to maintain type safety across game types
