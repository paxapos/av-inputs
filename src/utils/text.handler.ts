import { InputScanData } from "src/components";
import { InputScanDataPersona, InputScanType } from "src/components/input-scan-reader/input-scan-reader.types";




function getDataFromDNIv1 (inputScanner: RegExpExecArray, scannedText: string): InputScanDataPersona {

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


function runRegex( text:string): InputScanData {
    let regex,regrun
      // DNI v1
      // "30368326    "A"1"VILAR"ALEJANDRO ERNESTO"ARGENTINA"07-06-1983"M"13-02-2011"00038329892"7019 "13-02-2026"616"0"ILRÑ2.01 CÑ110128.02 )No Cap.="UNIDADÑ DG200 Plus ÇÇ SERIE NMEROÑ ¡040:2009::0019"
      regex = /^\"?(\w{8}) +\"?([a-z])\"?(\w)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])"/gi
      regrun = regex.exec( text )
      if ( regrun ) {
        return getDataFromDNIv1(regrun,  text ) as InputScanDataPersona;
      }

      // DNI v2
      regex = /^\"?(\d+)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z])\"?(\w{8})\"?([a-z])\"?([0-9-]+)/gi
      regrun = regex.exec( text )
      if ( regrun ) {
        return getDataFromDNIv2(regrun,  text ) as InputScanDataPersona;
      }


      // Licencia de conducir
      regex = /^\"?(\w{8})\"?([a-z])\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])\"?([0-9-]+)/gi
      regrun = regex.exec( text )
      if ( regrun ) {
        return getDataFromLicenciaDeCOnducir( text ) as InputScanDataPersona;
      }




      const regexToData = [
        {
          regex: /^([0-9]+)$/gi, 
          type: InputScanType.NUMBER
        },
        {
          regex: /^(?!^\d+$)([a-z0-9]+)$/gi, 
          type: InputScanType.ALFANUMERICO
        },
        {
          regex:  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi, 
          type: InputScanType.URL
        },
        {
          regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/gi, 
          type: InputScanType.EMAIL
        },
      ]

      for ( let i = 0; i < regexToData.length; i++ ) {
        const regexToDataItem = regexToData[i];
        const regrun = regexToDataItem.regex.exec( text.trim() )
        console.info("analizando regex", text.trim(), i, regrun)
        if ( regrun ) {
          return getDataFromRegex(regexToDataItem.type, text );
        }
      }

      return null;
  }


function getDataFromRegex (type: InputScanType, scannedText: string): InputScanData {
  return {
    type: type,
    text: scannedText,
    }
}

function getDataFromLicenciaDeCOnducir (scannedText: string): InputScanData {
  return getDataFromRegex(InputScanType.LICENCIA_CONDUCIR, scannedText)   
}



function getDataFromDNIv2 (inputScanner: RegExpExecArray, scannedText: string): InputScanDataPersona {
       
    return {
      type: InputScanType.DNIv2,
      text: scannedText,
      data:  {
        apellido: inputScanner[2],
        nombre: inputScanner[3],
        dni: inputScanner[5],
        fecha_nacimiento: inputScanner[7],
        sexo: inputScanner[4],
      }
    }
  }




export function processText(text: string): InputScanData {
    const scannedData = runRegex( text )

    let data;
    if ( scannedData !== null ) {
      data = scannedData;
    } else {
      console.info("es desconocidoooo", text)
      data = {
        type: InputScanType.DESCONOCIDO,
        text: text,
        data:  {
          text: text,
        }
      }
    }

    return data;
  }