"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import MaskReveal from "@/components/MaskReveal";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { timeline } from "@/data/timeline";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import GitHubActivity from "@/components/GitHubActivity";

/**
 * Journey: a sticky rail whose progress line scales with scroll, milestones
 * fading in beside it. 2022 → now, one short line each.
 */
export default function Journey() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.5 });

  return (
    <section id="journey" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <header className="mb-16">
          <p className="mb-3 font-mono text-[11px] tracking-[0.28em] text-accent uppercase">
            {"// 2022 — now"}
          </p>
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] font-bold tracking-tight">
            <MaskReveal>Journey</MaskReveal>
          </h2>
        </header>

        <div ref={ref} className="relative pl-8 sm:pl-14">
          {/* rail */}
          <div className="absolute top-1 bottom-1 left-[7px] w-px bg-line sm:left-[23px]">
            {reduce ? (
              <div aria-hidden className="absolute inset-0 bg-accent/70" />
            ) : (
              <motion.div
                aria-hidden
                className="absolute inset-0 origin-top bg-accent"
                style={{ scaleY: scaleY }}
              />
            )}
          </div>

          <RevealGroup as="ol" className="space-y-10 sm:space-y-12">
            {timeline.map((m) => (
              <RevealItem as="li" key={m.date} className="relative">
                <span
                  aria-hidden
                  className="absolute top-1.5 -left-8 h-3 w-3 rounded-full border-2 border-accent bg-ink sm:-left-14"
                  style={{ marginLeft: -1 }}
                />
                <p className="font-mono text-[11px] tracking-[0.22em] text-accent uppercase">
                  {m.date}
                  {m.tag === "now" && (
                    <span className="ml-3 rounded-full bg-accent/15 px-2.5 py-0.5 text-accent">
                      today
                    </span>
                  )}
                </p>
                <h3 className="mt-1.5 font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {m.title}
                </h3>
                <p className="mt-1 max-w-xl text-sm leading-relaxed text-muted sm:text-[15px]">
                  {m.line}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Live GitHub Stats & Commit Activity */}
        <div className="mt-16 sm:mt-20">
          <GitHubActivity />
        </div>
      </div>
    </section>
  );
}
