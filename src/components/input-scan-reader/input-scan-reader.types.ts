

export declare const enum InputScanType {
    NUMBER = 'NUMBER',
    URL = 'URL',
    EMAIL = 'EMAIL',
    DNIv1 = 'DNIv1',
    DNIv2 = 'DNIv2',
    LICENCIA_CONDUCIR = 'LICENCIA_CONDUCIR',
    DESCONOCIDO = 'DESCONOCIDO',
    ALFANUMERICO = 'ALFANUMERICO',
  }
  
  export interface InputScanData {
    type: InputScanType,
    text: string,
    data:  any
  }
  