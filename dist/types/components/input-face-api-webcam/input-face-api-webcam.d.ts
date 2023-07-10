import { EventEmitter } from '../../stencil-public-runtime';
import { DetectionImg, FaceapiService } from '../../utils/facepi.service';
import { CameraDirection } from '../../utils/camera.service';
import { Detection, FaceLandmarkerResult } from '@mediapipe/tasks-vision';
export interface iFaceDetected {
  blob: Blob;
  result: Detection;
}
export declare class InputFaceApiWebcam {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  faceapiService: FaceapiService;
  el: HTMLElement;
  enableDetection: boolean;
  isDetecting: boolean;
  detectionResult: DetectionImg;
  detectionResultChangedHandler(newValue: DetectionImg, oldValue: DetectionImg): void;
  width?: number;
  height?: number;
  scoreThreshold?: number;
  detectionTimer?: number;
  facingMode?: CameraDirection;
  stopDetection(): Promise<void>;
  startDetection(): Promise<void>;
  getBlobImageDescriptors(blob: Blob): Promise<FaceLandmarkerResult>;
  getFaceLandMarks(): Promise<FaceLandmarkerResult>;
  faceDetected: EventEmitter<DetectionImg>;
  faceStopDetection: EventEmitter<void>;
  componentWillLoad(): Promise<void>;
  lastVideoTime: number;
  webcamRender(): Promise<void>;
  drawWebcamnToCanvas(ctx: any): void;
  render(): any;
}
