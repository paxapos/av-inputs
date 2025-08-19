/**
 * Web Worker para detección facial optimizada
 * Maneja las operaciones pesadas de ML sin bloquear la UI
 */

import {
    FaceDetector,
    FilesetResolver,
    Detection,
    FaceLandmarker,
    FaceLandmarkerResult
} from "@mediapipe/tasks-vision";

export interface WorkerMessage {
  type: 'INIT' | 'DETECT_FACE' | 'GET_LANDMARKS' | 'DISPOSE' | 'UPDATE_CONFIG';
  payload?: any;
  id?: string;
}

export interface WorkerResponse {
  type: 'INIT_SUCCESS' | 'INIT_ERROR' | 'DETECTION_RESULT' | 'LANDMARKS_RESULT' | 'ERROR';
  payload?: any;
  id?: string;
}

export interface DetectionRequest {
  imageData: ImageData;
  timestamp: number;
  config: FaceDetectionConfig;
}

export interface FaceDetectionConfig {
  minDetectionConfidence: number;
  maxNumFaces: number;
  useGPU: boolean;
  throttleMs: number;
}

class FaceDetectionWorker {
  private faceDetector: FaceDetector | null = null;
  private landmarksDetector: FaceLandmarker | null = null;
  private isInitialized = false;
  private lastDetectionTime = 0;
  private config: FaceDetectionConfig = {
    minDetectionConfidence: 0.5,
    maxNumFaces: 1,
    useGPU: false,
    throttleMs: 100
  };

  constructor() {
    self.addEventListener('message', this.handleMessage.bind(this));
  }

  private async handleMessage(event: MessageEvent<WorkerMessage>) {
    const { type, payload, id } = event.data;

    try {
      switch (type) {
        case 'INIT':
          await this.initialize(payload);
          this.postMessage({ type: 'INIT_SUCCESS', id });
          break;

        case 'DETECT_FACE':
          const result = await this.detectFace(payload);
          this.postMessage({ type: 'DETECTION_RESULT', payload: result, id });
          break;

        case 'GET_LANDMARKS':
          const landmarks = await this.getLandmarks(payload);
          this.postMessage({ type: 'LANDMARKS_RESULT', payload: landmarks, id });
          break;

        case 'UPDATE_CONFIG':
          this.updateConfig(payload);
          break;

        case 'DISPOSE':
          this.dispose();
          break;

        default:
          throw new Error(`Unknown message type: ${type}`);
      }
    } catch (error) {
      this.postMessage({
        type: 'ERROR',
        payload: { message: error.message, stack: error.stack },
        id
      });
    }
  }

  private postMessage(message: WorkerResponse) {
    self.postMessage(message);
  }

  private async initialize(config?: Partial<FaceDetectionConfig>) {
    if (this.isInitialized) return;

    if (config) {
      this.config = { ...this.config, ...config };
    }

    try {
      console.log('🔄 Initializing face detection in worker...');

      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );

      // Initialize face detector
      this.faceDetector = await FaceDetector.createFromOptions(filesetResolver, {
        minSuppressionThreshold: 0.3,
        minDetectionConfidence: this.config.minDetectionConfidence,
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
          delegate: this.config.useGPU ? "GPU" : "CPU"
        },
        runningMode: "IMAGE"
      });

      // Initialize landmarks detector
      this.landmarksDetector = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: this.config.useGPU ? "GPU" : "CPU"
        },
        outputFaceBlendshapes: true,
        runningMode: "IMAGE",
        numFaces: this.config.maxNumFaces
      });

      this.isInitialized = true;
      console.log('✅ Face detection worker initialized');

    } catch (error) {
      console.error('❌ Error initializing face detection worker:', error);
      throw error;
    }
  }

  private async detectFace(request: DetectionRequest) {
    if (!this.isInitialized || !this.faceDetector) {
      throw new Error('Worker not initialized');
    }

    // Throttling
    const now = Date.now();
    if (this.lastDetectionTime && (now - this.lastDetectionTime) < this.config.throttleMs) {
      return null;
    }
    this.lastDetectionTime = now;

    try {
      // Convert ImageData to ImageBitmap for MediaPipe
      const imageBitmap = await createImageBitmap(request.imageData);

      // Perform detection
      const detectionResult = this.faceDetector.detect(imageBitmap);
      const detections = detectionResult.detections;

      if (!detections || detections.length === 0) {
        return null;
      }

      // Get best detection
      let bestDetection: Detection;
      if (detections.length === 1) {
        bestDetection = detections[0];
      } else {
        bestDetection = detections.reduce((best, current) => {
          const bestScore = best.categories?.[0]?.score || 0;
          const currentScore = current.categories?.[0]?.score || 0;
          return currentScore > bestScore ? current : best;
        });
      }

      // Extract face region from ImageData
      const faceBlob = await this.extractFaceBlob(request.imageData, bestDetection);

      return {
        detection: bestDetection,
        confidence: bestDetection.categories?.[0]?.score || 0,
        timestamp: request.timestamp,
        faceBlob: faceBlob,
        landmarks: bestDetection.keypoints || []
      };

    } catch (error) {
      console.error('❌ Error in face detection:', error);
      throw error;
    }
  }

  private async extractFaceBlob(imageData: ImageData, detection: Detection): Promise<Blob> {
    if (!detection.boundingBox) {
      throw new Error('No bounding box in detection');
    }

    const { originX, originY, width, height } = detection.boundingBox;

    // Create canvas to extract face region
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');

    if (!ctx) {
      throw new Error('Failed to get canvas context');
    }

    // Create temporary canvas with full image
    const tempCanvas = new OffscreenCanvas(imageData.width, imageData.height);
    const tempCtx = tempCanvas.getContext('2d');

    if (!tempCtx) {
      throw new Error('Failed to get temp canvas context');
    }

    // Put image data on temp canvas
    tempCtx.putImageData(imageData, 0, 0);

    // Draw face region to main canvas
    ctx.drawImage(
      tempCanvas,
      originX, originY, width, height,
      0, 0, width, height
    );

    // Convert to blob
    return canvas.convertToBlob({ type: 'image/jpeg', quality: 0.9 });
  }

  private async getLandmarks(blob: Blob): Promise<FaceLandmarkerResult | null> {
    if (!this.isInitialized || !this.landmarksDetector) {
      throw new Error('Worker not initialized');
    }

    try {
      const imageBitmap = await createImageBitmap(blob);
      return this.landmarksDetector.detect(imageBitmap);
    } catch (error) {
      console.error('❌ Error getting landmarks:', error);
      throw error;
    }
  }

  private updateConfig(newConfig: Partial<FaceDetectionConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  private dispose() {
    if (this.faceDetector) {
      this.faceDetector.close();
      this.faceDetector = null;
    }
    if (this.landmarksDetector) {
      this.landmarksDetector.close();
      this.landmarksDetector = null;
    }
    this.isInitialized = false;
  }
}

// Initialize worker
new FaceDetectionWorker();
