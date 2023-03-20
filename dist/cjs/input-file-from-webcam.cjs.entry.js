'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-b1cac988.js');

var CameraDirection;
(function (CameraDirection) {
  CameraDirection["Rear"] = "REAR";
  CameraDirection["Front"] = "FRONT";
})(CameraDirection || (CameraDirection = {}));
class WebCamera {
  constructor() {
  }
  async initCamera(parentElement, direction, drawImageCb = null) {
    this.resetCamera();
    const videos = parentElement.getElementsByTagName("video");
    if (videos.length == 0) {
      this.elVideo = document.createElement("video");
      this.elVideo.autoplay = true;
      this.elVideo.style.display = "none";
      parentElement.appendChild(this.elVideo);
    }
    else {
      this.elVideo = videos[0];
    }
    const canvasss = parentElement.getElementsByTagName("canvas");
    if (canvasss.length === 0) {
      this.canvas = document.createElement("canvas");
      this.canvas.width = parseInt(parentElement.getAttribute("width"));
      this.canvas.height = parseInt(parentElement.getAttribute("height"));
      parentElement.appendChild(this.canvas);
    }
    else {
      this.canvas = canvasss[0];
    }
    this.direction = CameraDirection.Front;
    if (navigator.mediaDevices.getUserMedia) {
      console.info("la camara");
      const facingMode = (direction == CameraDirection.Front) ? "user" : "environment";
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { min: 200 },
          height: { min: 200 },
          facingMode: facingMode
        }
      })
        .then((stream) => {
        this.stream = stream;
        console.info("la camara", this.stream);
        this.elVideo.srcObject = this.stream;
        this.renderToCanvas(drawImageCb);
      })
        .catch(function (err0r) {
        console.log("Something went wrong!", err0r);
      });
    }
  }
  renderToCanvas(drawImageCb = null) {
    let ctx = this.canvas.getContext('2d');
    let imgWidth = this.elVideo.videoWidth;
    let imgHeight = this.elVideo.videoHeight;
    var imgSize = Math.min(imgWidth, imgHeight);
    // The following two lines yield a central based cropping.
    // They can both be amended to be 0, if you wish it to be
    // a left based cropped image.
    var left = (imgWidth - imgSize) / 2;
    var top = (imgHeight - imgSize) / 2;
    if (typeof drawImageCb == 'function') {
      drawImageCb.call(ctx, this.elVideo, left, top, imgSize, imgSize, 0, 0, this.canvas.width, this.canvas.height);
    }
    else {
      ctx.drawImage(this.elVideo, left, top, imgSize, imgSize, 0, 0, this.canvas.width, this.canvas.height);
    }
    requestAnimationFrame(() => this.renderToCanvas());
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
    return new Promise((resolve, reject) => {
      try {
        this.canvas.toBlob((blob) => {
          const filename = "pic_" + Math.abs(Math.round(Math.random() * 1000));
          var file = new File([blob], filename, { type: "image/jpeg" });
          resolve(file);
        }, "image/jpeg", 0.8);
      }
      catch (error) {
        reject(error);
      }
    });
  }
}
class CameraService {
  constructor() {
    this.camaraManager = new WebCamera();
  }
  async initCamera(parentElement, cameraDirection, drawImageCb = null) {
    this.camaraManager.initCamera(parentElement, cameraDirection, drawImageCb);
  }
  async takePicture() {
    return await this.camaraManager.takePicture();
  }
  async resetCamera() {
    return await this.camaraManager.resetCamera();
  }
}
const camera = new CameraService();

const inputFileFromWebcamCss = ":host{display:inline-block;width:100px;filter:drop-shadow(2px 4px 6px black);border:#5a5252 1px solid;border-style:groove}video{display:none}canvas{width:100%;height:100%}";

const InputFileFromWebcam = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.pictureTaken = index.createEvent(this, "pictureTaken", 6);
    this.facingModeChanged = index.createEvent(this, "facingModeChanged", 6);
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
    return (index.h(index.Host, { style: { height: this.height + "px", width: this.width + "px" } }, index.h("slot", { name: 'before' }), index.h("slot", null), index.h("slot", { name: 'after' })));
  }
  get el() { return index.getElement(this); }
};
InputFileFromWebcam.style = inputFileFromWebcamCss;

exports.input_file_from_webcam = InputFileFromWebcam;

//# sourceMappingURL=input-file-from-webcam.cjs.entry.js.map