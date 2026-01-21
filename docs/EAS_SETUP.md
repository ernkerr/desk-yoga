# EAS Configuration Guide

This document explains how to configure Expo Application Services (EAS) for building and submitting your score tracker app.

## Prerequisites

1. Install EAS CLI: `npm install -g eas-cli`
2. Login to Expo: `eas login`
3. Have an Expo account at https://expo.dev

## Initial Setup

### 1. Create EAS Project

Run this command in your project directory:

```bash
eas init
```

This will:
- Create the project on Expo servers
- Add `projectId` to your `app.json` under `expo.extra.eas`

### 2. Configure `app.json`

Update these fields for your game:

```json
{
  "expo": {
    "name": "Your Game Name",
    "slug": "your-game-slug",
    "scheme": "your-game-scheme",
    "version": "1.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yourgame",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourcompany.yourgame",
      "versionCode": 1
    },
    "extra": {
      "eas": {
        "projectId": "your-project-id-from-eas-init"
      }
    }
  }
}
```

### 3. Configure `eas.json`

Update submission credentials:

```json
{
  "cli": {
    "version": ">= 3.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal"
    },
    "production": {}
  },
  "submit": {
    "production": {
      "ios": {
        "appleId": "your-apple-id@example.com",
        "ascAppId": "your-app-store-connect-id",
        "appleTeamId": "YOUR_TEAM_ID"
      },
      "android": {
        "serviceAccountKeyPath": "./path/to/google-credentials.json",
        "track": "internal"
      }
    }
  }
}
```

## Building

### Development Build

For testing with development tools:

```bash
# iOS
eas build --profile development --platform ios

# Android
eas build --profile development --platform android
```

### Preview Build

For internal testing:

```bash
eas build --profile preview --platform all
```

### Production Build

For App Store / Play Store submission:

```bash
eas build --profile production --platform all
```

## Submitting

### iOS App Store

1. Ensure your app is configured in App Store Connect
2. Run:

```bash
eas submit --platform ios
```

### Google Play Store

1. Create a service account in Google Cloud Console
2. Download the JSON key file
3. Update `serviceAccountKeyPath` in `eas.json`
4. Run:

```bash
eas submit --platform android
```

## In-App Purchases Setup

### iOS (App Store Connect)

1. Go to App Store Connect > Your App > Features > In-App Purchases
2. Create a new in-app purchase
3. Set the Product ID to match `IAP_CONFIG.products.ios` in `src/config/app.config.ts`
4. Configure pricing and localization

### Android (Google Play Console)

1. Go to Play Console > Your App > Monetize > Products > In-app products
2. Create a new product
3. Set the Product ID to match `IAP_CONFIG.products.android` in `src/config/app.config.ts`
4. Configure pricing

### Testing

- **iOS**: Use Sandbox accounts in App Store Connect > Users and Access > Sandbox
- **Android**: Add test accounts in Play Console > Setup > License testing

## Regenerating Native Projects

After changing bundle identifiers or other native config:

```bash
# Clean and regenerate
npx expo prebuild --clean

# Then build
eas build --profile development --platform all
```

## Troubleshooting

### Build Fails

1. Check EAS build logs at https://expo.dev
2. Ensure all environment variables are set
3. Verify bundle identifiers match in app.json and stores

### IAP Not Working

1. Verify product IDs match exactly
2. Ensure products are approved in the store
3. Check sandbox/test account configuration
