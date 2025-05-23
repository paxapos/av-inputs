import { FaceDetector, FilesetResolver, FaceLandmarker } from "@mediapipe/tasks-vision";
import { videoToBlob } from "./camera.service";
export class FaceapiService {
    constructor(config) {
        this.isInitialized = false;
        this.isInitializing = false;
        this.lastDetectionTime = 0;
        this.lastDetectionResult = null;
        this.detectionQueue = null;
        // Performance monitoring
        this.performanceStats = {
            detections: 0,
            avgDetectionTime: 0,
            lastFrameTime: 0,
            fps: 0
        };
        // Configuration with defaults
        this.config = {
            minDetectionConfidence: 0.3, // Reduced from 0.6 for better detection
            maxNumFaces: 1,
            modelComplexity: 1,
            throttleMs: 100, // Increased from 50 for stability
            enableLandmarks: true,
            useGPU: true
        };
        if (config) {
            this.config = Object.assign(Object.assign({}, this.config), config);
        }
    }
    async initialize() {
        if (this.isInitialized)
            return this;
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
        }
        catch (error) {
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
    updateConfig(newConfig) {
        const oldConfig = Object.assign({}, this.config);
        this.config = Object.assign(Object.assign({}, this.config), newConfig);
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
            const filesetResolver = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
            let runningMode = "IMAGE";
            this.landmarksDetector = await FaceLandmarker.createFromOptions(filesetResolver, {
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
                    delegate: this.config.useGPU ? "GPU" : "CPU"
                },
                outputFaceBlendshapes: true,
                runningMode,
                numFaces: this.config.maxNumFaces
            });
        }
        catch (error) {
            console.error('Error initializing face landmarker:', error);
            throw new Error(`Face landmarker initialization failed: ${error.message}`);
        }
    }
    async initializefaceDetector(minDetectionConfidence) {
        try {
            const vision = await FilesetResolver.forVisionTasks("https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm");
            this.faceDetector = await FaceDetector.createFromOptions(vision, {
                minSuppressionThreshold: 0.3,
                minDetectionConfidence,
                baseOptions: {
                    modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
                    delegate: this.config.useGPU ? "GPU" : "CPU"
                },
                runningMode: "VIDEO",
            });
        }
        catch (error) {
            console.error('Error initializing face detector:', error);
            throw new Error(`Face detector initialization failed: ${error.message}`);
        }
    }
    updateDetectionConfidence(newConfidence) {
        this.config.minDetectionConfidence = newConfidence;
        // Reinitialize detector with new confidence
        if (this.isInitialized) {
            this.initializefaceDetector(newConfidence);
        }
    }
    async detectFace(el, timeStamp) {
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
    isVideoReady(video) {
        return (video.readyState >= 2 && // HAVE_CURRENT_DATA or higher
            video.videoWidth > 0 &&
            video.videoHeight > 0 &&
            !video.paused &&
            !video.ended &&
            video.currentTime > 0);
    }
    async performDetection(el, timeStamp) {
        var _a, _b;
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
                detectionCount: (detections === null || detections === void 0 ? void 0 : detections.length) || 0,
                detections: detections === null || detections === void 0 ? void 0 : detections.map(d => {
                    var _a, _b;
                    return ({
                        confidence: (_b = (_a = d.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score,
                        boundingBox: d.boundingBox
                    });
                })
            });
            if (!detections || detections.length === 0) {
                console.log('❌ No faces detected');
                return null;
            }
            let detectionObj;
            if (detections.length === 1) {
                detectionObj = detections[0];
            }
            else {
                // Sort by confidence and take the best
                const sorted = detections.sort((a, b) => {
                    var _a, _b, _c, _d;
                    return (((_b = (_a = b.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score) || 0) - (((_d = (_c = a.categories) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.score) || 0);
                });
                detectionObj = sorted[0];
            }
            console.log('✅ Best detection:', {
                confidence: (_b = (_a = detectionObj.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score,
                threshold: this.config.minDetectionConfidence
            });
            const result = await this.getDetectorImgFromDetection(el, detectionObj, timeStamp);
            // Update performance stats
            this.updatePerformanceStats(performance.now() - startTime);
            return result;
        }
        catch (error) {
            console.error('❌ Error during face detection:', error);
            return null;
        }
    }
    async detectFaceThrottled(el, timeStamp, throttleMs = 100) {
        const now = Date.now();
        if (this.lastDetectionTime && (now - this.lastDetectionTime) < throttleMs) {
            return this.lastDetectionResult;
        }
        this.lastDetectionTime = now;
        this.lastDetectionResult = await this.detectFace(el, timeStamp);
        return this.lastDetectionResult;
    }
    async detectFaceOptimized(el, timeStamp) {
        return this.detectFaceThrottled(el, timeStamp, this.config.throttleMs);
    }
    async getDetectorImgFromDetection(el, detection, timeStamp) {
        var _a, _b;
        if (!detection || !detection.boundingBox) {
            return null;
        }
        const blob = await videoToBlob(el, detection.boundingBox);
        const confidence = ((_b = (_a = detection.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score) || 0;
        return {
            detection: detection,
            currentTarget: el,
            blobImg: blob,
            confidence: confidence,
            timestamp: timeStamp
        };
    }
    async getFaceLandmarksFromBlob(blob) {
        this.checkInitialized();
        let imag = await createImageBitmap(blob);
        return this.landmarksDetector.detect(imag);
    }
    checkInitialized() {
        if (!this.landmarksDetector)
            throw new Error("Aun no se cargo el model de face detection");
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
    updatePerformanceStats(detectionTime) {
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
        return Object.assign({}, this.performanceStats);
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
    isReady() {
        return this.isInitialized && !!this.faceDetector;
    }
    // Get current configuration
    getConfig() {
        return Object.assign({}, this.config);
    }
}
export const faceapiService = new FaceapiService();
//# sourceMappingURL=facepi.service.js.map
