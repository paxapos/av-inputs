// Jest setup file for mocking browser APIs

// Mock navigator.mediaDevices globally
Object.defineProperty(global, 'navigator', {
  writable: true,
  value: {
    ...global.navigator,
    mediaDevices: {
      getUserMedia: jest.fn().mockResolvedValue({
        getTracks: () => [{ stop: jest.fn() }]
      })
    }
  }
});

// Mock HTMLVideoElement globally (since it doesn't exist in Node.js)
global.HTMLVideoElement = class HTMLVideoElement {
  constructor() {
    this.readyState = 4; // HAVE_ENOUGH_DATA
    this.videoWidth = 640;
    this.videoHeight = 480;
  }

  play() {
    return Promise.resolve();
  }

  pause() {}
};

// Add prototype methods for HTMLVideoElement
Object.defineProperty(global.HTMLVideoElement.prototype, 'readyState', {
  get() { return 4; }, // HAVE_ENOUGH_DATA
  configurable: true
});

Object.defineProperty(global.HTMLVideoElement.prototype, 'videoWidth', {
  get() { return 640; },
  configurable: true
});

Object.defineProperty(global.HTMLVideoElement.prototype, 'videoHeight', {
  get() { return 480; },
  configurable: true
});

Object.defineProperty(global.HTMLVideoElement.prototype, 'play', {
  writable: true,
  value: jest.fn().mockResolvedValue(undefined)
});

Object.defineProperty(global.HTMLVideoElement.prototype, 'pause', {
  writable: true,
  value: jest.fn()
});

// Mock HTMLCanvasElement.toBlob method
if (typeof HTMLCanvasElement !== 'undefined') {
  HTMLCanvasElement.prototype.toBlob = jest.fn((callback) => {
    const blob = new Blob(['fake-image-data'], { type: 'image/jpeg' });
    callback(blob);
  });
}

// Mock File constructor globally
global.File = class File extends Blob {
  constructor(fileBits, fileName, options = {}) {
    super(fileBits, options);
    this.name = fileName;
    this.lastModified = Date.now();
  }
};

// Mock MediaPipe FaceLandmarker
global.FaceLandmarker = {
  createFromOptions: jest.fn().mockResolvedValue({
    detectForVideo: jest.fn().mockReturnValue({
      faceLandmarks: [],
      faceBlendshapes: []
    })
  })
};

// Mock FaceAPI service to prevent timeouts
const mockFaceapiService = {
  initialize: jest.fn().mockResolvedValue(undefined),
  getFaceLandmarksFromBlob: jest.fn().mockResolvedValue({
    faceLandmarks: [],
    faceBlendshapes: []
  })
};

// Mock the faceapi service module
jest.mock('/home/alevilar/Works/av-inputs/src/utils/facepi.service.ts', () => ({
  faceapiService: mockFaceapiService
}), { virtual: true });
