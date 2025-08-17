import { Component, Host, h, Method, Listen, Prop, Event, EventEmitter, Element, State } from '@stencil/core';
import { CameraInstanceManager } from '../../utils/camera-manager';
import { CameraDirection } from '../../utils/camera.service';

export interface WebcamError {
  type: 'permission' | 'device' | 'stream' | 'unknown';
  message: string;
  details?: any;
}

export interface CameraState {
  status: 'loading' | 'ready' | 'error' | 'capturing' | 'inactive';
  error?: WebcamError;
}

/**
 * Simple webcam photo capture component optimized for performance
 * Perfect for employee check-ins, ID verification, and quick photo capture
 * Functions as a form input element for file/image submission
 */
@Component({
  tag: 'input-file-from-webcam',
  styleUrl: 'input-file-from-webcam.css',
  shadow: true,
  formAssociated: true
})
export class InputFileFromWebcam {

  @Element() el: HTMLElement;

  @State() cameraState: CameraState = { status: 'inactive' };
  @State() isFlipped: boolean = false;

  private wasActiveBeforeHidden: boolean = false;
  private visibilityChangeHandler = this.handleVisibilityChange.bind(this);
  private isDestroyed: boolean = false;
  private cameraInstance: any = null; // Instancia propia de cámara
  private componentId: string; // ID único del componente

  /**
   * Standard form input properties
   */

  /**
   * The name attribute for form submission
   */
  @Prop() name?: string;

  /**
   * The value of the input (base64 data URL of captured image)
   */
  @Prop({ mutable: true }) value?: string = '';

  /**
   * Whether the input is disabled
   */
  @Prop({ reflect: true, mutable: true }) disabled?: boolean = false;

  /**
   * Whether the input is readonly
   */
  @Prop({ reflect: true, mutable: true }) readonly?: boolean = false;

  /**
   * Whether the input is required for form validation
   */
  @Prop({ reflect: true, mutable: true }) required?: boolean = false;

  /**
   * Placeholder text when no image is captured
   */
  @Prop({ mutable: true }) placeholder?: string = 'No image captured';

  /**
   * Accept attribute for file type validation
   */
  @Prop({ mutable: true }) accept?: string = 'image/*';

  /**
   * Form validation message
   */
  @Prop() validationMessage?: string;

  /**
   * Auto-focus the camera when component loads
   */
  @Prop({ mutable: true }) autoFocus?: boolean = false;

  /**
   * Tab order for keyboard navigation
   */
  @Prop() tabOrder?: number;

  /**
   * ARIA label for accessibility
   */
  @Prop({ mutable: true }) accessibilityLabel?: string = 'Webcam photo capture input';

  /**
   * ARIA description for accessibility
   */
  @Prop() ariaDescribedby?: string;

  // Custom validation function (optional)
  @Prop() customValidation?: (value: string) => boolean;

  /**
   * Width of the video element in pixels
   */
  @Prop({ reflect: true, mutable: true }) width?: number = 460;

  /**
   * Height of the video element in pixels
   */
  @Prop({ reflect: true, mutable: true }) height?: number = 460;

  /**
   * Camera facing mode: front or back camera
   */
  @Prop({ mutable: true, reflect: true }) facingMode?: CameraDirection = CameraDirection.Front;

  /**
   * Show camera control buttons (flip, capture, etc.)
   */
  @Prop({ mutable: true }) showControls?: boolean = true;

  /**
   * Show action buttons (capture and flip camera buttons)
   */
  @Prop({ mutable: true }) showActionButtons?: boolean = true;

  /**
   * Auto-start camera when component loads
   */
  @Prop({ mutable: true }) autoStart?: boolean = true;

  /**
   * Image quality for captured photos (0.1 to 1.0)
   */
  @Prop({ mutable: true }) imageQuality?: number = 0.85;

  /**
   * Maximum file size in bytes (0 = no limit)
   */
  @Prop({ mutable: true }) maxFileSize?: number = 0;

  /**
   * Enable flash effect animation when taking picture
   */
  @Prop({ mutable: true }) flashEffect?: boolean = true;

  /**
   * Text for the capture button
   */
  @Prop({ mutable: true }) captureButtonText?: string = '';

  /**
   * Text for the flip camera button
   */
  @Prop({ mutable: true }) flipButtonText?: string = '';

  /**
   * Custom canvas drawing function for image processing
   * Override to add filters or effects to captured images
   */
  @Prop({ mutable: true }) drawImageCb?: Function = null;

  /**
   * Start the camera with error handling
   */
  @Method()
  async startCamera(): Promise<void> {
    if (this.isDestroyed) return;

    try {
      this.cameraState = { status: 'loading' };

      // Crear instancia única para este componente si no existe
      if (!this.cameraInstance) {
        this.cameraInstance = CameraInstanceManager.createInstance(this.componentId);
      }

      await this.cameraInstance.initCamera(this.el, this.facingMode, this.drawImageCb);

      if (!this.isDestroyed) {
        this.cameraState = { status: 'ready' };
        this.cameraStarted.emit();
      }
    } catch (error) {
      if (this.isDestroyed) return;

      const webcamError: WebcamError = {
        type: this.getErrorType(error),
        message: error.message || 'Unknown camera error',
        details: error
      };

      this.cameraState = { status: 'error', error: webcamError };
      this.cameraError.emit(webcamError);
      throw error;
    }
  }

