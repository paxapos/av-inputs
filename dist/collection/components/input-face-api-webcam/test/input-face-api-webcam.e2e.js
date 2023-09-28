import { newE2EPage } from "@stencil/core/testing";
describe('input-face-api-webcam', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<input-face-api-webcam></input-face-api-webcam>');
    const element = await page.find('input-face-api-webcam');
    expect(element).toHaveClass('hydrated');
  });
});
//# sourceMappingURL=input-face-api-webcam.e2e.js.map
