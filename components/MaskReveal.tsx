"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { DUR, EASE } from "@/lib/motion";
import { useInViewOnce } from "@/lib/useInViewOnce";

/**
 * Line-mask reveal: each line sits in an overflow-hidden shell and slides up.
 *
 * `mode="load"` (above the fold) is a pure CSS keyframe animation — the text
 * is painted and animated from the HTML itself, before the JS bundle runs, so
 * the hero never pays a hydration penalty for its first paint.
 *
 * `mode="view"` (below the fold) is driven by useInViewOnce: an
 * IntersectionObserver with a scroll/rect fallback, so content can never be
 * trapped invisible when observer delivery is throttled.
 *
 * With prefers-reduced-motion the content simply renders: no transform.
 */
export default function MaskReveal({
  children,
  as: Tag = "span",
  order = 0,
  mode = "view",
  className,
}: {
  children: ReactNode;
  as?: "span" | "h1" | "h2" | "p" | "div";
  order?: number;
  mode?: "load" | "view";
  className?: string;
}) {
  const reduce = usePrefersReducedMotion();
  const [ref, seen] = useInViewOnce("-8% 0px");

  // `load`: identical DOM on server and client (no hydration mismatch); the
  // reveal is a pure CSS keyframe, disabled by the reduced-motion guard in
  // globals.css.
  if (mode === "load") {
    return (
      <Tag className={`mask-line ${className ?? ""}`}>
        <span className="mask-line-load" style={{ animationDelay: `${0.08 * order}s` }}>
          {children}
        </span>
      </Tag>
    );
  }

  if (reduce) {
    return <Tag className={`mask-line ${className ?? ""}`}>{children}</Tag>;
  }

  return (
    <Tag className={`mask-line ${className ?? ""}`} ref={ref}>
      <motion.span
        initial={{ y: "110%" }}
        animate={seen ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: DUR.reveal, ease: EASE, delay: 0.08 * order }}
      >
        {children}
      </motion.span>
    </Tag>
  );
}
