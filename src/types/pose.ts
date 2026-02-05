import type { ImageSourcePropType } from "react-native";

export type AllowedPosture = "sitting" | "standing";
export type CameraVisibility = "camera on" | "camera off";
export type FocusArea = "wrist" | "neck" | "hips" | "back";
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
