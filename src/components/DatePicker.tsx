"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type Range = { start: Date | null; end: Date | null };

const DAY = 86_400_000;
export const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
export const addDays = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
export const nightsBetween = (a: Date, b: Date) => Math.round((startOfDay(b).getTime() - startOfDay(a).getTime()) / DAY);
const same = (a: Date | null, b: Date | null) => !!a && !!b && startOfDay(a).getTime() === startOfDay(b).getTime();
export const fmtShort = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" });
const fmtLong = (d: Date) => d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
const monthLabel = (d: Date) => d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
const WEEK = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export const MAX_NIGHTS = 21;

function monthGrid(year: number, month: number): (Date | null)[] {
  const first = new Date(year, month, 1);
  const lead = (first.getDay() + 6) % 7; // Monday first
  const count = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = Array(lead).fill(null);
  for (let i = 1; i <= count; i++) cells.push(new Date(year, month, i));
  return cells;
}

type Props = {
  id: string;
  value: Range;
  onChange: (r: Range) => void;
  invalid?: boolean;
  describedBy?: string;
};

export default function DatePicker({ id, value, onChange, invalid, describedBy }: Props) {
  const [open, setOpen] = useState(false);
  const [wide, setWide] = useState(false);
  const [view, setView] = useState(() => new Date());
  const [hover, setHover] = useState<Date | null>(null);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const today = startOfDay(new Date());

  const show = () => {
    const mq = window.matchMedia("(min-width: 768px)");
    setWide(mq.matches);
    const base = value.start ?? new Date();
    setView(new Date(base.getFullYear(), base.getMonth(), 1));
    setOpen(true);
  };
  const close = useCallback(() => {
    setOpen(false);
    setHover(null);
    trigger.current?.focus();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onDown = (e: PointerEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [open, close]);

  const pick = (d: Date) => {
    const { start, end } = value;
    if (!start || end || d <= start) {
      onChange({ start: d, end: null });
    } else {
      onChange({ start, end: d });
      if (wide) close();
    }
  };

  const months = wide ? 2 : 1;
  const thisMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const canPrev = view > thisMonth;
  const nights = value.start && value.end ? nightsBetween(value.start, value.end) : 0;
  const previewEnd = value.start && !value.end ? hover : null;

  return (
    <div ref={wrap} className="relative">
      <button
        ref={trigger}
        type="button"
        id={id}
        onClick={() => (open ? setOpen(false) : show())}
        aria-haspopup="dialog"
        aria-expanded={open}
        data-invalid={invalid ? "true" : undefined}
        aria-describedby={describedBy}
        className="field grid cursor-pointer grid-cols-2 gap-6 pb-3 pt-6 text-left"
      >
        <span className="relative block">
          <span className="field-label" style={{ top: "-1.15rem" }}>Arrive</span>
          <span className={value.start ? "" : "text-muted"}>{value.start ? fmtShort(value.start) : "Add date"}</span>
        </span>
        <span className="relative block">
          <span className="field-label" style={{ top: "-1.15rem" }}>Depart</span>
          <span className={value.end ? "" : "text-muted"}>{value.end ? fmtShort(value.end) : "Add date"}</span>
        </span>
      </button>

      {open ? (
        <>
          <div className="fixed inset-0 z-[90] bg-ink/60 md:hidden" aria-hidden="true" />
          <div
            role="dialog"
            aria-label="Choose your dates"
            data-lenis-prevent
            className="fixed inset-x-0 bottom-0 z-[95] max-h-[88svh] overflow-y-auto bg-bone p-5 text-ink shadow-2xl md:absolute md:inset-x-auto md:bottom-auto md:left-0 md:top-full md:mt-3 md:max-h-none md:w-[44rem] md:max-w-[calc(100vw-3rem)] md:p-7"
            style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))}
                disabled={!canPrev}
                aria-label="Previous month"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/30 transition-colors enabled:hover:bg-ink enabled:hover:text-bone disabled:opacity-30"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M9 2L4 7l5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
              <p className="eyebrow" aria-live="polite">
                {nights > 0 ? `${nights} night${nights === 1 ? "" : "s"}` : value.start ? "Choose a departure date" : "Choose an arrival date"}
              </p>
              <button
                type="button"
                onClick={() => setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))}
                aria-label="Next month"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/30 transition-colors hover:bg-ink hover:text-bone"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><path d="M5 2l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>
              </button>
            </div>

            <div className={`grid gap-8 ${months === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
              {Array.from({ length: months }, (_, i) => {
                const m = new Date(view.getFullYear(), view.getMonth() + i, 1);
                return (
                  <div key={m.toISOString()}>
                    <p className="t-display mb-3 text-center text-3xl">{monthLabel(m)}</p>
                    <div className="grid grid-cols-7 gap-y-1 text-center">
                      {WEEK.map((w) => (
                        <span key={w} className="pb-2 text-[0.65rem] uppercase tracking-[0.14em] text-muted">
                          {w}
                        </span>
                      ))}
                      {monthGrid(m.getFullYear(), m.getMonth()).map((d, k) => {
                        if (!d) return <span key={`b${k}`} />;
                        const past = d < today;
                        const tooFar = !!value.start && !value.end && d > addDays(value.start, MAX_NIGHTS);
                        const isStart = same(d, value.start);
                        const isEnd = same(d, value.end);
                        const edge = value.end ?? previewEnd;
                        const inRange = !!value.start && !!edge && d > value.start && d < edge;
                        return (
                          <button
                            key={d.toISOString()}
                            type="button"
                            disabled={past || tooFar}
                            onClick={() => pick(d)}
                            onMouseEnter={() => setHover(d)}
                            onFocus={() => setHover(d)}
                            aria-label={fmtLong(d)}
                            aria-pressed={isStart || isEnd}
                            className={`relative mx-auto flex aspect-square w-full max-w-11 items-center justify-center text-[0.95rem] transition-colors disabled:cursor-not-allowed disabled:text-ink/25 ${
                              isStart || isEnd
                                ? "rounded-full bg-clay text-bone"
                                : inRange
                                  ? "bg-sand"
                                  : "rounded-full enabled:hover:bg-sand"
                            }`}
                          >
                            {d.getDate()}
                            {same(d, today) && !isStart && !isEnd ? (
                              <span aria-hidden="true" className="absolute bottom-1.5 h-1 w-1 rounded-full bg-clay" />
                            ) : null}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3 border-t border-ink/15 pt-4">
              <button
                type="button"
                onClick={() => onChange({ start: null, end: null })}
                className="link-line text-sm"
              >
                Clear dates
              </button>
              <button type="button" onClick={close} className="btn btn-clay min-h-11 px-6">
                Done
              </button>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
}
