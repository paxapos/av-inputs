import { createVideo, createCanvas, CameraDirection } from "./camera.service";
export class WebCamera {
  constructor() {
  }
  async initCamera(parentElement, direction, drawImageCb = null) {
    this.resetCamera();
    this.elVideo = createVideo(parentElement);
    this.canvas = createCanvas(parentElement);
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
export class CameraService {
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
export const camera = new CameraService();
//# sourceMappingURL=camera.js.map
