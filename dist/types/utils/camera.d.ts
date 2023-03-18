import { CameraDirection } from '@capacitor/camera';
interface SuperCamera {
  initCamera(parentElement: HTMLElement, direction: CameraDirection, drawImageCb: Function): Promise<void>;
  takePicture(): Promise<Blob>;
  resetCamera(): void;
}
export declare class WebCamera implements SuperCamera {
  elVideo: HTMLVideoElement;
  stream: MediaStream;
  canvas: HTMLCanvasElement;
  direction: CameraDirection;
  constructor();
  fotoActual: any;
  initCamera(parentElement: HTMLElement, direction: CameraDirection, drawImageCb?: Function): Promise<void>;
  renderToCanvas(drawImageCb?: Function): void;
  resetCamera(): void;
  takePicture(): Promise<File>;
}
export declare class CapacitorCamera implements SuperCamera {
  initCamera(): Promise<void>;
  takePicture(): Promise<Blob>;
  resetCamera(): void;
}
export declare class CameraService {
  private camaraManager;
  constructor();
  initCamera(parentElement: HTMLElement, cameraDirection: CameraDirection, drawImageCb?: Function): Promise<void>;
  takePicture(): Promise<Blob>;
  resetCamera(): Promise<void>;
}
export declare const camera: CameraService;
export {};
