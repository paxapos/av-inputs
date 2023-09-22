'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-86473b3d.js');
const camera_service = require('./camera.service-fdec3dd0.js');

class WebCamera {
  async initCamera(parentElement, direction, drawImageCb = null) {
    this.resetCamera();
    if (!this.elVideo) {
      this.elVideo = camera_service.createVideo();
    }
    if (!this.canvas) {
      this.canvas = camera_service.createCanvas(parentElement);
      parentElement.appendChild(this.canvas);
    }
    camera_service.initWebcamToVideo(this.elVideo, direction);
    camera_service.renderToCanvas(this.canvas, this.elVideo, drawImageCb);
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
    return await camera_service.takePicture(this.canvas);
  }
}
const camera = new WebCamera();

const inputFileFromWebcamCss = ":host{display:inline-block;width:100px;filter:drop-shadow(2px 4px 6px black);border:#5a5252 1px solid;border-style:groove}video{display:none}canvas{width:100%;height:100%}";

const InputFileFromWebcam = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.pictureTaken = index.createEvent(this, "pictureTaken", 6);
    this.facingModeChanged = index.createEvent(this, "facingModeChanged", 6);
    this.width = 460;
    this.height = 460;
    this.facingMode = camera_service.CameraDirection.Front;
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
    this.facingMode = (this.facingMode != camera_service.CameraDirection.Front) ? camera_service.CameraDirection.Front : camera_service.CameraDirection.Rear;
    this.facingModeChanged.emit(this.facingMode);
  }
  componentWillMount() {
  }
  async componentDidRender() {
    camera.initCamera(this.el, camera_service.CameraDirection.Front, this.drawImageCb);
  }
  async disconnectedCallback() {
    camera.resetCamera();
  }
  render() {
    return (index.h(index.Host, { style: { height: this.height + "px", width: this.width + "px" } }, index.h("slot", { name: 'before' }), index.h("slot", null), index.h("slot", { name: 'after' })));
  }
  get el() { return index.getElement(this); }
};
InputFileFromWebcam.style = inputFileFromWebcamCss;

exports.input_file_from_webcam = InputFileFromWebcam;

//# sourceMappingURL=input-file-from-webcam.cjs.entry.js.map