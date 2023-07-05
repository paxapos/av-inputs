import { newSpecPage } from '@stencil/core/testing';
import { InputScanReader } from '../input-scan-reader';

describe('input-scan-reader', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InputScanReader],
      html: `<input-scan-reader></input-scan-reader>`,
    });
    expect(page.root).toEqualHtml(`
      <input-scan-reader>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </input-scan-reader>
    `);
  });
});
