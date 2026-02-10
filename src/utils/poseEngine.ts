import type { Pose } from "../types/pose";
import type { SessionConfig } from "../types/session";
import { Poses } from "../data/poses";
import { PRESETS } from "../types/presets";
import { getHistory, addToHistory } from "./sessionHistory";
import { getHasPaid } from "./storage";
import { FREE_TIER } from "../config/app.config";

/**
 * Find a pose by ID
 */
export function getPoseById(id: string): Pose | undefined {
  return Poses.find((p) => p.id === id);
}

/**
 * Get all poses that match the session config
 */
export function filterPoses(config: SessionConfig): Pose[] {
  return Poses.filter((pose) => {
    if (config.posture !== "any" && pose.tags.allowed_posture !== config.posture) return false;
    if (config.focus_area && !pose.tags.focus_areas.includes(config.focus_area)) return false;
    if (config.camera && pose.tags.visibility !== config.camera) return false;
    return true;
  });
}

/**
 * Get the paired side pose (right → left or left → right)
 */
export function getPairedPose(pose: Pose): Pose | null {
  if (!pose.side) return null;
  const opposite = pose.side === "right" ? "left" : "right";
  const baseId = pose.id.replace(/-right$|-left$/, "");
  return Poses.find((p) => p.id === `${baseId}-${opposite}`) || null;
}

/**
 * Pick the next pose based on config and history
 */
export function getNextPose(config: SessionConfig, currentPoseId?: string): Pose | null {
  const history = getHistory();

  // Free tier override: unpaid users always get the curated sequence
  if (!getHasPaid()) {
    const seq = FREE_TIER.poseSequence;
    const nextIndex = history.length % seq.length;
    return getPoseById(seq[nextIndex]) || null;
  }

  // If preset has a sequence, use it
  if (config.presetId) {
    const preset = PRESETS.find((p) => p.id === config.presetId);
    if (preset?.poseSequence && preset.poseSequence.length > 0) {
      // Loop the sequence so session duration timer controls when to end
      const nextIndex = history.length % preset.poseSequence.length;
      return getPoseById(preset.poseSequence[nextIndex]) || null;
    }
  }

  // If current pose has a pair, show that next
  if (currentPoseId) {
    const current = getPoseById(currentPoseId);
    if (current) {
      const paired = getPairedPose(current);
      if (paired && !history.includes(paired.id)) {
        return paired;
      }
    }
  }

  // Filter by config, then remove already-shown
  const matching = filterPoses(config);
  const fresh = matching.filter((p) => !history.includes(p.id));

  // Pick from fresh, or repeat if exhausted
  const pool = fresh.length > 0 ? fresh : matching;
  if (pool.length === 0) return null;

  return pool[Math.floor(Math.random() * pool.length)];
}

/**
 * Get next pose and update state via callback
 * Returns true if a pose was found, false if sequence is complete
 */
export function triggerNextPose(
  config: SessionConfig,
  currentPoseId: string | undefined,
  setPose: (pose: Pose) => void
): boolean {
  const next = getNextPose(config, currentPoseId);
  if (next) {
    setPose(next);
    addToHistory(next.id);
    return true;
  }
  return false;
}
