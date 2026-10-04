"use client";

import { iconMap } from "@/components/Icons";
import { levelingSkills, primarySkills } from "@/data/skills";
import MaskReveal from "@/components/MaskReveal";
import { RevealGroup, RevealItem } from "@/components/Reveal";

/**
 * Tech stack as two marquee rails — no paragraphs.
 * Rail 1: primary (native Laravel/PHP). Rail 2: currently leveling up.
 */
function Rail({
  items,
  reverse,
  duration,
}: {
  items: { name: string; icon: string }[];
  reverse?: boolean;
  duration: number;
}) {
  const doubled = [...items, ...items];
  return (
    <div
      className="marquee-track overflow-hidden"
      style={{ ["--marquee-duration" as string]: `${duration}s` }}
      aria-hidden
    >
      <div className={`flex w-max gap-4 ${reverse ? "marquee-right" : "marquee-left"}`}>
        {doubled.map((s, i) => {
          const Icon = iconMap[s.icon];
          return (
            <span
              key={`${s.name}-${i}`}
              className="flex items-center gap-3 rounded-full border border-line bg-panel px-6 py-3.5 whitespace-nowrap"
            >
              {Icon && <Icon className="h-4 w-4 text-fg/80" />}
              <span className="font-display text-lg font-semibold tracking-tight sm:text-xl">
                {s.name}
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section
      id="stack"
      className="relative overflow-hidden border-y border-line/60 bg-ink py-24 sm:py-32"
    >
      <div className="mx-auto mb-14 max-w-7xl px-5 sm:px-8">
        <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.9] font-bold tracking-tight">
          <MaskReveal>Stack</MaskReveal>
        </h2>
      </div>

      <RevealGroup className="space-y-5">
        <RevealItem>
          <div className="mx-auto mb-3 flex max-w-7xl items-center gap-4 px-5 sm:px-8">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase">
              Primary — at home
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
          {/* rails are aria-hidden (decorative marquee); this list is the
              accessible source for assistive tech at every viewport */}
          <ul className="sr-only">
            {primarySkills.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
          <Rail items={primarySkills} duration={36} />
        </RevealItem>

        <RevealItem>
          <div className="mx-auto mb-3 mt-10 flex max-w-7xl items-center gap-4 px-5 sm:px-8">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[10px] tracking-[0.3em] text-muted uppercase">
              Leveling up — 2026
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>
          <ul className="sr-only">
            {levelingSkills.map((s) => (
              <li key={s.name}>{s.name}</li>
            ))}
          </ul>
          <Rail items={levelingSkills} reverse duration={32} />
        </RevealItem>
      </RevealGroup>

      {/* edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-ink to-transparent sm:w-40" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-ink to-transparent sm:w-40" />
    </section>
  );
}
