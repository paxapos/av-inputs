import { r as registerInstance, a as createEvent, h, H as Host, g as getElement } from './index-a881ea83.js';
import { c as createVideo, a as createCanvas, i as initWebcamToVideo, r as renderToCanvas, t as takePicture, C as CameraDirection } from './camera.service-263a32a0.js';

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

const InputFileFromWebcam = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.pictureTaken = createEvent(this, "pictureTaken", 6);
    this.facingModeChanged = createEvent(this, "facingModeChanged", 6);
    this.width = 460;
    this.height = 460;
    this.facingMode = CameraDirection.Front;
    this.drawImageCb = null;
  }
  /**
   * Take a picture
   * @returns a blob with the image
   */
  async takePic() {
    // show a prompt
    const pic = await camera.takePicture();
    this.pictureTaken.emit(pic);
    return pic;
  }
  /**
   * Reset camera
   */
  async resetCamera() {
    // show a prompt
    camera.resetCamera();
  }
  /**
   * Toogle webcam, for example in mobile show front or back camera
   */
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
  get el() { return getElement(this); }
};
InputFileFromWebcam.style = inputFileFromWebcamCss;

export { InputFileFromWebcam as input_file_from_webcam };

//# sourceMappingURL=input-file-from-webcam.entry.js.map