import { NormalizedLandmark } from "@mediapipe/tasks-vision";

export interface LabeledDescriptors {
    label: string;
    descriptors: NormalizedLandmark[];
}

export type LabeledDescriptorsArray = LabeledDescriptors[];