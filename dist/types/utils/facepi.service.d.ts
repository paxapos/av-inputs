import * as faceapi from 'face-api.js';
/**
 * create a class "FaceapiService" with a constructor
 *
*/
export declare class FaceapiService {
  video: HTMLVideoElement;
  canvas: HTMLCanvasElement;
  modelLoaded: boolean;
  constructor(video: HTMLVideoElement, canvas: HTMLCanvasElement);
  detectFace(): Promise<faceapi.FaceDetection>;
}
