import { CameraDirection } from '@capacitor/camera';
import { Host, h } from '@stencil/core';
import { camera } from '../../utils/camera';
export class InputFileFromWebcam {
  constructor() {
    this.width = 460;
    this.height = 460;
    this.facingMode = CameraDirection.Front;
    this.drawImageCb = null;
  }
  async takePic() {
    // show a prompt
    const pic = await camera.takePicture();
    this.pictureTaken.emit(pic);
    return pic;
  }
  async resetCamera() {
    // show a prompt
    camera.resetCamera();
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
    this.facingMode = (this.facingMode != CameraDirection.Front) ? CameraDirection.Front : CameraDirection.Rear;
    this.facingModeChanged.emit(this.facingMode);
  }
  componentWillMount() {
  }
  async componentDidRender() {
    camera.initCamera(this.el, CameraDirection.Front, this.drawImageCb);
  }
  async disconnectedCallback() {
    camera.resetCamera();
  }
  render() {
    return (h(Host, { style: { height: this.height + "px", width: this.width + "px" } }, h("slot", { name: 'before' }), h("slot", null), h("slot", { name: 'after' })));
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
      "facingMode": {
        "type": "string",
        "mutable": true,
        "complexType": {
          "original": "CameraDirection",
          "resolved": "CameraDirection.Front | CameraDirection.Rear",
          "references": {
            "CameraDirection": {
              "location": "import",
              "path": "@capacitor/camera"
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
          "original": "Blob",
          "resolved": "Blob",
          "references": {
            "Blob": {
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
          "original": "CameraDirection",
          "resolved": "CameraDirection.Front | CameraDirection.Rear",
          "references": {
            "CameraDirection": {
              "location": "import",
              "path": "@capacitor/camera"
            }
          }
        }
      }];
  }
  static get methods() {
    return {
      "takePic": {
        "complexType": {
          "signature": "() => Promise<Blob>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global"
            },
            "Blob": {
              "location": "global"
            }
          },
          "return": "Promise<Blob>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "resetCamera": {
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
  static get elementRef() { return "el"; }
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
