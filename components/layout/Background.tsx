"use client";

import { useEffect, useRef } from "react";

export function Background() {
  const ref = useRef<HTMLDivElement>(null);

  // Cursor-lit grid only on devices with a real mouse
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches)
      return;

    let raf = 0;
    let running = false;
    let tx = window.innerWidth / 2;
    let ty = window.innerHeight * 0.3;
    let cx = tx;
    let cy = ty;

    const loop = () => {
      const dx = tx - cx;
      const dy = ty - cy;
      cx += dx * 0.08;
      cy += dy * 0.08;
      el.style.setProperty("--mx", `${cx}px`);
      el.style.setProperty("--my", `${cy}px`);

      // Stop the loop once the glow has caught up with the cursor
      if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        running = false;
      }
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!running) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
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
      {/* Silver light from the top (gradient, no blur filter: cheap to draw) */}
      <div className="absolute -top-[30%] left-1/2 h-[80vh] w-[110vw] -translate-x-1/2 bg-[radial-gradient(closest-side,rgba(217,220,227,0.11),transparent)]" />

      {/* Slow moving glows: desktop only */}
      <div className="absolute top-[25%] -left-[15%] hidden h-[60vh] w-[50vw] animate-aurora-1 bg-[radial-gradient(closest-side,rgba(191,196,205,0.06),transparent)] md:block" />
      <div className="absolute -right-[10%] -bottom-[15%] hidden h-[65vh] w-[55vw] animate-aurora-2 bg-[radial-gradient(closest-side,rgba(236,238,242,0.05),transparent)] md:block" />

      {/* Grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Cursor-lit grid: desktop only */}
      <div className="bg-grid-hot absolute inset-0 hidden md:block" />

      {/* Thin silver line at the very top */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-silver-200/50 to-transparent" />

      {/* Grain: desktop only */}
      <div className="bg-noise absolute inset-0 hidden opacity-[0.05] mix-blend-overlay md:block" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.9)_100%)]" />
    </div>
  );
}
