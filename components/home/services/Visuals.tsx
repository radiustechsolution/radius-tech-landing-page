"use client";

import { motion } from "motion/react";
import { LogoMark } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Mobile                                                              */
/* ------------------------------------------------------------------ */

function PhoneMock({
  variant,
  className,
}: {
  variant: "a" | "b";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "absolute h-[300px] w-[150px] rounded-[30px] border border-white/15 bg-black p-2 shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)] transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]",
        className,
      )}
    >
      <div className="h-full w-full overflow-hidden rounded-[22px] bg-ink-3 p-3">
        <div className="mx-auto h-3 w-12 rounded-full bg-black" />

        {variant === "a" ? (
          <>
            <div className="mt-4 h-2 w-14 rounded bg-white/20" />
            <div className="mt-2 h-3 w-24 rounded bg-white/70" />
            <div className="mt-4 h-20 rounded-xl bg-linear-to-br from-white via-silver-300 to-silver-500" />
            <div className="mt-3 grid grid-cols-4 gap-1.5">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-8 rounded-lg bg-white/[0.07]" />
              ))}
            </div>
            <div className="mt-3 space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-7 rounded-lg bg-white/[0.04]" />
              ))}
            </div>
          </>
        ) : (
          <>
            <div className="mt-4 h-3 w-20 rounded bg-white/60" />
            <div className="mt-3 grid grid-cols-2 gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-16 rounded-lg bg-linear-to-br from-silver-300/40 to-silver-600/20" />
                  <div className="h-1.5 w-10 rounded bg-white/30" />
                </div>
              ))}
            </div>
            <div className="mt-4 h-8 rounded-lg bg-white/80" />
          </>
        )}
      </div>
    </div>
  );
}

