export enum CameraDirection {
    Rear = "REAR",
    Front = "FRONT"
}

/**
 * Crea un HTMLVideoElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement 
 */
export  function createVideo(): HTMLVideoElement {
        
    // no existe, lo creo
    const video = document.createElement("video")
    video.autoplay = true;
    video.style.display = "none"

    return video
}


/**
 * Crea un HTMLCanvasElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement 
 */
export  function createCanvas( parentElement: HTMLElement ): HTMLCanvasElement {
        
    // no existe, lo creo
    const canvas = document.createElement("canvas")
    canvas.width = parseInt( parentElement.getAttribute("width") );
    canvas.height = parseInt( parentElement.getAttribute("height") );
    return canvas

}


export function initWebcamToVideo(video, direction: CameraDirection = CameraDirection.Front) {
        
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
            video.srcObject = stream;
        })
        .catch(function (err0r) {
            console.log("Something went wrong!", err0r);
        });
    }
}