"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { videos, type VideoKey } from "@/lib/media";

type Props = {
  name: VideoKey;
  /** Hero video: src is in the server HTML and starts immediately. Others attach src near the viewport. */
  eager?: boolean;
  className?: string;
  sizes?: string;
  objectPosition?: string;
  /** Show a pause/play button (WCAG 2.2.2) in the given corner classes. */
  control?: string;
  alt?: string;
};

/**
 * Autoplaying muted looping video over a poster image.
 * Always plays (no save-data / network gating), with the iOS fallbacks: muted + playsInline,
 * no audio track in the files, and play() retried on first touch / scroll / visibility change.
 */
export default function AutoVideo({ name, eager = false, className = "", sizes = "100vw", objectPosition, control, alt = "" }: Props) {
  const { src, poster } = videos[name];
  const ref = useRef<HTMLVideoElement>(null);
  const userPaused = useRef(false);
  const visible = useRef(eager);
  const [paused, setPaused] = useState(false);

  const play = useCallback(() => {
    const v = ref.current;
    if (!v || userPaused.current || !visible.current) return;
    if (!v.getAttribute("src") && !v.currentSrc) return;
    const p = v.play();
    if (p) p.catch(() => undefined);
  }, []);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("playsinline", "");
    v.setAttribute("webkit-playsinline", "");

    const io = new IntersectionObserver(
      ([entry]) => {
        visible.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (!v.getAttribute("src")) {
            v.src = src;
            v.load();
          }
          play();
        } else {
          v.pause();
        }
      },
      { rootMargin: eager ? "0px" : "400px 600px" },
    );
    io.observe(v);

    const retry = () => {
      if (v.paused) play();
    };
    const onVis = () => {
      if (document.visibilityState === "visible") retry();
    };
    const evs = ["touchstart", "pointerdown", "scroll", "keydown"] as const;
    evs.forEach((e) => window.addEventListener(e, retry, { passive: true }));
    document.addEventListener("visibilitychange", onVis);
    v.addEventListener("loadeddata", retry);
    retry();

    return () => {
      io.disconnect();
      evs.forEach((e) => window.removeEventListener(e, retry));
      document.removeEventListener("visibilitychange", onVis);
      v.removeEventListener("loadeddata", retry);
    };
  }, [src, eager, play]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      userPaused.current = false;
      setPaused(false);
      play();
    } else {
      userPaused.current = true;
      setPaused(true);
      v.pause();
    }
  };

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`} data-inner>
      <Image
        src={poster}
        alt={alt}
        fill
        sizes={sizes}
        quality={70}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        preload={eager}
        className="object-cover"
        style={objectPosition ? { objectPosition } : undefined}
      />
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        style={objectPosition ? { objectPosition } : undefined}
        src={eager ? src : undefined}
        autoPlay
        muted
        loop
        playsInline
        preload={eager ? "auto" : "none"}
        aria-hidden="true"
        tabIndex={-1}
        disablePictureInPicture
        disableRemotePlayback
      />
      {control ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={paused}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className={`absolute z-20 flex h-11 w-11 items-center justify-center rounded-full border border-bone/60 bg-ink/50 text-bone transition-colors hover:bg-bone hover:text-ink ${control}`}
        >
          {paused ? (
            <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true"><path d="M1 1l10 6-10 6z" fill="currentColor" /></svg>
          ) : (
            <svg width="12" height="14" viewBox="0 0 12 14" aria-hidden="true"><path d="M1 1h3v12H1zM8 1h3v12H8z" fill="currentColor" /></svg>
          )}
        </button>
      ) : null}
    </div>
  );
}
