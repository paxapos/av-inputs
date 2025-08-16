# AV-Inputs - Professional Web Components Library

A high-performance StencilJS library providing optimized web components for camera, barcode scanning, and data input operations. Built for production environments with focus on performance, reliability, and cross-browser compatibility.

## 🎯 Components Overview

### 📷 input-barcode
**Camera-based barcode/QR scanner**
- Uses device camera for real-time scanning
- Supports 17+ barcode formats (QR, Code128, EAN, UPC, etc.)
- Optimized for continuous scanning with duplicate prevention
- Perfect for: POS systems, inventory management, product lookup

### ⌨️ input-scan-reader  
**Hardware barcode scanner input**
- Captures input from physical barcode scanners (HID keyboard devices)
- Intelligent text processing for documents (DNI, licenses)
- Background operation without UI interference  
- Perfect for: Dedicated scanner setups, access control, document verification

### 🤖 input-face-api-webcam
**AI-powered face detection & recognition**
- Real-time face detection using MediaPipe/TensorFlow.js
- Custom face recognition with trained models
- Auto photo capture with confidence thresholds
- Perfect for: Employee attendance, access control, ID verification

### 📸 input-file-from-webcam
**Simple webcam photo capture**
- Streamlined photo capture with one click
- Front/back camera switching
- Custom image processing support
- Perfect for: Employee check-ins, profile photos, quick documentation

## 🔧 Key Differences

| Feature | input-barcode | input-scan-reader | input-face-api-webcam | input-file-from-webcam |
|---------|---------------|-------------------|----------------------|----------------------|
| **Input Method** | Camera scanning | Hardware scanner | AI face detection | Camera photo |
| **Processing** | Real-time decode | Keyboard events | Neural networks | Simple capture |
| **Performance** | Medium CPU | Minimal CPU | High CPU | Low CPU |
| **Use Case** | Mobile/tablet scanning | Fixed scanner stations | Security/attendance | Quick photos |

## ⚡ Performance Features

- **Memory efficient**: Automatic cleanup and resource management
- **Web Workers**: Heavy computations don't block UI
- **Optimized scanning**: Intelligent duplicate prevention and timeouts  
- **Error recovery**: Robust error handling with automatic restart
- **Cross-platform**: Works on desktop, mobile, and tablets

## 🚀 Quick Start

```html
<!-- Camera barcode scanning -->
<input-barcode 
  facing-mode="environment" 
  width="400px" 
  height="300px">
</input-barcode>

<!-- Hardware scanner input -->
<input-scan-reader 
  scan-title="Scan ID Card"
  modal-timer="2000">
</input-scan-reader>

<!-- Face detection -->
<input-face-api-webcam 
  auto-capture="true"
  score-threshold="0.8">
</input-face-api-webcam>

<!-- Simple photo capture -->
<input-file-from-webcam 
  auto-start="true"
  image-quality="0.9">
</input-file-from-webcam>
```





```js
const elInputFileFromWebcam = document.getElementById("my-input");
    elInputFileFromWebcam.addEventListener("click", (ev) => {

    elInputFileFromWebcam.takePic().then( (pic) => console.info("here is your picture", pic))
});
```


# Properties

## width 
defaults to 460px
in canvas you must set always the width

## height 
defaults to 460px
in canvas you must set always the height

## facing-mode 
we uses "user" or "environment" but you have others. If you don't write this property. the element will change facinbg Mode each time you click the element

For more FacingModel optiones you cant read here https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode#value

## callback for drawing on canvas 
you can override the default behaviour by adding a callback function here.
if you put something here. will execute this function for doing a canvas.drawImage

you must call 
ctx.drawImage(this.elVideo, left, top, imgSize, imgSize, 0,0, this.canvas.width, this.canvas.height)
inside your function

we are just bypassing the callback function

```js
let ctx = this.canvas.getContext('2d');
functionCallback.call(ctx, elVideo, left, top, imgSize, imgSize, 0,0, this.canvas.width, this.canvas.height);
```js


# Methods

## takePic
you can easily take a picture by calling this method in your element

```js
    elInputFileFromWebcam.takePic().then( (pic) => console.info("here is your picture", pic))
```


## toggleCamera
Change front or back camera

```js
    elInputFileFromWebcam.toggleCamera()
```



# Events

## pictureTaken
returns a File

```js
    elInputFileFromWebcam.addEventListener("pictureTaken", (pic) => console.info("here is my pic from callback", pic))
```



## facingModeChanged
returns a ConstrainDOMString each time a FacingModel was changed
```js
    elInputFileFromWebcam.addEventListener("facingModeChanged", (fm) => console.info("here is your facing Mode now", fm))
```
