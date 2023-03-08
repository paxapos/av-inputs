import { p as promiseResolve, b as bootstrapLazy } from './index-3064199e.js';
export { s as setNonce } from './index-3064199e.js';

/*
 Stencil Client Patch Browser v3.1.0 | MIT Licensed | https://stenciljs.com
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
  return bootstrapLazy([["input-file-from-webcam",[[1,"input-file-from-webcam",{"width":[2],"height":[2],"facingMode":[1,"facing-mode"],"drawImageCb":[16],"__facingMode":[32],"takePic":[64]},[[0,"click","onClickHandler"]]]]]], options);
});

//# sourceMappingURL=input-file-from-webcam.js.map