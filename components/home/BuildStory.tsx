"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { cn } from "@/lib/utils";

const PhoneScene = dynamic(() => import("./build/PhoneScene"), { ssr: false });

const ease = [0.22, 1, 0.36, 1] as const;

const steps = [
  {
    no: "01",
    title: "Design",
    text: "We map your idea and design every screen.",
  },
  {
    no: "02",
    title: "Develop",
    text: "Fast frontend, solid backend, clean code.",
  },
  {
    no: "03",
    title: "Integrate",
    text: "Payments, banking APIs and third-party services.",
  },
  {
    no: "04",
    title: "Launch",
    text: "Deployed to the cloud, monitored and ready to scale.",
  },
];

const stepFromProgress = (v: number) =>
  v < 0.28 ? 0 : v < 0.5 ? 1 : v < 0.72 ? 2 : 3;

function Heading() {
  return (
    <>
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-silver-500">
        How we build
      </p>
      <h2 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
        <span className="text-gradient">From idea to</span>{" "}
        <span className="font-serif font-normal italic tracking-normal text-silver">
          launch
        </span>
      </h2>
    </>
  );
}

/* ================================================================== */
/* Phones & tablets: lightweight version, no 3D, no pinning           */
/* ================================================================== */

function Drop({
  i,
  children,
  className,
}: {
  i: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 46, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.7, ease, delay: 0.15 + i * 0.22 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function MobileBuildStory() {
  const chart =
    "M0 34 C 14 34, 16 18, 30 20 S 50 32, 62 22 S 84 6, 98 12 S 118 20, 132 8";

  return (
    <section className="py-24 lg:hidden">
      <div className="container-x">
        <Heading />

        {/* Drawn phone with pieces dropping in */}
        <div className="relative mx-auto mt-12 w-fit">
          <div className="absolute inset-[-20%] rounded-full bg-[radial-gradient(closest-side,rgba(217,220,227,0.1),transparent)]" />

          <div className="relative h-[470px] w-[236px] rounded-[42px] border border-white/15 bg-linear-to-b from-silver-300/30 to-silver-700/20 p-[5px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.95)]">
            <div className="relative flex h-full flex-col gap-2 overflow-hidden rounded-[37px] bg-ink-2 px-3.5 pt-10 pb-3">
              <div className="absolute top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              <div className="absolute top-3 left-6 text-[10px] font-semibold text-white">
                9:41
              </div>

              {/* Greeting */}
              <Drop i={0} className="flex items-center justify-between">
                <div>
                  <p className="text-[9px] text-silver-500">Good morning,</p>
                  <p className="text-[13px] font-semibold text-white">Ada</p>
                </div>
                <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-white to-silver-500 text-[11px] font-bold text-black">
                  A
                </span>
              </Drop>

              {/* Balance (blue product accent) */}
              <Drop
                i={1}
                className="rounded-2xl bg-linear-to-br from-[#3a74ff] to-[#0c36b0] p-3.5"
              >
                <p className="text-[9px] text-white/75">Total balance</p>
                <p className="mt-1 text-lg font-semibold text-white">
                  ₦2,450,000.00
                </p>
                <span className="mt-2 inline-block rounded-full bg-white/15 px-2 py-0.5 text-[8px] text-white">
                  +12.4% this month
                </span>
              </Drop>

              {/* Actions */}
              <Drop i={2} className="grid grid-cols-4 gap-1.5">
                {["Send", "Receive", "Bills", "Cards"].map((a) => (
                  <div
                    key={a}
                    className="rounded-lg border border-white/[0.06] bg-ink-3 py-2 text-center text-[8px] text-silver-400"
                  >
                    {a}
                  </div>
                ))}
              </Drop>

              {/* Chart */}
              <Drop
                i={3}
                className="rounded-xl border border-white/[0.06] bg-[#0d0e11] p-3"
              >
                <p className="text-[8px] text-silver-500">Spending</p>
                <p className="text-[13px] font-semibold text-white">₦184,200</p>
                <svg viewBox="0 0 132 40" className="mt-1.5 h-9 w-full">
                  <path
                    d={`${chart} L132 40 L0 40 Z`}
                    fill="rgba(255,255,255,0.12)"
                  />
                  <path
                    d={chart}
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.6"
                  />
                </svg>
              </Drop>

              {/* Transactions */}
              <Drop
                i={4}
                className="space-y-2 rounded-xl border border-white/[0.06] bg-[#0d0e11] p-3"
              >
                {[
                  ["N", "Netflix", "-₦4,500", "text-white"],
                  ["S", "Salary", "+₦850,000", "text-brand-300"],
                ].map(([i, n, a, c]) => (
                  <div key={n} className="flex items-center gap-2">
                    <span className="grid size-6 place-items-center rounded-md bg-white/[0.07] text-[9px] text-white">
                      {i}
                    </span>
                    <span className="flex-1 text-[10px] text-silver-300">
                      {n}
                    </span>
                    <span className={cn("font-mono text-[10px]", c)}>{a}</span>
                  </div>
                ))}
              </Drop>

              {/* Nav */}
              <Drop
                i={5}
                className="mt-auto flex items-center justify-between rounded-full border border-white/[0.08] bg-ink-3 p-1.5"
              >
                <span className="rounded-full bg-white px-3 py-1 text-[9px] font-semibold text-black">
                  Home
                </span>
                {[0, 1, 2].map((n) => (
                  <span
                    key={n}
                    className="mr-3 size-3.5 rounded-[4px] border border-white/50"
                  />
                ))}
              </Drop>
            </div>
          </div>
        </div>

        {/* Steps */}
        <ol className="mt-14 space-y-6 border-l border-white/10 pl-6">
          {steps.map((s, i) => (
            <motion.li
              key={s.no}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease, delay: i * 0.05 }}
            >
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-xs text-silver-500">
                  {s.no}
                </span>
                <span className="text-xl font-medium text-white">
                  {s.title}
                </span>
              </div>
              <p className="mt-1 text-[15px] text-silver-400">{s.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Desktop: pinned 3D version                                          */
/* ================================================================== */

function DesktopBuildStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const [step, setStep] = useState(0);
  const [inView, setInView] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const rail = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const s = stepFromProgress(v);
    setStep((prev) => (prev === s ? prev : s));
  });

  // Hidden on small screens (display: none), so this never fires there
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        setInView(e.isIntersecting);
        if (e.isIntersecting) setMounted(true);
      },
      { rootMargin: "100% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative hidden h-[420vh] lg:block">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="container-x grid h-full grid-cols-12 items-center gap-8 pt-[76px]">
          <div className="relative z-10 col-span-5">
            <Heading />

            <div className="relative mt-12 pl-8">
              <div className="absolute top-0 bottom-0 left-0 w-px bg-white/10" />
              <motion.div
                style={{ scaleY: rail }}
                className="absolute top-0 bottom-0 left-0 w-px origin-top bg-linear-to-b from-white to-silver-400"
              />

              <ul className="space-y-7">
                {steps.map((s, i) => {
                  const active = i === step;
                  return (
                    <li key={s.no}>
                      <div className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "font-mono text-xs transition-colors duration-500",
                            active ? "text-white" : "text-silver-600",
                          )}
                        >
                          {s.no}
                        </span>
                        <span
                          className={cn(
                            "text-2xl font-medium tracking-tight transition-colors duration-500",
                            active ? "text-white" : "text-silver-600",
                          )}
                        >
                          {s.title}
                        </span>
                      </div>
                      <AnimatePresence initial={false}>
                        {active && (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.5, ease }}
                            className="overflow-hidden pl-9 text-silver-400"
                          >
                            <span className="block pt-2">{s.text}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          <div className="relative col-span-7 h-full">
            <div className="absolute top-1/2 left-1/2 -z-10 size-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(217,220,227,0.08),transparent)]" />
            <div className="pointer-events-none absolute inset-0">
              {mounted && (
                <PhoneScene progress={scrollYProgress} active={inView} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */

export function BuildStory() {
  return (
    <div id="process">
      <MobileBuildStory />
      <DesktopBuildStory />
    </div>
  );
}
