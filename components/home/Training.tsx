"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Tracks                                                              */
/* ------------------------------------------------------------------ */

type TrackId = "web" | "mobile";

const tracks: {
  id: TrackId;
  title: string;
  text: string;
  topics: string[];
  file: string;
  keywords: string[];
  code: string[];
}[] = [
  {
    id: "web",
    title: "Web Development",
    text: "Build modern, fast and scalable web applications.",
    topics: ["HTML & CSS", "JavaScript", "React", "Next.js"],
    file: "app.tsx",
    keywords: [
      "import",
      "from",
      "export",
      "default",
      "function",
      "const",
      "return",
    ],
    code: [
      `import { useState } from "react";`,
      ``,
      `export default function App() {`,
      `  const [count, setCount] = useState(0);`,
      ``,
      `  return (`,
      `    <button onClick={() => setCount(count + 1)}>`,
      `      Clicked {count} times`,
      `    </button>`,
      `  );`,
      `}`,
    ],
  },
  {
    id: "mobile",
    title: "Mobile App Development",
    text: "Create powerful apps for iOS and Android.",
    topics: ["Dart", "Flutter", "Firebase", "Publishing to stores"],
    file: "main.dart",
    keywords: ["class", "extends", "int", "return", "override"],
    code: [
      `class _CounterState extends State<CounterApp> {`,
      `  int count = 0;`,
      ``,
      `  @override`,
      `  Widget build(BuildContext context) {`,
      `    return FloatingActionButton(`,
      `      onPressed: () => setState(() => count++),`,
      `      child: Text('$count'),`,
      `    );`,
      `  }`,
      `}`,
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Tiny syntax highlighter                                             */
/* ------------------------------------------------------------------ */

function highlight(line: string, keywords: string[]) {
  const parts = line.match(/("[^"]*"|'[^']*'|@\w+|\b\w+\b|\s+|[^\w\s])/g) ?? [];

  return parts.map((p, i) => {
    let cls = "text-silver-500";
    if (/^["']/.test(p)) cls = "text-silver-200";
    else if (p.startsWith("@")) cls = "text-silver-400 italic";
    else if (keywords.includes(p)) cls = "text-white font-medium";
    else if (/^\d+$/.test(p)) cls = "text-white";
    else if (/^[A-Z]/.test(p)) cls = "text-silver-300";
    else if (/^\w+$/.test(p)) cls = "text-silver-400";

    return (
      <span key={i} className={cls}>
        {p}
      </span>
    );
  });
}

/* ------------------------------------------------------------------ */
/* Live previews                                                       */
/* ------------------------------------------------------------------ */

function WebPreview() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-black">
      <div className="border-b border-white/[0.07] px-3 py-2">
        <div className="mx-auto w-fit rounded-md bg-white/[0.06] px-6 py-1 font-mono text-[10px] text-silver-500">
          localhost:3000
        </div>
      </div>
      <div className="grid flex-1 place-items-center p-6">
        <motion.button
          type="button"
          whileTap={{ scale: 0.95 }}
          onClick={() => setCount((c) => c + 1)}
          className="rounded-[10px] bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-silver-100"
        >
          Clicked {count} {count === 1 ? "time" : "times"}
        </motion.button>
      </div>
    </div>
  );
}

function MobilePreview() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex h-full items-center justify-center">
      <div className="relative h-[300px] w-[170px] rounded-[30px] border border-white/15 bg-linear-to-b from-silver-300/30 to-silver-700/20 p-[4px]">
        <div className="relative flex h-full w-full flex-col overflow-hidden rounded-[26px] bg-ink-2">
          <div className="absolute top-2 left-1/2 h-4 w-14 -translate-x-1/2 rounded-full bg-black" />
          <div className="mt-8 border-b border-white/[0.07] px-4 pb-2.5 text-[12px] font-medium text-white">
            Counter
          </div>
          <div className="grid flex-1 place-items-center">
            <div className="text-center">
              <p className="text-[10px] text-silver-500">You pressed</p>
              <motion.p
                key={count}
                initial={{ scale: 1.3, opacity: 0.5 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mt-1 text-4xl font-semibold text-white"
              >
                {count}
              </motion.p>
            </div>
          </div>
          <motion.button
            type="button"
            aria-label="Increase"
            whileTap={{ scale: 0.9 }}
            onClick={() => setCount((c) => c + 1)}
            className="absolute right-3 bottom-3 grid size-11 place-items-center rounded-2xl bg-white text-xl font-medium text-black shadow-[0_8px_20px_-6px_rgba(255,255,255,0.5)]"
          >
            +
          </motion.button>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Training() {
  const [active, setActive] = useState<TrackId>("web");
  const track = tracks.find((t) => t.id === active)!;

  return (
    <section id="training" className="relative py-28 md:py-36">
      <div className="container-x">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          <div>
            <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
              <span className="text-gradient">Become a</span>{" "}
              <span className="font-serif font-normal italic tracking-normal text-silver">
                developer
              </span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-silver-400">
              Learn to build real products with the same tools we use every day.
            </p>
          </div>
          <GlowButton href="/training" variant="primary" size="md">
            Get Started
          </GlowButton>
        </motion.div>

        {/* Editor */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="mt-14"
        >
          <BeamCard speed={9}>
            <div className="relative grid lg:grid-cols-5">
              {/* Code */}
              <div className="lg:col-span-3 lg:border-r lg:border-white/[0.06]">
                {/* Tabs */}
                <div className="flex border-b border-white/[0.06]">
                  {tracks.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setActive(t.id)}
                      className={cn(
                        "relative px-5 py-3.5 font-mono text-xs transition-colors",
                        active === t.id
                          ? "text-white"
                          : "text-silver-600 hover:text-silver-400",
                      )}
                    >
                      {t.file}
                      {active === t.id && (
                        <motion.span
                          layoutId="editor-tab"
                          className="absolute inset-x-0 -bottom-px h-px bg-white"
                          transition={{
                            type: "spring",
                            stiffness: 400,
                            damping: 35,
                          }}
                        />
                      )}
                    </button>
                  ))}
                </div>

                {/* Lines */}
                <div className="min-h-[340px] overflow-x-auto p-5 font-mono text-[13px] leading-[1.85]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.15 }}
                    >
                      {track.code.map((line, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.35, delay: i * 0.04, ease }}
                          className="flex whitespace-pre"
                        >
                          <span className="mr-5 inline-block w-5 shrink-0 text-right text-silver-700 select-none">
                            {i + 1}
                          </span>
                          <span>
                            {line ? highlight(line, track.keywords) : " "}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Preview */}
              <div className="flex flex-col border-t border-white/[0.06] p-5 lg:col-span-2 lg:border-t-0">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-600">
                    Preview
                  </span>
                  <span className="font-mono text-[11px] text-silver-500">
                    Try it: click the button
                  </span>
                </div>
                <div className="mt-4 h-[320px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={active}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.35, ease }}
                      className="h-full"
                    >
                      {active === "web" ? <WebPreview /> : <MobilePreview />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </BeamCard>
        </motion.div>

        {/* Tracks */}
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {tracks.map((t, i) => (
            <motion.button
              key={t.id}
              type="button"
              onClick={() => setActive(t.id)}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: i * 0.1 }}
              className={cn(
                "rounded-2xl border p-7 text-left transition-all duration-500",
                active === t.id
                  ? "border-white/20 bg-white/[0.04]"
                  : "border-white/[0.08] bg-ink-2 hover:border-white/15",
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-medium tracking-tight text-white md:text-2xl">
                  {t.title}
                </h3>
                <span className="font-mono text-[11px] text-silver-600">
                  {t.file}
                </span>
              </div>
              <p className="mt-2 text-silver-400">{t.text}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {t.topics.map((topic) => (
                  <span
                    key={topic}
                    className="rounded-md border border-white/10 px-2.5 py-1 text-xs text-silver-400"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
