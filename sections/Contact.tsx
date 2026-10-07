"use client";

import { useState } from "react";
import MaskReveal from "@/components/MaskReveal";
import Magnetic from "@/components/Magnetic";
import { RevealFade, RevealGroup, RevealItem } from "@/components/Reveal";
import { contactLinks } from "@/data/site";
import DualCvSelector from "@/components/DualCvSelector";

/**
 * Contact: headline, quick contact tiles, and interactive Dual CV Selector.
 */
export default function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("liurey55@gmail.com");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable; the mailto link still works */
    }
  };

  return (
    <section id="contact" className="relative px-5 py-28 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-7xl">
        <h2 className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.88] font-bold tracking-[-0.03em]">
          <MaskReveal>Let&apos;s build</MaskReveal>
          <MaskReveal order={1} className="text-accent">
            something real.
          </MaskReveal>
        </h2>
        <RevealFade className="mt-6 max-w-md text-muted">
          Open to junior developer roles and freelance Laravel work.
        </RevealFade>

        {/* Dual CV Selector Hub */}
        <RevealFade delay={0.1} className="mt-12">
          <DualCvSelector />
        </RevealFade>

        {/* Quick Contact Link Cards */}
        <div className="mt-14">
          <span className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
            Direct Channels
          </span>
          <RevealGroup className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {contactLinks.map((l, i) => {
              const isTodo = l.status === "todo";
              const isCV = l.label === "CV";
              const inner = (
                <>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-muted uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`mt-6 font-display text-lg font-semibold ${isTodo ? "text-muted" : ""}`}>
                    {l.label}
                  </span>
                  <span className="mt-1 block max-w-full truncate font-mono text-xs text-muted">
                    {isTodo
                      ? (l.note ?? "TODO")
                      : isCV
                      ? "Dual Version (ID / EN)"
                      : l.href.replace(/^mailto:/, "")}
                  </span>
                  {!isTodo && (
                    <svg
                      className="absolute top-5 right-5 h-4 w-4 text-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden
                    >
                      <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  )}
                </>
              );

              return (
                <RevealItem key={l.label} className="min-w-0">
                  {isTodo ? (
                    <div
                      data-status="todo"
                      className="relative flex h-full min-h-[9.5rem] flex-col justify-between rounded-2xl border border-dashed border-line bg-panel/50 p-5"
                      title={l.note}
                    >
                      {inner}
                    </div>
                  ) : (
                    <Magnetic strength={0.2} className="h-full">
                      <a
                        href={l.href}
                        target={l.href.startsWith("http") || isCV ? "_blank" : undefined}
                        rel="noreferrer noopener"
                        className="group relative flex h-full min-h-[9.5rem] min-w-[44px] flex-col justify-between rounded-2xl border border-line bg-panel p-5 transition-colors duration-300 hover:border-accent/60"
                      >
                        {inner}
                      </a>
                    </Magnetic>
                  )}
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>

        <RevealFade delay={0.15}>
          <button
            type="button"
            onClick={copyEmail}
            className="mt-10 min-h-[44px] inline-flex items-center font-mono text-xs tracking-[0.18em] text-muted uppercase transition-colors hover:text-accent focus:outline-none"
          >
            {copied ? "copied to clipboard ✓" : "copy email → liurey55@gmail.com"}
          </button>
        </RevealFade>
      </div>
    </section>
  );
}
