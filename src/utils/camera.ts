import { Camera, CameraResultType } from '@capacitor/camera';

export class CameraService {

    elVideo: HTMLVideoElement;
    stream: MediaStream;
    canvas: HTMLCanvasElement;
    constructor() {
    }

    public fotoActual: any;


    async capacitorTakePicture() {
        const image = await Camera.getPhoto({
            quality: 90,
            allowEditing: true,
            resultType: CameraResultType.Base64
          });

          /*
          const blob = new Blob([new Uint8Array(decode(image.base64String))], {
            type: `image/${image.format}`,
        });
        */
        
         return image;
    }

    async initCamera( elVideo: HTMLVideoElement, elCanvas: HTMLCanvasElement, facingMode: ConstrainDOMString = {exact: "user"}, drawImageCb: Function = null ) {
        
       console.info( await this.capacitorTakePicture() )
        
        this.resetCamera();
        this.elVideo = elVideo;
        this.canvas = elCanvas
        
        this.elVideo.parentNode.insertBefore(this.canvas, this.elVideo.nextSibling);


        if (navigator?.mediaDevices?.getUserMedia) {
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

    async takePic(): Promise<File> {
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

export const camera = new CameraService();
