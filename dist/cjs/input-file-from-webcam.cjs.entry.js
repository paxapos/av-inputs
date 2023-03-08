'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-97ab21e5.js');

class CameraService {
  constructor() {
  }
  initCamera(elVideo, elCanvas, facingMode = { exact: "user" }, drawImageCb = null) {
    this.resetCamera();
    this.elVideo = elVideo;
    this.canvas = elCanvas;
    this.elVideo.parentNode.insertBefore(this.canvas, this.elVideo.nextSibling);
    if (navigator.mediaDevices.getUserMedia) {
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
  async takePic() {
    return new Promise((resolve, reject) => {
      try {
        this.canvas.toBlob((blob) => {
          const filename = "pic_" + Math.abs(Math.round(Math.random() * 1000));
          var file = new File([blob], filename);
          resolve(file);
        });
      }
      catch (error) {
        reject(error);
      }
    });
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
    this.facingMode = null;
    this.drawImageCb = null;
    this.__facingMode = 'user';
  }
  async takePic() {
    // show a prompt
    const pic = await camera.takePic();
    this.pictureTaken.emit(pic);
    return pic;
  }
  onClickHandler() {
    this.__toogleFacingMode();
  }
  /**
   * Toogle webcam, for example in mobile show front or back camera
   * you can block this behaviour by setting the facingMode Property
   */
  __toogleFacingMode() {
    if (this.facingMode == null) {
      // only change if no facinMode property was set
      this.__facingMode = (this.__facingMode == "environment") ? "user" : "environment";
      this.facingModeChanged.emit(this.__createfacingModeConstrainDOMString());
    }
  }
  __createfacingModeConstrainDOMString() {
    return { ideal: this.__facingMode };
  }
  componentWillMount() {
    if (this.facingMode) {
      this.__facingMode = this.facingMode;
    }
  }
  async componentDidRender() {
    camera.initCamera(this.elVideo, this.elCanvas, this.__createfacingModeConstrainDOMString(), this.drawImageCb);
  }
  async disconnectedCallback() {
    camera.resetCamera();
  }
  render() {
    return (index.h(index.Host, null, index.h("slot", { name: 'before' }), index.h("video", { autoplay: "true", ref: (el) => this.elVideo = el }), index.h("canvas", { ref: (el) => this.elCanvas = el, width: this.width, height: this.height }), index.h("slot", null), index.h("slot", { name: 'after' })));
  }
};
InputFileFromWebcam.style = inputFileFromWebcamCss;

exports.input_file_from_webcam = InputFileFromWebcam;

//# sourceMappingURL=input-file-from-webcam.cjs.entry.js.map