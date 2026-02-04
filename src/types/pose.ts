export type AllowedPosture = "sitting" | "standing";
export type CameraVisibility = "camera on" | "camera off";
export type FocusArea = "wrist" | "neck" | "hips" | "back";
export type Side = "right" | "left" | "none";

export type Pose = {
  id: string;
  name: string;
  image: string;
  instructions: string;
  side?: string;
  tags: {
    allowed_posture: AllowedPosture;
    visibility: CameraVisibility;
    focus_areas: FocusArea;
  };
};
