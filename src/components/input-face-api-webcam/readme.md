# input-face-api-webcam



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute          | Description                                                                                                            | Type                                            | Default                 |
| ----------------- | ------------------ | ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------- |
| `detectionTimer`  | `detection-timer`  | Score threshold to detect a face                                                                                       | `number`                                        | `1500`                  |
| `enableDetection` | `enable-detection` | disable face detection                                                                                                 | `boolean`                                       | `true`                  |
| `facingMode`      | `facing-mode`      | FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front` |
| `height`          | `height`           | height of the video element                                                                                            | `number`                                        | `460`                   |
| `scoreThreshold`  | `score-threshold`  | Score threshold to detect a face                                                                                       | `number`                                        | `0.65`                  |
| `trainedModel`    | --                 | trained models to use for recognition an best match                                                                    | `LabeledDescriptors[]`                          | `undefined`             |
| `width`           | `width`            | Width of the video element                                                                                             | `number`                                        | `460`                   |


## Events

| Event               | Description                                           | Type                        |
| ------------------- | ----------------------------------------------------- | --------------------------- |
| `faceDetected`      | Event emitted when a face is detected in video stream | `CustomEvent<DetectionImg>` |
| `faceStopDetection` | Event emitted when face detection whas stopped        | `CustomEvent<void>`         |


## Methods

### `getBlobImageDescriptors(blob: Blob) => Promise<FaceLandmarkerResult>`

Giving a blob image, get the face landmarks

#### Returns

Type: `Promise<FaceLandmarkerResult>`

face landmarks

### `getFaceLandMarks() => Promise<FaceLandmarkerResult>`

Giving current face in video canvas, get the face landmarks

#### Returns

Type: `Promise<FaceLandmarkerResult>`

face landmarks

### `predictBestMatch(blob?: Blob) => Promise<any>`

Predicts best face match, uses worker to calculate distance between the given blob and the trained model 
passed in trainedModel prop

#### Returns

Type: `Promise<any>`



### `startDetection() => Promise<void>`

enable face detection

#### Returns

Type: `Promise<void>`



### `stopDetection() => Promise<void>`

disable face detection

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
