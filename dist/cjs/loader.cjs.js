'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-cb5fb640.js');

/*
 Stencil Client Patch Esm v3.2.1 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["input-face-api-webcam_3.cjs",[[1,"input-face-api-webcam",{"width":[1538],"height":[1538],"inputSize":[1538,"input-size"],"scoreThreshold":[1538,"score-threshold"],"detectionTimer":[1538,"detection-timer"],"facingMode":[1537,"facing-mode"],"isDetecting":[32],"stopDetection":[64],"startDetection":[64]}],[1,"input-file-from-webcam",{"width":[1538],"height":[1538],"facingMode":[1537,"facing-mode"],"drawImageCb":[16],"takePic":[64],"resetCamera":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]]],[1,"input-scan-reader",{"scannedText":[32],"scannedData":[32],"showPrompt":[64]},[[4,"keydown","handleKeyDown"]]]]]], options);
  });
};

exports.setNonce = index.setNonce;
exports.defineCustomElements = defineCustomElements;

//# sourceMappingURL=loader.cjs.js.map