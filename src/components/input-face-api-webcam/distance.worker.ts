import { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { LabeledDescriptors, LabeledDescriptorsArray } from "./TrainedModel";


export async function getDistance(v1: NormalizedLandmark[], v2: NormalizedLandmark[]) {
    if ( v1.length !== v2.length ) throw new Error("v1 and v2 must have the same length")

    let i = 0;
    let sum = 0;
    while (i < v1.length) {
        // calculate euclidean distantce
        sum += Math.pow( v1[i].x - v2[i].x, 2) + Math.pow( v1[i].y - v2[i].y, 2) + Math.pow( v1[i].z - v2[i].z, 2);
        i++;
    }

    return Math.sqrt(sum);

}


/**
 * 
 * retorna el descriptor que mas se parece al descriptor de entrada usando getDistance
 * 
 * @param trainedModel 
 * @param lm 
 */
export async function getBestMatch(labeledDescriptors: LabeledDescriptorsArray, lm: NormalizedLandmark[],  umbral: number = 1.5): Promise<LabeledDescriptors> {
    let bestMatch: LabeledDescriptors = null;
    let bestDistance = Infinity;

    for (const descriptor of labeledDescriptors) {
        const distance = await getDistance(descriptor.descriptors, lm);

        if ( distance > umbral ) {
            continue;
        }

        if ( distance < bestDistance ) {
            bestDistance = distance;
            bestMatch = descriptor;
        }
    }

    return bestMatch;
    

}