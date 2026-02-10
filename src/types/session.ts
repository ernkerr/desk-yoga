import type { AllowedPosture, CameraVisibility, FocusArea } from "./pose";

export type SessionConfig = {
  mode: "meeting" | "pomodoro" | "just stretch";
  posture: AllowedPosture;
  camera?: CameraVisibility;
  focus_area?: FocusArea;
  poseDuration: number; // seconds per pose
  duration: number;
  presetId?: string; // ID of the preset used to start this session
};
