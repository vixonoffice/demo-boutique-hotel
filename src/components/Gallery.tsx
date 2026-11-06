"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import credits from "@/data/media-credits.json";
import { galleryFilters, galleryItems, type GalleryCategory } from "@/data/content";
import { loadGsap, prefersReducedMotion, whenIdle, type GsapKit } from "@/lib/gsap";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import Photo from "./Photo";

type Filter = "all" | GalleryCategory;
const spans = { std: "", wide: "col-span-2", tall: "row-span-2" } as const;
const sizesFor = { std: "(min-width:768px) 26vw, 50vw", wide: "(min-width:768px) 52vw, 100vw", tall: "(min-width:768px) 26vw, 50vw" } as const;
const authors = credits as Record<string, { author: string }>;

const inset = (r: DOMRect) =>
  `inset(${Math.max(0, r.top)}px ${Math.max(0, window.innerWidth - r.right)}px ${Math.max(0, window.innerHeight - r.bottom)}px ${Math.max(0, r.left)}px)`;

export default function Gallery() {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const kit = useRef<GsapKit | null>(null);
  const grid = useRef<HTMLUListElement>(null);
  const flipState = useRef<ReturnType<GsapKit["Flip"]["getState"]> | null>(null);
  const box = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);
  const opener = useRef<HTMLElement | null>(null);
  const origin = useRef<DOMRect | null>(null);

  const items = filter === "all" ? galleryItems : galleryItems.filter((g) => g.category === filter);

  useEffect(() => {
    let live = true;
    whenIdle().then(() => loadGsap()).then((k) => {
      if (live) kit.current = k;
    });
    return () => {
      live = false;
    };
  }, []);

  const choose = (f: Filter) => {
    if (f === filter) return;
    if (kit.current && grid.current && !prefersReducedMotion()) {
      flipState.current = kit.current.Flip.getState(Array.from(grid.current.children));
    }
    setFilter(f);
  };

  useLayoutEffect(() => {
    const k = kit.current;
    if (!flipState.current || !k || !grid.current) return;
    const { gsap, Flip } = k;
    Flip.from(flipState.current, {
      duration: 0.9,
      ease: "expo.inOut",
      stagger: 0.035,
      scale: true,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.8, ease: "expo.out" }),
    });
    flipState.current = null;
  }, [filter]);

  const isOpen = open !== null;

  useEffect(() => {
    if (!isOpen) return;
    const k = kit.current;
    const b = box.current;
    if (k && b && origin.current && !prefersReducedMotion()) {
      k.gsap.fromTo(b, { clipPath: inset(origin.current) }, { clipPath: "inset(0px 0px 0px 0px)", duration: 0.95, ease: "expo.inOut" });
      const img = b.querySelector("[data-lb-img]");
      if (img) k.gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.3, ease: "expo.out" });
    }
    closeBtn.current?.focus();
  }, [isOpen]);

  const openAt = (i: number, el: HTMLElement) => {
    opener.current = el;
    origin.current = el.getBoundingClientRect();
    lockScroll();
    setOpen(i);
  };

  const finish = useCallback(() => {
    setOpen(null);
    unlockScroll();
    opener.current?.focus({ preventScroll: true });
  }, []);

  const close = useCallback(() => {
    const k = kit.current;
    const b = box.current;
    const r = opener.current?.getBoundingClientRect() ?? origin.current;
    if (k && b && r && !prefersReducedMotion()) {
      k.gsap.to(b, { clipPath: inset(r), duration: 0.75, ease: "expo.inOut", onComplete: finish });
    } else {
      finish();
    }
  }, [finish]);

  const step = useCallback(
    (d: number) => setOpen((o) => (o === null ? o : (o + d + items.length) % items.length)),
    [items.length],
  );

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
      else if (e.key === "Tab") {
        const f = Array.from(box.current?.querySelectorAll<HTMLElement>("[data-lb-btn]") ?? []);
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, close, step]);

  const current = open !== null ? items[open] : null;

  return (
    <div>
      <div role="group" aria-label="Filter the gallery" className="flex flex-wrap gap-2">
        {galleryFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => choose(f.id)}
            aria-pressed={filter === f.id}
            className={`rounded-full border px-5 py-3 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors ${
              filter === f.id ? "border-ink bg-ink text-bone" : "border-ink/40 hover:border-ink hover:bg-ink hover:text-bone"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul
        ref={grid}
        className="mt-8 grid auto-rows-[44vw] grid-cols-2 gap-2 [grid-auto-flow:dense] md:auto-rows-[19vw] md:grid-cols-4 md:gap-3 xl:auto-rows-[17rem]"
      >
        {items.map((g, i) => (
          <li key={g.id} className={`relative ${spans[g.size]}`}>
            <button
              type="button"
              className="group absolute inset-0 block overflow-hidden bg-sand"
              data-cursor="View"
              onClick={(e) => openAt(i, e.currentTarget)}
              aria-label={`Open photo: ${g.title}`}
            >
              <Photo
                name={g.photo}
                alt={g.title}
                fill
                sizes={sizesFor[g.size]}
                className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-vl)] group-hover:scale-[1.06]"
                style={g.pos ? { objectPosition: g.pos } : undefined}
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/70 to-transparent px-3 pb-3 pt-10 text-left text-[0.8rem] text-bone opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                {g.title}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current ? (
        <div
          ref={box}
          role="dialog"
          aria-modal="true"
          aria-label={`Photo viewer: ${current.title}`}
          className="fixed inset-0 z-[100] bg-ink text-bone"
        >
          <div className="absolute inset-x-0 bottom-24 top-20 md:inset-x-16 md:bottom-28 md:top-24">
            <div className="relative h-full w-full" data-lb-img key={current.id}>
              <Photo name={current.photo} alt={current.title} fill sizes="100vw" className="object-contain" />
            </div>
          </div>
          <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-8">
            <p className="eyebrow" aria-live="polite">
              {String((open ?? 0) + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
            </p>
            <button
              ref={closeBtn}
              type="button"
              data-lb-btn
              onClick={close}
              className="rounded-full border border-bone/60 px-5 py-3 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors hover:bg-bone hover:text-ink"
            >
              Close
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-4 md:p-8">
            <div>
              <p className="t-display text-2xl md:text-4xl">{current.title}</p>
              <p className="mt-1 text-xs text-mist">Photo: {authors[current.photo]?.author} on Pexels</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                data-lb-btn
                onClick={() => step(-1)}
                aria-label="Previous photo"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/60 transition-colors hover:bg-bone hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M9 2L4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
              <button
                type="button"
                data-lb-btn
                onClick={() => step(1)}
                aria-label="Next photo"
                className="flex h-12 w-12 items-center justify-center rounded-full border border-bone/60 transition-colors hover:bg-bone hover:text-ink"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
