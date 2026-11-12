"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";

import { GlowButton } from "@/components/ui/GlowButton";
import { TypingTerminal } from "./hero/TypingTerminal";
import { MobileRobot } from "./hero/MobileRobot";
import { isLowPower } from "@/lib/device";
import { DESKTOP_QUERY } from "@/lib/useMedia";
import { cn } from "@/lib/utils";

const RobotScene = dynamic(() => import("./hero/RobotScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

const titleLines: { text: string; className?: string }[][] = [
  [{ text: "We turn ideas" }],
  [
    { text: "into" },
    {
      text: "powerful",
      className: "font-serif font-normal italic tracking-normal text-silver",
    },
  ],
  [{ text: "digital products" }],
];

function Title() {
  let wordIndex = 0;

  return (
    <h1 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-6xl lg:text-[56px] xl:text-[68px]">
      {titleLines.map((line, li) => (
        <span key={li} className="block whitespace-nowrap">
          {line.map((part) =>
            part.text.split(" ").map((word) => {
              const i = wordIndex++;
              return (
                <span key={`${li}-${i}`}>
                  <span className="inline-block overflow-hidden pr-[0.06em] pb-[0.12em] -mb-[0.12em] align-bottom">
                    <span
                      className={cn(
                        "inline-block animate-rise",
                        part.className ?? "text-gradient",
                      )}
                      style={{ animationDelay: `${0.05 + i * 0.06}s` }}
                    >
                      {word}
                    </span>
                  </span>{" "}
                </span>
              );
            }),
          )}
        </span>
      ))}
    </h1>
  );
}

type SceneMode = "pending" | "3d" | "drawn";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [sceneVisible, setSceneVisible] = useState(true);
  const [mode, setMode] = useState<SceneMode>("pending");

  useEffect(() => {
    const desktop = window.matchMedia(DESKTOP_QUERY).matches;
    if (!desktop || isLowPower()) {
      setMode("drawn");
      return;
    }
    const start = () => setMode("3d");
    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(start, { timeout: 1500 });
      return () => window.cancelIdleCallback(id);
    }
    const t = setTimeout(start, 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const el = sceneRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) =>
      setSceneVisible(entry.isIntersecting),
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const sceneY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const is3d = mode === "3d";

  return (
    <section
      ref={sectionRef}
      className="relative isolate overflow-hidden pt-[76px]"
    >
      <div className="container-x grid min-h-[calc(100dvh-76px)] items-center gap-6 lg:grid-cols-12 lg:gap-8">
        {/* ---------- Text (scroll drift on desktop only) ---------- */}
        <motion.div
          style={is3d ? { y: textY, opacity: textOpacity } : undefined}
          className="relative z-10 pt-10 lg:col-span-6 lg:pt-0"
        >
          <Title />

          <p
            className="mt-6 max-w-md animate-fade-up text-lg leading-relaxed text-silver-400"
            style={{ animationDelay: "0.35s" }}
          >
            Apps, platforms and fintech systems built to scale your business.
          </p>

          <div
            className="mt-10 flex animate-fade-up flex-col gap-3 sm:flex-row"
            style={{ animationDelay: "0.45s" }}
          >
            <GlowButton href="/start-project" variant="primary" size="lg">
              Start a Project
            </GlowButton>
            <GlowButton href="/#work" variant="outline" size="lg">
              See Our Work
            </GlowButton>
          </div>
        </motion.div>

        {/* ---------- Robot ---------- */}
        <motion.div
          ref={sceneRef}
          style={is3d ? { scale: sceneScale, y: sceneY } : undefined}
          className="relative h-[400px] sm:h-[500px] lg:col-span-6 lg:h-[660px]"
        >
          <div
            className={cn(
              "absolute inset-0 animate-fade-up",
              mode === "drawn"
                ? "block"
                : mode === "pending"
                  ? "lg:hidden"
                  : "hidden",
            )}
            style={{ animationDelay: "0.2s" }}
          >
            <MobileRobot />
          </div>

          {is3d && (
            <>
              <div className="absolute top-1/2 left-1/2 -z-10 size-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(217,220,227,0.12),transparent)]" />
              <motion.div
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, ease }}
                className="pointer-events-none absolute inset-y-0 left-1/2 w-[160%] -translate-x-1/2"
              >
                <RobotScene active={sceneVisible} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.9, ease }}
                className="absolute bottom-6 left-0 z-10"
              >
                <TypingTerminal />
              </motion.div>
            </>
          )}
        </motion.div>
      </div>

      {is3d && (
        <div
          className="pointer-events-none absolute bottom-8 left-1/2 flex -translate-x-1/2 animate-fade-up flex-col items-center gap-3"
          style={{ animationDelay: "1.2s" }}
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-silver-600">
            Scroll
          </span>
          <span className="relative h-12 w-px overflow-hidden bg-white/10">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-linear-to-b from-transparent to-white"
              animate={{ y: ["-100%", "200%"] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </span>
        </div>
      )}

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-linear-to-b from-transparent to-black/60" />
    </section>
  );
}
