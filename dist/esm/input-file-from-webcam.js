import { p as promiseResolve, b as bootstrapLazy } from './index-43de6b73.js';
export { s as setNonce } from './index-43de6b73.js';

/*
 Stencil Client Patch Browser v3.2.1 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
        // TODO(STENCIL-661): Remove code related to the dynamic import shim
        // TODO(STENCIL-663): Remove code related to deprecated `safari10` field.
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["input-face-api-webcam_2",[[1,"input-face-api-webcam",{"width":[1538],"height":[1538],"inputSize":[1538,"input-size"],"scoreThreshold":[1538,"score-threshold"],"detectionTimer":[1538,"detection-timer"],"facingMode":[1537,"facing-mode"],"isDetecting":[32],"stopDetection":[64],"startDetection":[64]}],[1,"input-file-from-webcam",{"width":[1538],"height":[1538],"facingMode":[1537,"facing-mode"],"drawImageCb":[16],"takePic":[64],"resetCamera":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]]]]]], options);
});

//# sourceMappingURL=input-file-from-webcam.js.map