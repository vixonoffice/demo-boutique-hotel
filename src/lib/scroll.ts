import type Lenis from "lenis";

let instance: Lenis | null = null;
export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** A #hash the next page should land on once its layout (pin spacers etc.) is final. */
export const hashIntent = { current: "" };

export function lockScroll() {
  if (instance) instance.stop();
  document.documentElement.style.overflow = "hidden";
}
export function unlockScroll() {
  if (instance) instance.start();
  document.documentElement.style.overflow = "";
}

export function scrollToTarget(target: string | number, offset = 0, immediate = false) {
  if (instance) {
    instance.scrollTo(target as never, { offset, immediate, duration: immediate ? 0 : 1.4 });
    return;
  }
  if (typeof target === "number") {
    window.scrollTo({ top: target + offset, behavior: immediate ? "auto" : "smooth" });
    return;
  }
  const el = document.querySelector(target);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
}
