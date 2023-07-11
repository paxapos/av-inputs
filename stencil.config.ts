import { Config } from '@stencil/core';
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  namespace: 'input-file-from-webcam',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'dist-custom-elements',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      copy: [
        { src: 'input_file_from_webcam.html', dest: 'input_file_from_webcam.html' },
        { src: 'input_face_api.html', dest: 'input_face_api.html' },
        { src: 'input_scan_reader.html', dest: 'input_scan_reader.html' },
      ],
      serviceWorker: null, // disable service workers
    },
    angularOutputTarget({
      componentCorePackage: 'input-file-from-webcam',
      directivesProxyFile: 'angular/components.ts',
      //directivesArrayFile: 'dist/angular/index.ts',
      includeImportCustomElements: true
    }),
  ],
};
