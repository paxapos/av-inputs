import { Host, h } from '@stencil/core';
import { FaceapiService } from '../../utils/facepi.service';
import { createCanvas, createVideo, initWebcamToVideo } from '../../utils/camera.service';
export class InputFaceApiWebcam {
  constructor() {
    this.faceFound = null;
    // timer to detect face bassed on detectionTimer
    this.pictureTimer = null;
    // last result
    this.result = null;
    this.isDetecting = true;
    this.width = 460;
    this.height = 460;
    this.detectionTimer = 1000;
  }
  async stopDetection() {
    this.isDetecting = false;
  }
  async startDetection() {
    this.isDetecting = true;
  }
  async componentWillLoad() {
    this.video = createVideo();
    //this.el.appendChild(this.video)
    this.canvas = createCanvas(this.el);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.el.appendChild(this.canvas);
    this.photoCanvas = createCanvas(this.el);
    this.photoCanvas.width = this.width;
    this.photoCanvas.height = this.height;
    //this.el.appendChild(this.photoCanvas)
    this.faceapiService = new FaceapiService();
  }
  async componentDidRender() {
    initWebcamToVideo(this.video);
    this.webcamRender();
  }
  async disconnectedCallback() {
  }
  /**
   *
   * @param result
   * @returns true si proceso y detecto imagen
   */
  getPicZoom(result) {
    if (this.pictureTimer) {
      return null;
    }
    this.pictureTimer = setTimeout(() => {
      this.pictureTimer = null;
    }, this.detectionTimer);
    return new Promise((resolve, reject) => {
      let h = result.box.height * 1.5;
      let w = result.box.width * 1.5;
      // hacer caudrada la imagen
      if (h > w) {
        w = h;
      }
      else {
        h = w;
      }
      //centrar la imagen
      // center in x
      let x = result.box.x - (w - result.box.width) / 2;
      const xlimit = result.box.x + w;
      if (xlimit >= this.canvas.width) {
        // out of right
        x = xlimit - result.box.x;
      }
      else {
      }
      let y;
      const ylimit = result.box.y + h;
      if (ylimit > this.canvas.height) {
        // out of bottom
        y = ylimit - result.box.y;
      }
      else {
        // center in y
        y = result.box.y - (h - result.box.height) / 2;
      }
      // eliminar la imagen del canvas
      this.photoCanvas.getContext('2d').clearRect(0, 0, this.photoCanvas.width, this.photoCanvas.height);
      // zom video into canvas
      this.photoCanvas.getContext('2d').drawImage(this.canvas, x, y, w, h, 0, 0, this.photoCanvas.width, this.photoCanvas.height);
      try {
        // this faceDetected emit blob from this.canvas
        this.photoCanvas.toBlob((blob) => {
          this.faceDetected.emit(blob);
          resolve(blob);
        }, 'image/jpeg', 1);
      }
      catch (error) {
        reject(error);
      }
    });
  }
  handleStopDetection() {
    if (this.faceFound) {
      console.info("STOOPPPP detectiopnm");
      this.faceStopDetection.emit();
    }
    this.faceFound = null;
  }
  async webcamRender() {
    // this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.width, this.height)
    if (this.isDetecting) {
      let imgWidth = this.video.videoWidth;
      let imgHeight = this.video.videoHeight;
      var imgSize = Math.min(imgWidth, imgHeight);
      // The following two lines yield a central based cropping.
      // They can both be amended to be 0, if you wish it to be
      // a left based cropped image.
      var left = (imgWidth - imgSize) / 2;
      var top = (imgHeight - imgSize) / 2;
      const context = this.canvas.getContext('2d');
      const result = await this.faceapiService.detectFace(this.canvas);
      context.drawImage(this.video, left, top, imgSize, imgSize, 0, 0, this.canvas.width, this.canvas.height);
      if (result) {
        try {
          let x = result.box.x;
          let y = result.box.y;
          let w = result.box.width;
          let h = result.box.height;
          if (this.result) {
            if (result.box.x < this.result.box.x) {
              x = result.box.x - 1;
            }
            else {
              x = result.box.x + 1;
            }
            if (result.box.y < this.result.box.y) {
              y = result.box.y - 1;
            }
            else {
              y = result.box.y + 1;
            }
            if (result.box.width < this.result.box.width) {
              w = result.box.width - 1;
            }
            else {
              w = result.box.width + 1;
            }
            if (result.box.height < this.result.box.height) {
              h = result.box.height - 1;
            }
            else {
              h = result.box.height + 1;
            }
          }
          // draw border arround face
          context.strokeStyle = '#4efd54';
          context.lineWidth = 2;
          context.strokeRect(x, y, w, h);
          this.getPicZoom(result);
        }
        catch (e) {
          this.handleStopDetection();
        }
      }
      else {
        this.handleStopDetection();
      }
      this.result = result;
    }
    requestAnimationFrame(() => {
      //   setTimeout(() => {
      this.webcamRender();
      //   }, 1000) ;
    });
  }
  ;
  render() {
    return (h(Host, { style: { height: this.height + "px", width: this.width + "px" } }, h("slot", { name: 'before' }), h("slot", null), h("slot", { name: 'after' })));
  }
  static get is() { return "input-face-api-webcam"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["input-face-api-webcam.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["input-face-api-webcam.css"]
    };
  }
  static get properties() {
    return {
      "width": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "width",
        "reflect": true,
        "defaultValue": "460"
      },
      "height": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "height",
        "reflect": true,
        "defaultValue": "460"
      },
      "detectionTimer": {
        "type": "number",
        "mutable": true,
        "complexType": {
          "original": "number",
          "resolved": "number",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "detection-timer",
        "reflect": true,
        "defaultValue": "1000"
      }
    };
  }
  static get states() {
    return {
      "isDetecting": {}
    };
  }
  static get events() {
    return [{
        "method": "faceDetected",
        "name": "faceDetected",
        "bubbles": true,
        "cancelable": false,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "Blob",
          "resolved": "Blob",
          "references": {
            "Blob": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "faceStopDetection",
        "name": "faceStopDetection",
        "bubbles": true,
        "cancelable": false,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "void",
          "resolved": "void",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "stopDetection": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "startDetection": {
        "complexType": {
          "signature": "() => Promise<void>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            }
          },
          "return": "Promise<void>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      }
    };
  }
  static get elementRef() { return "el"; }
}
//# sourceMappingURL=input-face-api-webcam.js.map
