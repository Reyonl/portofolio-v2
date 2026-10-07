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
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 sm:px-8 ${
          scrolled
            ? "border-b border-line/60 bg-ink/80 py-3 backdrop-blur-md"
            : "py-5"
        }`}
      >
        <Link
          href="#top"
          className="font-mono text-xs tracking-[0.2em] text-fg uppercase"
        >
          reyon<span className="text-accent">.</span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group relative font-mono text-[11px] tracking-[0.15em] text-muted uppercase transition-colors hover:text-fg"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}

          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
            className="flex items-center gap-1.5 rounded-full border border-line bg-panel/70 px-3 py-1 font-mono text-[10px] text-muted tracking-wider hover:border-accent hover:text-fg transition-colors"
            title="Open Command Palette (Cmd + K)"
          >
            <span>Search</span>
            <kbd className="rounded bg-panel2 px-1 py-0.2 border border-line text-[9px] text-accent">⌘K</kbd>
          </button>

          <button
            type="button"
            onClick={() => {
              toggleSound();
              window.dispatchEvent(new CustomEvent("sfx-toggle"));
            }}
            className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] tracking-wider transition-colors ${
              soundOn
                ? "border-accent/80 bg-accent/15 text-accent shadow-[0_0_10px_rgba(255,138,61,0.2)]"
                : "border-line bg-panel/70 text-muted hover:border-accent hover:text-fg"
            }`}
            title="Toggle tactile sound effects"
          >
            <span>{soundOn ? "SFX: ON" : "SFX: OFF"}</span>
          </button>

          <a
            href="mailto:liurey55@gmail.com"
            className="rounded-full border border-line px-4 py-1.5 font-mono text-[11px] tracking-[0.12em] text-fg uppercase transition-colors hover:border-accent hover:text-accent"
          >
            Hire
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
                    className="block min-h-[44px] py-2.5 font-mono text-sm tracking-widest text-muted uppercase hover:text-accent flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
