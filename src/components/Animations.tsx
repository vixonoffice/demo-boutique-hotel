"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { loadGsap, whenIdle, type GsapKit } from "@/lib/gsap";
import { hashIntent, scrollToTarget } from "@/lib/scroll";

const $$ = <T extends HTMLElement = HTMLElement>(sel: string, root: ParentNode = document) =>
  Array.from(root.querySelectorAll<T>(sel));

function init({ gsap, ScrollTrigger }: GsapKit) {
  const mm = gsap.matchMedia();

  mm.add("all", () => {
    // Word-mask headline reveals
    $$("[data-split]").forEach((el) => {
      const words = $$(".si", el);
      gsap.from(words, {
        yPercent: 112,
        duration: 1.15,
        ease: "expo.out",
        stagger: 0.05,
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });

    // Fade / rise
    const fades = $$("[data-fade]");
    if (fades.length) {
      gsap.set(fades, { opacity: 0, y: 44 });
      ScrollTrigger.batch(fades, {
        start: "top 92%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", stagger: 0.12, overwrite: true }),
      });
    }

    // Image clip reveals
    $$("[data-clip]").forEach((el) => {
      const inner = el.querySelector<HTMLElement>("[data-inner]");
      gsap.fromTo(
        el,
        { clipPath: "inset(14% 14% 14% 14%)" },
        {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.5,
          ease: "expo.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        },
      );
      if (inner) {
        gsap.fromTo(
          inner,
          { scale: 1.3 },
          { scale: 1, duration: 1.8, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 90%", once: true } },
        );
      }
    });

    // Parallax (element sits inside an overflow-hidden parent and is taller than it)
    $$("[data-parallax]").forEach((el) => {
      const v = Number(el.dataset.parallax) || 0.1;
      gsap.fromTo(
        el,
        { yPercent: -v * 100 },
        {
          yPercent: v * 100,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });

    // Divider lines
    $$("[data-line]").forEach((el) => {
      gsap.fromTo(
        el,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.6,
          ease: "expo.out",
          transformOrigin: "left center",
          scrollTrigger: { trigger: el, start: "top 95%", once: true },
        },
      );
    });

    // Manifesto: words light up as you scroll
    $$("[data-scrub-words]").forEach((el) => {
      gsap.fromTo(
        $$(".sc-w", el),
        { opacity: 0.18 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.12,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 55%", scrub: true },
        },
      );
    });

    // Hero: slow zoom on the media, content drifts up and fades
    $$("[data-hero]").forEach((hero) => {
      const media = hero.querySelector<HTMLElement>("[data-hero-media]");
      const content = hero.querySelector<HTMLElement>("[data-hero-content]");
      const st = { trigger: hero, start: "top top", end: "bottom top", scrub: true };
      if (media) gsap.to(media, { scale: 1.14, ease: "none", scrollTrigger: st });
      if (content) gsap.to(content, { yPercent: -18, opacity: 0.1, ease: "none", scrollTrigger: st });
    });

    // Gallery-style counters / marquee parallax: speed up marquee with scroll velocity
    $$("[data-marquee]").forEach((el) => {
      gsap.to(el, {
        xPercent: -25,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.6 },
      });
    });
  });

  // Horizontal pinned experiences (desktop). On touch / narrow screens it stays a native swipe carousel.
  mm.add("(min-width: 768px)", () => {
    const root = document.querySelector<HTMLElement>("[data-exp]");
    if (!root) return;
    const track = root.querySelector<HTMLElement>(".exp-track");
    if (!track) return;
    const bar = root.querySelector<HTMLElement>("[data-exp-bar]");
    const counter = root.querySelector<HTMLElement>("[data-exp-count]");
    const panels = $$("[data-exp-panel]", root);
    root.dataset.pinned = "true";
    const dist = () => Math.max(0, track.scrollWidth - root.clientWidth);
    const tween = gsap.to(track, {
      x: () => -dist(),
      ease: "none",
      scrollTrigger: {
        trigger: root,
        start: "top top",
        end: () => "+=" + dist(),
        pin: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (bar) gsap.set(bar, { scaleX: self.progress });
          if (counter) {
            const i = Math.min(panels.length, Math.max(1, Math.round(self.progress * (panels.length - 1)) + 1));
            counter.textContent = String(i).padStart(2, "0");
          }
        },
      },
    });
    $$("[data-exp-img]", root).forEach((img) => {
      gsap.fromTo(
        img,
        { xPercent: -7 },
        {
          xPercent: 7,
          ease: "none",
          scrollTrigger: {
            trigger: img.closest("[data-exp-panel]"),
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        },
      );
    });
    return () => {
      delete root.dataset.pinned;
    };
  });

  return mm;
}

/** One place for every scroll animation, driven by data-attributes so the sections stay server components. */
export default function Animations() {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let mm: { revert: () => void } | undefined;
    (async () => {
      await whenIdle();
      const kit = await loadGsap();
      if (cancelled) return;
      mm = init(kit);
      const settle = () => {
        if (cancelled) return;
        kit.ScrollTrigger.refresh();
        const h = hashIntent.current || window.location.hash;
        if (h && document.querySelector(h)) {
          hashIntent.current = "";
          scrollToTarget(h, -10, true);
        }
      };
      settle();
      document.fonts?.ready.then(() => !cancelled && kit.ScrollTrigger.refresh());
      window.addEventListener("load", settle, { once: true });
    })();
    return () => {
      cancelled = true;
      mm?.revert();
    };
  }, [pathname]);

  return null;
}
