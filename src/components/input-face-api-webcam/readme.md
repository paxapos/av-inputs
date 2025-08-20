# input-face-api-webcam

## 🤖 AI-Powered Face Detection & Recognition Component

A professional-grade web component for real-time face detection and recognition using MediaPipe and TensorFlow.js. Optimized for high-performance facial analysis with customizable recognition models and automatic photo capture capabilities.

### 🎯 Key Features
- **Real-time face detection**: High-performance face detection using MediaPipe with configurable confidence thresholds
- **Face recognition**: Support for custom trained models with distance-based matching algorithms  
- **Auto photo capture**: Intelligent automatic capture when face confidence exceeds threshold
- **Visual feedback**: Customizable bounding boxes and facial landmarks overlay
- **Performance optimized**: Web Workers for heavy computations, preventing UI blocking
- **Mobile ready**: Responsive design with front/back camera switching

### 🔧 Use Cases
- Employee time tracking and attendance systems
- Access control and security applications
- Customer identification in retail
- Automated photo capture for ID verification
- Face-based user authentication

### ⚡ Performance Optimizations
- Web Workers for face descriptor calculations
- Optimized detection intervals to balance accuracy and performance
- Memory-efficient canvas rendering
- Smart camera resource management
- Configurable detection thresholds for optimal performance

<!-- Auto Generated Below -->


## Overview

AI-powered face detection and recognition component
High-performance facial analysis with MediaPipe and TensorFlow.js
Optimized for real-time detection with Web Workers
Functions as a form input element for facial recognition data

## Properties

