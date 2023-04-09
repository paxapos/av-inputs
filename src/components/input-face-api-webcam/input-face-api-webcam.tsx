import { Component, Host, h, Element, Prop, Event,EventEmitter, Method, State } from '@stencil/core';
import { FaceapiService } from '../../utils/facepi.service';
import { createCanvas, createVideo, initWebcamToVideo } from '../../utils/camera.service';
import { FaceDetection } from 'face-api.js';

@Component({
  tag: 'input-face-api-webcam',
  styleUrl: 'input-face-api-webcam.css',
  shadow: true,
})
export class InputFaceApiWebcam {

    
  @Element() el: HTMLElement;

  @State() isDetecting = true;


  @Prop({reflect: true, mutable: true}) photoPicMinValue?: number = 300

  @Prop({reflect: true, mutable: true}) width?: number = 460
  @Prop({reflect: true, mutable: true}) height?: number = 460

  @Method()
  async stopDetection(): Promise<void> {
    this.isDetecting = false;
  }

  @Method()
  async startDetection(): Promise<void> {
    this.isDetecting = true;
  }

  video: HTMLVideoElement
  canvas: HTMLCanvasElement
  faceapiService: FaceapiService

  @Event({
    eventName: 'faceDetected',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceDetected: EventEmitter<Blob>;

  @Event({
    eventName: 'faceMinValueError',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceMinValueError: EventEmitter<FaceDetection>;


  async componentWillLoad() {

  }

  async componentDidRender() {
    this.video = createVideo(this.el)
    this.canvas = createCanvas(this.el)


    initWebcamToVideo(this.video)
   
      this.faceapiService = new FaceapiService(this.video, this.canvas)

      this.webcamRender();
    
  }

  async disconnectedCallback() {
  }

  /**
   * 
   * @param result 
   * @returns true si proceso y detecto imagen
   */
  __processReturn(result): boolean {
    let h = result.box.height * 1.5
    let w = result.box.width * 1.5

    // hacer caudrada la imagen
    if ( h > w ) {
        w = h
    } else {
        h = w
    }

    //centrar la imagen
    const x = result.box.x - (w - result.box.width) / 2
    const y = result.box.y - (h - result.box.height) / 2


    if ( w > this.photoPicMinValue ) {

      // zom video into canvas
      this.canvas.getContext('2d').drawImage(this.video, x, y, w, h, 0, 0, this.canvas.width, this.canvas.height)

      // this faceDetected emit blob from this.canvas
      this.canvas.toBlob((blob) => {
        this.faceDetected.emit(blob)
      }, 'image/jpeg', 1)

      return true;
    }

    return false;
  }

  drawCanvasNoFace() {
    this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)
  }

  async webcamRender () {
    
    requestAnimationFrame(() => {
      this.webcamRender() 
    });
    
    if ( this.isDetecting ) {
      
      const result = await this.faceapiService.detectFace()
  
      this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height)
      
      if (result ) {
        if ( !this.__processReturn(result) ) {
          this.faceMinValueError.emit(result)
          this.drawCanvasNoFace();
        }
      } else {
        this.drawCanvasNoFace()
      }
      
    }
};


  render() {
    return (
      <Host style={{height: this.height+"px", width: this.width+"px"}}>

        <slot name='before'></slot>
        
        <slot></slot>

        <slot name='after'></slot>
      </Host>
    );
  }

}
