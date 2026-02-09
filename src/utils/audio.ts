/**
 * Audio utilities for the Desk Yoga app.
 * Handles transition sounds during yoga sessions.
 */

import { Audio } from "expo-av";
import { getTransitionSoundEnabled } from "./storage";

// Cache the loaded sound to avoid reloading on each play
let transitionSound: Audio.Sound | null = null;
let isLoaded = false;

/**
 * Preloads the transition sound for faster playback.
 * Call this when the session screen mounts.
 */
export async function preloadTransitionSound(): Promise<void> {
  if (isLoaded) return;

  try {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/audio/transition-chime.m4a"),
      { shouldPlay: false, volume: 0.5 }
    );
    transitionSound = sound;
    isLoaded = true;
  } catch (error) {
    console.warn("Failed to preload transition sound:", error);
  }
}

/**
 * Plays the transition sound if enabled in settings.
 * This is a fire-and-forget function - errors are logged but not thrown.
 */
export async function playTransitionSound(): Promise<void> {
  // Check if sound is enabled in settings
  if (!getTransitionSoundEnabled()) {
    return;
  }

  if (!transitionSound || !isLoaded) {
    console.warn("Transition sound not loaded");
    return;
  }

  try {
    // Reset to beginning in case it was played before
    await transitionSound.setPositionAsync(0);
    await transitionSound.playAsync();
  } catch (error) {
    console.warn("Failed to play transition sound:", error);
  }
}

/**
 * Unloads the transition sound to free memory.
 * Call this when the session screen unmounts.
 */
export async function unloadTransitionSound(): Promise<void> {
  if (transitionSound) {
    try {
      await transitionSound.unloadAsync();
    } catch (error) {
      console.warn("Failed to unload transition sound:", error);
    }
    transitionSound = null;
    isLoaded = false;
  }
}
