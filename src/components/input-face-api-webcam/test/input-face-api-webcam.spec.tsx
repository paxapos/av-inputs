import { newSpecPage } from '@stencil/core/testing';
import { InputFaceApiWebcam } from '../input-face-api-webcam';

describe('input-face-api-webcam', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InputFaceApiWebcam],
      html: `<input-face-api-webcam></input-face-api-webcam>`,
    });
    expect(page.root).toEqualHtml(`
      <input-face-api-webcam>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-face-api-webcam>
    `);
  });
});
