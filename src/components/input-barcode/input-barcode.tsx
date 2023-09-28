import { Component, EventEmitter, Host,Event, Prop, h, Method, Build } from '@stencil/core';
import {Html5Qrcode, Html5QrcodeCameraScanConfig, Html5QrcodeFullConfig, Html5QrcodeScannerState, Html5QrcodeSupportedFormats} from "html5-qrcode";
import { v4 as uuidv4 } from 'uuid';


@Component({
  tag: 'input-barcode',
  styleUrl: 'input-barcode.css',
  shadow: false
})
export class InputBarcode {

  @Prop() cameraId: string
  @Prop() width: string = '400px'
  @Prop() height: string = '200px'
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
  @Prop() facingMode: 'user'|'enviroment' = 'enviroment'
  /**
   * Cualquiera de estas configuraciones
   * https://scanapp.org/html5-qrcode-docs/docs/apis/interfaces/Html5QrcodeCameraScanConfig
   */
  @Prop() cameraConfig: Html5QrcodeCameraScanConfig = {
    fps: 10,
    
  }

  private uuidGeneric: string = uuidv4()

  private html5QrCode: Html5Qrcode

  @Event() scan: EventEmitter<string>;


  @Method()
  async getState(): Promise<Html5QrcodeScannerState> {
    return this.html5QrCode.getState()
  }


  @Method()
  async stop() {
    return await this.html5QrCode.stop()
  }


  @Method()
  async start() {
    return await this.html5QrCode.start(
      {facingMode: this.facingMode},
      this.cameraConfig,
      (decodedText) => {
        this.scan.emit(decodedText)
      },
      (errorMessage) => {
        throw new Error(`Error al escanear: ${errorMessage}`);
      })
    .catch((err) => {
      throw new Error(`Error al iniciar scanner: ${err}`);
    });
  }


  @Method()
  async getCameras() {
     // This method will trigger user permissions
     Html5Qrcode.getCameras().then(devices => {
      console.info('paso por aca')
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
    console.info('entrooo',this.supportedFormats)
    const config: Html5QrcodeFullConfig = {
      verbose: Build.isDev,
      formatsToSupport: this.supportedFormats,
    };
    this.html5QrCode = new Html5Qrcode(this.uuidGeneric, config);

    this.start()   
  }


  render() {
    console.info('entrooo 2')
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
