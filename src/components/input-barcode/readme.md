# input-barcode

## 📷 Camera-Based Barcode Scanner Component

A high-performance web component for scanning barcodes and QR codes using device camera. Built with ZXing library for maximum cross-browser compatibility and mobile support, including Capacitor apps.

### 🎯 Key Features
- **Cross-platform compatibility**: Works reliably across all modern browsers and mobile devices
- **Capacitor ready**: Optimized for hybrid mobile applications
- **Multi-format support**: Supports 13+ barcode formats including QR codes, Code 128, EAN, UPC, PDF417, and more
- **Smart duplicate prevention**: Intelligent filtering to prevent multiple reads of the same code
- **Form integration**: Acts as a standard form input with validation support
- **Camera management**: Automatic camera selection with manual override options
- **Error recovery**: Robust error handling with user-friendly messages
- **Accessibility**: Full keyboard navigation and screen reader support

### 🔧 Use Cases
- Inventory management systems
- Point of sale applications
- Product information lookup
- Event check-in systems
- Asset tracking
- Mobile commerce applications

### ⚡ Performance Optimizations
- Efficient ZXing-based barcode detection
- Configurable scan intervals for optimal performance
- Memory-efficient camera stream management
- Background error handling without UI blocking
- Automatic resource cleanup

### 🚀 Cross-Platform Support
- **Web browsers**: Chrome, Firefox, Safari, Edge
- **Mobile browsers**: iOS Safari, Chrome Mobile, Samsung Internet
- **Capacitor apps**: iOS and Android hybrid applications
- **PWAs**: Progressive Web Applications with camera access

<!-- Auto Generated Below -->


## Overview

Camera-based barcode scanner component using ZXing library
Optimized for cross-browser compatibility and mobile support
Functions as a form input element with standard input properties

## Properties

