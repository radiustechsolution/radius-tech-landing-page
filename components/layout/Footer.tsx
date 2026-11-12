"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";

import { LogoMark } from "@/components/brand/Logo";
import { GlowButton } from "@/components/ui/GlowButton";
import { Magnetic } from "@/components/ui/Magnetic";
import { footerServices, navLinks, site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;
const WORD = "RADIUS".split("");

/** Fixed fallback so the page can be prerendered; updated in the browser */
const FALLBACK_YEAR = 2026;

function CurrentYear() {
  const [year, setYear] = useState(FALLBACK_YEAR);

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return <>{year}</>;
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-24">
      {/* CTA panel */}
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="relative isolate overflow-hidden rounded-2xl border border-white/10 bg-ink-2 px-6 py-16 text-center md:px-16 md:py-24"
        >
          <div className="bg-grid absolute inset-0 -z-10 opacity-70" />
          <div className="absolute -top-40 left-1/2 -z-10 h-80 w-[70%] -translate-x-1/2 rounded-full bg-silver-200/[0.12] blur-[120px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-silver-200/70 to-transparent" />

          <span className="inline-flex items-center rounded-md border border-white/10 bg-white/[0.03] px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-silver-400">
            Available for new projects
          </span>

          <h2 className="mx-auto mt-6 max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            <span className="text-gradient">Got an idea?</span>{" "}
            <span className="font-serif font-normal italic text-silver">
              Let&apos;s build it.
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-silver-400">
            Tell us what you have in mind. We&apos;ll turn it into a fast,
            secure, scalable product your users will love.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Magnetic>
              <GlowButton href="/start-project" variant="primary" size="lg">
                Start a Project
              </GlowButton>
            </Magnetic>
            <Magnetic>
              <GlowButton href={site.whatsapp} variant="outline" size="lg">
                Chat on WhatsApp
              </GlowButton>
            </Magnetic>
          </div>
        </motion.div>
      </div>

      {/* Columns */}
      <div className="container-x mt-20 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <LogoMark className="size-11" />
            <span className="text-2xl font-semibold tracking-tight">
              Radius Tech
            </span>
          </Link>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-silver-400">
            {site.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-white/10 px-3.5 py-2 text-xs text-silver-400 transition-colors hover:border-silver-300/60 hover:text-white"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-600">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-sm text-silver-400 transition-colors hover:text-white"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/start-project"
                className="text-sm text-silver-400 transition-colors hover:text-white"
              >
                Start a Project
              </Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-600">
            Services
          </h3>
          <ul className="mt-5 space-y-3">
            {footerServices.map((s) => (
              <li key={s} className="text-sm text-silver-400">
                {s}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-600">
            Get in Touch
          </h3>
          <p className="mt-5 text-sm text-silver-400">
            Ready to build something great? Let&apos;s talk.
          </p>
          <a
            href={site.phoneHref}
            className="mt-4 block text-xl font-medium tracking-tight text-white transition-colors hover:text-brand-300"
          >
            {site.phone}
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 block text-sm text-silver-400 transition-colors hover:text-white"
          >
            WhatsApp: {site.whatsappNumber}
          </a>
          {site.email && (
            <a
              href={`mailto:${site.email}`}
              className="mt-2 block text-sm text-silver-400 transition-colors hover:text-white"
            >
              {site.email}
            </a>
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="container-x mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/[0.07] py-6 text-xs text-silver-600 md:flex-row">
        <p>
          © <CurrentYear /> {site.name}. All rights reserved.
        </p>
        <div className="flex gap-6">
          <Link href="/privacy" className="transition-colors hover:text-white">
            Privacy Policy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-white">
            Terms of Service
          </Link>
        </div>
      </div>

      {/* Giant silver wordmark */}
      <div
        aria-hidden
        className="pointer-events-none relative -mb-[4vw] flex justify-center select-none"
      >
        {WORD.map((char, i) => (
          <motion.span
            key={i}
            initial={{ y: "60%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 1, ease }}
            className="bg-linear-to-b from-silver-200/[0.18] to-transparent bg-clip-text text-[24vw] leading-[0.8] font-semibold tracking-tighter text-transparent"
          >
            {char}
          </motion.span>
        ))}
      </div>
    </footer>
  );
}
