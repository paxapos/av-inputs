# input-file-from-webcam



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute             | Description                                                                                                                                                                                                                                                                                                                                   | Type                                            | Default                 |
| ------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ----------------------- |
| `autoStart`         | `auto-start`          | Auto-start camera when component loads                                                                                                                                                                                                                                                                                                        | `boolean`                                       | `true`                  |
| `captureButtonText` | `capture-button-text` | Capture button text                                                                                                                                                                                                                                                                                                                           | `string`                                        | `'📸'`                  |
| `drawImageCb`       | `draw-image-cb`       | you can pass a function and override the canvas.drawImage function so you can change the image adding filters or any kind of magin in your image  you just need to crear a function with all canvas.-drawImage arguments  here you have the list of vars you get: videoElement, left, top, imgSize, imgSize, 0,0, canvas.width, canvas.height | `Function`                                      | `null`                  |
| `facingMode`        | `facing-mode`         | FacingModel optiones following https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value                                                                                                                                                                                                                        | `CameraDirection.Front \| CameraDirection.Rear` | `CameraDirection.Front` |
| `flashEffect`       | `flash-effect`        | Enable flash effect when taking picture                                                                                                                                                                                                                                                                                                       | `boolean`                                       | `true`                  |
| `flipButtonText`    | `flip-button-text`    | Flip camera button text                                                                                                                                                                                                                                                                                                                       | `string`                                        | `'🔄'`                  |
| `height`            | `height`              | height of the video element                                                                                                                                                                                                                                                                                                                   | `number`                                        | `460`                   |
| `imageQuality`      | `image-quality`       | Image quality for captured photos (0.1 to 1.0)                                                                                                                                                                                                                                                                                                | `number`                                        | `0.85`                  |
| `showControls`      | `show-controls`       | Show camera controls (flip, capture button, etc)                                                                                                                                                                                                                                                                                              | `boolean`                                       | `true`                  |
| `width`             | `width`               | Width of the video element                                                                                                                                                                                                                                                                                                                    | `number`                                        | `460`                   |


## Events

| Event               | Description                                   | Type                                                         |
| ------------------- | --------------------------------------------- | ------------------------------------------------------------ |
| `cameraError`       | Event emitted when camera encounters an error | `CustomEvent<WebcamError>`                                   |
| `cameraStarted`     | Event emitted when camera starts successfully | `CustomEvent<void>`                                          |
| `cameraStopped`     | Event emitted when camera stops               | `CustomEvent<void>`                                          |
| `facingModeChanged` | Event emitted when facing mode changes        | `CustomEvent<CameraDirection.Front \| CameraDirection.Rear>` |
| `pictureTaken`      | Event emitted when the user takes a picture   | `CustomEvent<Blob>`                                          |


## Methods

### `resetCamera() => Promise<void>`

Reset camera

#### Returns

Type: `Promise<void>`



### `startCamera() => Promise<void>`

Start the camera

#### Returns

Type: `Promise<void>`



### `stopCamera() => Promise<void>`

Stop the camera

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
