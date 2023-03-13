/* tslint:disable */
/* auto-generated angular directive proxies */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, NgZone } from '@angular/core';

import { ProxyCmp, proxyOutputs } from './angular-component-lib/utils';

import type { Components } from 'input-file-from-webcam/components';

import { defineCustomElement as defineInputFileFromWebcam } from 'input-file-from-webcam/components/input-file-from-webcam.js';
@ProxyCmp({
  defineCustomElementFn: defineInputFileFromWebcam,
  inputs: ['drawImageCb', 'facingMode', 'height', 'width'],
  methods: ['takePic', 'toggleCamera']
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


import type { cameratipes as IInputFileFromWebcamcameratipes } from 'input-file-from-webcam/components';

export declare interface InputFileFromWebcam extends Components.InputFileFromWebcam {

  pictureTaken: EventEmitter<CustomEvent<File>>;

  facingModeChanged: EventEmitter<CustomEvent<IInputFileFromWebcamcameratipes>>;
}


