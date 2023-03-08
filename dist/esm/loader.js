import { p as promiseResolve, b as bootstrapLazy } from './index-3064199e.js';
export { s as setNonce } from './index-3064199e.js';

/*
 Stencil Client Patch Esm v3.1.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["input-file-from-webcam",[[1,"input-file-from-webcam",{"width":[2],"height":[2],"facingMode":[1,"facing-mode"],"drawImageCb":[16],"__facingMode":[32],"takePic":[64]},[[0,"click","onClickHandler"]]]]]], options);
  });
};

export { defineCustomElements };

//# sourceMappingURL=loader.js.map