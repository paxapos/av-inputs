import { Host, h } from '@stencil/core';
import { FaceapiService } from '../../utils/facepi.service';
import { createCanvas, createVideo, initWebcamToVideo } from '../../utils/camera.service';
export class InputFaceApiWebcam {
  constructor() {
    this.isDetecting = true;
    this.photoPicMinValue = 300;
    this.width = 460;
    this.height = 460;
  }
  async stopDetection() {
    this.isDetecting = false;
  }
  async startDetection() {
    this.isDetecting = true;
  }
  async componentWillLoad() {
  }
  async componentDidRender() {
    this.video = createVideo(this.el);
    this.canvas = createCanvas(this.el);
    initWebcamToVideo(this.video);
    this.faceapiService = new FaceapiService(this.video, this.canvas);
    this.webcamRender();
  }
  async disconnectedCallback() {
  }
  /**
   *
   * @param result
   * @returns true si proceso y detecto imagen
   */
  __processReturn(result) {
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
    const x = result.box.x - (w - result.box.width) / 2;
    const y = result.box.y - (h - result.box.height) / 2;
    if (w > this.photoPicMinValue) {
      // zom video into canvas
      this.canvas.getContext('2d').drawImage(this.video, x, y, w, h, 0, 0, this.canvas.width, this.canvas.height);
      // this faceDetected emit blob from this.canvas
      this.canvas.toBlob((blob) => {
        this.faceDetected.emit(blob);
      }, 'image/jpeg', 1);
      return true;
    }
    return false;
  }
  drawCanvasNoFace() {
    this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height);
  }
  async webcamRender() {
    requestAnimationFrame(() => {
      this.webcamRender();
    });
    if (this.isDetecting) {
      const result = await this.faceapiService.detectFace();
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (result) {
        if (!this.__processReturn(result)) {
          this.faceMinValueError.emit(result);
          this.drawCanvasNoFace();
        }
      }
      else {
        this.drawCanvasNoFace();
      }
    }
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
      "photoPicMinValue": {
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
        "attribute": "photo-pic-min-value",
        "reflect": true,
        "defaultValue": "300"
      },
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
        "method": "faceMinValueError",
        "name": "faceMinValueError",
        "bubbles": true,
        "cancelable": false,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "FaceDetection",
          "resolved": "FaceDetection",
          "references": {
            "FaceDetection": {
              "location": "import",
              "path": "face-api.js"
            }
          }
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
