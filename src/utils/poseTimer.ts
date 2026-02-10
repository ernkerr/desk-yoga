import { useState, useEffect } from "react";

/**
 * Countdown timer for individual poses. Calls onNext when the timer
 * reaches zero, then resets for the next pose. Runs independently of
 * the session duration timer.
 */
export function usePoseTimer(
  durationSeconds: number,
  onNext: () => void,
  isPaused?: boolean,
  resetTrigger?: number,
) {
  const [seconds, setSeconds] = useState(durationSeconds);

  // Reset countdown when duration changes or user goes back to a previous pose
  useEffect(() => {
    setSeconds(durationSeconds);
  }, [durationSeconds, resetTrigger]);

  // Main countdown — ticks every second, calls onNext at zero and resets
  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          onNext();
          return durationSeconds; // reset for next pose
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [durationSeconds, onNext, isPaused]);

  return seconds;
}
