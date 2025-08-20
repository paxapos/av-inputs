import { Component, EventEmitter, Host, Event, Prop, h, Method, Element, State, Watch } from '@stencil/core';
import { v4 as uuidv4 } from 'uuid';
import { InputScanData } from '../input-scan-reader/input-scan-reader.types';
import { processText } from 'src/utils/text.handler';

// ZXing imports
import { BrowserMultiFormatReader, DecodeHintType, BarcodeFormat, NotFoundException } from '@zxing/library';

/**
 * Camera-based barcode scanner component using ZXing library
 * Optimized for cross-browser compatibility and mobile support
 * Functions as a form input element with standard input properties
 */
@Component({
  tag: 'input-barcode',
  styleUrl: 'input-barcode.css',
  shadow: false,
  formAssociated: true
})
export class InputBarcode {
  @Element() hostElement: HTMLElement;

  /**
   * Standard form input properties
   */

  /**
   * The name attribute for form submission
   */
  @Prop() name?: string;

  /**
   * The value of the input (last scanned data)
   */
  @Prop({ mutable: true }) value?: string = '';

  /**
   * Whether the input is disabled
   */
  @Prop({ reflect: true }) disabled?: boolean = false;

  /**
   * Whether the input is readonly
   */
  @Prop({ reflect: true }) readonly?: boolean = false;

  /**
   * Whether the input is required for form validation
   */
  @Prop({ reflect: true }) required?: boolean = false;

  /**
   * Placeholder text when no value is present
   */
  @Prop() placeholder?: string = 'Scan a barcode or QR code';

  /**
   * Pattern for input validation (regex)
   */
  @Prop() pattern?: string;

  /**
   * Minimum length for scanned value
   */
  @Prop() minlength?: number;

  /**
   * Maximum length for scanned value
   */
  @Prop() maxlength?: number;

  /**
   * Form validation message
   */
  @Prop() validationMessage?: string;

  /**
   * Auto-focus the scanner when component loads
   */
  @Prop() autoFocus?: boolean = false;

  /**
   * Tab order for keyboard navigation
   */
  @Prop() tabOrder?: number;

  /**
   * ARIA label for accessibility
   */
  @Prop() accessibilityLabel?: string = 'Barcode scanner input';

  /**
   * ARIA description for accessibility
   */
  @Prop() ariaDescribedby?: string;

  /**
   * Specific camera device ID to use (optional)
   */
  @Prop() cameraId?: string;

  /**
   * Width of the camera viewport
   */
  @Prop() width: string = '400px';

  /**
   * Height of the camera viewport
   */
  @Prop() height: string = '200px';

  /**
   * Supported barcode and QR code formats for scanning
   */
  @Prop() supportedFormats: BarcodeFormat[] = [
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.UPC_A,
    BarcodeFormat.UPC_E,
    BarcodeFormat.CODE_39,
    BarcodeFormat.CODE_93,
    BarcodeFormat.CODABAR,
    BarcodeFormat.ITF,
    BarcodeFormat.AZTEC,
    BarcodeFormat.DATA_MATRIX,
    BarcodeFormat.PDF_417
  ];

  /**
   * Camera facing mode: 'user' for front camera, 'environment' for back camera
   */
  @Prop() facingMode: 'user' | 'environment' = 'environment';

  /**
   * Scan interval in milliseconds
   */
  @Prop() scanInterval: number = 100;

  /**
   * Auto-start scanning when component loads
   */
  @Prop() autoStart: boolean = true;

  /**
   * Show camera selection controls
   */
  @Prop() showCameraSelector: boolean = false;

  /**
   * Enable debug mode for troubleshooting
   */
  @Prop() debug?: boolean = false;

  /**
   * Component state
   */
  @State() isScanning: boolean = false;
  @State() hasPermission: boolean = false;
  @State() errorMessage: string = '';
  @State() availableCameras: MediaDeviceInfo[] = [];
  @State() selectedCameraId: string = '';
  @State() debugInfo: string = '';

  /**
   * Private properties
   */
  private readonly uuidGeneric: string = uuidv4();
  private codeReader: BrowserMultiFormatReader;
  private videoElement: HTMLVideoElement;
  private stream: MediaStream | null = null;
  private scanTimer: NodeJS.Timeout | null = null;
  private lastScan: InputScanData | null = null;
  private isDestroyed: boolean = false;

  /**
   * Events
   */

