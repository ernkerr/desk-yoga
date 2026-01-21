# Score Tracker Boilerplate

A reusable React Native + Expo boilerplate for building score tracking apps for card games, board games, and more. Built with a modular architecture that makes it easy to add new games while reusing core components.

## Features

- **Gluestack UI + NativeWind** - Modern, accessible UI components with Tailwind CSS styling
- **Expo Router** - File-based navigation
- **MMKV Storage** - Fast, synchronous local storage
- **In-App Purchases** - React Native IAP integration (iOS & Android)
- **Modular Game Architecture** - Easy to add new games with pluggable scoring engines
- **Reusable Components** - Player setup, game cards, score modals
- **Design Tokens** - Consistent spacing, typography, and shadow system

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npx expo start

# Run on iOS
npx expo run:ios

# Run on Android
npx expo run:android
```

## Project Structure

```
src/
├── config/              # App configuration
│   └── app.config.ts    # IAP products, features, storage keys
├── core/                # Core abstractions (game-agnostic)
│   ├── types.ts         # Player, Round, Game types
│   ├── storage.ts       # MMKV storage utilities
│   ├── gameEngine.ts    # Abstract game engine interface
│   ├── playerManager.ts # Player management utilities
│   └── utils.ts         # Common utilities
├── games/               # Game implementations
│   └── hearts/          # Hearts card game
│       ├── config.ts    # Hearts-specific constants
│       ├── types.ts     # HeartsRound, HeartsGame types
│       ├── engine.ts    # Hearts scoring logic
│       └── components/  # Hearts-specific UI
├── components/          # Reusable UI components
│   ├── ui/              # Gluestack UI components
│   ├── PlayerSetup.tsx  # Player creation component
│   ├── GameCard.tsx     # Game list card
│   └── PaywallModal.tsx # IAP paywall
app/
├── _layout.tsx          # Root layout with providers
├── index.tsx            # Entry redirect
├── settings.tsx         # User settings
└── game/
    ├── index.tsx        # Games list
    ├── new.tsx          # Create new game
    └── [id].tsx         # Game detail/scoreboard
```

## Configuration

All app-specific configuration is centralized in `src/config/app.config.ts`:

```typescript
// App identity
export const APP_CONFIG = {
  name: "Hearts Score Tracker",
  displayName: "Hearts",
  // ...
};

// In-App Purchase products
export const IAP_CONFIG = {
  products: {
    ios: "hearts_premium_ios",
    android: "hearts_premium_android",
  },
  promoCodes: ["GRATITUDE"],
};

// Feature configuration
export const FEATURES = {
  maxFreeGames: 1,
  maxFreeScorePerPlayer: 100,
  minPlayers: 3,
  maxPlayers: 5,
  defaultTargetScore: 100,
};
```

## Creating a New Game

To add a new game (e.g., Spades, Gin Rummy):

1. Create `src/games/your-game/` with:
   - `config.ts` - Game configuration and constants
   - `types.ts` - Round and game type definitions
   - `engine.ts` - Scoring logic (extends `BaseGameEngine`)
   - `index.ts` - Module exports

2. Implement the `GameEngine` interface:
   - `calculateWinner()` - Determine winner based on your rules
   - `getBonusTypes()` - Define special scoring (optional)
   - `applyBonus()` - Apply special scoring (optional)

3. Update app screens to import your game engine

See [docs/NEW_GAME_GUIDE.md](docs/NEW_GAME_GUIDE.md) for detailed instructions.

## Path Aliases

The project uses path aliases for clean imports:

```typescript
import { getGames } from "@core/storage";
import { FEATURES } from "@config/app.config";
import { heartsEngine } from "@games/hearts";
import { PlayerSetup } from "@components/PlayerSetup";
import { Button } from "@ui/button";
```

## Theming

The UI uses Gluestack's native theming system:

- **Colors**: Defined in `src/components/ui/gluestack-ui-provider/config.ts`
- **Design Tokens**: Spacing, typography, shadows in `tailwind.config.js`

### Design Token Scale

```javascript
// Spacing
spacing: { xs: 4px, sm: 8px, md: 16px, lg: 24px, xl: 32px }

// Typography
fontSize: { heading-1, heading-2, heading-3, body-lg, body, body-sm, caption }

// Shadows (neo-brutalist style)
boxShadow: { solid-sm: 2px, solid-md: 4px, solid-lg: 6px, solid-xl: 8px }
```

## EAS Build & Submit

See [docs/EAS_SETUP.md](docs/EAS_SETUP.md) for deployment instructions.

```bash
# Create EAS project
eas init

# Development build
eas build --profile development --platform all

# Production build
eas build --profile production --platform all

# Submit to stores
eas submit --platform ios
eas submit --platform android
```

## Documentation

- [EAS Setup Guide](docs/EAS_SETUP.md) - Build and deployment
- [New Game Guide](docs/NEW_GAME_GUIDE.md) - Adding new games
- [App Store Submission](APP_STORE_SUBMISSION_GUIDE.md) - Store submission checklist

## Tech Stack

- **React Native** + **Expo** (SDK 52)
- **Expo Router** - File-based navigation
- **Gluestack UI** - Component library
- **NativeWind** - Tailwind CSS for React Native
- **MMKV** - Fast key-value storage
- **react-native-iap** - In-app purchases
- **TypeScript** - Type safety

## License

MIT
