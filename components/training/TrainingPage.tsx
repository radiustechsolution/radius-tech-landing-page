"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

type TrackId = "web" | "mobile";

// TODO: adjust modules to match your real curriculum
const tracks: Record<
  TrackId,
  {
    title: string;
    text: string;
    skills: string[];
    modules: { title: string; topics: string[]; build: string }[];
  }
> = {
  web: {
    title: "Web Development",
    text: "Build modern, fast and scalable web applications.",
    skills: [
      "HTML & CSS",
      "JavaScript",
      "React",
      "Next.js",
      "APIs",
      "Git",
      "Deployment",
    ],
    modules: [
      {
        title: "Foundations",
        topics: ["HTML", "CSS", "Responsive design", "Git"],
        build: "A responsive personal website",
      },
      {
        title: "JavaScript",
        topics: ["Variables & functions", "DOM", "Async & fetch"],
        build: "An interactive web app",
      },
      {
        title: "React",
        topics: ["Components", "State & props", "Hooks"],
        build: "A task manager app",
      },
      {
        title: "Next.js & APIs",
        topics: ["Routing", "Data fetching", "Working with APIs"],
        build: "A full web product",
      },
      {
        title: "Launch",
        topics: ["Deployment", "Performance", "Portfolio"],
        build: "Your final project, live online",
      },
    ],
  },
  mobile: {
    title: "Mobile App Development",
    text: "Create powerful apps for iOS and Android.",
    skills: [
      "Dart",
      "Flutter",
      "State management",
      "APIs",
      "Firebase",
      "App publishing",
    ],
    modules: [
      {
        title: "Dart basics",
        topics: ["Syntax", "Functions", "Classes"],
        build: "Command-line mini apps",
      },
      {
        title: "Flutter UI",
        topics: ["Widgets", "Layouts", "Navigation"],
        build: "A multi-screen app UI",
      },
      {
        title: "Data & state",
        topics: ["State management", "APIs", "Local storage"],
        build: "A live data app",
      },
      {
        title: "Firebase",
        topics: ["Authentication", "Database", "Notifications"],
        build: "An app with user accounts",
      },
      {
        title: "Publishing",
        topics: ["Testing", "App Store", "Play Store"],
        build: "Your app, published",
      },
    ],
  },
};

// TODO: keep only what you actually offer
const benefits = [
  {
    title: "Build real projects",
    text: "Every module ends with something you can show.",
  },
  {
    title: "Learn the tools we use",
    text: "The same stack we use to build client products.",
  },
  {
    title: "Get feedback on your code",
    text: "Learn the right way from day one.",
  },
  {
    title: "Leave with a portfolio",
    text: "Finish with work that proves what you can do.",
  },
];

/* ------------------------------------------------------------------ */
/* Hero                                                                */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="pt-[76px]">
      <div className="container-x pt-20 pb-16 md:pt-28 md:pb-24">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease }}
          className="text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-7xl"
        >
          <span className="text-gradient">Learn to build</span>
          <br />
          <span className="font-serif font-normal italic tracking-normal text-silver">
            real
          </span>{" "}
          <span className="text-gradient">products</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease }}
          className="mt-6 max-w-lg text-lg text-silver-400"
        >
          Practical training in web and mobile development, taught by people who
          build for a living.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.8, ease }}
          className="mt-10 flex flex-col gap-3 sm:flex-row"
        >
          <GlowButton href="#apply" variant="primary" size="lg">
            Apply Now
          </GlowButton>
          <GlowButton href={site.whatsapp} variant="outline" size="lg">
            Chat on WhatsApp
          </GlowButton>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Curriculum                                                          */
/* ------------------------------------------------------------------ */

