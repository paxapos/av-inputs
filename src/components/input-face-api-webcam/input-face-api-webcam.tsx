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
  getPicZoom(result): Promise<Blob> {

    if ( this.pictureTimer ) {
      return null
    }

    this.pictureTimer = setTimeout(() => {
      this.pictureTimer = null
    }, this.detectionTimer)
      

      return new Promise((resolve, reject) => {
        let h = result.box.height * 1.5
        let w = result.box.width *1.5
    
        // hacer caudrada la imagen
        if ( h > w ) {
            w = h
        } else {
            h = w
        }
        
        //centrar la imagen
        
        // center in x
        let x = result.box.x - (w - result.box.width) / 2
        const xlimit =  result.box.x + w
        if ( xlimit >= this.canvas.width ) {
          
          // out of right
          x = xlimit - result.box.x
        } else {
        }
        
        
        let y;
        const ylimit = result.box.y + h
        if ( ylimit > this.canvas.height ) {
          // out of bottom
          y = ylimit - result.box.y
        } else {
          // center in y
          y = result.box.y - (h - result.box.height) / 2
        }
        
        
        // eliminar la imagen del canvas
        this.photoCanvas.getContext('2d').clearRect(0, 0, this.photoCanvas.width, this.photoCanvas.height)
        
        
        // zom video into canvas
        this.photoCanvas.getContext('2d').drawImage(this.canvas, x, y, w, h, 0, 0, this.photoCanvas.width, this.photoCanvas.height)
    
    
        try {
          
          // this faceDetected emit blob from this.canvas
          this.photoCanvas.toBlob((blob) => {
            this.faceDetected.emit(blob)
            resolve(blob)
          }, 'image/jpeg', 1)
      
        } catch (error) {
          reject(error)
        }

      })

  }




  handleStopDetection() {
    if ( this.faceFound ) {
      console.info("STOOPPPP detectiopnm")
      this.faceStopDetection.emit()
    }
    this.faceFound = null
  }
 
  async webcamRender () {
    

    
   // this.canvas.getContext('2d').drawImage(this.video, 0, 0, this.width, this.height)

    if ( this.isDetecting ) {

      let imgWidth = this.video.videoWidth;
      let imgHeight = this.video.videoHeight;

      var imgSize = Math.min(imgWidth, imgHeight);
        // The following two lines yield a central based cropping.
        // They can both be amended to be 0, if you wish it to be
        // a left based cropped image.
      var left = (imgWidth - imgSize) / 2;
      var top = (imgHeight - imgSize) / 2;
    
      const context = this.canvas.getContext('2d')
      
      const result = await this.faceapiService.detectFace( this.canvas )
      context.drawImage(this.video, left, top, imgSize, imgSize, 0,0, this.canvas.width, this.canvas.height);
      if (result ) {
        try {
          let x =  result.box.x
          let y =  result.box.y
          let w =  result.box.width
          let h =  result.box.height

          if ( this.result) {
            if ( result.box.x < this.result.box.x  ) {
              x = result.box.x - 1
            } else {
              x = result.box.x + 1
            }

            if ( result.box.y < this.result.box.y  ) {
              y = result.box.y - 1
            } else {
              y = result.box.y + 1
            }

            if ( result.box.width < this.result.box.width  ) {
              w = result.box.width - 1
            } else {
              w = result.box.width + 1
            }

            if ( result.box.height < this.result.box.height  ) {
              h = result.box.height - 1
            } else {
              h = result.box.height + 1
            }
          }
          
          // draw border arround face
          context.strokeStyle = '#4efd54'
          context.lineWidth = 2
          context.strokeRect(x, y, w, h)


          this.getPicZoom(result)

        } catch (e) {
          this.handleStopDetection()
        }
      } else {
        this.handleStopDetection()
      }
      this.result = result

    }

    requestAnimationFrame(() => {
   //   setTimeout(() => {
          this.webcamRender() 
     //   }, 1000) ;
    });
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
