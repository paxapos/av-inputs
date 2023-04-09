export enum CameraDirection {
    Rear = "REAR",
    Front = "FRONT"
}

/**
 * Crea un HTMLVideoElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement 
 */
export  function createVideo( parentElement: HTMLElement ): HTMLVideoElement {
        
    // agarro los que tienen tag video
    const videos = parentElement.getElementsByTagName("video");
    if ( videos.length > 0 ) {
        // si existen devuelvo del 1ero (deberia haber solo 1)
        return videos[0]
    }
    
    // no existe, lo creo
    const video = document.createElement("video")
    video.autoplay = true;
    video.style.display = "none"
    parentElement.appendChild( video )

    return video
}


/**
 * Crea un HTMLCanvasElement en el parentElement dado, siempre y cuando no exista
 * @param parentElement 
 */
export  function createCanvas( parentElement: HTMLElement ): HTMLCanvasElement {
    
    // agarro los que tienen tag canvas
    const canvasss = parentElement.getElementsByTagName("canvas");
    if ( canvasss.length ) {
        // si existen devuelvo del 1ero (deberia haber solo 1)
        return  canvasss[0]
        
    }
    
    // no existe, lo creo
    const canvas = document.createElement("canvas")
    canvas.width = parseInt( parentElement.getAttribute("width") );
    canvas.height = parseInt( parentElement.getAttribute("height") );
    parentElement.appendChild( canvas )
    
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