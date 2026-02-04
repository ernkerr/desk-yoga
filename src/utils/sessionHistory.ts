/**
 * Tracks which poses have been shown during a session.
 * Used to avoid repetition until all poses are exhausted.
 */

let shownPoseIds: string[] = [];

export function addToHistory(poseId: string): void {
  if (!shownPoseIds.includes(poseId)) {
    shownPoseIds.push(poseId);
  }
}

export function isInHistory(poseId: string): boolean {
  return shownPoseIds.includes(poseId);
}

export function getHistory(): string[] {
  return [...shownPoseIds];
}

export function clearHistory(): void {
  shownPoseIds = [];
}
