import { Component, EventEmitter, Host,Event, Prop, h, Method, Build } from '@stencil/core';
import {Html5Qrcode, Html5QrcodeCameraScanConfig, Html5QrcodeFullConfig, Html5QrcodeScannerState, Html5QrcodeSupportedFormats} from "html5-qrcode";
import { v4 as uuidv4 } from 'uuid';
import { InputScanData } from '../input-scan-reader/input-scan-reader.types';
import { processText } from 'src/utils/text.handler';


@Component({
  tag: 'input-barcode',
  styleUrl: 'input-barcode.css',
  shadow: false
})
export class InputBarcode {

   /**
   * id of camera
   */
  @Prop() cameraId: string
   /**
   * Width of the camera
   */
  @Prop() width: string = '400px'
   /**
   * Height of the camera
   */
  @Prop() height: string = '200px'
   /**
   * All formats of camera
   */
  @Prop() supportedFormats: Html5QrcodeSupportedFormats[] = [
    Html5QrcodeSupportedFormats.QR_CODE,
    Html5QrcodeSupportedFormats.AZTEC,
    Html5QrcodeSupportedFormats.CODABAR,
    Html5QrcodeSupportedFormats.CODE_39,
    Html5QrcodeSupportedFormats.CODE_93,
    Html5QrcodeSupportedFormats.CODE_128,
    Html5QrcodeSupportedFormats.DATA_MATRIX,
    Html5QrcodeSupportedFormats.MAXICODE,
    Html5QrcodeSupportedFormats.ITF,
    Html5QrcodeSupportedFormats.EAN_13,
    Html5QrcodeSupportedFormats.EAN_8,
    Html5QrcodeSupportedFormats.PDF_417,
    Html5QrcodeSupportedFormats.RSS_14,
    Html5QrcodeSupportedFormats.RSS_EXPANDED,
    Html5QrcodeSupportedFormats.UPC_A,
    Html5QrcodeSupportedFormats.UPC_E,
    Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION
  ]
   /**
   * Camera user or enviroment
   */
  @Prop() facingMode: 'user'|'enviroment' = 'enviroment'
  /**
   * Cualquiera de estas configuraciones
   * https://scanapp.org/html5-qrcode-docs/docs/apis/interfaces/Html5QrcodeCameraScanConfig
   */
  @Prop() cameraConfig: Html5QrcodeCameraScanConfig = {
    fps: 10,
    
  }

   /**
   * Uuid of the div
   */
  private uuidGeneric: string = uuidv4()

   /**
   * Element Html5Qrcode
   */
  private html5QrCode: Html5Qrcode

  /**
   * Event Scan
   */
  @Event() scan: EventEmitter<InputScanData>;

  /**
   * get state
   */
  @Method()
  async getState(): Promise<Html5QrcodeScannerState> {
    return this.html5QrCode.getState()
  }


  @Method()
  async stop() {
    return await this.html5QrCode.stop()
  }



  private lastScan:string = ''
  private scanTimer: NodeJS.Timeout = null;
  /**
   * Para asegurarse de que no lea inmediatamente el mismo DNI escaneado
   * @param decodedText 
   */
  private handleDecodedText(decodedText){
    if ( this.lastScan != decodedText ) {
      this.lastScan = decodedText;
      clearTimeout(this.scanTimer);
      this.scanTimer = setTimeout(() => {
        this.lastScan = '';
      }, 5000);
    }
  }


  @Method()
  async start() {
    return await this.html5QrCode.start(
      {facingMode: this.facingMode},
      this.cameraConfig,
      (decodedText) => {
        const scannedData = processText(decodedText);
        this.scan.emit(scannedData);
        this.handleDecodedText(decodedText)
      },
      (errorMessage) => {
        throw new Error(`Error al escanear: ${errorMessage}`);
      })
    .catch((err) => {
      throw new Error(`Error al iniciar scanner: ${err}`);
    });
  }


  /**
   * get Cameras of user
   */
  @Method()
  async getCameras() {
     // This method will trigger user permissions
     Html5Qrcode.getCameras().then(devices => {
      /**
       * devices would be an array of objects of type:
       * { id: "id", label: "label" }
       */
      console.info('devices',devices)
      if (devices && devices.length) {
        let cameraId = devices[0].id;
        return cameraId
        // .. use this to start scanning.
      }
    }).catch(err => {
      console.error(err)
      // handle err
    });
  }

  componentDidLoad(){
    const config: Html5QrcodeFullConfig = {
      verbose: Build.isDev,
      formatsToSupport: this.supportedFormats,
    };
    this.html5QrCode = new Html5Qrcode(this.uuidGeneric, config);

    this.start()   
  }


  render() {
    const hostStyle = {
      'width' : this.width,
      'height' : this.height,
      'overflow': 'hidden',
      'display': 'inline-block'
    }
    return (
      <Host style={hostStyle}>
        <div id={this.uuidGeneric}></div>
      </Host>
    );
  }

}
