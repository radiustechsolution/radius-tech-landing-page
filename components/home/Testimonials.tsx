"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { testimonials, type Testimonial } from "@/lib/testimonials";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const DURATION = 7; // seconds per featured quote

function initials(name: string) {
  return name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Avatar({ name, size = "md" }: { name: string; size?: "md" | "lg" }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center rounded-xl bg-linear-to-br from-white via-silver-300 to-silver-500 font-semibold text-black",
        size === "lg" ? "size-14 text-lg" : "size-10 text-sm",
      )}
    >
      {initials(name)}
    </span>
  );
}

function QuoteCard({ t }: { t: Testimonial }) {
  return (
    <figure className="flex w-[340px] shrink-0 flex-col justify-between rounded-2xl border border-white/[0.08] bg-ink-2 p-6 transition-colors duration-300 hover:border-white/20 md:w-[400px]">
      <blockquote className="line-clamp-4 text-[15px] leading-relaxed text-silver-300">
        &ldquo;{t.quote}&rdquo;
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <Avatar name={t.name} />
        <div>
          <p className="text-sm font-medium text-white">{t.name}</p>
          <p className="text-xs text-silver-500">
            {t.role}, {t.company}
          </p>
        </div>
      </figcaption>
    </figure>
  );
}

function MarqueeRow({
  items,
  reverse = false,
}: {
  items: Testimonial[];
  reverse?: boolean;
}) {
  // Repeat so the row is always wider than the screen
  const base = items.length < 6 ? [...items, ...items, ...items] : items;
  const loop = [...base, ...base];

  return (
    <div className="group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
      <div
        className={cn(
          "flex w-max animate-marquee gap-4 pr-4 group-hover:[animation-play-state:paused]",
          reverse && "[animation-direction:reverse]",
        )}
        style={{ animationDuration: `${base.length * 8}s` }}
      >
        {loop.map((t, i) => (
          <QuoteCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (paused || count < 2) return;
    const id = setTimeout(
      () => setIndex((i) => (i + 1) % count),
      DURATION * 1000,
    );
    return () => clearTimeout(id);
  }, [index, paused, count]);

  if (count === 0) return null;

  const featured = testimonials[index];
  const half = Math.ceil(count / 2);
  const rowA = testimonials.slice(0, half);
  const rowB = testimonials.slice(half).length
    ? testimonials.slice(half)
    : testimonials;

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden py-28 md:py-36"
    >
      <div className="container-x">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl"
        >
          <span className="text-gradient">What clients</span>{" "}
          <span className="font-serif font-normal italic tracking-normal text-silver">
            say
          </span>
        </motion.h2>

        {/* Featured quote */}
        <div
          className="relative mt-14 max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-10 -left-2 font-serif text-[140px] leading-none text-white/[0.06] md:-left-8"
          >
            &ldquo;
          </span>

          <div className="min-h-[260px] md:min-h-[230px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
              >
                <blockquote className="text-2xl leading-snug font-medium tracking-tight md:text-4xl">
                  {featured.quote.split(" ").map((word, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, filter: "blur(8px)", y: 6 }}
                      animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.03, ease }}
                      className="inline-block text-white"
                    >
                      {word}&nbsp;
                    </motion.span>
                  ))}
                </blockquote>

                <motion.figcaption
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease }}
                  className="mt-8 flex items-center gap-4"
                >
                  <Avatar name={featured.name} size="lg" />
                  <div>
                    <p className="text-base font-medium text-white">
                      {featured.name}
                    </p>
                    <p className="text-sm text-silver-500">
                      {featured.role}, {featured.company}
                    </p>
                  </div>
                </motion.figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {/* Progress segments */}
          {count > 1 && (
            <div className="mt-10 flex max-w-md gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show testimonial from ${t.name}`}
                  onClick={() => setIndex(i)}
                  className="relative h-6 flex-1"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/15" />
                  {i === index && (
                    <motion.span
                      key={`${index}-${paused}`}
                      className="absolute top-1/2 left-0 h-px -translate-y-1/2 bg-white"
                      initial={{ width: "0%" }}
                      animate={{ width: paused ? undefined : "100%" }}
                      transition={{ duration: DURATION, ease: "linear" }}
                    />
                  )}
                  {i < index && (
                    <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/60" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Marquee rows */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mt-20 space-y-4"
      >
        <MarqueeRow items={rowA} />
        <MarqueeRow items={rowB} reverse />
      </motion.div>
    </section>
  );
}