  /**
   * Stop the camera and clean up resources
   */
  @Method()
  async stopCamera(): Promise<void> {
    this.isDestroyed = true;

    if (this.cameraInstance) {
      this.cameraInstance.resetCamera();
    }

    this.cameraState = { status: 'inactive' };

    // Only emit if component is still connected
    if (this.el.isConnected) {
      this.cameraStopped.emit();
    }
  }

  /**
   * Take a picture with flash effect and error handling
   */
  @Method()
  async takePic(): Promise<Blob> {
    if (this.isDestroyed || this.disabled || this.readonly) {
      throw new Error('Cannot take picture: component is disabled or destroyed');
    }

    try {
      this.cameraState = { ...this.cameraState, status: 'capturing' };

      if (this.flashEffect) {
        this.showFlashEffect();
      }

      if (!this.cameraInstance) {
        throw new Error('Camera not initialized');
      }

      const pic = await this.cameraInstance.takePicture(this.imageQuality);

      if (!this.isDestroyed) {
        // Validate file size if maxFileSize is set
        if (this.maxFileSize > 0 && pic.size > this.maxFileSize) {
          throw new Error(`File size (${(pic.size / 1024).toFixed(1)}KB) exceeds maximum allowed size (${(this.maxFileSize / 1024).toFixed(1)}KB)`);
        }

        this.cameraState = { ...this.cameraState, status: 'ready' };

        // Convert blob to base64 for form value
        const base64 = await this.blobToBase64(pic);
        const oldValue = this.value;
        this.value = base64;

        // Validate
        if (!this.validateInput()) {
          return pic;
        }

        this.pictureTaken.emit(pic);

        // Emit standard form events
        this.inputChange.emit();

        if (oldValue !== base64) {
          this.valueChange.emit();
        }
      }

      return pic;
    } catch (error) {
      if (!this.isDestroyed) {
        this.cameraState = { ...this.cameraState, status: 'ready' };
      }
      throw error;
    }
  }

  /**
   * Convert blob to base64 data URL
   */
  private blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  /**
   * Validate captured image against form constraints
   */
  private validateInput(): boolean {
    // Required validation
    if (this.required && (!this.value || this.value.trim() === '')) {
      this.setCustomValidity('An image is required');
      return false;
    }

    // File type validation
    if (this.accept && this.value) {
      const mimeType = this.value.split(';')[0].split(':')[1];
      const acceptTypes = this.accept.split(',').map(t => t.trim());
      const isValid = acceptTypes.some(acceptType => {
        if (acceptType === 'image/*') return mimeType.startsWith('image/');
        return mimeType === acceptType;
      });

      if (!isValid) {
        this.setCustomValidity(this.validationMessage || 'Invalid file type');
        return false;
      }
    }

    this.setCustomValidity('');
    return true;
  }

  /**
   * Set custom validity message
   */
  private setCustomValidity(message: string): void {
    if (message) {
      this.validationFailed.emit();
    }
  }

  /**
   * Form association methods
   */

  /**
   * Get form value for form submission (base64 data URL)
   */
  @Method()
  async getFormValue(): Promise<string> {
    return this.value || '';
  }

  /**
   * Set form value programmatically
   */
  @Method()
  async setFormValue(value: string): Promise<void> {
    this.value = value;
  }

  /**
   * Check validity of current value
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.validateInput();
  }

  /**
   * Focus the camera (start camera)
   */
  @Method()
  async setFocus(): Promise<void> {
    if (!this.disabled) {
      await this.startCamera();
      this.focusGained.emit();
    }
  }

  /**
   * Blur the camera (stop camera)
   */
  @Method()
  async setBlur(): Promise<void> {
    await this.stopCamera();
    this.focusLost.emit();
  }

  /**
   * Reset camera by stopping and restarting
   */
  @Method()
  async resetCamera(): Promise<void> {
    await this.stopCamera();
    if (this.autoStart && !this.isDestroyed) {
      this.isDestroyed = false;
      await this.startCamera();
    }
  }

  /**
   * Force release camera (useful when component is hidden in modal)
   */
  @Method()
  async releaseCamera(): Promise<void> {
    if (this.cameraInstance) {
      this.cameraInstance.resetCamera();
    }
    this.cameraState = { status: 'inactive' };
  }

  /**
   * Request camera access (useful when component becomes visible from modal)
   */
  @Method()
  async requestCamera(): Promise<void> {
    if (!this.disabled && !this.isDestroyed) {
      await this.startCamera();
    }
  }

