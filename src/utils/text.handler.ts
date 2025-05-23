import { InputScanData } from 'src/components';
import { InputScanDataPersona, InputScanType } from 'src/components/input-scan-reader/input-scan-reader.types';


function getDataFromDNIv1(type: InputScanType, scannedText: string, regRun: RegExpExecArray): InputScanDataPersona {
  return {
    type: type,
    text: scannedText,
    data: {
      apellido: regRun[4],
      nombre: regRun[5],
      dni: regRun[1],
      fecha_nacimiento: regRun[6],
      sexo: regRun[7],
    },
  };
}

function runRegex(text: string): InputScanData {
  text = text.trim();

  const regexToData = [
    // DNI v1 de copilot
    {
      regex: /^\"?(\w{8}) +\"?([a-z])\"?(\w)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])\"?([0-9-]+)/gi,
      type: InputScanType.DNIv1,
      cbk: getDataFromDNIv1,
    },

    // DNI V1 que tenia alevilar antes
    {
      regex: /^\"?(\w{8}) +\"?([a-z])\"?(\w)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])"/gi,
      type: InputScanType.DNIv1,
      cbk: getDataFromDNIv1,
    },

    // DNI v2
    {
      regex: /^\"?(\d+)\"?([a-z ]+)\"?([a-z ]+)\"?([a-z])\"?(\w{8})\"?([a-z])\"?([0-9-]+)/gi,
      type: InputScanType.DNIv2,
      cbk: getDataFromDNIv2,
    },

    // licencia conducir
    {
      regex: /^\"?(\w{8})\"?([a-z])\"?([a-z ]+)\"?([a-z ]+)\"?([a-z]+)\"?([0-9-]+)\"?([a-z])\"?([0-9-]+)/gi,
      type: InputScanType.LICENCIA_CONDUCIR,
      cbk: getDataFromLicenciaDeCOnducir,
    },
    {
      regex: /^([0-9]+)$/gi,
      type: InputScanType.NUMBER,
      cbk: getDataFromRegex,
    },
    {
      regex: /^(?!^\d+$)([a-z0-9]+)$/gi,
      type: InputScanType.ALFANUMERICO,
      cbk: getDataFromRegex,
    },
    {
      regex: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/gi,
      type: InputScanType.URL,
      cbk: getDataFromRegex,
    },
    {
      regex: /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/gi,
      type: InputScanType.EMAIL,
      cbk: getDataFromRegex,
    },
  ];

  for (let i = 0; i < regexToData.length; i++) {
    const regexToDataItem = regexToData[i];
    const regrun = regexToDataItem.regex.exec(text);
    console.info('analizando regex', text.trim(), i, regrun);
    if (regrun) {
      return regexToDataItem.cbk(regexToDataItem.type, text, regrun);
    }
  }

  return null;
}

function getDataFromRegex(type: InputScanType, scannedText: string, regRun: RegExpExecArray): InputScanData {
  return {
    type: type,
    text: scannedText,
    data: regRun,
  };
}

function getDataFromLicenciaDeCOnducir(type: InputScanType, scannedText: string, regRun: RegExpExecArray): InputScanData {
  return getDataFromRegex(type, scannedText, regRun);
}

function getDataFromDNIv2(type: InputScanType, scannedText: string, regRun: RegExpExecArray): InputScanDataPersona {
  return {
    type: type,
    text: scannedText,
    data: {
      apellido: regRun[2],
      nombre: regRun[3],
      dni: regRun[5],
      fecha_nacimiento: regRun[7],
      sexo: regRun[4],
    },
  };
}

export function processText(text: string): InputScanData {
  const scannedData = runRegex(text);

  let data;
  if (scannedData !== null) {
    data = scannedData;
  } else {
    console.info('es desconocidoooo', text);
    data = {
      type: InputScanType.DESCONOCIDO,
      text: text,
      data: {
        text: text,
      },
    };
  }

  return data;
}
