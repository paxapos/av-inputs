import { Component, Host, h, Method, Listen, Prop, Event, EventEmitter, Element, State, Watch } from '@stencil/core';
import { camera } from '../../utils/camera';
import { CameraDirection } from '../../utils/camera.service';

export interface WebcamError {
  type: 'permission' | 'device' | 'stream' | 'unknown';
  message: string;
}

export interface CameraState {
  status: 'loading' | 'ready' | 'error' | 'capturing' | 'inactive';
  error?: WebcamError;
}

@Component({
  tag: 'input-file-from-webcam',
  styleUrl: 'input-file-from-webcam.css',
  shadow: true,
})
export class InputFileFromWebcam {

  @Element() el: HTMLElement;

  @State() cameraState: CameraState = { status: 'inactive' };
  @State() isFlipped: boolean = false;

  /**
   * Width of the video element
   */
  @Prop({reflect: true, mutable: true}) width?: number = 460

  /**
   * height of the video element
   */
  @Prop({reflect: true, mutable: true}) height?: number = 460

  /**
   * FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
   */
  @Prop({ mutable: true, reflect: true }) facingMode?: CameraDirection = CameraDirection.Front

  /**
   * Show camera controls (flip, capture button, etc)
   */
  @Prop() showControls?: boolean = true

  /**
   * Auto-start camera when component loads
   */
  @Prop() autoStart?: boolean = true

  /**
   * Image quality for captured photos (0.1 to 1.0)
   */
  @Prop() imageQuality?: number = 0.85

  /**
   * Enable flash effect when taking picture
   */
  @Prop() flashEffect?: boolean = true

  /**
   * Capture button text
   */
  @Prop() captureButtonText?: string = '📸'

  /**
   * Flip camera button text
   */
  @Prop() flipButtonText?: string = '🔄'

  /**
   * you can pass a function and override the canvas.drawImage function so you
   * can change the image adding filters or any kind of magin in your image
   * 
   * you just need to crear a function with all canvas.-drawImage arguments
   * 
   * here you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height
   */
  @Prop() drawImageCb?: Function = null

  /**
   * Start the camera
   */
  @Method()
  async startCamera(): Promise<void> {
    try {
      this.cameraState = { status: 'loading' };
      await camera.initCamera(this.el, this.facingMode, this.drawImageCb);
      this.cameraState = { status: 'ready' };
      this.cameraStarted.emit();
    } catch (error) {
      const webcamError: WebcamError = {
        type: this.getErrorType(error),
        message: error.message || 'Unknown camera error'
      };
      this.cameraState = { status: 'error', error: webcamError };
      this.cameraError.emit(webcamError);
      throw error;
    }
  }

  /**
   * Stop the camera
   */
  @Method()
  async stopCamera(): Promise<void> {
    camera.resetCamera();
    this.cameraState = { status: 'inactive' };
    this.cameraStopped.emit();
  }

  /**
   * Take a picture
   * @returns a blob with the image
   */
  @Method()
  async takePic(): Promise<Blob> {
    try {
      this.cameraState = { ...this.cameraState, status: 'capturing' };
      
      if (this.flashEffect) {
        this.showFlashEffect();
      }
      
      const pic = await camera.takePicture(this.imageQuality);
      this.cameraState = { ...this.cameraState, status: 'ready' };
      this.pictureTaken.emit(pic);
      return pic;
    } catch (error) {
      this.cameraState = { ...this.cameraState, status: 'ready' };
      throw error;
    }
  }

  /**
   * Reset camera
   */
  @Method()
  async resetCamera(): Promise<void> {
    await this.stopCamera();
    if (this.autoStart) {
      await this.startCamera();
    }
  }

  /**
   * Toogle webcam, for example in mobile show front or back camera
   */
  @Method()
  async toggleCamera(): Promise<void>{
    await this.__toogleFacingMode();
  }


