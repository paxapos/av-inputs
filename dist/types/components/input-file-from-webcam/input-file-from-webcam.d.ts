import { CameraDirection } from '@capacitor/camera';
import { EventEmitter } from '../../stencil-public-runtime';
export declare class InputFileFromWebcam {
  el: HTMLElement;
  width?: number;
  height?: number;
  /**
   * FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
   */
  facingMode?: CameraDirection;
  /**
   * you can pass a function and override the canvas.drawImage function so you
   * can change the image adding filters or any kind of magin in your image
   *
   * you just need to crear a function with all canvas.-drawImage arguments
   *
   * here you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height
   */
  drawImageCb?: Function;
  takePic(): Promise<Blob>;
  resetCamera(): Promise<void>;
  toggleCamera(): Promise<void>;
  pictureTaken: EventEmitter<Blob>;
  facingModeChanged: EventEmitter<CameraDirection>;
  onClickHandler(): void;
  /**
   * Toogle webcam, for example in mobile show front or back camera
   * you can block this behaviour by setting the facingMode Property
   */
  private __toogleFacingMode;
  componentWillMount(): void;
  componentDidRender(): Promise<void>;
  disconnectedCallback(): Promise<void>;
  render(): any;
}
