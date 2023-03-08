import { Component, Host, h, Method, Listen, State, Prop } from '@stencil/core';
import { camera } from '../../utils/camera';

@Component({
  tag: 'input-file-from-webcam',
  styleUrl: 'input-file-from-webcam.css',
  shadow: true,
})
export class InputFileFromWebcam {

  private elVideo: HTMLVideoElement
  private elCanvas: HTMLCanvasElement


  @Prop() width: number = 460
  @Prop() height: number = 460

  /**
   * FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
   */
  @State() facingMode: string = 'user'


  @Listen('click')
  onClickHandler() {
    this.toogleFacingMode()
  }

  toogleFacingMode() {
    this.facingMode = (this.facingMode == "environment") ? "user" : "environment"
  }

  @Method()
  async takePic(): Promise<File> {
    // show a prompt
    return await camera.takePic()
  }

  async componentDidRender() {
    camera.initCamera( this.elVideo, this.elCanvas, {ideal: this.facingMode} );
  }

  async disconnectedCallback() {
    camera.resetCamera()
  }

  render() {
    return (
      <Host>

        <slot name='before'></slot>
        <video autoplay="true" ref={(el) => this.elVideo = el }></video>
        <canvas ref={(el) => this.elCanvas = el } width={this.width} height={this.height}></canvas>
        
        <slot></slot>

        <slot name='after'></slot>
      </Host>
    );
  }

}
