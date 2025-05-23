import { EventEmitter } from '../../stencil-public-runtime';
import { DetectionImg } from '../../utils/facepi.service';
import { CameraDirection } from '../../utils/camera.service';
import { Detection, FaceLandmarkerResult } from '@mediapipe/tasks-vision';
import { LabeledDescriptorsArray } from './TrainedModel';
export interface iFaceDetected {
    blob: Blob;
    result: Detection;
}
export interface FaceDetectionError {
    type: 'CAMERA_ACCESS_DENIED' | 'NO_CAMERA' | 'FACE_API_ERROR' | 'INITIALIZATION_ERROR' | 'UNKNOWN_ERROR';
    message: string;
    originalError?: Error;
}
type CameraState = 'inactive' | 'loading' | 'ready' | 'detecting' | 'error';
export declare class InputFaceApiWebcam {
    video: HTMLVideoElement;
    canvas: HTMLCanvasElement;
    el: HTMLElement;
    detectionResult: DetectionImg;
    loaded: boolean;
    cameraState: CameraState;
    currentError: FaceDetectionError | null;
    detectedFacesCount: number;
    isRecognizing: boolean;
    detectionResultChangedHandler(newValue: DetectionImg, oldValue: DetectionImg): void;
    /**
     * Enable or disable face detection
     */
    enableDetection: boolean;
    /**
     * Show control buttons for starting/stopping detection
     */
    showControls: boolean;
    /**
     * Auto-start detection when component loads
     */
    autoStart: boolean;
    /**
     * Show bounding boxes around detected faces
     */
    showBoundingBoxes: boolean;
    /**
     * Show face landmarks on detected faces
     */
    showLandmarks: boolean;
    /**
     * Text for the start detection button
     */
    startButtonText: string;
    /**
     * Text for the stop detection button
     */
    stopButtonText: string;
    /**
     * Text for the flip camera button
     */
    flipButtonText: string;
    /**
     * Trained models to use for recognition and best match
     */
    trainedModel?: LabeledDescriptorsArray;
    /**
     * Width of the video element
     */
    width?: number;
    /**
     * Height of the video element
     */
    height?: number;
    /**
     * Score threshold to detect a face
     */
    scoreThreshold?: number;
    /**
     * Detection timer interval in milliseconds
     */
    detectionTimer?: number;
    /**
     * Facing mode options following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
     */
    facingMode?: CameraDirection;
    /**
     * Enable automatic photo capture when face is detected
     */
    autoCapture: boolean;
    /**
     * Minimum confidence score for face detection to trigger photo capture
     */
    captureThreshold: number;
    /**
     * Delay between automatic photo captures in milliseconds
     */
    captureDelay: number;
    /**
     * Stop face detection
     */
    stopDetection(): Promise<void>;
    /**
     * Start face detection
     */
    startDetection(): Promise<void>;
    /**
     * Toggle camera between front and back
     */
    toggleCamera(): Promise<void>;
    /**
     * Initialize camera and face detection
     */
    initializeCamera(): Promise<void>;
    /**
     * Giving a blob image, get the face landmarks
     * @returns face landmarks
     */
    getBlobImageDescriptors(blob: Blob): Promise<FaceLandmarkerResult>;
    /**
     * Giving current face in video canvas, get the face landmarks
     * @returns face landmarks
     */
    getFaceLandMarks(): Promise<FaceLandmarkerResult>;
    /**
     * Predicts best face match, uses worker to calculate distance between the given blob and the trained model
     * passed in trainedModel prop
     * @param blob
     * @returns
     */
    predictBestMatch(blob?: Blob): Promise<any>;
    /**
     * Diagnostic method to check detection status
     */
    getDiagnosticInfo(): Promise<any>;
    /**
     * Event emitted when a face is detected in video stream
     */
    faceDetected: EventEmitter<DetectionImg>;
    /**
     * Event emitted when face detection was stopped
     */
    faceStopDetection: EventEmitter<void>;
    /**
     * Event emitted when detection starts
     */
    detectionStarted: EventEmitter<void>;
    /**
     * Event emitted when detection stops
     */
    detectionStopped: EventEmitter<void>;
    /**
     * Event emitted when camera starts successfully
     */
    cameraStarted: EventEmitter<MediaStream>;
    /**
     * Event emitted when camera stops
     */
    cameraStopped: EventEmitter<void>;
    /**
     * Event emitted when camera encounters an error
     */
    cameraError: EventEmitter<FaceDetectionError>;
    /**
     * Event emitted when facing mode changes
     */
    facingModeChanged: EventEmitter<CameraDirection>;
    /**
     * Event emitted when a photo is automatically captured
     */
    photoCapture: EventEmitter<Blob>;
    private lastVideoTime;
    private photoTaken;
    private handleError;
    private capturePhoto;
    componentWillLoad(): Promise<void>;
    webcamRender(): Promise<void>;
    private isVideoElementReady;
    private waitForVideoReady;
    drawWebcamnToCanvas(ctx: any): void;
    render(): any;
}
export {};