| Property                | Attribute                 | Description                                                                                                           | Type                                            | Default                                  |
| ----------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------------------------------- |
| `accessibilityLabel`    | `accessibility-label`     | ARIA label for accessibility                                                                                          | `string`                                        | `'Face detection and recognition input'` |
| `ariaDescribedby`       | `aria-describedby`        | ARIA description for accessibility                                                                                    | `string`                                        | `undefined`                              |
| `autoCapture`           | `auto-capture`            | Enable automatic photo capture when face is detected                                                                  | `boolean`                                       | `true`                                   |
| `autoFocus`             | `auto-focus`              | Auto-focus the detection when component loads                                                                         | `boolean`                                       | `false`                                  |
| `autoStart`             | `auto-start`              | Auto-start detection when component loads                                                                             | `boolean`                                       | `true`                                   |
| `captureDelay`          | `capture-delay`           | Delay between automatic photo captures in milliseconds                                                                | `number`                                        | `3000`                                   |
| `captureThreshold`      | `capture-threshold`       | Minimum confidence score for face detection to trigger photo capture                                                  | `number`                                        | `0.8`                                    |
| `customValidation`      | `custom-validation`       |                                                                                                                       | `(value: string) => boolean`                    | `undefined`                              |
| `detectionMode`         | `detection-mode`          | Detection mode: 'interval' for automatic detection every X ms, 'manual' for on-demand detection                       | `"interval" \| "manual"`                        | `'interval'`                             |
| `detectionTimer`        | `detection-timer`         | Detection timer interval in milliseconds                                                                              | `number`                                        | `1500`                                   |
| `disabled`              | `disabled`                | Whether the input is disabled                                                                                         | `boolean`                                       | `false`                                  |
| `enableDetection`       | `enable-detection`        | Enable or disable face detection                                                                                      | `boolean`                                       | `true`                                   |
| `facingMode`            | `facing-mode`             | Facing mode options following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front`                  |
| `flipButtonText`        | `flip-button-text`        | Text for the flip camera button                                                                                       | `string`                                        | `'Flip Camera'`                          |
| `height`                | `height`                  | Height of the video element                                                                                           | `number`                                        | `460`                                    |
| `name`                  | `name`                    | The name attribute for form submission                                                                                | `string`                                        | `undefined`                              |
| `placeholder`           | `placeholder`             | Placeholder text when no face is detected                                                                             | `string`                                        | `'No face detected'`                     |
| `readonly`              | `readonly`                | Whether the input is readonly                                                                                         | `boolean`                                       | `false`                                  |
| `required`              | `required`                | Whether the input is required for form validation                                                                     | `boolean`                                       | `false`                                  |
| `scoreThreshold`        | `score-threshold`         | Score threshold to detect a face                                                                                      | `number`                                        | `0.65`                                   |
| `showBoundingBoxes`     | `show-bounding-boxes`     | Show bounding boxes around detected faces                                                                             | `boolean`                                       | `true`                                   |
| `showControls`          | `show-controls`           | Show control buttons for starting/stopping detection                                                                  | `boolean`                                       | `true`                                   |
| `showLandmarks`         | `show-landmarks`          | Show face landmarks on detected faces                                                                                 | `boolean`                                       | `false`                                  |
| `startButtonText`       | `start-button-text`       | Text for the start detection button                                                                                   | `string`                                        | `'Start Detection'`                      |
| `stopButtonText`        | `stop-button-text`        | Text for the stop detection button                                                                                    | `string`                                        | `'Stop Detection'`                       |
| `tabOrder`              | `tab-order`               | Tab order for keyboard navigation                                                                                     | `number`                                        | `undefined`                              |
| `trainedModel`          | `trained-model`           | Trained models to use for recognition and best match                                                                  | `LabeledDescriptors[]`                          | `undefined`                              |
| `useOptimizedDetection` | `use-optimized-detection` | Use optimized Web Worker for face detection (recommended for better performance)                                      | `boolean`                                       | `true`                                   |
| `validationMessage`     | `validation-message`      | Form validation message                                                                                               | `string`                                        | `undefined`                              |
| `value`                 | `value`                   | The value of the input (JSON string of face detection data)                                                           | `string`                                        | `''`                                     |
| `width`                 | `width`                   | Width of the video element                                                                                            | `number`                                        | `460`                                    |


## Events

| Event               | Description                                            | Type                                                         |
| ------------------- | ------------------------------------------------------ | ------------------------------------------------------------ |
| `cameraError`       | Event emitted when camera encounters an error          | `CustomEvent<FaceDetectionError>`                            |
| `cameraStarted`     | Event emitted when camera starts successfully          | `CustomEvent<MediaStream>`                                   |
| `cameraStopped`     | Event emitted when camera stops                        | `CustomEvent<void>`                                          |
| `detectionStarted`  | Event emitted when detection starts                    | `CustomEvent<void>`                                          |
| `detectionStopped`  | Event emitted when detection stops                     | `CustomEvent<void>`                                          |
| `faceDetected`      | Event emitted when a face is detected in video stream  | `CustomEvent<iFaceDetected>`                                 |
| `faceStopDetection` | Event emitted when face detection was stopped          | `CustomEvent<void>`                                          |
| `facingModeChanged` | Event emitted when facing mode changes                 | `CustomEvent<CameraDirection.Front \| CameraDirection.Rear>` |
| `focusGained`       | Standard focus event                                   | `CustomEvent<FocusEvent>`                                    |
| `focusLost`         | Standard blur event                                    | `CustomEvent<FocusEvent>`                                    |
| `inputChange`       | Standard input event when face detection data changes  | `CustomEvent<Event>`                                         |
| `photoCapture`      | Event emitted when a photo is automatically captured   | `CustomEvent<Blob>`                                          |
| `validationFailed`  | Standard invalid event for form validation             | `CustomEvent<Event>`                                         |
| `valueChange`       | Standard change event when detection data is committed | `CustomEvent<Event>`                                         |


## Methods

### `checkValidity() => Promise<boolean>`

Check validity of the input

#### Returns

Type: `Promise<boolean>`



### `detectFaceManually() => Promise<iFaceDetected | null>`

Manually trigger a single face detection

#### Returns

Type: `Promise<iFaceDetected>`

Promise with detection result including landmarks

### `getBlobImageDescriptors(blob: Blob) => Promise<FaceLandmarkerResult>`

Giving a blob image, get the face landmarks

#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| `blob` | `Blob` |             |

#### Returns

Type: `Promise<FaceLandmarkerResult>`

face landmarks

### `getCurrentConfidence() => Promise<number | null>`

Get current face confidence score

#### Returns

Type: `Promise<number>`

Confidence score (0-1) or null if no face detected

### `getCurrentLandmarks() => Promise<any[] | null>`

Get current face landmarks if a face is detected

#### Returns

Type: `Promise<any[]>`

Array of landmark points or null if no face detected

### `getDiagnosticInfo() => Promise<any>`

Diagnostic method to check detection status

#### Returns

Type: `Promise<any>`



### `getFaceLandMarks() => Promise<FaceLandmarkerResult>`

Giving current face in video canvas, get the face landmarks

#### Returns

Type: `Promise<FaceLandmarkerResult>`

face landmarks

### `getFormValue() => Promise<string>`

Get the current form value

#### Returns

Type: `Promise<string>`



### `getValidationMessage() => Promise<string>`

Get validation message

#### Returns

Type: `Promise<string>`



### `initializeCamera() => Promise<void>`

Initialize camera and face detection

#### Returns

Type: `Promise<void>`



### `predictBestMatch(blob?: Blob) => Promise<any>`

Predicts best face match, uses worker to calculate distance between the given blob and the trained model
passed in trainedModel prop

#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| `blob` | `Blob` |             |

#### Returns

Type: `Promise<any>`



### `setBlur() => Promise<void>`

Blur the component (stop camera and detection)

#### Returns

Type: `Promise<void>`



### `setCustomValidity(message: string) => Promise<void>`

Set custom validity

#### Parameters

| Name      | Type     | Description |
| --------- | -------- | ----------- |
| `message` | `string` |             |

#### Returns

Type: `Promise<void>`



### `setDetectionMode(mode: "interval" | "manual") => Promise<void>`

Set detection mode programmatically

#### Parameters

| Name   | Type                     | Description                                                |
| ------ | ------------------------ | ---------------------------------------------------------- |
| `mode` | `"interval" \| "manual"` | 'interval' for automatic detection, 'manual' for on-demand |

#### Returns

Type: `Promise<void>`



### `setFocus() => Promise<void>`

Focus the component (start camera and detection)

#### Returns

Type: `Promise<void>`



### `setFormValue(value: string) => Promise<void>`

Set the form value

#### Parameters

| Name    | Type     | Description |
| ------- | -------- | ----------- |
| `value` | `string` |             |

#### Returns

Type: `Promise<void>`



### `startDetection() => Promise<void>`

Start face detection

#### Returns

Type: `Promise<void>`



### `stopDetection() => Promise<void>`

Stop face detection

#### Returns

Type: `Promise<void>`



### `toggleCamera() => Promise<void>`

Toggle camera between front and back

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
