import { getAssetPath } from '@stencil/core';
import * as faceapi from 'face-api.js';
/**
 * create a class "FaceapiService" with a constructor
 *
*/
export class FaceapiService {
  constructor() {
    this.modelLoaded = false;
    // init models
    const MODEL_URL = getAssetPath('/assets/models');
    faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL).then(() => {
      this.modelLoaded = true;
    });
  }
  async detectFace(el, inputSize = 192, scoreThreshold = 0.7) {
    if (this.modelLoaded) {
      // TinyFaceDetectorOptions
      const ops = new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
      return await faceapi.detectSingleFace(el, ops);
    }
  }
}
//# sourceMappingURL=facepi.service.js.map
