"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import type Lenis from "lenis";
import "lenis/dist/lenis.css";
import { DESKTOP_QUERY } from "@/lib/useMedia";

const LenisContext = createContext<Lenis | null>(null);

export const useLenis = () => useContext(LenisContext);

/** Offset for the fixed navbar when scrolling to a section */
export const SCROLL_OFFSET = -100;

function ScrollReset({ lenis }: { lenis: Lenis | null }) {
  const pathname = usePathname();

  useEffect(() => {
    const hash = window.location.hash;

    if (hash) {
      const t = setTimeout(() => {
        const el = document.querySelector<HTMLElement>(hash);
        if (!el) return;
        if (lenis)
          lenis.scrollTo(el, {
            offset: SCROLL_OFFSET,
            immediate: true,
            force: true,
          });
        else
          window.scrollTo({
            top:
              el.getBoundingClientRect().top + window.scrollY + SCROLL_OFFSET,
          });
      }, 100);
      return () => clearTimeout(t);
    }

    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Phones/tablets and reduced-motion users: native scrolling, Lenis never downloads
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!desktop || reduceMotion) return;

    let instance: Lenis | null = null;
    let raf = 0;
    let cancelled = false;

    // Load Lenis only on desktop
    import("lenis").then(({ default: LenisClass }) => {
      if (cancelled) return;

      instance = new LenisClass({
        lerp: 0.09,
        wheelMultiplier: 1,
        anchors: { offset: SCROLL_OFFSET },
      });

      const loop = (time: number) => {
        instance?.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);

      setLenis(instance);
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      instance?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <LenisContext.Provider value={lenis}>
      <ScrollReset lenis={lenis} />
      {children}
    </LenisContext.Provider>
  );
}
