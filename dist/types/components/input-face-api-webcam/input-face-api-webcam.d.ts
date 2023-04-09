import { EventEmitter } from '../../stencil-public-runtime';
import { FaceapiService } from '../../utils/facepi.service';
import { FaceDetection } from 'face-api.js';
export declare class InputFaceApiWebcam {
  photoCanvas: HTMLCanvasElement;
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  faceapiService: FaceapiService;
  el: HTMLElement;
  isDetecting: boolean;
  photoPicMinValue?: number;
  width?: number;
  height?: number;
  stopDetection(): Promise<void>;
  startDetection(): Promise<void>;
  faceDetected: EventEmitter<Blob>;
  faceMinValueError: EventEmitter<FaceDetection>;
  componentWillLoad(): Promise<void>;
  componentDidRender(): Promise<void>;
  disconnectedCallback(): Promise<void>;
  /**
   *
   * @param result
   * @returns true si proceso y detecto imagen
   */
  __processReturn(result: any): boolean;
  drawCanvasNoFace(): void;
  webcamRender(): Promise<void>;
  render(): any;
}
