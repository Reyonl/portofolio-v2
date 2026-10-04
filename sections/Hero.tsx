"use client";

import { useRef } from "react";
import Image from "next/image";
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
 * Hero: mask-revealed name, one-line tagline, and the die-cut portrait —
 * floating on a slow sine, ringed by a slowly rotating dashed accent orbit,
 * with light pointer-parallax. On mobile the portrait stacks under the copy.
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 22, mass: 0.5 });
  const sy = useSpring(my, { stiffness: 60, damping: 22, mass: 0.5 });

  // two ambient depth layers moving opposite to the pointer
  const glowX = useTransform(sx, (v) => v * 28);
  const glowY = useTransform(sy, (v) => v * 28);
  const dotX = useTransform(sx, (v) => v * -16);
  const dotY = useTransform(sy, (v) => v * -16);
  // the portrait drifts a little against the mouse (closer layer = less travel)
  const faceX = useTransform(sx, (v) => v * -18);
  const faceY = useTransform(sy, (v) => v * -12);

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

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-6">
        <div className="min-w-0">
          <div className="hero-fade mb-6 flex flex-col font-mono text-[10px] tracking-[0.2em] text-muted uppercase sm:text-[11px] sm:tracking-[0.28em]" style={{ animationDelay: "0.1s" }}>
            <span className="whitespace-nowrap">{profile.role}</span>
            <span className="whitespace-nowrap">
              {profile.school} · {profile.graduation}
            </span>
          </div>

          <h1 className="font-display text-[clamp(2.75rem,9.5vw,8.5rem)] leading-[0.86] font-bold tracking-[-0.03em] lg:text-[clamp(2.75rem,6vw,7rem)]">
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

        {/* ── portrait: die-cut figure, no box — orbiting dashed rings ───── */}
        <motion.div
          style={{ x: faceX, y: faceY }}
          className="relative mx-auto w-[min(62vw,300px)] sm:w-[min(48vw,340px)] lg:w-full lg:max-w-[430px] lg:justify-self-end"
        >
          <div className="hero-rise relative">
            {/* dashed orbit behind the head — one slow revolution */}
            <motion.div
              aria-hidden
              animate={reduce ? {} : { rotate: 360 }}
              transition={{ duration: 48, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-[5%] aspect-square w-[72%] -translate-x-1/2 rounded-full border border-dashed border-accent/35"
            />
            {/* second, quieter arc ring — counter-rotating */}
            <motion.div
              aria-hidden
              animate={reduce ? {} : { rotate: -360 }}
              transition={{ duration: 90, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-[7%] aspect-square w-[58%] -translate-x-1/2 rounded-full border border-line/50 [border-top-color:rgba(255,138,61,0.45)] [border-top-width:2px]"
            />
            <div className="float-slow relative">
              {/* halo behind the head: keeps dark hair separated from the ink bg */}
              <div
                aria-hidden
                className="absolute left-1/2 top-[4%] h-[52%] w-[52%] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(255,138,61,0.13),transparent)]"
              />
              <Image
                src="/images/reyon.png"
                alt="Portrait of Reyon Lau Jiemin smiling with arms crossed, wearing a dark batik shirt"
                width={560}
                height={880}
                priority
                sizes="(max-width: 1024px) 62vw, 430px"
                className="relative h-auto w-full [filter:sepia(0.07)_saturate(1.06)_drop-shadow(0_28px_64px_rgba(255,138,61,0.14))]"
              />
            </div>
            {/* live-status chip sitting in the fade zone below the cutout */}
            <div
              className="hero-fade absolute -bottom-1 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full border border-line bg-panel/90 px-3.5 py-1.5 font-mono text-[10px] tracking-[0.18em] text-fg/80 uppercase backdrop-blur-sm"
              style={{ animationDelay: "0.9s" }}
            >
              <span className="pulse-dot block h-1.5 w-1.5 rounded-full bg-accent" />
              open to work
            </div>
          </div>
          {/* honest little photo credit */}
          <p className="mt-3 text-center font-mono text-[10px] tracking-[0.22em] text-muted uppercase lg:text-right">
            Canon EOS R5 · 01/2026
          </p>
        </motion.div>
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
