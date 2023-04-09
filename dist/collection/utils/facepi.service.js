import { getAssetPath } from '@stencil/core';
import * as faceapi from 'face-api.js';
/**
 * create a class "FaceapiService" with a constructor
 *
*/
export class FaceapiService {
  constructor(video, canvas) {
    this.modelLoaded = false;
    this.video = video;
    this.canvas = canvas;
    // init models
    const MODEL_URL = getAssetPath('/assets/models');
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL).then(() => {
      this.modelLoaded = true;
    });
  }
  async detectFace() {
    if (this.modelLoaded) {
      // TinyFaceDetectorOptions
      const inputSize = 192;
      const scoreThreshold = 0.7;
      const ops = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
      return await faceapi.detectSingleFace(this.video, ops);
    }
  }
}
//# sourceMappingURL=facepi.service.js.map
