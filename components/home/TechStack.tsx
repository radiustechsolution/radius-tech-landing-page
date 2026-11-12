"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";

import { LogoMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

const rings = [
  {
    name: "Frontend",
    radius: 120,
    duration: 40,
    reverse: false,
    items: ["Next.js", "React", "TypeScript", "Tailwind"],
  },
  {
    name: "Mobile",
    radius: 192,
    duration: 55,
    reverse: true,
    items: ["Flutter", "Dart", "React Native", "Firebase"],
  },
  {
    name: "Backend & Cloud",
    radius: 264,
    duration: 75,
    reverse: false,
    items: [
      "Laravel",
      "PHP",
      "PostgreSQL",
      "MySQL",
      "Redis",
      "AWS",
      "Vercel",
      "Docker",
    ],
  },
];

export function TechStack() {
  const [active, setActive] = useState(0);
  const [listHover, setListHover] = useState(false);
  const [orbitHover, setOrbitHover] = useState(false);

  useEffect(() => {
    if (listHover) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % rings.length),
      3200,
    );
    return () => clearInterval(id);
  }, [listHover]);

  const playState = orbitHover ? "paused" : "running";

  return (
    <section id="stack" className="relative overflow-hidden py-28 md:py-36">
      <div className="container-x grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
        {/* ---------- Text + categories ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="min-w-0 lg:col-span-5"
        >
          <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
            <span className="text-gradient">Modern tools,</span>
            <br />
            <span className="font-serif font-normal italic tracking-normal text-silver">
              proven
            </span>{" "}
            <span className="text-gradient">results</span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-silver-400">
            We pick the right technology for your product, not the trendy one.
          </p>

          <div
            className="mt-10 space-y-2"
            onMouseEnter={() => setListHover(true)}
            onMouseLeave={() => setListHover(false)}
          >
            {rings.map((ring, i) => (
              <button
                key={ring.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "w-full rounded-xl border p-5 text-left transition-all duration-500",
                  active === i
                    ? "border-white/15 bg-white/[0.04]"
                    : "border-transparent hover:bg-white/[0.02]",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <h3
                    className={cn(
                      "text-xl font-medium tracking-tight transition-colors duration-500",
                      active === i ? "text-white" : "text-silver-500",
                    )}
                  >
                    {ring.name}
                  </h3>
                  <span className="font-mono text-[11px] text-silver-600">
                    {ring.items.length} tools
                  </span>
                </div>
                <p
                  className={cn(
                    "mt-2 text-sm transition-colors duration-500",
                    active === i ? "text-silver-400" : "text-silver-600",
                  )}
                >
                  {ring.items.join(", ")}
                </p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* ---------- Orbit ---------- */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease }}
          className="relative h-[340px] min-w-0 sm:h-[480px] lg:col-span-7 lg:h-[620px]"
        >
          <div
            onMouseEnter={() => setOrbitHover(true)}
            onMouseLeave={() => setOrbitHover(false)}
            className="absolute top-1/2 left-1/2 size-[600px] -translate-x-1/2 -translate-y-1/2 scale-[0.52] sm:scale-[0.78] lg:scale-100"
          >
            {/* Glow */}
            <div className="absolute top-1/2 left-1/2 size-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-silver-200/[0.06] blur-[80px]" />

            {/* Rings */}
            {rings.map((ring, ri) => {
              const isActive = active === ri;
              const spin = `spin ${ring.duration}s linear infinite${ring.reverse ? " reverse" : ""}`;
              const counter = `spin ${ring.duration}s linear infinite${ring.reverse ? "" : " reverse"}`;

              return (
                <div
                  key={ring.name}
                  className={cn(
                    "absolute top-1/2 left-1/2 rounded-full border border-dashed transition-colors duration-700",
                    isActive ? "border-white/30" : "border-white/[0.08]",
                  )}
                  style={{
                    width: ring.radius * 2,
                    height: ring.radius * 2,
                    marginLeft: -ring.radius,
                    marginTop: -ring.radius,
                    animation: spin,
                    animationPlayState: playState,
                  }}
                >
                  {ring.items.map((item, i) => {
                    const angle = (360 / ring.items.length) * i + ri * 20;

                    return (
                      <div
                        key={item}
                        className="absolute top-1/2 left-1/2"
                        style={{
                          transform: `rotate(${angle}deg) translateX(${ring.radius}px) rotate(${-angle}deg)`,
                        }}
                      >
                        <div
                          className="-translate-x-1/2 -translate-y-1/2"
                          style={{
                            animation: counter,
                            animationPlayState: playState,
                          }}
                        >
                          <span
                            className={cn(
                              "block rounded-md border px-3.5 py-2 font-mono text-[12px] whitespace-nowrap transition-all duration-700",
                              isActive
                                ? "border-white bg-white text-black shadow-[0_0_30px_-4px_rgba(255,255,255,0.5)]"
                                : "border-white/10 bg-black text-silver-400",
                            )}
                          >
                            {item}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* Center hub */}
            <div className="group absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.span
                aria-hidden
                className="absolute inset-0 rounded-2xl border border-white/30"
                animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                transition={{
                  duration: 2.4,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
              <div className="relative grid size-24 place-items-center rounded-2xl border border-white/15 bg-ink-3 shadow-[0_0_60px_-10px_rgba(255,255,255,0.3)]">
                <LogoMark className="size-12" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
