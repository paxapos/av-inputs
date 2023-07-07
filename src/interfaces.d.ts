
declare const enum InputScanType {
    URL = 'URL',
    EMAIL = 'EMAIL',
    DNIv1 = 'DNIv1',
    DNIv2 = 'DNIv2',
    LICENCIA_CONDUCIR = 'LICENCIA_CONDUCIR',
    DESCONOCIDO = 'DESCONOCIDO'
  
  }

interface InputScanData {
    type: InputScanType,
    text: string,
    data:  any
}

