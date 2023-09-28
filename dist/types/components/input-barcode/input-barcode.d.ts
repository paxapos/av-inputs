import { EventEmitter } from '../../stencil-public-runtime';
import { Html5QrcodeCameraScanConfig, Html5QrcodeScannerState, Html5QrcodeSupportedFormats } from "html5-qrcode";
export declare class InputBarcode {
  cameraId: string;
  width: string;
  height: string;
  supportedFormats: Html5QrcodeSupportedFormats[];
  facingMode: 'user' | 'enviroment';
  /**
   * Cualquiera de estas configuraciones
   * https://scanapp.org/html5-qrcode-docs/docs/apis/interfaces/Html5QrcodeCameraScanConfig
   */
  cameraConfig: Html5QrcodeCameraScanConfig;
  private uuidGeneric;
  private html5QrCode;
  scan: EventEmitter<string>;
  getState(): Promise<Html5QrcodeScannerState>;
  stop(): Promise<void>;
  start(): Promise<never>;
  getCameras(): Promise<void>;
  componentDidLoad(): void;
  render(): any;
}
