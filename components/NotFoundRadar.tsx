"use client";

import Link from "next/link";
import { motion } from "motion/react";

import { LogoMark } from "@/components/brand/Logo";
import { GlowButton } from "@/components/ui/GlowButton";

const ease = [0.22, 1, 0.36, 1] as const;
const SWEEP = 4; // seconds per radar rotation

/* angle: degrees clockwise from top, r: % distance from center */
const targets = [
  { label: "Home", href: "/", angle: 35, r: 36 },
  { label: "Solutions", href: "/solutions", angle: 110, r: 28 },
  { label: "Start a Project", href: "/start-project", angle: 175, r: 42 },
  { label: "Training", href: "/training", angle: 240, r: 34 },
  { label: "About", href: "/about", angle: 305, r: 26 },
];

export function NotFoundRadar() {
  return (
    <section className="relative overflow-hidden pt-[76px]">
      {/* Giant 404 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-[38vw] leading-none font-semibold tracking-tighter select-none"
      >
        <span className="bg-linear-to-b from-white/[0.06] to-transparent bg-clip-text text-transparent">
          404
        </span>
      </div>

      <div className="container-x relative flex min-h-[calc(100dvh-76px)] flex-col items-center justify-center gap-12 py-16 lg:flex-row lg:justify-between">
        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="max-w-md text-center lg:text-left"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-silver-600">
            Error 404
          </p>
          <h1 className="mt-5 text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-6xl">
            <span className="text-gradient">This page is</span>
            <br />
            <span className="text-gradient">off the</span>{" "}
            <span className="font-serif font-normal italic tracking-normal text-silver">
              radar
            </span>
          </h1>
          <p className="mt-5 text-lg text-silver-400">
            The page you&apos;re looking for doesn&apos;t exist or has moved.
            Pick a destination on the radar.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <GlowButton href="/" variant="primary" size="lg">
              Back to Home
            </GlowButton>
            <GlowButton href="/start-project" variant="outline" size="lg">
              Start a Project
            </GlowButton>
          </div>
        </motion.div>

        {/* Radar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1.2, ease }}
          className="relative aspect-square w-full max-w-[340px] shrink-0 sm:max-w-[480px]"
        >
          {/* Glow */}
          <div className="absolute inset-[20%] rounded-full bg-silver-200/[0.08] blur-[70px]" />

          {/* Rings */}
          <div className="absolute inset-0 rounded-full border border-white/10" />
          <div className="absolute inset-[15%] rounded-full border border-dashed border-white/[0.08]" />
          <div className="absolute inset-[32%] rounded-full border border-white/[0.07]" />

          {/* Cross lines */}
          <div className="absolute inset-y-0 left-1/2 w-px bg-linear-to-b from-transparent via-white/10 to-transparent" />
          <div className="absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />

          {/* Sweep */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 0deg 290deg, rgba(255,255,255,0.03) 310deg, rgba(255,255,255,0.18) 358deg, rgba(255,255,255,0.6) 360deg)",
              animation: `spin ${SWEEP}s linear infinite`,
            }}
          />

          {/* Targets */}
          {targets.map((t) => {
            const rad = (t.angle * Math.PI) / 180;
            const left = 50 + Math.sin(rad) * t.r;
            const top = 50 - Math.cos(rad) * t.r;

            return (
              <Link
                key={t.href}
                href={t.href}
                style={{ left: `${left}%`, top: `${top}%` }}
                className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
              >
                <span className="relative block overflow-hidden rounded-md border border-white/15 bg-black/80 px-3 py-1.5 font-mono text-[11px] whitespace-nowrap text-silver-300 backdrop-blur transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
                  {/* Flash when the sweep passes */}
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 bg-white/25"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [1, 0, 0] }}
                    transition={{
                      duration: SWEEP,
                      times: [0, 0.35, 1],
                      repeat: Infinity,
                      delay: (t.angle / 360) * SWEEP,
                      ease: "easeOut",
                    }}
                  />
                  <span className="relative">{t.label}</span>
                </span>
              </Link>
            );
          })}

          {/* Center logo */}
          <div className="group absolute top-1/2 left-1/2 z-10 grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-white/15 bg-ink-3 shadow-[0_0_50px_-10px_rgba(255,255,255,0.35)] sm:size-24">
            <LogoMark className="size-11 sm:size-12" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
