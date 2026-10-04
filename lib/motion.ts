import type { Transition, Variants } from "framer-motion";

/**
 * Central motion config — one easing curve, one spring, one set of durations.
 * Every animation in the site must take its values from here so the whole
 * page feels like a single physical system.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Snappy UI spring (hover, magnetic, cursor). */
export const SPRING_UI: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
  mass: 0.6,
};

/** Softer, slightly weighty spring for larger reveals. */
export const SPRING_SOFT: Transition = {
  type: "spring",
  stiffness: 120,
  damping: 20,
  mass: 0.9,
};

/** Shared durations. Nothing slower than 1s unless it is a mask reveal. */
export const DUR = {
  fast: 0.25,
  base: 0.45,
  slow: 0.7,
  reveal: 0.9,
} as const;

/* ── Mask reveal (hero name, section headlines) ──────────────────── */
export const maskParent: Variants = {
  hidden: {},
  visible: (i: number = 0) => ({
    transition: { staggerChildren: 0.09, delayChildren: 0.1 + i * 0.05 },
  }),
};

export const maskLine: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: DUR.reveal, ease: EASE },
  },
};

/* ── Generic staggered entrance ──────────────────────────────────── */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE, delay: i * 0.08 },
  }),
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DUR.slow, ease: EASE },
  },
};

/** viewport config reused by every scroll-triggered element. */
export const VIEWPORT = { once: true, margin: "-12% 0px" } as const;
