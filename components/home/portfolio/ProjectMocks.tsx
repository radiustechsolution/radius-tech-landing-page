"use client";

import { motion } from "motion/react";
import type { MockKind } from "@/lib/projects";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/* Shared pieces                                                       */
/* ------------------------------------------------------------------ */

function Phone({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative h-[440px] w-[216px] rounded-[38px] border border-white/15 bg-linear-to-b from-silver-300/30 to-silver-700/20 p-[5px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.95)]",
        className,
      )}
    >
      <div className="relative h-full w-full overflow-hidden rounded-[33px] bg-ink-2 px-4 pt-10 pb-4">
        <div className="absolute top-2.5 left-1/2 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
        {children}
      </div>
    </div>
  );
}

function AppHeader({ name, initial }: { name: string; initial: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] font-semibold text-white">{name}</span>
      <span className="grid size-7 place-items-center rounded-full bg-linear-to-br from-white to-silver-500 text-[11px] font-bold text-black">
        {initial}
      </span>
    </div>
  );
}

function Row({ i, t, a }: { i: string; t: string; a: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="grid size-7 place-items-center rounded-lg bg-white/[0.07] text-[10px] text-white">
        {i}
      </span>
      <span className="flex-1 text-[11px] text-silver-300">{t}</span>
      <span className="font-mono text-[11px] text-white">{a}</span>
    </div>
  );
}

