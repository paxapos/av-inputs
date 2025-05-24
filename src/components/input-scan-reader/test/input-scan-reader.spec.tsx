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
          <div class="scanning">
            <div>
              <span class="loader"></span>
            </div>
            <label>
              Scanning Text
            </label>
            <div class="scanned-text"></div>
            <input type="text" value="">
          </div>
        </mock:shadow-root>
      </input-scan-reader>
    `);
  });
});
