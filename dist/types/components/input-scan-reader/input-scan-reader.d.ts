import { EventEmitter } from '../../stencil-public-runtime';
import { InputScanData } from './input-scan-reader.types';
export declare class InputScanReader {
  el: HTMLElement;
  /**
   * Show a modal with the scanned text. like a white blink on the screen
   */
  modalTimer?: number;
  handleScan(event: CustomEvent<InputScanData>): void;
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
  handleOnInpujtChangeEvent(ev: Event): void;
  render(): any;
}
