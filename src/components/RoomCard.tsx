"use client";

import { useState } from "react";
import type { Room } from "@/data/rooms";
import Photo from "./Photo";
import { TLink } from "./TransitionProvider";

type Props = {
  room: Room;
  sizes: string;
  /** Typographic scale of the front title. */
  big?: boolean;
  /** Hide the amenity list on the back (short cards in the bento). */
  dense?: boolean;
};

/** Photo on the front, details on the back. Hover zooms the photo, click / tap / Enter flips the card. */
export default function RoomCard({ room, sizes, big = false, dense = false }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-scene h-full w-full">
      <div className="flip-card" data-flipped={flipped}>
        {/* FRONT */}
        <div className="flip-face group bg-ink-2 text-bone" inert={flipped}>
          <div className="absolute inset-0 overflow-hidden">
            <Photo
              name={room.photo}
              alt={`${room.name}: ${room.kicker.toLowerCase()}`}
              fill
              sizes={sizes}
              className="object-cover transition-transform duration-[1400ms] ease-[var(--ease-vl)] group-hover:scale-[1.07]"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-ink/10" />
          <button
            type="button"
            className="absolute inset-0 z-10 cursor-pointer"
            data-cursor="Flip"
            aria-pressed={flipped}
            aria-label={`Show details for ${room.name}`}
            onClick={() => setFlipped(true)}
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] p-5 md:p-7">
            <p className="eyebrow mb-3 text-ember">{room.kicker}</p>
            <div className="flex items-end justify-between gap-4">
              <h3 className={`t-display ${big ? "text-[clamp(2.6rem,5.2vw,5.4rem)]" : "text-[clamp(2.1rem,3.4vw,3.4rem)]"}`}>
                {room.name}
              </h3>
              <p className="shrink-0 pb-1 text-right text-sm leading-tight">
                <span className="block text-[0.68rem] uppercase tracking-[0.18em] text-mist">from</span>
                <span className="t-display text-3xl">€{room.from}</span>
              </p>
            </div>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-4 top-4 z-[5] rounded-full border border-bone/70 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em]"
          >
            Details
          </span>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back bg-ink-2 text-bone" inert={!flipped} data-lenis-prevent>
          <div className="flex h-full flex-col overflow-y-auto p-5 md:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="eyebrow mb-2 text-ember">{room.kicker}</p>
                <h3 className="t-display text-[clamp(2rem,3vw,3rem)]">{room.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setFlipped(false)}
                className="shrink-0 rounded-full border border-bone/60 px-4 py-2 text-[0.68rem] font-medium uppercase tracking-[0.18em] transition-colors hover:bg-bone hover:text-ink"
                aria-label={`Back to the photo of ${room.name}`}
              >
                Back
              </button>
            </div>

            <p className="mt-4 max-w-[46ch] text-[0.95rem] leading-relaxed text-mist">{room.blurb}</p>

            <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-bone/20 pt-5 text-sm">
              <div>
                <dt className="eyebrow text-mist">Size</dt>
                <dd className="mt-1">{room.size} m²</dd>
              </div>
              <div>
                <dt className="eyebrow text-mist">Sleeps</dt>
                <dd className="mt-1">{room.sleeps} guests</dd>
              </div>
              <div>
                <dt className="eyebrow text-mist">Bed</dt>
                <dd className="mt-1">{room.bed}</dd>
              </div>
              <div>
                <dt className="eyebrow text-mist">View</dt>
                <dd className="mt-1">{room.view}</dd>
              </div>
            </dl>

            {dense ? null : (
              <ul className="mt-5 space-y-1.5 text-sm text-bone/90">
                {room.amenities.map((a) => (
                  <li key={a} className="flex gap-3">
                    <span aria-hidden="true" className="mt-[0.55em] h-px w-4 shrink-0 bg-ember" />
                    {a}
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
              <p>
                <span className="t-display text-4xl">€{room.from}</span>
                <span className="ml-2 text-sm text-mist">per night, breakfast included</span>
              </p>
              <TLink href={`/contact?room=${room.slug}#reserve`} className="btn btn-clay min-h-12">
                Reserve this room
              </TLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
