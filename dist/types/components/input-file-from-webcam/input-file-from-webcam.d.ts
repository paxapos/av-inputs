import { EventEmitter } from '../../stencil-public-runtime';
import { CameraDirection } from '../../utils/camera.service';
export interface WebcamError {
    type: 'permission' | 'device' | 'stream' | 'unknown';
    message: string;
}
export interface CameraState {
    status: 'loading' | 'ready' | 'error' | 'capturing' | 'inactive';
    error?: WebcamError;
}
export declare class InputFileFromWebcam {
    el: HTMLElement;
    cameraState: CameraState;
    isFlipped: boolean;
    /**
     * Width of the video element
     */
    width?: number;
    /**
     * height of the video element
     */
    height?: number;
    /**
     * FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
     */
    facingMode?: CameraDirection;
    /**
     * Show camera controls (flip, capture button, etc)
     */
    showControls?: boolean;
    /**
     * Auto-start camera when component loads
     */
    autoStart?: boolean;
    /**
     * Image quality for captured photos (0.1 to 1.0)
     */
    imageQuality?: number;
    /**
     * Enable flash effect when taking picture
     */
    flashEffect?: boolean;
    /**
     * Capture button text
     */
    captureButtonText?: string;
    /**
     * Flip camera button text
     */
    flipButtonText?: string;
    /**
     * you can pass a function and override the canvas.drawImage function so you
     * can change the image adding filters or any kind of magin in your image
     *
     * you just need to crear a function with all canvas.-drawImage arguments
     *
     * here you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height
     */
    drawImageCb?: Function;
    /**
     * Start the camera
     */
    startCamera(): Promise<void>;
    /**
     * Stop the camera
     */
    stopCamera(): Promise<void>;
    /**
     * Take a picture
     * @returns a blob with the image
     */
    takePic(): Promise<Blob>;
    /**
     * Reset camera
     */
    resetCamera(): Promise<void>;
    /**
     * Toogle webcam, for example in mobile show front or back camera
     */
    toggleCamera(): Promise<void>;
    /**
     * Event emitted when the user takes a picture
     */
    pictureTaken: EventEmitter<Blob>;
    /**
     * Event emitted when facing mode changes
     */
    facingModeChanged: EventEmitter<CameraDirection>;
    /**
     * Event emitted when camera starts successfully
     */
    cameraStarted: EventEmitter<void>;
    /**
     * Event emitted when camera stops
     */
    cameraStopped: EventEmitter<void>;
    /**
     * Event emitted when camera encounters an error
     */
    cameraError: EventEmitter<WebcamError>;
    onClickHandler(): void;
    onFacingModeChange(): Promise<void>;
    /**
     * Get error type from error object
     */
    private getErrorType;
    /**
     * Show flash effect when taking picture
     */
    private showFlashEffect;
    /**
     * Toggle webcam facing mode
     */
    private __toogleFacingMode;
    /**
     * Handle capture button click
     */
    private handleCaptureClick;
    /**
     * Handle flip button click
     */
    private handleFlipClick;
    /**
     * Handle retry button click
     */
    private handleRetryClick;
    componentWillLoad(): void;
    componentDidLoad(): Promise<void>;
    disconnectedCallback(): Promise<void>;
    /**
     * Render loading state
     */
    private renderLoadingState;
    /**
     * Render error state
     */
    private renderErrorState;
    /**
     * Render inactive state
     */
    private renderInactiveState;
    /**
     * Render camera controls
     */
    private renderControls;
    render(): any;
}
