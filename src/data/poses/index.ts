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
  {
    id: "seated-crescent-moon",
    name: "Seated Crescent Moon",
    image: require("@/assets/images/poses/seated/seated_crescent_moon_R.png"),
    instructions:
      "Sit tall. Inhale arms up. Exhale lean gently to the right side. Keep both sit bones grounded.",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-crescent-moon",
    name: "Seated Crescent Moon",
    image: require("@/assets/images/poses/seated/seated_crescent_moon_L.png"),
    instructions:
      "Sit tall. Inhale arms up. Exhale lean gently to the left side. Keep both sit bones grounded.",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-cow-face-right",
    name: "Seated Cow Face",
    image: require("@/assets/images/poses/seated/seated_cow_face_R.png"),
    instructions:
      "Sit tall. Reach your right arm up, bend the elbow, and bring your hand behind your back. Reach your left arm behind and clasp fingers if possible.",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-cow-face-left",
    name: "Seated Cow Face",
    image: require("@/assets/images/poses/seated/seated_cow_face_L.png"),
    instructions:
      "Sit tall. Reach your left arm up, bend the elbow, and bring your hand behind your back. Reach your right arm behind and clasp fingers if possible.",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-eagle-right",
    name: "Seated Eagle",
    image: require("@/assets/images/poses/seated/seated_eagle_R.png"),
    instructions:
      "Sit tall. Cross your right arm under your left at the elbows. Bend elbows and bring palms together. Lift elbows slightly.",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-eagle-left",
    name: "Seated Eagle",
    image: require("@/assets/images/poses/seated/seated_eagle_L.png"),
    instructions:
      "Sit tall. Cross your left arm under your right at the elbows. Bend elbows and bring palms together. Lift elbows slightly.",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-forward-fold",
    name: "Seated Forward Fold",
    image: require("@/assets/images/poses/seated/seated_forward_fold.png"),
    instructions:
      "Sit tall. Hinge at your hips and fold forward, letting your arms hang or rest on your legs. Relax your neck.",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-pigeon-right",
    name: "Seated Pigeon",
    image: require("@/assets/images/poses/seated/seated_pigeon_R.png"),
    instructions: "Sit tall. Lay your right ankle on your left knee. Breathe.",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-pigeon-left",
    name: "Seated Pigeon",
    image: require("@/assets/images/poses/seated/seated_pigeon_L.png"),
    instructions: "Sit tall. Lay your left ankle on your right knee. Breathe.",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
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
  {
    id: "seated-twist-right",
    name: "Seated Twist",
    image: require("@/assets/images/poses/seated/seated_twist_R.png"),
    instructions:
      "Sit tall. Place your left hand on your right knee. Twist gently to the right, looking over your right shoulder.",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-twist-left",
    name: "Seated Twist ",
    image: require("@/assets/images/poses/seated/seated_twist_L.png"),
    instructions:
      "Sit tall. Place your right hand on your left knee. Twist gently to the left, looking over your left shoulder.",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-frame-right",
    name: "Seated Frame",
    image: require("@/assets/images/poses/seated/seated_frame.png"),
    instructions: "Sit tall. ",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-frame-left",
    name: "Seated Frame",
    image: require("@/assets/images/poses/seated/seated_frame.png"),
    instructions: "Sit tall. ",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "side-neck-stretch-right",
    name: "Side Neck Stretch",
    image: require("@/assets/images/poses/seated/side_neck_stretch_R.png"),
    instructions: "Sit tall. ",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "side-neck-stretch-left",
    name: "Side Neck Stretch",
    image: require("@/assets/images/poses/seated/side_neck_stretch_L.png"),
    instructions: "Sit tall. ",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "shoulder-roll",
    name: "Shoulder Roll",
    image: require("@/assets/images/poses/seated/shoulder_roll.png"),
    instructions: "Sit tall. ",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "chin-to-chest",
    name: "Chin To Chest",
    image: require("@/assets/images/poses/seated/chin_to_chest.png"),
    instructions: "Sit tall. ",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "seated-figure-four-twist-right",
    name: "Seated Figure Four Twist",
    image: require("@/assets/images/poses/seated/seated_figure_four_twist_R.png"),
    instructions:
      "Sit tall. Cross your ankle over the opposite knee. Start your rotation from your lower belly. Then the ribs and finally the neck.",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["hips", "back", "glute"],
    },
  },
  // To protect your knee while the leg is up, keep your top foot flexed (pull your toes back toward your shin). This engages the muscles around the knee and keeps the joint stable while you're stretching the hip.
  {
    id: "seated-figure-four-twist-left",
    name: "Seated Figure Four Twist",
    image: require("@/assets/images/poses/seated/seated_figure_four_twist_L.png"),
    instructions:
      "Sit tall. Cross your ankle over the opposite knee. Start your rotation from your lower belly. Then the ribs and finally the neck.",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["hips", "back", "glute"],
    },
  },

  {
    id: "seated-knee-to-chest",
    name: "Seated Knee To Chest",
    image: require("@/assets/images/poses/seated/seated_knee_to_chest_R.png"),
    instructions:
      "Sit tall. Interlace your fingers around your right shin and pull one knee toward your chest. Draw your shoulder blades down and back. Keep your gaze forward.",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["low back", "hips"],
    },
  },
  {
    id: "seated-knee-to-chest",
    name: "Seated Knee To Chest",
    image: require("@/assets/images/poses/seated/seated_knee_to_chest_L.png"),
    instructions:
      "Sit tall. Interlace your fingers around your left shin and pull one knee toward your chest. Draw your shoulder blades down and back. Keep your gaze forward.",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["low back", "hips"],
    },
  },
  {
    id: "seated-chest-opener",
    name: "Seated Chest Opener",
    image: require("@/assets/images/poses/seated/seated_chest_opener_L.png"),
    instructions:
      "Sit tall. Extend your left arm behind you and grip the backrest or the frame of the chair. Gently pull your chest forward and upward. Draw your shoulder blades together. Keep your gaze forward.",
    side: "left",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["chest", "shoulders", "back"],
    },
  },
  {
    id: "seated-chest-opener",
    name: "Seated Chest Opener",
    image: require("@/assets/images/poses/seated/seated_chest_opener_R.png"),
    instructions:
      "Sit tall. Extend your right arm behind you and grip the backrest or the frame of the chair. Gently pull your chest forward and upward. Draw your shoulder blades together. Keep your gaze forward.",
    side: "right",
    tags: {
      allowed_posture: "sitting",
      visibility: "camera off",
      focus_areas: ["chest", "shoulders", "back"],
    },
  },
  // {
  //   id: "seated-knee-to-chest",
  //   name: "Seated Knee To Chest",
  //   image: require("@/assets/images/poses/seated/seated_knee_to_chest_L.png"),
  //   instructions:
  //     "Sit tall. Interlace your fingers around your left shin and pull one knee toward your chest. Draw your shoulder blades down and back. Keep your gaze forward.",
  //   side: "left",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: ["low back", "hips"],
  //   },
  // },
  // {
  //   id: "seated-knee-to-chest",
  //   name: "Seated Knee To Chest",
  //   image: require("@/assets/images/poses/seated/seated_knee_to_chest_L.png"),
  //   instructions:
  //     "Sit tall. Interlace your fingers around your left shin and pull one knee toward your chest. Draw your shoulder blades down and back. Keep your gaze forward.",
  //   side: "left",
  //   tags: {
  //     allowed_posture: "sitting",
  //     visibility: "camera off",
  //     focus_areas: ["low back", "hips"],
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
    name: "Eagle",
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
    name: "Eagle",
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
    id: "tree-1-right",
    name: "Tree",
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
    id: "tree-1-left",
    name: "Tree ",
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
    id: "tree-2-right",
    name: "Tree",
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
    id: "tree-2-left",
    name: "Tree",
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
    name: "Warrior 1",
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
    name: "Warrior 1",
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
    name: "Warrior 2",
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
    name: "Warrior 2",
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
  {
    id: "high-lunge-right",
    name: "High Lunge",
    image: require("@/assets/images/poses/standing/high_lunge_R.png"),
    instructions: "Stand tall ",
    side: "right",
    tags: {
      allowed_posture: "standing",
      visibility: "camera on",
      focus_areas: [],
    },
  },
  {
    id: "high-lunge-left",
    name: "High Lunge",
    image: require("@/assets/images/poses/standing/high_lunge_L.png"),
    instructions: "Stand tall ",
    side: "left",
    tags: {
      allowed_posture: "standing",
      visibility: "camera on",
      focus_areas: [],
    },
  },
  {
    id: "frame-right",
    name: "Frame",
    image: require("@/assets/images/poses/standing/frame.png"),
    instructions:
      "Stand tall Place each elbow into the opposite palm above your head. Imagine that you are pulling your arms apart, even as you hold them together.",
    side: "right",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  //  You can grasp your forearms if it is more comfortable.
  {
    id: "frame-left",
    name: "Frame",
    image: require("@/assets/images/poses/standing/frame_L.png"),
    instructions:
      "Stand tall Place each elbow into the opposite palm above your head. Imagine that you are pulling your arms apart, even as you hold them together. ",
    side: "left",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "chair",
    name: "Chair",
    image: require("@/assets/images/poses/standing/chair.png"),
    instructions:
      "Stand with your feet hip-distance apart. Bend your knees and reach your seat back as if you were about to sit in a chair.",
    tags: {
      allowed_posture: "standing",
      visibility: "camera off",
      focus_areas: [],
    },
  },
  {
    id: "supported-chair",
    name: "Supported Chair",
    image: require("@/assets/images/poses/standing/supported_chair.png"),
    instructions:
      "Stand with your feet hip-distance apart and rest your fingertips on your desk. Lift your heels so you’re standing on the balls of your feet. Bend your knees and reach your seat back as if you were about to sit in a chair while keeping your heels lifted. Lengthen your back.",
    tags: {
      allowed_posture: "standing",
      visibility: "camera on",
      focus_areas: [],
    },
  },
  {
    id: "forward_bend",
    name: "Forward Bend",
    image: require("@/assets/images/poses/standing/forward_bend.png"),
    instructions:
      "Stand with your feet hip-distance apart and hinge forward from your hips. Keep your knees slightly bent. Relax your neck and shoulders and send your sitting bones high.",
    tags: {
      allowed_posture: "standing",
      visibility: "camera on",
      focus_areas: [],
    },
  },

  //

  // {
  //   id: "triangle-right",
  //   name: "Triangle",
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
  //   name: "Triangle",
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
