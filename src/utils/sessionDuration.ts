import { useEffect, useRef } from "react";

/**
 * Tracks overall session duration and calls onEnd when time is up.
 * Runs independently of the pose timer — this controls when the
 * entire session ends, not individual pose transitions.
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

  // Keep a stable ref to onEnd so the timeout always calls the latest version.
  // Without this, the setTimeout closure captures a stale onEnd from the
  // render when the effect first ran.
  const onEndRef = useRef(onEnd);
  onEndRef.current = onEnd;

  // Prevent onEnd from firing after the component unmounts.
  // The cleanup in the timer effect clears the timeout, but there's a race
  // window where the timeout fires between the last render and cleanup.
  const mountedRef = useRef(true);
  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Reset remaining time when duration prop changes
  useEffect(() => {
    remainingMsRef.current = durationMinutes * 60 * 1000;
    lastTickRef.current = Date.now();
    endedRef.current = false;
  }, [durationMinutes]);

  // Main timer effect — starts/pauses the session countdown
  useEffect(() => {
    if (endedRef.current) return;

    if (isPaused) {
      // Pausing: calculate how much time has elapsed since last resume,
      // subtract it from remaining, and clear the active timeout
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
      if (!endedRef.current && mountedRef.current) {
        endedRef.current = true;
        onEndRef.current();
      }
    }, remainingMsRef.current);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [isPaused]);
}
