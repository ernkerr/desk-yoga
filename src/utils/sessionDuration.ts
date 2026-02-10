import { useEffect, useRef } from "react";

/**
 * Tracks overall session duration and calls onEnd when time is up.
 * Runs independently of the pose timer — this controls when the
 * entire session ends, not individual pose transitions.
 *
 * Note: the caller (session.tsx) guards onEnd with isFocusedRef
 * to prevent navigation when the screen is in the background.
 */
export function useSessionDuration(
  durationMinutes: number,
  onEnd: () => void,
  isPaused?: boolean
) {
  const remainingMsRef = useRef<number>(durationMinutes * 60 * 1000);
  const lastTickRef = useRef<number>(Date.now());
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Stable ref so the timeout always calls the latest onEnd
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  // Reset remaining time when duration prop changes
  useEffect(() => {
    remainingMsRef.current = durationMinutes * 60 * 1000;
    lastTickRef.current = Date.now();
  }, [durationMinutes]);

  // Main timer effect — starts/pauses the session countdown
  useEffect(() => {
    if (isPaused) {
      // Pausing: calculate elapsed time since last resume, subtract from remaining
      const elapsed = Date.now() - lastTickRef.current;
      remainingMsRef.current = Math.max(0, remainingMsRef.current - elapsed);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
      return;
    }

    // Resuming (or initial start): schedule timeout for remaining duration
    lastTickRef.current = Date.now();
    timerRef.current = setTimeout(() => {
      onEndRef.current();
    }, remainingMsRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused]);
}
