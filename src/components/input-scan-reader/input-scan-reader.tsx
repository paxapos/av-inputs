import { Component, Host, h, Event, Method, Element, EventEmitter, State, Listen, Prop, Watch } from '@stencil/core';
import { InputScanData } from './input-scan-reader.types';
import { processText } from 'src/utils/text.handler';

// DNI EXAMPLES
// "17572896    "A"1"CABRA"LEONARDO ANTONIO FABIO"ARGENTINA"26-08-1965"M"08-08-2011"00057696015"5    "08-08-2026"31"0"ILRÑ2.01 CÑ110613.02 )No Cap.="UNIDAD ·05 ÇÇ S-NÑ 0040:2008::0005
// 00691556286"CANO"JONATHAN LEONARDO"M"33951134"C"08-08-1988"17-07-2022"239
// 00395738312"TASSISTRO"FLORENCIA ANTONELLA"F"41195367"A"20-06-1998"30-08-2015"275
// 00115714043"PIUMATO"ANDRES JUAN"M"38305357"B"04-05-1994"05-06-2012

@Component({
  tag: 'input-scan-reader',
  styleUrl: 'input-scan-reader.css',
  shadow: true,
})
export class InputScanReader {
  @Element() el: HTMLElement;

  @State() reading = false;

  @State() readingEnabled = false;

  /**
   * Show a modal with the scanned text. like a white blink on the screen
   */
  @Prop() modalTimer?: number = 0;

  @Prop() scanTitle?: string = 'Scanning Text';

  displayModal(data: InputScanData) {
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

  @Listen('scan')
  handleScan(event: CustomEvent<InputScanData>) {
    if (this.modalTimer > 0) {
      this.displayModal(event.detail);
    }

    // reinicializo texto
    this.scannedText = '';
  }

  componentDidLoad() {
    if (!this.readingEnabled) {
      // Use setTimeout to avoid state change during componentDidLoad
      setTimeout(() => {
        this.start();
      }, 0);
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

  @State() scannedText = '';

  @Watch('scannedText')
  watchScannedTextHandler(newValue: string) {
    if (newValue.length > 0) {
      this.restartOnTimeout();
    } else {
      clearTimeout(this.timeout);
    }
  }

  /**
   * Fired when the user press enter or tab
   * used with scanners like BARCODES or QR
   */
  @Event() scan: EventEmitter<InputScanData>;

  /**
   * get raw scanned text
   * @returns the text scanned
   */
  @Method()
  async getText(): Promise<string> {
    return this.scannedText;
  }

  /**
   * Structured scanned text
   * @returns the text scanned
   */
  @Method()
  async getData(): Promise<InputScanData> {
    if (this.scannedText == '') {
      return null;
    }

    return processText(this.scannedText);
  }

  reset() {
    this.scannedText = '';
    this.readingEnabled = false;
  }

  @State() timeout: NodeJS.Timeout;

  restartOnTimeout(ms = 5000) {
    clearTimeout(this.timeout);

    this.timeout = setTimeout(() => {
      this.reset();
    }, ms);
  }

  onKeydownHandler(event: KeyboardEvent) {
    if ( this.readingEnabled === false ) {
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

   @Listen('keydown', { target: 'document' })
  handleKeyDown(ev: KeyboardEvent) {
    if (this.readingEnabled) {
      this.onKeydownHandler(ev);
    }
  }


  @Method()
  async start() {
    // listen on document for keydown and write text in scannedText
    this.readingEnabled = true;
  }

  @Method()
  async stop() {
    this.readingEnabled = false;
  }

  handleOnInpujtChangeEvent(ev: Event) {
    this.scannedText = (ev.target as HTMLInputElement).value;
  }

  spanLoader() {
    return <span class="loader"></span>;
  }

  render() {
    let mainClass = this.readingEnabled ? '' : 'stopped';
    if ( this.readingEnabled ) {
      if ( this.scannedText.length === 0 ) {
        mainClass += ' scanning';
      } else {
        mainClass += ' reading';
      }
    }

    return (
      <Host>
        <div class={mainClass }>
          <div>{this.spanLoader()}</div>
          {this.scanTitle && <label>{this.scanTitle}</label>}
          <div class="scanned-text">{this.scannedText}</div>
          <input type="text" value={this.scannedText} onChange={ev => this.handleOnInpujtChangeEvent(ev)} />
        </div>
      </Host>
    );
  }
}
