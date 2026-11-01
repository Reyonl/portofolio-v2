"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import MaskReveal from "@/components/MaskReveal";

const FILTERS = [
  "All",
  "Laravel",
  "Next.js / React",
  "TypeScript",
  "MySQL",
  "Flutter",
] as const;

type FilterType = (typeof FILTERS)[number];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("All");
  const [activeSlideBySlug, setActiveSlideBySlug] = useState<Record<string, number>>({});

  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Laravel") {
      return p.stack.some((s) => s.toLowerCase().includes("laravel"));
    }
    if (activeFilter === "Next.js / React") {
      return p.stack.some(
        (s) =>
          s.toLowerCase().includes("react") || s.toLowerCase().includes("next")
      );
    }
    if (activeFilter === "TypeScript") {
      return p.stack.some((s) => s.toLowerCase().includes("typescript"));
    }
    if (activeFilter === "MySQL") {
      return p.stack.some((s) => s.toLowerCase().includes("mysql"));
    }
    if (activeFilter === "Flutter") {
      return p.stack.some((s) => s.toLowerCase().includes("flutter"));
    }
    return true;
  });

  return (
    <section id="work" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] font-bold tracking-tight">
              <MaskReveal>Selected</MaskReveal>
              <MaskReveal order={1}>work</MaskReveal>
            </h2>
            <p className="mt-3 text-muted text-sm max-w-md">
              Real shipped products and developer tools with tested pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-mono text-[11px] tracking-[0.25em] text-muted uppercase">
              {filteredProjects.length.toString().padStart(2, "0")} shown · 00 invented
            </span>
          </div>
        </header>

        {/* Stack Filter Chips with Framer Motion layoutId */}
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-line pb-6">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-muted">
            Filter:
          </span>
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative min-h-[44px] rounded-full px-4 py-2 font-mono text-xs tracking-wider transition-colors duration-200 focus:outline-none flex items-center justify-center ${
                  isActive
                    ? "text-ink font-semibold"
                    : "text-muted hover:text-fg bg-panel border border-line"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded-full bg-accent"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{filter}</span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid with layout transitions */}
        <motion.div
          layout
          className="grid gap-8 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => {
              const isFirstWide =
                filteredProjects.length > 1 && i === 0 && activeFilter === "All";
              const slides = [
                { src: p.image.src, alt: p.image.alt, label: "Primary View" },
                ...(p.gallery?.map((g, idx) => ({
                  src: g.src,
                  alt: g.alt,
                  label: g.caption.split("—")[0]?.trim() || `View ${idx + 2}`,
                })) ?? []),
              ];
              const currentSlideIdx = Math.min(
                activeSlideBySlug[p.slug] ?? 0,
                slides.length - 1
              );
              const activeSlide = slides[currentSlideIdx];

              return (
                <motion.article
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={isFirstWide ? "md:col-span-2" : ""}
                >
                  <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-300 hover:border-accent/50 shadow-xl shadow-black/40">
                    {/* Top Browser / Window Bar */}
                    <div className="flex items-center justify-between border-b border-line bg-[#0b0e14] px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80" />
                        <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80" />
                        <span className="ml-2 font-mono text-[11px] font-semibold text-accent">
                          {p.index}
                        </span>
                        <span className="font-mono text-[10px] text-muted hidden sm:inline">
                          · {p.liveUrl ? p.liveUrl.label : p.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {slides.length > 1 && (
                          <div className="flex items-center gap-1 rounded-full border border-line bg-panel2 px-1.5 py-0.5">
                            {slides.map((s, sIdx) => (
                              <button
                                key={s.src}
                                type="button"
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  setActiveSlideBySlug((prev) => ({
                                    ...prev,
                                    [p.slug]: sIdx,
                                  }));
                                }}
                                title={s.label}
                                className={`rounded-full px-2 py-0.5 font-mono text-[9px] transition-colors ${
                                  currentSlideIdx === sIdx
                                    ? "bg-accent text-ink font-bold"
                                    : "text-muted hover:text-fg"
                                }`}
                              >
                                {sIdx + 1}
                              </button>
                            ))}
                          </div>
                        )}
                        <span className="font-mono text-[10px] tracking-[0.18em] text-muted uppercase">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <Link
                      href={`/work/${p.slug}`}
                      className="flex flex-1 flex-col focus:outline-none"
                    >
                      {/* Authentic High-Res Screenshot Preview Plate */}
                      <motion.div
                        layoutId={`project-plate-${p.slug}`}
                        className={`relative w-full overflow-hidden border-b border-line bg-[#090c12] ${
                          isFirstWide
                            ? "aspect-[16/9] md:aspect-[2.1/1]"
                            : "aspect-[16/10]"
                        }`}
                      >
                        <Image
                          key={activeSlide.src}
                          src={activeSlide.src}
                          alt={activeSlide.alt}
                          fill
                          unoptimized
                          sizes={
                            isFirstWide
                              ? "(max-width: 768px) 100vw, 1280px"
                              : "(max-width: 768px) 100vw, 640px"
                          }
                          priority={i === 0}
                          loading={i === 0 ? undefined : "lazy"}
                          decoding="async"
                          className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.02]"
                        />
                      </motion.div>

                      {/* Card Content Footer */}
                      <div className="relative z-10 flex flex-1 flex-col justify-between p-5 sm:p-7">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-fg group-hover:text-accent transition-colors">
                              {p.title}
                            </h3>
                            <span className="font-mono text-[10px] tracking-wider text-muted uppercase">
                              {p.period}
                            </span>
                          </div>

                          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-muted">
                            {p.blurb}
                          </p>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-2 pt-2">
                          {p.stack.slice(0, 5).map((s) => (
                            <span
                              key={s}
                              className="font-mono text-[10px] tracking-wider text-fg/80 uppercase bg-panel2 px-2.5 py-1 rounded border border-line/80"
                            >
                              {s}
                            </span>
                          ))}

                          <div className="ml-auto flex items-center gap-3">
                            <span className="inline-flex items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-accent uppercase transition-transform duration-300 group-hover:translate-x-0.5">
                              View case study
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                              >
                                <path
                                  d="M7 17 17 7M9 7h8v8"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                />
                              </svg>
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