  /**
   * Toggle between front and back camera
   */
  @Method()
  async toggleCamera(): Promise<void> {
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
   * Standard form input events
   */

  /**
   * Standard input event when value changes
   */
  @Event() inputChange: EventEmitter<Event>;

  /**
   * Standard change event when value is committed
   */
  @Event() valueChange: EventEmitter<Event>;

  /**
   * Standard focus event
   */
  @Event() focusGained: EventEmitter<FocusEvent>;

  /**
   * Standard blur event
   */
  @Event() focusLost: EventEmitter<FocusEvent>;

  /**
   * Standard invalid event for form validation
   */
  @Event() validationFailed: EventEmitter<Event>;

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
  onClickHandler(event: Event) {
    // Solo tomar foto si se hace click directamente en el canvas/host, no en los botones
    const target = event.target as HTMLElement;
    if (target === this.el || target.tagName === 'CANVAS') {
      if (this.cameraState.status === 'ready') {
        this.takePic();
      }
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
  private async handleCaptureClick(event: Event) {
    event.stopPropagation();
    if (this.cameraState.status === 'ready') {
      await this.takePic();
    }
  }

  /**
   * Handle flip button click
   */
  private async handleFlipClick(event: Event) {
    event.stopPropagation();
    await this.__toogleFacingMode();
  }

  /**
   * Handle retry button click
   */
  private async handleRetryClick() {
    await this.startCamera();
  }

  /**
   * Handle visibility change (tab focus/blur)
   */
  private async handleVisibilityChange() {
    if (document.hidden) {
      // Tab is hidden or not focused
      if (this.cameraState.status === 'ready' || this.cameraState.status === 'capturing') {
        this.wasActiveBeforeHidden = true;
        await this.stopCamera();
      }
    } else {
      // Tab is visible and focused
      if (this.wasActiveBeforeHidden && this.cameraState.status === 'inactive') {
        this.wasActiveBeforeHidden = false;
        setTimeout(async () => {
          try {
            await this.startCamera();
          } catch (error) {
            console.warn('Failed to restart camera after visibility change:', error);
          }
        }, 100);
      }
    }
  }



  componentWillLoad() {
    this.isFlipped = this.facingMode === CameraDirection.Front;

    // Generar ID único para este componente
    this.componentId = `webcam-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
  }

  async componentDidLoad() {
    // Add visibility change listener
    document.addEventListener('visibilitychange', this.visibilityChangeHandler);

    // Auto-start moved to componentWillLoad to avoid state change during componentDidLoad
    // The camera will be started after component is fully loaded if autoStart is true
    if (this.autoStart) {
      // Use setTimeout to avoid state change during componentDidLoad
      setTimeout(async () => {
        try {
          await this.startCamera();
        } catch (error) {
          console.warn('Failed to auto-start camera:', error);
        }
      }, 0);
    }
  }

  async disconnectedCallback() {
    // Remove visibility change listener
    document.removeEventListener('visibilitychange', this.visibilityChangeHandler);

    // Prevent camera operations when component is disconnecting
    if (this.cameraState.status !== 'inactive') {
      if (this.cameraInstance) {
        this.cameraInstance.resetCamera();
      }
      this.cameraState = { status: 'inactive' };
    }

    // Limpiar instancia del manager
    if (this.componentId) {
      CameraInstanceManager.removeInstance(this.componentId);
    }
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
    if (!this.showControls || !this.showActionButtons || (this.cameraState.status !== 'ready' && this.cameraState.status !== 'capturing')) {
      return null;
    }

    const isCapturing = this.cameraState.status === 'capturing';

    return (
      <div class="camera-controls">
        <button
          class="control-button flip-button"
          onClick={(e) => this.handleFlipClick(e)}
          title="Cambiar cámara"
          disabled={isCapturing}
        >
          <svg class="flip-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 1l4 4h-3v11h-2V5h-3l4-4zm-6 3a7 7 0 0 1 7 7 7 7 0 0 1-7 7 7 7 0 0 1-7-7h2a5 5 0 0 0 5 5 5 5 0 0 0 5-5 5 5 0 0 0-5-5V1.7A7.1 7.1 0 0 1 17 8v2h-2V8a5 5 0 0 0-5-5z"/>
          </svg>
        </button>
        <button
          class="control-button capture-button"
          onClick={(e) => this.handleCaptureClick(e)}
          title="Tomar foto"
          disabled={isCapturing}
        >
          {isCapturing ? (
            <svg class="capture-icon loading" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3"/>
              <path d="M12 1v6l-1.5-1.5M12 1v6l1.5-1.5M23 12h-6l1.5-1.5M23 12h-6l1.5 1.5M12 23v-6l1.5 1.5M12 23v-6l-1.5 1.5M1 12h6l-1.5 1.5M1 12h6l-1.5-1.5"/>
            </svg>
          ) : (
            <svg class="capture-icon" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="3"/>
              <path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/>
            </svg>
          )}
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
