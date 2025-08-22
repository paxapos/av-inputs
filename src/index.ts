export * from './components';

// Export types and interfaces used by components
export { CameraDirection } from './utils/camera.service';
export type { LabeledDescriptorsArray } from './components/input-face-api-webcam/TrainedModel';
export type { FaceDetectionError, iFaceDetected } from './components/input-face-api-webcam/input-face-api-webcam';
export type { DetectionImg } from './utils/facepi.service';
export type { WebcamError } from './components/input-file-from-webcam/input-file-from-webcam';
export type { InputScanData } from './components/input-scan-reader/input-scan-reader.types';
