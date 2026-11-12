"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Fintech                                                             */
/* ------------------------------------------------------------------ */

export function FintechScene() {
  const items = [
    {
      i: "K",
      t: "Payment received",
      s: "From Kemi Stores",
      a: "+₦120,000",
      accent: true,
    },
    { i: "T", t: "Transfer sent", s: "To Tobi A.", a: "-₦25,000" },
    { i: "S", t: "Savings goal", s: "New laptop", a: "80%", progress: 80 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[300px]">
        {items.map((it, idx) => (
          <motion.div
            key={it.t}
            animate={{ y: [0, -6, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.5,
            }}
            className={cn(
              "mb-3 rounded-xl border border-white/10 bg-black/85 p-4 shadow-[0_20px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur",
              idx === 1 && "ml-10",
              idx === 2 && "-ml-6",
            )}
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-white/[0.07] text-sm font-medium text-white">
                {it.i}
              </span>
              <div className="flex-1">
                <p className="text-sm text-white">{it.t}</p>
                <p className="text-xs text-silver-500">{it.s}</p>
              </div>
              <span
                className={cn(
                  "font-mono text-sm",
                  it.accent ? "text-brand-300" : "text-white",
                )}
              >
                {it.a}
              </span>
            </div>
            {it.progress && (
              <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${it.progress}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease }}
                  className="h-full rounded-full bg-white"
                />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* E-commerce                                                          */
/* ------------------------------------------------------------------ */

export function CommerceScene() {
  const products = [
    { n: "Sneakers", p: "₦45,000" },
    { n: "Headphones", p: "₦82,000" },
    { n: "Watch", p: "₦120,000" },
    { n: "Backpack", p: "₦28,500" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative">
        <div className="grid w-[300px] grid-cols-2 gap-3">
          {products.map((p, i) => (
            <div
              key={p.n}
              className="rounded-xl border border-white/10 bg-black/85 p-2.5"
            >
              <div
                className={cn(
                  "h-24 rounded-lg",
                  i % 2 === 0
                    ? "bg-linear-to-br from-white via-silver-300 to-silver-500"
                    : "bg-linear-to-br from-silver-600/50 to-ink-3",
                )}
              />
              <p className="mt-2 text-xs text-silver-400">{p.n}</p>
              <p className="text-sm font-medium text-white">{p.p}</p>
            </div>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -right-10 -bottom-6 w-[180px] rounded-xl border border-white/15 bg-ink-3/95 p-4 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.9)] backdrop-blur"
        >
          <div className="flex items-center justify-between text-sm">
            <span className="text-silver-400">Cart (3)</span>
            <span className="font-medium text-white">₦155,000</span>
          </div>
          <div className="mt-3 rounded-lg bg-white py-2 text-center text-sm font-medium text-black">
            Checkout
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Logistics                                                           */
/* ------------------------------------------------------------------ */

export function LogisticsScene() {
  return (
    <div className="absolute inset-0">
      <svg viewBox="0 0 400 320" className="absolute inset-0 h-full w-full">
        <defs>
          <path
            id="route"
            d="M40 270 C 120 270, 110 170, 200 170 S 300 70, 360 55"
          />
        </defs>

        {/* Background roads */}
        {[
          "M0 90 L400 120",
          "M0 220 L400 200",
          "M90 0 L130 320",
          "M280 0 L250 320",
        ].map((d) => (
          <path
            key={d}
            d={d}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="10"
            fill="none"
          />
        ))}

        {/* Route */}
        <use
          href="#route"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="8"
          fill="none"
          strokeLinecap="round"
        />
        <use
          href="#route"
          stroke="#ffffff"
          strokeWidth="2"
          strokeDasharray="6 8"
          fill="none"
          className="animate-dash"
        />

        {/* Start & end */}
        <rect
          x="32"
          y="262"
          width="16"
          height="16"
          rx="4"
          fill="#000"
          stroke="#fff"
          strokeWidth="2"
        />
        <rect x="350" y="45" width="20" height="20" rx="5" fill="#fff" />

        {/* Van */}
        <g>
          <rect x="-12" y="-8" width="24" height="16" rx="4" fill="#ffffff" />
          <rect x="4" y="-5" width="6" height="10" rx="1.5" fill="#000" />
          <animateMotion dur="6s" repeatCount="indefinite" rotate="auto">
            <mpath href="#route" />
          </animateMotion>
        </g>
      </svg>

      <div className="absolute bottom-6 left-6 rounded-xl border border-white/10 bg-black/85 p-4 backdrop-blur">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver-500">
          Order #4821
        </p>
        <p className="mt-1 text-sm font-medium text-white">
          Arriving in 12 min
        </p>
        <div className="mt-2 h-1 w-40 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-white"
            animate={{ width: ["10%", "90%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Dashboards                                                          */
/* ------------------------------------------------------------------ */

const bars = [40, 55, 45, 70, 60, 82, 74, 90, 68, 95, 86, 100];

export function DashboardScene() {
  const kpis = [
    { l: "Revenue", v: "₦8.2M", c: "+18%" },
    { l: "Orders", v: "1,284", c: "+9%" },
    { l: "Users", v: "12.4k", c: "+24%" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center p-6">
      <div className="w-full max-w-[360px] rounded-xl border border-white/10 bg-black/85 p-4">
        <div className="grid grid-cols-3 gap-2">
          {kpis.map((k) => (
            <div key={k.l} className="rounded-lg bg-white/[0.04] p-2.5">
              <p className="text-[10px] text-silver-500">{k.l}</p>
              <p className="mt-0.5 text-base font-semibold text-white">{k.v}</p>
              <p className="text-[10px] text-silver-400">{k.c}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex h-36 items-end gap-1.5">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, ease, delay: i * 0.04 }}
              className={cn(
                "flex-1 rounded-t-sm",
                i === bars.length - 1 ? "bg-white" : "bg-white/20",
              )}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between font-mono text-[9px] text-silver-600">
          <span>Jan</span>
          <span>Jun</span>
          <span>Dec</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Marketplaces                                                        */
/* ------------------------------------------------------------------ */

export function MarketplaceScene() {
  const listings = [
    { i: "T", n: "Tunde", s: "Plumbing", r: "4.9", p: "₦15,000" },
    { i: "A", n: "Amaka", s: "Home cleaning", r: "4.8", p: "₦12,000" },
    { i: "D", n: "David", s: "Electrical", r: "5.0", p: "₦20,000" },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-[320px] space-y-3">
        {listings.map((l, idx) => (
          <motion.div
            key={l.n}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease, delay: idx * 0.12 }}
            className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/85 p-3"
          >
            <span className="grid size-11 place-items-center rounded-lg bg-linear-to-br from-white via-silver-300 to-silver-500 font-semibold text-black">
              {l.i}
            </span>
            <div className="flex-1">
              <p className="text-sm text-white">
                {l.n} <span className="text-silver-500">· {l.s}</span>
              </p>
              <p className="text-xs text-silver-400">
                ★ {l.r} <span className="ml-2 text-silver-500">{l.p}</span>
              </p>
            </div>
            <span className="rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black">
              Book
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Enterprise                                                          */
/* ------------------------------------------------------------------ */

export function EnterpriseScene() {
  const steps = [
    "Request submitted",
    "Manager approved",
    "Finance approved",
    "Completed",
  ];
  const cycle = 5;

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="relative w-[280px]">
        <div className="absolute top-5 bottom-5 left-[19px] w-px bg-white/10" />
        <motion.div
          className="absolute top-5 left-[19px] w-px origin-top bg-white"
          style={{ height: "calc(100% - 40px)" }}
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{
            duration: cycle,
            repeat: Infinity,
            times: [0, 0.7, 0.92, 1],
            ease: "easeInOut",
          }}
        />

        <div className="space-y-4">
          {steps.map((s, i) => (
            <div key={s} className="relative flex items-center gap-4">
              <motion.span
                className="relative z-10 grid size-10 place-items-center rounded-lg border text-sm"
                animate={{
                  backgroundColor: [
                    "#000000",
                    "#000000",
                    "#ffffff",
                    "#ffffff",
                    "#000000",
                  ],
                  color: [
                    "#555a63",
                    "#555a63",
                    "#000000",
                    "#000000",
                    "#555a63",
                  ],
                  borderColor: [
                    "rgba(255,255,255,0.1)",
                    "rgba(255,255,255,0.1)",
                    "rgba(255,255,255,1)",
                    "rgba(255,255,255,1)",
                    "rgba(255,255,255,0.1)",
                  ],
                }}
                transition={{
                  duration: cycle,
                  repeat: Infinity,
                  times: [
                    0,
                    (i * 0.7) / 3 - 0.001 < 0 ? 0 : (i * 0.7) / 3,
                    (i * 0.7) / 3 + 0.05,
                    0.92,
                    1,
                  ],
                }}
              >
                ✓
              </motion.span>
              <div className="flex-1 rounded-lg border border-white/10 bg-black/85 px-4 py-2.5">
                <p className="text-sm text-white">{s}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
