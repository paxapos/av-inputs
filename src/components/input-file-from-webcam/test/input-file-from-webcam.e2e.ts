import { newE2EPage } from '@stencil/core/testing';

describe('input-file-from-webcam', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-file-from-webcam></input-file-from-webcam>');

    const element = await page.find('input-file-from-webcam');
    expect(element).toHaveClass('hydrated');
  });
});
