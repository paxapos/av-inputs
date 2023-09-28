'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-efff27e4.js');

/*
 Stencil Client Patch Browser v4.0.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('av-inputs.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["input-barcode.cjs",[[0,"input-barcode",{"cameraId":[1,"camera-id"],"width":[1],"height":[1],"supportedFormats":[16],"facingMode":[1,"facing-mode"],"cameraConfig":[16],"getState":[64],"stop":[64],"start":[64],"getCameras":[64]}]]],["input-face-api-webcam.cjs",[[1,"input-face-api-webcam",{"enableDetection":[1540,"enable-detection"],"trainedModel":[16],"width":[1538],"height":[1538],"scoreThreshold":[1538,"score-threshold"],"detectionTimer":[1538,"detection-timer"],"facingMode":[1537,"facing-mode"],"detectionResult":[32],"loaded":[32],"stopDetection":[64],"startDetection":[64],"getBlobImageDescriptors":[64],"getFaceLandMarks":[64],"predictBestMatch":[64]}]]],["input-file-from-webcam.cjs",[[1,"input-file-from-webcam",{"width":[1538],"height":[1538],"facingMode":[1537,"facing-mode"],"drawImageCb":[16],"takePic":[64],"resetCamera":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]]]]],["input-scan-reader.cjs",[[1,"input-scan-reader",{"modalTimer":[2,"modal-timer"],"scannedText":[32],"getText":[64],"getData":[64]},[[0,"scan","handleScan"],[4,"keydown","handleKeyDown"]]]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=av-inputs.cjs.js.map