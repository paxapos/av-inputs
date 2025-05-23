# input-face-api-webcam



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                                           | Type                                            | Default                 |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------- |
| `autoCapture`       | `auto-capture`        | Enable automatic photo capture when face is detected                                                                  | `boolean`                                       | `true`                  |
| `autoStart`         | `auto-start`          | Auto-start detection when component loads                                                                             | `boolean`                                       | `true`                  |
| `captureDelay`      | `capture-delay`       | Delay between automatic photo captures in milliseconds                                                                | `number`                                        | `3000`                  |
| `captureThreshold`  | `capture-threshold`   | Minimum confidence score for face detection to trigger photo capture                                                  | `number`                                        | `0.8`                   |
| `detectionTimer`    | `detection-timer`     | Detection timer interval in milliseconds                                                                              | `number`                                        | `1500`                  |
| `enableDetection`   | `enable-detection`    | Enable or disable face detection                                                                                      | `boolean`                                       | `true`                  |
| `facingMode`        | `facing-mode`         | Facing mode options following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front` |
| `flipButtonText`    | `flip-button-text`    | Text for the flip camera button                                                                                       | `string`                                        | `'Flip Camera'`         |
| `height`            | `height`              | Height of the video element                                                                                           | `number`                                        | `460`                   |
| `scoreThreshold`    | `score-threshold`     | Score threshold to detect a face                                                                                      | `number`                                        | `0.65`                  |
| `showBoundingBoxes` | `show-bounding-boxes` | Show bounding boxes around detected faces                                                                             | `boolean`                                       | `true`                  |
| `showControls`      | `show-controls`       | Show control buttons for starting/stopping detection                                                                  | `boolean`                                       | `true`                  |
| `showLandmarks`     | `show-landmarks`      | Show face landmarks on detected faces                                                                                 | `boolean`                                       | `false`                 |
| `startButtonText`   | `start-button-text`   | Text for the start detection button                                                                                   | `string`                                        | `'Start Detection'`     |
| `stopButtonText`    | `stop-button-text`    | Text for the stop detection button                                                                                    | `string`                                        | `'Stop Detection'`      |
| `trainedModel`      | `trained-model`       | Trained models to use for recognition and best match                                                                  | `LabeledDescriptors[]`                          | `undefined`             |
| `width`             | `width`               | Width of the video element                                                                                            | `number`                                        | `460`                   |


## Events

| Event               | Description                                           | Type                                                         |
| ------------------- | ----------------------------------------------------- | ------------------------------------------------------------ |
| `cameraError`       | Event emitted when camera encounters an error         | `CustomEvent<FaceDetectionError>`                            |
| `cameraStarted`     | Event emitted when camera starts successfully         | `CustomEvent<MediaStream>`                                   |
| `cameraStopped`     | Event emitted when camera stops                       | `CustomEvent<void>`                                          |
| `detectionStarted`  | Event emitted when detection starts                   | `CustomEvent<void>`                                          |
| `detectionStopped`  | Event emitted when detection stops                    | `CustomEvent<void>`                                          |
| `faceDetected`      | Event emitted when a face is detected in video stream | `CustomEvent<DetectionImg>`                                  |
| `faceStopDetection` | Event emitted when face detection was stopped         | `CustomEvent<void>`                                          |
| `facingModeChanged` | Event emitted when facing mode changes                | `CustomEvent<CameraDirection.Front \| CameraDirection.Rear>` |
| `photoCapture`      | Event emitted when a photo is automatically captured  | `CustomEvent<Blob>`                                          |


## Methods

### `getBlobImageDescriptors(blob: Blob) => Promise<FaceLandmarkerResult>`

Giving a blob image, get the face landmarks

#### Parameters

| Name   | Type   | Description |
| ------ | ------ | ----------- |
| `blob` | `Blob` |             |

#### Returns

Type: `Promise<FaceLandmarkerResult>`

face landmarks

### `getDiagnosticInfo() => Promise<any>`

Diagnostic method to check detection status

#### Returns

Type: `Promise<any>`



### `getFaceLandMarks() => Promise<FaceLandmarkerResult>`

Giving current face in video canvas, get the face landmarks

#### Returns

Type: `Promise<FaceLandmarkerResult>`

face landmarks

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
