# Score Tracker Boilerplate - Developer Guide

A React Native + Expo boilerplate for building score tracking apps for card games, board games, and more.

## What's Included

- **Player Management** - Add/remove players, color picker, avatars
- **Game State** - MMKV storage for fast persistence
- **In-App Purchases** - iOS & Android IAP with paywall
- **Modular Architecture** - Plug in different game scoring rules
- **Gluestack UI + NativeWind** - Modern styling with Tailwind

## Quick Start

```bash
npm install
npx expo start
```

## Project Structure

```
src/
├── config/
│   └── app.config.ts    # ← START HERE - customize for your app
├── core/                # Game-agnostic utilities (don't modify)
│   ├── types.ts         # Player, Round, Game types
│   ├── storage.ts       # MMKV storage functions
│   ├── gameEngine.ts    # Abstract game engine
│   └── playerManager.ts # Player utilities
├── games/
│   └── hearts/          # Example game implementation
│       ├── config.ts    # Game-specific constants
│       ├── engine.ts    # Scoring logic
│       └── components/  # Game-specific UI
└── components/          # Reusable UI
    ├── PlayerSetup.tsx  # Player creation
    ├── GameCard.tsx     # Game list item
    └── PaywallModal.tsx # IAP paywall
```

## Key Files to Customize

### 1. `src/config/app.config.ts`

```typescript
export const APP_CONFIG = {
  name: "Your App Name",
  displayName: "Your App",
  // ...
};

export const IAP_CONFIG = {
  products: {
    ios: "your_product_ios",
    android: "your_product_android",
  },
  promoCodes: ["YOUR_CODE"],
};

export const FEATURES = {
  maxFreeGames: 1,
  minPlayers: 2,
  maxPlayers: 6,
  defaultTargetScore: 100,
};
```

### 2. `app.json`

- Update `name`, `slug`, `scheme`
- Update `ios.bundleIdentifier`
- Update `android.package`

### 3. `eas.json`

- Update Apple credentials
- Update Google Play credentials

## Creating Your Own Game

1. **Copy the Hearts example:**
   ```bash
   cp -r src/games/hearts src/games/your-game
   ```

2. **Edit `config.ts`** - Your game's constants:
   ```typescript
   export const YOUR_GAME_CONFIG: GameConfig = {
     id: "your-game",
     name: "Your Game",
     minPlayers: 2,
     maxPlayers: 4,
     defaultTargetScore: 500,
     winCondition: "highest", // or "lowest"
   };
   ```

3. **Edit `engine.ts`** - Your scoring logic:
   ```typescript
   calculateWinner(rounds, players, targetScore) {
     // Your win condition logic
   }
   ```

4. **Update app screens** to import your game:
   ```typescript
   import { yourGameEngine } from "@games/your-game";
   ```

See [docs/NEW_GAME_GUIDE.md](docs/NEW_GAME_GUIDE.md) for detailed instructions.

## Path Aliases

```typescript
import { getGames } from "@core/storage";
import { FEATURES } from "@config/app.config";
import { heartsEngine } from "@games/hearts";
import { PlayerSetup } from "@components/PlayerSetup";
import { Button } from "@ui/button";
```

## Architecture

### Core Layer (`@core/`)

Game-agnostic utilities that work with any game:

- `storage.ts` - MMKV get/set functions
- `gameEngine.ts` - Abstract class for scoring engines
- `playerManager.ts` - Player CRUD utilities
- `types.ts` - Base types (Player, Round, Game)

### Games Layer (`@games/`)

Each game implements `GameEngine` interface:

- `config.ts` - Game-specific constants
- `types.ts` - Extended types for rounds/games
- `engine.ts` - Scoring logic
- `components/` - Game-specific UI (optional)

### Components Layer (`@components/`)

Reusable UI components:

- `PlayerSetup` - Add/edit players
- `GameCard` - Game list item with avatars
- `PaywallModal` - IAP upgrade prompt

## Building & Deploying

See [docs/EAS_SETUP.md](docs/EAS_SETUP.md) for:

- Setting up EAS project
- Building for iOS/Android
- Submitting to App Store / Play Store

## In-App Purchases

1. Create products in App Store Connect / Play Console
2. Update SKUs in `src/config/app.config.ts`
3. Test with sandbox accounts

The paywall triggers when:

- User tries to create more than `maxFreeGames`
- Any player score exceeds `maxFreeScorePerPlayer`
