import { Host, h, Build } from "@stencil/core";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { v4 as uuidv4 } from "uuid";
export class InputBarcode {
  constructor() {
    /**
    * Uuid of the div
    */
    this.uuidGeneric = uuidv4();
    this.cameraId = undefined;
    this.width = '400px';
    this.height = '200px';
    this.supportedFormats = [
      Html5QrcodeSupportedFormats.QR_CODE,
      Html5QrcodeSupportedFormats.AZTEC,
      Html5QrcodeSupportedFormats.CODABAR,
      Html5QrcodeSupportedFormats.CODE_39,
      Html5QrcodeSupportedFormats.CODE_93,
      Html5QrcodeSupportedFormats.CODE_128,
      Html5QrcodeSupportedFormats.DATA_MATRIX,
      Html5QrcodeSupportedFormats.MAXICODE,
      Html5QrcodeSupportedFormats.ITF,
      Html5QrcodeSupportedFormats.EAN_13,
      Html5QrcodeSupportedFormats.EAN_8,
      Html5QrcodeSupportedFormats.PDF_417,
      Html5QrcodeSupportedFormats.RSS_14,
      Html5QrcodeSupportedFormats.RSS_EXPANDED,
      Html5QrcodeSupportedFormats.UPC_A,
      Html5QrcodeSupportedFormats.UPC_E,
      Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION
    ];
    this.facingMode = 'enviroment';
    this.cameraConfig = {
      fps: 10,
    };
  }
  async getState() {
    return this.html5QrCode.getState();
  }
  async stop() {
    return await this.html5QrCode.stop();
  }
  async start() {
    return await this.html5QrCode.start({ facingMode: this.facingMode }, this.cameraConfig, (decodedText) => {
      this.scan.emit(decodedText);
    }, (errorMessage) => {
      throw new Error(`Error al escanear: ${errorMessage}`);
    })
      .catch((err) => {
      throw new Error(`Error al iniciar scanner: ${err}`);
    });
  }
  async getCameras() {
    // This method will trigger user permissions
    Html5Qrcode.getCameras().then(devices => {
      console.info('paso por aca');
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      console.info('devices', devices);
      if (devices && devices.length) {
        let cameraId = devices[0].id;
        return cameraId;
        // .. use this to start scanning.
      }
    }).catch(err => {
      console.error(err);
      // handle err
    });
  }
  componentDidLoad() {
    console.info('entrooo', this.supportedFormats);
    const config = {
      verbose: Build.isDev,
      formatsToSupport: this.supportedFormats,
    };
    this.html5QrCode = new Html5Qrcode(this.uuidGeneric, config);
    this.start();
  }
  render() {
    console.info('entrooo 2');
    const hostStyle = {
      'width': this.width,
      'height': this.height,
      'overflow': 'hidden',
      'display': 'inline-block'
    };
    return (h(Host, { style: hostStyle }, h("div", { id: this.uuidGeneric })));
  }
  static get is() { return "input-barcode"; }
  static get originalStyleUrls() {
    return {
      "$": ["input-barcode.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["input-barcode.css"]
    };
  }
  static get properties() {
    return {
      "cameraId": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "id of camera"
        },
        "attribute": "camera-id",
        "reflect": false
      },
      "width": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Width of the camera"
        },
        "attribute": "width",
        "reflect": false,
        "defaultValue": "'400px'"
      },
      "height": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Height of the camera"
        },
        "attribute": "height",
        "reflect": false,
        "defaultValue": "'200px'"
      },
      "supportedFormats": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Html5QrcodeSupportedFormats[]",
          "resolved": "Html5QrcodeSupportedFormats[]",
          "references": {
            "Html5QrcodeSupportedFormats": {
              "location": "import",
              "path": "html5-qrcode",
              "id": ""
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "All formats of camera"
        },
        "defaultValue": "[\n    Html5QrcodeSupportedFormats.QR_CODE,\n    Html5QrcodeSupportedFormats.AZTEC,\n    Html5QrcodeSupportedFormats.CODABAR,\n    Html5QrcodeSupportedFormats.CODE_39,\n    Html5QrcodeSupportedFormats.CODE_93,\n    Html5QrcodeSupportedFormats.CODE_128,\n    Html5QrcodeSupportedFormats.DATA_MATRIX,\n    Html5QrcodeSupportedFormats.MAXICODE,\n    Html5QrcodeSupportedFormats.ITF,\n    Html5QrcodeSupportedFormats.EAN_13,\n    Html5QrcodeSupportedFormats.EAN_8,\n    Html5QrcodeSupportedFormats.PDF_417,\n    Html5QrcodeSupportedFormats.RSS_14,\n    Html5QrcodeSupportedFormats.RSS_EXPANDED,\n    Html5QrcodeSupportedFormats.UPC_A,\n    Html5QrcodeSupportedFormats.UPC_E,\n    Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION\n  ]"
      },
      "facingMode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'user'|'enviroment'",
          "resolved": "\"enviroment\" | \"user\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Camera user or enviroment"
        },
        "attribute": "facing-mode",
        "reflect": false,
        "defaultValue": "'enviroment'"
      },
      "cameraConfig": {
        "type": "unknown",
        "mutable": false,
        "complexType": {
          "original": "Html5QrcodeCameraScanConfig",
          "resolved": "Html5QrcodeCameraScanConfig",
          "references": {
            "Html5QrcodeCameraScanConfig": {
              "location": "import",
              "path": "html5-qrcode",
              "id": ""
            }
          }
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": "Cualquiera de estas configuraciones\nhttps://scanapp.org/html5-qrcode-docs/docs/apis/interfaces/Html5QrcodeCameraScanConfig"
        },
        "defaultValue": "{\n    fps: 10,\n    \n  }"
      }
    };
  }
  static get events() {
    return [{
        "method": "scan",
        "name": "scan",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        }
      }];
  }
  static get methods() {
    return {
      "getState": {
        "complexType": {
          "signature": "() => Promise<Html5QrcodeScannerState>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            },
            "Html5QrcodeScannerState": {
              "location": "import",
              "path": "html5-qrcode",
              "id": ""
            }
          },
          "return": "Promise<Html5QrcodeScannerState>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "stop": {
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
      "start": {
        "complexType": {
          "signature": "() => Promise<never>",
          "parameters": [],
          "references": {
            "Promise": {
              "location": "global",
              "id": "global::Promise"
            }
          },
          "return": "Promise<never>"
        },
        "docs": {
          "text": "",
          "tags": []
        }
      },
      "getCameras": {
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
}
//# sourceMappingURL=input-barcode.js.map
