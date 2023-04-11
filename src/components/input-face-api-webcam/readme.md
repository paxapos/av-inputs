# input-face-api-webcam



<!-- Auto Generated Below -->


## Properties

| Property         | Attribute         | Description | Type     | Default |
| ---------------- | ----------------- | ----------- | -------- | ------- |
| `detectionTimer` | `detection-timer` |             | `number` | `1000`  |
| `height`         | `height`          |             | `number` | `460`   |
| `width`          | `width`           |             | `number` | `460`   |


## Events

| Event               | Description | Type                |
| ------------------- | ----------- | ------------------- |
| `faceDetected`      |             | `CustomEvent<Blob>` |
| `faceStopDetection` |             | `CustomEvent<void>` |


## Methods

### `startDetection() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `stopDetection() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
