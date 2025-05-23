/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'av-inputs';


@ProxyCmp({
  inputs: ['cameraConfig', 'cameraId', 'facingMode', 'height', 'supportedFormats', 'width'],
  methods: ['getState', 'stop', 'start', 'getCameras']
})
@Component({
  selector: 'input-barcode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['cameraConfig', 'cameraId', 'facingMode', 'height', 'supportedFormats', 'width'],
})
export class InputBarcode {
  protected el: HTMLInputBarcodeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['scan']);
  }
}


import type { InputScanData as IInputBarcodeInputScanData } from 'av-inputs';

export declare interface InputBarcode extends Components.InputBarcode {
  /**
   * Event Scan
   */
  scan: EventEmitter<CustomEvent<IInputBarcodeInputScanData>>;
}


@ProxyCmp({
  inputs: ['autoCapture', 'autoStart', 'captureDelay', 'captureThreshold', 'detectionTimer', 'enableDetection', 'facingMode', 'flipButtonText', 'height', 'scoreThreshold', 'showBoundingBoxes', 'showControls', 'showLandmarks', 'startButtonText', 'stopButtonText', 'trainedModel', 'width'],
  methods: ['stopDetection', 'startDetection', 'toggleCamera', 'initializeCamera', 'getBlobImageDescriptors', 'getFaceLandMarks', 'predictBestMatch', 'getDiagnosticInfo']
})
@Component({
  selector: 'input-face-api-webcam',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoCapture', 'autoStart', 'captureDelay', 'captureThreshold', 'detectionTimer', 'enableDetection', 'facingMode', 'flipButtonText', 'height', 'scoreThreshold', 'showBoundingBoxes', 'showControls', 'showLandmarks', 'startButtonText', 'stopButtonText', 'trainedModel', 'width'],
})
export class InputFaceApiWebcam {
  protected el: HTMLInputFaceApiWebcamElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['faceDetected', 'faceStopDetection', 'detectionStarted', 'detectionStopped', 'cameraStarted', 'cameraStopped', 'cameraError', 'facingModeChanged', 'photoCapture']);
  }
}


import type { DetectionImg as IInputFaceApiWebcamDetectionImg } from 'av-inputs';
import type { FaceDetectionError as IInputFaceApiWebcamFaceDetectionError } from 'av-inputs';
import type { CameraDirection as IInputFaceApiWebcamCameraDirection } from 'av-inputs';

export declare interface InputFaceApiWebcam extends Components.InputFaceApiWebcam {
  /**
   * Event emitted when a face is detected in video stream
   */
  faceDetected: EventEmitter<CustomEvent<IInputFaceApiWebcamDetectionImg>>;
  /**
   * Event emitted when face detection was stopped
   */
  faceStopDetection: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when detection starts
   */
  detectionStarted: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when detection stops
   */
  detectionStopped: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when camera starts successfully
   */
  cameraStarted: EventEmitter<CustomEvent<MediaStream>>;
  /**
   * Event emitted when camera stops
   */
  cameraStopped: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when camera encounters an error
   */
  cameraError: EventEmitter<CustomEvent<IInputFaceApiWebcamFaceDetectionError>>;
  /**
   * Event emitted when facing mode changes
   */
  facingModeChanged: EventEmitter<CustomEvent<IInputFaceApiWebcamCameraDirection>>;
  /**
   * Event emitted when a photo is automatically captured
   */
  photoCapture: EventEmitter<CustomEvent<Blob>>;
}


@ProxyCmp({
  inputs: ['autoStart', 'captureButtonText', 'drawImageCb', 'facingMode', 'flashEffect', 'flipButtonText', 'height', 'imageQuality', 'showControls', 'width'],
  methods: ['startCamera', 'stopCamera', 'takePic', 'resetCamera', 'toggleCamera']
})
@Component({
  selector: 'input-file-from-webcam',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['autoStart', 'captureButtonText', 'drawImageCb', 'facingMode', 'flashEffect', 'flipButtonText', 'height', 'imageQuality', 'showControls', 'width'],
})
export class InputFileFromWebcam {
  protected el: HTMLInputFileFromWebcamElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pictureTaken', 'facingModeChanged', 'cameraStarted', 'cameraStopped', 'cameraError']);
  }
}


import type { CameraDirection as IInputFileFromWebcamCameraDirection } from 'av-inputs';
import type { WebcamError as IInputFileFromWebcamWebcamError } from 'av-inputs';

export declare interface InputFileFromWebcam extends Components.InputFileFromWebcam {
  /**
   * Event emitted when the user takes a picture
   */
  pictureTaken: EventEmitter<CustomEvent<Blob>>;
  /**
   * Event emitted when facing mode changes
   */
  facingModeChanged: EventEmitter<CustomEvent<IInputFileFromWebcamCameraDirection>>;
  /**
   * Event emitted when camera starts successfully
   */
  cameraStarted: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when camera stops
   */
  cameraStopped: EventEmitter<CustomEvent<void>>;
  /**
   * Event emitted when camera encounters an error
   */
  cameraError: EventEmitter<CustomEvent<IInputFileFromWebcamWebcamError>>;
}


@ProxyCmp({
  inputs: ['modalTimer', 'scanTitle'],
  methods: ['getText', 'getData', 'start', 'stop']
})
@Component({
  selector: 'input-scan-reader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['modalTimer', 'scanTitle'],
})
export class InputScanReader {
  protected el: HTMLInputScanReaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['scan']);
  }
}


import type { InputScanData as IInputScanReaderInputScanData } from 'av-inputs';

export declare interface InputScanReader extends Components.InputScanReader {
  /**
   * Fired when the user press enter or tab
used with scanners like BARCODES or QR
   */
  scan: EventEmitter<CustomEvent<IInputScanReaderInputScanData>>;
}


