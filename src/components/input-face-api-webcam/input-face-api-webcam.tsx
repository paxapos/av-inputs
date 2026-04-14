import { Component, Host, h, Element, Prop, Event, EventEmitter, Method, State, Watch } from '@stencil/core';
import { DetectionImg, faceapiService } from '../../utils/facepi.service';
import { optimizedFaceDetectionService } from '../../utils/optimized-face-detection.service';
import { simplifiedOptimizedFaceDetectionService } from '../../utils/simplified-optimized-face-detection.service';
import { CameraDirection, createCanvas, createVideo, initWebcamToVideo, renderToCanvas } from '../../utils/camera.service';
import { Detection, FaceLandmarkerResult } from '@mediapipe/tasks-vision';
import { pxTimer } from 'src/utils/utils';
import { LabeledDescriptorsArray } from './TrainedModel';
import { getBestMatch } from './distance.worker';
import { ModernIcons } from '../../utils/modern-icons';

export interface iFaceDetected {
  blob: Blob;
  blobUrl?: string; // URL for the blob (for events)
  result: Detection;
  landmarks?: any[]; // Face landmark points
  confidence: number; // Confidence score (0-1)
  timestamp: number;
}

export interface FaceDetectionError {
  type: 'CAMERA_ACCESS_DENIED' | 'NO_CAMERA' | 'FACE_API_ERROR' | 'INITIALIZATION_ERROR' | 'UNKNOWN_ERROR';
  message: string;
  originalError?: Error;
}

type CameraState = 'inactive' | 'loading' | 'ready' | 'detecting' | 'error';

/**
 * Renders a modern SVG icon with glassmorphism styling
 */
