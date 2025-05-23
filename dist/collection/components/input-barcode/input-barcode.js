import { Host, h } from "@stencil/core";
import { Html5Qrcode, Html5QrcodeSupportedFormats } from "html5-qrcode";
import { v4 as uuidv4 } from "uuid";
import { processText } from "../../utils/text.handler";
export class InputBarcode {
    constructor() {
        /**
        * Width of the camera
        */
        this.width = '400px';
        /**
        * Height of the camera
        */
        this.height = '200px';
        /**
        * All formats of camera
        */
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
        /**
        * Camera user or enviroment
        */
        this.facingMode = 'enviroment';
        /**
         * Cualquiera de estas configuraciones
         * https://scanapp.org/html5-qrcode-docs/docs/apis/interfaces/Html5QrcodeCameraScanConfig
         */
        this.cameraConfig = {
            fps: 10,
        };
        /**
        * Uuid of the div
        */
        this.uuidGeneric = uuidv4();
        this.lastScan = null;
        this.scanTimer = null;
    }
    /**
     * get state
     */
    async getState() {
        return this.html5QrCode.getState();
    }
    async stop() {
        return await this.html5QrCode.stop();
    }
    /**
     * Para asegurarse de que no lea inmediatamente el mismo DNI escaneado
     * @param decodedText
     */
    handleDecodedText(decodedText) {
        var _a;
        console.info("INICIANDOOOOO");
        console.info(this.lastScan);
        console.info(decodedText.text);
        if (((_a = this.lastScan) === null || _a === void 0 ? void 0 : _a.text.toString()) != decodedText.text.toString() || this.lastScan === null) {
            console.info("LEYOOOOO", decodedText);
            var today = new Date();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            console.info('time', time);
            this.scan.emit(decodedText);
            this.lastScan = decodedText;
            clearTimeout(this.scanTimer);
            this.scanTimer = setTimeout(() => {
                this.lastScan = null;
            }, 5000);
        }
    }
    async start() {
        return await this.html5QrCode.start({ facingMode: this.facingMode }, this.cameraConfig, (decodedText) => {
            console.info("leyo data", decodedText);
            const scannedData = processText(decodedText);
            console.info("leyo scannedData", scannedData);
            this.handleDecodedText(scannedData);
        }, () => {
            //console.error(error)
        })
            .catch((err) => {
            throw new Error(`Error al iniciar scanner: ${err}`);
        });
    }
    /**
     * get Cameras of user
     */
    async getCameras() {
        // This method will trigger user permissions
        Html5Qrcode.getCameras().then(devices => {
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
            err;
            // handle err
        });
    }
    componentDidLoad() {
        const config = {
            verbose: false,
            formatsToSupport: this.supportedFormats,
        };
        this.html5QrCode = new Html5Qrcode(this.uuidGeneric, config);
        this.start();
    }
    render() {
        const hostStyle = {
            'width': this.width,
            'height': this.height,
            'overflow': 'hidden',
            'display': 'inline-block'
        };
        return (h(Host, { key: '758bcc9281ace9508a6a2e88105ac2a6daf82a79', style: hostStyle }, h("div", { key: 'fc49ffc3b223786762c51fe9a854466db8c811e2', id: this.uuidGeneric })));
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
                "attribute": "camera-id",
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
                "getter": false,
                "setter": false,
                "reflect": false
            },
            "width": {
                "type": "string",
                "attribute": "width",
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
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'400px'"
            },
            "height": {
                "type": "string",
                "attribute": "height",
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
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'200px'"
            },
            "supportedFormats": {
                "type": "unknown",
                "attribute": "supported-formats",
                "mutable": false,
                "complexType": {
                    "original": "Html5QrcodeSupportedFormats[]",
                    "resolved": "Html5QrcodeSupportedFormats[]",
                    "references": {
                        "Html5QrcodeSupportedFormats": {
                            "location": "import",
                            "path": "html5-qrcode",
                            "id": "node_modules::Html5QrcodeSupportedFormats"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "All formats of camera"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "[\n    Html5QrcodeSupportedFormats.QR_CODE,\n    Html5QrcodeSupportedFormats.AZTEC,\n    Html5QrcodeSupportedFormats.CODABAR,\n    Html5QrcodeSupportedFormats.CODE_39,\n    Html5QrcodeSupportedFormats.CODE_93,\n    Html5QrcodeSupportedFormats.CODE_128,\n    Html5QrcodeSupportedFormats.DATA_MATRIX,\n    Html5QrcodeSupportedFormats.MAXICODE,\n    Html5QrcodeSupportedFormats.ITF,\n    Html5QrcodeSupportedFormats.EAN_13,\n    Html5QrcodeSupportedFormats.EAN_8,\n    Html5QrcodeSupportedFormats.PDF_417,\n    Html5QrcodeSupportedFormats.RSS_14,\n    Html5QrcodeSupportedFormats.RSS_EXPANDED,\n    Html5QrcodeSupportedFormats.UPC_A,\n    Html5QrcodeSupportedFormats.UPC_E,\n    Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION\n  ]"
            },
            "facingMode": {
                "type": "string",
                "attribute": "facing-mode",
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
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'enviroment'"
            },
            "cameraConfig": {
                "type": "unknown",
                "attribute": "camera-config",
                "mutable": false,
                "complexType": {
                    "original": "Html5QrcodeCameraScanConfig",
                    "resolved": "Html5QrcodeCameraScanConfig",
                    "references": {
                        "Html5QrcodeCameraScanConfig": {
                            "location": "import",
                            "path": "html5-qrcode",
                            "id": "node_modules::Html5QrcodeCameraScanConfig"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Cualquiera de estas configuraciones\nhttps://scanapp.org/html5-qrcode-docs/docs/apis/interfaces/Html5QrcodeCameraScanConfig"
                },
                "getter": false,
                "setter": false,
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
                    "text": "Event Scan"
                },
                "complexType": {
                    "original": "InputScanData",
                    "resolved": "InputScanData",
                    "references": {
                        "InputScanData": {
                            "location": "import",
                            "path": "../input-scan-reader/input-scan-reader.types",
                            "id": "src/components/input-scan-reader/input-scan-reader.types.ts::InputScanData"
                        }
                    }
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
                            "id": "node_modules::Html5QrcodeScannerState"
                        }
                    },
                    "return": "Promise<Html5QrcodeScannerState>"
                },
                "docs": {
                    "text": "get state",
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
                    "text": "get Cameras of user",
                    "tags": []
                }
            }
        };
    }
}
//# sourceMappingURL=input-barcode.js.map
