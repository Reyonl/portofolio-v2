"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import MaskReveal from "@/components/MaskReveal";
import { RevealGroup, RevealItem } from "@/components/Reveal";

/**
 * Selected work: visual-first cards. The plate div carries the layoutId so
 * the card morphs into the same plate on the detail page, while the media
 * itself stays a real next/image (optimization + no layout shift).
 */
export default function Projects() {
  return (
    <section id="work" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 flex items-end justify-between gap-6">
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] font-bold tracking-tight">
            <MaskReveal>Selected</MaskReveal>
            <MaskReveal order={1}>work</MaskReveal>
          </h2>
          <p className="hidden pb-2 font-mono text-[11px] tracking-[0.25em] text-muted uppercase sm:block">
            04 shipped · 00 invented
          </p>
        </header>

        <RevealGroup className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <RevealItem as="article" key={p.slug} className={i === 0 ? "md:col-span-2" : ""}>
              <Link
                href={`/work/${p.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-300 hover:border-accent/50"
              >
                <motion.div
                  layoutId={`project-plate-${p.slug}`}
                  className={`relative overflow-hidden ${
                    i === 0 ? "aspect-[16/10] md:aspect-[2.5/1]" : "aspect-[4/3] md:aspect-[16/10]"
                  }`}
                >
                  <Image
                    src={p.image.src}
                    alt={p.image.alt}
                    fill
                    sizes={i === 0 ? "(max-width: 768px) 100vw, 56vw" : "(max-width: 768px) 100vw, 28vw"}
                    priority={i === 0}
                    loading={i === 0 ? undefined : "lazy"}
                    decoding="async"
                    className="object-cover object-top brightness-[0.85] saturate-[0.9] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-ink from-45% via-ink/80 to-transparent" />
                </motion.div>

                <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-5">
                  <span className="font-mono text-[11px] text-accent">{p.index}</span>
                  <span className="font-mono text-[10px] tracking-[0.22em] text-muted uppercase">
                    {p.category}
                  </span>
                </div>

                <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 sm:p-7">
                  <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
                    {p.blurb}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                    {p.stack.slice(0, 5).map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[10px] tracking-wider text-fg/60 uppercase"
                      >
                        {s}
                      </span>
                    ))}
                    <span className="ml-auto hidden translate-y-1 items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-accent uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex">
                      View
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden>
                        <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
