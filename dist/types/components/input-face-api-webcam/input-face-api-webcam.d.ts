/// <reference types="node" />
import { EventEmitter } from '../../stencil-public-runtime';
import { FaceapiService } from '../../utils/facepi.service';
import { FaceDetection } from 'face-api.js';
export interface iFaceDetected {
  blob: Blob;
  result: FaceDetection;
}
export declare class InputFaceApiWebcam {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  faceapiService: FaceapiService;
  resultTimer: NodeJS.Timeout;
  result: FaceDetection;
  curCords: {
    x: number;
    y: number;
  };
  toCords: {
    x: number;
    y: number;
  };
  el: HTMLElement;
  isDetecting: boolean;
  width?: number;
  height?: number;
  /** Minimun input size of face */
  inputSize?: number;
  scoreThreshold?: number;
  detectionTimer?: number;
  stopDetection(): Promise<void>;
  startDetection(): Promise<void>;
  faceDetected: EventEmitter<iFaceDetected>;
  faceStopDetection: EventEmitter<void>;
  componentWillLoad(): Promise<void>;
  componentDidRender(): Promise<void>;
  /**
   *
   * @param result
   * @returns true si proceso y detecto imagen
   */
  emitBlob(result: any): Promise<Blob>;
  webcamRender(): Promise<void>;
  drawWebcamnToCanvas(ctx: any): void;
  render(): any;
}
