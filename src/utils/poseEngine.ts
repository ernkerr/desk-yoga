import type { Pose } from "../types/pose";
import type { SessionConfig } from "../types/session";
import { Poses } from "../data/poses";
import { getHistory } from "./sessionHistory";

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
    if (pose.tags.allowed_posture !== config.posture) return false;
    if (config.focus_area && pose.tags.focus_areas !== config.focus_area) return false;
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
