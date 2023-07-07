# input-face-api-webcam



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type                                            | Default                 |
| ---------------- | ----------------- | ----------- | ----------------------------------------------- | ----------------------- |
| `detectionTimer` | `detection-timer` |             | `number`                                        | `1500`                  |
| `facingMode`     | `facing-mode`     |             | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front` |
| `height`         | `height`          |             | `number`                                        | `460`                   |
| `scoreThreshold` | `score-threshold` |             | `number`                                        | `0.65`                  |
| `width`          | `width`           |             | `number`                                        | `460`                   |


## Events

| Event               | Description | Type                        |
| ------------------- | ----------- | --------------------------- |
| `faceDetected`      |             | `CustomEvent<DetectionImg>` |
| `faceStopDetection` |             | `CustomEvent<void>`         |


## Methods

### `getFaceLandMarks() => Promise<FaceLandmarkerResult>`



#### Returns

Type: `Promise<FaceLandmarkerResult>`



### `startDetection() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `stopDetection() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
