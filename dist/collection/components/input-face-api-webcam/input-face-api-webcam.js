import { Host, h } from "@stencil/core";
import { faceapiService } from "../../utils/facepi.service";
import { CameraDirection, createCanvas, createVideo, initWebcamToVideo, renderToCanvas } from "../../utils/camera.service";
import { pxTimer } from "../../utils/utils";
import { getBestMatch } from "./distance.worker";
export class InputFaceApiWebcam {
  constructor() {
    this.lastVideoTime = -1;
    this.detectionResult = undefined;
    this.loaded = false;
    this.enableDetection = true;
    this.trainedModel = undefined;
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
  /**
   * disable face detection
   */
  async stopDetection() {
    this.enableDetection = false;
  }
  /**
   * enable face detection
   */
  async startDetection() {
    this.enableDetection = true;
  }
  /**
   * Giving a blob image, get the face landmarks
   * @returns face landmarks
   */
  async getBlobImageDescriptors(blob) {
    return await faceapiService.getFaceLandmarksFromBlob(blob);
  }
  /**
   * Giving current face in video canvas, get the face landmarks
   * @returns face landmarks
   */
  async getFaceLandMarks() {
    if (this.detectionResult && this.detectionResult.blobImg) {
      return await faceapiService.getFaceLandmarksFromBlob(this.detectionResult.blobImg);
    }
    else {
      return null;
    }
  }
  /**
   * Predicts best face match, uses worker to calculate distance between the given blob and the trained model
   * passed in trainedModel prop
   * @param blob
   * @returns
   */
  async predictBestMatch(blob) {
    console.info("tyrained model es", this.trainedModel);
    if (!this.trainedModel) {
      return null;
    }
    let lm;
    if (!blob) {
      lm = await faceapiService.getFaceLandmarksFromBlob(blob);
    }
    else {
      lm = await this.getFaceLandMarks();
    }
    // for each trained model of this.trainedModels get minimum distance
    const best = await getBestMatch(this.trainedModel, lm.faceLandmarks[0]);
    return best;
  }
  async componentWillLoad() {
    this.video = createVideo();
    this.canvas = createCanvas(this.el);
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.el.appendChild(this.canvas);
    await faceapiService.initialize();
    console.info("el faceapi es", faceapiService);
    initWebcamToVideo(this.video, this.facingMode);
    renderToCanvas(this.canvas, this.video);
    this.loaded = true;
    requestAnimationFrame(() => {
      this.webcamRender();
    });
  }
  async webcamRender() {
    const startTimeMs = performance.now();
    // Detect faces using detectForVideo
    if (this.video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.video.currentTime;
      if (this.enableDetection) {
        // get context of canvas and create paning and zoooming to center
        this.detectionResult = await faceapiService.detectFace(this.video, startTimeMs);
      }
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
    const hostStyle = {
      height: this.height + "px",
      width: this.width + "px",
      visibility: this.loaded ? "visible" : "hidden",
    };
    return (h(Host, { style: hostStyle }, h("slot", { name: 'before' }), h("slot", null), h("slot", { name: 'after' })));
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
      "enableDetection": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "disable face detection"
        },
        "attribute": "enable-detection",
        "reflect": true,
        "defaultValue": "true"
      },
      "trainedModel": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "LabeledDescriptorsArray",
          "resolved": "LabeledDescriptors[]",
          "references": {
            "LabeledDescriptorsArray": {
              "location": "import",
              "path": "./TrainedModel",
              "id": "src/components/input-face-api-webcam/TrainedModel.d.ts::LabeledDescriptorsArray"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "trained models to use for recognition an best match"
        }
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
          "text": "Width of the video element"
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
          "text": "height of the video element"
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
          "text": "Score threshold to detect a face"
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
          "text": "Score threshold to detect a face"
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
          "text": "FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value"
        },
        "attribute": "facing-mode",
        "reflect": true,
        "defaultValue": "CameraDirection.Front"
      }
    };
  }
  static get states() {
    return {
      "detectionResult": {},
      "loaded": {}
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
          "text": "Event emitted when a face is detected in video stream"
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
          "text": "Event emitted when face detection whas stopped"
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
          "text": "disable face detection",
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
          "text": "enable face detection",
          "tags": []
        }
      },
      "getBlobImageDescriptors": {
        "complexType": {
          "signature": "(blob: Blob) => Promise<FaceLandmarkerResult>",
          "parameters": [{
              "tags": [],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "FaceLandmarkerResult": {
              "location": "import",
              "path": "@mediapipe/tasks-vision",
              "id": ""
            },
            "Blob": {
              "location": "global",
              "id": "global::Blob"
            }
          },
          "return": "Promise<FaceLandmarkerResult>"
        },
        "docs": {
          "text": "Giving a blob image, get the face landmarks",
          "tags": [{
              "name": "returns",
              "text": "face landmarks"
            }]
        }
      },
      "getFaceLandMarks": {
        "complexType": {
          "signature": "() => Promise<FaceLandmarkerResult>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "FaceLandmarkerResult": {
              "location": "import",
              "path": "@mediapipe/tasks-vision",
              "id": ""
            }
          },
          "return": "Promise<FaceLandmarkerResult>"
        },
        "docs": {
          "text": "Giving current face in video canvas, get the face landmarks",
          "tags": [{
              "name": "returns",
              "text": "face landmarks"
            }]
        }
      },
      "predictBestMatch": {
        "complexType": {
          "signature": "(blob?: Blob) => Promise<any>",
          "parameters": [{
              "tags": [{
                  "name": "param",
                  "text": "blob"
                }],
              "text": ""
            }],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "Blob": {
              "location": "global",
              "id": "global::Blob"
            }
          },
          "return": "Promise<any>"
        },
        "docs": {
          "text": "Predicts best face match, uses worker to calculate distance between the given blob and the trained model \npassed in trainedModel prop",
          "tags": [{
              "name": "param",
              "text": "blob"
            }, {
              "name": "returns",
              "text": undefined
            }]
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
