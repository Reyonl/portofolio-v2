"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { useInViewOnce } from "@/lib/useInViewOnce";
import {
  DUR,
  EASE,
  staggerContainer,
  staggerItem,
  fadeUp,
} from "@/lib/motion";

/**
 * Scroll-triggered entrance driven by useInViewOnce (IO + rect fallback),
 * never raw whileInView — content must never be trapped invisible waiting
 * for an observer callback that can be silently withheld.
 *
 * `group` renders a staggered container; `item` a single stagger child;
 * `fade` a standalone fade-up.
 */
export function RevealGroup({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "ol" | "ul";
}) {
  const reduce = usePrefersReducedMotion();
  const [ref, seen] = useInViewOnce();
  const MotionAny = motion[as];
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} data-reveal="">
        {children}
      </Plain>
    );
  }
  return (
    <MotionAny
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={seen ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </MotionAny>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "figure";
  style?: CSSProperties;
}) {
  const reduce = usePrefersReducedMotion();
  const MotionAny = motion[as];
  if (reduce) {
    const Plain = as;
    return (
      <Plain className={className} style={style} data-reveal="">
        {children}
      </Plain>
    );
  }
  return (
    <MotionAny variants={staggerItem} className={className} style={style} data-reveal="">
      {children}
    </MotionAny>
  );
}

export function RevealFade({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = usePrefersReducedMotion();
  const [ref, seen] = useInViewOnce();
  if (reduce) {
    return (
      <div ref={ref} className={className} data-reveal="">
        {children}
      </div>
    );
  }
  return (
    <motion.div
      ref={ref}
      data-reveal=""
      initial={{ opacity: 0, y: 22 }}
      animate={seen ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: DUR.slow, ease: EASE, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// re-export for call sites that still want the raw variants
export { fadeUp };
