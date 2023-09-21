# input-file-from-webcam



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                                                                                                                   | Type                                            | Default                 |
| ------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------- |
| `drawImageCb` | --            | you can pass a function and override the canvas.drawImage function so you can change the image adding filters or any kind of magin in your image  you just need to crear a function with all canvas.-drawImage arguments  here you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height | `Function`                                      | `null`                  |
| `facingMode`  | `facing-mode` | FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value                                                                                                                                                                                                                        | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front` |
| `height`      | `height`      | height of the video element                                                                                                                                                                                                                                                                                                                   | `number`                                        | `460`                   |
| `width`       | `width`       | Width of the video element                                                                                                                                                                                                                                                                                                                    | `number`                                        | `460`                   |


## Events

| Event               | Description                                 | Type                                                         |
| ------------------- | ------------------------------------------- | ------------------------------------------------------------ |
| `facingModeChanged` | Event emitted when the user takes a picture | `CustomEvent<CameraDirection.Front \| CameraDirection.Rear>` |
| `pictureTaken`      | Event emitted when the user takes a picture | `CustomEvent<Blob>`                                          |


## Methods

### `resetCamera() => Promise<void>`

Reset camera

#### Returns

Type: `Promise<void>`



### `takePic() => Promise<Blob>`

Take a picture

#### Returns

Type: `Promise<Blob>`

a blob with the image

### `toggleCamera() => Promise<void>`

Toogle webcam, for example in mobile show front or back camera

#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
