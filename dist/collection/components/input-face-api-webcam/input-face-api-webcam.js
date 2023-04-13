import { Host, h } from '@stencil/core';
import { FaceapiService } from '../../utils/facepi.service';
import { createCanvas, createVideo, initWebcamToVideo } from '../../utils/camera.service';
const DETECTION_FPS = 10;
export class InputFaceApiWebcam {
  constructor() {
    // last result
    this.result = null;
    this.curCords = { x: 0, y: 0 };
    this.toCords = { x: 0, y: 0 };
    this.isDetecting = true;
    this.width = 460;
    this.height = 460;
    this.inputSize = 192;
    this.scoreThreshold = 0.7;
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
    this.faceapiService = new FaceapiService();
  }
  async componentDidRender() {
    initWebcamToVideo(this.video);
    this.webcamRender();
  }
  /**
   *
   * @param result
   * @returns true si proceso y detecto imagen
   */
  emitBlob(result) {
    return new Promise((resolve, reject) => {
      try {
        // this faceDetected emit blob from this.canvas
        this.canvas.toBlob((blob) => {
          const iface = { blob, result };
          this.faceDetected.emit(iface);
          resolve(blob);
        }, 'image/jpeg', 1);
      }
      catch (error) {
        reject(error);
      }
    });
  }
  async webcamRender() {
    requestAnimationFrame(() => {
      this.webcamRender();
    });
    let ctx = this.canvas.getContext('2d');
    this.drawWebcamnToCanvas(ctx);
    // get context of canvas and create paning and zoooming to center
    if (this.isDetecting && !this.resultTimer) {
      this.resultTimer = setTimeout(async () => {
        const result = await this.faceapiService.detectFace(this.canvas, this.inputSize, this.scoreThreshold);
        if (result) {
          this.toCords = { x: Math.ceil(result.box.x), y: Math.ceil(result.box.y) };
          try {
            // saca una foto del canvas y genera el BLOB para emitir
            await this.emitBlob(result);
          }
          catch (e) {
            console.error(e);
          }
        }
        else {
          this.faceStopDetection.emit();
          ctx.translate(0, 0);
          ctx.scale(1, 1);
          this.toCords = { x: 0, y: 0 };
        }
        this.result = result;
        clearTimeout(this.resultTimer);
        this.resultTimer = null;
      }, Math.abs(1000 / DETECTION_FPS));
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
      "inputSize": {
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
          "text": "Minimun input size of face"
        },
        "attribute": "input-size",
        "reflect": true,
        "defaultValue": "192"
      },
      "scoreThreshold": {
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
        "attribute": "score-threshold",
        "reflect": true,
        "defaultValue": "0.7"
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
          "original": "iFaceDetected",
          "resolved": "iFaceDetected",
          "references": {
            "iFaceDetected": {
              "location": "local",
              "path": "/home/alevilar/Works/input-file-from-webcam/src/components/input-face-api-webcam/input-face-api-webcam.tsx"
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
