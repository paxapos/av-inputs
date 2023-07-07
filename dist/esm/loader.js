import { b as bootstrapLazy } from './index-d2dd3154.js';
export { s as setNonce } from './index-d2dd3154.js';

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return bootstrapLazy([["input-face-api-webcam_3",[[1,"input-face-api-webcam",{"width":[1538],"height":[1538],"scoreThreshold":[1538,"score-threshold"],"detectionTimer":[1538,"detection-timer"],"facingMode":[1537,"facing-mode"],"enableDetection":[32],"isDetecting":[32],"detectionResult":[32],"stopDetection":[64],"startDetection":[64],"getFaceLandMarks":[64]}],[1,"input-file-from-webcam",{"width":[1538],"height":[1538],"facingMode":[1537,"facing-mode"],"drawImageCb":[16],"takePic":[64],"resetCamera":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]]],[1,"input-scan-reader",{"modalTimer":[2,"modal-timer"],"scannedText":[32],"getText":[64],"getData":[64]},[[0,"scan","handleScan"],[4,"keydown","handleKeyDown"]]]]]], options);
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map