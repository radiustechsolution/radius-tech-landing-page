"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { projects, type Project } from "@/lib/projects";
import { DESKTOP_QUERY, useMediaQuery } from "@/lib/useMedia";
import { cn } from "@/lib/utils";
import { ProjectMock } from "./portfolio/ProjectMocks";

const ease = [0.22, 1, 0.36, 1] as const;

function ProjectCard({
  project,
  index,
  total,
  progress,
  desktop,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  desktop: boolean;
}) {
  const isLast = index === total - 1;
  const seg = 1 / Math.max(1, total - 1);
  const arrive = Math.min(index * seg, 0.999);
  const covered = Math.min(arrive + seg, 1);

  const scale = useTransform(
    progress,
    [arrive, 1],
    [1, isLast ? 1 : 1 - (total - 1 - index) * 0.04],
  );
  const dim = useTransform(progress, [arrive, covered], [0, isLast ? 0 : 0.55]);

  return (
    // Desktop: sticky stacking cards. Phones/tablets: a normal list.
    <div
      className={
        desktop
          ? "sticky top-0 flex h-dvh items-start justify-center pt-[96px]"
          : "pt-4"
      }
    >
      <motion.div
        style={desktop ? { scale, marginTop: index * 22 } : undefined}
        className="relative w-full origin-top"
      >
        <BeamCard
          delay={-index * 1.3}
          speed={8}
          className={cn("w-full", desktop && "h-[min(580px,72dvh)]")}
        >
          <div className="relative grid h-full md:grid-cols-2">
            {/* Text */}
            <div className="relative flex flex-col justify-between p-6 md:p-10 lg:p-12">
              <div>
                <span className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-silver-400">
                  {project.category}
                </span>
                <h3 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
                  {project.name}
                </h3>
                <p className="mt-4 max-w-sm text-[15px] leading-relaxed text-silver-400 md:text-lg">
                  {project.description}
                </p>

                <div className="mt-6 grid max-w-sm grid-cols-2 gap-4 border-t border-white/[0.07] pt-5">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver-600">
                      What we did
                    </p>
                    <ul className="mt-2 space-y-1">
                      {project.work.map((w) => (
                        <li key={w} className="text-sm text-silver-300">
                          {w}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver-600">
                      Stack
                    </p>
                    <ul className="mt-2 space-y-1">
                      {project.stack.map((s) => (
                        <li key={s} className="text-sm text-silver-300">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6 hidden md:block">
                <GlowButton href="/start-project" variant="outline" size="sm">
                  Start a similar project
                </GlowButton>
              </div>
            </div>

            {/* Mockup (tablet & desktop) */}
            <div className="relative hidden min-h-[520px] overflow-hidden border-l border-white/[0.06] md:block">
              <div className="bg-grid absolute inset-0 opacity-80 [mask-image:none]" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="scale-[0.85] lg:scale-100">
                  <ProjectMock kind={project.mock} />
                </div>
              </div>
            </div>
          </div>
        </BeamCard>

        {desktop && (
          <motion.div
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 z-10 rounded-2xl bg-black"
          />
        )}
      </motion.div>
    </div>
  );
}

export function Portfolio() {
  const stackRef = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery(DESKTOP_QUERY);
  const { scrollYProgress } = useScroll({
    target: stackRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="work" className="relative pt-28 pb-12 md:pt-36 lg:pb-0">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
              <span className="text-gradient">Selected</span>{" "}
              <span className="font-serif font-normal italic tracking-normal text-silver">
                work
              </span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-silver-400">
              Products we&apos;ve designed, built and launched.
            </p>
          </div>
          <GlowButton href="/start-project" variant="primary" size="md">
            Start Your Project
          </GlowButton>
        </motion.div>

        <div ref={stackRef} className="relative mt-6">
          {projects.map((p, i) => (
            <ProjectCard
              key={p.slug}
              project={p}
              index={i}
              total={projects.length}
              progress={scrollYProgress}
              desktop={desktop}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
