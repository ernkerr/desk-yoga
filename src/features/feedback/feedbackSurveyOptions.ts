export const FEATURE_REQUEST_OTHER_KEY = "__other__" as const;

export const ENJOYMENT_OPTIONS = [
  { key: "bad", icon: "sad-outline", label: "Bad" },
  { key: "ok", icon: "remove-circle-outline", label: "Neutral" },
  { key: "good", icon: "happy-outline", label: "Good" },
] as const;

export type Enjoyment = (typeof ENJOYMENT_OPTIONS)[number]["key"];

export const FEATURE_REQUEST_OPTIONS = [
  { key: "technical_names", label: "Technical names of poses" },
  { key: "pose_modifications", label: "Pose modifications" },
  { key: "pomodoro_timer", label: "Pomodoro timer" },
  {
    key: "typing_friendly_mode",
    label: "Mode with poses you can do while typing",
  },
] as const;

export type FeatureRequestKey = (typeof FEATURE_REQUEST_OPTIONS)[number]["key"];

