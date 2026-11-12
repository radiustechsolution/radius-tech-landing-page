"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { SCROLL_OFFSET, useLenis } from "@/components/providers/SmoothScroll";
import {
  ApiVisual,
  BackendVisual,
  CloudVisual,
  DesignVisual,
  FintechVisual,
  FrontendVisual,
  MobileVisual,
  WebVisual,
} from "@/components/home/services/Visuals";
import type { ServiceIconName } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

type Solution = {
  id: string;
  icon: ServiceIconName;
  title: string;
  text: string;
  deliverables: string[];
  stack: string[];
  Visual: () => React.ReactElement;
};

// TODO: adjust deliverables and stack to match exactly what you offer
const solutions: Solution[] = [
  {
    id: "mobile",
    icon: "mobile",
    title: "Mobile App Development",
    text: "Fast, beautiful apps for iOS and Android. We build cross-platform so you launch on both stores from one codebase.",
    deliverables: [
      "iOS and Android apps",
      "Flutter or React Native",
      "App Store & Play Store publishing",
      "Push notifications and offline support",
    ],
    stack: ["Flutter", "Dart", "React Native", "Firebase"],
    Visual: MobileVisual,
  },
  {
    id: "web",
    icon: "web",
    title: "Web Applications",
    text: "Platforms, portals and SaaS products that handle real users and real data, built to grow with your business.",
    deliverables: [
      "Web apps and SaaS platforms",
      "Customer portals",
      "Admin dashboards",
      "Role-based access",
    ],
    stack: ["Next.js", "React", "TypeScript", "Laravel"],
    Visual: WebVisual,
  },
  {
    id: "frontend",
    icon: "frontend",
    title: "Frontend Development",
    text: "Clean, responsive interfaces that load fast and feel great on every screen size.",
    deliverables: [
      "Responsive websites",
      "Landing pages",
      "Design to code",
      "Performance and SEO",
    ],
    stack: ["Next.js", "React", "Tailwind", "TypeScript"],
    Visual: FrontendVisual,
  },
  {
    id: "backend",
    icon: "backend",
    title: "Backend Development",
    text: "Secure, reliable systems behind your product: APIs, databases and the business logic that ties it together.",
    deliverables: [
      "REST APIs",
      "Database design",
      "Authentication and roles",
      "Background jobs and queues",
    ],
    stack: ["Laravel", "PHP", "PostgreSQL", "Redis"],
    Visual: BackendVisual,
  },
  {
    id: "integrations",
    icon: "api",
    title: "API & System Integrations",
    text: "Connect your product to the services it needs, from payments and banking to messaging and identity checks.",
    deliverables: [
      "Payment gateways",
      "Banking and virtual accounts",
      "SMS, email and notifications",
      "KYC and identity verification",
    ],
    stack: ["REST", "Webhooks", "Laravel", "Node.js"],
    Visual: ApiVisual,
  },
  {
    id: "cloud",
    icon: "cloud",
    title: "Cloud & DevOps",
    text: "We deploy, monitor and scale your product so it stays fast and available as your users grow.",
    deliverables: [
      "Hosting and deployment",
      "CI/CD pipelines",
      "Monitoring and backups",
      "Scaling and performance",
    ],
    stack: ["AWS", "Vercel", "Docker", "Firebase"],
    Visual: CloudVisual,
  },
  {
    id: "design",
    icon: "design",
    title: "UI/UX Design",
    text: "Product design that makes complex things simple, from first sketch to a polished, ready-to-build interface.",
    deliverables: [
      "User flows",
      "Wireframes and prototypes",
      "UI design",
      "Design systems",
    ],
    stack: ["Figma", "Prototyping", "Design systems"],
    Visual: DesignVisual,
  },
  {
    id: "fintech",
    icon: "fintech",
    title: "Fintech Solutions",
    text: "Secure financial products your customers can trust, from wallets and transfers to savings and bill payments.",
    deliverables: [
      "Wallets and transfers",
      "Savings and investment apps",
      "Bill payments and VTU",
      "Business and merchant banking",
    ],
    stack: ["Flutter", "Laravel", "PostgreSQL", "AWS"],
    Visual: FintechVisual,
  },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero({ onJump }: { onJump: (id: string) => void }) {
  return (
    <section className="pt-[76px]">
      <div className="container-x pt-20 pb-16 md:pt-28 md:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-7xl"
        >
          <span className="text-gradient">Solutions that</span>
          <br />
          <span className="font-serif font-normal italic tracking-normal text-silver">
            grow
          </span>{" "}
          <span className="text-gradient">with you</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
          className="mt-6 max-w-lg text-lg text-silver-400"
        >
          Everything we build, from the first screen to the cloud.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease }}
          className="mt-10 flex flex-wrap gap-2"
        >
          {solutions.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => onJump(s.id)}
              className="flex items-center gap-2 rounded-[10px] border border-white/10 px-3.5 py-2 text-sm text-silver-400 transition-colors hover:border-white/25 hover:text-white"
            >
              <ServiceIcon name={s.icon} className="size-4" />
              {s.title}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function SolutionsPage() {
  const lenis = useLenis();
  const [active, setActive] = useState(solutions[0].id);
  const listRef = useRef<HTMLDivElement>(null);

  // Highlight the section in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    solutions.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  const jump = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: SCROLL_OFFSET });
    else el.scrollIntoView({ behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    listRef.current
      ?.querySelectorAll<HTMLElement>(".beam-card")
      .forEach((card) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--x", `${e.clientX - r.left}px`);
        card.style.setProperty("--y", `${e.clientY - r.top}px`);
      });
  };

  return (
    <>
      <Hero onJump={jump} />

      <section className="pb-12">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          {/* Sticky index */}
          <aside className="hidden lg:col-span-3 lg:block">
            <nav className="sticky top-28 space-y-1" aria-label="Solutions">
              {solutions.map((s) => {
                const isActive = active === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => jump(s.id)}
                    className={cn(
                      "relative flex w-full items-center gap-3 rounded-lg py-2.5 pr-3 pl-5 text-left text-sm transition-colors duration-300",
                      isActive
                        ? "text-white"
                        : "text-silver-600 hover:text-silver-300",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="solutions-indicator"
                        className="absolute inset-y-1.5 left-0 w-px bg-white"
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 35,
                        }}
                      />
                    )}
                    <ServiceIcon name={s.icon} className="size-4 shrink-0" />
                    {s.title}
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Sections */}
          <div
            ref={listRef}
            onPointerMove={onPointerMove}
            className="spot-grid lg:col-span-9"
          >
            {solutions.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className={cn(
                  "grid gap-8 py-14 md:grid-cols-2 md:gap-10",
                  i > 0 && "border-t border-white/[0.07]",
                )}
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease }}
                >
                  <span className="grid size-12 place-items-center rounded-xl border border-white/10 bg-white/[0.03] text-white">
                    <ServiceIcon name={s.icon} className="size-6" />
                  </span>
                  <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                    {s.title}
                  </h2>
                  <p className="mt-4 text-[15px] leading-relaxed text-silver-400 md:text-base">
                    {s.text}
                  </p>

                  <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-silver-600">
                    What you get
                  </p>
                  <ul className="mt-3 space-y-2.5">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex items-center gap-3 text-[15px] text-silver-300"
                      >
                        <span className="grid size-5 shrink-0 place-items-center rounded-md bg-white/[0.08] text-[11px] text-white">
                          ✓
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] text-silver-600">
                    Tech we use
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {s.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-md border border-white/10 px-2.5 py-1 font-mono text-[11px] text-silver-400"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8">
                    <GlowButton
                      href="/start-project"
                      variant="outline"
                      size="sm"
                    >
                      Start this project
                    </GlowButton>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease, delay: 0.1 }}
                >
                  <BeamCard
                    delay={-i * 1.2}
                    speed={8}
                    className="h-[380px] md:sticky md:top-28"
                  >
                    <div className="bg-grid absolute inset-0 opacity-60" />
                    <div className="relative h-full">
                      <s.Visual />
                    </div>
                  </BeamCard>
                </motion.div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
