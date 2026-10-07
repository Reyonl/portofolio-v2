"use client";

import MaskReveal from "@/components/MaskReveal";
import { RevealFade } from "@/components/Reveal";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export default function TerminalShowcase() {
  return (
    <section id="terminal" className="relative bg-ink py-20 sm:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <span className="font-mono text-[10px] tracking-[0.3em] text-accent uppercase font-bold">
              {"// Tooling & Engineering Craft"}
            </span>
            <h2 className="mt-3 font-display text-[clamp(2rem,5vw,3.8rem)] leading-[0.95] font-bold tracking-tight text-fg">
              <MaskReveal>Hermes CLI Playground</MaskReveal>
            </h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-muted">
              Interactive terminal engine running real test diagnostics, environment probes, and evidence verification from Reyon&apos;s developer-automation tooling.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-muted">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Interactive zsh session</span>
          </div>
        </div>

        <RevealFade delay={0.1}>
          <InteractiveTerminal />
        </RevealFade>
      </div>
    </section>
  );
}
