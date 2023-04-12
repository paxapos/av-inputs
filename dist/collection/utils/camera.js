import { createVideo, createCanvas, initWebcamToVideo, renderToCanvas, takePicture } from "./camera.service";
export class WebCamera {
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
export const camera = new WebCamera();
//# sourceMappingURL=camera.js.map
