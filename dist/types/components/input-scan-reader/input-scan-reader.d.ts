import { EventEmitter } from '../../stencil-public-runtime';
import { InputScanData } from './input-scan-reader.types';
export declare class InputScanReader {
    el: HTMLElement;
    reading: boolean;
    readingEnabled: boolean;
    /**
     * Show a modal with the scanned text. like a white blink on the screen
     */
    modalTimer?: number;
    scanTitle?: string;
    displayModal(data: InputScanData): void;
    handleScan(event: CustomEvent<InputScanData>): void;
    componentDidLoad(): void;
    onEnterHandler(): boolean;
    scannedText: string;
    watchScannedTextHandler(newValue: string): void;
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
    reset(): void;
    timeout: NodeJS.Timeout;
    restartOnTimeout(ms?: number): void;
    onKeydownHandler(event: KeyboardEvent): boolean;
    handleKeyDown(ev: KeyboardEvent): void;
    start(): Promise<void>;
    stop(): Promise<void>;
    handleOnInpujtChangeEvent(ev: Event): void;
    spanLoader(): any;
    render(): any;
}
