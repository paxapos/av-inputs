import { newSpecPage } from '@stencil/core/testing';
import { InputFileFromWebcam } from '../input-file-from-webcam';

describe('input-file-from-webcam', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InputFileFromWebcam],
      html: `<input-file-from-webcam></input-file-from-webcam>`,
    });
    expect(page.root).toEqualHtml(`
      <input-file-from-webcam>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-file-from-webcam>
    `);
  });
});
