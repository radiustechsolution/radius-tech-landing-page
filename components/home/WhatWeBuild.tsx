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
      className="h-[min(600px,70dvh)] w-[86vw] shrink-0 md:w-[78vw] lg:w-[960px]"
    >
      <div className="relative flex h-full flex-col md:grid md:grid-cols-2">
        {/* Visual */}
        <div className="relative order-1 h-[44%] overflow-hidden border-b border-white/[0.06] md:order-2 md:h-full md:border-b-0 md:border-l">
          <div className="bg-grid absolute inset-0 opacity-70 [mask-image:none]" />
          <motion.div style={{ x: visualX }} className="absolute inset-0">
            <Scene />
          </motion.div>
        </div>

        {/* Text */}
        <div className="relative order-2 flex flex-1 flex-col justify-between p-6 md:order-1 md:p-10 lg:p-12">
          <div>
            <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl lg:text-6xl">
              {solution.title}
            </h3>
            <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-silver-400 md:mt-5 md:text-lg">
              {solution.text}
            </p>
            <div className="mt-4 flex flex-wrap gap-2 md:mt-6">
              {solution.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-silver-400"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <GlowButton href="/start-project" variant="outline" size="sm">
              Start a {solution.title} project
            </GlowButton>
          </div>
        </div>
      </div>
    </BeamCard>
  );
}

export function WhatWeBuild() {
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
      id="solutions"
      className="relative"
      style={{ height: `calc(${distance}px + 100dvh)` }}
    >
      <div className="sticky top-0 flex h-dvh flex-col justify-center overflow-hidden pt-[76px]">
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-5 px-[max(1.25rem,calc((100vw-80rem)/2+2rem))] will-change-transform md:gap-6"
        >
          {/* Intro */}
          <div className="w-[80vw] shrink-0 pr-4 md:w-[440px] md:pr-10">
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
          </div>

          {/* Panels */}
          {solutions.map((s, i) => (
            <Panel
              key={s.title}
              index={i}
              progress={scrollYProgress}
              solution={s}
            />
          ))}

          {/* Outro */}
          <BeamCard
            delay={-2}
            speed={8}
            className="flex h-[min(600px,70dvh)] w-[80vw] shrink-0 items-center md:w-[440px]"
          >
            <div className="relative p-8 md:p-10">
              <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                Your industry
                <br />
                <span className="font-serif font-normal italic tracking-normal text-silver">
                  not listed?
                </span>
              </h3>
              <p className="mt-4 max-w-xs text-silver-400">
                We build custom software for any business. Tell us what you
                need.
              </p>
              <div className="mt-8">
                <GlowButton href="/start-project" variant="primary" size="md">
                  Start a Project
                </GlowButton>
              </div>
            </div>
          </BeamCard>
        </motion.div>

        {/* Progress line */}
        <div className="container-x mt-8 md:mt-10">
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
