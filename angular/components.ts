/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from 'input-file-from-webcam/components';

import { defineCustomElement as defineInputFaceApiWebcam } from 'input-file-from-webcam/components/input-face-api-webcam.js';
import { defineCustomElement as defineInputFileFromWebcam } from 'input-file-from-webcam/components/input-file-from-webcam.js';
import { defineCustomElement as defineInputScanReader } from 'input-file-from-webcam/components/input-scan-reader.js';
@ProxyCmp({
  defineCustomElementFn: defineInputFaceApiWebcam,
  inputs: ['detectionTimer', 'facingMode', 'height', 'inputSize', 'scoreThreshold', 'width'],
  methods: ['stopDetection', 'startDetection']
})
@Component({
  selector: 'input-face-api-webcam',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['detectionTimer', 'facingMode', 'height', 'inputSize', 'scoreThreshold', 'width'],
})
export class InputFaceApiWebcam {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['faceDetected', 'faceStopDetection']);
  }
}


import type { iFaceDetected as IInputFaceApiWebcamiFaceDetected } from 'input-file-from-webcam/components';

export declare interface InputFaceApiWebcam extends Components.InputFaceApiWebcam {

  faceDetected: EventEmitter<CustomEvent<IInputFaceApiWebcamiFaceDetected>>;

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


import type { CameraDirection as IInputFileFromWebcamCameraDirection } from 'input-file-from-webcam/components';

export declare interface InputFileFromWebcam extends Components.InputFileFromWebcam {

  pictureTaken: EventEmitter<CustomEvent<Blob>>;

  facingModeChanged: EventEmitter<CustomEvent<IInputFileFromWebcamCameraDirection>>;
}


@ProxyCmp({
  defineCustomElementFn: defineInputScanReader,
  methods: ['showPrompt']
})
@Component({
  selector: 'input-scan-reader',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: [],
})
export class InputScanReader {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['scan']);
  }
}


import type { InputScanData as IInputScanReaderInputScanData } from 'input-file-from-webcam/components';

export declare interface InputScanReader extends Components.InputScanReader {

  scan: EventEmitter<CustomEvent<IInputScanReaderInputScanData>>;
}


