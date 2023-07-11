import { proxyCustomElement, HTMLElement, createEvent, h, Host } from '@stencil/core/internal/client';

const inputScanReaderCss = ":host{display:block}";

const InputScanReader$1 = /*@__PURE__*/ proxyCustomElement(class InputScanReader extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
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
  processText(text) {
    const scannedData = this.runRegex(text);
    let data;
    if (scannedData) {
      data = scannedData;
    }
    else {
      data = {
        type: "DESCONOCIDO" /* InputScanType.DESCONOCIDO */,
        text: this.scannedText,
        data: {
          text: this.scannedText,
        }
      };
    }
    return data;
  }
  onEnterHandler() {
    if (this.scannedText == '') {
      return false;
    }
    // convierto el texto a InputScanData
    const scannedData = this.processText(this.scannedText);
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
  async getText() {
    return this.scannedText;
  }
  async getData() {
    if (this.scannedText == '') {
      return null;
    }
    return this.processText(this.scannedText);
  }
  runRegex(text) {
    let regex, regrun;
    // DNI v1
    // "30368326    "A"1"VILAR"ALEJANDRO ERNESTO"ARGENTINA"07-06-1983"M"13-02-2011"00038329892"7019 "13-02-2026"616"0"ILRÑ2.01 CÑ110128.02 )No Cap.="UNIDADÑ DG200 Plus ÇÇ SERIE NMEROÑ ¡040:2009::0019"
    regex = /^\"?(\w{8}) +\"?([a-z])\"?(\w)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])"/gi;
    regrun = regex.exec(text);
    if (regrun) {
      return this.getDataFromDNIv1(regrun, text);
    }
    // DNI v2
    regex = /^\"?(\d+)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z])\"?(\w{8})\"?([a-z])\"?([0-9-]+)/gi;
    regrun = regex.exec(text);
    if (regrun) {
      return this.getDataFromDNIv2(regrun, text);
    }
    // Licencia de conducir
    regex = /^\"?(\w{8})\"?([a-z])\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])\"?([0-9-]+)/gi;
    regrun = regex.exec(text);
    if (regrun) {
      return this.getDataFromLicenciaDeCOnducir(regrun, text);
    }
    for (let i = 0; i < this.regexToData.length; i++) {
      const regexToDataItem = this.regexToData[i];
      const regrun = regexToDataItem.regex.exec(text);
      if (regrun) {
        return this.getDataFromRegex(regexToDataItem.type, regrun, text);
      }
    }
  }
  getDataFromDNIv1(inputScanner, scannedText) {
    return {
      type: "DNIv1" /* InputScanType.DNIv1 */,
      text: scannedText,
      data: {
        apellido: inputScanner[4],
        nombre: inputScanner[5],
        dni: inputScanner[1],
        fecha_nacimiento: inputScanner[6],
        sexo: inputScanner[7],
      }
    };
  }
  getDataFromDNIv2(inputScanner, scannedText) {
    return {
      type: "DNIv2" /* InputScanType.DNIv2 */,
      text: scannedText,
      data: {
        apellido: inputScanner[2],
        nombre: inputScanner[3],
        dni: inputScanner[5],
        fecha_nacimiento: inputScanner[7],
        sexo: inputScanner[4],
      }
    };
  }
  getDataFromRegex(type, inputScanner, scannedText) {
    return {
      type: type,
      text: scannedText,
      data: {
        alfanumerico: inputScanner[1],
      }
    };
  }
  getDataFromLicenciaDeCOnducir(inputScanner, scannedText) {
    return this.getDataFromRegex("LICENCIA_CONDUCIR" /* InputScanType.LICENCIA_CONDUCIR */, inputScanner, scannedText);
  }
  handleOnInpujtChangeEvent(ev) {
    this.scannedText = ev.target.value;
  }
  render() {
    return (h(Host, null, h("input", { type: "text", value: this.scannedText, onChange: (ev) => this.handleOnInpujtChangeEvent(ev) })));
  }
  get el() { return this; }
  static get style() { return inputScanReaderCss; }
}, [1, "input-scan-reader", {
    "modalTimer": [2, "modal-timer"],
    "scannedText": [32],
    "getText": [64],
    "getData": [64]
  }, [[0, "scan", "handleScan"], [4, "keydown", "handleKeyDown"]]]);
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