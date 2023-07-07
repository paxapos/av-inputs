import { Host, h } from "@stencil/core";
import { FaceapiService } from "../../utils/facepi.service";
import { CameraDirection, createCanvas, createVideo, initWebcamToVideo, renderToCanvas } from "../../utils/camera.service";
import { pxTimer } from "../../utils/utils";
export class InputFaceApiWebcam {
  constructor() {
    this.lastVideoTime = -1;
    this.enableDetection = true;
    this.isDetecting = true;
    this.detectionResult = undefined;
    this.width = 460;
    this.height = 460;
    this.scoreThreshold = 0.65;
    this.detectionTimer = 1500;
    this.facingMode = CameraDirection.Front;
  }
  detectionResultChangedHandler(newValue, oldValue) {
    if (newValue === null || newValue === void 0 ? void 0 : newValue.blobImg) {
      this.faceDetected.emit(newValue);
    }
    else {
      if (oldValue) {
        this.faceStopDetection.emit();
      }
    }
  }
  async stopDetection() {
    this.enableDetection = false;
  }
  async startDetection() {
    this.enableDetection = true;
  }
  async componentWillLoad() {
    this.video = createVideo();
    this.canvas = createCanvas(this.el);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.el.appendChild(this.canvas);
    this.faceapiService = new FaceapiService(this.scoreThreshold);
    initWebcamToVideo(this.video, this.facingMode);
    renderToCanvas(this.canvas, this.video);
    requestAnimationFrame(() => {
      this.webcamRender();
    });
  }
  async webcamRender() {
    const startTimeMs = performance.now();
    // Detect faces using detectForVideo
    if (this.video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.video.currentTime;
      // get context of canvas and create paning and zoooming to center
      this.detectionResult = await this.faceapiService.detectFace(this.video, startTimeMs);
    }
    await pxTimer(this.detectionTimer);
    requestAnimationFrame(() => {
      this.webcamRender();
    });
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
        "defaultValue": "0.65"
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
        "defaultValue": "1500"
      },
      "facingMode": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "CameraDirection",
          "resolved": "CameraDirection.Front | CameraDirection.Rear",
          "references": {
            "CameraDirection": {
              "location": "import",
              "path": "../../utils/camera.service",
              "id": "src/utils/camera.service.ts::CameraDirection"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "facing-mode",
        "reflect": true,
        "defaultValue": "CameraDirection.Front"
      }
    };
  }
  static get states() {
    return {
      "enableDetection": {},
      "isDetecting": {},
      "detectionResult": {}
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
          "original": "DetectionImg",
          "resolved": "DetectionImg",
          "references": {
            "DetectionImg": {
              "location": "import",
              "path": "../../utils/facepi.service",
              "id": "src/utils/facepi.service.ts::DetectionImg"
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
              "location": "global",
              "id": "global::Promise"
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
              "location": "global",
              "id": "global::Promise"
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
  static get watchers() {
    return [{
        "propName": "detectionResult",
        "methodName": "detectionResultChangedHandler"
      }];
  }
}
//# sourceMappingURL=input-face-api-webcam.js.map
