"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { iconMap } from "@/components/Icons";
import { levelingSkills, primarySkills, SkillDetail } from "@/data/skills";
import MaskReveal from "@/components/MaskReveal";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import { playClick } from "@/lib/sound";

/**
 * Interactive Tech Stack with Evidence Inspector:
 * - Two smooth marquee rails (Primary & Leveling)
 * - Clickable chips that reveal verified real-world evidence from Reyon's code
 */
function Rail({
  items,
  reverse,
  duration,
  selectedSkill,
  onSelectSkill,
}: {
  items: SkillDetail[];
  reverse?: boolean;
  duration: number;
  selectedSkill: SkillDetail | null;
  onSelectSkill: (s: SkillDetail) => void;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="marquee-track overflow-hidden py-2"
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
      aria-hidden
    >
      <div className={`flex w-max gap-4 ${reverse ? "marquee-right" : "marquee-left"}`}>
        {doubled.map((s, i) => {
          const Icon = iconMap[s.icon];
          const isSelected = selectedSkill?.name === s.name;

          return (
            <button
              type="button"
              key={`${s.name}-${i}`}
              onClick={() => onSelectSkill(s)}
              className={`group flex items-center gap-3 rounded-full border px-6 py-3.5 whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "border-accent bg-accent/15 text-accent shadow-[0_0_20px_rgba(255,138,61,0.2)] scale-[1.03]"
                  : "border-line bg-panel hover:border-accent/60 hover:bg-panel2"
              }`}
            >
              {Icon && (
                <Icon
                  className={`h-4 w-4 transition-colors ${
                    isSelected ? "text-accent" : "text-fg/80 group-hover:text-fg"
                  }`}
                />
              )}
              <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                {s.name}
              </span>
              <span className="ml-1 text-[10px] font-mono text-muted group-hover:text-accent">
                {isSelected ? "● active" : "inspect ↗"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  const [selectedSkill, setSelectedSkill] = useState<SkillDetail | null>(
    primarySkills[0] // defaults to Laravel
  );

  const handleSelectSkill = (s: SkillDetail) => {
    playClick(800, 0.03);
    setSelectedSkill(selectedSkill?.name === s.name ? null : s);
  };

  return (
    <section
      id="stack"
      className="relative overflow-hidden border-y border-line/60 bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] font-bold tracking-tight">
              <MaskReveal>Stack & Evidence</MaskReveal>
            </h2>
            <p className="mt-3 font-mono text-xs text-muted">
              Click any technology chip below to inspect real repository proof & implementation details.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="font-mono text-[11px] text-accent uppercase tracking-wider">
              Zero fabricated claims
            </span>
          </div>
        </div>
      </div>

      <RevealGroup className="space-y-4">
        {/* Rail 1: Primary Skills */}
        <RevealItem>
          <div className="mx-auto mb-2 flex max-w-7xl items-center gap-4 px-5 sm:px-8">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase font-semibold">
              Primary — native & at home
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <Rail
            items={primarySkills}
            duration={36}
            selectedSkill={selectedSkill}
            onSelectSkill={handleSelectSkill}
          />
        </RevealItem>

        {/* Rail 2: Leveling Skills */}
        <RevealItem>
          <div className="mx-auto mb-2 mt-8 flex max-w-7xl items-center gap-4 px-5 sm:px-8">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase font-semibold">
              Leveling up — 2026 focus
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <Rail
            items={levelingSkills}
            reverse
            duration={32}
            selectedSkill={selectedSkill}
            onSelectSkill={handleSelectSkill}
          />
        </RevealItem>
      </RevealGroup>

      {/* Interactive Evidence Inspector Box */}
      <div className="mx-auto mt-12 max-w-5xl px-5 sm:px-8">
        <AnimatePresence mode="wait">
          {selectedSkill ? (
            <motion.div
              key={selectedSkill.name}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="rounded-2xl border border-line bg-panel p-6 sm:p-8 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl sm:text-3xl font-bold text-fg">
                      {selectedSkill.name}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 font-mono text-[10px] uppercase font-bold tracking-wider border ${
                        selectedSkill.tier === "primary"
                          ? "border-accent/40 bg-accent/10 text-accent"
                          : "border-cyan-500/40 bg-cyan-500/10 text-cyan-300"
                      }`}
                    >
                      {selectedSkill.status}
                    </span>
                  </div>

                  <p className="mt-3 text-sm sm:text-base leading-relaxed text-fg/90 max-w-3xl">
                    {selectedSkill.evidence}
                  </p>
                </div>

                {selectedSkill.projectSlug && (
                  <Link
                    href={`/work/${selectedSkill.projectSlug}`}
                    className="inline-flex min-h-[44px] shrink-0 items-center gap-2 rounded-full border border-line bg-panel2 px-4 py-2 font-mono text-xs uppercase tracking-wider text-fg transition-colors hover:border-accent hover:text-accent"
                  >
                    <span>View Project</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </Link>
                )}
              </div>

              {/* Highlight tags */}
              <div className="mt-5 pt-4 border-t border-line/60 flex flex-wrap items-center gap-2">
                <span className="font-mono text-[10px] text-muted uppercase tracking-widest mr-2">
                  Key Capabilities:
                </span>
                {selectedSkill.highlightTags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-ink px-2.5 py-1 font-mono text-[11px] text-fg/80 border border-line/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ) : (
            <div className="rounded-2xl border border-dashed border-line/70 p-6 text-center text-muted font-mono text-xs">
              Click any technology chip above to inspect real code implementation details.
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* edge gradient fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-40" />
    </section>
  );
}
