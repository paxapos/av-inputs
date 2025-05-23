import { Detection, FaceLandmarkerResult } from "@mediapipe/tasks-vision";
export interface DetectionImg {
    detection: Detection;
    currentTarget: HTMLImageElement | HTMLVideoElement | HTMLCanvasElement;
    blobImg: Blob;
    confidence: number;
    timestamp: number;
}
export interface FaceDetectionConfig {
    minDetectionConfidence?: number;
    maxNumFaces?: number;
    modelComplexity?: number;
    throttleMs?: number;
    enableLandmarks?: boolean;
    useGPU?: boolean;
}
export declare class FaceapiService {
    private faceDetector;
    private landmarksDetector;
    private isInitialized;
    private isInitializing;
    private lastDetectionTime;
    private lastDetectionResult;
    private detectionQueue;
    private performanceStats;
    private config;
    constructor(config?: FaceDetectionConfig);
    initialize(): Promise<this>;
    get minDetectionConfidence(): number;
    get maxNumFaces(): number;
    get throttleMs(): number;
    updateConfig(newConfig: Partial<FaceDetectionConfig>): void;
    initFaceLandmarkerDetector(): Promise<void>;
    initializefaceDetector(minDetectionConfidence: number): Promise<void>;
    updateDetectionConfidence(newConfidence: number): void;
    detectFace(el: HTMLVideoElement, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg | null>;
    private isVideoReady;
    private performDetection;
    detectFaceThrottled(el: HTMLVideoElement, timeStamp: DOMHighResTimeStamp, throttleMs?: number): Promise<DetectionImg | null>;
    detectFaceOptimized(el: HTMLVideoElement, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg | null>;
    getDetectorImgFromDetection(el: any, detection: Detection, timeStamp: DOMHighResTimeStamp): Promise<DetectionImg>;
    getFaceLandmarksFromBlob(blob: Blob): Promise<FaceLandmarkerResult>;
    checkInitialized(): void;
    dispose(): void;
    private updatePerformanceStats;
    getPerformanceStats(): {
        detections: number;
        avgDetectionTime: number;
        lastFrameTime: number;
        fps: number;
    };
    resetPerformanceStats(): void;
    isReady(): boolean;
    getConfig(): FaceDetectionConfig;
}
export declare const faceapiService: FaceapiService;
