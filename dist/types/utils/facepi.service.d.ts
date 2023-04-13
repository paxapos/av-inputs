import * as faceapi from 'face-api.js';
/**
 * create a class "FaceapiService" with a constructor
 *
*/
export declare class FaceapiService {
  modelLoaded: boolean;
  constructor();
  detectFace(el: HTMLVideoElement | HTMLCanvasElement, inputSize?: number, scoreThreshold?: number): Promise<faceapi.FaceDetection>;
}
