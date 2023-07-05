'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-cb5fb640.js');

/*
 Stencil Client Patch Browser v3.2.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('input-file-from-webcam.cjs.js', document.baseURI).href));
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["input-face-api-webcam_3.cjs",[[1,"input-face-api-webcam",{"width":[1538],"height":[1538],"inputSize":[1538,"input-size"],"scoreThreshold":[1538,"score-threshold"],"detectionTimer":[1538,"detection-timer"],"facingMode":[1537,"facing-mode"],"isDetecting":[32],"stopDetection":[64],"startDetection":[64]}],[1,"input-file-from-webcam",{"width":[1538],"height":[1538],"facingMode":[1537,"facing-mode"],"drawImageCb":[16],"takePic":[64],"resetCamera":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]]],[1,"input-scan-reader",{"scannedText":[32],"scannedData":[32],"showPrompt":[64]},[[4,"keydown","handleKeyDown"]]]]]], options);
});

exports.setNonce = index.setNonce;

//# sourceMappingURL=input-file-from-webcam.cjs.js.map