import { useState, useEffect } from "react";
import type { SessionConfig } from "@/src/types/session";

// Seconds per pose for each preset speed
const PRESET_DURATIONS = { still: 60, slow: 45, flow: 30 };

/**
 * Countdown timer for individual poses. Calls onNext when the timer
 * reaches zero, then resets for the next pose. Runs independently of
 * the session duration timer.
 */
export function usePoseTimer(
  speed: SessionConfig["speed"],
  onNext: () => void,
  customDuration?: number,
  isPaused?: boolean,
  resetTrigger?: number,
) {
  const getDuration = () => {
    if (speed === "custom") {
      return customDuration ?? 90;
    }
    return PRESET_DURATIONS[speed];
  };

  const [seconds, setSeconds] = useState(getDuration());

  // Reset countdown when speed or custom duration changes mid-session
  useEffect(() => {
    setSeconds(getDuration());
  }, [speed, customDuration]);

  // Reset countdown when user navigates back to a previous pose
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      setSeconds(getDuration());
    }
  }, [resetTrigger]);

  // Main countdown — ticks every second, calls onNext at zero and resets
  useEffect(() => {
    if (isPaused) return;

    const duration = getDuration();
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          onNext();
          return duration; // reset for next pose
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [speed, customDuration, onNext, isPaused]);

  return seconds;
}
