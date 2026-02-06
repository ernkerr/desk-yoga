import { useState, useEffect } from "react";
import type { SessionConfig } from "@/src/types/session";

// Seconds per pose for preset speeds
const PRESET_DURATIONS = { still: 60, slow: 45, flow: 30 };

export function useTimer(
  speed: SessionConfig["speed"],
  onNext: () => void,
  customDuration?: number,
) {
  const getDuration = () => {
    if (speed === "custom") {
      return customDuration ?? 90;
    }
    return PRESET_DURATIONS[speed];
  };

  const [seconds, setSeconds] = useState(getDuration());

  // Reset when speed or custom duration changes
  useEffect(() => {
    setSeconds(getDuration());
  }, [speed, customDuration]);

  // Countdown
  useEffect(() => {
    const duration = getDuration();
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          onNext();
          return duration;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [speed, customDuration, onNext]);

  return seconds;
}
