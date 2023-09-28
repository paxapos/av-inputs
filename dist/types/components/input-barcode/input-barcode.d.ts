import { EventEmitter } from '../../stencil-public-runtime';
import { Html5QrcodeCameraScanConfig, Html5QrcodeScannerState, Html5QrcodeSupportedFormats } from "html5-qrcode";
export declare class InputBarcode {
  /**
  * id of camera
  */
  cameraId: string;
  /**
  * Width of the camera
  */
  width: string;
  /**
  * Height of the camera
  */
  height: string;
  /**
  * All formats of camera
  */
  supportedFormats: Html5QrcodeSupportedFormats[];
  /**
  * Camera user or enviroment
  */
  facingMode: 'user' | 'enviroment';
  /**
   * Cualquiera de estas configuraciones
   * https://scanapp.org/html5-qrcode-docs/docs/apis/interfaces/Html5QrcodeCameraScanConfig
   */
  cameraConfig: Html5QrcodeCameraScanConfig;
  /**
  * Uuid of the div
  */
  private uuidGeneric;
  /**
  * Element Html5Qrcode
  */
  private html5QrCode;
  scan: EventEmitter<string>;
  getState(): Promise<Html5QrcodeScannerState>;
  stop(): Promise<void>;
  start(): Promise<never>;
  getCameras(): Promise<void>;
  componentDidLoad(): void;
  render(): any;
}
