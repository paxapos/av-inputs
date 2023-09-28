'use strict';

exports.CameraDirection = void 0;
(function (CameraDirection) {
  CameraDirection["Rear"] = "REAR";
  CameraDirection["Front"] = "FRONT";
})(exports.CameraDirection || (exports.CameraDirection = {}));
/**
 * Crea un HTMLVideoElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement
 */
function createVideo() {
  // no existe, lo creo
  const video = document.createElement("video");
  video.autoplay = true;
  video.style.display = "none";
  return video;
}
/**
 * Crea un HTMLCanvasElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement
 */
function createCanvas(parentElement) {
  // no existe, lo creo
  const canvas = document.createElement("canvas");
  canvas.width = parseInt(parentElement.getAttribute("width"));
  canvas.height = parseInt(parentElement.getAttribute("height"));
  return canvas;
}
function videoToCanvas(video, box) {
  return new Promise((resolve, reject) => {
    try {
      const canvas = document.createElement("canvas");
      const { originX, originY, width, height } = box;
      const upscaledW = width * 1.3;
      const upscaledH = height * 2;
      const finalW = upscaledW > upscaledH ? upscaledW : upscaledH;
      const finalH = upscaledW > upscaledH ? upscaledW : upscaledH;
      canvas.width = finalW;
      canvas.height = finalH;
      const ctx = canvas.getContext('2d');
      const xMove = ((finalW - width) / 2);
      const yMove = ((finalH - height) / 2);
      ctx.drawImage(video, originX - xMove, originY - yMove, finalW, finalH, 0, 0, canvas.width, canvas.height);
      resolve(canvas);
    }
    catch (error) {
      reject(error);
    }
  });
}
function videoToBlob(video, box, compression = 0.85) {
  return new Promise((resolve, reject) => {
    try {
      videoToCanvas(video, box).then(canvas => {
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg", compression);
      });
    }
    catch (error) {
      reject(error);
    }
  });
}
function renderToCanvas(canvas, video, drawImageCb) {
  let ctx = canvas.getContext('2d');
  let imgWidth = video.videoWidth;
  let imgHeight = video.videoHeight;
  var imgSize = Math.min(imgWidth, imgHeight);
  // The following two lines yield a central based cropping.
  // They can both be amended to be 0, if you wish it to be
  // a left based cropped image.
  var left = (imgWidth - imgSize) / 2;
  var top = (imgHeight - imgSize) / 2;
  if (drawImageCb) {
    drawImageCb.call(this, ctx, video, left, top, imgSize, imgSize, 0, 0, canvas.width, canvas.height);
  }
  else {
    ctx.drawImage(video, left, top, imgSize, imgSize, 0, 0, canvas.width, canvas.height);
  }
  return requestAnimationFrame(() => renderToCanvas(canvas, video, drawImageCb));
}
async function takePicture(canvas, compression = 0.85) {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        const filename = "pic_" + Math.abs(Math.round(Math.random() * 1000));
        var file = new File([blob], filename, { type: "image/jpeg" });
        resolve(file);
      }, "image/jpeg", compression);
    }
    catch (error) {
      reject(error);
    }
  });
}
function initWebcamToVideo(video, direction = exports.CameraDirection.Front) {
  return new Promise((resolve, reject) => {
    if (navigator.mediaDevices.getUserMedia) {
      const facingMode = (direction == exports.CameraDirection.Front) ? "user" : "environment";
      navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          width: { min: 200 },
          height: { min: 200 },
          facingMode: facingMode
        }
      })
        .then((stream) => {
        video.srcObject = stream;
        resolve(stream);
      })
        .catch(function (err0r) {
        reject(err0r);
      });
    }
  });
}

exports.createCanvas = createCanvas;
exports.createVideo = createVideo;
exports.initWebcamToVideo = initWebcamToVideo;
exports.renderToCanvas = renderToCanvas;
exports.takePicture = takePicture;
exports.videoToBlob = videoToBlob;

//# sourceMappingURL=camera.service-fdec3dd0.js.map