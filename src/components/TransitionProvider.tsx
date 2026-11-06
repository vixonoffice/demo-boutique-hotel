"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";
import { loadGsap, prefersReducedMotion } from "@/lib/gsap";
import { hashIntent, scrollToTarget } from "@/lib/scroll";

type Ctx = { navigate: (href: string) => void };
const NavCtx = createContext<Ctx>({ navigate: () => undefined });
export const useNav = () => useContext(NavCtx);

const labels: Record<string, string> = {
  "/": "Casa Vellora",
  "/rooms": "Rooms & suites",
  "/contact": "Say hello",
};

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const curtain = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const fromPath = useRef(pathname);
  const current = useRef(pathname);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    current.current = pathname;
  }, [pathname]);

  const finish = useCallback(async () => {
    if (!busy.current) return;
    if (safety.current) clearTimeout(safety.current);
    const { gsap } = await loadGsap();
    const c = curtain.current;
    const l = label.current;
    if (!c || !l) {
      busy.current = false;
      return;
    }
    scrollToTarget(0, 0, true);
    gsap
      .timeline({
        onComplete: () => {
          gsap.set(c, { visibility: "hidden" });
          busy.current = false;
          window.setTimeout(() => document.documentElement.style.removeProperty("--enter"), 900);
        },
      })
      .to(l, { yPercent: -115, duration: 0.5, ease: "expo.in" }, 0.1)
      .to(c, { clipPath: "inset(0% 0% 100% 0%)", duration: 0.9, ease: "expo.inOut" }, 0.35);
  }, []);

  useEffect(() => {
    if (busy.current && pathname !== fromPath.current) {
      const t = window.setTimeout(finish, 80);
      return () => window.clearTimeout(t);
    }
  }, [pathname, finish]);

  const navigate = useCallback(
    async (href: string) => {
      if (busy.current) return;
      const url = new URL(href, window.location.href);
      const target = url.pathname + url.search + url.hash;
      if (url.pathname === current.current) {
        if (url.hash) {
          scrollToTarget(url.hash, -10);
          window.history.pushState(null, "", target);
        } else {
          scrollToTarget(0);
        }
        return;
      }
      hashIntent.current = url.hash;
      if (prefersReducedMotion()) {
        router.push(target);
        return;
      }
      busy.current = true;
      fromPath.current = current.current;
      const { gsap } = await loadGsap();
      const c = curtain.current;
      const l = label.current;
      if (!c || !l) {
        busy.current = false;
        router.push(target);
        return;
      }
      l.textContent = labels[url.pathname] ?? "Casa Vellora";
      document.documentElement.style.setProperty("--enter", "0.75s");
      gsap.set(c, { visibility: "visible", clipPath: "inset(100% 0% 0% 0%)" });
      gsap.set(l, { yPercent: 115 });
      await gsap
        .timeline()
        .to(c, { clipPath: "inset(0% 0% 0% 0%)", duration: 0.8, ease: "expo.inOut" })
        .to(l, { yPercent: 0, duration: 0.7, ease: "expo.out" }, 0.35)
        .then();
      router.push(target);
      safety.current = setTimeout(finish, 3500);
    },
    [router, finish],
  );

  const value = useMemo(() => ({ navigate }), [navigate]);

  return (
    <NavCtx.Provider value={value}>
      {children}
      <div ref={curtain} className="vl-curtain" aria-hidden="true">
        <span className="block overflow-hidden px-6 pb-[0.2em]">
          <span ref={label} className="t-display t-lg block text-center" />
        </span>
      </div>
    </NavCtx.Provider>
  );
}

type LinkProps = Omit<ComponentProps<typeof Link>, "href"> & { href: string };

/** next/link whose internal clicks play the curtain page transition. */
export function TLink({ href, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useNav();
  const handle = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (rest.target && rest.target !== "_self") return;
    e.preventDefault();
    navigate(href);
  };
  return (
    <Link href={href} onClick={handle} {...rest}>
      {children}
    </Link>
  );
}
