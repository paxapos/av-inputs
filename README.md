# input-file-from-webcam
stencil.js component that shows the webcam and allow you to take pictures easily and changes from to back camera with one click


```html
<input-file-from-webcam id="my-input"></input-file-from-webcam>
```

![image](https://user-images.githubusercontent.com/222193/225028312-5d30ae4c-4c49-4665-9d49-6d0977e5e2d9.png)






# How it works?

just add:

npm install https://github.com/alevilar/input-file-from-webcam





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
