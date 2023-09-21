import { Detection, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
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
  private readonly minDetectionConfidence;
  private faceDetector;
  private landmarksDetector;
  constructor(minDetectionConfidence?: number);
  initialize(): Promise<this>;
  initFaceLandmarkerDetector(): Promise<void>;
  initializefaceDetector(minDetectionConfidence: any): Promise<void>;
  checkInitialized(): void;
  getFaceLandmarksFromBlob(blob: Blob): Promise<FaceLandmarkerResult>;
  detectFace(el: HTMLVideoElement, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg>;
  getDetectorImgFromDetection(el: any, detection: Detection): Promise<DetectionImg>;
}
export declare const faceapiService: FaceapiService;
