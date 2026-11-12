"use client";

import { useEffect, useRef } from "react";

export function Background() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.3;
    let cx = tx;
    let cy = ty;

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };

    const loop = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        cx += dx * 0.08;
        cy += dy * 0.08;
        el.style.setProperty("--mx", `${cx}px`);
        el.style.setProperty("--my", `${cy}px`);
      }
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink"
    >
      {/* Silver light from the top */}
      <div className="absolute -top-[35%] left-1/2 h-[70vh] w-[80vw] -translate-x-1/2 rounded-full bg-silver-200/[0.09] blur-[130px]" />

      {/* Slow moving silver glows */}
      <div className="absolute top-[30%] -left-[15%] h-[50vh] w-[40vw] animate-aurora-1 rounded-full bg-silver-300/[0.05] blur-[140px]" />
      <div className="absolute -right-[10%] -bottom-[15%] h-[55vh] w-[45vw] animate-aurora-2 rounded-full bg-silver-100/[0.04] blur-[160px]" />

      {/* Grid + cursor-lit grid */}
      <div className="bg-grid absolute inset-0" />
      <div className="bg-grid-hot absolute inset-0" />

      {/* Thin silver line at the very top */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-silver-200/50 to-transparent" />

      {/* Grain */}
      <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.9)_100%)]" />
    </div>
  );
}
