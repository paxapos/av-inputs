import { Host, h } from '@stencil/core';
import { camera } from '../../utils/camera';
export class InputFileFromWebcam {
  constructor() {
    this.width = 460;
    this.height = 460;
    this.facingMode = "user";
    this.drawImageCb = null;
  }
  async takePic() {
    // show a prompt
    const pic = await camera.takePic();
    this.pictureTaken.emit(pic);
    return pic;
  }
  async toggleCamera() {
    this.__toogleFacingMode();
  }
  onClickHandler() {
    this.__toogleFacingMode();
  }
  /**
   * Toogle webcam, for example in mobile show front or back camera
   * you can block this behaviour by setting the facingMode Property
   */
  __toogleFacingMode() {
    // only change if no facinMode property was set
    this.facingMode = (this.facingMode != "user") ? "user" : "environment";
    this.facingModeChanged.emit(this.facingMode);
  }
  __createfacingModeConstrainDOMString() {
    return { ideal: this.facingMode };
  }
  componentWillMount() {
  }
  async componentDidRender() {
    camera.initCamera(this.elVideo, this.elCanvas, this.__createfacingModeConstrainDOMString(), this.drawImageCb);
  }
  async disconnectedCallback() {
    camera.resetCamera();
  }
  render() {
    return (h(Host, null, h("slot", { name: 'before' }), h("video", { autoplay: "true", ref: (el) => this.elVideo = el }), h("canvas", { ref: (el) => this.elCanvas = el, width: this.width, height: this.height }), h("slot", null), h("slot", { name: 'after' })));
  }
  static get is() { return "input-file-from-webcam"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["input-file-from-webcam.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["input-file-from-webcam.css"]
    };
  }
  static get properties() {
    return {
      "width": {
        "type": "number",
        "mutable": false,
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
        "reflect": false,
        "defaultValue": "460"
      },
      "height": {
        "type": "number",
        "mutable": false,
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
        "reflect": false,
        "defaultValue": "460"
      },
      "facingMode": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "cameratipes",
          "resolved": "\"environment\" | \"user\"",
          "references": {
            "cameratipes": {
              "location": "local",
              "path": "/home/alevilar/Works/input-file-from-webcam/src/components/input-file-from-webcam/input-file-from-webcam.tsx"
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
        "defaultValue": "\"user\""
      },
      "drawImageCb": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Function",
          "resolved": "Function",
          "references": {
            "Function": {
              "location": "global"
            }
          }
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "you can pass a function and override the canvas.drawImage function so you\ncan change the image adding filters or any kind of magin in your image\n\nyou just need to crear a function with all canvas.-drawImage arguments\n\nhere you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height"
        },
        "defaultValue": "null"
      }
    };
  }
  static get events() {
    return [{
        "method": "pictureTaken",
        "name": "pictureTaken",
        "bubbles": true,
        "cancelable": false,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "File",
          "resolved": "File",
          "references": {
            "File": {
              "location": "global"
            }
          }
        }
      }, {
        "method": "facingModeChanged",
        "name": "facingModeChanged",
        "bubbles": true,
        "cancelable": false,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "cameratipes",
          "resolved": "\"environment\" | \"user\"",
          "references": {
            "cameratipes": {
              "location": "local",
              "path": "/home/alevilar/Works/input-file-from-webcam/src/components/input-file-from-webcam/input-file-from-webcam.tsx"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "takePic": {
        "complexType": {
          "signature": "() => Promise<File>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "File": {
              "location": "global"
            }
          },
          "return": "Promise<File>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "toggleCamera": {
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
  static get listeners() {
    return [{
        "name": "click",
        "method": "onClickHandler",
        "target": undefined,
        "capture": false,
        "passive": false
      }];
  }
}
//# sourceMappingURL=input-file-from-webcam.js.map
