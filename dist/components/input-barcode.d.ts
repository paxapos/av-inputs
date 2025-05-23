import type { Components, JSX } from "../types/components";

interface InputBarcode extends Components.InputBarcode, HTMLElement {}
export const InputBarcode: {
    prototype: InputBarcode;
    new (): InputBarcode;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
