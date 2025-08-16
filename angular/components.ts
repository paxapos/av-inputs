/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import { Components } from 'av-inputs';


@ProxyCmp({
  inputs: ['accessibilityLabel', 'ariaDescribedby', 'autoFocus', 'autoStart', 'cameraConfig', 'cameraId', 'disabled', 'facingMode', 'height', 'maxlength', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'supportedFormats', 'tabOrder', 'validationMessage', 'value', 'width'],
  methods: ['getState', 'stop', 'getFormValue', 'setFormValue', 'checkValidity', 'setFocus', 'setBlur', 'start', 'getCameras']
})
@Component({
  selector: 'input-barcode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accessibilityLabel', 'ariaDescribedby', 'autoFocus', 'autoStart', 'cameraConfig', 'cameraId', 'disabled', 'facingMode', 'height', 'maxlength', 'minlength', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'supportedFormats', 'tabOrder', 'validationMessage', 'value', 'width'],
})
export class InputBarcode {
  protected el: HTMLInputBarcodeElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['inputChange', 'valueChange', 'focusGained', 'focusLost', 'validationFailed', 'scan']);
  }
}


import type { Event as IInputBarcodeEvent } from 'av-inputs';

export declare interface InputBarcode extends Components.InputBarcode {
  /**
   * Emitted when input value changes (standard form event)
   */
  inputChange: EventEmitter<CustomEvent<IInputBarcodeEvent>>;
  /**
   * Emitted when input value is committed (standard form event)
   */
  valueChange: EventEmitter<CustomEvent<IInputBarcodeEvent>>;
  /**
   * Emitted when component gains focus (standard form event)
   */
  focusGained: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when component loses focus (standard form event)
   */
  focusLost: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Emitted when input validation fails (standard form event)
   */
  validationFailed: EventEmitter<CustomEvent<IInputBarcodeEvent>>;
  /**
   * Emitted when a barcode is successfully scanned
   */
  scan: EventEmitter<CustomEvent<string>>;
}


@ProxyCmp({
  inputs: ['accessibilityLabel', 'ariaDescribedby', 'autoCapture', 'autoFocus', 'autoStart', 'captureDelay', 'captureThreshold', 'customValidation', 'detectionTimer', 'disabled', 'enableDetection', 'facingMode', 'flipButtonText', 'height', 'name', 'placeholder', 'readonly', 'required', 'scoreThreshold', 'showBoundingBoxes', 'showControls', 'showLandmarks', 'startButtonText', 'stopButtonText', 'tabOrder', 'trainedModel', 'validationMessage', 'value', 'width'],
  methods: ['stopDetection', 'startDetection', 'toggleCamera', 'initializeCamera', 'getBlobImageDescriptors', 'getFaceLandMarks', 'predictBestMatch', 'getDiagnosticInfo', 'getFormValue', 'setFormValue', 'checkValidity', 'getValidationMessage', 'setCustomValidity', 'setFocus', 'setBlur']
})
@Component({
  selector: 'input-face-api-webcam',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accessibilityLabel', 'ariaDescribedby', 'autoCapture', 'autoFocus', 'autoStart', 'captureDelay', 'captureThreshold', 'customValidation', 'detectionTimer', 'disabled', 'enableDetection', 'facingMode', 'flipButtonText', 'height', 'name', 'placeholder', 'readonly', 'required', 'scoreThreshold', 'showBoundingBoxes', 'showControls', 'showLandmarks', 'startButtonText', 'stopButtonText', 'tabOrder', 'trainedModel', 'validationMessage', 'value', 'width'],
})
export class InputFaceApiWebcam {
  protected el: HTMLInputFaceApiWebcamElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['faceDetected', 'faceStopDetection', 'detectionStarted', 'detectionStopped', 'cameraStarted', 'cameraStopped', 'cameraError', 'facingModeChanged', 'photoCapture', 'inputChange', 'valueChange', 'focusGained', 'focusLost', 'validationFailed']);
  }
}


import type { DetectionImg as IInputFaceApiWebcamDetectionImg } from 'av-inputs';
import type { FaceDetectionError as IInputFaceApiWebcamFaceDetectionError } from 'av-inputs';
import type { CameraDirection as IInputFaceApiWebcamCameraDirection } from 'av-inputs';
import type { Event as IInputFaceApiWebcamEvent } from 'av-inputs';

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
  /**
   * Standard input event when face detection data changes
   */
  inputChange: EventEmitter<CustomEvent<IInputFaceApiWebcamEvent>>;
  /**
   * Standard change event when detection data is committed
   */
  valueChange: EventEmitter<CustomEvent<IInputFaceApiWebcamEvent>>;
  /**
   * Standard focus event
   */
  focusGained: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Standard blur event
   */
  focusLost: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Standard invalid event for form validation
   */
  validationFailed: EventEmitter<CustomEvent<IInputFaceApiWebcamEvent>>;
}


