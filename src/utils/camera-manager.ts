import { createVideo, createCanvas, CameraDirection, initWebcamToVideo, renderToCanvas } from "./camera.service";

interface CameraManager {
  initCamera(parentElement: HTMLElement, direction: CameraDirection, drawImageCb: Function): Promise<HTMLCanvasElement>;
  takePicture(): Promise<Blob>;
  resetCamera(): void;
  isActive(): boolean;
  getId(): string;
}

export class WebCameraInstance implements CameraManager {
  private elVideo: HTMLVideoElement;
  private stream: MediaStream;
  private canvas: HTMLCanvasElement;
  private id: string;
  private active: boolean = false;

  constructor(id: string) {
    this.id = id;
  }

  public getId(): string {
    return this.id;
  }

  public isActive(): boolean {
    return this.active;
  }

  public async initCamera(parentElement: HTMLElement, direction: CameraDirection, drawImageCb: Function = null): Promise<HTMLCanvasElement> {
    // Detener cualquier cámara activa antes de iniciar esta
    await CameraInstanceManager.stopAllExcept(this.id);

    this.resetCamera();

    if (!this.elVideo) {
      this.elVideo = createVideo();
    }

    if (!this.canvas) {
      this.canvas = createCanvas(parentElement);
      parentElement.appendChild(this.canvas);
    }

    try {
      this.stream = await initWebcamToVideo(this.elVideo, direction);
      this.active = true;
      CameraInstanceManager.setActiveCamera(this.id);

      // Esperar a que el video esté listo antes de renderizar
      await this.waitForVideoReady();
      renderToCanvas(this.canvas, this.elVideo, drawImageCb);

      return this.canvas;
    } catch (error) {
      this.active = false;
      throw error;
    }
  }

  private waitForVideoReady(): Promise<void> {
    return new Promise((resolve) => {
      if (this.elVideo.readyState >= 2) {
        resolve();
      } else {
        this.elVideo.onloadeddata = () => {
          resolve();
        };
      }
    });
  }

  public resetCamera(): void {
    this.active = false;

    if (this.stream) {
      this.stream.getVideoTracks().forEach(track => {
        track.stop();
        this.stream.removeTrack(track);
      });
      this.stream = null;
    }

    if (this.elVideo) {
      this.elVideo.srcObject = null;
    }

    // Limpiar del manager global
    if (CameraInstanceManager.getActiveCamera() === this.id) {
      CameraInstanceManager.setActiveCamera(null);
    }
  }

  public async takePicture(quality: number = 0.85): Promise<Blob> {
    if (!this.active || !this.canvas) {
      throw new Error('Camera is not active or initialized');
    }

    return new Promise((resolve, reject) => {
      try {
        this.canvas.toBlob((blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error('Failed to capture image'));
          }
        }, "image/jpeg", quality);
      } catch (error) {
        reject(error);
      }
    });
  }
}

/**
 * Gestor global de instancias de cámara para evitar conflictos
 */
class CameraInstanceManager {
  private static instances: Map<string, WebCameraInstance> = new Map();
  private static activeCamera: string | null = null;

  static createInstance(id: string): WebCameraInstance {
    if (this.instances.has(id)) {
      return this.instances.get(id)!;
    }

    const instance = new WebCameraInstance(id);
    this.instances.set(id, instance);
    return instance;
  }

  static async stopAllExcept(excludeId: string): Promise<void> {
    const stopPromises: Promise<void>[] = [];

    this.instances.forEach((instance, id) => {
      if (id !== excludeId && instance.isActive()) {
        stopPromises.push(Promise.resolve(instance.resetCamera()));
      }
    });

    await Promise.all(stopPromises);
  }

  static setActiveCamera(id: string | null): void {
    this.activeCamera = id;
  }

  static getActiveCamera(): string | null {
    return this.activeCamera;
  }

  static removeInstance(id: string): void {
    const instance = this.instances.get(id);
    if (instance) {
      instance.resetCamera();
      this.instances.delete(id);
    }
  }

  static async stopAll(): Promise<void> {
    const stopPromises: Promise<void>[] = [];

    this.instances.forEach((instance) => {
      if (instance.isActive()) {
        stopPromises.push(Promise.resolve(instance.resetCamera()));
      }
    });

    await Promise.all(stopPromises);
  }
}

export { CameraInstanceManager };

// Mantener compatibilidad con el código existente
export const camera = CameraInstanceManager.createInstance('default');
