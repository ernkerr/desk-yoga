import type { PosturePreference, CameraVisibility, FocusArea } from "./pose";

export type SessionConfig = {
  mode: "meeting" | "pomodoro" | "just stretch";
  posture: PosturePreference;
  camera?: CameraVisibility;
  focus_area?: FocusArea;
  poseDuration: number; // seconds per pose
  duration: number;
  presetId?: string; // ID of the preset used to start this session
};