export function MobileVisual() {
  const chips = [
    { label: "iOS", className: "left-[8%] top-[18%]", d: 0 },
    { label: "Android", className: "right-[8%] top-[28%]", d: 0.6 },
    { label: "Flutter", className: "left-[12%] bottom-[22%]", d: 1.2 },
    { label: "React Native", className: "right-[10%] bottom-[14%]", d: 1.8 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative h-[320px] w-[320px]">
        <PhoneMock
          variant="b"
          className="top-[24px] left-[24px] -rotate-[9deg] opacity-60 group-hover:-translate-x-8 group-hover:-rotate-[14deg] group-hover:opacity-90"
        />
        <PhoneMock
          variant="a"
          className="top-0 right-[24px] rotate-[6deg] group-hover:translate-x-6 group-hover:-translate-y-2 group-hover:rotate-[2deg]"
        />
      </div>

      {chips.map((c) => (
        <span
          key={c.label}
          style={{ animationDelay: `-${c.d}s` }}
          className={cn(
            "absolute hidden animate-float rounded-md border border-white/10 bg-black/70 px-3 py-1.5 font-mono text-[11px] text-silver-300 sm:block",
            c.className,
          )}
        >
          {c.label}
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fintech                                                             */
/* ------------------------------------------------------------------ */

export function FintechVisual() {
  return (
    <div className="absolute inset-0 flex items-center justify-center [perspective:900px]">
      <div className="absolute h-[124px] w-[200px] translate-x-10 -translate-y-4 rotate-[8deg] rounded-xl border border-white/10 bg-ink-3" />

      <div className="relative h-[130px] w-[210px] rounded-xl bg-linear-to-br from-white via-silver-200 to-silver-500 p-4 text-black shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] [transform:rotateX(20deg)_rotateY(-20deg)] group-hover:[transform:rotateX(0deg)_rotateY(0deg)_translateY(-6px)]">
        <div className="flex items-start justify-between">
          <div className="h-6 w-8 rounded-md bg-linear-to-br from-silver-500/60 to-silver-700/40" />
          <span className="font-mono text-[10px] font-semibold tracking-[0.2em]">
            RADIUS
          </span>
        </div>
        <div className="mt-6 font-mono text-sm tracking-[0.2em]">**** 4821</div>
        <div className="mt-2 flex justify-between font-mono text-[9px] uppercase tracking-widest text-black/60">
          <span>Ada Okafor</span>
          <span>09/29</span>
        </div>
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-linear-to-tr from-transparent via-white/50 to-transparent opacity-60" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Web                                                                 */
/* ------------------------------------------------------------------ */

export function WebVisual() {
  return (
    <div className="absolute inset-x-6 top-8 -bottom-4 overflow-hidden rounded-t-xl border border-white/10 bg-black transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-2">
      <div className="flex items-center justify-center border-b border-white/[0.07] px-3 py-2">
        <span className="rounded-md bg-white/[0.06] px-6 py-1 font-mono text-[10px] text-silver-500">
          yourbrand.com
        </span>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="h-2.5 w-14 rounded bg-white/50" />
          <div className="flex gap-2">
            <div className="h-2 w-8 rounded bg-white/15" />
            <div className="h-2 w-8 rounded bg-white/15" />
            <div className="h-2 w-8 rounded bg-white/15" />
          </div>
        </div>

        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "60%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.3 }}
          className="mt-5 h-4 rounded bg-white/70"
        />
        <motion.div
          initial={{ width: "0%" }}
          whileInView={{ width: "40%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease, delay: 0.45 }}
          className="mt-2 h-4 rounded bg-white/40"
        />
        <div className="mt-3 h-6 w-20 rounded-md bg-white" />

        <div className="mt-5 grid grid-cols-3 gap-2">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-14 rounded-lg border border-white/[0.06] bg-white/[0.03]"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Backend                                                             */
/* ------------------------------------------------------------------ */

export function BackendVisual() {
  const units = ["api-01", "db-main", "queue"];

  return (
    <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 space-y-2">
      {units.map((name, i) => (
        <div
          key={name}
          className="flex h-11 items-center justify-between rounded-lg border border-white/10 bg-black px-3 transition-colors duration-500 group-hover:border-white/20"
        >
          <span className="font-mono text-[11px] text-silver-400">{name}</span>
          <div className="flex h-4 items-end gap-[3px]">
            {Array.from({ length: 12 }).map((_, j) => (
              <span
                key={j}
                className="block h-4 w-[3px] origin-bottom animate-eq rounded-sm bg-white/70"
                style={{
                  animationDuration: `${1.4 + ((i + j) % 4) * 0.3}s`,
                  animationDelay: `-${(j * 0.07 + i * 0.2).toFixed(2)}s`,
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Frontend                                                            */
/* ------------------------------------------------------------------ */

export function FrontendVisual() {
  return (
    <div className="absolute inset-x-6 top-6 bottom-0">
      <pre className="font-mono text-[12px] leading-[1.8] text-silver-500">
        <span className="text-white">{"<Button"}</span>
        {"\n  "}
        <span className="text-silver-400">size</span>=
        <span className="text-silver-200">&quot;lg&quot;</span>
        {"\n  "}
        <span className="text-silver-400">onPress</span>={"{"}
        <span className="text-silver-200">launch</span>
        {"}"}
        <span className="text-white">{">"}</span>
        {"\n  "}
        <span className="text-silver-300">Get started</span>
        {"\n"}
        <span className="text-white">{"</Button>"}</span>
      </pre>

      <div className="absolute right-0 bottom-6 translate-y-3 rounded-[10px] bg-white px-5 py-2.5 text-sm font-medium text-black opacity-0 shadow-[0_10px_30px_-10px_rgba(255,255,255,0.4)] transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        Get started
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* API & Integrations                                                  */
/* ------------------------------------------------------------------ */

export function ApiVisual() {
  const nodes = [
    { label: "Payments", x: 16, y: 26 },
    { label: "Banking", x: 16, y: 74 },
    { label: "SMS", x: 84, y: 26 },
    { label: "KYC", x: 84, y: 74 },
  ];

  return (
    <div className="absolute inset-0">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {nodes.map((n) => (
          <path
            key={n.label}
            d={`M${n.x} ${n.y} C ${(n.x + 50) / 2} ${n.y}, ${(n.x + 50) / 2} 50, 50 50`}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
            className="animate-dash"
          />
        ))}
      </svg>

      {nodes.map((n) => (
        <span
          key={n.label}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-md border border-white/10 bg-black px-3 py-1.5 font-mono text-[11px] text-silver-300 transition-colors duration-500 group-hover:border-white/25 group-hover:text-white"
        >
          {n.label}
        </span>
      ))}

      <div className="absolute top-1/2 left-1/2 grid size-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-xl border border-white/15 bg-ink-3 shadow-[0_0_40px_-5px_rgba(255,255,255,0.2)]">
        <LogoMark className="size-8" />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cloud & DevOps                                                      */
/* ------------------------------------------------------------------ */

const traffic = [
  30, 42, 35, 50, 46, 58, 52, 64, 60, 72, 66, 78, 70, 84, 76, 88, 82, 92, 86,
  96,
];

export function CloudVisual() {
  return (
    <div className="absolute inset-x-6 top-8 bottom-0 flex items-end gap-1.5">
      {traffic.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease, delay: i * 0.03 }}
          className={cn(
            "flex-1 rounded-t-sm transition-colors duration-500",
            i > traffic.length - 5
              ? "bg-white/80"
              : "bg-white/15 group-hover:bg-white/25",
          )}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* UI/UX Design                                                        */
/* ------------------------------------------------------------------ */

export function DesignVisual() {
  const swatches = [
    "bg-black border border-white/20",
    "bg-linear-to-br from-white via-silver-300 to-silver-500",
    "bg-white",
    "bg-brand",
  ];

  return (
    <div className="absolute inset-x-6 top-6 bottom-0 flex items-center gap-8">
      <span className="font-serif text-7xl italic text-silver">Aa</span>

      <div className="relative">
        <div className="flex gap-2.5">
          {swatches.map((s, i) => (
            <span key={i} className={cn("size-11 rounded-lg", s)} />
          ))}
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-2.5 w-40 rounded bg-white/50" />
          <div className="h-2 w-28 rounded bg-white/20" />
        </div>

        {/* Moving cursor (CSS animation) */}
        <svg
          viewBox="0 0 24 24"
          className="absolute top-0 left-0 size-5 animate-cursor drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]"
        >
          <path
            d="M4 3l7 17 2.5-7L21 10.5 4 3z"
            fill="#ffffff"
            stroke="#000"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
}
