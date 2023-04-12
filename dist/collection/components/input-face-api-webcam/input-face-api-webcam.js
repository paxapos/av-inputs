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
    this.noDetectedCounter = 0;
    this.zoomTimer = null;
    this.tcoords = {
      z: 1,
      x: 0,
      y: 0
    };
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
  getPicZoom() {
    if (this.pictureTimer) {
      return null;
    }
    this.pictureTimer = setTimeout(() => {
      this.pictureTimer = null;
    }, this.detectionTimer);
    return new Promise((resolve, reject) => {
      try {
        // this faceDetected emit blob from this.canvas
        this.canvas.toBlob((blob) => {
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
    if (this.pictureTimer) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.webcamRender();
        });
      }, 100);
    }
    else {
      requestAnimationFrame(() => {
        this.webcamRender();
      });
    }
    if (this.isDetecting) {
      const result = await this.faceapiService.detectFace(this.video);
      let ctx = this.canvas.getContext('2d');
      this.drawWebcamnToCanvas(ctx);
      if (result) {
        try {
          // center face in canvas
          this.getPicZoom();
        }
        catch (e) {
          console.error(e);
          this.handleStopDetection();
        }
      }
      else {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        this.handleStopDetection();
      }
      this.result = result;
    }
  }
  ;
  drawWebcamnToCanvas(ctx) {
    let imgWidth = this.video.videoWidth;
    let imgHeight = this.video.videoHeight;
    var imgSize = Math.min(imgWidth, imgHeight);
    // The following two lines yield a central based cropping.
    // They can both be amended to be 0, if you wish it to be
    // a left based cropped image.
    var left = (imgWidth - imgSize) / 2;
    var top = (imgHeight - imgSize) / 2;
    // ctx clear all
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    ctx.drawImage(this.video, left, top, imgSize, imgSize, 0, 0, this.canvas.width, this.canvas.height);
  }
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
