import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';
import { p as processText } from './text.handler.js';

const inputScanReaderCss = ":host{display:flex;flex-direction:column;align-items:center;--main-color:SlateBlue;--scanned-text-color:crimson;--stopped-color:grey;text-align:center}.stopped label{color:var(--stopped-color)}.stopped .loader::after,.stopped .loader::before{border-color:var(--stopped-color)}.scanning label{animation:blinker 2s linear 1s infinite}.scanning .loader::after,.scanning .loader::before{animation:animloader 2s linear infinite}input{display:none}.scanned-text{font-size:1.5rem;color:var(--scanned-text-color);margin:0;text-wrap:nowrap;height:1.5rem}label{display:block;width:100%;height:100%;cursor:pointer;color:var(--main-color);font-weight:bold}label:hover{background-color:#f1f1f1}label:active{background-color:#e1e1e1}.loader{width:48px;height:48px;display:inline-block;position:relative}.loader::after,.loader::before{content:'';box-sizing:border-box;width:48px;height:48px;border-radius:50%;border:2px solid;border-color:var(--main-color);position:absolute;left:0;top:0}.loader::after{animation-delay:1s}@keyframes animloader{0%{transform:scale(0);opacity:1}100%{transform:scale(1);opacity:0}}@keyframes blinker{50%{opacity:0.5}}";

const InputScanReader$1 = /*@__PURE__*/ proxyCustomElement(class InputScanReader extends HTMLElement {
    constructor() {
        super();
        this.__registerHost();
        this.__attachShadow();
        this.scan = createEvent(this, "scan", 7);
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
    get el() { return this; }
    static get watchers() { return {
        "scannedText": ["watchScannedTextHandler"]
    }; }
    static get style() { return inputScanReaderCss; }
}, [1, "input-scan-reader", {
        "modalTimer": [2, "modal-timer"],
        "scanTitle": [1, "scan-title"],
        "reading": [32],
        "readingEnabled": [32],
        "scannedText": [32],
        "timeout": [32],
        "getText": [64],
        "getData": [64],
        "start": [64],
        "stop": [64]
    }, [[0, "scan", "handleScan"], [4, "keydown", "handleKeyDown"]], {
        "scannedText": ["watchScannedTextHandler"]
    }]);
function defineCustomElement$1() {
    if (typeof customElements === "undefined") {
        return;
    }
    const components = ["input-scan-reader"];
    components.forEach(tagName => { switch (tagName) {
        case "input-scan-reader":
            if (!customElements.get(tagName)) {
                customElements.define(tagName, InputScanReader$1);
            }
            break;
    } });
}

const InputScanReader = InputScanReader$1;
const defineCustomElement = defineCustomElement$1;

export { InputScanReader, defineCustomElement };
//# sourceMappingURL=input-scan-reader.js.map

//# sourceMappingURL=input-scan-reader.js.map