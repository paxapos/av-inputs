import { newSpecPage } from '@stencil/core/testing';
import { InputFileFromWebcam } from '../input-file-from-webcam';

// Mock navigator.mediaDevices
Object.defineProperty(global.navigator, 'mediaDevices', {
  writable: true,
  value: {
    getUserMedia: jest.fn().mockResolvedValue({
      getTracks: () => [{ stop: jest.fn() }]
    })
  }
});

// Mock camera service
jest.mock('../../../utils/camera', () => ({
  camera: {
    initCamera: jest.fn().mockResolvedValue(undefined),
    resetCamera: jest.fn(),
    takePicture: jest.fn().mockResolvedValue(new Blob())
  }
}));

describe('input-file-from-webcam', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InputFileFromWebcam],
      html: `<input-file-from-webcam auto-start="false"></input-file-from-webcam>`,
    });

    expect(page.root).toEqualHtml(`
      <input-file-from-webcam auto-start="false" class="camera-inactive flipped" facing-mode="FRONT" height="460" width="460" style="height: 460px; width: 460px;">
        <mock:shadow-root>
          <slot name="before"></slot>
          <div class="camera-state inactive">
            <div class="inactive-icon">📹</div>
            <p>Cámara inactiva</p>
            <button class="start-button">
              Iniciar Cámara
            </button>
          </div>
          <slot></slot>
          <div class="flash-effect"></div>
          <slot name="after"></slot>
        </mock:shadow-root>
      </input-file-from-webcam>
    `);
  });
});
