import { FaceDetector, Detection } from "@mediapipe/tasks-vision";
export interface DetectionImg {
  detection: Detection;
  currentTarget: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
  blobImg: Blob;
}
/**
 * create a class "FaceapiService" with a constructor
 *
*/
export declare class FaceapiService {
  faceDetector: FaceDetector;
  constructor(minDetectionConfidence?: number);
  initializefaceDetector(minDetectionConfidence: any): Promise<void>;
  detectFace(el: HTMLVideoElement, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg>;
  getDetectorImgFromDetection(el: any, detection: Detection): Promise<DetectionImg>;
}
