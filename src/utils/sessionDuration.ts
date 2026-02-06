import { useEffect, useRef } from "react";

/**
 * Hook that tracks session duration and calls onEnd when time is up.
 * @param durationMinutes - Session duration in minutes
 * @param onEnd - Callback when session duration is reached
 * @param isPaused - Whether the timer is paused
 */
export function useSessionDuration(
  durationMinutes: number,
  onEnd: () => void,
  isPaused?: boolean
) {
  const remainingMsRef = useRef<number>(durationMinutes * 60 * 1000);
  const lastTickRef = useRef<number>(Date.now());
  const endedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reset when duration changes
  useEffect(() => {
    remainingMsRef.current = durationMinutes * 60 * 1000;
    lastTickRef.current = Date.now();
    endedRef.current = false;
  }, [durationMinutes]);

  useEffect(() => {
    if (endedRef.current) return;

    if (isPaused) {
      // Pause: save remaining time and clear timer
      const elapsed = Date.now() - lastTickRef.current;
      remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Resume: start timer for remaining time
    lastTickRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      if (!endedRef.current) {
        endedRef.current = true;
        onEnd();
      }
    }, remainingMsRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused, onEnd]);
}
