import type { Components, JSX } from "../types/components";

interface InputScanReader extends Components.InputScanReader, HTMLElement {}
export const InputScanReader: {
  prototype: InputScanReader;
  new (): InputScanReader;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