function Curriculum({
  active,
  setActive,
}: {
  active: TrackId;
  setActive: (t: TrackId) => void;
}) {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 0.7", "end 0.6"],
  });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const track = tracks[active];

  return (
    <section className="py-16 md:py-24">
      <div className="container-x">
        {/* Switcher */}
        <div className="inline-flex rounded-xl border border-white/10 bg-ink-2 p-1">
          {(Object.keys(tracks) as TrackId[]).map((id) => (
            <button
              key={id}
              type="button"
              onClick={() => setActive(id)}
              className={cn(
                "relative rounded-lg px-5 py-2.5 text-sm transition-colors md:px-6",
                active === id
                  ? "text-black"
                  : "text-silver-400 hover:text-white",
              )}
            >
              {active === id && (
                <motion.span
                  layoutId="track-pill"
                  className="absolute inset-0 rounded-lg bg-white"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
              <span className="relative">{tracks[id].title}</span>
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-12 lg:grid-cols-12">
          {/* Modules */}
          <div ref={listRef} className="relative lg:col-span-8">
            <div className="absolute top-2 bottom-2 left-[19px] w-px bg-white/10" />
            <motion.div
              style={{ scaleY: line }}
              className="absolute top-2 bottom-2 left-[19px] w-px origin-top bg-linear-to-b from-white to-silver-400"
            />

            <AnimatePresence mode="wait">
              <motion.ol
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease }}
                className="space-y-12"
              >
                {track.modules.map((m, i) => (
                  <motion.li
                    key={m.title}
                    initial={{ opacity: 0.35 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ margin: "-45% 0px -45% 0px" }}
                    transition={{ duration: 0.4 }}
                    className="relative flex gap-6"
                  >
                    <motion.span
                      initial={{ backgroundColor: "#000000", color: "#9aa0ab" }}
                      whileInView={{
                        backgroundColor: "#ffffff",
                        color: "#000000",
                      }}
                      viewport={{ once: true, margin: "-45% 0px -45% 0px" }}
                      transition={{ duration: 0.4 }}
                      className="relative z-10 grid size-10 shrink-0 place-items-center rounded-[10px] border border-white/20 font-mono text-xs"
                    >
                      {i + 1}
                    </motion.span>

                    <div className="pt-1">
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver-600">
                        Module {i + 1}
                      </p>
                      <h3 className="mt-1 text-2xl font-medium tracking-tight text-white md:text-3xl">
                        {m.title}
                      </h3>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {m.topics.map((t) => (
                          <span
                            key={t}
                            className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-silver-400"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <p className="mt-4 text-[15px] text-silver-400">
                        <span className="text-silver-600">You build: </span>
                        <span className="text-white">{m.build}</span>
                      </p>
                    </div>
                  </motion.li>
                ))}
              </motion.ol>
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-4">
            <BeamCard speed={8} className="lg:sticky lg:top-28">
              <div className="relative p-7">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-2xl font-medium tracking-tight text-white">
                      {track.title}
                    </h3>
                    <p className="mt-2 text-silver-400">{track.text}</p>

                    <p className="mt-7 font-mono text-[10px] uppercase tracking-[0.2em] text-silver-600">
                      Skills you&apos;ll gain
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {track.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-md bg-white/[0.06] px-2.5 py-1 text-xs text-silver-300"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div className="mt-8">
                      <GlowButton
                        href="#apply"
                        variant="primary"
                        size="md"
                        className="w-full"
                      >
                        Apply for this track
                      </GlowButton>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </BeamCard>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Benefits                                                            */
/* ------------------------------------------------------------------ */

function Benefits() {
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
    <section className="py-16 md:py-24">
      <div className="container-x">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl"
        >
          <span className="text-gradient">What you</span>{" "}
          <span className="font-serif font-normal italic tracking-normal text-silver">
            get
          </span>
        </motion.h2>

        <div
          ref={gridRef}
          onPointerMove={onPointerMove}
          className="spot-grid mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {benefits.map((b, i) => (
            <motion.div
              key={b.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, ease, delay: i * 0.08 }}
            >
              <BeamCard delay={-i * 1.5} speed={8} className="h-full">
                <div className="relative flex min-h-[220px] flex-col justify-end p-7">
                  <h3 className="text-xl font-medium tracking-tight text-white">
                    {b.title}
                  </h3>
                  <p className="mt-2 text-sm text-silver-400">{b.text}</p>
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
/* Apply                                                               */
/* ------------------------------------------------------------------ */

const levels = ["Complete beginner", "Some experience", "Already coding"];

const inputCls =
  "h-12 w-full rounded-[10px] border border-white/10 bg-black/60 px-4 text-[15px] text-white placeholder:text-silver-600 outline-none transition-colors focus:border-white/40";

function Chip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-[10px] border px-4 py-2.5 text-sm transition-all duration-300",
        active
          ? "border-white bg-white text-black"
          : "border-white/10 text-silver-300 hover:border-white/25 hover:text-white",
      )}
    >
      {label}
    </button>
  );
}

function Apply({
  track,
  setTrack,
}: {
  track: TrackId;
  setTrack: (t: TrackId) => void;
}) {
  const [level, setLevel] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const ready = Boolean(level && name.trim() && phone.trim());

  const send = () => {
    const lines: string[] = [
      "Hello Radius Tech, I'd like to apply for training.",
      "",
      `Track: ${tracks[track].title}`,
      `Experience: ${level}`,
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
    ];
    if (email.trim()) lines.push(`Email: ${email.trim()}`);

    window.open(
      `${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
    setSent(true);
  };

  return (
    <section id="apply" className="py-16 md:py-28">
      <div className="container-x">
        <BeamCard speed={8}>
          <div className="relative grid lg:grid-cols-12">
            <div className="p-7 md:p-12 lg:col-span-5 lg:border-r lg:border-white/[0.06]">
              <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl">
                <span className="text-gradient">Ready to</span>
                <br />
                <span className="font-serif font-normal italic tracking-normal text-silver">
                  start?
                </span>
              </h2>
              <p className="mt-5 max-w-sm text-silver-400">
                Apply in under a minute. We&apos;ll reach out on WhatsApp with
                the next steps.
              </p>
            </div>

            <div className="p-7 md:p-12 lg:col-span-7">
              {sent ? (
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease }}
                >
                  <span className="grid size-12 place-items-center rounded-xl bg-white text-xl text-black">
                    ✓
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    Application ready
                  </h3>
                  <p className="mt-2 text-silver-400">
                    We&apos;ve opened WhatsApp with your details. Just press
                    send.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm text-silver-400 underline-offset-4 hover:text-white hover:underline"
                  >
                    Edit application
                  </button>
                </motion.div>
              ) : (
                <>
                  <p className="text-sm text-silver-400">Track</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {(Object.keys(tracks) as TrackId[]).map((id) => (
                      <Chip
                        key={id}
                        label={tracks[id].title}
                        active={track === id}
                        onClick={() => setTrack(id)}
                      />
                    ))}
                  </div>

                  <p className="mt-7 text-sm text-silver-400">Experience</p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {levels.map((l) => (
                      <Chip
                        key={l}
                        label={l}
                        active={level === l}
                        onClick={() => setLevel(l)}
                      />
                    ))}
                  </div>

                  <div className="mt-7 grid gap-4 md:grid-cols-2">
                    <input
                      className={inputCls}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name *"
                      autoComplete="name"
                    />
                    <input
                      className={inputCls}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone / WhatsApp *"
                      type="tel"
                      autoComplete="tel"
                    />
                    <input
                      className={cn(inputCls, "md:col-span-2")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email (optional)"
                      type="email"
                      autoComplete="email"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={send}
                    disabled={!ready}
                    className="mt-8 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-brand text-[15px] font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_40px_-12px_rgba(29,93,255,0.7)] transition-all enabled:hover:bg-brand-400 disabled:cursor-not-allowed disabled:opacity-35 sm:w-auto sm:px-9"
                  >
                    Apply on WhatsApp
                  </button>
                </>
              )}
            </div>
          </div>
        </BeamCard>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export function TrainingPage() {
  const [track, setTrack] = useState<TrackId>("web");

  return (
    <>
      <Hero />
      <Curriculum active={track} setActive={setTrack} />
      <Benefits />
      <Apply track={track} setTrack={setTrack} />
    </>
  );
}
