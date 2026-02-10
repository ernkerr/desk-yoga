import type { ImageSourcePropType } from "react-native";

export type AllowedPosture = "sitting" | "standing";
export type PosturePreference = AllowedPosture | "any";
export type CameraVisibility = "camera on" | "camera off";
export type FocusArea =
  | "wrists"
  | "forearms"
  | "neck"
  | "hips"
  | "glute"
  | "low back"
  | "back"
  | "chest"
  | "shoulders";
export type Side = "right" | "left";

export type Pose = {
  id: string;
  name: string;
  image: ImageSourcePropType;
  instructions: string;
  side?: Side;
  tags: {
    allowed_posture: AllowedPosture;
    visibility: CameraVisibility;
    focus_areas: FocusArea[];
  };
};
