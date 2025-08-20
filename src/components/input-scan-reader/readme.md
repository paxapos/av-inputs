# input-scan-reader

## ⌨️ Hardware Barcode Scanner Input Component

A specialized web component designed to capture input from hardware barcode/QR scanners that connect as HID keyboard devices. This component listens for rapid keyboard input patterns typical of barcode scanners and processes them intelligently.

### 🎯 Key Features
- **Hardware scanner integration**: Optimized for physical barcode scanners that input as keyboard devices
- **Intelligent text processing**: Automatic detection and parsing of DNI, driver licenses, and various document formats
- **Real-time feedback**: Visual scanning state indicators and optional modal confirmations
- **Timeout management**: Smart timeout handling to distinguish scanner input from manual typing
- **Background operation**: Non-intrusive scanning that doesn't interfere with other page interactions

### 🔧 Use Cases
- Point of sale systems with dedicated scanners
- Access control systems
- Document verification (DNI, licenses)
- Inventory management with handheld scanners
- Event registration systems

### ⚡ Performance Optimizations
- Event-driven architecture for minimal CPU usage
- Debounced input processing to handle fast scanner input
- Memory-efficient text buffering
- Smart timeout mechanisms to prevent memory leaks

<!-- Auto Generated Below -->


## Overview

Hardware barcode scanner input component
Optimized for physical barcode scanners that input as HID keyboard devices
Handles rapid input patterns with intelligent timeout management
Functions as a form input element with standard input properties

## Properties

| Property             | Attribute             | Description                                                               | Type      | Default                              |
| -------------------- | --------------------- | ------------------------------------------------------------------------- | --------- | ------------------------------------ |
| `accessibilityLabel` | `accessibility-label` | ARIA label for accessibility                                              | `string`  | `'Hardware barcode scanner input'`   |
| `ariaDescribedby`    | `aria-describedby`    | ARIA description for accessibility                                        | `string`  | `undefined`                          |
| `autoFocus`          | `auto-focus`          | Auto-focus the scanner when component loads                               | `boolean` | `true`                               |
| `disabled`           | `disabled`            | Whether the input is disabled                                             | `boolean` | `false`                              |
| `inputTimeout`       | `input-timeout`       | Timeout duration in milliseconds before clearing incomplete input         | `number`  | `5000`                               |
| `maxlength`          | `maxlength`           | Maximum length for scanned value                                          | `number`  | `undefined`                          |
| `minInputLength`     | `min-input-length`    | Minimum input length to consider valid scanner input                      | `number`  | `3`                                  |
| `minlength`          | `minlength`           | Minimum length for scanned value                                          | `number`  | `undefined`                          |
| `modalTimer`         | `modal-timer`         | Duration in milliseconds to show confirmation modal after successful scan | `number`  | `0`                                  |
| `name`               | `name`                | The name attribute for form submission                                    | `string`  | `undefined`                          |
| `pattern`            | `pattern`             | Pattern for input validation (regex)                                      | `string`  | `undefined`                          |
| `placeholder`        | `placeholder`         | Placeholder text when no value is present                                 | `string`  | `'Scanned text will appear here...'` |
| `readonly`           | `readonly`            | Whether the input is readonly                                             | `boolean` | `false`                              |
| `required`           | `required`            | Whether the input is required for form validation                         | `boolean` | `false`                              |
| `scanTitle`          | `scan-title`          | Title text displayed during scanning operation                            | `string`  | `'Scanning Text'`                    |
| `tabOrder`           | `tab-order`           | Tab order for keyboard navigation                                         | `number`  | `undefined`                          |
| `validationMessage`  | `validation-message`  | Form validation message                                                   | `string`  | `undefined`                          |
| `value`              | `value`               | The value of the input (last scanned data)                                | `string`  | `''`                                 |


## Events

| Event              | Description                                   | Type                         |
| ------------------ | --------------------------------------------- | ---------------------------- |
| `focusGained`      | Standard focus event                          | `CustomEvent<FocusEvent>`    |
| `focusLost`        | Standard blur event                           | `CustomEvent<FocusEvent>`    |
| `inputChange`      | Standard input event when value changes       | `CustomEvent<Event>`         |
| `scan`             | Event emitted when scanner completes reading  | `CustomEvent<InputScanData>` |
| `validationFailed` | Standard invalid event for form validation    | `CustomEvent<Event>`         |
| `valueChange`      | Standard change event when value is committed | `CustomEvent<Event>`         |


## Methods

### `checkValidity() => Promise<boolean>`

Check validity of current value

#### Returns

Type: `Promise<boolean>`



### `getData() => Promise<InputScanData | null>`

Get processed scan data

#### Returns

Type: `Promise<InputScanData>`



### `getFormValue() => Promise<string>`

Get form value for form submission

#### Returns

Type: `Promise<string>`



### `getText() => Promise<string>`

Get current raw scanned text

#### Returns

Type: `Promise<string>`



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

Start scanning for barcode input

#### Returns

Type: `Promise<void>`



### `stop() => Promise<void>`

Stop scanning for barcode input

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
