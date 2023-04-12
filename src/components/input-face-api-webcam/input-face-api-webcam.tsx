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
  faceFound: Blob = null;

  // canvas to store photo
  photoCanvas: HTMLCanvasElement

  //webcam stream
  video: HTMLVideoElement

  //canvas to draw webcam
  canvas: HTMLCanvasElement

  //faceapi service
  faceapiService: FaceapiService

  // timer to detect face bassed on detectionTimer
  pictureTimer: any = null

  // last result
  result: FaceDetection = null

  noDetectedCounter = 0

    
  @Element() el: HTMLElement;

  @State() isDetecting = true;


  @Prop({reflect: true, mutable: true}) width?: number = 460
  @Prop({reflect: true, mutable: true}) height?: number = 460

  @Prop({reflect: true, mutable: true}) detectionTimer?: number = 1000

  @Method()
  async stopDetection(): Promise<void> {
    this.isDetecting = false;
  }

  @Method()
  async startDetection(): Promise<void> {
    this.isDetecting = true;
  }



  @Event({
    eventName: 'faceDetected',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceDetected: EventEmitter<Blob>;


  @Event({
    eventName: 'faceStopDetection',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceStopDetection: EventEmitter<void>;


  async componentWillLoad() {
   
    this.video = createVideo()
    //this.el.appendChild(this.video)

    this.canvas = createCanvas(this.el)
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.el.appendChild(this.canvas)


    this.photoCanvas = createCanvas(this.el)
    this.photoCanvas.width = this.width
    this.photoCanvas.height = this.height

    //this.el.appendChild(this.photoCanvas)
    this.faceapiService = new FaceapiService()


  }

  async componentDidRender() {

    initWebcamToVideo(this.video)
   

    this.webcamRender();
    
  }

  async disconnectedCallback() {
  }

  /**
   * 
   * @param result 
   * @returns true si proceso y detecto imagen
   */
  getPicZoom(): Promise<Blob> {

    if ( this.pictureTimer ) {
      return null
    }

    this.pictureTimer = setTimeout(() => {
      this.pictureTimer = null
    }, this.detectionTimer)

    return new Promise((resolve, reject) => {
  
      try {
        
        // this faceDetected emit blob from this.canvas
        this.canvas.toBlob((blob) => {
          this.faceDetected.emit(blob)
          resolve(blob)
        }, 'image/jpeg', 1)
    
      } catch (error) {
        reject(error)
      }

    })

  }



  zoomTimer: any = null
  tcoords = {
    z: 1,
    x: 0,
    y: 0
  }

  handleStopDetection() {
    if ( this.faceFound ) {
      console.info("STOOPPPP detectiopnm")
      this.faceStopDetection.emit()
    }
    this.faceFound = null
  }
 
  async webcamRender () {
    if (this.pictureTimer ) {
      setTimeout(() => {
        requestAnimationFrame(() => {
          this.webcamRender() 
        })
      }, 100);
    } else {
      requestAnimationFrame(() => {
        this.webcamRender() 
      })
    }
    
    if ( this.isDetecting ) {

      const result = await this.faceapiService.detectFace( this.video )

      let ctx = this.canvas.getContext('2d');

      this.drawWebcamnToCanvas(ctx);
      
      if (result ) {
        try {
          // center face in canvas
         this.getPicZoom()

        } catch (e) {
          console.error(e)
          this.handleStopDetection()
        }
      } else {
          ctx.setTransform(1, 0, 0, 1, 0, 0);
          this.handleStopDetection()
      }
      this.result = result

    }
    
};


drawWebcamnToCanvas(ctx) {
  let imgWidth = this.video.videoWidth;
  let imgHeight = this.video.videoHeight;

  var imgSize = Math.min(imgWidth, imgHeight);
    // The following two lines yield a central based cropping.
    // They can both be amended to be 0, if you wish it to be
    // a left based cropped image.
  var left = (imgWidth - imgSize) / 2;
  var top = (imgHeight - imgSize) / 2;

  // ctx clear all
  ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

  ctx.drawImage(this.video, left, top, imgSize, imgSize, 0,0, this.canvas.width, this.canvas.height);
}


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
