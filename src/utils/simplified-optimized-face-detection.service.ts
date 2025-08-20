/**
 * Servicio de detección facial optimizado (versión simplificada sin Web Workers)
 * Usa técnicas de optimización sin workers para mejor compatibilidad
 */

import { DetectionImg, faceapiService } from './facepi.service';

export interface FaceDetectionConfig {
  minDetectionConfidence: number;
  maxNumFaces: number;
  useGPU: boolean;
  throttleMs: number;
}

export class SimplifiedOptimizedFaceDetectionService {
  private isInitialized = false;
  private isInitializing = false;
  private lastDetectionTime = 0;

  private config: FaceDetectionConfig = {
    minDetectionConfidence: 0.5,
    maxNumFaces: 1,
    useGPU: false,
    throttleMs: 100
  };

  // Performance stats
  private performanceStats = {
    detections: 0,
    avgDetectionTime: 0,
    lastFrameTime: 0,
    fps: 0
  };

  async initialize(config?: Partial<FaceDetectionConfig>): Promise<void> {
    if (this.isInitialized) return;
    if (this.isInitializing) {
      throw new Error('Already initializing');
    }

    this.isInitializing = true;

    try {
      console.log('🔄 Initializing simplified optimized face detection service...');

      if (config) {
        this.config = { ...this.config, ...config };
      }

      // Use the standard face API service as base
      await faceapiService.initialize();

      this.isInitialized = true;
      this.isInitializing = false;

      console.log('✅ Simplified optimized face detection service initialized');

    } catch (error) {
      this.isInitializing = false;
      console.error('❌ Error initializing simplified optimized face detection service:', error);
      throw error;
    }
  }

  async detectFaceOptimized(
    video: HTMLVideoElement,
    timestamp: number
  ): Promise<DetectionImg | null> {
    if (!this.isInitialized) {
      throw new Error('Service not initialized');
    }

    const startTime = performance.now();

    try {
      // Throttling to prevent too frequent calls
      const now = Date.now();
      if (this.lastDetectionTime && (now - this.lastDetectionTime) < this.config.throttleMs) {
        return null;
      }
      this.lastDetectionTime = now;

      // Use requestIdleCallback for better performance if available
      if (window.requestIdleCallback) {
        return new Promise((resolve) => {
          window.requestIdleCallback(async () => {
            const result = await this.performDetection(video, timestamp, startTime);
            resolve(result);
          }, { timeout: 100 });
        });
      } else {
        // Fallback to immediate execution with micro-task scheduling
        return new Promise((resolve) => {
          setTimeout(async () => {
            const result = await this.performDetection(video, timestamp, startTime);
            resolve(result);
          }, 0);
        });
      }

    } catch (error) {
      console.error('❌ Error in simplified optimized face detection:', error);
      return null;
    }
  }

  private async performDetection(
    video: HTMLVideoElement,
    timestamp: number,
    startTime: number
  ): Promise<DetectionImg | null> {
    try {
      // Use the standard face API service but with optimizations
      const result = await faceapiService.detectFaceOptimized(video, timestamp);

      // Update performance stats
      this.updatePerformanceStats(performance.now() - startTime);

      return result;
    } catch (error) {
      console.error('❌ Error in performance detection:', error);
      return null;
    }
  }

  async getLandmarksFromBlob(blob: Blob): Promise<any> {
    if (!this.isInitialized) {
      throw new Error('Service not initialized');
    }

    try {
      // Use requestIdleCallback for landmarks too
      if (window.requestIdleCallback) {
        return new Promise((resolve, reject) => {
          window.requestIdleCallback(async () => {
            try {
              const result = await faceapiService.getFaceLandmarksFromBlob(blob);
              resolve(result);
            } catch (error) {
              reject(error);
            }
          }, { timeout: 200 });
        });
      } else {
        return await faceapiService.getFaceLandmarksFromBlob(blob);
      }
    } catch (error) {
      console.error('❌ Error getting landmarks:', error);
      throw error;
    }
  }

  updateConfig(newConfig: Partial<FaceDetectionConfig>): void {
    this.config = { ...this.config, ...newConfig };

    // Update the underlying service if needed
    if (faceapiService.updateConfig) {
      faceapiService.updateConfig({
        minDetectionConfidence: this.config.minDetectionConfidence,
        throttleMs: this.config.throttleMs
      });
    }
  }

  isReady(): boolean {
    return this.isInitialized;
  }

  getConfig(): FaceDetectionConfig {
    return { ...this.config };
  }

  getPerformanceStats() {
    return { ...this.performanceStats };
  }

  private updatePerformanceStats(detectionTime: number) {
    this.performanceStats.detections++;
    this.performanceStats.avgDetectionTime =
      (this.performanceStats.avgDetectionTime * (this.performanceStats.detections - 1) + detectionTime) /
      this.performanceStats.detections;

    const now = performance.now();
    if (this.performanceStats.lastFrameTime > 0) {
      const frameTime = now - this.performanceStats.lastFrameTime;
      this.performanceStats.fps = Math.round(1000 / frameTime);
    }
    this.performanceStats.lastFrameTime = now;
  }

  dispose(): void {
    this.isInitialized = false;
    this.isInitializing = false;
    this.lastDetectionTime = 0;
  }
}

// Singleton instance
export const simplifiedOptimizedFaceDetectionService = new SimplifiedOptimizedFaceDetectionService();
