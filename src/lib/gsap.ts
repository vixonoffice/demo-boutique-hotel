import type { gsap as GsapType } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { Flip as FlipType } from "gsap/Flip";

export type GsapKit = {
  gsap: typeof GsapType;
  ScrollTrigger: typeof ScrollTriggerType;
  Flip: typeof FlipType;
};

let kit: Promise<GsapKit> | null = null;
let ready: GsapKit | null = null;

/** Resolves once the browser is idle, so GSAP never competes with first paint / hydration. */
export function whenIdle(timeout = 1400): Promise<void> {
  return new Promise((resolve) => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
    };
    const go = () => resolve();
    const idle = () => (w.requestIdleCallback ? w.requestIdleCallback(go, { timeout }) : setTimeout(go, 120));
    if (document.readyState !== "complete") {
      window.addEventListener("load", idle, { once: true });
    } else {
      idle();
    }
  });
}

export function loadGsap(): Promise<GsapKit> {
  if (!kit) {
    kit = Promise.all([import("gsap"), import("gsap/ScrollTrigger"), import("gsap/Flip")]).then(
      ([g, st, fl]) => {
        g.gsap.registerPlugin(st.ScrollTrigger, fl.Flip);
        st.ScrollTrigger.config({ ignoreMobileResize: true });
        ready = { gsap: g.gsap, ScrollTrigger: st.ScrollTrigger, Flip: fl.Flip };
        return ready;
      },
    );
  }
  return kit;
}

/** Synchronous access once loaded (null before that). */
export function gsapIfReady(): GsapKit | null {
  return ready;
}

// Showcase site: the motion is the point, so it runs for everyone (the hero video keeps its pause button).
export const prefersReducedMotion = () => false;
