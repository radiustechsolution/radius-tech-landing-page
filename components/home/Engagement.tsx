"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Visuals                                                             */
/* ------------------------------------------------------------------ */

function PlanVisual() {
  const weeks = 8;
  const today = 4.5; // week position of the "today" line
  const tasks = [
    { label: "Design", start: 0, length: 2.5, active: false },
    { label: "Build", start: 2, length: 4, active: true },
    { label: "Testing", start: 5, length: 2, active: false },
    { label: "Launch", start: 7, length: 1, active: false },
  ];

  return (
    <div className="flex h-full flex-col justify-center py-3">
      {/* Week header */}
      <div className="grid grid-cols-[56px_1fr]">
        <span />
        <div className="grid grid-cols-8">
          {Array.from({ length: weeks }).map((_, i) => (
            <span key={i} className="font-mono text-[9px] text-silver-600">
              W{i + 1}
            </span>
          ))}
        </div>
      </div>

      {/* Rows */}
      <div className="mt-2 grid grid-cols-[56px_1fr]">
        <div className="space-y-2">
          {tasks.map((t) => (
            <p
              key={t.label}
              className="flex h-3 items-center text-[10px] text-silver-500"
            >
              {t.label}
            </p>
          ))}
        </div>

        <div className="relative space-y-2">
          {/* Week grid lines */}
          <div className="pointer-events-none absolute inset-0 grid grid-cols-8">
            {Array.from({ length: weeks }).map((_, i) => (
              <span key={i} className="border-l border-white/[0.05]" />
            ))}
          </div>

          {tasks.map((t, i) => (
            <div key={t.label} className="relative h-3">
              <motion.span
                className={cn(
                  "absolute inset-y-0 rounded-[3px]",
                  t.active
                    ? "bg-white shadow-[0_0_12px_rgba(255,255,255,0.35)]"
                    : "bg-white/20",
                )}
                style={{ left: `${(t.start / weeks) * 100}%` }}
                initial={{ width: 0 }}
                whileInView={{ width: `${(t.length / weeks) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease, delay: 0.2 + i * 0.18 }}
              />
            </div>
          ))}

          {/* Today line */}
          <motion.div
            className="absolute -top-1 -bottom-1 w-px bg-white/70"
            style={{ left: `${(today / weeks) * 100}%` }}
            initial={{ opacity: 0, scaleY: 0 }}
            whileInView={{ opacity: 1, scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 1.1 }}
          >
            <span className="absolute -top-4 left-1/2 -translate-x-1/2 font-mono text-[8px] uppercase tracking-wider text-silver-400">
              Today
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function TeamVisual() {
  const roles = ["PM", "UI", "FE", "BE", "QA"];
  return (
    <div className="flex h-full items-center justify-center">
      {roles.map((r, i) => (
        <span
          key={r}
          className={cn(
            "grid size-12 place-items-center rounded-xl border-2 border-ink-2 font-mono text-xs font-semibold transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
            "-ml-3 first:ml-0 group-hover:ml-1.5 group-hover:first:ml-0",
            i === 0
              ? "bg-white text-black"
              : "bg-linear-to-br from-silver-200 to-silver-500 text-black",
          )}
          style={{ zIndex: roles.length - i }}
        >
          {r}
        </span>
      ))}
    </div>
  );
}

function PulseVisual() {
  const path =
    "M0 30 L40 30 L50 30 L58 10 L66 50 L74 22 L80 30 L120 30 L130 30 L138 14 L146 46 L152 30 L200 30";
  return (
    <div className="relative flex h-full items-center overflow-hidden">
      <svg
        viewBox="0 0 200 60"
        preserveAspectRatio="none"
        className="h-16 w-full"
      >
        <path
          d={path}
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d={path}
          fill="none"
          stroke="#ffffff"
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          strokeDasharray="60 400"
          animate={{ strokeDashoffset: [60, -400] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

// TODO: edit "includes" to match exactly what you offer
const models = [
  {
    title: "Fixed Project",
    text: "You have a clear idea. We scope it, price it and deliver it.",
    bestFor: "MVPs, websites, defined features",
    includes: [
      "Discovery & scoping",
      "Design and development",
      "Testing & launch",
      "Fixed timeline and budget",
    ],
    cta: "Start a Project",
    featured: false,
    Visual: PlanVisual,
  },
  {
    title: "Dedicated Team",
    text: "Our developers work as an extension of your team.",
    bestFor: "Startups scaling fast, long-term builds",
    includes: [
      "Dedicated developers",
      "Regular progress updates",
      "Scale the team up or down",
      "Monthly billing",
    ],
    cta: "Build My Team",
    featured: true,
    Visual: TeamVisual,
  },
  {
    title: "Support & Maintenance",
    text: "Keep your product fast, secure and up to date.",
    bestFor: "Live apps and websites",
    includes: [
      "Bug fixes & updates",
      "Server monitoring",
      "Security patches",
      "Small feature improvements",
    ],
    cta: "Get Support",
    featured: false,
    Visual: PulseVisual,
  },
];

// TODO: keep only what you actually offer on every project
const included = [
  "You own the source code",
  "NDA on request",
  "Clear progress updates",
  "Post-launch support",
];

/* ------------------------------------------------------------------ */
/* Tilt card                                                           */
/* ------------------------------------------------------------------ */

function TiltCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 18 });

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    ry.set(px * 10);
    rx.set(-py * 10);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <div className={cn("[perspective:1200px]", className)}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Engagement() {
  const gridRef = useRef<HTMLDivElement>(null);

  const onPointerMove = (e: React.PointerEvent) => {
    gridRef.current
      ?.querySelectorAll<HTMLElement>(".beam-card")
      .forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - r.left}px`);
        card.style.setProperty("--y", `${e.clientY - r.top}px`);
      });
  };

  return (
    <section id="engagement" className="relative py-28 md:py-36">
      <div className="container-x">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-2xl text-center"
        >
          <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
            <span className="text-gradient">Ways to</span>{" "}
            <span className="font-serif font-normal italic tracking-normal text-silver">
              work
            </span>{" "}
            <span className="text-gradient">with us</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-lg text-silver-400">
            Pick the model that fits your stage. Not sure? We&apos;ll help you
            choose.
          </p>
        </motion.div>

        {/* Cards */}
        <div
          ref={gridRef}
          onPointerMove={onPointerMove}
          className="spot-grid mt-16 grid gap-5 lg:grid-cols-3"
        >
          {models.map((m, i) => (
            <motion.div
              key={m.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
            >
              <TiltCard className="h-full">
                <BeamCard
                  delay={-i * 2}
                  speed={m.featured ? 5 : 8}
                  className={cn("h-full", m.featured && "bg-ink-3")}
                >
                  {m.featured && (
                    <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-linear-to-b from-white/[0.06] to-transparent" />
                  )}

                  <div className="relative flex h-full flex-col p-7 md:p-8">
                    <div className="flex items-center justify-between">
                      <h3 className="text-2xl font-medium tracking-tight text-white">
                        {m.title}
                      </h3>
                      {m.featured && (
                        <span className="rounded-md border border-white/15 bg-white/[0.06] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-silver-300">
                          Flexible
                        </span>
                      )}
                    </div>
                    <p className="mt-3 text-[15px] leading-relaxed text-silver-400">
                      {m.text}
                    </p>

                    {/* Visual */}
                    <div className="my-7 h-[130px] rounded-xl border border-white/[0.06] bg-black/60 px-4">
                      <m.Visual />
                    </div>

                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver-600">
                      Best for
                    </p>
                    <p className="mt-1.5 text-sm text-silver-300">
                      {m.bestFor}
                    </p>

                    <ul className="mt-6 flex-1 space-y-3 border-t border-white/[0.07] pt-6">
                      {m.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-[15px] text-silver-300"
                        >
                          <span className="grid size-5 shrink-0 place-items-center rounded-md bg-white/[0.08] text-[11px] text-white">
                            ✓
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-8">
                      <GlowButton
                        href="/start-project"
                        variant={m.featured ? "primary" : "outline"}
                        size="md"
                        className="w-full"
                      >
                        {m.cta}
                      </GlowButton>
                    </div>
                  </div>
                </BeamCard>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Included in every project */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-10 flex flex-col items-center gap-5 md:flex-row md:justify-center md:gap-8"
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-600">
            Every project includes
          </span>
          <div className="flex flex-wrap justify-center gap-2">
            {included.map((item) => (
              <span
                key={item}
                className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-silver-400"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
