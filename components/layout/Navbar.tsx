"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";

import { Logo } from "@/components/brand/Logo";
import { GlowButton } from "@/components/ui/GlowButton";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import { useLenis } from "@/components/providers/SmoothScroll";
import { mainNav, services, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden
      className={cn(
        "size-3 transition-transform duration-300",
        open && "rotate-180",
      )}
    >
      <path
        d="M3 4.5L6 7.5L9 4.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Navbar() {
  const pathname = usePathname();
  const lenis = useLenis();
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.3,
  });

  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSolutions, setMobileSolutions] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 12));

  const openMega = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }, []);

  const scheduleClose = useCallback(() => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 140);
  }, []);

  const closeAll = useCallback(() => {
    setMegaOpen(false);
    setMobileOpen(false);
    setMobileSolutions(false);
  }, []);

  // Escape closes menus
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeAll();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAll]);

  // Lock scroll while mobile menu is open
  useEffect(() => {
    if (mobileOpen) lenis?.stop();
    else lenis?.start();
    document.body.style.overflow = mobileOpen ? "hidden" : "";
  }, [mobileOpen, lenis]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const solid = scrolled || megaOpen || mobileOpen;

  return (
    <>
      {/* Dim the page while the mega menu is open */}
      <AnimatePresence>
        {megaOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 hidden bg-black/60 backdrop-blur-[2px] lg:block"
            aria-hidden
          />
        )}
      </AnimatePresence>

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        onMouseLeave={scheduleClose}
        className="fixed inset-x-0 top-0 z-50"
      >
        <div
          className={cn(
            "relative border-b transition-colors duration-500",
            solid
              ? "border-white/[0.08] bg-black/75 backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <div className="container-x flex h-[76px] items-center justify-between gap-6">
            <Logo />

            {/* Center nav */}
            <nav
              className="hidden items-center gap-1 lg:flex"
              aria-label="Main"
            >
              {mainNav.map((item) =>
                "mega" in item && item.mega ? (
                  <button
                    key={item.href}
                    type="button"
                    aria-expanded={megaOpen}
                    aria-haspopup="true"
                    onMouseEnter={openMega}
                    onFocus={openMega}
                    onClick={() => setMegaOpen((v) => !v)}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-4 py-2.5 text-[15px] transition-colors",
                      megaOpen || isActive(item.href)
                        ? "text-white"
                        : "text-silver-400 hover:text-white",
                    )}
                  >
                    {item.label}
                    <Chevron open={megaOpen} />
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onMouseEnter={scheduleClose}
                    className={cn(
                      "rounded-lg px-4 py-2.5 text-[15px] transition-colors",
                      isActive(item.href)
                        ? "text-white"
                        : "text-silver-400 hover:text-white",
                    )}
                  >
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            {/* Right */}
            <div className="flex items-center gap-3">
              <a
                href={site.phoneHref}
                onMouseEnter={scheduleClose}
                className="hidden text-[15px] text-silver-400 transition-colors hover:text-white lg:block"
              >
                Talk to us
              </a>
              <span className="hidden h-5 w-px bg-white/10 lg:block" />
              <GlowButton
                href="/start-project"
                variant="primary"
                size="sm"
                className="hidden sm:inline-flex"
              >
                Start a Project
              </GlowButton>

              {/* Burger */}
              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
                className="relative grid size-11 place-items-center rounded-[10px] border border-white/10 bg-white/[0.04] lg:hidden"
              >
                <span
                  className={cn(
                    "absolute h-px w-5 bg-white transition-all duration-300",
                    mobileOpen ? "rotate-45" : "-translate-y-[4px]",
                  )}
                />
                <span
                  className={cn(
                    "absolute h-px w-5 bg-white transition-all duration-300",
                    mobileOpen ? "-rotate-45" : "translate-y-[4px]",
                  )}
                />
              </button>
            </div>
          </div>

          {/* Scroll progress line */}
          <motion.div
            aria-hidden
            style={{ scaleX: progress }}
            className={cn(
              "absolute inset-x-0 -bottom-px h-px origin-left bg-linear-to-r from-transparent via-silver-200 to-white transition-opacity duration-500",
              scrolled ? "opacity-100" : "opacity-0",
            )}
          />
        </div>

        {/* Mega menu (desktop) */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease }}
              onMouseEnter={openMega}
              className="absolute inset-x-0 top-full hidden lg:block"
            >
              <div className="container-x pt-3">
                <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-2/95 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
                  <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-silver-200/60 to-transparent" />

                  <div className="grid grid-cols-12">
                    {/* Services */}
                    <div className="col-span-8 p-6">
                      <p className="px-3 font-mono text-[11px] uppercase tracking-[0.2em] text-silver-600">
                        What we do
                      </p>
                      <ul className="mt-3 grid grid-cols-2 gap-1">
                        {services.map((s, i) => (
                          <motion.li
                            key={s.href}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              delay: 0.04 * i,
                              duration: 0.4,
                              ease,
                            }}
                          >
                            <Link
                              href={s.href}
                              onClick={closeAll}
                              className="group flex gap-4 rounded-xl p-3 transition-colors hover:bg-white/[0.04]"
                            >
                              <span className="grid size-11 shrink-0 place-items-center rounded-[10px] border border-white/10 bg-white/[0.03] text-silver-300 transition-all duration-300 group-hover:border-white/25 group-hover:text-white">
                                <ServiceIcon name={s.icon} />
                              </span>
                              <span>
                                <span className="block text-[15px] font-medium text-white">
                                  {s.title}
                                </span>
                                <span className="mt-0.5 block text-[13px] leading-snug text-silver-500 transition-colors group-hover:text-silver-400">
                                  {s.description}
                                </span>
                              </span>
                            </Link>
                          </motion.li>
                        ))}
                      </ul>
                    </div>

                    {/* Side card */}
                    <div className="col-span-4 border-l border-white/[0.07] p-3">
                      <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-black p-6">
                        <div className="bg-grid absolute inset-0 opacity-80" />
                        <div className="absolute -top-24 -right-24 size-56 rounded-full bg-silver-200/10 blur-3xl" />

                        <div className="relative">
                          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-silver-500">
                            Have an idea?
                          </p>
                          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                            Not sure what you need?
                          </h3>
                          <p className="mt-2 text-sm leading-relaxed text-silver-400">
                            Tell us about your business and we&apos;ll recommend
                            the right product, stack and plan.
                          </p>
                        </div>

                        <div className="relative mt-8 flex flex-col gap-2">
                          <GlowButton
                            href="/start-project"
                            variant="primary"
                            size="sm"
                            className="w-full"
                            onClick={closeAll}
                          >
                            Start a Project
                          </GlowButton>
                          <GlowButton
                            href={site.whatsapp}
                            variant="outline"
                            size="sm"
                            className="w-full"
                          >
                            Chat on WhatsApp
                          </GlowButton>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease }}
            className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-black px-5 pt-[100px] pb-8 lg:hidden"
            data-lenis-prevent
          >
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" />

            <nav className="relative flex flex-col" aria-label="Mobile">
              {/* Solutions accordion */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05, duration: 0.5, ease }}
                className="border-b border-white/[0.07]"
              >
                <button
                  type="button"
                  onClick={() => setMobileSolutions((v) => !v)}
                  aria-expanded={mobileSolutions}
                  className="flex w-full items-center justify-between py-5 text-left text-2xl font-medium tracking-tight text-white"
                >
                  Solutions
                  <Chevron open={mobileSolutions} />
                </button>

                <AnimatePresence initial={false}>
                  {mobileSolutions && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      className="overflow-hidden"
                    >
                      {services.map((s) => (
                        <li key={s.href}>
                          <Link
                            href={s.href}
                            onClick={closeAll}
                            className="flex items-center gap-3 py-3 text-silver-400"
                          >
                            <span className="grid size-9 place-items-center rounded-lg border border-white/10 text-silver-300">
                              <ServiceIcon name={s.icon} className="size-4" />
                            </span>
                            {s.title}
                          </Link>
                        </li>
                      ))}
                      <li className="h-3" />
                    </motion.ul>
                  )}
                </AnimatePresence>
              </motion.div>

              {mainNav
                .filter((item) => !("mega" in item))
                .map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05, duration: 0.5, ease }}
                  >
                    <Link
                      href={item.href}
                      onClick={closeAll}
                      className={cn(
                        "block border-b border-white/[0.07] py-5 text-2xl font-medium tracking-tight",
                        isActive(item.href) ? "text-white" : "text-silver-400",
                      )}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease }}
              className="relative mt-auto flex flex-col gap-3 pt-10"
            >
              <GlowButton
                href="/start-project"
                variant="primary"
                size="lg"
                className="w-full"
                onClick={closeAll}
              >
                Start a Project
              </GlowButton>
              <GlowButton
                href={site.phoneHref}
                variant="outline"
                size="lg"
                className="w-full"
              >
                Call {site.phone}
              </GlowButton>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
