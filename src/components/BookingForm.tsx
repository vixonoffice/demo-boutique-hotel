"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { roomBySlug, rooms } from "@/data/rooms";
import DatePicker, { MAX_NIGHTS, fmtShort, nightsBetween, type Range } from "./DatePicker";

type Field = "dates" | "guests" | "name" | "email";
type Errors = Partial<Record<Field, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function validate(v: { range: Range; guests: number; room: string; name: string; email: string }): Errors {
  const e: Errors = {};
  const { start, end } = v.range;
  if (!start || !end) e.dates = "Choose an arrival and a departure date.";
  else {
    const n = nightsBetween(start, end);
    if (n < 1) e.dates = "Departure must be after arrival.";
    else if (n > MAX_NIGHTS) e.dates = `We take stays of up to ${MAX_NIGHTS} nights online. Write to us for longer.`;
  }
  const room = roomBySlug(v.room);
  if (v.guests < 1) e.guests = "At least one guest.";
  else if (room && v.guests > room.sleeps) e.guests = `${room.name} sleeps ${room.sleeps}. Choose another room or fewer guests.`;
  if (v.name.trim().length < 2) e.name = "Please tell us your name.";
  if (!EMAIL.test(v.email.trim())) e.email = "Enter an email address we can reply to, like you@example.com.";
  return e;
}

