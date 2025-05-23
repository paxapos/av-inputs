import { Host, h } from "@stencil/core";
import { camera } from "../../utils/camera";
import { CameraDirection } from "../../utils/camera.service";
export class InputFileFromWebcam {
    constructor() {
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
        this.facingMode = CameraDirection.Front;
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
        const newFacingMode = (this.facingMode !== CameraDirection.Front) ? CameraDirection.Front : CameraDirection.Rear;
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
        this.isFlipped = this.facingMode === CameraDirection.Front;
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
        return (h("div", { class: "camera-state loading" }, h("div", { class: "spinner" }), h("p", null, "Iniciando c\u00E1mara...")));
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
                actionButton = (h("button", { class: "retry-button", onClick: () => this.handleRetryClick() }, "Reintentar"));
                break;
            default:
                errorMessage = (error === null || error === void 0 ? void 0 : error.message) || 'Error desconocido al inicializar la cámara.';
                actionButton = (h("button", { class: "retry-button", onClick: () => this.handleRetryClick() }, "Reintentar"));
        }
        return (h("div", { class: "camera-state error" }, h("div", { class: "error-icon" }, "\u26A0\uFE0F"), h("p", { class: "error-message" }, errorMessage), actionButton));
    }
    /**
     * Render inactive state
     */
    renderInactiveState() {
        return (h("div", { class: "camera-state inactive" }, h("div", { class: "inactive-icon" }, "\uD83D\uDCF9"), h("p", null, "C\u00E1mara inactiva"), h("button", { class: "start-button", onClick: () => this.startCamera() }, "Iniciar C\u00E1mara")));
    }
    /**
     * Render camera controls
     */
    renderControls() {
        if (!this.showControls || (this.cameraState.status !== 'ready' && this.cameraState.status !== 'capturing')) {
            return null;
        }
        const isCapturing = this.cameraState.status === 'capturing';
        return (h("div", { class: "camera-controls" }, h("button", { class: "control-button flip-button", onClick: () => this.handleFlipClick(), title: "Cambiar c\u00E1mara", disabled: isCapturing }, this.flipButtonText), h("button", { class: "control-button capture-button", onClick: () => this.handleCaptureClick(), title: "Tomar foto", disabled: isCapturing }, isCapturing ? '⏳' : this.captureButtonText)));
    }
    render() {
        const hostClasses = {
            'camera-ready': this.cameraState.status === 'ready',
            'camera-loading': this.cameraState.status === 'loading',
            'camera-error': this.cameraState.status === 'error',
            'camera-inactive': this.cameraState.status === 'inactive',
            'camera-capturing': this.cameraState.status === 'capturing',
            'flipped': this.isFlipped && this.facingMode === CameraDirection.Front
        };
        return (h(Host, { key: '811df66d89d2eb12641a6b72c1ba9c06e8c669f1', style: { height: this.height + "px", width: this.width + "px" }, class: hostClasses }, h("slot", { key: '5b74f6057d3f9e05506dad0a96bd998fc2e0b9a1', name: 'before' }), this.cameraState.status === 'loading' && this.renderLoadingState(), this.cameraState.status === 'error' && this.renderErrorState(), this.cameraState.status === 'inactive' && this.renderInactiveState(), h("slot", { key: '4ff12bc7611492b3fd271275c3484181139b5018' }), this.flashEffect && h("div", { key: '90ff5173bbbfb8612b32a9bc433de37467a3dd49', class: "flash-effect" }), this.renderControls(), h("slot", { key: '00c3a5edc5c1744e22c5eddb3ecfecaa972703f1', name: 'after' })));
    }
    static get is() { return "input-file-from-webcam"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["input-file-from-webcam.css"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["input-file-from-webcam.css"]
        };
    }
    static get properties() {
        return {
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
                    "text": "height of the video element"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "460"
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
                    "text": "FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value"
                },
                "getter": false,
                "setter": false,
                "reflect": true,
                "defaultValue": "CameraDirection.Front"
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Show camera controls (flip, capture button, etc)"
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Auto-start camera when component loads"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "imageQuality": {
                "type": "number",
                "attribute": "image-quality",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Image quality for captured photos (0.1 to 1.0)"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "0.85"
            },
            "flashEffect": {
                "type": "boolean",
                "attribute": "flash-effect",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Enable flash effect when taking picture"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "true"
            },
            "captureButtonText": {
                "type": "string",
                "attribute": "capture-button-text",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Capture button text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'\uD83D\uDCF8'"
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
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Flip camera button text"
                },
                "getter": false,
                "setter": false,
                "reflect": false,
                "defaultValue": "'\uD83D\uDD04'"
            },
            "drawImageCb": {
                "type": "unknown",
                "attribute": "draw-image-cb",
                "mutable": false,
                "complexType": {
                    "original": "Function",
                    "resolved": "Function",
                    "references": {
                        "Function": {
                            "location": "global",
                            "id": "global::Function"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "you can pass a function and override the canvas.drawImage function so you\ncan change the image adding filters or any kind of magin in your image\n\nyou just need to crear a function with all canvas.-drawImage arguments\n\nhere you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height"
                },
                "getter": false,
                "setter": false,
                "defaultValue": "null"
            }
        };
    }
    static get states() {
        return {
            "cameraState": {},
            "isFlipped": {}
        };
    }
    static get events() {
        return [{
                "method": "pictureTaken",
                "name": "pictureTaken",
                "bubbles": true,
                "cancelable": false,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Event emitted when the user takes a picture"
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
                    "original": "void",
                    "resolved": "void",
                    "references": {}
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
                    "original": "WebcamError",
                    "resolved": "WebcamError",
                    "references": {
                        "WebcamError": {
                            "location": "local",
                            "path": "/home/alevilar/Works/av-inputs/src/components/input-file-from-webcam/input-file-from-webcam.tsx",
                            "id": "src/components/input-file-from-webcam/input-file-from-webcam.tsx::WebcamError"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "startCamera": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "WebcamError": {
                            "location": "local",
                            "path": "/home/alevilar/Works/av-inputs/src/components/input-file-from-webcam/input-file-from-webcam.tsx",
                            "id": "src/components/input-file-from-webcam/input-file-from-webcam.tsx::WebcamError"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Start the camera",
                    "tags": []
                }
            },
            "stopCamera": {
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
                    "text": "Stop the camera",
                    "tags": []
                }
            },
            "takePic": {
                "complexType": {
                    "signature": "() => Promise<Blob>",
                    "parameters": [],
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
                    "return": "Promise<Blob>"
                },
                "docs": {
                    "text": "Take a picture",
                    "tags": [{
                            "name": "returns",
                            "text": "a blob with the image"
                        }]
                }
            },
            "resetCamera": {
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
                    "text": "Reset camera",
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
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Toogle webcam, for example in mobile show front or back camera",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "facingMode",
                "methodName": "onFacingModeChange"
            }];
    }
    static get listeners() {
        return [{
                "name": "click",
                "method": "onClickHandler",
                "target": undefined,
                "capture": false,
                "passive": false
            }];
    }
}
//# sourceMappingURL=input-file-from-webcam.js.map
