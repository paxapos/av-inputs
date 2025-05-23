import { B as BUILD, c as consoleDevInfo, H, w as win, N as NAMESPACE, p as promiseResolve, b as bootstrapLazy } from './index-D0R_KwCh.js';
export { s as setNonce } from './index-D0R_KwCh.js';
import { g as globalScripts } from './app-globals-DQuL1Twl.js';

/*
 Stencil Client Patch Browser v4.31.0 | MIT Licensed | https://stenciljs.com
 */

var patchBrowser = () => {
  if (BUILD.isDev && !BUILD.isTesting) {
    consoleDevInfo("Running in development mode.");
  }
  if (BUILD.cloneNodeFix) {
    patchCloneNodeFix(H.prototype);
  }
  const scriptElm = BUILD.scriptDataOpts ? win.document && Array.from(win.document.querySelectorAll("script")).find(
    (s) => new RegExp(`/${NAMESPACE}(\\.esm)?\\.js($|\\?|#)`).test(s.src) || s.getAttribute("data-stencil-namespace") === NAMESPACE
  ) : null;
  const importMeta = import.meta.url;
  const opts = BUILD.scriptDataOpts ? (scriptElm || {})["data-opts"] || {} : {};
  if (importMeta !== "") {
    opts.resourcesUrl = new URL(".", importMeta).href;
  }
  return promiseResolve(opts);
};
var patchCloneNodeFix = (HTMLElementPrototype) => {
  const nativeCloneNodeFn = HTMLElementPrototype.cloneNode;
  HTMLElementPrototype.cloneNode = function(deep) {
    if (this.nodeName === "TEMPLATE") {
      return nativeCloneNodeFn.call(this, deep);
    }
    const clonedNode = nativeCloneNodeFn.call(this, false);
    const srcChildNodes = this.childNodes;
    if (deep) {
      for (let i = 0; i < srcChildNodes.length; i++) {
        if (srcChildNodes[i].nodeType !== 2) {
          clonedNode.appendChild(srcChildNodes[i].cloneNode(true));
        }
      }
    }
    return clonedNode;
  };
};

patchBrowser().then(async (options) => {
  await globalScripts();
  return bootstrapLazy([["input-barcode",[[0,"input-barcode",{"cameraId":[1,"camera-id"],"width":[1],"height":[1],"supportedFormats":[16,"supported-formats"],"facingMode":[1,"facing-mode"],"cameraConfig":[16,"camera-config"],"getState":[64],"stop":[64],"start":[64],"getCameras":[64]}]]],["input-face-api-webcam",[[1,"input-face-api-webcam",{"enableDetection":[1540,"enable-detection"],"showControls":[4,"show-controls"],"autoStart":[4,"auto-start"],"showBoundingBoxes":[4,"show-bounding-boxes"],"showLandmarks":[4,"show-landmarks"],"startButtonText":[1,"start-button-text"],"stopButtonText":[1,"stop-button-text"],"flipButtonText":[1,"flip-button-text"],"trainedModel":[16,"trained-model"],"width":[1538],"height":[1538],"scoreThreshold":[1538,"score-threshold"],"detectionTimer":[1538,"detection-timer"],"facingMode":[1537,"facing-mode"],"autoCapture":[4,"auto-capture"],"captureThreshold":[2,"capture-threshold"],"captureDelay":[2,"capture-delay"],"detectionResult":[32],"loaded":[32],"cameraState":[32],"currentError":[32],"detectedFacesCount":[32],"isRecognizing":[32],"stopDetection":[64],"startDetection":[64],"toggleCamera":[64],"initializeCamera":[64],"getBlobImageDescriptors":[64],"getFaceLandMarks":[64],"predictBestMatch":[64],"getDiagnosticInfo":[64]},null,{"detectionResult":["detectionResultChangedHandler"]}]]],["input-file-from-webcam",[[1,"input-file-from-webcam",{"width":[1538],"height":[1538],"facingMode":[1537,"facing-mode"],"showControls":[4,"show-controls"],"autoStart":[4,"auto-start"],"imageQuality":[2,"image-quality"],"flashEffect":[4,"flash-effect"],"captureButtonText":[1,"capture-button-text"],"flipButtonText":[1,"flip-button-text"],"drawImageCb":[16,"draw-image-cb"],"cameraState":[32],"isFlipped":[32],"startCamera":[64],"stopCamera":[64],"takePic":[64],"resetCamera":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]],{"facingMode":["onFacingModeChange"]}]]],["input-scan-reader",[[1,"input-scan-reader",{"modalTimer":[2,"modal-timer"],"scanTitle":[1,"scan-title"],"reading":[32],"readingEnabled":[32],"scannedText":[32],"timeout":[32],"getText":[64],"getData":[64],"start":[64],"stop":[64]},[[0,"scan","handleScan"],[4,"keydown","handleKeyDown"]],{"scannedText":["watchScannedTextHandler"]}]]]], options);
});
//# sourceMappingURL=av-inputs.js.map

//# sourceMappingURL=av-inputs.js.map