import { Component, Host, h, Event, Method, Element, EventEmitter, State, Listen } from '@stencil/core';


export interface InputScanData {
    type: InputScanType,
    text: string,
    data:  any
}


const enum InputScanType {
  URL = 'URL',
  EMAIL = 'EMAIL',
  DNIv1 = 'DNIv1',
  DNIv2 = 'DNIv2',
  LICENCIA_CONDUCIR = 'LICENCIA_CONDUCIR',
  DESCONOCIDO = 'DESCONOCIDO'

}



@Component({
  tag: 'input-scan-reader',
  styleUrl: 'input-scan-reader.css',
  shadow: true,
})
export class InputScanReader {



  @Element() el: HTMLElement;


  runRegex(): InputScanData {
    let regex,regrun
      // DNI v1
      // "30368326    "A"1"VILAR"ALEJANDRO ERNESTO"ARGENTINA"07-06-1983"M"13-02-2011"00038329892"7019 "13-02-2026"616"0"ILRÑ2.01 CÑ110128.02 )No Cap.="UNIDADÑ DG200 Plus ÇÇ SERIE NMEROÑ ¡040:2009::0019"
      regex = /^\"?(\w{8}) +\"?([a-z])\"?(\w)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])"/gi
      regrun = regex.exec(this.scannedText)
      if ( regrun ) {
        return this.getDataFromDNIv1(regrun, this.scannedText);
        
      }

      // DNI v2
      regex = /^\"?(\d+)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z])\"?(\w{8})\"?([a-z])\"?([0-9-]+)/gi
      regrun = regex.exec(this.scannedText)
      if ( regrun ) {
        return this.getDataFromDNIv2(regrun, this.scannedText);
      }


      // Licencia de conducir
      regex = /^\"?(\w{8})\"?([a-z])\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])\"?([0-9-]+)/gi
      regrun = regex.exec(this.scannedText)
      if ( regrun ) {
        return this.getDataFromLicenciaDeCOnducir(regrun, this.scannedText);
      }


      // email
      regex = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/gi
      regrun = regex.exec(this.scannedText)
      if ( regrun ) {
        return this.getDataFromMail(regrun, this.scannedText);
      
      }
      // url
      regex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi
      regrun = regex.exec(this.scannedText)
      if ( regrun ) {
        return this.getDataFromURL(regrun, this.scannedText);
      }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
      if (event.isComposing ) {
        return;
      }

      if(event.code == 'Enter') {
        // emit the scanned data and reset the scannedText
        this.scan.emit(this.scannedData);
        this.scannedText = '';
        this.scannedData = null;
        return;
      } 

      if ( event.key == 'Shift' || event.key == 'Control' || event.key == 'Alt' || event.key == 'Meta' ) {
        return;
      }

      
      // write the string of the event to the scannedText only if it is a letter or a number
      this.scannedText += event.key;
      this.el.textContent = this.scannedText;


      const scannedData = this.runRegex()

      if ( scannedData ) {
        this.scannedData = scannedData;
      } else {
        this.scannedData = {
          type: InputScanType.DESCONOCIDO,
          text: this.scannedText,
          data:  {
            text: this.scannedText,
          }
        }
      }

  }

 

  @State() scannedText = '';
  @State() scannedData: InputScanData;

  @Event() scan: EventEmitter<InputScanData>;


  @Method()
  async showPrompt() {
    // show a prompt
  }


  getDataFromDNIv1 (inputScanner: RegExpExecArray, scannedText: string): InputScanData {

    return {
      type: InputScanType.DNIv1,
      text: scannedText,
      data:  {
        apellido: inputScanner[4],
        nombre: inputScanner[5],
        dni: inputScanner[1],
        fecha_nacimiento: inputScanner[6],
        sexo: inputScanner[7],
      }
    }
  }


  getDataFromDNIv2 (inputScanner: RegExpExecArray, scannedText: string): InputScanData {
       
    return {
      type: InputScanType.DNIv1,
      text: scannedText,
      data:  {
        apellido: inputScanner[2],
        nombre: inputScanner[3],
       
        dni: inputScanner[5]
      }
    }
  }


  getDataFromMail (inputScanner: RegExpExecArray, scannedText: string): InputScanData {
       
    return {
      type: InputScanType.EMAIL,
      text: scannedText,
      data:  {
        email: inputScanner[1],
      }
    }
  }

  getDataFromURL (inputScanner: RegExpExecArray, scannedText: string): InputScanData {

    return {
      type: InputScanType.URL,
      text: scannedText,
      data:  {
        url: inputScanner[1],
      }
    }
  }

  getDataFromLicenciaDeCOnducir (inputScanner: RegExpExecArray, scannedText: string): InputScanData {
       
    return {
      type: InputScanType.DNIv1,
      text: scannedText,
      data:  {
        nosequeva: inputScanner[1],
      }
    }
  }


  render() {
    return (
      <Host>
        <input type="text" value={this.scannedText} />
      </Host>
    );
  }

}
