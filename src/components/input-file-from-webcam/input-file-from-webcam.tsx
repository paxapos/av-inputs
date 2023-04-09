import { Component, Host, h, Method, Listen, Prop, Event, EventEmitter, Element } from '@stencil/core';
import { camera } from '../../utils/camera';
import { CameraDirection } from '../../utils/camera.service';


@Component({
  tag: 'input-file-from-webcam',
  styleUrl: 'input-file-from-webcam.css',
  shadow: true,
})
export class InputFileFromWebcam {


  @Element() el: HTMLElement;


  @Prop({reflect: true, mutable: true}) width?: number = 460
  @Prop({reflect: true, mutable: true}) height?: number = 460

  /**
   * FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
   */
  @Prop({ mutable: true, reflect: true }) facingMode?: CameraDirection = CameraDirection.Front

  /**
   * you can pass a function and override the canvas.drawImage function so you
   * can change the image adding filters or any kind of magin in your image
   * 
   * you just need to crear a function with all canvas.-drawImage arguments
   * 
   * here you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height
   */
  @Prop() drawImageCb?: Function = null

  @Method()
  async takePic(): Promise<Blob> {
    // show a prompt
    const pic = await camera.takePicture()
    this.pictureTaken.emit(pic);
    return pic
  }

  @Method()
  async resetCamera(): Promise<void> {
    // show a prompt
    camera.resetCamera()
  }

  @Method()
  async toggleCamera(): Promise<void>{
    this.__toogleFacingMode()
  }


  @Event({
    eventName: 'pictureTaken',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) pictureTaken: EventEmitter<Blob>;

  @Event({
    eventName: 'facingModeChanged',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) facingModeChanged: EventEmitter<CameraDirection>;



  @Listen('click')
  onClickHandler() {
    this.__toogleFacingMode()
  }

 

  /**
   * Toogle webcam, for example in mobile show front or back camera
   * you can block this behaviour by setting the facingMode Property
   */
  private __toogleFacingMode() {
    // only change if no facinMode property was set
    this.facingMode = (this.facingMode != CameraDirection.Front) ? CameraDirection.Front : CameraDirection.Rear
    this.facingModeChanged.emit( this.facingMode   )
  }

 

  componentWillMount() {
   
  }
  
  async componentDidRender() {
    camera.initCamera( this.el, CameraDirection.Front, this.drawImageCb );
  }

  async disconnectedCallback() {
    camera.resetCamera()
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
