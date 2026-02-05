import { useEffect, useRef } from "react";

/**
 * Hook that tracks session duration and calls onEnd when time is up.
 * @param durationMinutes - Session duration in minutes
 * @param onEnd - Callback when session duration is reached
 */
export function useSessionDuration(
  durationMinutes: number,
  onEnd: () => void
) {
  const startTimeRef = useRef<number>(Date.now());
  const endedRef = useRef(false);

  useEffect(() => {
    startTimeRef.current = Date.now();
    endedRef.current = false;

    const durationMs = durationMinutes * 60 * 1000;

    const timer = setTimeout(() => {
      if (!endedRef.current) {
        endedRef.current = true;
        onEnd();
      }
    }, durationMs);

    return () => {
      clearTimeout(timer);
    };
  }, [durationMinutes, onEnd]);
}
