export declare enum CameraDirection {
  Rear = "REAR",
  Front = "FRONT"
}
/**
 * Crea un HTMLVideoElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement
 */
export declare function createVideo(): HTMLVideoElement;
/**
 * Crea un HTMLCanvasElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement
 */
export declare function createCanvas(parentElement: HTMLElement): HTMLCanvasElement;
export declare function renderToCanvas(canvas: any, video: any, drawImageCb: Function | null): number;
export declare function takePicture(canvas: any, compression?: number): Promise<File>;
export declare function initWebcamToVideo(video: any, direction?: CameraDirection): Promise<unknown>;
