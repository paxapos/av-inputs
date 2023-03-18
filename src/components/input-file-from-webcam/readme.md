# input-file-from-webcam



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                                                                                                                   | Type                                            | Default                 |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------- |
| `drawImageCb` | --            | you can pass a function and override the canvas.drawImage function so you can change the image adding filters or any kind of magin in your image  you just need to crear a function with all canvas.-drawImage arguments  here you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height | `Function`                                      | `null`                  |
| `facingMode`  | `facing-mode` | FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value                                                                                                                                                                                                                        | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front` |
| `height`      | `height`      |                                                                                                                                                                                                                                                                                                                                               | `number`                                        | `460`                   |
| `width`       | `width`       |                                                                                                                                                                                                                                                                                                                                               | `number`                                        | `460`                   |


## Events

| Event               | Description | Type                                                         |
| ------------------- | ----------- | ------------------------------------------------------------ |
| `facingModeChanged` |             | `CustomEvent<CameraDirection.Front \| CameraDirection.Rear>` |
| `pictureTaken`      |             | `CustomEvent<Blob>`                                          |


## Methods

### `resetCamera() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `takePic() => Promise<Blob>`



#### Returns

Type: `Promise<Blob>`



### `toggleCamera() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
