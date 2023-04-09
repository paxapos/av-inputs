export declare enum CameraDirection {
  Rear = "REAR",
  Front = "FRONT"
}
/**
 * Crea un HTMLVideoElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement
 */
export declare function createVideo(parentElement: HTMLElement): HTMLVideoElement;
/**
 * Crea un HTMLCanvasElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement
 */
export declare function createCanvas(parentElement: HTMLElement): HTMLCanvasElement;
export declare function initWebcamToVideo(video: any, direction?: CameraDirection): void;
