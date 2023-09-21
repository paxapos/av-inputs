import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { LabeledDescriptors, LabeledDescriptorsArray } from "./TrainedModel";
export declare function tsDistance(v1: NormalizedLandmark[], v2: NormalizedLandmark[]): Promise<void>;
export declare function getDistance(v1: NormalizedLandmark[], v2: NormalizedLandmark[]): Promise<number>;
/**
 *
 * retorna el descriptor que mas se parece al descriptor de entrada usando getDistance
 *
 * @param trainedModel
 * @param lm
 */
export declare function getBestMatch(labeledDescriptors: LabeledDescriptorsArray, lm: NormalizedLandmark[], umbral?: number): Promise<LabeledDescriptors>;
