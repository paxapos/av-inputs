import {
    FaceDetector,
    FilesetResolver,
    Detection,
    FaceLandmarker,
    FaceLandmarkerResult,
    ImageSource
} from "@mediapipe/tasks-vision";
import { videoToBlob } from "./camera.service";

export interface DetectionImg {
    detection: Detection,
    currentTarget: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement,
    blobImg: Blob,
    confidence: number,
    timestamp: number,
}

export interface FaceDetectionConfig {
    minDetectionConfidence?: number;
    maxNumFaces?: number;
    modelComplexity?: number;
    throttleMs?: number;
    enableLandmarks?: boolean;
    useGPU?: boolean;
}

export class FaceapiService {
    private faceDetector: FaceDetector;
    private landmarksDetector: FaceLandmarker;
    private isInitialized = false;
    private isInitializing = false;
    private lastDetectionTime: number = 0;
    private lastDetectionResult: DetectionImg | null = null;
    private detectionQueue: Promise<DetectionImg | null> | null = null;

    // Performance monitoring
    private performanceStats = {
        detections: 0,
        avgDetectionTime: 0,
        lastFrameTime: 0,
        fps: 0
    };

    // Configuration with defaults
    private config: Required<FaceDetectionConfig> = {
        minDetectionConfidence: 0.3, // Reduced from 0.6 for better detection
        maxNumFaces: 1,
        modelComplexity: 1,
        throttleMs: 100, // Increased from 50 for stability
        enableLandmarks: true,
        useGPU: true
    };

    constructor(config?: FaceDetectionConfig) {
        if (config) {
            this.config = { ...this.config, ...config };
        }
    }

    async initialize() {
        if (this.isInitialized) return this;
        if (this.isInitializing) {
            // Wait for ongoing initialization
            while (this.isInitializing) {
                await new Promise(resolve => setTimeout(resolve, 50));
            }
            return this;
        }

        this.isInitializing = true;

        try {
            console.log('🚀 Initializing FaceAPI Service...');
            const startTime = performance.now();

            // Initialize both detectors in parallel for better performance
            await Promise.all([
                this.initializefaceDetector(this.config.minDetectionConfidence),
                this.config.enableLandmarks ? this.initFaceLandmarkerDetector() : Promise.resolve()
            ]);

            this.isInitialized = true;
            this.isInitializing = false;

            const initTime = performance.now() - startTime;
            console.log(`✅ FaceAPI Service initialized in ${initTime.toFixed(2)}ms`);
        } catch (error) {
            this.isInitializing = false;
            console.error('❌ Failed to initialize face detection:', error);
            throw new Error(`Face detection initialization failed: ${error.message}`);
        }

        return this;
    }

    // Getter methods for accessing configuration
    get minDetectionConfidence() { return this.config.minDetectionConfidence; }
    get maxNumFaces() { return this.config.maxNumFaces; }
    get throttleMs() { return this.config.throttleMs; }

    // Update configuration dynamically
    updateConfig(newConfig: Partial<FaceDetectionConfig>) {
        const oldConfig = { ...this.config };
        this.config = { ...this.config, ...newConfig };

        // Reinitialize if critical settings changed
        if (oldConfig.minDetectionConfidence !== this.config.minDetectionConfidence ||
            oldConfig.maxNumFaces !== this.config.maxNumFaces ||
            oldConfig.useGPU !== this.config.useGPU) {
            console.log('🔄 Configuration changed, reinitializing...');
            this.dispose();
            this.initialize();
        }
    }

