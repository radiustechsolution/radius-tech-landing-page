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

export function BuildStory() {
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

  // Load the 3D phone only when the section gets close, then keep it
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
    <section ref={sectionRef} id="process" className="relative h-[420vh]">
      <div className="sticky top-0 h-dvh overflow-hidden">
        <div className="container-x grid h-full grid-rows-[1fr_auto] items-center gap-4 pt-[76px] pb-8 lg:grid-cols-12 lg:grid-rows-1 lg:gap-8 lg:pb-0">
          {/* ---------- Text ---------- */}
          <div className="relative z-10 order-2 lg:order-1 lg:col-span-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-silver-500">
              How we build
            </p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
              <span className="text-gradient">From idea to</span>{" "}
              <span className="font-serif font-normal italic tracking-normal text-silver">
                launch
              </span>
            </h2>

            {/* Desktop: all steps */}
            <div className="relative mt-12 hidden pl-8 lg:block">
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

            {/* Mobile: active step only */}
            <div className="mt-6 h-20 lg:hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease }}
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-white">
                      {steps[step].no}
                    </span>
                    <span className="text-xl font-medium text-white">
                      {steps[step].title}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-silver-400">
                    {steps[step].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ---------- Phone ---------- */}
          <div className="relative order-1 h-full min-h-[320px] lg:order-2 lg:col-span-7">
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
