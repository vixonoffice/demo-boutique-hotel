"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { TLink } from "./TransitionProvider";

/** Sticky bottom bar on phones: appears after the hero, hides when the reservation form is on screen. */
export default function MobileBar() {
  const pathname = usePathname();
  const [pastHero, setPastHero] = useState(false);
  const [formState, setFormState] = useState<{ path: string; visible: boolean }>({ path: "", visible: false });

  useEffect(() => {
    const onScroll = () => setPastHero(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const form = document.getElementById("reserve");
    let io: IntersectionObserver | undefined;
    if (form) {
      io = new IntersectionObserver(([e]) => setFormState({ path: pathname, visible: e.isIntersecting }), { threshold: 0.12 });
      io.observe(form);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      io?.disconnect();
    };
  }, [pathname]);

  const atForm = formState.path === pathname && formState.visible;
  const show = pastHero && !atForm;
  const href = pathname === "/contact" ? "#reserve" : "/#reserve";

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 flex gap-2 bg-ink px-3 pt-3 transition-transform duration-500 ease-[var(--ease-vl)] md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      inert={!show}
    >
      <TLink href={href} className="btn btn-clay min-h-12 flex-1 px-4">
        Check dates
      </TLink>
      <a href={`mailto:${site.email}`} className="btn btn-ghost min-h-12 px-5 text-bone" aria-label="Email the hotel">
        Email
      </a>
    </div>
  );
}