    async initFaceLandmarkerDetector() {
        try {
            const filesetResolver = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            );
            let runningMode: "IMAGE" | "VIDEO" = "IMAGE";
            this.landmarksDetector = await FaceLandmarker.createFromOptions(filesetResolver, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: this.config.useGPU ? "GPU" : "CPU"
                },
                outputFaceBlendshapes: true,
                runningMode,
                numFaces: this.config.maxNumFaces
            });
        } catch (error) {
            console.error('Error initializing face landmarker:', error);
            throw new Error(`Face landmarker initialization failed: ${error.message}`);
        }
    }

    async initializefaceDetector(minDetectionConfidence: number) {
        try {
            const vision = await FilesetResolver.forVisionTasks(
                "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
            );

            this.faceDetector = await FaceDetector.createFromOptions(vision, {
                minSuppressionThreshold: 0.3,
                minDetectionConfidence,
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
                    delegate: this.config.useGPU ? "GPU" : "CPU"
                },
                runningMode: "VIDEO",
            });
        } catch (error) {
            console.error('Error initializing face detector:', error);
            throw new Error(`Face detector initialization failed: ${error.message}`);
        }
    }

    updateDetectionConfidence(newConfidence: number) {
        this.config.minDetectionConfidence = newConfidence;
        // Reinitialize detector with new confidence
        if (this.isInitialized) {
            this.initializefaceDetector(newConfidence);
        }
    }

    async detectFace(el: HTMLVideoElement, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg | null> {
        if (!el || !this.faceDetector) {
            console.warn('⚠️ Detection skipped:', {
                hasElement: !!el,
                hasDetector: !!this.faceDetector,
                isInitialized: this.isInitialized
            });
            return null;
        }

        // Validate video element is ready for processing
        if (!this.isVideoReady(el)) {
            console.warn('⚠️ Video not ready for detection:', {
                readyState: el.readyState,
                videoWidth: el.videoWidth,
                videoHeight: el.videoHeight,
                currentTime: el.currentTime
            });
            return null;
        }

        // Use detection queue to prevent overlapping detection calls
        if (this.detectionQueue) {
            return this.detectionQueue;
        }

        this.detectionQueue = this.performDetection(el, timeStamp);
        const result = await this.detectionQueue;
        this.detectionQueue = null;

        return result;
    }

    private isVideoReady(video: HTMLVideoElement): boolean {
        return (
            video.readyState >= 2 && // HAVE_CURRENT_DATA or higher
            video.videoWidth > 0 &&
            video.videoHeight > 0 &&
            !video.paused &&
            !video.ended &&
            video.currentTime > 0
        );
    }

    private async performDetection(el: HTMLVideoElement, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg | null> {
        const startTime = performance.now();

        try {
            console.log('🔍 Performing face detection...', {
                videoReady: el.readyState,
                videoWidth: el.videoWidth,
                videoHeight: el.videoHeight,
                currentTime: el.currentTime,
                timestamp: timeStamp
            });

            // Double-check video is still ready (defensive programming)
            if (!this.isVideoReady(el)) {
                console.warn('⚠️ Video became invalid during detection');
                return null;
            }

            const detectionResult = this.faceDetector.detectForVideo(el, timeStamp);
            const detections = detectionResult.detections;

            console.log('📊 Detection results:', {
                detectionCount: detections?.length || 0,
                detections: detections?.map(d => ({
                    confidence: d.categories?.[0]?.score,
                    boundingBox: d.boundingBox
                }))
            });

            if (!detections || detections.length === 0) {
                console.log('❌ No faces detected');
                return null;
            }

            let detectionObj: Detection;

            if (detections.length === 1) {
                detectionObj = detections[0];
            } else {
                // Sort by confidence and take the best
                const sorted = detections.sort((a, b) => {
                    return (b.categories?.[0]?.score || 0) - (a.categories?.[0]?.score || 0);
                });
                detectionObj = sorted[0];
            }

            console.log('✅ Best detection:', {
                confidence: detectionObj.categories?.[0]?.score,
                threshold: this.config.minDetectionConfidence
            });

            const result = await this.getDetectorImgFromDetection(el, detectionObj, timeStamp);

            // Update performance stats
            this.updatePerformanceStats(performance.now() - startTime);

            return result;
        } catch (error) {
            console.error('❌ Error during face detection:', error);
            return null;
        }
    }

    async detectFaceThrottled(
        el: HTMLVideoElement,
        timeStamp: DOMHighResTimeStamp,
        throttleMs: number = 100
    ): Promise<DetectionImg | null> {
        const now = Date.now();
        if (this.lastDetectionTime && (now - this.lastDetectionTime) < throttleMs) {
            return this.lastDetectionResult;
        }

        this.lastDetectionTime = now;
        this.lastDetectionResult = await this.detectFace(el, timeStamp);
        return this.lastDetectionResult;
    }

    async detectFaceOptimized(
        el: HTMLVideoElement,
        timeStamp: DOMHighResTimeStamp
    ): Promise<DetectionImg | null> {
        return this.detectFaceThrottled(el, timeStamp, this.config.throttleMs);
    }

    async getDetectorImgFromDetection(el, detection: Detection, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg> {
        if (!detection || !detection.boundingBox) {
            return null;
        }

        const blob = await videoToBlob(el, detection.boundingBox);
        const confidence = detection.categories?.[0]?.score || 0;

        return {
            detection: detection,
            currentTarget: el,
            blobImg: blob,
            confidence: confidence,
            timestamp: timeStamp
        };
    }

    async getFaceLandmarksFromBlob(blob: Blob): Promise<FaceLandmarkerResult> {
        this.checkInitialized();

        let imag: ImageSource = await createImageBitmap(blob);

        return this.landmarksDetector.detect(imag);
    }

    checkInitialized() {
        if (!this.landmarksDetector) throw new Error("Aun no se cargo el model de face detection");
    }

    dispose() {
        if (this.faceDetector) {
            this.faceDetector.close();
        }
        if (this.landmarksDetector) {
            this.landmarksDetector.close();
        }
        this.isInitialized = false;
    }

    // Performance monitoring methods
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

    // Get performance statistics
    getPerformanceStats() {
        return { ...this.performanceStats };
    }

    // Reset performance statistics
    resetPerformanceStats() {
        this.performanceStats = {
            detections: 0,
            avgDetectionTime: 0,
            lastFrameTime: 0,
            fps: 0
        };
    }

    // Check if service is ready
    isReady(): boolean {
        return this.isInitialized && !!this.faceDetector;
    }

    // Get current configuration
    getConfig(): FaceDetectionConfig {
        return { ...this.config };
    }
}

export const faceapiService = new FaceapiService();
