import { Component, Host, h, Event, Method, Element, EventEmitter, State, Listen, Prop, Watch } from '@stencil/core';
import { InputScanData } from './input-scan-reader.types';
import { processText } from 'src/utils/text.handler';

/**
 * Hardware barcode scanner input component
 * Optimized for physical barcode scanners that input as HID keyboard devices
 * Handles rapid input patterns with intelligent timeout management
 * Functions as a form input element with standard input properties
 */
@Component({
  tag: 'input-scan-reader',
  styleUrl: 'input-scan-reader.css',
  shadow: true,
  formAssociated: true
})
export class InputScanReader {
  @Element() el: HTMLElement;

  @State() reading = false;
  @State() readingEnabled = false;
  @State() scannedText = '';
  @State() timeout: NodeJS.Timeout | null = null;
  @State() isCapturing = false;

  // Add missing property for tracking input timing
  private lastInputTime: number = 0;

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
   * Placeholder text when no value is present
   */
  @Prop({ mutable: true }) placeholder?: string = 'Scanned text will appear here...';

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
  @Prop({ mutable: true }) autoFocus?: boolean = true;

  /**
   * Tab order for keyboard navigation
   */
  @Prop() tabOrder?: number;

  /**
   * ARIA label for accessibility
   */
  @Prop({ mutable: true }) accessibilityLabel?: string = 'Hardware barcode scanner input';

  /**
   * ARIA description for accessibility
   */
  @Prop() ariaDescribedby?: string;

  /**
   * Duration in milliseconds to show confirmation modal after successful scan
   */
  @Prop({ mutable: true }) modalTimer?: number = 0;

  /**
   * Title text displayed during scanning operation
   */
  @Prop({ mutable: true }) scanTitle?: string = 'Scanning Text';

  /**
   * Timeout duration in milliseconds before clearing incomplete input
   */
  @Prop({ mutable: true }) inputTimeout?: number = 5000;

  /**
   * Minimum input length to consider valid scanner input
   */
  @Prop({ mutable: true }) minInputLength?: number = 3;

  /**
   * Display confirmation modal with scanned text
   * Provides visual feedback for successful scans
   */
  private displayModal(data: InputScanData): void {
    const div = document.createElement('div');
    Object.assign(div.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(254,254,254,0.85)',
      zIndex: '10000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: '#333',
      fontSize: '2rem',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '2rem',
      boxSizing: 'border-box',
      cursor: 'pointer',
      backdropFilter: 'blur(2px)'
    });

    div.textContent = data.text;
    div.addEventListener('click', () => div.remove());
    document.body.appendChild(div);

