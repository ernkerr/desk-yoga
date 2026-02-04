import type { SessionConfig } from "./session";

/**
 * A named preset with display info and pre-configured session settings
 */
export type Preset = {
  id: string;
  name: string;
  description: string;
  icon: string;
  config: SessionConfig;
};

/**
 * Problem-driven presets for the home screen
 */
export const PRESETS: Preset[] = [
  {
    id: "mouse-hand-relief",
    name: "Mouse Hand Relief",
    description: "Ease tension from clicking and scrolling",
    icon: "🖱️",
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      focus_area: "wrist",
      speed: "slow",
      duration: 5,
    },
  },
  {
    id: "tech-neck-reset",
    name: "Tech Neck Reset",
    description: "Release tension from screen time",
    icon: "📱",
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      focus_area: "neck",
      speed: "slow",
      duration: 5,
    },
  },
];
