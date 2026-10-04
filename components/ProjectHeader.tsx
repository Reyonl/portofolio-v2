"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { Project } from "@/data/projects";
import { RevealFade } from "@/components/Reveal";
import { DUR, EASE } from "@/lib/motion";

/**
 * Detail-page header for a project: the plate morphs back from the card
 * (shared layoutId), text staggers under it.
 */
export default function ProjectHeader({ project }: { project: Project }) {
  return (
    <div>
      <motion.div
        layoutId={`project-plate-${project.slug}`}
        style={{ aspectRatio: `${project.image.width} / ${project.image.height}` }}
        className="relative overflow-hidden rounded-2xl border border-line bg-panel"
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
          decoding="async"
          className="object-cover object-top"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: DUR.slow, ease: EASE, delay: 0.15 }}
        className="mt-8"
      >
        <p className="font-mono text-[11px] tracking-[0.25em] text-accent uppercase">
          {project.index} · {project.category} · {project.period}
        </p>
        <h1 className="mt-3 font-display text-[clamp(2.2rem,7vw,5rem)] leading-[0.9] font-bold tracking-tight">
          {project.title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          {project.blurb}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <span
              key={s}
              className="rounded-full border border-line bg-panel px-3.5 py-1.5 font-mono text-[11px] tracking-wider text-fg/80"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          {project.repo ? (
            <a
              href={project.repo.url}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:scale-[1.02]"
            >
              {project.repo.label}
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" />
              </svg>
            </a>
          ) : null}
          {project.release && (
            <a
              href={project.release}
              target="_blank"
              rel="noreferrer noopener"
              className="font-mono text-xs tracking-[0.18em] text-muted uppercase underline-offset-4 hover:text-fg hover:underline"
            >
              Release v1.0.1
            </a>
          )}
          {project.todo && (
            <span
              data-status="todo"
              title={project.todo}
              className="rounded-full border border-dashed border-line px-4 py-2 font-mono text-[11px] text-muted"
            >
              {project.todo}
            </span>
          )}
        </div>
      </motion.div>

      {project.gallery?.map((g) => (
        <RevealFade key={g.src} className="mt-10">
          <figure className="overflow-hidden rounded-2xl border border-line bg-panel">
            <div
              className="relative"
              style={{ aspectRatio: `${g.width} / ${g.height}` }}
            >
              <Image
                src={g.src}
                alt={g.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 1024px"
                loading="lazy"
                decoding="async"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="border-t border-line bg-panel px-5 py-3 font-mono text-[11px] text-muted">
              {g.caption}
            </figcaption>
          </figure>
        </RevealFade>
      ))}
    </div>
  );
}
