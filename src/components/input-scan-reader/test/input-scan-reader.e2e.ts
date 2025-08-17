import { newE2EPage } from '@stencil/core/testing';

describe('input-scan-reader', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    // Disable auto-focus to prevent potential timing issues in test environment
    await page.setContent('<input-scan-reader auto-focus="false"></input-scan-reader>');

    const element = await page.find('input-scan-reader');
    expect(element).toHaveClass('hydrated');
  });
});
