"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { nav } from "@/data/site";
import { DUR, EASE } from "@/lib/motion";

/** Slim top bar: brand, anchors, email CTA. Shrinks once you start scrolling. */
export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

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
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <motion.span
            animate={open ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
            className="block h-px w-5 bg-fg"
          />
          <motion.span
            animate={open ? { rotate: -45, y: -2.5 } : { rotate: 0, y: 0 }}
            className="block h-px w-5 bg-fg"
          />
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
              {nav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-mono text-sm tracking-widest text-muted uppercase hover:text-accent"
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