  /**
   * Emitted when input value changes (standard form event)
   */
  @Event() inputChange: EventEmitter<Event>;

  /**
   * Emitted when input value is committed (standard form event)
   */
  @Event() valueChange: EventEmitter<Event>;

  /**
   * Emitted when component gains focus (standard form event)
   */
  @Event() focusGained: EventEmitter<FocusEvent>;

  /**
   * Emitted when component loses focus (standard form event)
   */
  @Event() focusLost: EventEmitter<FocusEvent>;

  /**
   * Emitted when input validation fails (standard form event)
   */
  @Event() validationFailed: EventEmitter<Event>;

  /**
   * Emitted when a barcode is successfully scanned
   */
  @Event() scan: EventEmitter<string>;

  /**
   * Emitted when scanning starts
   */
  @Event() scanStart: EventEmitter<void>;

  /**
   * Emitted when scanning stops
   */
  @Event() scanStop: EventEmitter<void>;

  /**
   * Emitted when camera permission is granted
   */
  @Event() permissionGranted: EventEmitter<void>;

  /**
   * Emitted when camera permission is denied
   */
  @Event() permissionDenied: EventEmitter<void>;

  /**
   * Emitted when an error occurs
   */
  @Event() scanError: EventEmitter<string>;

  /**
   * Watch for camera ID changes
   */
  @Watch('cameraId')
  async onCameraIdChanged(newCameraId: string) {
    if (this.isScanning) {
      await this.stop();
      this.selectedCameraId = newCameraId;
      await this.start();
    } else {
      this.selectedCameraId = newCameraId;
    }
  }

  /**
   * Component lifecycle - initialize
   */
  async componentDidLoad(): Promise<void> {
    try {
      console.log('Initializing ZXing barcode scanner...');

      this.initializeCodeReader();
      await this.requestCameraPermission();
      await this.loadAvailableCameras();

      if (this.autoStart && this.hasPermission) {
        await this.start();
      }

      console.log('Barcode scanner initialized successfully');
    } catch (error) {
      console.error('Failed to initialize scanner:', error);
      this.handleError(`Initialization failed: ${error.message}`);
    }
  }

  /**
   * Component cleanup
   */
  disconnectedCallback(): void {
    this.isDestroyed = true;
    this.cleanup();
  }

  /**
   * Start scanning loop
   */
  private async startScanning(): Promise<void> {
    if (!this.videoElement || this.isDestroyed) {
      return;
    }

    const scanFrame = async () => {
      if (!this.isScanning || this.isDestroyed || !this.videoElement) {
        return;
      }

      try {
        // Update debug info
        if (this.debug) {
          this.debugInfo = `Video: ${this.videoElement.videoWidth}x${this.videoElement.videoHeight}, Ready: ${this.videoElement.readyState >= 2}`;
        }

        // Ensure video is ready before scanning (readyState 2 = HAVE_CURRENT_DATA)
        if (this.videoElement.readyState >= 2) {
          const result = await this.codeReader.decodeFromVideoElement(this.videoElement);
          if (result && result.getText()) {
            console.log('Barcode detected:', result.getText(), 'Format:', result.getBarcodeFormat());
            this.handleScanResult(result.getText());
          }
        }
      } catch (error) {
        // NotFoundException is expected when no barcode is found
        if (!(error instanceof NotFoundException)) {
          console.debug('Scan error:', error.message);
          if (this.debug) {
            this.debugInfo += ` | Error: ${error.message}`;
          }
        }
      }

      // Schedule next scan
      if (this.isScanning && !this.isDestroyed) {
        this.scanTimer = setTimeout(scanFrame, this.scanInterval);
      }
    };

    // Wait for video to be ready (readyState 2 = HAVE_CURRENT_DATA)
    if (this.videoElement.readyState >= 2) {
      if (this.debug) console.log('Video ready, starting scan immediately');
      scanFrame();
    } else {
      if (this.debug) console.log('Waiting for video to load...');
      this.videoElement.addEventListener('loadeddata', () => {
        console.log('Video loaded, starting scan loop');
        scanFrame();
      }, { once: true });
    }
  }