@ProxyCmp({
  inputs: ['accept', 'accessibilityLabel', 'ariaDescribedby', 'autoFocus', 'autoStart', 'captureButtonText', 'customValidation', 'disabled', 'drawImageCb', 'facingMode', 'flashEffect', 'flipButtonText', 'height', 'imageQuality', 'maxFileSize', 'name', 'placeholder', 'readonly', 'required', 'showActionButtons', 'showControls', 'tabOrder', 'validationMessage', 'value', 'width'],
  methods: ['startCamera', 'stopCamera', 'takePic', 'getFormValue', 'setFormValue', 'checkValidity', 'setFocus', 'setBlur', 'resetCamera', 'releaseCamera', 'requestCamera', 'toggleCamera']
})
@Component({
  selector: 'input-file-from-webcam',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accept', 'accessibilityLabel', 'ariaDescribedby', 'autoFocus', 'autoStart', 'captureButtonText', 'customValidation', 'disabled', 'drawImageCb', 'facingMode', 'flashEffect', 'flipButtonText', 'height', 'imageQuality', 'maxFileSize', 'name', 'placeholder', 'readonly', 'required', 'showActionButtons', 'showControls', 'tabOrder', 'validationMessage', 'value', 'width'],
})
export class InputFileFromWebcam {
  protected el: HTMLInputFileFromWebcamElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pictureTaken', 'inputChange', 'valueChange', 'focusGained', 'focusLost', 'validationFailed', 'facingModeChanged', 'cameraStarted', 'cameraStopped', 'cameraError']);
  }
}


import type { Event as IInputFileFromWebcamEvent } from 'av-inputs';
import type { CameraDirection as IInputFileFromWebcamCameraDirection } from 'av-inputs';
import type { WebcamError as IInputFileFromWebcamWebcamError } from 'av-inputs';

export declare interface InputFileFromWebcam extends Components.InputFileFromWebcam {
  /**
   * Event emitted when the user takes a picture
   */
  pictureTaken: EventEmitter<CustomEvent<Blob>>;
  /**
   * Standard input event when value changes
   */
  inputChange: EventEmitter<CustomEvent<IInputFileFromWebcamEvent>>;
  /**
   * Standard change event when value is committed
   */
  valueChange: EventEmitter<CustomEvent<IInputFileFromWebcamEvent>>;
  /**
   * Standard focus event
   */
  focusGained: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Standard blur event
   */
  focusLost: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Standard invalid event for form validation
   */
  validationFailed: EventEmitter<CustomEvent<IInputFileFromWebcamEvent>>;
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
  inputs: ['accessibilityLabel', 'ariaDescribedby', 'autoFocus', 'disabled', 'inputTimeout', 'maxlength', 'minInputLength', 'minlength', 'modalTimer', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'scanTitle', 'tabOrder', 'validationMessage', 'value'],
  methods: ['getText', 'getData', 'getFormValue', 'setFormValue', 'checkValidity', 'setFocus', 'setBlur', 'start', 'stop']
})
@Component({
  selector: 'input-scan-reader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['accessibilityLabel', 'ariaDescribedby', 'autoFocus', 'disabled', 'inputTimeout', 'maxlength', 'minInputLength', 'minlength', 'modalTimer', 'name', 'pattern', 'placeholder', 'readonly', 'required', 'scanTitle', 'tabOrder', 'validationMessage', 'value'],
})
export class InputScanReader {
  protected el: HTMLInputScanReaderElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['scan', 'inputChange', 'valueChange', 'focusGained', 'focusLost', 'validationFailed']);
  }
}


import type { InputScanData as IInputScanReaderInputScanData } from 'av-inputs';
import type { Event as IInputScanReaderEvent } from 'av-inputs';

export declare interface InputScanReader extends Components.InputScanReader {
  /**
   * Event emitted when scanner completes reading
   */
  scan: EventEmitter<CustomEvent<IInputScanReaderInputScanData>>;
  /**
   * Standard input event when value changes
   */
  inputChange: EventEmitter<CustomEvent<IInputScanReaderEvent>>;
  /**
   * Standard change event when value is committed
   */
  valueChange: EventEmitter<CustomEvent<IInputScanReaderEvent>>;
  /**
   * Standard focus event
   */
  focusGained: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Standard blur event
   */
  focusLost: EventEmitter<CustomEvent<FocusEvent>>;
  /**
   * Standard invalid event for form validation
   */
  validationFailed: EventEmitter<CustomEvent<IInputScanReaderEvent>>;
}


