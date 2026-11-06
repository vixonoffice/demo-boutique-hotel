"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { roomFilters, rooms, type RoomTag } from "@/data/rooms";
import { loadGsap, prefersReducedMotion, whenIdle, type GsapKit } from "@/lib/gsap";
import RoomCard from "./RoomCard";

type Filter = "all" | RoomTag;

/** Filterable room grid. GSAP Flip moves the surviving cards smoothly into their new places. */
export default function RoomsExplorer() {
  const [filter, setFilter] = useState<Filter>("all");
  const kit = useRef<GsapKit | null>(null);
  const grid = useRef<HTMLDivElement>(null);
  const state = useRef<ReturnType<GsapKit["Flip"]["getState"]> | null>(null);

  useEffect(() => {
    let live = true;
    whenIdle().then(() => loadGsap()).then((k) => {
      if (live) kit.current = k;
    });
    return () => {
      live = false;
    };
  }, []);

  const visible = filter === "all" ? rooms : rooms.filter((r) => r.tags.includes(filter));

  const choose = (f: Filter) => {
    if (f === filter) return;
    if (kit.current && grid.current && !prefersReducedMotion()) {
      state.current = kit.current.Flip.getState(Array.from(grid.current.children));
    }
    setFilter(f);
  };

  useLayoutEffect(() => {
    const k = kit.current;
    if (!state.current || !k) return;
    const { gsap, Flip } = k;
    Flip.from(state.current, {
      duration: 1,
      ease: "expo.inOut",
      stagger: 0.06,
      onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9, ease: "expo.out" }),
    });
    state.current = null;
  }, [filter]);

  return (
    <div>
      <div role="group" aria-label="Filter rooms" className="flex flex-wrap items-center gap-2">
        {roomFilters.map((f) => (
          <button
            key={f.id}
            type="button"
            aria-pressed={filter === f.id}
            onClick={() => choose(f.id)}
            className={`rounded-full border px-5 py-3 text-[0.75rem] font-medium uppercase tracking-[0.16em] transition-colors ${
              filter === f.id ? "border-bone bg-bone text-ink" : "border-bone/40 hover:border-bone"
            }`}
          >
            {f.label}
          </button>
        ))}
        <p className="ml-auto text-sm text-mist" aria-live="polite">
          {visible.length} {visible.length === 1 ? "room" : "rooms"}
        </p>
      </div>

      <div ref={grid} className="mt-10 grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-3">
        {visible.map((r, i) => (
          <div
            key={r.slug}
            className={`h-[36rem] md:aspect-[4/5] md:h-auto ${i % 3 === 1 ? "xl:mt-24" : ""}`}
          >
            <RoomCard room={r} sizes="(min-width:1280px) 31vw, (min-width:768px) 48vw, 94vw" />
          </div>
        ))}
      </div>
    </div>
  );
}
