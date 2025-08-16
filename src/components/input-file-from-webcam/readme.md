# input-file-from-webcam

## 📸 Simple Webcam Photo Capture Component

A streamlined, high-performance web component designed for quick and reliable photo capture from webcam. Perfect for employee check-ins, ID verification, and any application requiring simple photo capture functionality.

### 🎯 Key Features
- **One-click photo capture**: Instant photo capture with configurable image quality
- **Beautiful SVG icons**: Modern, scalable interface with professional camera and flip icons
- **Customizable action buttons**: Show/hide capture and flip buttons with `showActionButtons` prop
- **External control support**: Use methods to control camera from parent components
- **Flash effect**: Visual feedback with customizable flash animation
- **Front/back camera**: Seamless switching between device cameras
- **Custom image processing**: Extensible with custom canvas drawing functions for filters and effects
- **Error handling**: Comprehensive error management with user-friendly messages
- **Auto-start capability**: Optional automatic camera initialization on load

### 🔧 Use Cases
- Employee time tracking and check-in systems
- ID photo capture for verification
- Profile picture uploads
- Document photography
- Quick photo capture for forms and applications

### ⚡ Performance Optimizations
- Efficient camera resource management with automatic cleanup
- Optimized image quality settings for best size/quality ratio
- Memory-efficient blob handling
- Smart visibility detection to pause camera when not needed
- Minimal CPU usage when idle

<!-- Auto Generated Below -->


## Overview

Simple webcam photo capture component optimized for performance
Perfect for employee check-ins, ID verification, and quick photo capture
Functions as a form input element for file/image submission

## Properties

| Property             | Attribute             | Description                                                                                               | Type                                            | Default                        |
| -------------------- | --------------------- | --------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ------------------------------ |
| `accept`             | `accept`              | Accept attribute for file type validation                                                                 | `string`                                        | `'image/*'`                    |
| `accessibilityLabel` | `accessibility-label` | ARIA label for accessibility                                                                              | `string`                                        | `'Webcam photo capture input'` |
| `ariaDescribedby`    | `aria-describedby`    | ARIA description for accessibility                                                                        | `string`                                        | `undefined`                    |
| `autoFocus`          | `auto-focus`          | Auto-focus the camera when component loads                                                                | `boolean`                                       | `false`                        |
| `autoStart`          | `auto-start`          | Auto-start camera when component loads                                                                    | `boolean`                                       | `true`                         |
| `captureButtonText`  | `capture-button-text` | Text for the capture button                                                                               | `string`                                        | `''`                           |
| `customValidation`   | `custom-validation`   |                                                                                                           | `(value: string) => boolean`                    | `undefined`                    |
| `disabled`           | `disabled`            | Whether the input is disabled                                                                             | `boolean`                                       | `false`                        |
| `drawImageCb`        | `draw-image-cb`       | Custom canvas drawing function for image processing Override to add filters or effects to captured images | `Function`                                      | `null`                         |
| `facingMode`         | `facing-mode`         | Camera facing mode: front or back camera                                                                  | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front`        |
| `flashEffect`        | `flash-effect`        | Enable flash effect animation when taking picture                                                         | `boolean`                                       | `true`                         |
| `flipButtonText`     | `flip-button-text`    | Text for the flip camera button                                                                           | `string`                                        | `''`                           |
| `height`             | `height`              | Height of the video element in pixels                                                                     | `number`                                        | `460`                          |
| `imageQuality`       | `image-quality`       | Image quality for captured photos (0.1 to 1.0)                                                            | `number`                                        | `0.85`                         |
| `maxFileSize`        | `max-file-size`       | Maximum file size in bytes (0 = no limit)                                                                 | `number`                                        | `0`                            |
| `name`               | `name`                | The name attribute for form submission                                                                    | `string`                                        | `undefined`                    |
| `placeholder`        | `placeholder`         | Placeholder text when no image is captured                                                                | `string`                                        | `'No image captured'`          |
| `readonly`           | `readonly`            | Whether the input is readonly                                                                             | `boolean`                                       | `false`                        |
| `required`           | `required`            | Whether the input is required for form validation                                                         | `boolean`                                       | `false`                        |
| `showActionButtons`  | `show-action-buttons` | Show action buttons (capture and flip camera buttons)                                                     | `boolean`                                       | `true`                         |
| `showControls`       | `show-controls`       | Show camera control buttons (flip, capture, etc.)                                                         | `boolean`                                       | `true`                         |
| `tabOrder`           | `tab-order`           | Tab order for keyboard navigation                                                                         | `number`                                        | `undefined`                    |
| `validationMessage`  | `validation-message`  | Form validation message                                                                                   | `string`                                        | `undefined`                    |
| `value`              | `value`               | The value of the input (base64 data URL of captured image)                                                | `string`                                        | `''`                           |
| `width`              | `width`               | Width of the video element in pixels                                                                      | `number`                                        | `460`                          |


## Events

| Event               | Description                                   | Type                                                         |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| `cameraError`       | Event emitted when camera encounters an error | `CustomEvent<WebcamError>`                                   |
| `cameraStarted`     | Event emitted when camera starts successfully | `CustomEvent<void>`                                          |
| `cameraStopped`     | Event emitted when camera stops               | `CustomEvent<void>`                                          |
| `facingModeChanged` | Event emitted when facing mode changes        | `CustomEvent<CameraDirection.Front \| CameraDirection.Rear>` |
| `focusGained`       | Standard focus event                          | `CustomEvent<FocusEvent>`                                    |
| `focusLost`         | Standard blur event                           | `CustomEvent<FocusEvent>`                                    |
| `inputChange`       | Standard input event when value changes       | `CustomEvent<Event>`                                         |
| `pictureTaken`      | Event emitted when the user takes a picture   | `CustomEvent<Blob>`                                          |
| `validationFailed`  | Standard invalid event for form validation    | `CustomEvent<Event>`                                         |
| `valueChange`       | Standard change event when value is committed | `CustomEvent<Event>`                                         |


## Methods

### `checkValidity() => Promise<boolean>`

Check validity of current value

#### Returns

Type: `Promise<boolean>`



### `getFormValue() => Promise<string>`

Get form value for form submission (base64 data URL)

#### Returns

Type: `Promise<string>`



### `releaseCamera() => Promise<void>`

Force release camera (useful when component is hidden in modal)

#### Returns

Type: `Promise<void>`



### `requestCamera() => Promise<void>`

Request camera access (useful when component becomes visible from modal)

#### Returns

Type: `Promise<void>`



### `resetCamera() => Promise<void>`

Reset camera by stopping and restarting

#### Returns

Type: `Promise<void>`



### `setBlur() => Promise<void>`

Blur the camera (stop camera)

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Focus the camera (start camera)

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



### `startCamera() => Promise<void>`

Start the camera with error handling

#### Returns

Type: `Promise<void>`



### `stopCamera() => Promise<void>`

Stop the camera and clean up resources

#### Returns

Type: `Promise<void>`



### `takePic() => Promise<Blob>`

Take a picture with flash effect and error handling

#### Returns

Type: `Promise<Blob>`



### `toggleCamera() => Promise<void>`

Toggle between front and back camera

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
