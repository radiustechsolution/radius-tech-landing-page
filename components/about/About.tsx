"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { LogoMark } from "@/components/brand/Logo";
import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

export function AboutHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 140]), {
    stiffness: 80,
    damping: 20,
  });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const lines = [
    [{ t: "We build products" }],
    [{ t: "that" }, { t: "move", serif: true }],
    [{ t: "businesses forward" }],
  ];
  let w = 0;

  return (
    <section ref={ref} className="relative overflow-hidden pt-[76px]">
      <div className="container-x grid min-h-[calc(100dvh-76px)] items-center gap-10 lg:grid-cols-12">
        <motion.div
          style={{ y: textY, opacity: textOpacity }}
          className="relative z-10 pt-10 lg:col-span-7 lg:pt-0"
        >
          <h1 className="text-[40px] leading-[1.05] font-semibold tracking-[-0.035em] sm:text-6xl xl:text-[72px]">
            {lines.map((line, li) => (
              <span key={li} className="block">
                {line.map((part) =>
                  part.t.split(" ").map((word) => {
                    const i = w++;
                    return (
                      <span key={`${li}-${i}`}>
                        <span className="inline-block overflow-hidden pr-[0.06em] pb-[0.12em] -mb-[0.12em] align-bottom">
                          <motion.span
                            className={
                              "serif" in part
                                ? "inline-block font-serif font-normal italic tracking-normal text-silver"
                                : "text-gradient inline-block"
                            }
                            initial={{ y: "115%" }}
                            animate={{ y: "0%" }}
                            transition={{
                              delay: 0.15 + i * 0.08,
                              duration: 0.9,
                              ease,
                            }}
                          >
                            {word}
                          </motion.span>
                        </span>{" "}
                      </span>
                    );
                  }),
                )}
              </span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease }}
            className="mt-6 max-w-md text-lg leading-relaxed text-silver-400"
          >
            Radius Tech Solutions Limited is a technology company building
            digital products for startups and enterprises.
          </motion.p>
        </motion.div>

        {/* Giant logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.4, ease }}
          className="relative mx-auto flex aspect-square w-full max-w-[460px] items-center justify-center lg:col-span-5"
        >
          <div className="absolute inset-[15%] rounded-full bg-silver-200/[0.08] blur-[80px]" />

          {/* Orbit rings */}
          <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-white/10" />
          <div className="absolute inset-[10%] animate-[spin_30s_linear_infinite_reverse] rounded-full border border-white/[0.06]">
            <span className="absolute top-1/2 -left-1.5 size-3 -translate-y-1/2 rotate-45 rounded-[3px] bg-white" />
          </div>

          <motion.div style={{ rotate }} className="relative">
            <motion.div
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <LogoMark className="size-[200px] drop-shadow-[0_0_60px_rgba(255,255,255,0.15)] sm:size-[240px]" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Manifesto (words light up on scroll)                                */
/* ------------------------------------------------------------------ */

const manifesto =
  "We design and build mobile apps, web platforms, fintech systems and the cloud infrastructure behind them. We work with businesses that want technology that is fast, secure and built to grow. And we teach the next generation of developers to do the same.";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });
  const words = manifesto.split(" ");

  return (
    <section className="py-28 md:py-40">
      <div className="container-x">
        <p
          ref={ref}
          className="max-w-5xl text-3xl leading-[1.25] font-medium tracking-[-0.02em] text-white md:text-5xl md:leading-[1.2]"
        >
          {words.map((word, i) => (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, (i + 1) / words.length]}
            />
          ))}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Principles                                                          */
/* ------------------------------------------------------------------ */

const principles = [
  {
    title: "Built for people",
    text: "Every screen starts with the person who will use it.",
  },
  {
    title: "Quality first",
    text: "Clean code, tested features and no shortcuts.",
  },
  {
    title: "Clear communication",
    text: "You always know what we are working on and why.",
  },
  {
    title: "Made to scale",
    text: "We build for where your business is going, not just where it is.",
  },
];

export function Principles() {
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
    <section className="py-20 md:py-28">
      <div className="container-x">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl"
        >
          <span className="text-gradient">How we</span>{" "}
          <span className="font-serif font-normal italic tracking-normal text-silver">
            work
          </span>
        </motion.h2>

        <div
          ref={gridRef}
          onPointerMove={onPointerMove}
          className="spot-grid mt-14 grid gap-4 md:grid-cols-2"
        >
          {principles.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: (i % 2) * 0.1 }}
            >
              <BeamCard delay={-i * 1.7} speed={8} className="h-full">
                <div className="relative flex min-h-[220px] flex-col justify-end p-8 md:p-10">
                  <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-sm text-silver-400">{p.text}</p>
                </div>
              </BeamCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Two sides                                                           */
/* ------------------------------------------------------------------ */

const sides = [
  {
    word: "BUILD",
    title: "We build",
    text: "Software for businesses: mobile apps, web platforms, fintech systems and the cloud behind them.",
    cta: "Start a Project",
    href: "/start-project",
    variant: "primary" as const,
  },
  {
    word: "TEACH",
    title: "We teach",
    text: "Practical training that turns beginners into developers who can ship real products.",
    cta: "Explore Training",
    href: "/training",
    variant: "outline" as const,
  },
];

export function TwoSides() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-x">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl"
        >
          <span className="text-gradient">Two sides of</span>{" "}
          <span className="font-serif font-normal italic tracking-normal text-silver">
            Radius
          </span>
        </motion.h2>

        <div className="mt-14 grid gap-4 lg:grid-cols-2">
          {sides.map((s, i) => (
            <motion.div
              key={s.word}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
            >
              <BeamCard delay={-i * 3} speed={9} className="h-full">
                <div className="bg-grid absolute inset-0 opacity-60" />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -bottom-6 bg-linear-to-b from-white/[0.1] to-transparent bg-clip-text text-[120px] leading-none font-semibold tracking-tighter text-transparent transition-transform duration-700 group-hover:-translate-y-2 md:text-[160px]"
                >
                  {s.word}
                </span>

                <div className="relative flex min-h-[380px] flex-col justify-between p-8 md:p-12">
                  <div>
                    <h3 className="text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                      {s.title}
                    </h3>
                    <p className="mt-4 max-w-sm text-lg text-silver-400">
                      {s.text}
                    </p>
                  </div>
                  <div className="mt-10">
                    <GlowButton href={s.href} variant={s.variant} size="md">
                      {s.cta}
                    </GlowButton>
                  </div>
                </div>
              </BeamCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
