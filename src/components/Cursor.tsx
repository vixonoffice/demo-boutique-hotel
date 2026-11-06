"use client";

import { useEffect, useRef } from "react";
import { loadGsap, prefersReducedMotion, whenIdle } from "@/lib/gsap";

const INTERACTIVE = "a, button, summary, input, select, textarea, [role='button'], [data-cursor]";

/** Ring cursor with labels + magnetic [data-magnetic] elements. Fine pointers only, never on touch. */
export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || prefersReducedMotion()) return;
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      await whenIdle();
      const { gsap } = await loadGsap();
      const el = ref.current;
      if (cancelled || !el) return;

      const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });
      const sTo = gsap.quickTo(el, "scale", { duration: 0.45, ease: "power3" });
      let shown = false;
      let magnet: HTMLElement | null = null;

      const release = (m: HTMLElement) => {
        gsap.to(m, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)", overwrite: "auto" });
        const inner = m.querySelector<HTMLElement>("[data-magnetic-in]");
        if (inner) gsap.to(inner, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.45)" });
      };

      const onMove = (e: PointerEvent) => {
        if (!shown) {
          shown = true;
          el.dataset.on = "1";
          gsap.set(el, { x: e.clientX, y: e.clientY });
        }
        xTo(e.clientX);
        yTo(e.clientY);

        const target = e.target as HTMLElement | null;
        const m = target?.closest?.<HTMLElement>("[data-magnetic]") ?? null;
        if (magnet && magnet !== m) {
          release(magnet);
          magnet = null;
        }
        if (m) {
          magnet = m;
          const r = m.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          gsap.to(m, { x: dx * 0.28, y: dy * 0.28, duration: 0.5, ease: "power3.out", overwrite: "auto" });
          const inner = m.querySelector<HTMLElement>("[data-magnetic-in]");
          if (inner) gsap.to(inner, { x: dx * 0.12, y: dy * 0.12, duration: 0.5, ease: "power3.out" });
        }
      };

      const onOver = (e: PointerEvent) => {
        const t = (e.target as HTMLElement | null)?.closest?.<HTMLElement>(INTERACTIVE);
        const label = t?.dataset.cursor;
        if (label) {
          el.textContent = label;
          el.dataset.label = "1";
          sTo(2.1);
        } else if (t && /^(INPUT|SELECT|TEXTAREA)$/.test(t.tagName)) {
          el.textContent = "";
          el.dataset.label = "0";
          sTo(0.35);
        } else if (t) {
          el.textContent = "";
          el.dataset.label = "0";
          sTo(1.55);
        } else {
          el.textContent = "";
          el.dataset.label = "0";
          sTo(1);
        }
      };

      const onLeaveDoc = () => {
        shown = false;
        el.dataset.on = "0";
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      window.addEventListener("pointerover", onOver, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeaveDoc);
      cleanup = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerover", onOver);
        document.documentElement.removeEventListener("pointerleave", onLeaveDoc);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, []);

  return <div ref={ref} className="vl-cursor" aria-hidden="true" data-on="0" data-label="0" />;
}
