import { createVideo, createCanvas, CameraDirection, initWebcamToVideo, renderToCanvas, takePicture } from "./camera.service";



interface SuperCamera {
    initCamera(parentElement: HTMLElement, direction: CameraDirection, drawImageCb: Function): Promise<HTMLCanvasElement>,
    takePicture(): Promise<Blob>,
    resetCamera(): void,
}



export class WebCamera implements SuperCamera {

    private elVideo: HTMLVideoElement;
    private stream: MediaStream;
    private canvas: HTMLCanvasElement;


    public async initCamera( parentElement: HTMLElement, direction: CameraDirection, drawImageCb: Function = null) {

        this.resetCamera();

        if ( !this.elVideo ) {
            this.elVideo = createVideo()
        }

        if ( !this.canvas ) {
            this.canvas = createCanvas(parentElement)
            parentElement.appendChild(this.canvas)
        }

        initWebcamToVideo(this.elVideo, direction)

        renderToCanvas(this.canvas, this.elVideo, drawImageCb)

        return this.canvas
    }


    public resetCamera() {
        if (this.stream) this.stream?.getVideoTracks()?.forEach(track => {
            track?.stop()
            this.stream?.removeTrack(track)
        });
        if (this.elVideo) this.elVideo.srcObject = null;
    }

    public async takePicture(quality: number = 0.85): Promise<File> {
        return await takePicture(this.canvas, quality);
    }

}


export const camera = new WebCamera()
