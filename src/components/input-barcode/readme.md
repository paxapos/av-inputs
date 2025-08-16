# input-barcode

## 📷 Camera-Based Barcode Scanner Component

A high-performance web component for scanning barcodes and QR codes using device camera. Built with html5-qrcode library, optimized for real-time scanning with minimal CPU usage and maximum compatibility across devices.

### 🎯 Key Features
- **Real-time scanning**: Optimized camera feed processing at 10 FPS for balance between performance and accuracy
- **Multi-format support**: Supports 17+ barcode formats including QR codes, Code 128, EAN, UPC, PDF417, and more
- **Smart duplicate prevention**: Intelligent filtering to prevent multiple reads of the same code
- **Auto-restart capability**: Automatic recovery from camera errors
- **Mobile optimized**: Works seamlessly on mobile devices with front/back camera switching

### 🔧 Use Cases
- Inventory management systems
- Point of sale applications
- Product information lookup
- Event check-in systems
- Asset tracking

### ⚡ Performance Optimizations
- Debounced scanning to prevent duplicate reads
- Optimized camera settings for best performance/quality ratio
- Memory-efficient video processing
- Background error handling without UI blocking

<!-- Auto Generated Below -->


## Overview

Camera-based barcode scanner component optimized for real-time scanning
with intelligent duplicate prevention and error recovery
Functions as a form input element with standard input properties

## Properties

| Property             | Attribute             | Description                                                                                                                                             | Type                      | Default                                                                                                                                                                                                                                                                                                                                           |
| -------------------- | --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `accessibilityLabel` | `accessibility-label` | ARIA label for accessibility                                                                                                                            | `string`                  | `'Barcode scanner input'`                                                                                                                                                                                                                                                                                                                         |
| `ariaDescribedby`    | `aria-describedby`    | ARIA description for accessibility                                                                                                                      | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                       |
| `autoFocus`          | `auto-focus`          | Auto-focus the scanner when component loads                                                                                                             | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                           |
| `autoStart`          | `auto-start`          | Auto-start scanning when component loads                                                                                                                | `boolean`                 | `true`                                                                                                                                                                                                                                                                                                                                            |
| `cameraConfig`       | `camera-config`       | Camera configuration for optimal performance 10 FPS provides good balance between performance and accuracy                                              | `any`                     | `{     fps: 10,     qrbox: { width: 250, height: 250 },     aspectRatio: 1.0   }`                                                                                                                                                                                                                                                                 |
| `cameraId`           | `camera-id`           | Specific camera device ID to use (optional)                                                                                                             | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                       |
| `disabled`           | `disabled`            | Whether the input is disabled                                                                                                                           | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                           |
| `facingMode`         | `facing-mode`         | Camera facing mode: 'user' for front camera, 'environment' for back camera                                                                              | `"environment" \| "user"` | `'environment'`                                                                                                                                                                                                                                                                                                                                   |
| `height`             | `height`              | Height of the camera viewport                                                                                                                           | `string`                  | `'200px'`                                                                                                                                                                                                                                                                                                                                         |
| `maxlength`          | `maxlength`           | Maximum length for scanned value                                                                                                                        | `number`                  | `undefined`                                                                                                                                                                                                                                                                                                                                       |
| `minlength`          | `minlength`           | Minimum length for scanned value                                                                                                                        | `number`                  | `undefined`                                                                                                                                                                                                                                                                                                                                       |
| `name`               | `name`                | The name attribute for form submission                                                                                                                  | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                       |
| `pattern`            | `pattern`             | Pattern for input validation (regex)                                                                                                                    | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                       |
| `placeholder`        | `placeholder`         | Placeholder text when no value is present                                                                                                               | `string`                  | `'Scan a barcode or QR code'`                                                                                                                                                                                                                                                                                                                     |
| `readonly`           | `readonly`            | Whether the input is readonly                                                                                                                           | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                           |
| `required`           | `required`            | Whether the input is required for form validation                                                                                                       | `boolean`                 | `false`                                                                                                                                                                                                                                                                                                                                           |
| `supportedFormats`   | `supported-formats`   | Supported barcode and QR code formats for scanning Optimized selection for best performance Using format constants compatible with html5-qrcode v2.3.8+ | `number[]`                | `[     0,  // QR_CODE     1,  // CODE_128     2,  // EAN_13     3,  // EAN_8     4,  // UPC_A     5,  // UPC_E     6,  // CODE_39     7,  // CODE_93     8,  // CODABAR     9,  // ITF     10, // AZTEC     11, // DATA_MATRIX     12, // PDF_417     13, // MAXICODE     14, // RSS_14     15, // RSS_EXPANDED     16  // UPC_EAN_EXTENSION   ]` |
| `tabOrder`           | `tab-order`           | Tab order for keyboard navigation                                                                                                                       | `number`                  | `undefined`                                                                                                                                                                                                                                                                                                                                       |
| `validationMessage`  | `validation-message`  | Form validation message                                                                                                                                 | `string`                  | `undefined`                                                                                                                                                                                                                                                                                                                                       |
| `value`              | `value`               | The value of the input (last scanned data)                                                                                                              | `string`                  | `''`                                                                                                                                                                                                                                                                                                                                              |
| `width`              | `width`               | Width of the camera viewport                                                                                                                            | `string`                  | `'400px'`                                                                                                                                                                                                                                                                                                                                         |


## Events

| Event              | Description                                                 | Type                      |
| ------------------ | ----------------------------------------------------------- | ------------------------- |
| `focusGained`      | Emitted when component gains focus (standard form event)    | `CustomEvent<FocusEvent>` |
| `focusLost`        | Emitted when component loses focus (standard form event)    | `CustomEvent<FocusEvent>` |
| `inputChange`      | Emitted when input value changes (standard form event)      | `CustomEvent<Event>`      |
| `scan`             | Emitted when a barcode is successfully scanned              | `CustomEvent<string>`     |
| `validationFailed` | Emitted when input validation fails (standard form event)   | `CustomEvent<Event>`      |
| `valueChange`      | Emitted when input value is committed (standard form event) | `CustomEvent<Event>`      |


## Methods

### `checkValidity() => Promise<boolean>`

Check validity of current value

#### Returns

Type: `Promise<boolean>`



### `getCameras() => Promise<any[]>`

Get available cameras for the device

#### Returns

Type: `Promise<any[]>`

Promise resolving to array of camera devices

### `getFormValue() => Promise<string>`

Get form value for form submission

#### Returns

Type: `Promise<string>`



### `getState() => Promise<any | null>`

Get current scanner state

#### Returns

Type: `Promise<any>`



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

Start the barcode scanner

#### Returns

Type: `Promise<void>`



### `stop() => Promise<void>`

Stop the scanner and clean up resources

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
