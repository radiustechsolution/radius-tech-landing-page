"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DESKTOP_QUERY } from "@/lib/useMedia";

gsap.registerPlugin(ScrollTrigger);

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
        ScrollTrigger.refresh();
      }, 100);
      return () => clearTimeout(t);
    }

    if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
    ScrollTrigger.refresh();
  }, [pathname, lenis]);

  return null;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    // Phones/tablets: native scrolling (faster). Reduced motion: native too.
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!desktop || reduceMotion) return;

    const instance = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 1,
      anchors: { offset: SCROLL_OFFSET },
    });

    instance.on("scroll", ScrollTrigger.update);

    const update = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    setLenis(instance);

    return () => {
      gsap.ticker.remove(update);
      instance.destroy();
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
