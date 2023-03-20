import { Camera, CameraDirection, CameraResultType } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';


interface SuperCamera {
    initCamera(parentElement: HTMLElement, direction: CameraDirection, drawImageCb: Function): Promise<void>,
    takePicture(): Promise<Blob>,
    resetCamera(): void,
}


export class WebCamera implements SuperCamera {

    elVideo: HTMLVideoElement;
    stream: MediaStream;
    canvas: HTMLCanvasElement;
    direction: CameraDirection

    constructor() {
    }

    public fotoActual: any;

    async initCamera( parentElement: HTMLElement, direction: CameraDirection, drawImageCb: Function = null ) {
        
        this.resetCamera();

        const videos = parentElement.getElementsByTagName("video");
        if ( videos.length == 0 ) {
            this.elVideo = document.createElement("video")
            this.elVideo.autoplay = true;
            this.elVideo.style.display = "none"
            parentElement.appendChild( this.elVideo )
        } else {
            this.elVideo = videos[0]
        }
        
        const canvasss = parentElement.getElementsByTagName("canvas");
        if ( canvasss.length === 0 ) {
            this.canvas = document.createElement("canvas")
            this.canvas.width = parseInt( parentElement.getAttribute("width") );
            this.canvas.height = parseInt( parentElement.getAttribute("height") );
            parentElement.appendChild( this.canvas )
        } else {
            this.canvas = canvasss[0]
        }


        this.direction = CameraDirection.Front
        
        if (navigator.mediaDevices.getUserMedia) {
            console.info("la camara")
            const facingMode = (direction == CameraDirection.Front) ? "user": "environment"

            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: { min: 200 },
                    height: { min: 200 },
                    facingMode: facingMode
                }
            })
            .then((stream) => {
                this.stream = stream;
                console.info("la camara", this.stream)
                this.elVideo.srcObject = this.stream;

                this.renderToCanvas( drawImageCb );
            })
            .catch(function (err0r) {
                console.log("Something went wrong!", err0r);
            });
        }
    }


    renderToCanvas( drawImageCb: Function = null) {

        let ctx = this.canvas.getContext('2d');

        let imgWidth = this.elVideo.videoWidth;
        let imgHeight = this.elVideo.videoHeight;

    	var imgSize = Math.min(imgWidth, imgHeight);
        // The following two lines yield a central based cropping.
        // They can both be amended to be 0, if you wish it to be
        // a left based cropped image.
    	var left = (imgWidth - imgSize) / 2;
    	var top = (imgHeight - imgSize) / 2;

        if ( typeof drawImageCb == 'function' ) {
            drawImageCb.call(ctx, this.elVideo, left, top, imgSize, imgSize, 0,0, this.canvas.width, this.canvas.height)
        } else {
            ctx.drawImage(this.elVideo, left, top, imgSize, imgSize, 0,0, this.canvas.width, this.canvas.height);
        }

        requestAnimationFrame(() => this.renderToCanvas() );

    }

    resetCamera() {
        if (this.stream) this.stream?.getVideoTracks()?.forEach(track => {
            track?.stop()
            this.stream?.removeTrack(track)
        });
        if (this.elVideo) this.elVideo.srcObject = null;
    }

    async takePicture(): Promise<File> {
        return new Promise((resolve, reject) => {
            try {
                this.canvas.toBlob( (blob) => {
                    const filename = "pic_" + Math.abs( Math.round( Math.random() * 1000))
                    var file = new File([blob], filename, {type: "image/jpeg"});
                    resolve(file);
                }, "image/jpeg", 0.8)
            } catch (error) {
                reject(error);
            }

          });

    }

}


export class CapacitorCamera implements SuperCamera {

    async initCamera( ) {

    }

    async takePicture(): Promise<Blob>{
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            direction: CameraDirection.Front,
            resultType: CameraResultType.Base64
          });

        const base64Data = image.base64String;
        const contentType = 'image/jpeg'; // or image/png, depending on the format of the image
        const byteCharacters = atob(base64Data);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: contentType });
        return blob;
    }

    resetCamera(): void{

    }

}

export class CameraService {

    private camaraManager: SuperCamera

    constructor() {
        if ( Capacitor.getPlatform() !== 'web' ) {
        //    this.camaraManager = new CapacitorCamera()
        }
        this.camaraManager = new WebCamera()
    }


    async initCamera( parentElement: HTMLElement, cameraDirection: CameraDirection , drawImageCb: Function = null ) {
       this.camaraManager.initCamera( parentElement, cameraDirection, drawImageCb )
    }

    async takePicture(): Promise<Blob> {
        return await this.camaraManager.takePicture()
    }

    async resetCamera() {
        return await this.camaraManager.resetCamera()
    }
}



export const camera = new CameraService()
