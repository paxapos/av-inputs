import { EventEmitter } from '../../stencil-public-runtime';
export interface InputScanData {
  type: InputScanType;
  text: string;
  data: any;
}
declare const enum InputScanType {
  URL = "URL",
  EMAIL = "EMAIL",
  DNIv1 = "DNIv1",
  DNIv2 = "DNIv2",
  LICENCIA_CONDUCIR = "LICENCIA_CONDUCIR",
  DESCONOCIDO = "DESCONOCIDO"
}
export declare class InputScanReader {
  el: HTMLElement;
  runRegex(): InputScanData;
  handleKeyDown(event: KeyboardEvent): void;
  scannedText: string;
  scannedData: InputScanData;
  scan: EventEmitter<InputScanData>;
  showPrompt(): Promise<void>;
  getDataFromDNIv1(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromDNIv2(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromMail(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromURL(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  getDataFromLicenciaDeCOnducir(inputScanner: RegExpExecArray, scannedText: string): InputScanData;
  render(): any;
}
export {};