  /**
   * Initialize ZXing code reader with supported formats
   */
  private initializeCodeReader(): void {
    try {
      const hints = new Map();

      // Set supported formats
      hints.set(DecodeHintType.POSSIBLE_FORMATS, this.supportedFormats);
      hints.set(DecodeHintType.TRY_HARDER, true);

      // Additional hints for better detection
      hints.set(DecodeHintType.PURE_BARCODE, false);

      this.codeReader = new BrowserMultiFormatReader(hints);
      console.log('ZXing reader initialized with formats:', this.supportedFormats);
    } catch (error) {
      console.error('Failed to initialize ZXing reader:', error);
      // Fallback to basic reader
      this.codeReader = new BrowserMultiFormatReader();
    }
  }

  /**
   * Request camera permission
   */
  private async requestCameraPermission(): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: this.facingMode }
      });

      // Stop the test stream immediately
      stream.getTracks().forEach(track => track.stop());

      this.hasPermission = true;
      this.permissionGranted.emit();
    } catch (error) {
      console.error('Camera permission denied:', error);
      this.hasPermission = false;
      this.permissionDenied.emit();
      this.handleError('Camera permission denied. Please allow camera access to scan barcodes.');
    }
  }

  /**
   * Load available cameras
   */
  private async loadAvailableCameras(): Promise<void> {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      this.availableCameras = devices.filter(device => device.kind === 'videoinput');

      // Select default camera
      if (!this.selectedCameraId && this.availableCameras.length > 0) {
        // Try to find environment camera first, otherwise use first available
        const environmentCamera = this.availableCameras.find(camera =>
          camera.label.toLowerCase().includes('back') ||
          camera.label.toLowerCase().includes('environment')
        );
        this.selectedCameraId = this.cameraId || environmentCamera?.deviceId || this.availableCameras[0].deviceId;
      }
    } catch (error) {
      console.error('Failed to load cameras:', error);
      this.handleError('Failed to access camera devices');
    }
  }

  /**
   * Start barcode scanning
   */
  @Method()
  async start(): Promise<void> {
    if (this.isScanning || !this.hasPermission || this.disabled) {
      return;
    }

    try {
      this.errorMessage = '';
      await this.startCamera();
      await this.startScanning();
      this.isScanning = true;
      this.scanStart.emit();
      this.focusGained.emit();
    } catch (error) {
      console.error('Failed to start scanning:', error);
      this.handleError(`Failed to start scanner: ${error.message}`);
    }
  }

  /**
   * Stop barcode scanning
   */
  @Method()
  async stop(): Promise<void> {
    this.isScanning = false;
    this.cleanup();
    this.scanStop.emit();
    this.focusLost.emit();
  }

  /**
   * Start camera stream
   */
  private async startCamera(): Promise<void> {
    const constraints: MediaStreamConstraints = {
      video: {
        facingMode: this.facingMode,
        width: { ideal: 640 },
        height: { ideal: 480 },
        ...(this.selectedCameraId && { deviceId: { exact: this.selectedCameraId } })
      }
    };

    try {
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);

      if (this.videoElement) {
        this.videoElement.srcObject = this.stream;

        // Wait for video to load
        await new Promise<void>((resolve, reject) => {
          this.videoElement.onloadedmetadata = () => {
            this.videoElement.play()
              .then(() => {
                console.log('Video playing, dimensions:', this.videoElement.videoWidth, 'x', this.videoElement.videoHeight);
                resolve();
              })
              .catch(reject);
          };
          this.videoElement.onerror = reject;
        });
      }
    } catch (error) {
      throw new Error(`Camera initialization failed: ${error.message}`);
    }
  }

  /**
   * Handle successful scan result
   */
  private handleScanResult(decodedText: string): void {
    if (this.isDestroyed || this.disabled || this.readonly) return;

    const scannedData = processText(decodedText);

    // Check for duplicate scans
    if (this.lastScan?.text !== scannedData.text) {
      const oldValue = this.value;
      this.value = scannedData.text;

      // Validate input
      if (!this.validateInput(this.value)) {
        return;
      }

      // Emit events
      this.scan.emit(scannedData.text);
      this.inputChange.emit();

      if (oldValue !== this.value) {
        this.valueChange.emit();
      }

      this.lastScan = scannedData;

      // Reset duplicate prevention after 2 seconds
      setTimeout(() => {
        if (!this.isDestroyed) {
          this.lastScan = null;
        }
      }, 2000);
    }
  }

  /**
   * Validate scanned input against form constraints
   */
  private validateInput(value: string): boolean {
    // Required validation
    if (this.required && (!value || value.trim() === '')) {
      this.setCustomValidity('This field is required');
      return false;
    }

    // Length validation
    if (this.minlength && value.length < this.minlength) {
      this.setCustomValidity(`Value must be at least ${this.minlength} characters`);
      return false;
    }

    if (this.maxlength && value.length > this.maxlength) {
      this.setCustomValidity(`Value must be no more than ${this.maxlength} characters`);
      return false;
    }

    // Pattern validation
    if (this.pattern) {
      const regex = new RegExp(this.pattern);
      if (!regex.test(value)) {
        this.setCustomValidity(this.validationMessage || 'Value does not match required pattern');
        return false;
      }
    }

    this.setCustomValidity('');
    return true;
  }

  /**
   * Set custom validity message
   */
  private setCustomValidity(message: string): void {
    if (message) {
      this.validationFailed.emit();
    }
  }

  /**
   * Handle errors
   */
  private handleError(message: string): void {
    this.errorMessage = message;
    this.scanError.emit(message);
  }

  /**
   * Cleanup resources
   */
  private cleanup(): void {
    // Clear scan timer
    if (this.scanTimer) {
      clearTimeout(this.scanTimer);
      this.scanTimer = null;
    }

    // Stop camera stream
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }

    // Clear video element
    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }
  }

  /**
   * Form association methods
   */

  /**
   * Get form value for form submission
   */
  @Method()
  async getFormValue(): Promise<string> {
    return this.value || '';
  }

  /**
   * Set form value programmatically
   */
  @Method()
  async setFormValue(value: string): Promise<void> {
    this.value = value;
  }

  /**
   * Check validity of current value
   */
  @Method()
  async checkValidity(): Promise<boolean> {
    return this.validateInput(this.value || '');
  }

  /**
   * Focus the scanner (start scanning)
   */
  @Method()
  async setFocus(): Promise<void> {
    if (!this.disabled) {
      await this.start();
    }
  }

  /**
   * Blur the scanner (stop scanning)
   */
  @Method()
  async setBlur(): Promise<void> {
    await this.stop();
  }

  /**
   * Get available cameras
   */
  @Method()
  async getCameras(): Promise<MediaDeviceInfo[]> {
    return this.availableCameras;
  }

  /**
   * Switch camera
   */
  @Method()
  async switchCamera(cameraId: string): Promise<void> {
    this.cameraId = cameraId;
  }

  /**
   * Get current scanner state
   */
  @Method()
  async getState(): Promise<{ isScanning: boolean; hasPermission: boolean; errorMessage: string }> {
    return {
      isScanning: this.isScanning,
      hasPermission: this.hasPermission,
      errorMessage: this.errorMessage
    };
  }

  /**
   * Handle camera selection change
   */
  private handleCameraChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.switchCamera(select.value);
  };

  render() {
    const hostStyle = {
      'width': this.width,
      'height': this.height,
      'display': 'inline-block',
      'position': 'relative',
      'overflow': 'hidden',
      'border-radius': '8px',
      'background-color': '#000'
    };

    return (
      <Host style={hostStyle} debug={this.debug}>
        {/* Video element for camera feed */}
        <video
          ref={el => this.videoElement = el}
          id={`video-${this.uuidGeneric}`}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
          playsInline
          muted
          aria-label={this.accessibilityLabel}
          aria-describedby={this.ariaDescribedby}
        />

        {/* Camera controls overlay */}
        {this.showCameraSelector && this.availableCameras.length > 1 && (
          <div class="camera-controls">
            <select onChange={this.handleCameraChange}>
              {this.availableCameras.map(camera => (
                <option
                  key={camera.deviceId}
                  value={camera.deviceId}
                  selected={camera.deviceId === this.selectedCameraId}
                >
                  {camera.label || `Camera ${camera.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Debug info overlay */}
        {this.debug && this.debugInfo && (
          <div class="debug-overlay">
            <p class="debug-message">{this.debugInfo}</p>
          </div>
        )}

        {/* Error message overlay */}
        {this.errorMessage && (
          <div class="error-overlay">
            <p class="error-message">{this.errorMessage}</p>
          </div>
        )}

        {/* Status indicator */}
        {this.isScanning && (
          <div class="scanning-indicator" data-debug-info={this.debugInfo}>
            <div class="scanning-frame"></div>
          </div>
        )}

        {/* Value display for accessibility */}
        <input
          type="hidden"
          name={this.name}
          value={this.value}
          required={this.required}
          disabled={this.disabled}
          readonly={this.readonly}
        />
      </Host>
    );
  }
}
