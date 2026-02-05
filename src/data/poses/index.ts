import type { Pose } from "../../types/pose";

export const Poses: Pose[] = [
  // seated poses
  {
    id: "seated-upward-salute",
    name: "Seated Upward Salute",
    image: require("@/assets/images/poses/seated/seated_upward_salute.png"),
    instructions:
      "Sit tall. Inhale and reach both arms overhead, palms facing each other. Lengthen through your spine.",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-cat-cow",
    name: "Seated Cat Cow",
    image: require("@/assets/images/poses/seated/seated_cat_cow.png"),
    instructions:
      "Sit tall with hands on knees. Inhale, arch your back and look up. Exhale, round your spine and tuck your chin.",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-cow-cat",
    name: "Seated Cow Cat",
    image: require("@/assets/images/poses/seated/seated_cow_cat.png"),
    instructions:
      "Sit tall with hands on knees. Inhale, arch your back and look up. Exhale, round your spine and tuck your chin.",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  // {
  //   id: "seated-crescent-moon",
  //   name: "Seated Crescent Moon",
  //   image: require("@/assets/images/poses/seated/seated_crescent_moon.png"),
  //   instructions:
  //     "Sit tall. Inhale arms up. Exhale lean gently to one side, keeping both sit bones grounded.",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-cow-face-right",
  //   name: "Seated Cow Face (Right)",
  //   image: require("@/assets/images/poses/seated/seated_cow_face.png"),
  //   instructions:
  //     "Sit tall. Reach your right arm up, bend the elbow, and bring your hand behind your back. Reach your left arm behind and clasp fingers if possible.",
  //   side: "right",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-cow-face-left",
  //   name: "Seated Cow Face (Left)",
  //   image: require("@/assets/images/poses/seated/seated_cow_face.png"),
  //   instructions:
  //     "Sit tall. Reach your left arm up, bend the elbow, and bring your hand behind your back. Reach your right arm behind and clasp fingers if possible.",
  //   side: "left",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-eagle-right",
  //   name: "Seated Eagle (Right)",
  //   image: require("@/assets/images/poses/seated/seated_eagle.png"),
  //   instructions:
  //     "Sit tall. Cross your right arm under your left at the elbows. Bend elbows and bring palms together. Lift elbows slightly.",
  //   side: "right",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-eagle-left",
  //   name: "Seated Eagle (Left)",
  //   image: require("@/assets/images/poses/seated/seated_eagle.png"),
  //   instructions:
  //     "Sit tall. Cross your left arm under your right at the elbows. Bend elbows and bring palms together. Lift elbows slightly.",
  //   side: "left",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-forward-fold",
  //   name: "Seated Forward Fold",
  //   image: require("@/assets/images/poses/seated/seated_forward_fold.png"),
  //   instructions:
  //     "Sit tall. Hinge at your hips and fold forward, letting your arms hang or rest on your legs. Relax your neck.",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-pigeon-right",
  //   name: "Seated Pigeon (Right)",
  //   image: require("@/assets/images/poses/seated/seated_pigeon.png"),
  //   instructions: "Sit tall. Lay your right ankle on your left knee. Breathe.",
  //   side: "right",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-pigeon-left",
  //   name: "Seated Pigeon (Left)",
  //   image: require("@/assets/images/poses/seated/seated_pigeon.png"),
  //   instructions: "Sit tall. Lay your left ankle on your right knee. Breathe.",
  //   side: "left",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-savasana",
  //   name: "Seated Savasana",
  //   image: require("@/assets/images/poses/seated/seated_savasana.png"),
  //   instructions:
  //     "Sit comfortably. Close your eyes. Rest your hands on your thighs. Breathe naturally and relax completely.",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-twist-right",
  //   name: "Seated Twist (Right)",
  //   image: require("@/assets/images/poses/seated/seated_twist.png"),
  //   instructions:
  //     "Sit tall. Place your left hand on your right knee. Twist gently to the right, looking over your right shoulder.",
  //   side: "right",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "seated-twist-left",
  //   name: "Seated Twist (Left)",
  //   image: require("@/assets/images/poses/seated/seated_twist.png"),
  //   instructions:
  //     "Sit tall. Place your right hand on your left knee. Twist gently to the left, looking over your left shoulder.",
  //   side: "left",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },

  // {
  //   id: "seated-wrist-stretch",
  //   name: "Seated Wrist Stretch",
  //   image: require("@/assets/images/poses/seated/seated_wrist_stretch.png"),
  //   instructions:
  //     "Extend one arm forward, palm up. Use your other hand to gently pull fingers down and back. Switch sides.",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },

  // standing poses
  {
    id: "mountain",
    name: "Mountain",
    image: require("@/assets/images/poses/standing/mountain.png"),
    instructions:
      "Stand tall with feet hip-width apart. Arms at your sides, palms forward. Ground through your feet and lengthen your spine.",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "eagle-right",
    name: "Eagle (Right)",
    image: require("@/assets/images/poses/standing/eagle_R.png"),
    instructions:
      "Stand on your left leg. Wrap your right leg over your left. Cross your right arm under your left and bring palms together.",
    side: "right",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "eagle-left",
    name: "Eagle (Left)",
    image: require("@/assets/images/poses/standing/eagle_L.png"),
    instructions:
      "Stand on your right leg. Wrap your left leg over your right. Cross your left arm under your right and bring palms together.",
    side: "left",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "desk-downward-dog",
    name: "Desk Downward Dog",
    image: require("@/assets/images/poses/standing/desk_downward_dog.png"),
    instructions:
      "Place hands on your desk, shoulder-width apart. Walk back until your body forms an L-shape. Press chest toward thighs.",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "desk-upward-dog",
    name: "Desk Upward Dog",
    image: require("@/assets/images/poses/standing/desk_upward_dog.png"),
    instructions:
      "Place hands on your desk. Walk feet back slightly. Drop hips forward and lift chest, keeping arms straight.",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "tree-right",
    name: "Tree (Right)",
    image: require("@/assets/images/poses/standing/tree_1_R.png"),
    instructions:
      "Stand on your left leg. Place your right foot on your inner left thigh or calf. Bring hands to heart.",
    side: "right",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "tree-left",
    name: "Tree (Left)",
    image: require("@/assets/images/poses/standing/tree_1_L.png"),
    instructions:
      "Stand on your right leg. Place your left foot on your inner right thigh or calf. Bring hands to heart.",
    side: "left",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "tree-right",
    name: "Tree (Right)",
    image: require("@/assets/images/poses/standing/tree_2_R.png"),
    instructions:
      "Stand on your left leg. Place your right foot on your inner left thigh or calf. Reach hands overhead.",
    side: "right",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "tree-left",
    name: "Tree (Left)",
    image: require("@/assets/images/poses/standing/tree_2_L.png"),
    instructions:
      "Stand on your right leg. Place your left foot on your inner right thigh or calf. Reach hands overhead.",
    side: "left",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "warrior-1-right",
    name: "Warrior 1 (Right)",
    image: require("@/assets/images/poses/standing/warrior_1_R.png"),
    instructions:
      "Step your right foot forward into a lunge. Back foot angled slightly. Raise arms overhead, palms facing.",
    side: "right",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "warrior-1-left",
    name: "Warrior 1 (Left)",
    image: require("@/assets/images/poses/standing/warrior_1_L.png"),
    instructions:
      "Step your left foot forward into a lunge. Back foot angled slightly. Raise arms overhead, palms facing.",
    side: "left",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "warrior-2-right",
    name: "Warrior 2 (Right)",
    image: require("@/assets/images/poses/standing/warrior_2_R.png"),
    instructions:
      "Step wide. Turn right foot out, left foot slightly in. Bend right knee over ankle. Extend arms parallel to floor, gaze right.",
    side: "right",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "warrior-2-left",
    name: "Warrior 2 (Left)",
    image: require("@/assets/images/poses/standing/warrior_2_L.png"),
    instructions:
      "Step wide. Turn left foot out, right foot slightly in. Bend left knee over ankle. Extend arms parallel to floor, gaze left.",
    side: "left",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  // {
  //   id: "triangle-right",
  //   name: "Triangle (Right)",
  //   image: require("@/assets/images/poses/standing/triangle.png"),
  //   instructions:
  //     "Step wide. Turn right foot out. Extend arms wide, then reach right hand toward right shin. Left arm reaches up.",
  //   side: "right",
  //   tags: {
  //     allowed_posture: "standing",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
  // {
  //   id: "triangle-left",
  //   name: "Triangle (Left)",
  //   image: require("@/assets/images/poses/standing/triangle.png"),
  //   instructions:
  //     "Step wide. Turn left foot out. Extend arms wide, then reach left hand toward left shin. Right arm reaches up.",
  //   side: "left",
  //   tags: {
  //     allowed_posture: "standing",
  //     visibility: "camera off",
  //     focus_areas: [],
  //   },
  // },
];
