import { r as registerInstance, a as createEvent, h, f as Host, i as getElement } from './index-e4228ea4.js';
import { p as processText } from './text.handler-60a0488b.js';

const inputScanReaderCss = ":host{display:block}";

const InputScanReader = class {
  constructor(hostRef) {
    registerInstance(this, hostRef);
    this.scan = createEvent(this, "scan", 7);
    this.regexToData = [
      {
        regex: /^([a-z0-9]+)$/gi,
        type: "ALFANUMERICO" /* InputScanType.ALFANUMERICO */
      },
      {
        regex: /^([0-9]+)$/gi,
        type: "NUMBER" /* InputScanType.NUMBER */
      },
      {
        regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi,
        type: "URL" /* InputScanType.URL */
      },
      {
        regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/gi,
        type: "EMAIL" /* InputScanType.EMAIL */
      },
    ];
    this.modalTimer = 500;
    this.scannedText = '';
  }
  handleScan(event) {
    if (this.modalTimer == 0) {
      return;
    }
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
    div.textContent = event.detail.text;
    div.addEventListener('click', () => {
      div.remove();
    });
    parent.appendChild(div);
    setTimeout(() => {
      div.remove();
    }, this.modalTimer);
  }
  onEnterHandler() {
    if (this.scannedText == '') {
      return false;
    }
    // convierto el texto a InputScanData
    const scannedData = processText(this.scannedText);
    // reinicializo texto
    this.scannedText = '';
    // emit the scanned data and reset the scannedText
    this.scan.emit(scannedData);
  }
  handleKeyDown(event) {
    if (event.isComposing) {
      return;
    }
    if (event.code == 'Enter' || event.code == 'NumpadEnter' || event.code == 'Tab') {
      return this.onEnterHandler();
    }
    if (event.key == 'Shift' || event.key == 'Control' || event.key == 'Alt' || event.key == 'Meta') {
      return;
    }
    if (event.key == 'Backspace') {
      this.scannedText = this.scannedText.slice(0, -1);
      return;
    }
    // write the string of the event to the scannedText only if it is a letter or a number
    this.scannedText += event.key;
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
  handleOnInpujtChangeEvent(ev) {
    this.scannedText = ev.target.value;
  }
  render() {
    return (h(Host, null, h("input", { type: "text", value: this.scannedText, onChange: (ev) => this.handleOnInpujtChangeEvent(ev) })));
  }
  get el() { return getElement(this); }
};
InputScanReader.style = inputScanReaderCss;

export { InputScanReader as input_scan_reader };

//# sourceMappingURL=input-scan-reader.entry.js.map