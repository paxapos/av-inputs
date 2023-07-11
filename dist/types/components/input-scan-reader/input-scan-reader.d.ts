import { EventEmitter } from '../../stencil-public-runtime';
import { InputScanData, InputScanType } from './input-scan-reader.types';
export declare class InputScanReader {
  regexToData: {
    regex: RegExp;
    type: InputScanType;
  }[];
  el: HTMLElement;
  modalTimer?: number;
  handleScan(event: CustomEvent<InputScanData>): void;
  processText(text: string): InputScanData;
  onEnterHandler(): boolean;
  handleKeyDown(event: KeyboardEvent): boolean;
  scannedText: string;
  scan: EventEmitter<InputScanData>;
  getText(): Promise<string>;
  getData(): Promise<InputScanData>;
  runRegex(text: string): InputScanData;
  getDataFromDNIv1(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromDNIv2(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromRegex(type: InputScanType, inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromLicenciaDeCOnducir(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  handleOnInpujtChangeEvent(ev: Event): void;
  render(): any;
}
