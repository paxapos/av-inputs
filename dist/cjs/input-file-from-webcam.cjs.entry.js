'use strict';

var index = require('./index-zg9izv8n.js');
var camera_service = require('./camera.service-BQZZ7IZj.js');

class WebCamera {
    async initCamera(parentElement, direction, drawImageCb = null) {
        this.resetCamera();
        if (!this.elVideo) {
            this.elVideo = camera_service.createVideo();
        }
        if (!this.canvas) {
            this.canvas = camera_service.createCanvas(parentElement);
            parentElement.appendChild(this.canvas);
        }
        camera_service.initWebcamToVideo(this.elVideo, direction);
        camera_service.renderToCanvas(this.canvas, this.elVideo, drawImageCb);
        return this.canvas;
    }
    resetCamera() {
        var _a, _b;
        if (this.stream)
            (_b = (_a = this.stream) === null || _a === void 0 ? void 0 : _a.getVideoTracks()) === null || _b === void 0 ? void 0 : _b.forEach(track => {
                var _a;
                track === null || track === void 0 ? void 0 : track.stop();
                (_a = this.stream) === null || _a === void 0 ? void 0 : _a.removeTrack(track);
            });
        if (this.elVideo)
            this.elVideo.srcObject = null;
    }
    async takePicture(quality = 0.85) {
        return await camera_service.takePicture(this.canvas, quality);
    }
}
const camera = new WebCamera();

const inputFileFromWebcamCss = ":host{display:inline-block;position:relative;width:460px;height:460px;border-radius:12px;overflow:hidden;box-shadow:0 8px 32px rgba(0, 0, 0, 0.15);border:2px solid #e0e0e0;background:#f5f5f5;transition:all 0.3s ease}:host(.camera-ready){border-color:#4CAF50;box-shadow:0 8px 32px rgba(76, 175, 80, 0.2)}:host(.camera-error){border-color:#f44336;box-shadow:0 8px 32px rgba(244, 67, 54, 0.2)}:host(.camera-loading){border-color:#2196F3;box-shadow:0 8px 32px rgba(33, 150, 243, 0.2)}:host(.flipped) canvas{transform:scaleX(-1)}video{display:none}canvas{width:100%;height:100%;object-fit:cover;transition:transform 0.3s ease}.camera-state{display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:100%;padding:20px;text-align:center;box-sizing:border-box}.camera-state.loading{background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);color:white}.camera-state.error{background:linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);color:white}.camera-state.inactive{background:linear-gradient(135deg, #a8edea 0%, #fed6e3 100%);color:#333}.spinner{width:40px;height:40px;border:4px solid rgba(255, 255, 255, 0.3);border-top:4px solid white;border-radius:50%;animation:spin 1s linear infinite;margin-bottom:16px}@keyframes spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}.error-icon,.inactive-icon{font-size:48px;margin-bottom:16px}.camera-state p{margin:0 0 16px 0;font-size:16px;font-weight:500;line-height:1.4}.error-message{max-width:300px}.retry-button,.start-button{padding:12px 24px;border:none;border-radius:8px;background:rgba(255, 255, 255, 0.2);color:inherit;font-size:14px;font-weight:600;cursor:pointer;transition:all 0.3s ease;backdrop-filter:blur(10px)}.retry-button:hover,.start-button:hover{background:rgba(255, 255, 255, 0.3);transform:translateY(-2px)}.start-button{background:rgba(0, 0, 0, 0.1)}.start-button:hover{background:rgba(0, 0, 0, 0.2)}.camera-controls{position:absolute;bottom:16px;left:50%;transform:translateX(-50%);display:flex;gap:12px;z-index:10}.control-button{width:56px;height:56px;border:none;border-radius:50%;background:rgba(0, 0, 0, 0.7);color:white;font-size:24px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all 0.3s ease;backdrop-filter:blur(10px)}.control-button:hover{background:rgba(0, 0, 0, 0.9);transform:scale(1.1)}.control-button:active{transform:scale(0.95)}.capture-button{width:72px;height:72px;background:rgba(255, 255, 255, 0.9);color:#333;font-size:28px}.capture-button:hover{background:white}.control-button:disabled{opacity:0.6;cursor:not-allowed;transform:none}.control-button:disabled:hover{transform:none;background:rgba(0, 0, 0, 0.7)}.flash-effect{position:absolute;top:0;left:0;width:100%;height:100%;background:white;opacity:0;transition:opacity 0.2s ease;pointer-events:none;z-index:5}@media (max-width: 600px){:host{width:100%;height:auto;aspect-ratio:1;max-width:400px}.camera-controls{bottom:12px}.control-button{width:48px;height:48px;font-size:20px}.capture-button{width:64px;height:64px;font-size:24px}.camera-state p{font-size:14px}.error-icon,.inactive-icon{font-size:36px}}@media (prefers-contrast: high){:host{border-width:3px}.control-button{border:2px solid white}}@media (prefers-reduced-motion: reduce){*{animation-duration:0.01ms !important;animation-iteration-count:1 !important;transition-duration:0.01ms !important}}";

