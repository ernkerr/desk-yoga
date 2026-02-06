import type { AllowedPosture, CameraVisibility, FocusArea } from "./pose";

export type SessionConfig = {
  mode: "meeting" | "pomodoro" | "just stretch";
  posture: AllowedPosture;
  camera?: CameraVisibility;
  focus_area?: FocusArea;
  speed: "still" | "slow" | "flow" | "custom";
  poseDuration?: number; // seconds per pose (used when speed is "custom")
  duration: number;
  presetId?: string; // ID of the preset used to start this session
};
