import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { c as createVideo, a as createCanvas, i as initWebcamToVideo, r as renderToCanvas, t as takePicture, C as CameraDirection } from './camera.service.js';

class WebCamera {
  async initCamera(parentElement, direction, drawImageCb = null) {
    this.resetCamera();
    if (!this.elVideo) {
      this.elVideo = createVideo();
    }
    if (!this.canvas) {
      this.canvas = createCanvas(parentElement);
      parentElement.appendChild(this.canvas);
    }
    initWebcamToVideo(this.elVideo, direction);
    renderToCanvas(this.canvas, this.elVideo, drawImageCb);
    return this.canvas;
  }
  resetCamera() {
    var _a, _b;
    if (this.stream)
      (_b = (_a = this.stream) === null || _a === void 0 ? void 0 : _a.getVideoTracks()) === null || _b === void 0 ? void 0 : _b.forEach(track => {
        var _a;
        track === null || track === void 0 ? void 0 : track.stop();
        (_a = this.stream) === null || _a === void 0 ? void 0 : _a.removeTrack(track);
      });
    if (this.elVideo)
      this.elVideo.srcObject = null;
  }
  async takePicture() {
    return await takePicture(this.canvas);
  }
}
const camera = new WebCamera();

const inputFileFromWebcamCss = ":host{display:inline-block;width:100px;filter:drop-shadow(2px 4px 6px black);border:#5a5252 1px solid;border-style:groove}video{display:none}canvas{width:100%;height:100%}";

const InputFileFromWebcam$1 = /*@__PURE__*/ proxyCustomElement(class InputFileFromWebcam extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.pictureTaken = createEvent(this, "pictureTaken", 6);
    this.facingModeChanged = createEvent(this, "facingModeChanged", 6);
    this.width = 460;
    this.height = 460;
    this.facingMode = CameraDirection.Front;
    this.drawImageCb = null;
  }
  async takePic() {
    // show a prompt
    const pic = await camera.takePicture();
    this.pictureTaken.emit(pic);
    return pic;
  }
  async resetCamera() {
    // show a prompt
    camera.resetCamera();
  }
  async toggleCamera() {
    this.__toogleFacingMode();
  }
  onClickHandler() {
    this.__toogleFacingMode();
  }
  /**
   * Toogle webcam, for example in mobile show front or back camera
   * you can block this behaviour by setting the facingMode Property
   */
  __toogleFacingMode() {
    // only change if no facinMode property was set
    this.facingMode = (this.facingMode != CameraDirection.Front) ? CameraDirection.Front : CameraDirection.Rear;
    this.facingModeChanged.emit(this.facingMode);
  }
  componentWillMount() {
  }
  async componentDidRender() {
    camera.initCamera(this.el, CameraDirection.Front, this.drawImageCb);
  }
  async disconnectedCallback() {
    camera.resetCamera();
  }
  render() {
    return (h(Host, { style: { height: this.height + "px", width: this.width + "px" } }, h("slot", { name: 'before' }), h("slot", null), h("slot", { name: 'after' })));
  }
  get el() { return this; }
  static get style() { return inputFileFromWebcamCss; }
}, [1, "input-file-from-webcam", {
    "width": [1538],
    "height": [1538],
    "facingMode": [1537, "facing-mode"],
    "drawImageCb": [16],
    "takePic": [64],
    "resetCamera": [64],
    "toggleCamera": [64]
  }, [[0, "click", "onClickHandler"]]]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["input-file-from-webcam"];
  components.forEach(tagName => { switch (tagName) {
    case "input-file-from-webcam":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, InputFileFromWebcam$1);
      }
      break;
  } });
}

const InputFileFromWebcam = InputFileFromWebcam$1;
const defineCustomElement = defineCustomElement$1;

export { InputFileFromWebcam, defineCustomElement };

//# sourceMappingURL=input-file-from-webcam.js.map