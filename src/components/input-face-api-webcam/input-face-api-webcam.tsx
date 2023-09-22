import { Component, Host, h, Element, Prop, Event,EventEmitter, Method, State, Watch } from '@stencil/core';
import { DetectionImg, faceapiService } from '../../utils/facepi.service';
import { CameraDirection, createCanvas, createVideo, initWebcamToVideo, renderToCanvas } from '../../utils/camera.service';
import { Detection, FaceLandmarkerResult } from '@mediapipe/tasks-vision';
import { pxTimer } from 'src/utils/utils';
import { LabeledDescriptorsArray } from './TrainedModel';
import { getBestMatch } from './distance.worker';


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



  @Element() el: HTMLElement;

  @State() enableDetection = true;
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

  /**
   * disable face detection
   */
  @Prop({reflect: true, mutable: true}) isDetecting = true;



  /**
   * trained models to use for recognition an best match
   */
  @Prop({reflect: false}) trainedModel?: LabeledDescriptorsArray


  /**
   * Width of the video element
   */
  @Prop({reflect: true, mutable: true}) width?: number = 460

  /**
   * height of the video element
   */
  @Prop({reflect: true, mutable: true}) height?: number = 460

  /**
   * Score threshold to detect a face
   */
  @Prop({reflect: true, mutable: true}) scoreThreshold?: number = 0.65

  /**
   * Score threshold to detect a face
   */
  @Prop({reflect: true, mutable: true}) detectionTimer?: number = 1500

  /**
   * FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
   */
  @Prop({ mutable: true, reflect: true }) facingMode?: CameraDirection = CameraDirection.Front


  /**
   * disable face detection
   */
  @Method()
  async stopDetection(): Promise<void> {
    this.enableDetection = false;
  }

  /**
   * enable face detection
   */
  @Method()
  async startDetection(): Promise<void> {
    this.enableDetection = true;
  }


  /**
   * Giving a blob image, get the face landmarks
   * @returns face landmarks
   */
  @Method()
  async getBlobImageDescriptors(blob: Blob): Promise<FaceLandmarkerResult> {
    return await faceapiService.getFaceLandmarksFromBlob( blob )
  }

  /**
   * Giving current face in video canvas, get the face landmarks
   * @returns face landmarks
   */
  @Method()
  async getFaceLandMarks(): Promise<FaceLandmarkerResult> {
    if ( this.detectionResult && this.detectionResult.blobImg ) {
      return await faceapiService.getFaceLandmarksFromBlob( this.detectionResult.blobImg )
    } else {
      return null
    }
  }

  /**
   * Predicts best face match, uses worker to calculate distance between the given blob and the trained model 
   * passed in trainedModel prop
   * @param blob 
   * @returns 
   */
  @Method()
  async predictBestMatch(blob?: Blob): Promise<any> {
    console.info("tyrained model es", this.trainedModel);
    if ( !this.trainedModel ) {
      return null;
    }

    let lm;
    if ( !blob ) {
      lm = await faceapiService.getFaceLandmarksFromBlob( blob )
    } else {
      lm = await this.getFaceLandMarks()
    }
    // for each trained model of this.trainedModels get minimum distance
    const best = await getBestMatch( this.trainedModel, lm.faceLandmarks[0] )
    return best;

  }

  /**
   * Event emitted when a face is detected in video stream
   */
  @Event({
    eventName: 'faceDetected',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceDetected: EventEmitter<DetectionImg>;


  /**
   * Event emitted when face detection whas stopped
   */
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

    await faceapiService.initialize()

    console.info("el faceapi es", faceapiService);

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
        this.detectionResult = await faceapiService.detectFace( this.video, startTimeMs )
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
