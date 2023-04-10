import { Component, Host, h, Element, Prop, Event,EventEmitter, Method, State } from '@stencil/core';
import { FaceapiService } from '../../utils/facepi.service';
import { createCanvas, createVideo, initWebcamToVideo } from '../../utils/camera.service';

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
    this.el.appendChild(this.canvas)


    this.photoCanvas = createCanvas(this.el)

  }

  async componentDidRender() {

    this.canvas.width = parseInt( this.el.getAttribute("width") );
    this.canvas.height = parseInt( this.el.getAttribute("height") );

    this.photoCanvas.width = parseInt( this.el.getAttribute("width") );
    this.photoCanvas.height = parseInt( this.el.getAttribute("height") );

    
    initWebcamToVideo(this.video)
   
      this.faceapiService = new FaceapiService()

      this.webcamRender();
    
  }

  async disconnectedCallback() {
  }

  /**
   * 
   * @param result 
   * @returns true si proceso y detecto imagen
   */
  getPicZoom(result): Promise<Blob> {
    return new Promise((resolve, reject) => {

      let h = result.box.height *1.5
      let w = result.box.width *1.5
  
      // hacer caudrada la imagen
      if ( h > w ) {
          w = h
      } else {
          h = w
      }
      
      //centrar la imagen
      const x = result.box.x - (w - result.box.width) / 2
      const y = result.box.y - (h - result.box.height) / 2
  
      // eliminar la imagen del canvas
      this.photoCanvas.getContext('2d').clearRect(0, 0, this.photoCanvas.width, this.photoCanvas.height)
      
      // zom video into canvas
      this.photoCanvas.getContext('2d').drawImage(this.canvas, x, y, w, h, 0, 0, this.canvas.width, this.canvas.height)
  
  
      try {
        
        // this faceDetected emit blob from this.canvas
        this.photoCanvas.toBlob((blob) => {
          this.faceDetected.emit(blob)
          resolve(blob)
        }, 'image/jpeg', 1)
    
      } catch (error) {
        reject(error)
      }

      reject()
    })

  }

  handleStopDetection() {
    if ( this.faceFound ) {
      this.faceStopDetection.emit()
    }
    this.faceFound = null
  }
 
  async webcamRender () {
    
    requestAnimationFrame(() => {
      this.webcamRender() 
    });
    
    this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.canvas.width, this.canvas.height)

    if ( this.isDetecting ) {
      
      const result = await this.faceapiService.detectFace( this.canvas )
     
      if (result ) {
        try {
          this.faceFound = await this.getPicZoom(result)
        } catch (e) {
          console.error(e)
          this.handleStopDetection()
        }
      } else {
        this.handleStopDetection()
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