| Property             | Attribute              | Description                                                                | Type                      | Default                                                                                                                                                                                                                                                                                                                                                       |
| -------------------- | ---------------------- | -------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label`  | ARIA label for accessibility                                               | `string`                  | `'Barcode scanner input'`                                                                                                                                                                                                                                                                                                                                     |
| `ariaDescribedby`    | `aria-describedby`     | ARIA description for accessibility                                         | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                                   |
| `autoFocus`          | `auto-focus`           | Auto-focus the scanner when component loads                                | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                                       |
| `autoStart`          | `auto-start`           | Auto-start scanning when component loads                                   | `boolean`                 | `true`                                                                                                                                                                                                                                                                                                                                                        |
| `cameraId`           | `camera-id`            | Specific camera device ID to use (optional)                                | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                                   |
| `debug`              | `debug`                | Enable debug mode for troubleshooting                                      | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                                       |
| `disabled`           | `disabled`             | Whether the input is disabled                                              | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                                       |
| `facingMode`         | `facing-mode`          | Camera facing mode: 'user' for front camera, 'environment' for back camera | `"environment" \| "user"` | `'environment'`                                                                                                                                                                                                                                                                                                                                               |
| `height`             | `height`               | Height of the camera viewport                                              | `string`                  | `'200px'`                                                                                                                                                                                                                                                                                                                                                     |
| `maxlength`          | `maxlength`            | Maximum length for scanned value                                           | `number`                  | `undefined`                                                                                                                                                                                                                                                                                                                                                   |
| `minlength`          | `minlength`            | Minimum length for scanned value                                           | `number`                  | `undefined`                                                                                                                                                                                                                                                                                                                                                   |
| `name`               | `name`                 | The name attribute for form submission                                     | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                                   |
| `pattern`            | `pattern`              | Pattern for input validation (regex)                                       | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                                   |
| `placeholder`        | `placeholder`          | Placeholder text when no value is present                                  | `string`                  | `'Scan a barcode or QR code'`                                                                                                                                                                                                                                                                                                                                 |
| `readonly`           | `readonly`             | Whether the input is readonly                                              | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                                       |
| `required`           | `required`             | Whether the input is required for form validation                          | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                                       |
| `scanInterval`       | `scan-interval`        | Scan interval in milliseconds                                              | `number`                  | `100`                                                                                                                                                                                                                                                                                                                                                         |
| `showCameraSelector` | `show-camera-selector` | Show camera selection controls                                             | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                                       |
| `supportedFormats`   | `supported-formats`    | Supported barcode and QR code formats for scanning                         | `BarcodeFormat[]`         | `[     BarcodeFormat.QR_CODE,     BarcodeFormat.CODE_128,     BarcodeFormat.EAN_13,     BarcodeFormat.EAN_8,     BarcodeFormat.UPC_A,     BarcodeFormat.UPC_E,     BarcodeFormat.CODE_39,     BarcodeFormat.CODE_93,     BarcodeFormat.CODABAR,     BarcodeFormat.ITF,     BarcodeFormat.AZTEC,     BarcodeFormat.DATA_MATRIX,     BarcodeFormat.PDF_417   ]` |
| `tabOrder`           | `tab-order`            | Tab order for keyboard navigation                                          | `number`                  | `undefined`                                                                                                                                                                                                                                                                                                                                                   |
| `validationMessage`  | `validation-message`   | Form validation message                                                    | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                                   |
| `value`              | `value`                | The value of the input (last scanned data)                                 | `string`                  | `''`                                                                                                                                                                                                                                                                                                                                                          |
| `width`              | `width`                | Width of the camera viewport                                               | `string`                  | `'400px'`                                                                                                                                                                                                                                                                                                                                                     |


## Events

| Event               | Description                                                 | Type                      |
| ------------------- | ----------------------------------------------------------- | ------------------------- |
| `focusGained`       | Emitted when component gains focus (standard form event)    | `CustomEvent<FocusEvent>` |
| `focusLost`         | Emitted when component loses focus (standard form event)    | `CustomEvent<FocusEvent>` |
| `inputChange`       | Emitted when input value changes (standard form event)      | `CustomEvent<Event>`      |
| `permissionDenied`  | Emitted when camera permission is denied                    | `CustomEvent<void>`       |
| `permissionGranted` | Emitted when camera permission is granted                   | `CustomEvent<void>`       |
| `scan`              | Emitted when a barcode is successfully scanned              | `CustomEvent<string>`     |
| `scanError`         | Emitted when an error occurs                                | `CustomEvent<string>`     |
| `scanStart`         | Emitted when scanning starts                                | `CustomEvent<void>`       |
| `scanStop`          | Emitted when scanning stops                                 | `CustomEvent<void>`       |
| `validationFailed`  | Emitted when input validation fails (standard form event)   | `CustomEvent<Event>`      |
| `valueChange`       | Emitted when input value is committed (standard form event) | `CustomEvent<Event>`      |


## Methods

### `checkValidity() => Promise<boolean>`

Check validity of current value

#### Returns

Type: `Promise<boolean>`



### `getCameras() => Promise<MediaDeviceInfo[]>`

Get available cameras

#### Returns

Type: `Promise<MediaDeviceInfo[]>`



### `getFormValue() => Promise<string>`

Get form value for form submission

#### Returns

Type: `Promise<string>`



### `getState() => Promise<{ isScanning: boolean; hasPermission: boolean; errorMessage: string; }>`

Get current scanner state

#### Returns

Type: `Promise<{ isScanning: boolean; hasPermission: boolean; errorMessage: string; }>`



### `setBlur() => Promise<void>`

Blur the scanner (stop scanning)

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Focus the scanner (start scanning)

#### Returns

Type: `Promise<void>`



### `setFormValue(value: string) => Promise<void>`

Set form value programmatically

#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `value` | `string` |             |

#### Returns

Type: `Promise<void>`



### `start() => Promise<void>`

Start barcode scanning

#### Returns

Type: `Promise<void>`



### `stop() => Promise<void>`

Stop barcode scanning

#### Returns

Type: `Promise<void>`



### `switchCamera(cameraId: string) => Promise<void>`

Switch camera

#### Parameters

| Name       | Type     | Description |
| ---------- | -------- | ----------- |
| `cameraId` | `string` |             |

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