  /**
   * Event emitted when the user takes a picture
   */
  @Event({
    eventName: 'pictureTaken',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) pictureTaken: EventEmitter<Blob>;

  /**
   * Event emitted when facing mode changes
   */
  @Event({
    eventName: 'facingModeChanged',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) facingModeChanged: EventEmitter<CameraDirection>;

  /**
   * Event emitted when camera starts successfully
   */
  @Event({
    eventName: 'cameraStarted',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) cameraStarted: EventEmitter<void>;

  /**
   * Event emitted when camera stops
   */
  @Event({
    eventName: 'cameraStopped',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) cameraStopped: EventEmitter<void>;

  /**
   * Event emitted when camera encounters an error
   */
  @Event({
    eventName: 'cameraError',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) cameraError: EventEmitter<WebcamError>;



  @Listen('click')
  onClickHandler() {
    if (this.cameraState.status === 'ready') {
      this.takePic();
    }
  }

  @Watch('facingMode')
  async onFacingModeChange() {
    if (this.cameraState.status === 'ready') {
      await this.resetCamera();
    }
  }

  /**
   * Get error type from error object
   */
  private getErrorType(error: any): WebcamError['type'] {
    if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
      return 'permission';
    }
    if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
      return 'device';
    }
    if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
      return 'stream';
    }
    return 'unknown';
  }

  /**
   * Show flash effect when taking picture
   */
  private showFlashEffect() {
    const flashEl = this.el.shadowRoot?.querySelector('.flash-effect') as HTMLElement;
    if (flashEl) {
      flashEl.style.opacity = '1';
      setTimeout(() => {
        flashEl.style.opacity = '0';
      }, 200);
    }
  }

  /**
   * Toggle webcam facing mode
   */
  private async __toogleFacingMode() {
    const newFacingMode = (this.facingMode !== CameraDirection.Front) ? CameraDirection.Front : CameraDirection.Rear;
    this.facingMode = newFacingMode;
    this.facingModeChanged.emit(this.facingMode);
  }

  /**
   * Handle capture button click
   */
  private async handleCaptureClick() {
    if (this.cameraState.status === 'ready') {
      await this.takePic();
    }
  }

  /**
   * Handle flip button click
   */
  private async handleFlipClick() {
    await this.__toogleFacingMode();
  }

  /**
   * Handle retry button click
   */
  private async handleRetryClick() {
    await this.startCamera();
  }

 

  componentWillLoad() {
    this.isFlipped = this.facingMode === CameraDirection.Front;
  }
  
  async componentDidLoad() {
    if (this.autoStart) {
      await this.startCamera();
    }
  }

  async disconnectedCallback() {
    await this.stopCamera();
  }

  /**
   * Render loading state
   */
  private renderLoadingState() {
    return (
      <div class="camera-state loading">
        <div class="spinner"></div>
        <p>Iniciando cámara...</p>
      </div>
    );
  }

  /**
   * Render error state
   */
  private renderErrorState() {
    const { error } = this.cameraState;
    let errorMessage = 'Error desconocido';
    let actionButton = null;

    switch (error?.type) {
      case 'permission':
        errorMessage = 'Permiso de cámara denegado. Por favor, permite el acceso a la cámara.';
        break;
      case 'device':
        errorMessage = 'No se encontró ninguna cámara disponible.';
        break;
      case 'stream':
        errorMessage = 'Error al acceder a la cámara. Puede estar siendo usada por otra aplicación.';
        actionButton = (
          <button class="retry-button" onClick={() => this.handleRetryClick()}>
            Reintentar
          </button>
        );
        break;
      default:
        errorMessage = error?.message || 'Error desconocido al inicializar la cámara.';
        actionButton = (
          <button class="retry-button" onClick={() => this.handleRetryClick()}>
            Reintentar
          </button>
        );
    }

    return (
      <div class="camera-state error">
        <div class="error-icon">⚠️</div>
        <p class="error-message">{errorMessage}</p>
        {actionButton}
      </div>
    );
  }

  /**
   * Render inactive state
   */
  private renderInactiveState() {
    return (
      <div class="camera-state inactive">
        <div class="inactive-icon">📹</div>
        <p>Cámara inactiva</p>
        <button class="start-button" onClick={() => this.startCamera()}>
          Iniciar Cámara
        </button>
      </div>
    );
  }

  /**
   * Render camera controls
   */
  private renderControls() {
    if (!this.showControls || (this.cameraState.status !== 'ready' && this.cameraState.status !== 'capturing')) {
      return null;
    }

    const isCapturing = this.cameraState.status === 'capturing';

    return (
      <div class="camera-controls">
        <button 
          class="control-button flip-button" 
          onClick={() => this.handleFlipClick()}
          title="Cambiar cámara"
          disabled={isCapturing}
        >
          {this.flipButtonText}
        </button>
        <button 
          class="control-button capture-button" 
          onClick={() => this.handleCaptureClick()}
          title="Tomar foto"
          disabled={isCapturing}
        >
          {isCapturing ? '⏳' : this.captureButtonText}
        </button>
      </div>
    );
  }

  render() {
    const hostClasses = {
      'camera-ready': this.cameraState.status === 'ready',
      'camera-loading': this.cameraState.status === 'loading',
      'camera-error': this.cameraState.status === 'error',
      'camera-inactive': this.cameraState.status === 'inactive',
      'camera-capturing': this.cameraState.status === 'capturing',
      'flipped': this.isFlipped && this.facingMode === CameraDirection.Front
    };

    return (
      <Host 
        style={{height: this.height+"px", width: this.width+"px"}}
        class={hostClasses}
      >
        <slot name='before'></slot>
        
        {this.cameraState.status === 'loading' && this.renderLoadingState()}
        {this.cameraState.status === 'error' && this.renderErrorState()}
        {this.cameraState.status === 'inactive' && this.renderInactiveState()}
        
        <slot></slot>
        
        {this.flashEffect && <div class="flash-effect"></div>}
        {this.renderControls()}
        
        <slot name='after'></slot>
      </Host>
    );
  }

}
