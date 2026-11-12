"use client";

import { useRef } from "react";
import { motion } from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { services, type ServiceIconName } from "@/lib/site";
import { cn } from "@/lib/utils";
import {
  ApiVisual,
  BackendVisual,
  CloudVisual,
  DesignVisual,
  FintechVisual,
  FrontendVisual,
  MobileVisual,
  WebVisual,
} from "./services/Visuals";

const ease = [0.22, 1, 0.36, 1] as const;

/* Order matters — it matches the bento layout */
const layout: {
  icon: ServiceIconName;
  span: string;
  visualHeight: string;
  Visual: () => React.ReactElement;
}[] = [
  {
    icon: "mobile",
    span: "md:col-span-2 lg:col-span-7 lg:row-span-2",
    visualHeight: "min-h-[380px] flex-1",
    Visual: MobileVisual,
  },
  {
    icon: "fintech",
    span: "lg:col-span-5",
    visualHeight: "h-[190px]",
    Visual: FintechVisual,
  },
  {
    icon: "web",
    span: "lg:col-span-5",
    visualHeight: "h-[190px]",
    Visual: WebVisual,
  },
  {
    icon: "backend",
    span: "lg:col-span-4",
    visualHeight: "h-[180px]",
    Visual: BackendVisual,
  },
  {
    icon: "frontend",
    span: "lg:col-span-4",
    visualHeight: "h-[180px]",
    Visual: FrontendVisual,
  },
  {
    icon: "api",
    span: "lg:col-span-4",
    visualHeight: "h-[180px]",
    Visual: ApiVisual,
  },
  {
    icon: "cloud",
    span: "lg:col-span-6",
    visualHeight: "h-[180px]",
    Visual: CloudVisual,
  },
  {
    icon: "design",
    span: "md:col-span-2 lg:col-span-6",
    visualHeight: "h-[180px]",
    Visual: DesignVisual,
  },
];

export function Services() {
  const gridRef = useRef<HTMLDivElement>(null);

  // Feed cursor position to every card (border spotlight)
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
    <section id="services" className="relative py-28 md:py-36">
      <div className="container-x">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-silver-500">
            What we do
          </p>
          <h2 className="mt-4 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
            <span className="text-gradient">Everything you need</span>
            <br />
            <span className="text-gradient">to</span>{" "}
            <span className="font-serif font-normal italic tracking-normal text-silver">
              build
            </span>{" "}
            <span className="text-gradient">and scale</span>
          </h2>
          <p className="mt-5 max-w-lg text-lg text-silver-400">
            From the first screen to the cloud — one team handles it all.
          </p>
        </motion.div>

        {/* Bento */}
        <div
          ref={gridRef}
          onPointerMove={onPointerMove}
          className="spot-grid mt-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12"
        >
          {layout.map(({ icon, span, visualHeight, Visual }, i) => {
            const service = services.find((s) => s.icon === icon)!;

            return (
              <motion.div
                key={icon}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease, delay: (i % 4) * 0.07 }}
                className={cn("min-h-0", span)}
              >
                <BeamCard
                  className="h-full"
                  delay={-i * 0.9}
                  speed={7 + (i % 3)}
                >
                  <div className="relative flex h-full flex-col">
                    <div
                      className={cn("relative overflow-hidden", visualHeight)}
                    >
                      <Visual />
                    </div>

                    <div className="relative p-6 md:p-7">
                      <div className="flex items-center gap-3">
                        <span className="grid size-10 place-items-center rounded-[10px] border border-white/10 bg-white/[0.03] text-silver-300 transition-colors duration-500 group-hover:text-white">
                          <ServiceIcon name={service.icon} />
                        </span>
                        <h3 className="text-lg font-medium tracking-tight text-white md:text-xl">
                          {service.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-silver-400">
                        {service.description}
                      </p>
                    </div>
                  </div>
                </BeamCard>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease }}
          className="mt-4"
        >
          <BeamCard delay={-3} speed={9}>
            <div className="relative flex flex-col items-start justify-between gap-6 p-6 md:flex-row md:items-center md:p-8">
              <div>
                <h3 className="text-xl font-medium tracking-tight text-white md:text-2xl">
                  Have something different in mind?
                </h3>
                <p className="mt-1.5 text-silver-400">
                  We build custom solutions too.
                </p>
              </div>
              <GlowButton href="/start-project" variant="primary" size="md">
                Talk to Us
              </GlowButton>
            </div>
          </BeamCard>
        </motion.div>
      </div>
    </section>
  );
}
