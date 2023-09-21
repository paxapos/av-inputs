
import {
    FaceDetector,
    FilesetResolver,
    Detection,
    FaceLandmarker,
    FaceLandmarkerResult,
    ImageSource
  } from "@mediapipe/tasks-vision";
import { videoToBlob } from "./camera.service";


 export interface DetectionImg{
    detection: Detection,
    currentTarget: HTMLImageElement|HTMLVideoElement|HTMLCanvasElement,
    blobImg: Blob,
  }
  


  

  
/**
 * create a class "FaceapiService" with a constructor
 * 
*/
export class FaceapiService {

    private faceDetector: FaceDetector;
    private landmarksDetector: FaceLandmarker;


    constructor(private readonly minDetectionConfidence = 0.6) {
     
    }

    async initialize() {
      this.initializefaceDetector(this.minDetectionConfidence);
      this.initFaceLandmarkerDetector();
      return this;
    }



    async initFaceLandmarkerDetector() {

      const filesetResolver = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
      );
      let runningMode: "IMAGE" | "VIDEO" = "IMAGE";
      this.landmarksDetector = await FaceLandmarker.createFromOptions(filesetResolver, {
        baseOptions: {
          modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
          delegate: "GPU"
        },
        outputFaceBlendshapes: true,
        runningMode,
        numFaces: 1
      });
    }

    // Initialize the object detector
    async initializefaceDetector ( minDetectionConfidence ) {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        this.faceDetector = await FaceDetector.createFromOptions(vision, {
          minSuppressionThreshold: 0.3,
          minDetectionConfidence: minDetectionConfidence,
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_detector/blaze_face_short_range/float16/1/blaze_face_short_range.tflite`,
            delegate: "GPU"
          },
          runningMode: "VIDEO",
        });
      };

    checkInitialized() {
      if ( !this.landmarksDetector ) throw new Error("Aun no se cargo el model de face detection")
    }

    async getFaceLandmarksFromBlob(blob:Blob):  Promise<FaceLandmarkerResult> {
      this.checkInitialized()

      let imag: ImageSource = await createImageBitmap(blob)
      
      return this.landmarksDetector.detect(imag)
    }

    async detectFace(el:HTMLVideoElement, timeStamp: DOMHighResTimeStamp):  Promise<DetectionImg> {

      if ( el && this.faceDetector ) {
         
          const detection = this.faceDetector.detectForVideo(el, timeStamp).detections;

          if ( !detection ) {
            return null
          }
          
          let detectionObj: Detection;

          if ( detection.length == 1 ) {
              detectionObj = detection[0]
          }

          if ( detection.length > 1 ) {
              const sorted = detection.sort((a,b) => {
                  return b.categories[0].score - a.categories[0].score
              })
              detectionObj = sorted[0]
          }
          
          return await this.getDetectorImgFromDetection(el, detectionObj)
        }

        return null
    }

    async getDetectorImgFromDetection(el, detection: Detection): Promise<DetectionImg> {
      // recortar canvas del el para que tenga el tamaño de la detección
      if ( !detection || !detection.boundingBox) {
        return null
      }
      
      const blob = await videoToBlob(el, detection.boundingBox)
        return {
            detection: detection,
            currentTarget: el,
            blobImg: blob
        }
    }
}


export const faceapiService = new FaceapiService()