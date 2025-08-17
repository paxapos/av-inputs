import { newE2EPage } from '@stencil/core/testing';

describe('input-face-api-webcam', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    // Disable auto-start to prevent camera/AI initialization in test environment
    await page.setContent('<input-face-api-webcam auto-start="false"></input-face-api-webcam>');

    const element = await page.find('input-face-api-webcam');
    expect(element).toHaveClass('hydrated');
  });

  it('renders with disabled state', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-face-api-webcam auto-start="false" disabled></input-face-api-webcam>');

    const element = await page.find('input-face-api-webcam');
    expect(element).toHaveClass('hydrated');
    expect(element.getAttribute('disabled')).toBeDefined();
  });
});
