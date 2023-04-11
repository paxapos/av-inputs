import { p as promiseResolve, b as bootstrapLazy } from './index-43de6b73.js';
export { s as setNonce } from './index-43de6b73.js';

/*
 Stencil Client Patch Esm v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["input-face-api-webcam_2",[[1,"input-face-api-webcam",{"width":[1538],"height":[1538],"detectionTimer":[1538,"detection-timer"],"isDetecting":[32],"stopDetection":[64],"startDetection":[64]}],[1,"input-file-from-webcam",{"width":[1538],"height":[1538],"facingMode":[1537,"facing-mode"],"drawImageCb":[16],"takePic":[64],"resetCamera":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]]]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map