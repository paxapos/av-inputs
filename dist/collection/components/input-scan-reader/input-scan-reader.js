import { Host, h } from "@stencil/core";
import { processText } from "../../utils/text.handler";
// DNI EXAMPLES
// "17572896    "A"1"CABRA"LEONARDO ANTONIO FABIO"ARGENTINA"26-08-1965"M"08-08-2011"00057696015"5    "08-08-2026"31"0"ILRÑ2.01 CÑ110613.02 )No Cap.="UNIDAD ·05 ÇÇ S-NÑ 0040:2008::0005
// 00691556286"CANO"JONATHAN LEONARDO"M"33951134"C"08-08-1988"17-07-2022"239
// 00395738312"TASSISTRO"FLORENCIA ANTONELLA"F"41195367"A"20-06-1998"30-08-2015"275
// 00115714043"PIUMATO"ANDRES JUAN"M"38305357"B"04-05-1994"05-06-2012
export class InputScanReader {
    constructor() {
        this.reading = false;
        this.readingEnabled = false;
        /**
         * Show a modal with the scanned text. like a white blink on the screen
         */
        this.modalTimer = 0;
        this.scanTitle = 'Scanning Text';
        this.scannedText = '';
    }
    displayModal(data) {
        // crear un elemento tipo DIV del tamaño del parentNode de this.el
        const parent = this.el.parentNode;
        const div = document.createElement('div');
        div.style.position = 'fixed';
        div.style.top = '0';
        div.style.left = '0';
        div.style.width = '100vw';
        div.style.height = '100vh';
        div.style.backgroundColor = 'rgba(254,254,254,0.65)';
        div.style.zIndex = '1000';
        div.style.display = 'flex';
        div.style.alignItems = 'center';
        div.style.justifyContent = 'center';
        div.style.color = 'black';
        div.style.fontSize = '3rem';
        div.style.fontWeight = 'bold';
        div.style.textAlign = 'center';
        div.style.padding = '1rem';
        div.style.boxSizing = 'border-box';
        div.style.borderRadius = '1rem';
        div.style.overflow = 'hidden';
        div.style.textOverflow = 'ellipsis';
        div.style.whiteSpace = 'nowrap';
        div.style.cursor = 'pointer';
        div.textContent = data.text;
        div.addEventListener('click', () => {
            div.remove();
        });
        parent.appendChild(div);
        setTimeout(() => {
            div.remove();
        }, this.modalTimer);
    }
    handleScan(event) {
        if (this.modalTimer > 0) {
            this.displayModal(event.detail);
        }
        // reinicializo texto
        this.scannedText = '';
    }
    componentDidLoad() {
        if (!this.readingEnabled) {
            this.start();
        }
    }
    onEnterHandler() {
        if (this.scannedText == '') {
            return false;
        }
        // convierto el texto a InputScanData
        const scannedData = processText(this.scannedText);
        // emit the scanned data and reset the scannedText
        this.scan.emit(scannedData);
    }
    watchScannedTextHandler(newValue) {
        if (newValue.length > 0) {
            this.restartOnTimeout();
        }
        else {
            clearTimeout(this.timeout);
        }
    }
    /**
     * get raw scanned text
     * @returns the text scanned
     */
    async getText() {
        return this.scannedText;
    }
    /**
     * Structured scanned text
     * @returns the text scanned
     */
    async getData() {
        if (this.scannedText == '') {
            return null;
        }
        return processText(this.scannedText);
    }
    reset() {
        this.scannedText = '';
        this.readingEnabled = false;
    }
    restartOnTimeout(ms = 5000) {
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.reset();
        }, ms);
    }
    onKeydownHandler(event) {
        if (this.readingEnabled === false) {
            return;
        }
        if (event.isComposing) {
            return;
        }
        if (event.code == 'Enter' || event.code == 'NumpadEnter' || event.code == 'Tab') {
            return this.onEnterHandler();
        }
        if (event.key == 'Shift' || event.key == 'Control' || event.key == 'Alt' || event.key == 'AltGraph' || event.key == 'Meta') {
            return;
        }
        if (event.key == 'Backspace') {
            this.scannedText = this.scannedText.slice(0, -1);
            return;
        }
        if (event.key == 'Escape') {
            this.scannedText = '';
            return;
        }
        if (event.key == ' ') {
            this.scannedText += ' ';
            return;
        }
        if (event.key == 'CapsLock') {
            return;
        }
        // Ignore control characters
        if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
            this.scannedText += event.key;
        }
    }
    handleKeyDown(ev) {
        if (this.readingEnabled) {
            this.onKeydownHandler(ev);
        }
    }
    async start() {
        // listen on document for keydown and write text in scannedText
        this.readingEnabled = true;
    }
    async stop() {
        this.readingEnabled = false;
    }
    handleOnInpujtChangeEvent(ev) {
        this.scannedText = ev.target.value;
    }
    spanLoader() {
        return h("span", { class: "loader" });
    }
    render() {
        let mainClass = this.readingEnabled ? '' : 'stopped';
        if (this.readingEnabled) {
            if (this.scannedText.length === 0) {
                mainClass += ' scanning';
            }
            else {
                mainClass += ' reading';
            }
        }
        return (h(Host, { key: 'dc6eaa6bd56ab40e65f83fd530aa8d7eaafba86f' }, h("div", { key: '566932dbaff5a62dd86f105adfc24de5923e6792', class: mainClass }, h("div", { key: 'd324de05faeea3789c0052bbf0cf22fd5719c8b1' }, this.spanLoader()), this.scanTitle && h("label", { key: 'a26446f146e54dd297e893de39deef1ad5cbc1e6' }, this.scanTitle), h("div", { key: '236536404992cc01224de4cc216a3a5a8dd616cb', class: "scanned-text" }, this.scannedText), h("input", { key: 'c798b9be1a8510264eda28208a745ea7adb94607', type: "text", value: this.scannedText, onChange: ev => this.handleOnInpujtChangeEvent(ev) }))));
    }
    static get is() { return "input-scan-reader"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["input-scan-reader.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["input-scan-reader.css"]
        };
    }
    static get properties() {
        return {
            "modalTimer": {
                "type": "number",
                "attribute": "modal-timer",
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
                    "text": "Show a modal with the scanned text. like a white blink on the screen"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0"
            },
            "scanTitle": {
                "type": "string",
                "attribute": "scan-title",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": ""
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Scanning Text'"
            }
        };
    }
    static get states() {
        return {
            "reading": {},
            "readingEnabled": {},
            "scannedText": {},
            "timeout": {}
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
                    "text": "Fired when the user press enter or tab\nused with scanners like BARCODES or QR"
                },
                "complexType": {
                    "original": "InputScanData",
                    "resolved": "InputScanData",
                    "references": {
                        "InputScanData": {
                            "location": "import",
                            "path": "./input-scan-reader.types",
                            "id": "src/components/input-scan-reader/input-scan-reader.types.ts::InputScanData"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "getText": {
                "complexType": {
                    "signature": "() => Promise<string>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<string>"
                },
                "docs": {
                    "text": "get raw scanned text",
                    "tags": [{
                            "name": "returns",
                            "text": "the text scanned"
                        }]
                }
            },
            "getData": {
                "complexType": {
                    "signature": "() => Promise<InputScanData>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "InputScanData": {
                            "location": "import",
                            "path": "./input-scan-reader.types",
                            "id": "src/components/input-scan-reader/input-scan-reader.types.ts::InputScanData"
                        }
                    },
                    "return": "Promise<InputScanData>"
                },
                "docs": {
                    "text": "Structured scanned text",
                    "tags": [{
                            "name": "returns",
                            "text": "the text scanned"
                        }]
                }
            },
            "start": {
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
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "scannedText",
                "methodName": "watchScannedTextHandler"
            }];
    }
    static get listeners() {
        return [{
                "name": "scan",
                "method": "handleScan",
                "target": undefined,
                "capture": false,
                "passive": false
            }, {
                "name": "keydown",
                "method": "handleKeyDown",
                "target": "document",
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=input-scan-reader.js.map
