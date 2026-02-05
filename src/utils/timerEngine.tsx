import { useState, useEffect } from "react";
import type { SessionConfig } from "@/src/types/session";

// Seconds per pose for each speed
const DURATIONS = { still: 60, slow: 45, flow: 30 };

export function useTimer(speed: SessionConfig["speed"], onNext: () => void) {
  const [seconds, setSeconds] = useState(DURATIONS[speed]);

  // Reset when speed changes
  useEffect(() => {
    setSeconds(DURATIONS[speed]);
  }, [speed]);

  // Countdown
  useEffect(() => {
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          onNext();
          return DURATIONS[speed];
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [speed, onNext]);

  return seconds;
}
