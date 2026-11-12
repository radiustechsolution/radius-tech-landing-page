"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { site, type ServiceIconName } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

/* ------------------------------------------------------------------ */
/* Options                                                             */
/* ------------------------------------------------------------------ */

const projectTypes: { label: string; icon: ServiceIconName }[] = [
  { label: "Mobile App", icon: "mobile" },
  { label: "Website", icon: "frontend" },
  { label: "Web App / SaaS", icon: "web" },
  { label: "Fintech Platform", icon: "fintech" },
  { label: "Backend & API", icon: "backend" },
  { label: "Integrations", icon: "api" },
  { label: "UI/UX Design", icon: "design" },
  { label: "Cloud & DevOps", icon: "cloud" },
];

const featureOptions = [
  "User accounts",
  "Payments",
  "Admin dashboard",
  "Notifications",
  "Chat / messaging",
  "Maps & location",
  "Bookings",
  "Analytics & reports",
  "Third-party APIs",
  "Not sure yet",
];

// TODO: set ranges that match your pricing
const budgets = [
  "Under ₦1M",
  "₦1M – ₦3M",
  "₦3M – ₦10M",
  "Above ₦10M",
  "Not sure yet",
];
const timelines = [
  "As soon as possible",
  "1 – 3 months",
  "3 – 6 months",
  "Flexible",
];

const steps = ["Project", "Features", "Budget", "Details"];

type Form = {
  name: string;
  phone: string;
  email: string;
  company: string;
  details: string;
};

/* ------------------------------------------------------------------ */
/* Small UI pieces                                                     */
/* ------------------------------------------------------------------ */

