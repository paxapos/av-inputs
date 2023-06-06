# input-face-api-webcam



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description                | Type                                            | Default                 |
| ---------------- | ----------------- | -------------------------- | ----------------------------------------------- | ----------------------- |
| `detectionTimer` | `detection-timer` |                            | `number`                                        | `1500`                  |
| `facingMode`     | `facing-mode`     |                            | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front` |
| `height`         | `height`          |                            | `number`                                        | `460`                   |
| `inputSize`      | `input-size`      | Minimun input size of face | `number`                                        | `192`                   |
| `scoreThreshold` | `score-threshold` |                            | `number`                                        | `0.7`                   |
| `width`          | `width`           |                            | `number`                                        | `460`                   |


## Events

| Event               | Description | Type                         |
| ------------------- | ----------- | ---------------------------- |
| `faceDetected`      |             | `CustomEvent<iFaceDetected>` |
| `faceStopDetection` |             | `CustomEvent<void>`          |


## Methods

### `startDetection() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `stopDetection() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
