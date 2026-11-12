"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import type { LegalDoc } from "@/lib/legal";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

const docsNav = [
  { label: "Privacy", href: "/privacy", title: "Privacy Policy" },
  { label: "Terms", href: "/terms", title: "Terms of Service" },
];

export function LegalPage({ doc }: { doc: LegalDoc }) {
  const [open, setOpen] = useState<Set<string>>(new Set([doc.sections[0]?.id]));
  const allOpen = open.size === doc.sections.length;

  const toggle = (id: string) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const toggleAll = () =>
    setOpen(allOpen ? new Set() : new Set(doc.sections.map((s) => s.id)));

  return (
    <div className="pt-[76px]">
      <div className="container-x pt-16 pb-24 md:pt-24">
        {/* Switch */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="inline-flex rounded-xl border border-white/10 bg-ink-2 p-1"
        >
          {docsNav.map((d) => {
            const active = d.title === doc.title;
            return (
              <Link
                key={d.href}
                href={d.href}
                className={cn(
                  "rounded-lg px-5 py-2 text-sm transition-colors",
                  active
                    ? "bg-white text-black"
                    : "text-silver-400 hover:text-white",
                )}
              >
                {d.label}
              </Link>
            );
          })}
        </motion.div>

        {/* Title */}
        <div className="mt-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease }}
              className="text-gradient text-5xl leading-[1.02] font-semibold tracking-[-0.035em] md:text-7xl"
            >
              {doc.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mt-5 max-w-md text-lg text-silver-400"
            >
              {doc.intro}
            </motion.p>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-mono text-xs uppercase tracking-[0.2em] text-silver-600"
          >
            Updated {doc.updated}
          </motion.p>
        </div>

        {/* Short version */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease }}
          className="mt-14"
        >
          <BeamCard speed={9}>
            <div className="relative p-7 md:p-10">
              <p className="text-xl font-medium tracking-tight text-white md:text-2xl">
                The{" "}
                <span className="font-serif font-normal italic text-silver">
                  short
                </span>{" "}
                version
              </p>
              <div className="mt-8 grid gap-px overflow-hidden rounded-xl bg-white/[0.06] sm:grid-cols-2">
                {doc.highlights.map((h, i) => (
                  <div key={h} className="bg-ink-2 p-6">
                    <span className="font-mono text-[11px] text-silver-600">
                      {pad(i + 1)}
                    </span>
                    <p className="mt-3 text-[17px] leading-snug text-white">
                      {h}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </BeamCard>
        </motion.div>

        {/* Chapters */}
        <div className="mt-20 flex items-end justify-between">
          <p className="text-xl font-medium tracking-tight text-white md:text-2xl">
            The details
          </p>
          <button
            type="button"
            onClick={toggleAll}
            className="font-mono text-xs uppercase tracking-[0.15em] text-silver-500 transition-colors hover:text-white"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div className="mt-6 border-t border-white/[0.08]">
          {doc.sections.map((s, i) => {
            const isOpen = open.has(s.id);

            return (
              <motion.section
                key={s.id}
                id={s.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  ease,
                  delay: Math.min(i, 6) * 0.03,
                }}
                className="border-b border-white/[0.08]"
              >
                <button
                  type="button"
                  onClick={() => toggle(s.id)}
                  aria-expanded={isOpen}
                  className="group relative grid w-full grid-cols-[48px_1fr_auto] items-center gap-4 py-7 text-left md:grid-cols-[96px_1fr_auto] md:gap-6"
                >
                  <span
                    className={cn(
                      "absolute inset-y-0 -right-4 -left-4 rounded-xl bg-white/[0.025] opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      isOpen && "opacity-100",
                    )}
                  />

                  <span
                    className={cn(
                      "relative font-mono text-2xl transition-colors duration-300 md:text-4xl",
                      isOpen
                        ? "text-white"
                        : "text-silver-700 group-hover:text-silver-400",
                    )}
                  >
                    {pad(i + 1)}
                  </span>

                  <span className="relative">
                    <span className="block text-xl font-medium tracking-tight text-white md:text-2xl">
                      {s.title}
                    </span>
                    <span className="mt-1 block text-[15px] text-silver-500">
                      <span className="text-silver-600">In short: </span>
                      {s.short}
                    </span>
                  </span>

                  <span
                    className={cn(
                      "relative grid size-10 place-items-center rounded-[10px] border text-lg transition-all duration-500",
                      isOpen
                        ? "rotate-45 border-white bg-white text-black"
                        : "border-white/10 text-silver-400",
                    )}
                  >
                    +
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease }}
                      className="overflow-hidden"
                    >
                      <div className="max-w-2xl space-y-4 pb-10 pl-[64px] md:pl-[120px]">
                        {s.body.map((block, bi) =>
                          Array.isArray(block) ? (
                            <ul key={bi} className="space-y-2.5">
                              {block.map((item) => (
                                <li
                                  key={item}
                                  className="flex gap-3 text-[15px] leading-relaxed text-silver-400"
                                >
                                  <span className="mt-[11px] h-px w-3 shrink-0 bg-silver-500" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p
                              key={bi}
                              className="text-[15px] leading-relaxed text-silver-400"
                            >
                              {block}
                            </p>
                          ),
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
