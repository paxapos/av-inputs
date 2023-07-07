import { FaceDetector, Detection, FaceLandmarker, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
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
  landmarksDetector: FaceLandmarker;
  constructor(minDetectionConfidence?: number);
  initFaceLandmarkerDetector(): Promise<void>;
  initializefaceDetector(minDetectionConfidence: any): Promise<void>;
  getFaceLandmarksFromBlob(blob: Blob): Promise<FaceLandmarkerResult>;
  detectFace(el: HTMLVideoElement, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg>;
  getDetectorImgFromDetection(el: any, detection: Detection): Promise<DetectionImg>;
}