function Btn({
  children,
  onClick,
  variant = "primary",
  disabled,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex h-12 items-center justify-center rounded-[10px] px-7 text-[15px] font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-35",
        variant === "primary"
          ? "bg-brand text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_10px_40px_-12px_rgba(29,93,255,0.7)] enabled:hover:bg-brand-400"
          : "border border-white/15 text-white enabled:hover:bg-white/[0.05]",
      )}
    >
      {children}
    </button>
  );
}

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

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-silver-400">
        {label} {required && <span className="text-white">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "h-12 w-full rounded-[10px] border border-white/10 bg-black/60 px-4 text-[15px] text-white placeholder:text-silver-600 outline-none transition-colors focus:border-white/40";

function SummaryRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="border-b border-white/[0.06] py-4 last:border-b-0">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver-600">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

function Empty() {
  return <span className="text-sm text-silver-700">Not selected</span>;
}

/* ------------------------------------------------------------------ */
/* Main                                                                */
/* ------------------------------------------------------------------ */

export function ProjectStarter({
  showHeading = true,
}: {
  showHeading?: boolean;
}) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [sent, setSent] = useState(false);

  const [types, setTypes] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [form, setForm] = useState<Form>({
    name: "",
    phone: "",
    email: "",
    company: "",
    details: "",
  });

  const toggle = (list: string[], set: (v: string[]) => void, value: string) =>
    set(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value],
    );

  const canContinue = [
    types.length > 0,
    true,
    Boolean(budget && timeline),
    Boolean(form.name.trim() && form.phone.trim()),
  ][step];

  const go = (next: number) => {
    setDir(next > step ? 1 : -1);
    setStep(next);
  };

  const send = () => {
    const lines: string[] = [
      "Hello Radius Tech, I'd like to start a project.",
      "",
      `Project: ${types.join(", ")}`,
      `Features: ${features.length ? features.join(", ") : "Not specified"}`,
      `Budget: ${budget}`,
      `Timeline: ${timeline}`,
      "",
      `Name: ${form.name.trim()}`,
      `Phone: ${form.phone.trim()}`,
    ];

    if (form.email.trim()) lines.push(`Email: ${form.email.trim()}`);
    if (form.company.trim()) lines.push(`Company: ${form.company.trim()}`);
    if (form.details.trim()) lines.push("", `Details: ${form.details.trim()}`);

    const url = `${site.whatsapp}?text=${encodeURIComponent(lines.join("\n"))}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  const reset = () => {
    setTypes([]);
    setFeatures([]);
    setBudget("");
    setTimeline("");
    setForm({ name: "", phone: "", email: "", company: "", details: "" });
    setStep(0);
    setSent(false);
  };

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <section id="start" className="relative py-28 md:py-36">
      <div className="container-x">
        {showHeading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
              <span className="text-gradient">Let&apos;s build</span>
              <br />
              <span className="font-serif font-normal italic tracking-normal text-silver">
                something great
              </span>
            </h2>
            <p className="mx-auto mt-5 max-w-md text-lg text-silver-400">
              Answer a few quick questions. It takes less than a minute.
            </p>
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className={cn(showHeading && "mt-14")}
        >
          <BeamCard speed={8}>
            <div className="relative grid lg:grid-cols-12">
              {/* ---------- Form ---------- */}
              <div className="flex min-h-[580px] flex-col p-6 md:p-10 lg:col-span-8">
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                    className="flex flex-1 flex-col items-start justify-center"
                  >
                    <span className="grid size-14 place-items-center rounded-2xl bg-white text-2xl text-black">
                      ✓
                    </span>
                    <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white md:text-4xl">
                      Your request is ready
                    </h3>
                    <p className="mt-3 max-w-md text-silver-400">
                      We&apos;ve opened WhatsApp with your project details. Just
                      press send and we&apos;ll get back to you shortly.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Btn variant="ghost" onClick={reset}>
                        Start over
                      </Btn>
                      <a
                        href={site.phoneHref}
                        className="inline-flex h-12 items-center rounded-[10px] px-4 text-[15px] text-silver-400 transition-colors hover:text-white"
                      >
                        Or call {site.phone}
                      </a>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {/* Progress */}
                    <div className="grid grid-cols-4 gap-2">
                      {steps.map((s, i) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => i < step && go(i)}
                          className={cn(
                            "text-left",
                            i < step ? "cursor-pointer" : "cursor-default",
                          )}
                        >
                          <div className="relative h-px bg-white/10">
                            <motion.div
                              className="absolute inset-0 origin-left bg-white"
                              initial={false}
                              animate={{ scaleX: i <= step ? 1 : 0 }}
                              transition={{ duration: 0.5, ease }}
                            />
                          </div>
                          <span
                            className={cn(
                              "mt-3 block font-mono text-[11px] uppercase tracking-[0.15em] transition-colors",
                              i <= step ? "text-white" : "text-silver-600",
                            )}
                          >
                            {s}
                          </span>
                        </button>
                      ))}
                    </div>

                    {/* Step content */}
                    <div className="relative mt-10 flex-1">
                      <AnimatePresence mode="wait" custom={dir}>
                        <motion.div
                          key={step}
                          custom={dir}
                          variants={variants}
                          initial="enter"
                          animate="center"
                          exit="exit"
                          transition={{ duration: 0.4, ease }}
                        >
                          {step === 0 && (
                            <>
                              <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                                What do you want to build?
                              </h3>
                              <p className="mt-2 text-silver-500">
                                Pick one or more.
                              </p>
                              <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
                                {projectTypes.map((t) => {
                                  const active = types.includes(t.label);
                                  return (
                                    <button
                                      key={t.label}
                                      type="button"
                                      onClick={() =>
                                        toggle(types, setTypes, t.label)
                                      }
                                      className={cn(
                                        "group relative flex flex-col items-start gap-4 rounded-xl border p-4 text-left transition-all duration-300",
                                        active
                                          ? "border-white bg-white/[0.07]"
                                          : "border-white/10 hover:border-white/25 hover:bg-white/[0.02]",
                                      )}
                                    >
                                      <span
                                        className={cn(
                                          "grid size-10 place-items-center rounded-[10px] transition-colors",
                                          active
                                            ? "bg-white text-black"
                                            : "bg-white/[0.05] text-silver-300",
                                        )}
                                      >
                                        <ServiceIcon name={t.icon} />
                                      </span>
                                      <span
                                        className={cn(
                                          "text-sm",
                                          active
                                            ? "text-white"
                                            : "text-silver-300",
                                        )}
                                      >
                                        {t.label}
                                      </span>
                                      <span
                                        className={cn(
                                          "absolute top-3 right-3 grid size-5 place-items-center rounded-md border text-[11px] transition-all",
                                          active
                                            ? "border-white bg-white text-black"
                                            : "border-white/15 text-transparent",
                                        )}
                                      >
                                        ✓
                                      </span>
                                    </button>
                                  );
                                })}
                              </div>
                            </>
                          )}

                          {step === 1 && (
                            <>
                              <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                                Which features do you need?
                              </h3>
                              <p className="mt-2 text-silver-500">
                                Optional. Select all that apply.
                              </p>
                              <div className="mt-7 flex flex-wrap gap-2.5">
                                {featureOptions.map((f) => (
                                  <Chip
                                    key={f}
                                    label={f}
                                    active={features.includes(f)}
                                    onClick={() =>
                                      toggle(features, setFeatures, f)
                                    }
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {step === 2 && (
                            <>
                              <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                                Budget and timeline
                              </h3>
                              <p className="mt-2 text-silver-500">
                                A rough idea helps us plan the right solution.
                              </p>

                              <p className="mt-7 text-sm text-silver-400">
                                Budget
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2.5">
                                {budgets.map((b) => (
                                  <Chip
                                    key={b}
                                    label={b}
                                    active={budget === b}
                                    onClick={() => setBudget(b)}
                                  />
                                ))}
                              </div>

                              <p className="mt-8 text-sm text-silver-400">
                                Timeline
                              </p>
                              <div className="mt-3 flex flex-wrap gap-2.5">
                                {timelines.map((t) => (
                                  <Chip
                                    key={t}
                                    label={t}
                                    active={timeline === t}
                                    onClick={() => setTimeline(t)}
                                  />
                                ))}
                              </div>
                            </>
                          )}

                          {step === 3 && (
                            <>
                              <h3 className="text-2xl font-medium tracking-tight text-white md:text-3xl">
                                How can we reach you?
                              </h3>
                              <p className="mt-2 text-silver-500">
                                We&apos;ll get back to you shortly.
                              </p>

                              <div className="mt-7 grid gap-4 md:grid-cols-2">
                                <Field label="Full name" required>
                                  <input
                                    className={inputCls}
                                    value={form.name}
                                    onChange={(e) =>
                                      setForm({ ...form, name: e.target.value })
                                    }
                                    placeholder="Your name"
                                    autoComplete="name"
                                  />
                                </Field>
                                <Field label="Phone / WhatsApp" required>
                                  <input
                                    className={inputCls}
                                    value={form.phone}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        phone: e.target.value,
                                      })
                                    }
                                    placeholder="080..."
                                    type="tel"
                                    autoComplete="tel"
                                  />
                                </Field>
                                <Field label="Email">
                                  <input
                                    className={inputCls}
                                    value={form.email}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        email: e.target.value,
                                      })
                                    }
                                    placeholder="you@company.com"
                                    type="email"
                                    autoComplete="email"
                                  />
                                </Field>
                                <Field label="Company">
                                  <input
                                    className={inputCls}
                                    value={form.company}
                                    onChange={(e) =>
                                      setForm({
                                        ...form,
                                        company: e.target.value,
                                      })
                                    }
                                    placeholder="Optional"
                                    autoComplete="organization"
                                  />
                                </Field>
                                <div className="md:col-span-2">
                                  <Field label="Tell us more">
                                    <textarea
                                      className={cn(
                                        inputCls,
                                        "h-28 resize-none py-3",
                                      )}
                                      value={form.details}
                                      onChange={(e) =>
                                        setForm({
                                          ...form,
                                          details: e.target.value,
                                        })
                                      }
                                      placeholder="Briefly describe your idea (optional)"
                                    />
                                  </Field>
                                </div>
                              </div>
                            </>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>

                    {/* Navigation */}
                    <div className="mt-10 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-6">
                      <div>
                        {step > 0 && (
                          <Btn variant="ghost" onClick={() => go(step - 1)}>
                            Back
                          </Btn>
                        )}
                      </div>
                      {step < steps.length - 1 ? (
                        <Btn
                          onClick={() => go(step + 1)}
                          disabled={!canContinue}
                        >
                          {step === 1 && features.length === 0
                            ? "Skip"
                            : "Continue"}
                        </Btn>
                      ) : (
                        <Btn onClick={send} disabled={!canContinue}>
                          Send on WhatsApp
                        </Btn>
                      )}
                    </div>
                  </>
                )}
              </div>

              {/* ---------- Summary ---------- */}
              <aside className="border-t border-white/[0.06] bg-black/40 p-6 md:p-10 lg:col-span-4 lg:border-t-0 lg:border-l">
                <p className="text-lg font-medium text-white">Your project</p>
                <p className="mt-1 text-sm text-silver-500">
                  Updates as you go
                </p>

                <div className="mt-6">
                  <SummaryRow label="Building">
                    {types.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {types.map((t) => (
                          <motion.span
                            key={t}
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="rounded-md bg-white/[0.08] px-2.5 py-1 text-xs text-white"
                          >
                            {t}
                          </motion.span>
                        ))}
                      </div>
                    ) : (
                      <Empty />
                    )}
                  </SummaryRow>

                  <SummaryRow label="Features">
                    {features.length ? (
                      <p className="text-sm leading-relaxed text-silver-300">
                        {features.join(", ")}
                      </p>
                    ) : (
                      <Empty />
                    )}
                  </SummaryRow>

                  <SummaryRow label="Budget">
                    {budget ? (
                      <p className="text-sm text-silver-300">{budget}</p>
                    ) : (
                      <Empty />
                    )}
                  </SummaryRow>

                  <SummaryRow label="Timeline">
                    {timeline ? (
                      <p className="text-sm text-silver-300">{timeline}</p>
                    ) : (
                      <Empty />
                    )}
                  </SummaryRow>

                  <SummaryRow label="Contact">
                    {form.name ? (
                      <p className="text-sm text-silver-300">
                        {form.name}
                        {form.company && (
                          <span className="text-silver-500">
                            , {form.company}
                          </span>
                        )}
                      </p>
                    ) : (
                      <Empty />
                    )}
                  </SummaryRow>
                </div>
              </aside>
            </div>
          </BeamCard>
        </motion.div>
      </div>
    </section>
  );
}
