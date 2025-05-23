

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

  export interface InputDataPersona {
      apellido: string,
      nombre: string,
      dni: string,
      fecha_nacimiento: string,
      sexo: string,
  }

  export interface InputScanData {
    type: InputScanType,
    text: string,
    data: any
  }

  export interface InputScanDataPersona extends InputScanData{
    data:  InputDataPersona
  }