    setTimeout(() => div.remove(), this.modalTimer);
  }

  /**
   * Handle scan completion
   */
  @Listen('scan')
  handleScan(event: CustomEvent<InputScanData>): void {
    if (this.modalTimer > 0) {
      this.displayModal(event.detail);
    }
    this.reset();
  }

  /**
   * Initialize component
   */
  componentDidLoad(): void {
    if (!this.readingEnabled) {
      // Delayed start to avoid conflicts during render
      setTimeout(() => this.start(), 0);
    }
  }

  /**
   * Process completed input and emit scan event
   */
  private onEnterHandler(): boolean {
    if (this.disabled || this.readonly) return false;

    if (this.scannedText.trim().length < this.minInputLength) {
      return false;
    }

    const scannedValue = this.scannedText.trim();

    // Validate input
    const isValid = this.validateInput(scannedValue);
    if (!isValid) {
      this.validationFailed.emit();
      return false;
    }

    // Update value
    const oldValue = this.value;
    this.value = scannedValue;

    const scannedData = processText(scannedValue);
    this.scan.emit(scannedData);

    // Emit standard form events
    this.inputChange.emit();

    if (oldValue !== scannedValue) {
      this.valueChange.emit();
    }

    return true;
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
   * Watch for changes in scanned text to manage timeout
   */
  @Watch('scannedText')
  watchScannedTextHandler(newValue: string): void {
    if (newValue.length > 0) {
      this.restartTimeout();
    } else {
      this.clearTimeout();
    }
  }

  /**
   * Event emitted when scanner completes reading
   */
  @Event() scan: EventEmitter<InputScanData>;

  /**
   * Standard form input events
   */

  /**
   * Standard input event when value changes
   */
  @Event() inputChange: EventEmitter<Event>;

  /**
   * Standard change event when value is committed
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

  /**
   * Get current raw scanned text
   */
  @Method()
  async getText(): Promise<string> {
    return this.scannedText;
  }

  /**
   * Get processed scan data
   */
  @Method()
  async getData(): Promise<InputScanData | null> {
    if (this.scannedText.trim().length === 0) {
      return null;
    }
    return processText(this.scannedText.trim());
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
    this.scannedText = value;
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
      this.focusGained.emit();
    }
  }

  /**
   * Blur the scanner (stop scanning)
   */
  @Method()
  async setBlur(): Promise<void> {
    await this.stop();
    this.focusLost.emit();
  }

  /**
   * Handle input change events
   */
  private handleInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.scannedText = target.value;
    this.value = target.value;
    this.inputChange.emit(event);
  }

  /**
   * Start scanning for barcode input
   */
  @Method()
  async start(): Promise<void> {
    if (this.disabled) return;

    this.readingEnabled = true;
    document.addEventListener('keydown', this.onKeydownHandler.bind(this));
  }

  /**
   * Stop scanning for barcode input
   */
  @Method()
  async stop(): Promise<void> {
    this.readingEnabled = false;
    document.removeEventListener('keydown', this.onKeydownHandler.bind(this));
    this.reset();
  }

  /**
   * Check if any input element is currently focused
   */
  private isAnyInputFocused(): boolean {
    const activeElement = document.activeElement;
    if (!activeElement) return false;

    const inputTags = ['input', 'textarea', 'select'];
    const isInput = inputTags.includes(activeElement.tagName.toLowerCase());
    const isContentEditable = activeElement.getAttribute('contenteditable') === 'true';

    return isInput || isContentEditable;
  }

  /**
   * Reset scanner state
   */
  private reset(): void {
    this.scannedText = '';
    this.reading = false;
    this.isCapturing = false;
    this.lastInputTime = 0;
  }

  /**
   * Clear active timeout
   */
  private clearTimeout(): void {
    if (this.timeout) {
      clearTimeout(this.timeout);
      this.timeout = null;
    }
  }

  /**
   * Restart input timeout
   */
  private restartTimeout(ms: number = this.inputTimeout): void {
    this.clearTimeout();
    this.timeout = setTimeout(() => {
      this.reset();
    }, ms);
  }

  /**
   * Handle keyboard input from hardware scanners
   */
  private onKeydownHandler(event: KeyboardEvent): void {
    if (!this.readingEnabled || event.isComposing) {
      return;
    }

    // Don't intercept if another input is focused
    if (this.isAnyInputFocused()) {
      return;
    }

    // Don't intercept if user is typing in other elements
    if (event.target !== document.body && event.target !== this.el) {
      return;
    }

    // Handle completion keys
    if (event.code === 'Enter' || event.code === 'NumpadEnter' || event.code === 'Tab') {
      if (this.isCapturing) {
        event.preventDefault();
        this.onEnterHandler();
        this.isCapturing = false;
      }
      return;
    }

    // Ignore modifier keys
    if (['Shift', 'Control', 'Alt', 'AltGraph', 'Meta', 'CapsLock'].includes(event.key)) {
      return;
    }

    // Handle special keys
    if (event.key === 'Backspace') {
      if (this.isCapturing) {
        event.preventDefault();
        this.scannedText = this.scannedText.slice(0, -1);
      }
      return;
    }

    if (event.key === 'Escape') {
      if (this.isCapturing) {
        event.preventDefault();
        this.reset();
        this.isCapturing = false;
      }
      return;
    }

    // Handle printable characters
    if (event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
      // Only prevent default and capture if we detect rapid input (scanner behavior)
      // or if we're already capturing
      const now = Date.now();
      const isRapidInput = this.lastInputTime && (now - this.lastInputTime) < 50; // Less than 50ms between keystrokes

      if (this.isCapturing || isRapidInput || this.scannedText.length === 0) {
        event.preventDefault();
        this.scannedText += event.key;
        this.reading = true;
        this.isCapturing = true;
        this.lastInputTime = now;
      }
    }
  }

  /**
   * Component cleanup
   */
  disconnectedCallback(): void {
    this.clearTimeout();
    document.removeEventListener('keydown', this.onKeydownHandler.bind(this));
  }

  /**
   * Loading indicator component
   */
  private renderLoader(): any {
    return <span class="loader"></span>;
  }

  render() {
    let mainClass = this.readingEnabled ? '' : 'stopped';

    if (this.readingEnabled) {
      if (this.scannedText.length === 0) {
        mainClass += ' scanning';
      } else {
        mainClass += ' reading';
      }
    }

    return (
      <Host>
        <div class={mainClass}>
          <div>{this.renderLoader()}</div>
          {this.scanTitle && <label>{this.scanTitle}</label>}
          <div class="scanned-text">{this.scannedText}</div>
          <input
            type="text"
            name={this.name}
            value={this.scannedText}
            onChange={ev => this.handleInputChange(ev)}
            placeholder={this.placeholder}
            disabled={this.disabled}
            readonly={this.readonly || this.readingEnabled}
            required={this.required}
            pattern={this.pattern}
            minlength={this.minlength}
            maxlength={this.maxlength}
            tabindex={this.tabOrder}
            aria-label={this.accessibilityLabel}
            aria-describedby={this.ariaDescribedby}
          />
        </div>
      </Host>
    );
  }
}
