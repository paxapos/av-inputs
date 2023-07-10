import { Component, Host, h, Element, Prop, Event,EventEmitter, Method, State, Watch } from '@stencil/core';
import { DetectionImg, FaceapiService } from '../../utils/facepi.service';
import { CameraDirection, createCanvas, createVideo, initWebcamToVideo, renderToCanvas } from '../../utils/camera.service';
import { Detection, FaceLandmarkerResult } from '@mediapipe/tasks-vision';
import { pxTimer } from 'src/utils/utils';


export interface iFaceDetected{
  blob: Blob
  result: Detection
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



  @Element() el: HTMLElement;

  @State() enableDetection = true;
  @State() isDetecting = true;
  @State() detectionResult: DetectionImg

  @Watch('detectionResult')
  detectionResultChangedHandler(newValue: DetectionImg, oldValue: DetectionImg) {
    if ( newValue?.blobImg ) {
      this.faceDetected.emit(newValue)
    } else {
      if ( oldValue ) {
        this.faceStopDetection.emit()
      }
    }
  }


  @Prop({reflect: true, mutable: true}) width?: number = 460
  @Prop({reflect: true, mutable: true}) height?: number = 460

  @Prop({reflect: true, mutable: true}) scoreThreshold?: number = 0.65

  @Prop({reflect: true, mutable: true}) detectionTimer?: number = 1500

  @Prop({ mutable: true, reflect: true }) facingMode?: CameraDirection = CameraDirection.Front


  @Method()
  async stopDetection(): Promise<void> {
    this.enableDetection = false;
  }

  @Method()
  async startDetection(): Promise<void> {
    this.enableDetection = true;
  }


  @Method()
  async getBlobImageDescriptors(blob: Blob): Promise<FaceLandmarkerResult> {
    return await this.faceapiService.getFaceLandmarksFromBlob( blob )
  }


  @Method()
  async getFaceLandMarks(): Promise<FaceLandmarkerResult> {
    if ( this.detectionResult && this.detectionResult.blobImg ) {
      return await this.faceapiService.getFaceLandmarksFromBlob( this.detectionResult.blobImg )
    } else {
      return null
    }
  }

  @Event({
    eventName: 'faceDetected',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceDetected: EventEmitter<DetectionImg>;


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

    this.faceapiService = new FaceapiService( this.scoreThreshold )

    initWebcamToVideo(this.video, this.facingMode)

    renderToCanvas( this.canvas, this.video)
    
    requestAnimationFrame(() => {
      this.webcamRender() 
    })
  }


  lastVideoTime = -1;

  async webcamRender () {

    const startTimeMs = performance.now();


    // Detect faces using detectForVideo
    if ( this.video.currentTime !== this.lastVideoTime ) {
      this.lastVideoTime = this.video.currentTime;
   
      if ( this.enableDetection ) {
        // get context of canvas and create paning and zoooming to center
        this.detectionResult = await this.faceapiService.detectFace( this.video, startTimeMs )
      }
    }
    
    await pxTimer(this.detectionTimer)

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
