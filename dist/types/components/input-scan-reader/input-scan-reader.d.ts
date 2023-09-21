import { EventEmitter } from '../../stencil-public-runtime';
import { InputScanData, InputScanType } from './input-scan-reader.types';
export declare class InputScanReader {
  regexToData: {
    regex: RegExp;
    type: InputScanType;
  }[];
  el: HTMLElement;
  /**
   * Show a modal with the scanned text. like a white blink on the screen
   */
  modalTimer?: number;
  handleScan(event: CustomEvent<InputScanData>): void;
  processText(text: string): InputScanData;
  onEnterHandler(): boolean;
  handleKeyDown(event: KeyboardEvent): boolean;
  scannedText: string;
  /**
   * Fired when the user press enter or tab
   * used with scanners like BARCODES or QR
   */
  scan: EventEmitter<InputScanData>;
  /**
   * get raw scanned text
   * @returns the text scanned
   */
  getText(): Promise<string>;
  /**
   * Structured scanned text
   * @returns the text scanned
   */
  getData(): Promise<InputScanData>;
  runRegex(text: string): InputScanData;
  getDataFromDNIv1(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromDNIv2(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromRegex(type: InputScanType, scannedText: string): InputScanData;
  getDataFromLicenciaDeCOnducir(scannedText: string): InputScanData;
  handleOnInpujtChangeEvent(ev: Event): void;
  render(): any;
}
