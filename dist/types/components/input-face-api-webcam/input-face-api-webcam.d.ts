import { EventEmitter } from '../../stencil-public-runtime';
import { DetectionImg } from '../../utils/facepi.service';
import { CameraDirection } from '../../utils/camera.service';
import { Detection, FaceLandmarkerResult } from '@mediapipe/tasks-vision';
import { LabeledDescriptorsArray } from './TrainedModel';
export interface iFaceDetected {
  blob: Blob;
  result: Detection;
}
export declare class InputFaceApiWebcam {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  el: HTMLElement;
  detectionResult: DetectionImg;
  loaded: boolean;
  detectionResultChangedHandler(newValue: DetectionImg, oldValue: DetectionImg): void;
  /**
   * disable face detection
   */
  enableDetection: boolean;
  /**
   * trained models to use for recognition an best match
   */
  trainedModel?: LabeledDescriptorsArray;
  /**
   * Width of the video element
   */
  width?: number;
  /**
   * height of the video element
   */
  height?: number;
  /**
   * Score threshold to detect a face
   */
  scoreThreshold?: number;
  /**
   * Score threshold to detect a face
   */
  detectionTimer?: number;
  /**
   * FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
   */
  facingMode?: CameraDirection;
  /**
   * disable face detection
   */
  stopDetection(): Promise<void>;
  /**
   * enable face detection
   */
  startDetection(): Promise<void>;
  /**
   * Giving a blob image, get the face landmarks
   * @returns face landmarks
   */
  getBlobImageDescriptors(blob: Blob): Promise<FaceLandmarkerResult>;
  /**
   * Giving current face in video canvas, get the face landmarks
   * @returns face landmarks
   */
  getFaceLandMarks(): Promise<FaceLandmarkerResult>;
  /**
   * Predicts best face match, uses worker to calculate distance between the given blob and the trained model
   * passed in trainedModel prop
   * @param blob
   * @returns
   */
  predictBestMatch(blob?: Blob): Promise<any>;
  /**
   * Event emitted when a face is detected in video stream
   */
  faceDetected: EventEmitter<DetectionImg>;
  /**
   * Event emitted when face detection whas stopped
   */
  faceStopDetection: EventEmitter<void>;
  componentWillLoad(): Promise<void>;
  lastVideoTime: number;
  webcamRender(): Promise<void>;
  drawWebcamnToCanvas(ctx: any): void;
  render(): any;
}
