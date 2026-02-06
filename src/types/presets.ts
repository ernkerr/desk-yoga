import type { SessionConfig } from "./session";
import type { ImageSourcePropType } from "react-native";

/**
 * A named preset with display info and pre-configured session settings
 */
export type Preset = {
  id: string;
  name: string;
  description: string;
  image: ImageSourcePropType | null;
  config: SessionConfig;
  poseSequence?: string[]; // Optional ordered list of pose IDs
};

/**
 * Problem-driven presets for the home screen
 */
export const PRESETS: Preset[] = [
  {
    id: "posture-corrector",
    name: "Posture Corrector",
    description: "Bring awareness to your posture",
    image: require("@/assets/images/presets/pain_2.png"),
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",

      speed: "slow",
      duration: 5,
    },
    poseSequence: ["seated-upward-salute"],
  },
  {
    id: "midday-slump",
    name: "Midday Slump",
    description: "For when that two-o-clock feeling hits",
    image: require("@/assets/images/presets/midday_slump_5.png"),
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      // focus_area: "neck",
      speed: "slow",
      duration: 5,
    },
  },
  {
    id: "meeting-mode",
    name: "Meeting Mode",
    description:
      "Descreet Poses to get you through your meetings without snoozing",
    image: require("@/assets/images/presets/meeting.png"),
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      // focus_area: "neck",
      speed: "slow",
      duration: 5,
    },
  },
  {
    id: "energy-boost",
    name: "Energy Boost",
    description: "Better than a cup of coffee",
    image: require("@/assets/images/presets/low_energy.png"),
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      // focus_area: "neck",
      speed: "slow",
      duration: 5,
    },
  },
  {
    id: "tech-neck-reset",
    name: "Tech Neck Reset",
    description: "Release tension from screen time",
    image: require("@/assets/images/presets/pain_4.png"),
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      // focus_area: "neck",
      speed: "slow",
      duration: 5,
    },
  },
  {
    id: "mouse-hand-relief",
    name: "Mouse Hand Relief",
    description: "Ease tension from clicking and scrolling",
    image: require("@/assets/images/presets/mouse.png"),
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      // focus_area: "wrist",
      speed: "slow",
      duration: 5,
    },
  },
  {
    id: "pick-me-up",
    name: "Pick-Me-Up",
    description: "Schedule some time for you",
    image: require("@/assets/images/presets/midday_slump_4.png"),
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      // focus_area: "neck",
      speed: "slow",
      duration: 5,
    },
  },
  {
    id: "laser-focused",
    name: "Laser Focused",
    description: "Get back to your productive self after this flow",
    image: require("@/assets/images/presets/laser_focused_2.png"),
    config: {
      mode: "just stretch",
      posture: "sitting",
      camera: "camera off",
      // focus_area: "neck",
      speed: "slow",
      duration: 5,
    },
  },
];
