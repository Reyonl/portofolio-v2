"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import MaskReveal from "@/components/MaskReveal";
import Magnetic from "@/components/Magnetic";
import { profile } from "@/data/site";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Hero: mask-revealed name, one-line tagline, pointer-parallax depth plates.
 * The big type is the visual — no photo, no paragraph.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.5 });

  // two depth layers moving opposite to the pointer
  const glowX = useTransform(sx, (v) => v * 28);
  const glowY = useTransform(sy, (v) => v * 28);
  const dotX = useTransform(sx, (v) => v * -16);
  const dotY = useTransform(sy, (v) => v * -16);

  const onMove = (e: React.MouseEvent) => {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pt-28 pb-24 sm:px-8"
    >
      {/* ambient depth plates — radial-gradient instead of blur() so the
          glow is cheap to rasterize (no full-layer blur on first paint) */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -top-[10%] right-[-10%] h-[60vmin] w-[60vmin] rounded-full bg-[radial-gradient(closest-side,rgba(255,138,61,0.16),transparent)]"
      />
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none absolute bottom-[8%] left-[-8%] h-[42vmin] w-[42vmin] rounded-full border border-line/70"
      />

      <div className="relative mx-auto w-full max-w-7xl">
        <p
          className="hero-fade mb-6 font-mono text-[11px] tracking-[0.28em] text-muted uppercase"
          style={{ animationDelay: "0.1s" }}
        >
          {profile.role} · {profile.school} · {profile.graduation}
        </p>

        <h1 className="font-display text-[clamp(2.75rem,11vw,9.5rem)] leading-[0.86] font-bold tracking-[-0.03em]">
          <MaskReveal as="span" mode="load" order={0} className="whitespace-nowrap">
            {profile.firstName}
          </MaskReveal>
          <MaskReveal as="span" mode="load" order={1} className="text-accent">
            {profile.lastName}
          </MaskReveal>
        </h1>

        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted sm:text-xl">
          {profile.tagline}
        </p>

        <div
          className="hero-fade mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.45s" }}
        >
          <Magnetic>
            <Link
              href="#work"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
            >
              Selected work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </Link>
          </Magnetic>
          <a
            href={profile.links.github}
            target="_blank"
            rel="noreferrer noopener"
            className="font-mono text-xs tracking-[0.18em] text-muted uppercase underline-offset-4 transition-colors hover:text-fg hover:underline"
          >
            @{profile.links.githubHandle}
          </a>
        </div>
      </div>

      {/* scroll cue */}
      <div
        className="hero-fade absolute inset-x-0 bottom-8 mx-auto w-max"
        style={{ animationDelay: "0.8s" }}
        aria-hidden
      >
        <div className="flex h-12 w-6 items-start justify-center rounded-full border border-line p-1.5">
          <span className="scroll-cue-dot block h-1.5 w-1 rounded-full bg-accent" />
        </div>
      </div>
    </section>
  );
}
