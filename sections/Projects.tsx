"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";
import MaskReveal from "@/components/MaskReveal";
import ProjectMicroPreview from "@/components/ProjectMicroPreview";

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
  const [hoveredSlug, setHoveredSlug] = useState<string | null>(null);
  const [previewSlug, setPreviewSlug] = useState<string | null>(null);

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
    <section id="work" className="relative px-5 py-24 sm:px-8 sm:py-32">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between border-b border-line pb-6">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#10B981] uppercase font-bold mb-2">
              <span className="h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
              <span>[SECTOR: 01 // DEPLOYED ASSETS]</span>
            </div>
            <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] font-extrabold tracking-tight text-fg uppercase">
              MISSIONS LOG <span className="text-[#10B981] font-mono text-[0.6em] tracking-normal font-normal">//</span> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F59E0B] to-[#10B981]">SELECTED WORK</span>
            </h2>
            <p className="mt-3 text-muted text-sm max-w-xl font-mono">
              Proven production systems, developer toolchains, and real-world clients with tested pipelines.
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-1.5 font-mono text-[11px] tracking-wider text-muted">
            <span className="text-[#10B981] font-semibold bg-[#10B981]/10 px-2.5 py-1 rounded border border-[#10B981]/30">
              [STATUS: 04 / 04 VERIFIED]
            </span>
            <span className="text-[10px] text-muted/80">
              {filteredProjects.length.toString().padStart(2, "0")} DISPLAYED &bull; 00 FABRICATED
            </span>
          </div>
        </header>

        {/* Tactical Stack Filter Chips with Framer Motion layoutId */}
        <div className="mb-10 flex flex-wrap items-center gap-2">
          <span className="mr-2 font-mono text-[11px] uppercase tracking-wider text-muted font-bold">
            [FILTER]:
          </span>
          {FILTERS.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative min-h-[40px] rounded px-3.5 py-1.5 font-mono text-xs tracking-wider transition-colors duration-200 focus:outline-none flex items-center justify-center ${
                  isActive
                    ? "text-[#090A0F] font-bold"
                    : "text-muted hover:text-fg bg-panel2/80 border border-line hover:border-[#10B981]/50"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeFilterPill"
                    className="absolute inset-0 rounded bg-[#10B981] shadow-[0_0_12px_rgba(16,185,129,0.4)]"
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
          className="grid gap-6 md:grid-cols-2"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p, i) => {
              const isHovered = hoveredSlug === p.slug;
              const isPreviewing = previewSlug === p.slug;
              const isFirstWide = filteredProjects.length > 1 && i === 0 && activeFilter === "All";

              return (
                <motion.article
                  layout
                  key={p.slug}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className={isFirstWide ? "md:col-span-2" : ""}
                  onMouseEnter={() => setHoveredSlug(p.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                >
                  <div className="hud-corner-bracket group relative block overflow-hidden rounded-xl border border-line bg-[#0B0C10] transition-colors duration-300 hover:border-[#10B981]/50">
                    <Link
                      href={`/work/${p.slug}`}
                      className="block focus:outline-none"
                    >
                      <motion.div
                        layoutId={`project-plate-${p.slug}`}
                        className={`relative overflow-hidden ${
                          isFirstWide
                            ? "aspect-[16/10] md:aspect-[2.5/1]"
                            : "aspect-[4/3] md:aspect-[16/10]"
                        }`}
                      >
                        {/* Base Image */}
                        <Image
                          src={p.image.src}
                          alt={p.image.alt}
                          fill
                          sizes={
                            isFirstWide
                              ? "(max-width: 768px) 100vw, 56vw"
                              : "(max-width: 768px) 100vw, 28vw"
                          }
                          priority={i === 0}
                          loading={i === 0 ? undefined : "lazy"}
                          decoding="async"
                          className="object-cover object-top brightness-[0.80] saturate-[0.85] transition-[transform,filter] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04] group-hover:brightness-100 group-hover:saturate-100"
                        />
                        <div className="absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-[#090A0F] from-40% via-[#090A0F]/85 to-transparent" />

                        {/* Interactive Micro-loop Preview Overlay */}
                        {(isHovered || isPreviewing) && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0 z-20 hidden md:block"
                          >
                            <ProjectMicroPreview
                              slug={p.slug}
                              isHovered={isHovered || isPreviewing}
                              mode="card"
                            />
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Header Overlays */}
                      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 sm:p-5 z-30">
                        <span className="font-mono text-xs text-[#F59E0B] font-bold bg-[#090A0F]/80 px-2 py-0.5 rounded border border-[#F59E0B]/30">
                          MISSION {p.index}
                        </span>
                        <div className="flex items-center gap-2">
                          {p.slug === "hermes-devops" ? (
                            <span className="font-mono text-[9px] tracking-wider text-[#10B981] font-bold bg-[#10B981]/15 border border-[#10B981]/40 px-2 py-0.5 rounded flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#10B981] animate-pulse" />
                              [EVIDENCE VERIFIED]
                            </span>
                          ) : (
                            <span className="font-mono text-[9px] tracking-wider text-[#10B981] font-bold bg-[#10B981]/15 border border-[#10B981]/40 px-2 py-0.5 rounded">
                              [STATUS: CLEARED]
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Content Bottom */}
                      <div className="relative z-30 p-5 sm:p-7">
                        <div className="flex items-start justify-between gap-4">
                          <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl text-fg uppercase">
                            MISSION {p.index} <span className="text-[#10B981] font-mono text-base">//</span> {p.title}
                          </h3>
                        </div>

                        <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#8E9CAE] font-sans">
                          {p.blurb}
                        </p>

                        <div className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-2">
                          {p.stack.slice(0, 5).map((s) => (
                            <span
                              key={s}
                              className="font-mono text-[10px] tracking-wider text-fg/80 uppercase bg-panel2/90 px-2 py-0.5 rounded border border-line"
                            >
                              {s}
                            </span>
                          ))}

                          <div className="ml-auto flex items-center gap-3">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setPreviewSlug(previewSlug === p.slug ? null : p.slug);
                              }}
                              className="md:hidden rounded border border-line bg-panel2 px-2.5 py-1 font-mono text-[10px] text-[#F59E0B] flex items-center gap-1"
                            >
                              {previewSlug === p.slug ? "Hide Preview" : "⚡ Micro Preview"}
                            </button>

                            <span className="hidden translate-y-1 items-center gap-1 font-mono text-[10px] tracking-[0.2em] text-[#10B981] uppercase opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 sm:flex font-bold">
                              OPEN MISSION DATA
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

                        {/* Mobile Micro-Preview Expandable Box */}
                        {previewSlug === p.slug && (
                          <div className="mt-4 md:hidden h-56 rounded-xl overflow-hidden border border-line">
                            <ProjectMicroPreview
                              slug={p.slug}
                              isHovered={true}
                              mode="card"
                            />
                          </div>
                        )}
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
