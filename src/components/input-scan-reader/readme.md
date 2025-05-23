# input-scan-reader



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description                                                          | Type     | Default           |
| ------------ | ------------- | -------------------------------------------------------------------- | -------- | ----------------- |
| `modalTimer` | `modal-timer` | Show a modal with the scanned text. like a white blink on the screen | `number` | `0`               |
| `scanTitle`  | `scan-title`  |                                                                      | `string` | `'Scanning Text'` |


## Events

| Event  | Description                                                                   | Type                         |
| ------ | ----------------------------------------------------------------------------- | ---------------------------- |
| `scan` | Fired when the user press enter or tab used with scanners like BARCODES or QR | `CustomEvent<InputScanData>` |


## Methods

### `getData() => Promise<InputScanData>`

Structured scanned text

#### Returns

Type: `Promise<InputScanData>`

the text scanned

### `getText() => Promise<string>`

get raw scanned text

#### Returns

Type: `Promise<string>`

the text scanned

### `start() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `stop() => Promise<void>`



#### Returns

Type: `Promise<void>`




----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
