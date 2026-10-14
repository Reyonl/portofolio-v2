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
import LiveTimeBadge from "@/components/LiveTimeBadge";
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
      {/* Background digital ambient grid and subtle glowing radars */}
      <motion.div
        aria-hidden
        style={{ x: glowX, y: glowY }}
        className="pointer-events-none absolute -top-[12%] right-[-10%] h-[64vmin] w-[64vmin] rounded-full bg-[radial-gradient(closest-side,rgba(16,185,129,0.12),transparent)]"
      />
      <motion.div
        aria-hidden
        style={{ x: dotX, y: dotY }}
        className="pointer-events-none absolute bottom-[5%] left-[-8%] h-[50vmin] w-[50vmin] rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.10),transparent)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
        {/* Left Column: Cyber-Military HUD Hero Content */}
        <div className="min-w-0">
          {/* Live System Time & Server Status */}
          <div className="hero-fade mb-5 flex flex-wrap items-center gap-3" style={{ animationDelay: "0.05s" }}>
            <LiveTimeBadge />
            <span className="font-mono text-[10px] tracking-wider text-[#10B981] bg-[#10B981]/10 border border-[#10B981]/30 px-2 py-0.5 rounded">
              [SYS: ENGAGED]
            </span>
          </div>

          {/* Military Game Style UI Badge Labels */}
          <div
            className="hero-fade mb-6 flex flex-wrap items-center gap-2 font-mono text-[10px] sm:text-[11px] tracking-wider uppercase"
            style={{ animationDelay: "0.12s" }}
          >
            <span className="inline-flex items-center gap-1.5 rounded border border-[#10B981]/50 bg-[#10B981]/10 px-2.5 py-1 text-[#10B981] font-semibold">
              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-ping" />
              [RANK: BNSP CERTIFIED WEB PROGRAMMER]
            </span>
            <span className="inline-flex items-center gap-1.5 rounded border border-[#F59E0B]/50 bg-[#F59E0B]/10 px-2.5 py-1 text-[#F59E0B] font-semibold">
              [ALUMNI: UNIVERSITAS PAMULANG]
            </span>
          </div>

          {/* Huge bold cyber-military typography with accent lines */}
          <div className="relative">
            {/* Top decorative accent lines */}
            <div className="mb-2 flex items-center gap-2" aria-hidden>
              <div className="h-1 w-12 bg-[#F59E0B]" />
              <div className="h-1 w-6 bg-[#10B981]" />
              <div className="h-[1px] flex-1 bg-line/80" />
              <span className="font-mono text-[9px] text-muted tracking-widest uppercase">ID: REYON-01</span>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,8vw,7.2rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.03em] text-[#E6EDF3]">
              <span className="block text-white">
                REYON
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] via-[#fbbf24] to-[#10B981]">
                LAU JIEMIN
              </span>
            </h1>

            {/* Bottom accent cyber line */}
            <div className="mt-3 flex items-center gap-2" aria-hidden>
              <div className="h-[2px] w-20 bg-[#10B981]" />
              <div className="h-[2px] w-8 bg-[#F59E0B]" />
              <div className="h-px flex-1 bg-line/60" />
            </div>
          </div>

          {/* Subheading */}
          <p className="mt-6 max-w-xl font-sans text-base leading-relaxed text-[#A0AEC0] sm:text-lg">
            <span className="font-bold text-[#E6EDF3]">I SHIP REAL PROJECTS FAST</span> — Laravel at home, Next.js on the way up. Built with verified audit trails, automated gates, and zero fabricated claims.
          </p>

          {/* Leveling up XP bar & telemetry metrics */}
          <div className="hero-fade mt-6 rounded-lg border border-line bg-panel2/70 p-3.5 font-mono text-xs" style={{ animationDelay: "0.3s" }}>
            <div className="flex items-center justify-between text-[11px] mb-1.5">
              <span className="text-[#F59E0B] font-semibold tracking-wider">
                [LVL 22] INFORMATICS ENGINEER
              </span>
              <span className="text-muted tracking-wider">
                XP: 8,450 / 10,000 EXP
              </span>
            </div>
            {/* XP progress bar */}
            <div className="h-2 w-full overflow-hidden rounded bg-[#090A0F] border border-line">
              <div
                className="h-full rounded bg-gradient-to-r from-[#F59E0B] to-[#10B981] transition-all duration-1000"
                style={{ width: "84.5%" }}
              />
            </div>
            <div className="mt-2.5 flex flex-wrap items-center justify-between gap-2 text-[10px] text-muted">
              <span>CLASS: <strong className="text-fg">FULLSTACK DEV</strong></span>
              <span>UPTIME: <strong className="text-[#10B981]">99.98%</strong></span>
              <span>SPECIALTY: <strong className="text-fg">LARAVEL &bull; NEXT.JS</strong></span>
              <span>STATE: <strong className="text-[#10B981]">COMBAT_READY</strong></span>
            </div>
          </div>

          {/* Tactical CTAs */}
          <div
            className="hero-fade mt-8 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "0.45s" }}
          >
            <Magnetic>
              <Link
                href="#work"
                className="group relative inline-flex min-h-[46px] items-center gap-2.5 rounded border border-[#10B981] bg-[#10B981] px-6 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-[#090A0F] transition-all hover:bg-[#10B981]/90 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
              >
                <span>🎮 SELECTED MISSIONS</span>
                <span className="text-black/80 font-mono text-[10px]">[01-04]</span>
              </Link>
            </Magnetic>

            <Link
              href="#terminal"
              className="inline-flex min-h-[46px] items-center gap-2 rounded border border-line bg-panel2/80 px-5 py-2.5 font-mono text-xs font-semibold tracking-wider text-fg uppercase transition-all hover:border-[#F59E0B] hover:text-[#F59E0B] hover:bg-panel2"
            >
              <span>⚙️ CLI PLAYGROUND</span>
              <span className="rounded bg-black/40 px-1 py-0.5 text-[9px] text-[#F59E0B]">~</span>
            </Link>

            <a
              href={profile.links.github}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex min-h-[44px] items-center gap-1.5 px-3 py-2 font-mono text-xs tracking-wider text-muted uppercase transition-colors hover:text-[#10B981]"
            >
              <span className="text-[#10B981]">➜</span>
              <span>@{profile.links.githubHandle}</span>
            </a>
          </div>
        </div>

        {/* Right Column: Tactical HUD Interface & Reyon's Portrait */}
        <motion.div
          style={{ x: faceX, y: faceY }}
          className="relative mx-auto w-full max-w-[420px] lg:justify-self-end"
        >
          {/* Tactical Frame with bracket corners and HUD telemetry */}
          <div className="hud-corner-bracket relative rounded-xl border border-line bg-[#0B0C10]/95 p-4 shadow-2xl shadow-black/80">
            {/* Top Tactical Status Header */}
            <div className="flex items-center justify-between border-b border-line/60 pb-2.5 font-mono text-[10px] tracking-wider uppercase">
              <div className="flex items-center gap-2 text-[#10B981] font-semibold">
                <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                <span>[PLAYER_AVATAR // REYON_LAU]</span>
              </div>
              <span className="text-[#F59E0B] font-mono text-[9px] border border-[#F59E0B]/30 px-1.5 py-0.2 rounded bg-[#F59E0B]/10">
                P-ID #0804
              </span>
            </div>

            {/* Health and Status Metrics on top / border */}
            <div className="mt-2 grid grid-cols-3 gap-2 font-mono text-[9px] text-muted border-b border-line/40 pb-2">
              <div>
                <span className="block text-[8px] text-muted/80">HP: 100%</span>
                <div className="h-1.5 w-full rounded-sm bg-line overflow-hidden mt-0.5">
                  <div className="h-full w-full bg-[#10B981]" />
                </div>
              </div>
              <div>
                <span className="block text-[8px] text-muted/80">SHIELD: 98%</span>
                <div className="h-1.5 w-full rounded-sm bg-line overflow-hidden mt-0.5">
                  <div className="h-full w-[98%] bg-[#06B6D4]" />
                </div>
              </div>
              <div>
                <span className="block text-[8px] text-muted/80">PING: 14ms</span>
                <div className="h-1.5 w-full rounded-sm bg-line overflow-hidden mt-0.5">
                  <div className="h-full w-full bg-[#F59E0B]" />
                </div>
              </div>
            </div>

            {/* Main Portrait Area with HUD scanner overlay */}
            <div className="relative mt-3 overflow-hidden rounded-lg border border-line/80 bg-[#07080D]">
              <div className="hud-scanner" />

              {/* Faint targeting reticle lines */}
              <div className="pointer-events-none absolute inset-0 z-10">
                <div className="absolute left-3 top-3 h-3 w-3 border-l border-t border-[#10B981]/60" />
                <div className="absolute right-3 top-3 h-3 w-3 border-r border-t border-[#10B981]/60" />
                <div className="absolute bottom-3 left-3 h-3 w-3 border-l border-b border-[#10B981]/60" />
                <div className="absolute right-3 bottom-3 h-3 w-3 border-r border-b border-[#10B981]/60" />
              </div>

              {/* Reyon Portrait */}
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/reyon.png"
                  alt="Portrait photograph of a smiling young Indonesian man (Reyon Lau Jiemin) with arms crossed wearing a dark batik shirt"
                  fill
                  priority
                  sizes="(max-width: 640px) 300px, 420px"
                  className="object-contain object-bottom drop-shadow-[0_12px_28px_rgba(0,0,0,0.8)] filter brightness-[0.98] contrast-[1.05]"
                />
              </div>

              {/* Badge Overlay */}
              <div className="absolute bottom-3 inset-x-3 z-20 flex items-center justify-between rounded bg-[#090A0F]/90 px-3 py-1.5 border border-[#10B981]/40 backdrop-blur-md font-mono text-[10px]">
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
                  <span className="font-semibold text-[#10B981] tracking-wider">[STATUS: ACTIVE // OPEN TO WORK]</span>
                </div>
                <span className="text-[#F59E0B] font-bold text-[9px]">IDN</span>
              </div>
            </div>

            {/* Camera spec info in small UI fonts */}
            <div className="mt-3 flex items-center justify-between font-mono text-[10px] tracking-wider text-muted px-1">
              <span>FOCAL: 50mm f/1.8</span>
              <span className="text-fg/70 font-medium">CANON EOS R5 • 01/2026</span>
              <span className="text-[#10B981]">RAW+JPEG</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* scroll cue */}
      <div
        className="hero-fade absolute inset-x-0 bottom-6 mx-auto w-max"
        style={{ animationDelay: "0.8s" }}
        aria-hidden
      >
        <Link
          href="#work"
          className="flex flex-col items-center gap-1 font-mono text-[9px] text-muted tracking-widest uppercase hover:text-[#10B981] transition-colors"
        >
          <span>MISSION_LOG</span>
          <div className="flex h-10 w-5 items-start justify-center rounded border border-line p-1">
            <span className="scroll-cue-dot block h-1.5 w-1 rounded-sm bg-[#10B981]" />
          </div>
        </Link>
      </div>
    </section>
  );
}
