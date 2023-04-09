/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from 'input-file-from-webcam/components';

import { defineCustomElement as defineInputFaceApiWebcam } from 'input-file-from-webcam/components/input-face-api-webcam.js';
import { defineCustomElement as defineInputFileFromWebcam } from 'input-file-from-webcam/components/input-file-from-webcam.js';
@ProxyCmp({
  defineCustomElementFn: defineInputFaceApiWebcam,
  inputs: ['height', 'photoPicMinValue', 'width'],
  methods: ['stopDetection', 'startDetection']
})
@Component({
  selector: 'input-face-api-webcam',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content></ng-content>',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['height', 'photoPicMinValue', 'width'],
})
export class InputFaceApiWebcam {
  protected el: HTMLElement;
  constructor(c: ChangeDetectorRef, r: ElementRef, protected z: NgZone) {
    c.detach();
    this.el = r.nativeElement;
    proxyOutputs(this, this.el, ['faceDetected', 'faceMinValueError']);
  }
}


import type { FaceDetection as IInputFaceApiWebcamFaceDetection } from 'input-file-from-webcam/components';

export declare interface InputFaceApiWebcam extends Components.InputFaceApiWebcam {

  faceDetected: EventEmitter<CustomEvent<Blob>>;

  faceMinValueError: EventEmitter<CustomEvent<IInputFaceApiWebcamFaceDetection>>;
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


