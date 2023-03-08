import { Host, h } from '@stencil/core';
import { camera } from '../../utils/camera';
export class InputFileFromWebcam {
  constructor() {
    this.width = 460;
    this.height = 460;
    this.facingMode = null;
    this.drawImageCb = null;
    this.__facingMode = 'user';
  }
  async takePic() {
    // show a prompt
    const pic = await camera.takePic();
    this.pictureTaken.emit(pic);
    return pic;
  }
  onClickHandler() {
    this.__toogleFacingMode();
  }
  /**
   * Toogle webcam, for example in mobile show front or back camera
   * you can block this behaviour by setting the facingMode Property
   */
  __toogleFacingMode() {
    if (this.facingMode == null) {
      // only change if no facinMode property was set
      this.__facingMode = (this.__facingMode == "environment") ? "user" : "environment";
      this.facingModeChanged.emit(this.__createfacingModeConstrainDOMString());
    }
  }
  __createfacingModeConstrainDOMString() {
    return { ideal: this.__facingMode };
  }
  componentWillMount() {
    if (this.facingMode) {
      this.__facingMode = this.facingMode;
    }
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
        "mutable": false,
        "complexType": {
          "original": "\"user\"|\"environment\"",
          "resolved": "\"environment\" | \"user\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": "FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value"
        },
        "attribute": "facing-mode",
        "reflect": false,
        "defaultValue": "null"
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
  static get states() {
    return {
      "__facingMode": {}
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
          "original": "ConstrainDOMString",
          "resolved": "ConstrainDOMStringParameters | string | string[]",
          "references": {
            "ConstrainDOMString": {
              "location": "global"
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
