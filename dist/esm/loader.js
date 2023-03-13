import { p as promiseResolve, b as bootstrapLazy } from './index-c1c8f3ff.js';
export { s as setNonce } from './index-c1c8f3ff.js';

/*
 Stencil Client Patch Esm v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["input-file-from-webcam",[[1,"input-file-from-webcam",{"width":[2],"height":[2],"facingMode":[1537,"facing-mode"],"drawImageCb":[16],"takePic":[64],"toggleCamera":[64]},[[0,"click","onClickHandler"]]]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map