const InputFileFromWebcam = class {
    constructor(hostRef) {
        index.registerInstance(this, hostRef);
        this.pictureTaken = index.createEvent(this, "pictureTaken", 6);
        this.facingModeChanged = index.createEvent(this, "facingModeChanged", 6);
        this.cameraStarted = index.createEvent(this, "cameraStarted", 6);
        this.cameraStopped = index.createEvent(this, "cameraStopped", 6);
        this.cameraError = index.createEvent(this, "cameraError", 6);
        this.cameraState = { status: 'inactive' };
        this.isFlipped = false;
        /**
         * Width of the video element
         */
        this.width = 460;
        /**
         * height of the video element
         */
        this.height = 460;
        /**
         * FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value
         */
        this.facingMode = camera_service.CameraDirection.Front;
        /**
         * Show camera controls (flip, capture button, etc)
         */
        this.showControls = true;
        /**
         * Auto-start camera when component loads
         */
        this.autoStart = true;
        /**
         * Image quality for captured photos (0.1 to 1.0)
         */
        this.imageQuality = 0.85;
        /**
         * Enable flash effect when taking picture
         */
        this.flashEffect = true;
        /**
         * Capture button text
         */
        this.captureButtonText = '📸';
        /**
         * Flip camera button text
         */
        this.flipButtonText = '🔄';
        /**
         * you can pass a function and override the canvas.drawImage function so you
         * can change the image adding filters or any kind of magin in your image
         *
         * you just need to crear a function with all canvas.-drawImage arguments
         *
         * here you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height
         */
        this.drawImageCb = null;
    }
    /**
     * Start the camera
     */
    async startCamera() {
        try {
            this.cameraState = { status: 'loading' };
            await camera.initCamera(this.el, this.facingMode, this.drawImageCb);
            this.cameraState = { status: 'ready' };
            this.cameraStarted.emit();
        }
        catch (error) {
            const webcamError = {
                type: this.getErrorType(error),
                message: error.message || 'Unknown camera error'
            };
            this.cameraState = { status: 'error', error: webcamError };
            this.cameraError.emit(webcamError);
            throw error;
        }
    }
    /**
     * Stop the camera
     */
    async stopCamera() {
        camera.resetCamera();
        this.cameraState = { status: 'inactive' };
        this.cameraStopped.emit();
    }
    /**
     * Take a picture
     * @returns a blob with the image
     */
    async takePic() {
        try {
            this.cameraState = Object.assign(Object.assign({}, this.cameraState), { status: 'capturing' });
            if (this.flashEffect) {
                this.showFlashEffect();
            }
            const pic = await camera.takePicture(this.imageQuality);
            this.cameraState = Object.assign(Object.assign({}, this.cameraState), { status: 'ready' });
            this.pictureTaken.emit(pic);
            return pic;
        }
        catch (error) {
            this.cameraState = Object.assign(Object.assign({}, this.cameraState), { status: 'ready' });
            throw error;
        }
    }
    /**
     * Reset camera
     */
    async resetCamera() {
        await this.stopCamera();
        if (this.autoStart) {
            await this.startCamera();
        }
    }
    /**
     * Toogle webcam, for example in mobile show front or back camera
     */
    async toggleCamera() {
        await this.__toogleFacingMode();
    }
    onClickHandler() {
        if (this.cameraState.status === 'ready') {
            this.takePic();
        }
    }
    async onFacingModeChange() {
        if (this.cameraState.status === 'ready') {
            await this.resetCamera();
        }
    }
    /**
     * Get error type from error object
     */
    getErrorType(error) {
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
    showFlashEffect() {
        var _a;
        const flashEl = (_a = this.el.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('.flash-effect');
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
    async __toogleFacingMode() {
        const newFacingMode = (this.facingMode !== camera_service.CameraDirection.Front) ? camera_service.CameraDirection.Front : camera_service.CameraDirection.Rear;
        this.facingMode = newFacingMode;
        this.facingModeChanged.emit(this.facingMode);
    }
    /**
     * Handle capture button click
     */
    async handleCaptureClick() {
        if (this.cameraState.status === 'ready') {
            await this.takePic();
        }
    }
    /**
     * Handle flip button click
     */
    async handleFlipClick() {
        await this.__toogleFacingMode();
    }
    /**
     * Handle retry button click
     */
    async handleRetryClick() {
        await this.startCamera();
    }
    componentWillLoad() {
        this.isFlipped = this.facingMode === camera_service.CameraDirection.Front;
    }
    async componentDidLoad() {
        if (this.autoStart) {
            await this.startCamera();
        }
    }
    async disconnectedCallback() {
        await this.stopCamera();
    }
    /**
     * Render loading state
     */
    renderLoadingState() {
        return (index.h("div", { class: "camera-state loading" }, index.h("div", { class: "spinner" }), index.h("p", null, "Iniciando c\u00E1mara...")));
    }
    /**
     * Render error state
     */
    renderErrorState() {
        const { error } = this.cameraState;
        let errorMessage = 'Error desconocido';
        let actionButton = null;
        switch (error === null || error === void 0 ? void 0 : error.type) {
            case 'permission':
                errorMessage = 'Permiso de cámara denegado. Por favor, permite el acceso a la cámara.';
                break;
            case 'device':
                errorMessage = 'No se encontró ninguna cámara disponible.';
                break;
            case 'stream':
                errorMessage = 'Error al acceder a la cámara. Puede estar siendo usada por otra aplicación.';
                actionButton = (index.h("button", { class: "retry-button", onClick: () => this.handleRetryClick() }, "Reintentar"));
                break;
            default:
                errorMessage = (error === null || error === void 0 ? void 0 : error.message) || 'Error desconocido al inicializar la cámara.';
                actionButton = (index.h("button", { class: "retry-button", onClick: () => this.handleRetryClick() }, "Reintentar"));
        }
        return (index.h("div", { class: "camera-state error" }, index.h("div", { class: "error-icon" }, "\u26A0\uFE0F"), index.h("p", { class: "error-message" }, errorMessage), actionButton));
    }
    /**
     * Render inactive state
     */
    renderInactiveState() {
        return (index.h("div", { class: "camera-state inactive" }, index.h("div", { class: "inactive-icon" }, "\uD83D\uDCF9"), index.h("p", null, "C\u00E1mara inactiva"), index.h("button", { class: "start-button", onClick: () => this.startCamera() }, "Iniciar C\u00E1mara")));
    }
    /**
     * Render camera controls
     */
    renderControls() {
        if (!this.showControls || (this.cameraState.status !== 'ready' && this.cameraState.status !== 'capturing')) {
            return null;
        }
        const isCapturing = this.cameraState.status === 'capturing';
        return (index.h("div", { class: "camera-controls" }, index.h("button", { class: "control-button flip-button", onClick: () => this.handleFlipClick(), title: "Cambiar c\u00E1mara", disabled: isCapturing }, this.flipButtonText), index.h("button", { class: "control-button capture-button", onClick: () => this.handleCaptureClick(), title: "Tomar foto", disabled: isCapturing }, isCapturing ? '⏳' : this.captureButtonText)));
    }
    render() {
        const hostClasses = {
            'camera-ready': this.cameraState.status === 'ready',
            'camera-loading': this.cameraState.status === 'loading',
            'camera-error': this.cameraState.status === 'error',
            'camera-inactive': this.cameraState.status === 'inactive',
            'camera-capturing': this.cameraState.status === 'capturing',
            'flipped': this.isFlipped && this.facingMode === camera_service.CameraDirection.Front
        };
        return (index.h(index.Host, { key: '811df66d89d2eb12641a6b72c1ba9c06e8c669f1', style: { height: this.height + "px", width: this.width + "px" }, class: hostClasses }, index.h("slot", { key: '5b74f6057d3f9e05506dad0a96bd998fc2e0b9a1', name: 'before' }), this.cameraState.status === 'loading' && this.renderLoadingState(), this.cameraState.status === 'error' && this.renderErrorState(), this.cameraState.status === 'inactive' && this.renderInactiveState(), index.h("slot", { key: '4ff12bc7611492b3fd271275c3484181139b5018' }), this.flashEffect && index.h("div", { key: '90ff5173bbbfb8612b32a9bc433de37467a3dd49', class: "flash-effect" }), this.renderControls(), index.h("slot", { key: '00c3a5edc5c1744e22c5eddb3ecfecaa972703f1', name: 'after' })));
    }
    get el() { return index.getElement(this); }
    static get watchers() { return {
        "facingMode": ["onFacingModeChange"]
    }; }
};
InputFileFromWebcam.style = inputFileFromWebcamCss;

exports.input_file_from_webcam = InputFileFromWebcam;
//# sourceMappingURL=input-file-from-webcam.entry.cjs.js.map

//# sourceMappingURL=input-file-from-webcam.cjs.entry.js.map