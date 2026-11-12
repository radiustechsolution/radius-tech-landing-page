"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";
import {
  CommerceScene,
  DashboardScene,
  EnterpriseScene,
  FintechScene,
  LogisticsScene,
  MarketplaceScene,
} from "./solutions/SolutionVisuals";

const solutions = [
  {
    title: "Fintech",
    text: "Wallets, payments, savings and lending apps your customers trust.",
    tags: ["Wallets", "Payments", "Savings", "KYC"],
    Scene: FintechScene,
  },
  {
    title: "E-commerce",
    text: "Online stores and shopping apps built to sell more.",
    tags: ["Storefronts", "Checkout", "Inventory"],
    Scene: CommerceScene,
  },
  {
    title: "Logistics",
    text: "Track deliveries, manage fleets and move goods faster.",
    tags: ["Tracking", "Dispatch", "Fleet"],
    Scene: LogisticsScene,
  },
  {
    title: "Dashboards",
    text: "Turn your data into clear, real-time decisions.",
    tags: ["Analytics", "Reports", "Admin"],
    Scene: DashboardScene,
  },
  {
    title: "Marketplaces",
    text: "Connect customers with sellers and service providers.",
    tags: ["Listings", "Bookings", "Reviews"],
    Scene: MarketplaceScene,
  },
  {
    title: "Enterprise",
    text: "Internal tools that automate work and save time.",
    tags: ["Workflows", "HR", "ERP"],
    Scene: EnterpriseScene,
  },
];

function Heading() {
  return (
    <>
      <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
        <span className="text-gradient">Built for</span>
        <br />
        <span className="text-gradient">your</span>{" "}
        <span className="font-serif font-normal italic tracking-normal text-silver">
          industry
        </span>
      </h2>
      <p className="mt-5 max-w-xs text-lg text-silver-400">
        Products we design and build for businesses like yours.
      </p>
    </>
  );
}

function Tags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-4 flex flex-wrap gap-2 md:mt-6">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-silver-400"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function Outro({ className }: { className?: string }) {
  return (
    <BeamCard delay={-2} speed={8} className={className}>
      <div className="relative p-8 md:p-10">
        <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
          Your industry
          <br />
          <span className="font-serif font-normal italic tracking-normal text-silver">
            not listed?
          </span>
        </h3>
        <p className="mt-4 max-w-xs text-silver-400">
          We build custom software for any business. Tell us what you need.
        </p>
        <div className="mt-8">
          <GlowButton href="/start-project" variant="primary" size="md">
            Start a Project
          </GlowButton>
        </div>
      </div>
    </BeamCard>
  );
}

/* ================================================================== */
/* Phones & tablets: native swipe carousel                             */
/* ================================================================== */

function MobileCarousel() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Progress line follows the swipe (no re-renders)
  useEffect(() => {
    const el = scrollerRef.current;
    const bar = barRef.current;
    if (!el || !bar) return;

    const update = () => {
      const max = el.scrollWidth - el.clientWidth;
      const p = max > 0 ? el.scrollLeft / max : 0;
      bar.style.transform = `scaleX(${Math.max(0.08, p)})`;
    };

    update();
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <section className="py-24 lg:hidden">
      <div className="container-x">
        <Heading />
      </div>

      <div
        ref={scrollerRef}
        className="no-scrollbar mt-10 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 md:scroll-px-8 md:px-8"
      >
        {solutions.map(({ title, text, tags, Scene }) => (
          <BeamCard
            key={title}
            className="flex w-[85vw] max-w-[440px] shrink-0 snap-start flex-col"
          >
            <div className="relative h-[250px] shrink-0 overflow-hidden border-b border-white/[0.06]">
              <div className="absolute inset-0 origin-center scale-[0.8]">
                <Scene />
              </div>
            </div>
            <div className="relative flex flex-1 flex-col p-6">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white">
                {title}
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-silver-400">
                {text}
              </p>
              <Tags tags={tags} />
              <div className="mt-auto pt-6">
                <GlowButton href="/start-project" variant="outline" size="sm">
                  Start a {title} project
                </GlowButton>
              </div>
            </div>
          </BeamCard>
        ))}

        <Outro className="flex w-[85vw] max-w-[440px] shrink-0 snap-start items-center" />
      </div>

      {/* Progress line */}
      <div className="container-x mt-6">
        <div className="relative h-px overflow-hidden bg-white/10">
          <div
            ref={barRef}
            className="absolute inset-0 origin-left bg-white transition-transform duration-150 ease-out"
            style={{ transform: "scaleX(0.08)" }}
          />
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */
/* Desktop: pinned horizontal scroll                                   */
/* ================================================================== */

function Panel({
  index,
  progress,
  solution,
}: {
  index: number;
  progress: MotionValue<number>;
  solution: (typeof solutions)[number];
}) {
  const visualX = useTransform(progress, [0, 1], [90, -90]);
  const { Scene } = solution;

  return (
    <BeamCard
      delay={-index * 1.1}
      speed={8}
      className="h-[min(600px,70dvh)] w-[960px] shrink-0"
    >
      <div className="relative grid h-full grid-cols-2">
        <div className="relative flex flex-col justify-between p-12">
          <div>
            <h3 className="text-6xl font-semibold tracking-[-0.03em] text-white">
              {solution.title}
            </h3>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-silver-400">
              {solution.text}
            </p>
            <Tags tags={solution.tags} />
          </div>
          <div className="mt-6">
            <GlowButton href="/start-project" variant="outline" size="sm">
              Start a {solution.title} project
            </GlowButton>
          </div>
        </div>

        <div className="relative overflow-hidden border-l border-white/[0.06]">
          <div className="bg-grid absolute inset-0 opacity-70 [mask-image:none]" />
          <motion.div style={{ x: visualX }} className="absolute inset-0">
            <Scene />
          </motion.div>
        </div>
      </div>
    </BeamCard>
  );
}

function DesktopPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    update();
    const ro = new ResizeObserver(update);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, (v) => -v * distance);
  const bar = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  return (
    <section
      ref={sectionRef}
      className="relative hidden lg:block"
      style={{ height: `calc(${distance}px + 100dvh)` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pt-[76px]">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-6 px-[max(1.25rem,calc((100vw-80rem)/2+2rem))] will-change-transform"
        >
          <div className="w-[440px] shrink-0 pr-10">
            <Heading />
          </div>

          {solutions.map((s, i) => (
            <Panel
              key={s.title}
              index={i}
              progress={scrollYProgress}
              solution={s}
            />
          ))}

          <Outro className="flex h-[min(600px,70dvh)] w-[440px] shrink-0 items-center" />
        </motion.div>

        <div className="container-x mt-10">
          <div className="relative h-px bg-white/10">
            <motion.div
              style={{ scaleX: bar }}
              className="absolute inset-0 origin-left bg-white"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================== */

export function WhatWeBuild() {
  return (
    <div id="solutions">
      <MobileCarousel />
      <DesktopPinned />
    </div>
  );
}