export default function BookingForm({ idPrefix = "bk" }: { idPrefix?: string }) {
  const [range, setRange] = useState<Range>({ start: null, end: null });
  const [guests, setGuests] = useState(2);
  const [roomPick, setRoom] = useState<string | null>(null);
  // ?room=slug from the "Reserve this room" buttons; read without a hydration mismatch.
  const roomParam = useSyncExternalStore(
    () => () => undefined,
    () => new URLSearchParams(window.location.search).get("room"),
    () => null,
  );
  const room = roomPick ?? (roomParam && roomBySlug(roomParam) ? roomParam : "any");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [touched, setTouched] = useState<Partial<Record<Field, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [done, setDone] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (done) doneRef.current?.focus();
  }, [done]);

  const errors = validate({ range, guests, room, name, email });
  const show = (f: Field) => ((attempted || touched[f]) && errors[f] ? errors[f] : undefined);
  const touch = (f: Field) => setTouched((t) => ({ ...t, [f]: true }));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setAttempted(true);
    const first = (["dates", "guests", "name", "email"] as Field[]).find((f) => errors[f]);
    if (first) {
      const target = formRef.current?.querySelector<HTMLElement>(`#${idPrefix}-${first}`);
      target?.focus();
      return;
    }
    setDone(true);
  };

  const reset = () => {
    setRange({ start: null, end: null });
    setGuests(2);
    setRoom(null);
    setName("");
    setEmail("");
    setMessage("");
    setTouched({});
    setAttempted(false);
    setDone(false);
  };

  const nights = range.start && range.end ? nightsBetween(range.start, range.end) : 0;
  const chosen = roomBySlug(room);
  const rate = chosen?.from ?? Math.min(...rooms.map((r) => r.from));

  if (done) {
    return (
      <div className="on-light bg-bone p-6 text-ink md:p-10" role="status">
        <p className="mb-6 inline-flex items-center gap-3 border border-clay px-4 py-2 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-clay">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-clay" />
          Demo only, nothing was sent
        </p>
        <h3 ref={doneRef} tabIndex={-1} className="t-display t-md outline-none">
          Thank you, <em>{name.trim().split(" ")[0]}</em>.
        </h3>
        <p className="mt-5 max-w-[52ch] leading-relaxed text-muted">
          This is a concept site by Vixon Lab. No reservation was made, no email was sent and your details never left this
          browser. On a real build this step would reach the hotel&apos;s inbox and booking system.
        </p>
        <dl className="mt-8 grid gap-x-8 gap-y-5 border-t border-ink/20 pt-6 text-[0.95rem] sm:grid-cols-2">
          <div>
            <dt className="eyebrow text-muted">Dates</dt>
            <dd className="mt-2">
              {range.start && fmtShort(range.start)} to {range.end && fmtShort(range.end)}
              <span className="text-muted">
                {" "}
                ({nights} night{nights === 1 ? "" : "s"})
              </span>
            </dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Guests</dt>
            <dd className="mt-2">{guests}</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Room</dt>
            <dd className="mt-2">{chosen ? chosen.name : "Any room, we will suggest one"}</dd>
          </div>
          <div>
            <dt className="eyebrow text-muted">Estimate</dt>
            <dd className="mt-2">
              €{(rate * nights).toLocaleString("en-GB")}
              <span className="text-muted"> ({chosen ? "" : "from "}€{rate} per night, breakfast included)</span>
            </dd>
          </div>
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <button type="button" onClick={() => setDone(false)} className="btn btn-ghost-dark btn-block-sm">
            Edit request
          </button>
          <button type="button" onClick={reset} className="btn btn-clay btn-block-sm">
            Start over
          </button>
        </div>
      </div>
    );
  }

  const err = (f: Field) => (show(f) ? `${idPrefix}-${f}-err` : undefined);

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      noValidate
      className="on-light bg-bone p-6 text-ink md:p-10"
      aria-label="Reservation request (demo)"
    >
      <p className="mb-7 inline-flex items-center gap-3 border border-ink/30 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted">
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-clay" />
        Demo form, nothing is sent
      </p>

      <div className="grid gap-x-8 gap-y-7 md:grid-cols-2">
        <div className="md:col-span-2">
          <DatePicker
            id={`${idPrefix}-dates`}
            value={range}
            onChange={(r) => {
              setRange(r);
              if (r.end) touch("dates");
            }}
            invalid={!!show("dates")}
            describedBy={err("dates")}
          />
          {show("dates") ? (
            <p id={`${idPrefix}-dates-err`} className="mt-2 text-sm font-medium text-clay" role="alert">
              {show("dates")}
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <label htmlFor={`${idPrefix}-room`} className="field-label">
              Room
            </label>
            <select
              id={`${idPrefix}-room`}
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="field cursor-pointer appearance-none pr-8"
            >
              <option value="any">Any room, surprise me</option>
              {rooms.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name} (from €{r.from})
                </option>
              ))}
            </select>
            <svg className="pointer-events-none absolute bottom-4 right-1" width="12" height="8" viewBox="0 0 12 8" aria-hidden="true">
              <path d="M1 1l5 5 5-5" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
        </div>

        <div>
          <div className="relative">
            <span className="field-label" id={`${idPrefix}-guests-label`}>
              Guests
            </span>
            <div
              className="field flex items-center justify-between"
              role="group"
              aria-labelledby={`${idPrefix}-guests-label`}
              aria-describedby={err("guests")}
              id={`${idPrefix}-guests`}
              tabIndex={-1}
            >
              <button
                type="button"
                onClick={() => {
                  setGuests((g) => Math.max(1, g - 1));
                  touch("guests");
                }}
                aria-label="Remove a guest"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/40 text-lg transition-colors hover:bg-ink hover:text-bone"
              >
                &minus;
              </button>
              <output aria-live="polite" className="text-lg">
                {guests} {guests === 1 ? "guest" : "guests"}
              </output>
              <button
                type="button"
                onClick={() => {
                  setGuests((g) => Math.min(6, g + 1));
                  touch("guests");
                }}
                aria-label="Add a guest"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-ink/40 text-lg transition-colors hover:bg-ink hover:text-bone"
              >
                +
              </button>
            </div>
          </div>
          {show("guests") ? (
            <p id={`${idPrefix}-guests-err`} className="mt-2 text-sm font-medium text-clay" role="alert">
              {show("guests")}
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <label htmlFor={`${idPrefix}-name`} className="field-label">
              Full name
            </label>
            <input
              id={`${idPrefix}-name`}
              name="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => touch("name")}
              aria-invalid={!!show("name") || undefined}
              aria-describedby={err("name")}
              className="field"
            />
          </div>
          {show("name") ? (
            <p id={`${idPrefix}-name-err`} className="mt-2 text-sm font-medium text-clay" role="alert">
              {show("name")}
            </p>
          ) : null}
        </div>

        <div>
          <div className="relative">
            <label htmlFor={`${idPrefix}-email`} className="field-label">
              Email
            </label>
            <input
              id={`${idPrefix}-email`}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => touch("email")}
              aria-invalid={!!show("email") || undefined}
              aria-describedby={err("email")}
              className="field"
            />
          </div>
          {show("email") ? (
            <p id={`${idPrefix}-email-err`} className="mt-2 text-sm font-medium text-clay" role="alert">
              {show("email")}
            </p>
          ) : null}
        </div>

        <div className="relative md:col-span-2">
          <label htmlFor={`${idPrefix}-msg`} className="field-label">
            Anything we should know? (optional)
          </label>
          <textarea
            id={`${idPrefix}-msg`}
            name="message"
            rows={2}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="field resize-none"
          />
        </div>
      </div>

      <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-[34ch] text-sm leading-relaxed text-muted" aria-live="polite">
          {nights > 0
            ? `${nights} night${nights === 1 ? "" : "s"}, from €${(rate * nights).toLocaleString("en-GB")}. Breakfast included.`
            : "Free cancellation up to 14 days before arrival (concept)."}
        </p>
        <button type="submit" className="btn btn-clay btn-block-sm" data-magnetic data-cursor="">
          <span data-magnetic-in>Request these dates</span>
        </button>
      </div>
    </form>
  );
}
