export declare class CameraService {
  elVideo: HTMLVideoElement;
  stream: MediaStream;
  canvas: HTMLCanvasElement;
  constructor();
  fotoActual: any;
  capacitorTakePicture(): Promise<import("@capacitor/camera").Photo>;
  initCamera(elVideo: HTMLVideoElement, elCanvas: HTMLCanvasElement, facingMode?: ConstrainDOMString, drawImageCb?: Function): Promise<void>;
  renderToCanvas(drawImageCb?: Function): void;
  resetCamera(): void;
  takePic(): Promise<File>;
}
export declare const camera: CameraService;
