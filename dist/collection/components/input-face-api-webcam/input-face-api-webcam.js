import { Host, h } from "@stencil/core";
import { faceapiService } from "../../utils/facepi.service";
import { CameraDirection, createCanvas, createVideo, initWebcamToVideo, renderToCanvas } from "../../utils/camera.service";
import { pxTimer } from "../../utils/utils";
import { getBestMatch } from "./distance.worker";
export class InputFaceApiWebcam {
    constructor() {
        this.loaded = false;
        this.cameraState = 'inactive';
        this.currentError = null;
        this.detectedFacesCount = 0;
        this.isRecognizing = false;
        // Enhanced Properties
        /**
         * Enable or disable face detection
         */
        this.enableDetection = true;
        /**
         * Show control buttons for starting/stopping detection
         */
        this.showControls = true;
        /**
         * Auto-start detection when component loads
         */
        this.autoStart = true;
        /**
         * Show bounding boxes around detected faces
         */
        this.showBoundingBoxes = true;
        /**
         * Show face landmarks on detected faces
         */
        this.showLandmarks = false;
        /**
         * Text for the start detection button
         */
        this.startButtonText = 'Start Detection';
        /**
         * Text for the stop detection button
         */
        this.stopButtonText = 'Stop Detection';
        /**
         * Text for the flip camera button
         */
        this.flipButtonText = 'Flip Camera';
        /**
         * Width of the video element
         */
        this.width = 460;
        /**
         * Height of the video element
         */
        this.height = 460;
        /**
         * Score threshold to detect a face
         */
        this.scoreThreshold = 0.65;
        /**
         * Detection timer interval in milliseconds
         */
        this.detectionTimer = 1500;
        /**
         * Facing mode options following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
         */
        this.facingMode = CameraDirection.Front;
        /**
         * Enable automatic photo capture when face is detected
         */
        this.autoCapture = true;
        /**
         * Minimum confidence score for face detection to trigger photo capture
         */
        this.captureThreshold = 0.8;
        /**
         * Delay between automatic photo captures in milliseconds
         */
        this.captureDelay = 3000;
        // Private properties
        this.lastVideoTime = -1;
        this.photoTaken = false;
    }
    detectionResultChangedHandler(newValue, oldValue) {
        var _a, _b;
        if (newValue === null || newValue === void 0 ? void 0 : newValue.blobImg) {
            this.detectedFacesCount = newValue.detection ? 1 : 0;
            this.faceDetected.emit(newValue);
            // Auto capture photo if enabled and face confidence is above threshold
            if (this.autoCapture && newValue.detection &&
                ((_b = (_a = newValue.detection.categories) === null || _a === void 0 ? void 0 : _a[0]) === null || _b === void 0 ? void 0 : _b.score) >= this.captureThreshold) {
                this.capturePhoto();
            }
        }
        else {
            if (oldValue) {
                this.detectedFacesCount = 0;
                this.faceStopDetection.emit();
            }
        }
    }
    // Enhanced Methods
    /**
     * Stop face detection
     */
    async stopDetection() {
        this.enableDetection = false;
        this.cameraState = 'ready';
        this.detectionStopped.emit();
    }
    /**
     * Start face detection
     */
    async startDetection() {
        if (this.cameraState === 'ready' || this.cameraState === 'inactive') {
            this.enableDetection = true;
            this.cameraState = 'detecting';
            this.detectionStarted.emit();
        }
    }
    /**
     * Toggle camera between front and back
     */
    async toggleCamera() {
        try {
            this.cameraState = 'loading';
            this.facingMode = this.facingMode === CameraDirection.Front ? CameraDirection.Rear : CameraDirection.Front;
            // Stop current video stream
            if (this.video.srcObject) {
                const stream = this.video.srcObject;
                stream.getTracks().forEach(track => track.stop());
            }
            // Reinitialize with new facing mode
            await initWebcamToVideo(this.video, this.facingMode);
            this.facingModeChanged.emit(this.facingMode);
            this.cameraState = this.enableDetection ? 'detecting' : 'ready';
        }
        catch (error) {
            this.handleError('CAMERA_ACCESS_DENIED', 'Failed to toggle camera', error);
        }
    }
    /**
     * Initialize camera and face detection
     */
    async initializeCamera() {
        try {
            this.cameraState = 'loading';
            this.currentError = null;
            await this.componentWillLoad();
            if (this.autoStart && this.enableDetection) {
                this.cameraState = 'detecting';
            }
            else {
                this.cameraState = 'ready';
            }
        }
        catch (error) {
            this.handleError('INITIALIZATION_ERROR', 'Failed to initialize camera', error);
        }
    }
    /**
     * Giving a blob image, get the face landmarks
     * @returns face landmarks
     */
    async getBlobImageDescriptors(blob) {
        return await faceapiService.getFaceLandmarksFromBlob(blob);
    }
    /**
     * Giving current face in video canvas, get the face landmarks
     * @returns face landmarks
     */
    async getFaceLandMarks() {
        if (this.detectionResult && this.detectionResult.blobImg) {
            return await faceapiService.getFaceLandmarksFromBlob(this.detectionResult.blobImg);
        }
        else {
            return null;
        }
    }
    /**
     * Predicts best face match, uses worker to calculate distance between the given blob and the trained model
     * passed in trainedModel prop
     * @param blob
     * @returns
     */
    async predictBestMatch(blob) {
        console.info("tyrained model es", this.trainedModel);
        if (!this.trainedModel) {
            return null;
        }
        let lm;
        if (!blob) {
            lm = await faceapiService.getFaceLandmarksFromBlob(blob);
        }
        else {
            lm = await this.getFaceLandMarks();
        }
        // for each trained model of this.trainedModels get minimum distance
        const best = await getBestMatch(this.trainedModel, lm.faceLandmarks[0]);
        return best;
    }
    /**
     * Diagnostic method to check detection status
     */
    async getDiagnosticInfo() {
        var _a, _b, _c, _d, _e;
        return {
            // Component state
            cameraState: this.cameraState,
            enableDetection: this.enableDetection,
            loaded: this.loaded,
            detectedFacesCount: this.detectedFacesCount,
            // Video element status
            videoElement: {
                readyState: (_a = this.video) === null || _a === void 0 ? void 0 : _a.readyState,
                videoWidth: (_b = this.video) === null || _b === void 0 ? void 0 : _b.videoWidth,
                videoHeight: (_c = this.video) === null || _c === void 0 ? void 0 : _c.videoHeight,
                currentTime: (_d = this.video) === null || _d === void 0 ? void 0 : _d.currentTime,
                paused: (_e = this.video) === null || _e === void 0 ? void 0 : _e.paused
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
    // Helper Methods
    handleError(type, message, originalError) {
        const error = {
            type,
            message,
            originalError
        };
        this.currentError = error;
        this.cameraState = 'error';
        this.cameraError.emit(error);
        console.error('Face API Webcam Error:', error);
    }
    async capturePhoto() {
        try {
            if (this.photoTaken)
                return; // Prevent multiple captures
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
        }
        catch (error) {
            console.error('Error capturing photo:', error);
            this.photoTaken = false;
        }
    }
    async componentWillLoad() {
        try {
            this.cameraState = 'loading';
            this.currentError = null;
            this.video = createVideo();
            this.canvas = createCanvas(this.el);
            this.canvas.width = this.width;
            this.canvas.height = this.height;
            this.el.appendChild(this.canvas);
            await faceapiService.initialize();
            console.info("el faceapi es", faceapiService);
            const stream = await initWebcamToVideo(this.video, this.facingMode);
            this.cameraStarted.emit(stream);
            // Wait for video to be ready before starting render loop
            await this.waitForVideoReady();
            renderToCanvas(this.canvas, this.video);
            this.loaded = true;
            if (this.autoStart && this.enableDetection) {
                this.cameraState = 'detecting';
                this.detectionStarted.emit();
            }
            else {
                this.cameraState = 'ready';
            }
            // Start render loop only after video is ready
            requestAnimationFrame(() => {
                this.webcamRender();
            });
        }
        catch (error) {
            this.handleError('INITIALIZATION_ERROR', 'Failed to initialize camera and face detection', error);
        }
    }
    async webcamRender() {
        var _a, _b, _c, _d;
        const startTimeMs = performance.now();
        // Verify video is ready for detection
        if (!this.isVideoElementReady()) {
            console.warn('⚠️ Video element not ready in webcamRender:', {
                readyState: (_a = this.video) === null || _a === void 0 ? void 0 : _a.readyState,
                videoWidth: (_b = this.video) === null || _b === void 0 ? void 0 : _b.videoWidth,
                videoHeight: (_c = this.video) === null || _c === void 0 ? void 0 : _c.videoHeight,
                currentTime: (_d = this.video) === null || _d === void 0 ? void 0 : _d.currentTime
            });
            await pxTimer(this.detectionTimer);
            requestAnimationFrame(() => {
                this.webcamRender();
            });
            return;
        }
        // Detect faces using detectForVideo
        if (this.video.currentTime !== this.lastVideoTime) {
            this.lastVideoTime = this.video.currentTime;
            if (this.enableDetection) {
                try {
                    // get context of canvas and create paning and zoooming to center
                    this.detectionResult = await faceapiService.detectFaceOptimized(this.video, startTimeMs);
                    // Add debugging
                    if (this.detectionResult) {
                        console.log('✅ Face detected in component:', {
                            confidence: this.detectionResult.confidence,
                            timestamp: this.detectionResult.timestamp
                        });
                    }
                    else {
                        console.log('❌ No face detected in component');
                    }
                }
                catch (error) {
                    console.error('❌ Error in webcamRender detection:', error);
                }
            }
        }
        await pxTimer(this.detectionTimer);
        requestAnimationFrame(() => {
            this.webcamRender();
        });
    }
    // Helper method to check if video element is ready
    isVideoElementReady() {
        return (this.video &&
            this.video.readyState >= 2 && // HAVE_CURRENT_DATA or higher
            this.video.videoWidth > 0 &&
            this.video.videoHeight > 0 &&
            !this.video.paused &&
            !this.video.ended &&
            this.video.currentTime > 0);
    }
    // Wait for video to be properly loaded and ready for processing
    async waitForVideoReady(maxWaitMs = 5000) {
        const startTime = Date.now();
        const checkInterval = 50; // Check every 50ms
        return new Promise((resolve, reject) => {
            const checkVideo = () => {
                var _a, _b, _c, _d, _e, _f, _g, _h;
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
                        readyState: (_a = this.video) === null || _a === void 0 ? void 0 : _a.readyState,
                        videoWidth: (_b = this.video) === null || _b === void 0 ? void 0 : _b.videoWidth,
                        videoHeight: (_c = this.video) === null || _c === void 0 ? void 0 : _c.videoHeight,
                        currentTime: (_d = this.video) === null || _d === void 0 ? void 0 : _d.currentTime
                    });
                    reject(error);
                    return;
                }
                console.log('⏳ Waiting for video to be ready...', {
                    elapsed: elapsed + 'ms',
                    readyState: (_e = this.video) === null || _e === void 0 ? void 0 : _e.readyState,
                    videoWidth: (_f = this.video) === null || _f === void 0 ? void 0 : _f.videoWidth,
                    videoHeight: (_g = this.video) === null || _g === void 0 ? void 0 : _g.videoHeight,
                    currentTime: (_h = this.video) === null || _h === void 0 ? void 0 : _h.currentTime
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
        ctx.drawImage(this.video, left, top, imgSize, imgSize, 0, 0, this.canvas.width, this.canvas.height);
    }
    render() {
        const hostStyle = {
            height: this.height + "px",
            width: this.width + "px",
        };
        const renderCameraState = () => {
            var _a;
            if (this.cameraState === 'inactive') {
                return (h("div", { class: "camera-state" }, h("div", { class: "state-icon inactive-icon" }, "\uD83D\uDCF7"), h("h3", null, "Camera Inactive"), h("p", null, "Click start to begin face detection")));
            }
            if (this.cameraState === 'loading') {
                return (h("div", { class: "camera-state" }, h("div", { class: "loading-spinner" }), h("h3", null, "Starting Camera"), h("p", null, "Please allow camera access when prompted")));
            }
            if (this.cameraState === 'error') {
                return (h("div", { class: "camera-state" }, h("div", { class: "state-icon error-icon" }, "\u26A0\uFE0F"), h("h3", null, "Camera Error"), h("p", null, ((_a = this.currentError) === null || _a === void 0 ? void 0 : _a.message) || 'Unable to access camera')));
            }
            return null;
        };
        const renderIndicators = () => {
            if (this.cameraState !== 'detecting' && this.cameraState !== 'ready')
                return null;
            return [
                // Auto-capture indicator
                this.autoCapture && (h("div", { class: "auto-capture-indicator" }, "AUTO CAPTURE")),
                // Face detection indicator
                this.cameraState === 'detecting' && (h("div", { class: `face-indicator ${this.detectedFacesCount > 0 ? 'detected' : 'not-detected'}` }, this.detectedFacesCount > 0 ? `${this.detectedFacesCount} Face${this.detectedFacesCount !== 1 ? 's' : ''} Detected` : 'No Face Detected')),
                // Error message
                this.currentError && (h("div", { class: "error-message" }, this.currentError.message))
            ];
        };
        const renderControls = () => {
            if (!this.showControls)
                return null;
            const isLoading = this.cameraState === 'loading';
            return (h("div", { class: "camera-controls" }, this.cameraState === 'inactive' || this.cameraState === 'ready' ? (h("button", { class: "control-button start-button", onClick: () => this.startDetection(), disabled: isLoading, title: this.startButtonText }, "\u25B6\uFE0F")) : this.cameraState === 'detecting' ? (h("button", { class: "control-button stop-button", onClick: () => this.stopDetection(), title: this.stopButtonText }, "\u23F9\uFE0F")) : null, (this.cameraState === 'ready' || this.cameraState === 'detecting') && (h("button", { class: "control-button flip-button", onClick: () => this.toggleCamera(), disabled: isLoading, title: this.flipButtonText }, "\uD83D\uDD04"))));
        };
        return (h(Host, { style: hostStyle }, h("slot", { name: 'before' }), renderCameraState(), renderIndicators(), renderControls(), h("slot", null), h("slot", { name: 'after' })));
    }
    static get is() { return "input-face-api-webcam"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["input-face-api-webcam.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["input-face-api-webcam.css"]
        };
    }
    static get properties() {
        return {
            "enableDetection": {
                "type": "boolean",
                "attribute": "enable-detection",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Enable or disable face detection"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "true"
            },
            "showControls": {
                "type": "boolean",
                "attribute": "show-controls",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Show control buttons for starting/stopping detection"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "autoStart": {
                "type": "boolean",
                "attribute": "auto-start",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Auto-start detection when component loads"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "showBoundingBoxes": {
                "type": "boolean",
                "attribute": "show-bounding-boxes",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Show bounding boxes around detected faces"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "showLandmarks": {
                "type": "boolean",
                "attribute": "show-landmarks",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Show face landmarks on detected faces"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "false"
            },
            "startButtonText": {
                "type": "string",
                "attribute": "start-button-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Text for the start detection button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Start Detection'"
            },
            "stopButtonText": {
                "type": "string",
                "attribute": "stop-button-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Text for the stop detection button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Stop Detection'"
            },
            "flipButtonText": {
                "type": "string",
                "attribute": "flip-button-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Text for the flip camera button"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'Flip Camera'"
            },
            "trainedModel": {
                "type": "unknown",
                "attribute": "trained-model",
                "mutable": false,
                "complexType": {
                    "original": "LabeledDescriptorsArray",
                    "resolved": "LabeledDescriptors[]",
                    "references": {
                        "LabeledDescriptorsArray": {
                            "location": "import",
                            "path": "./TrainedModel",
                            "id": "src/components/input-face-api-webcam/TrainedModel.d.ts::LabeledDescriptorsArray"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Trained models to use for recognition and best match"
                },
                "getter": false,
                "setter": false
            },
            "width": {
                "type": "number",
                "attribute": "width",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Width of the video element"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "460"
            },
            "height": {
                "type": "number",
                "attribute": "height",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Height of the video element"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "460"
            },
            "scoreThreshold": {
                "type": "number",
                "attribute": "score-threshold",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Score threshold to detect a face"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "0.65"
            },
            "detectionTimer": {
                "type": "number",
                "attribute": "detection-timer",
                "mutable": true,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Detection timer interval in milliseconds"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "1500"
            },
            "facingMode": {
                "type": "string",
                "attribute": "facing-mode",
                "mutable": true,
                "complexType": {
                    "original": "CameraDirection",
                    "resolved": "CameraDirection.Front | CameraDirection.Rear",
                    "references": {
                        "CameraDirection": {
                            "location": "import",
                            "path": "../../utils/camera.service",
                            "id": "src/utils/camera.service.ts::CameraDirection"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Facing mode options following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "CameraDirection.Front"
            },
            "autoCapture": {
                "type": "boolean",
                "attribute": "auto-capture",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Enable automatic photo capture when face is detected"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "captureThreshold": {
                "type": "number",
                "attribute": "capture-threshold",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Minimum confidence score for face detection to trigger photo capture"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0.8"
            },
            "captureDelay": {
                "type": "number",
                "attribute": "capture-delay",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Delay between automatic photo captures in milliseconds"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "3000"
            }
        };
    }
    static get states() {
        return {
            "detectionResult": {},
            "loaded": {},
            "cameraState": {},
            "currentError": {},
            "detectedFacesCount": {},
            "isRecognizing": {}
        };
    }
    static get events() {
        return [{
                "method": "faceDetected",
                "name": "faceDetected",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when a face is detected in video stream"
                },
                "complexType": {
                    "original": "DetectionImg",
                    "resolved": "DetectionImg",
                    "references": {
                        "DetectionImg": {
                            "location": "import",
                            "path": "../../utils/facepi.service",
                            "id": "src/utils/facepi.service.ts::DetectionImg"
                        }
                    }
                }
            }, {
                "method": "faceStopDetection",
                "name": "faceStopDetection",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when face detection was stopped"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "detectionStarted",
                "name": "detectionStarted",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when detection starts"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "detectionStopped",
                "name": "detectionStopped",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when detection stops"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "cameraStarted",
                "name": "cameraStarted",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when camera starts successfully"
                },
                "complexType": {
                    "original": "MediaStream",
                    "resolved": "MediaStream",
                    "references": {
                        "MediaStream": {
                            "location": "global",
                            "id": "global::MediaStream"
                        }
                    }
                }
            }, {
                "method": "cameraStopped",
                "name": "cameraStopped",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when camera stops"
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "cameraError",
                "name": "cameraError",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when camera encounters an error"
                },
                "complexType": {
                    "original": "FaceDetectionError",
                    "resolved": "FaceDetectionError",
                    "references": {
                        "FaceDetectionError": {
                            "location": "local",
                            "path": "/home/alevilar/Works/av-inputs/src/components/input-face-api-webcam/input-face-api-webcam.tsx",
                            "id": "src/components/input-face-api-webcam/input-face-api-webcam.tsx::FaceDetectionError"
                        }
                    }
                }
            }, {
                "method": "facingModeChanged",
                "name": "facingModeChanged",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when facing mode changes"
                },
                "complexType": {
                    "original": "CameraDirection",
                    "resolved": "CameraDirection.Front | CameraDirection.Rear",
                    "references": {
                        "CameraDirection": {
                            "location": "import",
                            "path": "../../utils/camera.service",
                            "id": "src/utils/camera.service.ts::CameraDirection"
                        }
                    }
                }
            }, {
                "method": "photoCapture",
                "name": "photoCapture",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when a photo is automatically captured"
                },
                "complexType": {
                    "original": "Blob",
                    "resolved": "Blob",
                    "references": {
                        "Blob": {
                            "location": "global",
                            "id": "global::Blob"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "stopDetection": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Stop face detection",
                    "tags": []
                }
            },
            "startDetection": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Start face detection",
                    "tags": []
                }
            },
            "toggleCamera": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "MediaStream": {
                            "location": "global",
                            "id": "global::MediaStream"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Toggle camera between front and back",
                    "tags": []
                }
            },
            "initializeCamera": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Initialize camera and face detection",
                    "tags": []
                }
            },
            "getBlobImageDescriptors": {
                "complexType": {
                    "signature": "(blob: Blob) => Promise<FaceLandmarkerResult>",
                    "parameters": [{
                            "name": "blob",
                            "type": "Blob",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "FaceLandmarkerResult": {
                            "location": "import",
                            "path": "@mediapipe/tasks-vision",
                            "id": "node_modules::FaceLandmarkerResult"
                        },
                        "Blob": {
                            "location": "global",
                            "id": "global::Blob"
                        }
                    },
                    "return": "Promise<FaceLandmarkerResult>"
                },
                "docs": {
                    "text": "Giving a blob image, get the face landmarks",
                    "tags": [{
                            "name": "returns",
                            "text": "face landmarks"
                        }]
                }
            },
            "getFaceLandMarks": {
                "complexType": {
                    "signature": "() => Promise<FaceLandmarkerResult>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "FaceLandmarkerResult": {
                            "location": "import",
                            "path": "@mediapipe/tasks-vision",
                            "id": "node_modules::FaceLandmarkerResult"
                        }
                    },
                    "return": "Promise<FaceLandmarkerResult>"
                },
                "docs": {
                    "text": "Giving current face in video canvas, get the face landmarks",
                    "tags": [{
                            "name": "returns",
                            "text": "face landmarks"
                        }]
                }
            },
            "predictBestMatch": {
                "complexType": {
                    "signature": "(blob?: Blob) => Promise<any>",
                    "parameters": [{
                            "name": "blob",
                            "type": "Blob",
                            "docs": ""
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "Blob": {
                            "location": "global",
                            "id": "global::Blob"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "Predicts best face match, uses worker to calculate distance between the given blob and the trained model\npassed in trainedModel prop",
                    "tags": [{
                            "name": "param",
                            "text": "blob"
                        }, {
                            "name": "returns",
                            "text": undefined
                        }]
                }
            },
            "getDiagnosticInfo": {
                "complexType": {
                    "signature": "() => Promise<any>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<any>"
                },
                "docs": {
                    "text": "Diagnostic method to check detection status",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "detectionResult",
                "methodName": "detectionResultChangedHandler"
            }];
    }
}
//# sourceMappingURL=input-face-api-webcam.js.map