const renderModernIcon = (iconName: keyof typeof ModernIcons, size: number = 24, className: string = '') => {
  const iconSvg = ModernIcons[iconName];
  return (
    <div
      class={`modern-icon ${className}`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      innerHTML={iconSvg}
    ></div>
  );
};

/**
 * AI-powered face detection and recognition component
 * High-performance facial analysis with MediaPipe and TensorFlow.js
 * Optimized for real-time detection with Web Workers
 * Functions as a form input element for facial recognition data
 */
@Component({
  tag: 'input-face-api-webcam',
  styleUrl: 'input-face-api-webcam.css',
  shadow: true,
  formAssociated: true
})
export class InputFaceApiWebcam {
  // Core elements
  private video: HTMLVideoElement;
  private canvas: HTMLCanvasElement;

  @Element() el: HTMLElement;

  @State() detectionResult: DetectionImg;
  @State() loaded: boolean = false;
  @State() cameraState: CameraState = 'inactive';
  @State() currentError: FaceDetectionError | null = null;
  @State() detectedFacesCount: number = 0;
  @State() isRecognizing: boolean = false;
  @State() actualOptimizationMode: 'worker' | 'simplified' | 'standard' = 'standard';

  /**
   * Standard form input properties
   */

  /**
   * The name attribute for form submission
   */
  @Prop() name?: string;

  /**
   * The value of the input (JSON string of face detection data)
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
   * Placeholder text when no face is detected
   */
  @Prop({ mutable: true }) placeholder?: string = 'No face detected';

  /**
   * Form validation message
   */
  @Prop() validationMessage?: string;

  /**
   * Auto-focus the detection when component loads
   */
  @Prop({ mutable: true }) autoFocus?: boolean = false;

  /**
   * Tab order for keyboard navigation
   */
  @Prop() tabOrder?: number;

  /**
   * ARIA label for accessibility
   */
  @Prop({ mutable: true }) accessibilityLabel?: string = 'Face detection and recognition input';

  /**
   * ARIA description for accessibility
   */
  @Prop() ariaDescribedby?: string;

  // Internal state for form validation
  @State() private isValid: boolean = true;
  @State() private currentValidationMessage: string = '';

  // Custom validation function (optional)
  @Prop() customValidation?: (value: string) => boolean;

  @Watch('detectionResult')
  detectionResultChangedHandler(newValue: DetectionImg, oldValue: DetectionImg) {
    if (newValue?.blobImg) {
      this.detectedFacesCount = newValue.detection ? 1 : 0;

      // Prepare enhanced face detection data with landmarks
      const faceDetectedData: iFaceDetected = {
        blob: newValue.blobImg,
        blobUrl: URL.createObjectURL(newValue.blobImg),
        result: newValue.detection,
        landmarks: newValue.detection?.keypoints || [],
        confidence: newValue.detection?.categories?.[0]?.score || 0,
        timestamp: newValue.timestamp || Date.now()
      };

      this.faceDetected.emit(faceDetectedData);

      // Update form value with detection data
      if (newValue.detection) {
        this.updateFormValue(JSON.stringify({
          confidence: newValue.detection.categories?.[0]?.score || 0,
          timestamp: Date.now(),
          landmarks: newValue.detection.keypoints || [],
          boundingBox: newValue.detection.boundingBox || null
        }));
      }

      // Auto capture photo if enabled and face confidence is above threshold
      if (this.autoCapture && newValue.detection &&
          newValue.detection.categories?.[0]?.score >= this.captureThreshold) {
        this.capturePhoto();
      }
    } else {
      if (oldValue) {
        this.detectedFacesCount = 0;
        this.faceStopDetection.emit();

        // Clear form value when no face detected
        if (this.value) {
          this.updateFormValue('');
        }
      }
    }
  }

  /**
   * Detection mode: 'interval' for automatic detection every X ms, 'manual' for on-demand detection
   */
  @Prop({ mutable: true }) detectionMode: 'interval' | 'manual' = 'interval';

  /**
   * Use optimized Web Worker for face detection (recommended for better performance)
   */
  @Prop({ mutable: true }) useOptimizedDetection: boolean = true;

  /**
   * Enable or disable face detection
   */
  @Prop({ reflect: true, mutable: true }) enableDetection: boolean = true;

  /**
   * Show control buttons for starting/stopping detection
   */
  @Prop({ mutable: true }) showControls: boolean = true;

  /**
   * Auto-start detection when component loads
   */
  @Prop({ mutable: true }) autoStart: boolean = true;

  /**
   * Show bounding boxes around detected faces
   */
  @Prop({ mutable: true }) showBoundingBoxes: boolean = true;

  /**
   * Show face landmarks on detected faces
   */
  @Prop({ mutable: true }) showLandmarks: boolean = false;

  /**
   * Text for the start detection button
   */
  @Prop({ mutable: true }) startButtonText: string = 'Start Detection';

  /**
   * Text for the stop detection button
   */
  @Prop({ mutable: true }) stopButtonText: string = 'Stop Detection';

  /**
   * Text for the flip camera button
   */
  @Prop({ mutable: true }) flipButtonText: string = 'Flip Camera';

  /**
   * Trained models to use for recognition and best match
   */
  @Prop({ reflect: false }) trainedModel?: LabeledDescriptorsArray;


  /**
   * Width of the video element
   */
  @Prop({ reflect: true, mutable: true }) width?: number = 460;

  /**
   * Height of the video element
   */
  @Prop({ reflect: true, mutable: true }) height?: number = 460;

  /**
   * Score threshold to detect a face
   */
  @Prop({ reflect: true, mutable: true }) scoreThreshold?: number = 0.65;

  /**
   * Detection timer interval in milliseconds
   */
  @Prop({ reflect: true, mutable: true }) detectionTimer?: number = 1500;

  /**
   * Facing mode options following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
   */
  @Prop({ mutable: true, reflect: true }) facingMode?: CameraDirection = CameraDirection.Front;

  /**
   * Enable automatic photo capture when face is detected
   */
  @Prop({ mutable: true }) autoCapture: boolean = true;

  /**
   * Minimum confidence score for face detection to trigger photo capture
   */
  @Prop({ mutable: true }) captureThreshold: number = 0.8;

  /**
   * Delay between automatic photo captures in milliseconds
   */
  @Prop({ mutable: true }) captureDelay: number = 3000;


  /**
   * Manually trigger a single face detection
   * @returns Promise with detection result including landmarks
   */
  @Method()
  async detectFaceManually(): Promise<iFaceDetected | null> {
    if (!this.isVideoElementReady()) {
      console.warn('Video element not ready for manual detection');
      return null;
    }

    try {
      const startTimeMs = performance.now();
      let detectionResult: DetectionImg | null;

      // Use appropriate service based on what was successfully initialized
      if (this.actualOptimizationMode === 'worker') {
        detectionResult = await optimizedFaceDetectionService.detectFaceOptimized(this.video, startTimeMs);
      } else if (this.actualOptimizationMode === 'simplified') {
        detectionResult = await simplifiedOptimizedFaceDetectionService.detectFaceOptimized(this.video, startTimeMs);
      } else {
        detectionResult = await faceapiService.detectFaceOptimized(this.video, startTimeMs);
      }

      if (detectionResult && detectionResult.detection) {
        const faceDetectedData: iFaceDetected = {
          blob: detectionResult.blobImg,
          blobUrl: URL.createObjectURL(detectionResult.blobImg),
          result: detectionResult.detection,
          landmarks: detectionResult.detection.keypoints || [],
          confidence: detectionResult.detection.categories?.[0]?.score || 0,
          timestamp: detectionResult.timestamp || Date.now()
        };

        // Emit the detection event
        this.faceDetected.emit(faceDetectedData);

        return faceDetectedData;
      }

      return null;
    } catch (error) {
      console.error('Error in manual face detection:', error);
      return null;
    }
  }

  /**
   * Stop face detection
   */
  @Method()
  async stopDetection(): Promise<void> {
    this.enableDetection = false;
    this.cameraState = 'ready';
    this.detectionStopped.emit();
  }

  /**
   * Start face detection
   */
  @Method()
  async startDetection(): Promise<void> {
    if (this.cameraState === 'ready' || this.cameraState === 'inactive') {
      this.enableDetection = true;
      this.cameraState = 'detecting';
      this.detectionStarted.emit();
    }
  }

  /**
   * Toggle camera between front and back
   */
  @Method()
  async toggleCamera(): Promise<void> {
    try {
      this.cameraState = 'loading';
      this.facingMode = this.facingMode === CameraDirection.Front ? CameraDirection.Rear : CameraDirection.Front;

      // Stop current video stream
      if (this.video.srcObject) {
        const stream = this.video.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }

      // Reinitialize with new facing mode
      await initWebcamToVideo(this.video, this.facingMode);
      this.facingModeChanged.emit(this.facingMode);
      this.cameraState = this.enableDetection ? 'detecting' : 'ready';
    } catch (error) {
      this.handleError('CAMERA_ACCESS_DENIED', 'Failed to toggle camera', error);
    }
  }

  /**
   * Initialize camera and face detection
   */
  @Method()
  async initializeCamera(): Promise<void> {
    try {
      this.cameraState = 'loading';
      this.currentError = null;

      await this.componentWillLoad();

      if (this.autoStart && this.enableDetection) {
        this.cameraState = 'detecting';
      } else {
        this.cameraState = 'ready';
      }
    } catch (error) {
      this.handleError('INITIALIZATION_ERROR', 'Failed to initialize camera', error);
    }
  }


  /**
   * Get current face landmarks if a face is detected
   * @returns Array of landmark points or null if no face detected
   */
  @Method()
  async getCurrentLandmarks(): Promise<any[] | null> {
    if (this.detectionResult?.detection?.keypoints) {
      return this.detectionResult.detection.keypoints;
    }
    return null;
  }

  /**
   * Get current face confidence score
   * @returns Confidence score (0-1) or null if no face detected
   */
  @Method()
  async getCurrentConfidence(): Promise<number | null> {
    if (this.detectionResult?.detection?.categories?.[0]?.score !== undefined) {
      return this.detectionResult.detection.categories[0].score;
    }
    return null;
  }

  /**
   * Set detection mode programmatically
   * @param mode 'interval' for automatic detection, 'manual' for on-demand
   */
  @Method()
  async setDetectionMode(mode: 'interval' | 'manual'): Promise<void> {
    this.detectionMode = mode;
    if (mode === 'manual' && this.cameraState === 'detecting') {
      await this.stopDetection();
    }
  }

  /**
   * Giving a blob image, get the face landmarks
   * @returns face landmarks
   */
  @Method()
  async getBlobImageDescriptors(blob: Blob): Promise<FaceLandmarkerResult> {
    if (this.actualOptimizationMode === 'worker') {
      return await optimizedFaceDetectionService.getLandmarksFromBlob(blob);
    } else if (this.actualOptimizationMode === 'simplified') {
      return await simplifiedOptimizedFaceDetectionService.getLandmarksFromBlob(blob);
    } else {
      return await faceapiService.getFaceLandmarksFromBlob(blob);
    }
  }

  /**
   * Giving current face in video canvas, get the face landmarks
   * @returns face landmarks
   */
  @Method()
  async getFaceLandMarks(): Promise<FaceLandmarkerResult> {
    if (this.detectionResult && this.detectionResult.blobImg) {
      if (this.actualOptimizationMode === 'worker') {
        return await optimizedFaceDetectionService.getLandmarksFromBlob(this.detectionResult.blobImg);
      } else if (this.actualOptimizationMode === 'simplified') {
        return await simplifiedOptimizedFaceDetectionService.getLandmarksFromBlob(this.detectionResult.blobImg);
      } else {
        return await faceapiService.getFaceLandmarksFromBlob(this.detectionResult.blobImg);
      }
    } else {
      return null;
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
    if ( blob ) {
      lm = await faceapiService.getFaceLandmarksFromBlob( blob )
    } else {
      lm = await this.getFaceLandMarks()
    }
    // for each trained model of this.trainedModels get minimum distance
    const best = await getBestMatch( this.trainedModel, lm.faceLandmarks[0] )
    return best;

  }

  /**
   * Diagnostic method to check detection status
   */
  @Method()
  async getDiagnosticInfo(): Promise<any> {
    return {
      // Component state
      cameraState: this.cameraState,
      enableDetection: this.enableDetection,
      loaded: this.loaded,
      detectedFacesCount: this.detectedFacesCount,

      // Video element status
      videoElement: {
        readyState: this.video?.readyState,
        videoWidth: this.video?.videoWidth,
        videoHeight: this.video?.videoHeight,
        currentTime: this.video?.currentTime,
        paused: this.video?.paused
      },

      // Service status
      faceApiService: {
        isReady: faceapiService.isReady(),
        config: faceapiService.getConfig(),
        performanceStats: faceapiService.getPerformanceStats()
      },

      // Last detection result
      lastDetection: this.detectionResult ? {
        hasDetection: !!this.detectionResult.detection,
        confidence: this.detectionResult.confidence,
        timestamp: this.detectionResult.timestamp
      } : null
    };
  }

  /**
   * Event emitted when a face is detected in video stream
   */
  @Event({
    eventName: 'faceDetected',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceDetected: EventEmitter<iFaceDetected>;

  /**
   * Event emitted when face detection was stopped
   */
  @Event({
    eventName: 'faceStopDetection',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) faceStopDetection: EventEmitter<void>;

  /**
   * Event emitted when detection starts
   */
  @Event({
    eventName: 'detectionStarted',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) detectionStarted: EventEmitter<void>;

  /**
   * Event emitted when detection stops
   */
  @Event({
    eventName: 'detectionStopped',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) detectionStopped: EventEmitter<void>;

  /**
   * Event emitted when camera starts successfully
   */
  @Event({
    eventName: 'cameraStarted',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) cameraStarted: EventEmitter<MediaStream>;

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
  }) cameraError: EventEmitter<FaceDetectionError>;

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
   * Event emitted when a photo is automatically captured
   */
  @Event({
    eventName: 'photoCapture',
    composed: true,
    cancelable: false,
    bubbles: true,
  }) photoCapture: EventEmitter<Blob>;

  /**
   * Standard form input events
   */

  /**
   * Standard input event when face detection data changes
   */
  @Event() inputChange: EventEmitter<Event>;

  /**
   * Standard change event when detection data is committed
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


  // Private properties
  private lastVideoTime = -1;
  private photoTaken = false;

  // Helper Methods
  private handleError(type: FaceDetectionError['type'], message: string, originalError?: Error): void {
    const error: FaceDetectionError = {
      type,
      message,
      originalError
    };
    this.currentError = error;
    this.cameraState = 'error';
    this.cameraError.emit(error);
    console.error('Face API Webcam Error:', error);
  }

  private async capturePhoto(): Promise<void> {
    try {
      if (this.photoTaken) return; // Prevent multiple captures

      this.photoTaken = true;

      // Create a temporary canvas to capture the current frame
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = this.canvas.width;
      tempCanvas.height = this.canvas.height;
      const tempCtx = tempCanvas.getContext('2d');

      // Draw current frame to temporary canvas
      tempCtx.drawImage(this.canvas, 0, 0);

      // Convert to blob
      tempCanvas.toBlob((blob) => {
        if (blob) {
          console.log('Photo captured automatically:', blob);
          this.photoCapture.emit(blob);
        }
      }, 'image/jpeg', 0.9);

      // Reset photo flag after delay
      setTimeout(() => {
        this.photoTaken = false;
      }, this.captureDelay);

    } catch (error) {
      console.error('Error capturing photo:', error);
      this.photoTaken = false;
    }
  }

  async componentWillLoad() {
    // Check if we're in a test environment and skip intensive initialization
    if (typeof window !== 'undefined' && (window as any).__karma__ ||
        typeof process !== 'undefined' && process.env.NODE_ENV === 'test') {
      console.log('Test environment detected, skipping face API initialization');
      this.cameraState = 'ready';
      return;
    }

    // Don't auto-start if autoStart is false
    if (!this.autoStart) {
      console.log('Auto-start disabled, skipping initialization');
      this.cameraState = 'ready';
      return;
    }

    try {
      this.cameraState = 'loading';
      this.currentError = null;

      this.video = createVideo()
      this.canvas = createCanvas(this.el)
      this.canvas.width = this.width
      this.canvas.height = this.height
      this.el.appendChild(this.canvas)

      // Initialize the appropriate service with fallback chain
      if (this.useOptimizedDetection) {
        try {
          // Try Web Worker first
          await optimizedFaceDetectionService.initialize({
            minDetectionConfidence: this.scoreThreshold,
            maxNumFaces: 1,
            useGPU: false,
            throttleMs: this.detectionTimer
          });
          this.actualOptimizationMode = 'worker';
          console.info("Web Worker face detection service initialized");
        } catch (workerError) {
          console.warn("Web Worker failed, trying simplified optimization:", workerError);
          try {
            // Fallback to simplified optimization
            await simplifiedOptimizedFaceDetectionService.initialize({
              minDetectionConfidence: this.scoreThreshold,
              maxNumFaces: 1,
              useGPU: false,
              throttleMs: this.detectionTimer
            });
            this.actualOptimizationMode = 'simplified';
            console.info("Simplified optimized face detection service initialized");
          } catch (simplifiedError) {
            console.warn("Simplified optimization failed, using standard mode:", simplifiedError);
            this.useOptimizedDetection = false;
            await faceapiService.initialize();
            this.actualOptimizationMode = 'standard';
            console.info("Standard face API service initialized (fallback)");
          }
        }
      } else {
        await faceapiService.initialize();
        this.actualOptimizationMode = 'standard';
        console.info("Standard face API service initialized");
      }

      const stream = await initWebcamToVideo(this.video, this.facingMode)
      this.cameraStarted.emit(stream as MediaStream);

      // Wait for video to be ready before starting render loop
      await this.waitForVideoReady();

      renderToCanvas( this.canvas, this.video)

      this.loaded = true;

      if (this.autoStart && this.enableDetection) {
        this.cameraState = 'detecting';
        this.detectionStarted.emit();
      } else {
        this.cameraState = 'ready';
      }

      // Start render loop only after video is ready
      requestAnimationFrame(() => {
        this.webcamRender()
      })

    } catch (error) {
      this.handleError('INITIALIZATION_ERROR', 'Failed to initialize camera and face detection', error);
    }
  }

  disconnectedCallback() {
    // Clean up resources when component is removed
    if (this.video && this.video.srcObject) {
      const stream = this.video.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    // Dispose services if using optimized detection
    if (this.useOptimizedDetection) {
      optimizedFaceDetectionService.dispose();
    }
  }


  async webcamRender () {
    const startTimeMs = performance.now();

    // Verify video is ready for detection
    if (!this.isVideoElementReady()) {
      console.warn('⚠️ Video element not ready in webcamRender:', {
        readyState: this.video?.readyState,
        videoWidth: this.video?.videoWidth,
        videoHeight: this.video?.videoHeight,
        currentTime: this.video?.currentTime
      });

      await pxTimer(this.detectionTimer);
      requestAnimationFrame(() => {
        this.webcamRender();
      });
      return;
    }

    // Only run automatic detection if in interval mode
    if (this.detectionMode === 'interval' && this.video.currentTime !== this.lastVideoTime) {
      this.lastVideoTime = this.video.currentTime;

      if (this.enableDetection) {
        try {
          // Use appropriate service for detection
          if (this.actualOptimizationMode === 'worker') {
            this.detectionResult = await optimizedFaceDetectionService.detectFaceOptimized(this.video, startTimeMs);
          } else if (this.actualOptimizationMode === 'simplified') {
            this.detectionResult = await simplifiedOptimizedFaceDetectionService.detectFaceOptimized(this.video, startTimeMs);
          } else {
            this.detectionResult = await faceapiService.detectFaceOptimized(this.video, startTimeMs);
          }

          // Add debugging
          if (this.detectionResult) {
            console.log('✅ Face detected in component (interval mode):', {
              confidence: this.detectionResult.confidence,
              timestamp: this.detectionResult.timestamp,
              optimizationMode: this.actualOptimizationMode
            });
          } else {
            console.log('❌ No face detected in component (interval mode)');
          }
        } catch (error) {
          console.error('❌ Error in webcamRender detection:', error);
        }
      }
    }

    // Always continue the render loop, even in manual mode (for video display)
    await pxTimer(this.detectionTimer);

    requestAnimationFrame(() => {
      this.webcamRender();
    });
  }

  // Helper method to check if video element is ready
  private isVideoElementReady(): boolean {
    return (
      this.video &&
      this.video.readyState >= 2 && // HAVE_CURRENT_DATA or higher
      this.video.videoWidth > 0 &&
      this.video.videoHeight > 0 &&
      !this.video.paused &&
      !this.video.ended &&
      this.video.currentTime > 0
    );
  }

  // Wait for video to be properly loaded and ready for processing
  private async waitForVideoReady(maxWaitMs: number = 5000): Promise<void> {
    const startTime = Date.now();
    const checkInterval = 50; // Check every 50ms

    return new Promise((resolve, reject) => {
      const checkVideo = () => {
        if (this.isVideoElementReady()) {
          console.log('✅ Video element is ready for processing:', {
            readyState: this.video.readyState,
            videoWidth: this.video.videoWidth,
            videoHeight: this.video.videoHeight,
            currentTime: this.video.currentTime
          });
          resolve();
          return;
        }

        const elapsed = Date.now() - startTime;
        if (elapsed >= maxWaitMs) {
          const error = new Error(`Video not ready after ${maxWaitMs}ms`);
          console.error('❌ Video readiness timeout:', {
            elapsed,
            readyState: this.video?.readyState,
            videoWidth: this.video?.videoWidth,
            videoHeight: this.video?.videoHeight,
            currentTime: this.video?.currentTime
          });
          reject(error);
          return;
        }

        console.log('⏳ Waiting for video to be ready...', {
          elapsed: elapsed + 'ms',
          readyState: this.video?.readyState,
          videoWidth: this.video?.videoWidth,
          videoHeight: this.video?.videoHeight,
          currentTime: this.video?.currentTime
        });

        setTimeout(checkVideo, checkInterval);
      };

      checkVideo();
    });
  }


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


  /**
   * Form validation method
   */
  private validateInput(): void {
    let isValid = true;
    let message = '';

    // Required validation
    if (this.required && !this.value) {
      isValid = false;
      message = this.validationMessage || 'Face detection data is required.';
    }

    // Confidence threshold validation
    if (this.value) {
      try {
        const faceData = JSON.parse(this.value);
        if (faceData.detection?.categories?.[0]?.score < this.captureThreshold) {
          isValid = false;
          message = this.validationMessage || `Face detection confidence must be at least ${this.captureThreshold * 100}%.`;
        }
      } catch (e) {
        isValid = false;
        message = this.validationMessage || 'Invalid face detection data format.';
      }
    }

    // Custom validation
    if (this.customValidation && !this.customValidation(this.value)) {
      isValid = false;
      message = this.validationMessage || 'Custom validation failed.';
    }

    this.isValid = isValid;
    this.currentValidationMessage = message;

    if (!isValid) {
      this.validationFailed.emit();
    }
  }

  /**
   * Update form value and emit events
   */
  private updateFormValue(newValue: string): void {
    this.value = newValue;
    this.validateInput();
    this.inputChange.emit();
    this.valueChange.emit();
  }

  // Form Association Methods
  /**
   * Get the current form value
   */
  @Method()
  async getFormValue(): Promise<string> {
    return this.value;
  }

  /**
   * Set the form value
   */
  @Method()
  async setFormValue(value: string): Promise<void> {
    this.updateFormValue(value);
  }

  /**
   * Check validity of the input
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    this.validateInput();
    return this.isValid;
  }

  /**
   * Get validation message
   */
  @Method()
  async getValidationMessage(): Promise<string> {
    return this.currentValidationMessage;
  }

  /**
   * Set custom validity
   */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.isValid = !message;
    this.currentValidationMessage = message;
  }

  /**
   * Focus the component (start camera and detection)
   */
  @Method()
  async setFocus(): Promise<void> {
    if (!this.disabled && !this.readonly) {
      await this.initializeCamera();
      await this.startDetection();
      this.focusGained.emit();
    }
  }

  /**
   * Blur the component (stop camera and detection)
   */
  @Method()
  async setBlur(): Promise<void> {
    await this.stopDetection();
    this.focusLost.emit();
  }

  render() {
    const hostStyle = {
      height: this.height+"px",
      width: this.width+"px",
    }

    const renderCameraState = () => {
      if (this.cameraState === 'inactive') {
        return (
          <div class="camera-state">
            {renderModernIcon('camera', 64, 'inactive-icon')}
            <h3>Camera Inactive</h3>
            <p>Click start to begin face detection</p>
          </div>
        );
      }

      if (this.cameraState === 'loading') {
        return (
          <div class="camera-state">
            <div class="loading-spinner"></div>
            <h3>Starting Camera</h3>
            <p>Please allow camera access when prompted</p>
          </div>
        );
      }

      if (this.cameraState === 'error') {
        return (
          <div class="camera-state">
            {renderModernIcon('warning', 64, 'error-icon')}
            <h3>Camera Error</h3>
            <p>{this.currentError?.message || 'Unable to access camera'}</p>
          </div>
        );
      }

      return null;
    };

    const renderIndicators = () => {
      if (this.cameraState !== 'detecting' && this.cameraState !== 'ready') return null;

      return [
        // Detection mode indicator
        <div class="detection-mode-indicator">
          {this.detectionMode === 'interval' ? 'AUTO DETECTION' : 'MANUAL DETECTION'}
          {this.actualOptimizationMode === 'worker' && (
            <span class="optimized-badge">
              {renderModernIcon('lightning', 16)} WORKER
            </span>
          )}
          {this.actualOptimizationMode === 'simplified' && (
            <span class="optimized-badge">
              {renderModernIcon('lightning', 16)} OPTIMIZED
            </span>
          )}
          {this.actualOptimizationMode === 'standard' && (
            <span class="standard-badge">
              {renderModernIcon('camera', 16)} STANDARD
            </span>
          )}
        </div>,

        // Auto-capture indicator
        this.autoCapture && (
          <div class="auto-capture-indicator">
            AUTO CAPTURE
          </div>
        ),

        // Face detection indicator
        this.cameraState === 'detecting' && (
          <div class={`face-indicator ${this.detectedFacesCount > 0 ? 'detected' : 'not-detected'}`}>
            {this.detectedFacesCount > 0 ? `${this.detectedFacesCount} Face${this.detectedFacesCount !== 1 ? 's' : ''} Detected` : 'No Face Detected'}
          </div>
        ),

        // Confidence score indicator
        this.detectionResult?.detection && (
          <div class="confidence-indicator">
            Confidence: {Math.round((this.detectionResult.detection.categories?.[0]?.score || 0) * 100)}%
          </div>
        ),

        // Performance indicator (only for optimized modes)
        (this.actualOptimizationMode === 'worker' || this.actualOptimizationMode === 'simplified') && this.cameraState === 'detecting' && (
          <div class="performance-indicator">
            Performance: {this.actualOptimizationMode === 'worker' ? 'Web Worker' : 'Simplified Optimized'}
          </div>
        ),

        // Error message
        this.currentError && (
          <div class="error-message">
            {this.currentError.message}
          </div>
        )
      ];
    };

    const renderControls = () => {
      if (!this.showControls) return null;

      const isLoading = this.cameraState === 'loading';

      return (
        <div class="camera-controls">
          {this.detectionMode === 'interval' ? (
            // Interval mode controls
            this.cameraState === 'inactive' || this.cameraState === 'ready' ? (
              <button
                class="control-button start-button icon-button"
                onClick={() => this.startDetection()}
                disabled={isLoading}
                title={this.startButtonText}
              >
                {renderModernIcon('play', 20)}
              </button>
            ) : this.cameraState === 'detecting' ? (
              <button
                class="control-button stop-button icon-button"
                onClick={() => this.stopDetection()}
                title={this.stopButtonText}
              >
                {renderModernIcon('stop', 20)}
              </button>
            ) : null
          ) : (
            // Manual mode controls
            (this.cameraState === 'ready' || this.cameraState === 'detecting') && (
              <button
                class="control-button detect-button icon-button"
                onClick={() => this.detectFaceManually()}
                disabled={isLoading}
                title="Detect Face Manually"
              >
                {renderModernIcon('search', 20)}
              </button>
            )
          )}

          {(this.cameraState === 'ready' || this.cameraState === 'detecting') && (
            <button
              class="control-button flip-button icon-button"
              onClick={() => this.toggleCamera()}
              disabled={isLoading}
              title={this.flipButtonText}
            >
              {renderModernIcon('flip', 20)}
            </button>
          )}

          {/* Mode toggle button */}
          <button
            class="control-button mode-button icon-button"
            onClick={() => {
              this.detectionMode = this.detectionMode === 'interval' ? 'manual' : 'interval';
              if (this.detectionMode === 'manual' && this.cameraState === 'detecting') {
                this.stopDetection();
              }
            }}
            title={`Switch to ${this.detectionMode === 'interval' ? 'Manual' : 'Interval'} Mode`}
          >
            {renderModernIcon('mode', 20)}
          </button>
        </div>
      );
    };

    return (
      <Host style={hostStyle}>
        <slot name='before'></slot>

        {/* Camera state overlay */}
        {renderCameraState()}

        {/* Status indicators */}
        {renderIndicators()}

        {/* Control buttons */}
        {renderControls()}

        <slot></slot>
        <slot name='after'></slot>
      </Host>
    );
  }

}
