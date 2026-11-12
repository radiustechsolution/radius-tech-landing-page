"use client";

import { Accordion } from "@heroui/react";
import { motion } from "motion/react";

import { BeamCard } from "@/components/ui/BeamCard";
import { GlowButton } from "@/components/ui/GlowButton";
import { site } from "@/lib/site";

const ease = [0.22, 1, 0.36, 1] as const;

// TODO: review every answer so it matches how you work
const faqs = [
  {
    id: "cost",
    q: "How much does it cost to build an app or website?",
    a: "It depends on the features, platforms and timeline. After a short call, we send you a clear quote with no hidden costs.",
  },
  {
    id: "time",
    q: "How long does a project take?",
    a: "Simple websites take a few weeks. Full mobile apps and fintech platforms take longer. You get a clear timeline before we start.",
  },
  {
    id: "platforms",
    q: "Do you build for both iOS and Android?",
    a: "Yes. With Flutter and React Native we build one app that runs on both, which saves you time and money.",
  },
  {
    id: "code",
    q: "Will I own the source code?",
    a: "Yes. Once the project is paid for, the code and all project assets belong to you.",
  },

  {
    id: "launch",
    q: "Do you handle hosting and app store publishing?",
    a: "Yes. We deploy to the cloud and take care of App Store and Google Play submissions for you.",
  },
  {
    id: "support",
    q: "Do you offer support after launch?",
    a: "Yes. Our maintenance plans cover bug fixes, updates, security patches and server monitoring.",
  },
  {
    id: "start",
    q: "How do we get started?",
    a: "Click Start a Project or message us on WhatsApp. We'll book a short call to understand your idea and next steps.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-28 md:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-10">
        {/* ---------- Left ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease }}
          className="lg:col-span-5"
        >
          <div className="lg:sticky lg:top-32">
            <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-5xl xl:text-6xl">
              <span className="text-gradient">Questions?</span>
              <br />
              <span className="font-serif font-normal italic tracking-normal text-silver">
                Answered.
              </span>
            </h2>
            <p className="mt-5 max-w-sm text-lg text-silver-400">
              Everything you need to know before we build together.
            </p>

            <BeamCard className="mt-10 max-w-sm" speed={8}>
              <div className="relative p-6">
                <h3 className="text-lg font-medium text-white">
                  Still have questions?
                </h3>
                <p className="mt-1.5 text-sm text-silver-400">
                  Talk to us directly. We reply fast.
                </p>
                <div className="mt-5 flex flex-col gap-2 sm:flex-row">
                  <GlowButton href={site.whatsapp} variant="primary" size="sm">
                    WhatsApp Us
                  </GlowButton>
                  <GlowButton href={site.phoneHref} variant="outline" size="sm">
                    Call Us
                  </GlowButton>
                </div>
              </div>
            </BeamCard>
          </div>
        </motion.div>

        {/* ---------- Questions ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease, delay: 0.1 }}
          className="lg:col-span-7"
        >
          <Accordion
            className="w-full border-t border-white/[0.08] bg-transparent p-0"
            defaultExpandedKeys={new Set(["cost"])}
          >
            {faqs.map((f) => (
              <Accordion.Item
                key={f.id}
                id={f.id}
                className="border-b border-white/[0.08] bg-transparent"
              >
                <Accordion.Heading>
                  <Accordion.Trigger className="flex w-full items-center justify-between gap-6 bg-transparent px-0 py-6 text-left text-lg font-medium tracking-tight text-silver-300 transition-colors hover:bg-transparent hover:text-white aria-expanded:text-white md:text-xl">
                    {f.q}
                    <Accordion.Indicator className="shrink-0 text-silver-500" />
                  </Accordion.Trigger>
                </Accordion.Heading>
                <Accordion.Panel>
                  <Accordion.Body className="max-w-xl px-0 pb-6 text-[15px] leading-relaxed text-silver-400 md:text-base">
                    {f.a}
                  </Accordion.Body>
                </Accordion.Panel>
              </Accordion.Item>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
