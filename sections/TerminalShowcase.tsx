"use client";

import { useEffect } from "react";
import { RevealFade } from "@/components/Reveal";
import InteractiveTerminal from "@/components/InteractiveTerminal";

export default function TerminalShowcase() {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "~" || e.key === "`") {
        const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
        if (tag === "input" || tag === "textarea") return;
        e.preventDefault();
        const el = document.getElementById("terminal");
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          const terminalInput = el.querySelector("input");
          if (terminalInput) {
            terminalInput.focus();
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section id="terminal" className="relative bg-[#090A0F] py-20 sm:py-28 overflow-hidden border-t border-line">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] text-[#F59E0B] uppercase font-bold mb-2">
              <span className="h-2 w-2 rounded-full bg-[#F59E0B] animate-pulse" />
              <span>[CONSOLE: DEV_STATION // LIVE SIMULATOR]</span>
            </div>
            <h2 className="mt-2 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.95] font-extrabold tracking-tight text-fg uppercase">
              💻 HERMES CLI PLAYGROUND <span className="text-[#10B981] font-mono text-sm sm:text-base font-normal tracking-wider block sm:inline">[Press ~ to toggle]</span>
            </h2>
            <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-[#8E9CAE] font-mono">
              Interactive terminal engine running real test diagnostics, environment probes, and evidence verification from Reyon&apos;s developer-automation tooling.
            </p>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-muted bg-panel2/80 px-3.5 py-2 rounded border border-line">
            <span className="flex h-2.5 w-2.5 rounded-full bg-[#10B981] animate-pulse" />
            <span className="text-[#10B981] font-semibold">➜ ~ hermes doctor</span>
            <span className="text-[10px] text-muted border-l border-line/70 pl-2">ZSH v5.9</span>
          </div>
        </div>

        <RevealFade delay={0.1}>
          <div className="hud-corner-bracket">
            <InteractiveTerminal />
          </div>
        </RevealFade>
      </div>
    </section>
  );
}
