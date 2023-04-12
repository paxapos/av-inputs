import { EventEmitter } from '../../stencil-public-runtime';
import { FaceapiService } from '../../utils/facepi.service';
import { FaceDetection } from 'face-api.js';
export declare class InputFaceApiWebcam {
  faceFound: Blob;
  photoCanvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  faceapiService: FaceapiService;
  pictureTimer: any;
  result: FaceDetection;
  noDetectedCounter: number;
  el: HTMLElement;
  isDetecting: boolean;
  width?: number;
  height?: number;
  detectionTimer?: number;
  stopDetection(): Promise<void>;
  startDetection(): Promise<void>;
  faceDetected: EventEmitter<Blob>;
  faceStopDetection: EventEmitter<void>;
  componentWillLoad(): Promise<void>;
  componentDidRender(): Promise<void>;
  disconnectedCallback(): Promise<void>;
  /**
   *
   * @param result
   * @returns true si proceso y detecto imagen
   */
  getPicZoom(): Promise<Blob>;
  zoomTimer: any;
  tcoords: {
    z: number;
    x: number;
    y: number;
  };
  handleStopDetection(): void;
  webcamRender(): Promise<void>;
  drawWebcamnToCanvas(ctx: any): void;
  render(): any;
}
