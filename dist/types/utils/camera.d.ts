import { CameraDirection } from "./camera.service";
interface SuperCamera {
    initCamera(parentElement: HTMLElement, direction: CameraDirection, drawImageCb: Function): Promise<HTMLCanvasElement>;
    takePicture(): Promise<Blob>;
    resetCamera(): void;
}
export declare class WebCamera implements SuperCamera {
    private elVideo;
    private stream;
    private canvas;
    initCamera(parentElement: HTMLElement, direction: CameraDirection, drawImageCb?: Function): Promise<HTMLCanvasElement>;
    resetCamera(): void;
    takePicture(quality?: number): Promise<File>;
}
export declare const camera: WebCamera;
export {};
