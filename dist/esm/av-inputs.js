import { p as promiseResolve, b as bootstrapLazy } from './index-a881ea83.js';
export { s as setNonce } from './index-a881ea83.js';

/*
 Stencil Client Patch Browser v4.0.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["input-face-api-webcam",[[1,"input-face-api-webcam",{"enableDetection":[1540,"enable-detection"],"trainedModel":[16],"width":[1538],"height":[1538],"scoreThreshold":[1538,"score-threshold"],"detectionTimer":[1538,"detection-timer"],"facingMode":[1537,"facing-mode"],"detectionResult":[32],"loaded":[32],"stopDetection":[64],"startDetection":[64],"getBlobImageDescriptors":[64],"getFaceLandMarks":[64],"predictBestMatch":[64]}]]],["input-file-from-webcam",[[1,"input-file-from-webcam",{"width":[1538],"height":[1538],"facingMode":[1537,"facing-mode"],"drawImageCb":[16],"takePic":[64],"resetCamera":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]]]]],["input-scan-reader",[[1,"input-scan-reader",{"modalTimer":[2,"modal-timer"],"scannedText":[32],"getText":[64],"getData":[64]},[[0,"scan","handleScan"],[4,"keydown","handleKeyDown"]]]]]], options);
});

//# sourceMappingURL=av-inputs.js.map