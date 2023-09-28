import { tensor } from "@tensorflow/tfjs";
export async function tsDistance(v1, v2) {
  // Vectors
  const t = tensor([1212, 12]).print();
  console.info("el tensor es: ", t, v1, v2);
  return t;
  /*
  a = tf.placeholder(tf.float32, shape=[600, 52])
  b = tf.placeholder(tf.float32, shape=[16000, 52])
  # Cosine similarity
  similarity = tf.reduce_sum(a[:, tf.newaxis] * b, axis=-1)
  # Only necessary if vectors are not normalized
  similarity /= tf.norm(a[:, tf.newaxis], axis=-1) * tf.norm(b, axis=-1)
  # If you prefer the distance measure
  distance = 1 - similarity
  */
}
export async function getDistance(v1, v2) {
  if (v1.length !== v2.length)
    throw new Error("v1 and v2 must have the same length");
  let i = 0;
  let sum = 0;
  while (i < v1.length) {
    // calculate euclidean distantce
    sum += Math.pow(v1[i].x - v2[i].x, 2) + Math.pow(v1[i].y - v2[i].y, 2) + Math.pow(v1[i].z - v2[i].z, 2);
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
export async function getBestMatch(labeledDescriptors, lm, umbral = 1.5) {
  let bestMatch = null;
  let bestDistance = Infinity;
  for (const descriptor of labeledDescriptors) {
    const distance = await getDistance(descriptor.descriptors, lm);
    if (distance > umbral) {
      continue;
    }
    if (distance < bestDistance) {
      bestDistance = distance;
      bestMatch = descriptor;
    }
  }
  return bestMatch;
}
//# sourceMappingURL=distance.worker.js.map
