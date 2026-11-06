"use client";

import { useEffect } from "react";
import { loadGsap, prefersReducedMotion, whenIdle } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";

/** Lenis smooth wheel scrolling, driven by the GSAP ticker. Fine pointers only; touch keeps native scroll. */
export default function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;
    (async () => {
      await whenIdle();
      const [{ gsap, ScrollTrigger }, { default: Lenis }] = await Promise.all([loadGsap(), import("lenis")]);
      if (cancelled) return;
      const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (t: number) => lenis.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      cleanup = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        setLenis(null);
      };
    })();
    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);
  return null;
}