function Browser({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-white/10 bg-black shadow-[0_30px_60px_-20px_rgba(0,0,0,0.9)]",
        className,
      )}
    >
      <div className="border-b border-white/[0.07] px-3 py-2">
        <div className="mx-auto h-3 w-28 rounded bg-white/[0.06]" />
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function FloatCard({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      animate={{ y: [0, -10, 0] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay }}
      className={cn(
        "absolute rounded-xl border border-white/15 bg-ink-3/95 p-3.5 shadow-[0_30px_50px_-20px_rgba(0,0,0,0.95)] backdrop-blur",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Screens                                                             */
/* ------------------------------------------------------------------ */

function WalletScreen() {
  return (
    <>
      <AppHeader name="DuraPay" initial="D" />
      <div className="mt-4 rounded-2xl bg-linear-to-br from-white via-silver-200 to-silver-500 p-4 text-black">
        <p className="text-[10px] text-black/60">Available balance</p>
        <p className="mt-1 text-xl font-semibold">₦1,250,400</p>
        <p className="mt-3 font-mono text-[9px] text-black/60">
          Acct 0123 456 789
        </p>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Transfer", "Bills", "Cards"].map((a) => (
          <div
            key={a}
            className="rounded-xl bg-white/[0.05] py-3 text-center text-[10px] text-silver-300"
          >
            {a}
          </div>
        ))}
      </div>
      <p className="mt-5 text-[11px] text-silver-500">Recent</p>
      <div className="mt-2.5 space-y-3">
        <Row i="K" t="Kemi Stores" a="+₦45,000" />
        <Row i="E" t="Electricity" a="-₦12,000" />
        <Row i="T" t="Tobi A." a="-₦8,500" />
      </div>
    </>
  );
}

function SavingsScreen() {
  const r = 46;
  const c = 2 * Math.PI * r;
  return (
    <>
      <AppHeader name="SecureVest" initial="S" />
      <p className="mt-5 text-[11px] text-silver-500">Total savings</p>
      <div className="relative mx-auto mt-3 size-[130px]">
        <svg viewBox="0 0 110 110" className="size-full -rotate-90">
          <circle
            cx="55"
            cy="55"
            r={r}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="9"
            fill="none"
          />
          <motion.circle
            cx="55"
            cy="55"
            r={r}
            stroke="#ffffff"
            strokeWidth="9"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={c}
            initial={{ strokeDashoffset: c }}
            whileInView={{ strokeDashoffset: c * 0.28 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center text-center">
          <div>
            <p className="text-lg font-semibold text-white">72%</p>
            <p className="text-[9px] text-silver-500">₦720k of ₦1M</p>
          </div>
        </div>
      </div>
      <div className="mt-5 space-y-3.5">
        {[
          ["Rent", 60],
          ["New car", 35],
          ["Vacation", 82],
        ].map(([g, p]) => (
          <div key={g as string}>
            <div className="flex justify-between text-[10px]">
              <span className="text-silver-300">{g}</span>
              <span className="font-mono text-silver-500">{p}%</span>
            </div>
            <div className="mt-1.5 h-1.5 rounded-full bg-white/[0.08]">
              <div
                className="h-full rounded-full bg-white/80"
                style={{ width: `${p}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function VtuScreen() {
  return (
    <>
      <AppHeader name="HenzPay" initial="H" />
      <p className="mt-5 text-[11px] text-silver-500">Select network</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {["MTN", "Airtel", "Glo", "9mob"].map((n, i) => (
          <span
            key={n}
            className={cn(
              "rounded-lg py-2 text-center text-[9px]",
              i === 0
                ? "bg-white text-black"
                : "bg-white/[0.06] text-silver-400",
            )}
          >
            {n}
          </span>
        ))}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {["Airtime", "Data", "Electricity", "Cable TV"].map((t) => (
          <div key={t} className="rounded-xl bg-white/[0.05] p-3">
            <div className="size-6 rounded-md bg-white/10" />
            <p className="mt-2 text-[10px] text-silver-300">{t}</p>
          </div>
        ))}
      </div>
      <p className="mt-4 text-[11px] text-silver-500">Amount</p>
      <div className="mt-2 grid grid-cols-4 gap-1.5">
        {["₦100", "₦200", "₦500", "₦1k"].map((a, i) => (
          <span
            key={a}
            className={cn(
              "rounded-lg border py-1.5 text-center font-mono text-[9px]",
              i === 2
                ? "border-white text-white"
                : "border-white/10 text-silver-500",
            )}
          >
            {a}
          </span>
        ))}
      </div>
      <div className="mt-4 rounded-xl bg-white py-2.5 text-center text-[11px] font-medium text-black">
        Pay ₦500
      </div>
    </>
  );
}

function MarketplaceScreen() {
  return (
    <>
      <AppHeader name="Miobodo" initial="M" />
      <div className="mt-4 rounded-xl border border-white/10 px-3 py-2.5 text-[10px] text-silver-500">
        Find a service...
      </div>
      <div className="mt-4 grid grid-cols-4 gap-2">
        {["Clean", "Plumb", "Electric", "Repair"].map((c) => (
          <div key={c} className="text-center">
            <div className="mx-auto size-10 rounded-xl bg-white/[0.07]" />
            <p className="mt-1.5 text-[9px] text-silver-400">{c}</p>
          </div>
        ))}
      </div>
      <p className="mt-5 text-[11px] text-silver-500">Top rated near you</p>
      <div className="mt-2 space-y-2">
        {[
          ["T", "Tunde", "Plumber", "4.9"],
          ["A", "Amaka", "Cleaner", "4.8"],
        ].map(([i, n, r, s]) => (
          <div
            key={n}
            className="flex items-center gap-2.5 rounded-xl bg-white/[0.04] p-2.5"
          >
            <span className="grid size-9 place-items-center rounded-lg bg-linear-to-br from-white to-silver-500 text-[11px] font-bold text-black">
              {i}
            </span>
            <div className="flex-1">
              <p className="text-[11px] text-white">{n}</p>
              <p className="text-[9px] text-silver-500">
                {r} ★ {s}
              </p>
            </div>
            <span className="rounded-md bg-white px-2 py-1 text-[9px] font-medium text-black">
              Book
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function CardsScreen() {
  const bars = [40, 65, 50, 80, 60, 90, 70];
  return (
    <>
      <AppHeader name="DeepPaya" initial="D" />
      <div className="relative mt-4 h-[110px]">
        <div className="absolute inset-x-3 top-0 h-[100px] rounded-2xl bg-white/[0.06]" />
        <div className="absolute inset-x-0 top-3 h-[100px] rounded-2xl bg-linear-to-br from-white via-silver-200 to-silver-500 p-3.5 text-black">
          <p className="font-mono text-[9px] tracking-widest">DEEPPAYA</p>
          <p className="mt-5 font-mono text-[11px] tracking-[0.2em]">
            **** 2048
          </p>
        </div>
      </div>
      <p className="mt-6 text-[11px] text-silver-500">This week</p>
      <div className="mt-2 flex h-20 items-end gap-1.5">
        {bars.map((h, i) => (
          <motion.span
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.05 }}
            className={cn(
              "flex-1 rounded-t",
              i === 5 ? "bg-white" : "bg-white/20",
            )}
          />
        ))}
      </div>
      <div className="mt-4 space-y-3">
        <Row i="S" t="Salary" a="+₦650,000" />
        <Row i="R" t="Rent" a="-₦180,000" />
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Compositions                                                        */
/* ------------------------------------------------------------------ */

export function ProjectMock({ kind }: { kind: MockKind }) {
  switch (kind) {
    case "wallet":
      return (
        <div className="relative">
          <Browser className="absolute top-10 -left-44 hidden w-[300px] -rotate-[4deg] opacity-80 lg:block">
            <div className="h-3 w-24 rounded bg-white/60" />
            <div className="mt-2 h-2 w-36 rounded bg-white/20" />
            <div className="mt-3 h-6 w-20 rounded bg-white" />
            <div className="mt-4 h-24 rounded-lg bg-linear-to-br from-silver-300/30 to-transparent" />
          </Browser>
          <Phone>
            <WalletScreen />
          </Phone>
          <FloatCard className="-right-24 bottom-24 hidden w-[180px] sm:block">
            <p className="text-[10px] text-silver-500">Transfer successful</p>
            <p className="mt-1 text-sm font-medium text-white">₦45,000 sent</p>
          </FloatCard>
        </div>
      );

    case "savings":
      return (
        <div className="relative">
          <Browser className="absolute top-16 -right-48 hidden w-[300px] rotate-[4deg] opacity-80 lg:block">
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((i) => (
                <div key={i} className="h-12 rounded-md bg-white/[0.05]" />
              ))}
            </div>
            <div className="mt-3 flex h-20 items-end gap-1">
              {[30, 50, 40, 70, 55, 85, 65, 95].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-sm bg-white/25"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </Browser>
          <Phone>
            <SavingsScreen />
          </Phone>
        </div>
      );

    case "vtu":
      return (
        <div className="relative">
          <Phone>
            <VtuScreen />
          </Phone>
          <FloatCard className="-left-28 top-28 hidden w-[170px] sm:block">
            <p className="text-[10px] text-silver-500">Data purchased</p>
            <p className="mt-1 text-sm font-medium text-white">10GB · ₦3,000</p>
          </FloatCard>
        </div>
      );

    case "marketplace":
      return (
        <div className="relative">
          <Phone>
            <MarketplaceScreen />
          </Phone>
          <FloatCard
            className="-right-28 top-32 hidden w-[180px] sm:block"
            delay={0.5}
          >
            <p className="text-[10px] text-silver-500">Booking confirmed</p>
            <p className="mt-1 text-sm font-medium text-white">
              Tunde · Tomorrow 10am
            </p>
          </FloatCard>
        </div>
      );

    case "cards":
      return (
        <div className="relative">
          <Phone>
            <CardsScreen />
          </Phone>
          <FloatCard
            className="-left-28 bottom-28 hidden w-[170px] sm:block"
            delay={0.3}
          >
            <p className="text-[10px] text-silver-500">Card payment</p>
            <p className="mt-1 text-sm font-medium text-white">Approved</p>
          </FloatCard>
        </div>
      );
  }
}
