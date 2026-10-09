import type Lenis from "lenis";

let lenisInstance: Lenis | null = null;

export const setLenis = (lenis: Lenis | null): void => {
  lenisInstance = lenis;
};

export const getLenis = (): Lenis | null => {
  return lenisInstance;
};
