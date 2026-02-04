// we need a way to switch side to side, like if we have a side chosen left or right (not null) then automatically do the other side next?

Here are my types

export type AllowedPosture = "sitting" | "standing";
export type CameraVisibility = "camera on" | "camera off";
export type FocusArea = "wrist" | "neck" | "hips" | "back";

export type Pose = {
id: string;
name: string;
image: string;
instructions: string;
tags: {
allowed_posture: AllowedPosture;
visibility: CameraVisibility;
focus_areas: FocusArea;
};
};

import type { AllowedPosture, CameraVisibility, FocusArea } from "./pose";

export type SessionConfig = {
mode: "meeting" | "pomodoro" | "just stretch";
posture: AllowedPosture;
camera?: CameraVisibility;
focus_area?: FocusArea;
speed: "still" | "slow" | "flow";
duration: number;
};

Here is my data:
id:
name: "Seated Cresent Moon"
image: /assets/images/poses/seated/seated_cresent_moon.png
instructions: ""
tags: {
allowedPosture: "sitting"
visibility: "camera off"
focus_areas: "neck"
}
