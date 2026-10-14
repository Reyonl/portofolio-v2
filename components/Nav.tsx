"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { nav } from "@/data/site";
import { DUR, EASE } from "@/lib/motion";
import { isSoundEnabled, toggleSound } from "@/lib/sound";

const sfxSub = (cb: () => void) => {
  const handler = () => cb();
  window.addEventListener("storage", handler);
  window.addEventListener("sfx-toggle", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("sfx-toggle", handler);
  };
};

/** Slim top bar: brand, anchors, email CTA. Shrinks once you start scrolling. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  const soundOn = useSyncExternalStore(sfxSub, isSoundEnabled, () => false);

  useEffect(
    () => scrollY.on("change", (v) => setScrolled(v > 40)),
    [scrollY],
  );

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: DUR.slow, ease: EASE, delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      {/* Top indicator banner */}
      <div className="border-b border-line/60 bg-[#07090E]/90 backdrop-blur-md px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-muted">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-2 sm:px-8">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[#10B981] shadow-[0_0_8px_#10B981] animate-pulse" />
            <span className="text-[#10B981] font-semibold">ONLINE [SERVER: JKT-WIB]</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-2 text-fg/80">
            <span>•</span>
            <span>MATCHMAKING: <span className="text-[#F59E0B] font-semibold">OPEN FOR FULL-TIME / FREELANCE</span></span>
          </div>
          <div className="text-muted tracking-wider">
            <span className="hidden sm:inline mr-2">•</span>
            <span className="text-fg/70 font-medium">LVL 22 / INFORMATICS ENG</span>
          </div>
        </div>
      </div>

      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "border-b border-line/70 bg-[#090A0F]/90 py-2.5 backdrop-blur-md"
            : "py-4"
        }`}
      >
        <Link
          href="#top"
          className="font-mono text-xs tracking-[0.22em] text-fg uppercase flex items-center gap-1.5"
        >
          <span className="text-[#10B981] font-bold">⌁</span>
          <span>reyon<span className="text-[#F59E0B]">.</span></span>
          <span className="hidden sm:inline text-[9px] text-muted/60 tracking-widest font-normal">[HUD_V2]</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-mono text-[11px] tracking-[0.15em] text-muted uppercase transition-colors hover:text-[#10B981]"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-[#10B981] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="flex items-center gap-1.5 rounded border border-line bg-panel2/80 px-2.5 py-1 font-mono text-[10px] text-muted tracking-wider hover:border-[#10B981] hover:text-fg transition-colors"
            title="Open Command Palette (Cmd + K)"
          >
            <span>Search</span>
            <kbd className="rounded bg-panel px-1 py-0.2 border border-line text-[9px] text-[#F59E0B]">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={() => {
              toggleSound();
              window.dispatchEvent(new CustomEvent("sfx-toggle"));
            }}
            className={`flex items-center gap-1.5 rounded border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-colors ${
              soundOn
                ? "border-[#F59E0B]/80 bg-[#F59E0B]/15 text-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.2)]"
                : "border-line bg-panel2/80 text-muted hover:border-[#F59E0B] hover:text-fg"
            }`}
            title="Toggle tactile sound effects"
          >
            <span>{soundOn ? "SFX: ON" : "SFX: OFF"}</span>
          </button>

          <a
            href="mailto:liurey55@gmail.com"
            className="rounded border border-[#F59E0B]/80 bg-[#F59E0B]/15 px-3.5 py-1.5 font-mono text-[11px] tracking-[0.15em] text-[#F59E0B] font-bold uppercase transition-all duration-200 hover:bg-[#F59E0B] hover:text-[#090A0F] hover:shadow-[0_0_15px_rgba(245,158,11,0.35)]"
          >
            HIRE [READY]
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
          className="flex h-11 w-11 items-center justify-center p-2.5 md:hidden"
        >
          <div className="flex flex-col items-center justify-center gap-1.5">
            <motion.span
              animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-fg"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
              className="block h-px w-5 bg-fg"
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DUR.base, ease: EASE }}
            className="overflow-hidden border-b border-line bg-ink/95 backdrop-blur-md md:hidden"
          >
            <ul className="flex flex-col gap-1 px-5 py-4">
              <li>
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    window.dispatchEvent(new CustomEvent("open-command-palette"));
                  }}
                  className="flex w-full items-center justify-between rounded-lg bg-panel2/80 px-3 py-3 font-mono text-sm tracking-wider text-accent uppercase"
                >
                  <span>Quick Search & Jump</span>
                  <span className="rounded bg-ink px-2 py-0.5 text-xs text-muted">⌘K</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => {
                    toggleSound();
                    window.dispatchEvent(new CustomEvent("sfx-toggle"));
                  }}
                  className="flex w-full items-center justify-between rounded-lg bg-panel px-3 py-2.5 font-mono text-xs tracking-wider text-fg uppercase border border-line"
                >
                  <span>Sound Effects</span>
                  <span className="text-accent font-bold">{soundOn ? "ON" : "OFF"}</span>
                </button>
              </li>
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block min-h-[44px] py-2.5 font-mono text-sm tracking-widest text-muted uppercase hover:text-[#10B981] flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <a
                  href="mailto:liurey55@gmail.com"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded border border-[#F59E0B]/80 bg-[#F59E0B]/15 py-3 font-mono text-sm tracking-widest text-[#F59E0B] font-bold uppercase transition-colors hover:bg-[#F59E0B] hover:text-[#090A0F]"
                >
                  HIRE [READY]
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
