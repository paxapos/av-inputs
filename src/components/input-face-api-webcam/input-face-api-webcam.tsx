import { Component, Host, h, Element, Prop, Event,EventEmitter, Method, State } from '@stencil/core';
import { FaceapiService } from '../../utils/facepi.service';
import { CameraDirection, createCanvas, createVideo, initWebcamToVideo } from '../../utils/camera.service';
import { FaceDetection } from 'face-api.js';


export interface iFaceDetected{
  blob: Blob
  result: FaceDetection
}

@Component({
  tag: 'input-face-api-webcam',
  styleUrl: 'input-face-api-webcam.css',
  shadow: true,
})
export class InputFaceApiWebcam {
  
  //webcam stream
  video: HTMLVideoElement

  //canvas to draw webcam
  canvas: HTMLCanvasElement

  //faceapi service
  faceapiService: FaceapiService

  // timer to detect face bassed on detectionTimer
  resultTimer: NodeJS.Timeout

  // last result
  result: FaceDetection = null

  curCords = {x: 0, y: 0}
  toCords = {x: 0, y: 0}

    
  @Element() el: HTMLElement;

  @State() isDetecting = true;


  @Prop({reflect: true, mutable: true}) width?: number = 460
  @Prop({reflect: true, mutable: true}) height?: number = 460

  /** Minimun input size of face */
  @Prop({reflect: true, mutable: true}) inputSize?: number = 192

  @Prop({reflect: true, mutable: true}) scoreThreshold?: number = 0.7

  @Prop({reflect: true, mutable: true}) detectionTimer?: number = 1500

  @Prop({ mutable: true, reflect: true }) facingMode?: CameraDirection = CameraDirection.Front


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
  }) faceDetected: EventEmitter<iFaceDetected>;


  @Event({
    eventName: 'faceStopDetection',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceStopDetection: EventEmitter<void>;


  async componentWillLoad() {
   
    this.video = createVideo()

    this.canvas = createCanvas(this.el)
    this.canvas.width = this.width
    this.canvas.height = this.height

    this.el.appendChild(this.canvas)


    this.faceapiService = new FaceapiService()


  }

  async componentDidRender() {
    initWebcamToVideo(this.video, this.facingMode)
   
    this.webcamRender();
    
  }



  /**
   * 
   * @param result 
   * @returns true si proceso y detecto imagen
   */
  emitBlob(result): Promise<Blob> {

    return new Promise((resolve, reject) => {
      try {
        // this faceDetected emit blob from this.canvas
        this.canvas.toBlob((blob) => {
          const iface = {blob, result}
          this.faceDetected.emit(iface)
          resolve(blob)
        }, 'image/jpeg', 1)
    
      } catch (error) {
        reject(error)
      }

    })

  }


 
  async webcamRender () {
    

    let ctx = this.canvas.getContext('2d');
    this.drawWebcamnToCanvas(ctx);
    
    // get context of canvas and create paning and zoooming to center
    console.info("el TIMER es", this.resultTimer, this.detectionTimer)
    if ( this.isDetecting && !this.resultTimer) {
        
      const result = await this.faceapiService.detectFace( this.canvas, this.inputSize, this.scoreThreshold )
      
      if ( result ) {
        this.toCords = {x: Math.ceil(result.box.x), y: Math.ceil(result.box.y)}

        try {
          // saca una foto del canvas y genera el BLOB para emitir
          await this.emitBlob(result)
        } catch (e) {
          console.error(e)
        }
      } else {

        this.faceStopDetection.emit()

        ctx.translate(0, 0);
        ctx.scale(1, 1);
        this.toCords = {x: 0, y: 0}
  
      }
      this.result = result
        
      this.resultTimer = setTimeout(async () => {
        clearTimeout(this.resultTimer)
        this.resultTimer = null

      }, Math.abs(this.detectionTimer))
    }

    
    requestAnimationFrame(() => {
      this.webcamRender() 
    })
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
