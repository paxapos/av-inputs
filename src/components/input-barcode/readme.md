# input-barcode



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute     | Description                                                                                                                | Type                            | Default                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| ------------------ | ------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cameraConfig`     | --            | Cualquiera de estas configuraciones https://scanapp.org/html5-qrcode-docs/docs/apis/interfaces/Html5QrcodeCameraScanConfig | `Html5QrcodeCameraScanConfig`   | `{     fps: 10,        }`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `cameraId`         | `camera-id`   | id of camera                                                                                                               | `string`                        | `undefined`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `facingMode`       | `facing-mode` | Camera user or enviroment                                                                                                  | `"enviroment" \| "user"`        | `'enviroment'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `height`           | `height`      | Height of the camera                                                                                                       | `string`                        | `'200px'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| `supportedFormats` | --            | All formats of camera                                                                                                      | `Html5QrcodeSupportedFormats[]` | `[     Html5QrcodeSupportedFormats.QR_CODE,     Html5QrcodeSupportedFormats.AZTEC,     Html5QrcodeSupportedFormats.CODABAR,     Html5QrcodeSupportedFormats.CODE_39,     Html5QrcodeSupportedFormats.CODE_93,     Html5QrcodeSupportedFormats.CODE_128,     Html5QrcodeSupportedFormats.DATA_MATRIX,     Html5QrcodeSupportedFormats.MAXICODE,     Html5QrcodeSupportedFormats.ITF,     Html5QrcodeSupportedFormats.EAN_13,     Html5QrcodeSupportedFormats.EAN_8,     Html5QrcodeSupportedFormats.PDF_417,     Html5QrcodeSupportedFormats.RSS_14,     Html5QrcodeSupportedFormats.RSS_EXPANDED,     Html5QrcodeSupportedFormats.UPC_A,     Html5QrcodeSupportedFormats.UPC_E,     Html5QrcodeSupportedFormats.UPC_EAN_EXTENSION   ]` |
| `width`            | `width`       | Width of the camera                                                                                                        | `string`                        | `'400px'`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              |


## Events

| Event  | Description | Type                  |
| ------ | ----------- | --------------------- |
| `scan` |             | `CustomEvent<string>` |


## Methods

### `getCameras() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `getState() => Promise<Html5QrcodeScannerState>`



#### Returns

Type: `Promise<Html5QrcodeScannerState>`



### `start() => Promise<never>`



#### Returns

Type: `Promise<never>`



### `stop() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
