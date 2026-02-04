/**
 * Centralized app configuration.
 * Edit this file to customize the app for different games.
 */

export const APP_CONFIG = {
  // App identity
  name: "Desk Yoga",
  slug: "desk-yoga",
  scheme: "desk-yoga",

  // Display
  displayName: "Desk Yoga",
  tagline: "Feel better while you work, not before or after it.",

  // Bundle identifiers (must be updated in app.json manually for EAS builds)
  ios: {
    bundleIdentifier: "org.cybergoose.deskyoga",
  },
  android: {
    package: "org.cybergoose.deskyoga",
  },
} as const;

export const IAP_CONFIG = {
  // Product SKUs - must match App Store Connect / Google Play Console
  products: {
    ios: "deskyoga_premium_ios",
    android: "deskyoga_premium_android",
  },
  // Unlock codes (for promo access)
  promoCodes: ["GRATITUDE"],
} as const;

export const FEATURES = {
  // Free tier limits
  maxFreeGames: 1,
  maxFreeScorePerPlayer: 100,

  // Player configuration
  minPlayers: 3,
  maxPlayers: 5,

  // Default settings
  defaultTargetScore: 100,
  defaultUserName: "You",

  // Feature flags
  enablePaywall: true,
  enableCodeRedemption: true,
} as const;

export const STORAGE_KEYS = {
  games: "games",
  hasPaid: "hasPaid",
  userName: "userName",
  targetScore: "targetScore",
} as const;

// Helper functions

/**
 * Get the IAP product ID for the current platform.
 */
export function getIAPProductId(platform: "ios" | "android"): string {
  return IAP_CONFIG.products[platform];
}

/**
 * Get the app display name.
 */
export function getAppDisplayName(): string {
  return APP_CONFIG.displayName;
}

/**
 * Check if a promo code is valid.
 */
export function isValidPromoCode(code: string): boolean {
  return (IAP_CONFIG.promoCodes as readonly string[]).includes(
    code.toUpperCase(),
  );
}

// Type exports
export type AppConfig = typeof APP_CONFIG;
export type IAPConfig = typeof IAP_CONFIG;
export type Features = typeof FEATURES;
export type StorageKeys = typeof STORAGE_KEYS;
