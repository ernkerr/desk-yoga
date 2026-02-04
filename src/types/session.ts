import type { AllowedPosture, CameraVisibility, FocusArea } from "./pose";

export type SessionConfig = {
  mode: "meeting" | "pomodoro" | "just stretch";
  posture: AllowedPosture;
  camera?: CameraVisibility;
  focus_area?: FocusArea;
  speed: "still" | "slow" | "flow";
  duration: number;
};
