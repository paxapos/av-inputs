import { newE2EPage } from '@stencil/core/testing';

describe('input-scan-reader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-scan-reader></input-scan-reader>');

    const element = await page.find('input-scan-reader');
    expect(element).toHaveClass('hydrated');
  });
});
