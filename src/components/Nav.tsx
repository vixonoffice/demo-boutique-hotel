"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/data/site";
import { lockScroll, unlockScroll } from "@/lib/scroll";
import { TLink } from "./TransitionProvider";

export default function Nav() {
  const pathname = usePathname();
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const y = window.scrollY;
        setSolid(y > 60);
        if (y > 500 && y > last + 4) setHidden(true);
        else if (y < last - 4 || y < 300) setHidden(false);
        last = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    lockScroll();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [open]);

  const reserveHref = pathname === "/contact" ? "#reserve" : "/#reserve";
  const close = () => setOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 text-bone transition-[transform,background-color] duration-500 ease-[var(--ease-vl)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${solid || open ? "bg-ink" : "bg-transparent"}`}
      >
        <div className="gutter mx-auto flex h-[4.5rem] max-w-[1900px] items-center justify-between md:h-24">
          <TLink href="/" onClick={close} className="t-display text-[1.7rem] leading-none md:text-[2rem]" aria-label="Casa Vellora, home">
            Casa <em>Vellora</em>
          </TLink>

          <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
            {nav.map((l) => {
              const active = l.href === pathname;
              return (
                <TLink
                  key={l.href}
                  href={l.href}
                  className={`link-line pb-1 text-[0.8rem] font-medium uppercase tracking-[0.16em] ${active ? "text-ember" : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {l.label}
                </TLink>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <TLink href={reserveHref} onClick={close} data-magnetic data-cursor="" className="btn btn-clay hidden min-h-12 px-6 sm:inline-flex">
              <span data-magnetic-in>Reserve</span>
            </TLink>
            <button
              type="button"
              className="relative flex h-12 w-12 items-center justify-center rounded-full border border-bone/50 lg:hidden"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-5 bg-bone transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu"
        inert={!open}
        data-lenis-prevent
        className="fixed inset-0 z-40 overflow-y-auto bg-ink text-bone transition-[clip-path] duration-[800ms] ease-[var(--ease-vl)] lg:hidden"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
      >
        <div className="gutter flex min-h-full flex-col justify-between pb-10 pt-28">
          <nav aria-label="Mobile">
            <ul className="space-y-1">
              {[{ label: "Home", href: "/" }, ...nav].map((l, i) => (
                <li key={l.href} className="overflow-hidden">
                  <TLink
                    href={l.href}
                    onClick={close}
                    className="t-display block text-[clamp(2.6rem,12vw,4.5rem)] leading-[1.05] transition-transform duration-[900ms] ease-[var(--ease-vl)]"
                    style={{ transform: open ? "none" : "translateY(105%)", transitionDelay: open ? `${150 + i * 70}ms` : "0ms" }}
                  >
                    {l.label}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-12 space-y-6">
            <TLink href={reserveHref} onClick={close} className="btn btn-clay btn-block-sm w-full">
              Reserve a stay
            </TLink>
            <p className="text-sm leading-relaxed text-mist">
              {site.address.join(", ")}
              <br />
              <a href={`mailto:${site.email}`} className="link-line text-bone">
                {site.email}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
