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
};

/**
 * Problem-driven presets for the home screen
 */
export const PRESETS: Preset[] = [
  {
    id: "mouse-hand-relief",
    name: "Mouse Hand Relief",
    description: "Ease tension from clicking and scrolling",
    image: require("@/assets/images/poses/seated/wrist_stretch.png"),
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
    image: null,
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
