/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from 'av-inputs/components';

import { defineCustomElement as defineInputBarcode } from 'av-inputs/components/input-barcode.js';
import { defineCustomElement as defineInputFaceApiWebcam } from 'av-inputs/components/input-face-api-webcam.js';
import { defineCustomElement as defineInputFileFromWebcam } from 'av-inputs/components/input-file-from-webcam.js';
import { defineCustomElement as defineInputScanReader } from 'av-inputs/components/input-scan-reader.js';
@ProxyCmp({
  defineCustomElementFn: defineInputBarcode
})
@Component({
  selector: 'input-barcode',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class InputBarcode {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
  }
}


export declare interface InputBarcode extends Components.InputBarcode {}


@ProxyCmp({
  defineCustomElementFn: defineInputFaceApiWebcam,
  inputs: ['detectionTimer', 'enableDetection', 'facingMode', 'height', 'scoreThreshold', 'trainedModel', 'width'],
  methods: ['stopDetection', 'startDetection', 'getBlobImageDescriptors', 'getFaceLandMarks', 'predictBestMatch']
})
@Component({
  selector: 'input-face-api-webcam',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['detectionTimer', 'enableDetection', 'facingMode', 'height', 'scoreThreshold', 'trainedModel', 'width'],
})
export class InputFaceApiWebcam {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['faceDetected', 'faceStopDetection']);
  }
}


import type { DetectionImg as IInputFaceApiWebcamDetectionImg } from 'av-inputs/components';

export declare interface InputFaceApiWebcam extends Components.InputFaceApiWebcam {
  /**
   * Event emitted when a face is detected in video stream
   */
  faceDetected: EventEmitter<CustomEvent<IInputFaceApiWebcamDetectionImg>>;
  /**
   * Event emitted when face detection whas stopped
   */
  faceStopDetection: EventEmitter<CustomEvent<void>>;
}


@ProxyCmp({
  defineCustomElementFn: defineInputFileFromWebcam,
  inputs: ['drawImageCb', 'facingMode', 'height', 'width'],
  methods: ['takePic', 'resetCamera', 'toggleCamera']
})
@Component({
  selector: 'input-file-from-webcam',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['drawImageCb', 'facingMode', 'height', 'width'],
})
export class InputFileFromWebcam {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['pictureTaken', 'facingModeChanged']);
  }
}


import type { CameraDirection as IInputFileFromWebcamCameraDirection } from 'av-inputs/components';

export declare interface InputFileFromWebcam extends Components.InputFileFromWebcam {
  /**
   * Event emitted when the user takes a picture
   */
  pictureTaken: EventEmitter<CustomEvent<Blob>>;
  /**
   * Event emitted when the user takes a picture
   */
  facingModeChanged: EventEmitter<CustomEvent<IInputFileFromWebcamCameraDirection>>;
}


@ProxyCmp({
  defineCustomElementFn: defineInputScanReader,
  inputs: ['modalTimer'],
  methods: ['getText', 'getData']
})
@Component({
  selector: 'input-scan-reader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['modalTimer'],
})
export class InputScanReader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['scan']);
  }
}


import type { InputScanData as IInputScanReaderInputScanData } from 'av-inputs/components';

export declare interface InputScanReader extends Components.InputScanReader {
  /**
   * Fired when the user press enter or tab
used with scanners like BARCODES or QR
   */
  scan: EventEmitter<CustomEvent<IInputScanReaderInputScanData>>;
}


