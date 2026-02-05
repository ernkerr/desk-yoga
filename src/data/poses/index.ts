import type { Pose } from "../../types/pose";

export const Poses: Pose[] = [
  // seated poses
  {
    id: "seated-crescent-moon",
    name: "Seated Crescent Moon",
    image: require("@/assets/images/poses/seated/seated_crescent_moon.png"),
    instructions:
      "Sit tall. Inhale arms up. Exhale lean gently to one side, keeping both sit bones grounded.",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["neck"],
    },
  },
  {
    id: "seated-pigeon-right",
    name: "Seated Pigeon (Right)",
    image: require("@/assets/images/poses/seated/seated_pigeon.png"),
    instructions: "Sit tall. Lay your right ankle on your left knee. Breathe.",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["hips"],
    },
  },
  {
    id: "seated-pigeon-left",
    name: "Seated Pigeon (Left)",
    image: require("@/assets/images/poses/seated/seated_pigeon.png"),
    instructions: "Sit tall. Lay your left ankle on your right knee. Breathe.",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["hips"],
    },
  },

  // standing poses
  {
    id: "mountain",
    name: "Mountain",
    image: require("@/assets/images/poses/standing/mountain.png"),
    instructions: "Sit tall. Lay your left ankle on your right knee. Breathe.",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
];
