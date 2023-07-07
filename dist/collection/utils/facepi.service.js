import { FaceDetector, FilesetResolver } from "@mediapipe/tasks-vision";
import { videoToBlob } from "./camera.service";
/**
 * create a class "FaceapiService" with a constructor
 *
*/
export class FaceapiService {
  constructor(minDetectionConfidence = 0.6) {
    this.initializefaceDetector(minDetectionConfidence);
  }
  // Initialize the object detector
  async initializefaceDetector(minDetectionConfidence) {
    const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
    this.faceDetector = await FaceDetector.createFromOptions(vision, {
      minSuppressionThreshold: 0.3,
      minDetectionConfidence: minDetectionConfidence,
      baseOptions: {
        modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
        delegate: "GPU"
      },
      runningMode: "VIDEO",
    });
  }
  ;
  async detectFace(el, timeStamp) {
    if (el && this.faceDetector) {
      const detection = this.faceDetector.detectForVideo(el, timeStamp).detections;
      if (!detection) {
        return null;
      }
      let detectionObj;
      if (detection.length == 1) {
        detectionObj = detection[0];
      }
      if (detection.length > 1) {
        const sorted = detection.sort((a, b) => {
          return b.categories[0].score - a.categories[0].score;
        });
        detectionObj = sorted[0];
      }
      return await this.getDetectorImgFromDetection(el, detectionObj);
    }
    return null;
  }
  async getDetectorImgFromDetection(el, detection) {
    // recortar canvas del el para que tenga el tamaño de la detección
    if (!detection || !detection.boundingBox) {
      return null;
    }
    const blob = await videoToBlob(el, detection.boundingBox);
    return {
      detection: detection,
      currentTarget: el,
      blobImg: blob
    };
  }
}
//# sourceMappingURL=facepi.service.js.map
