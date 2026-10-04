"use client";

import { useEffect, useState } from "react";

/**
 * Deterministic prefers-reduced-motion check.
 * framer-motion's useReducedMotion proved unreliable under SSR hydration with
 * late-binding media emulation; matchMedia read in the client initializer is
 * synchronous and correct for the first client render, so reduced-motion users
 * never even see the animation branch mount.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduce, setReduce] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  return reduce;
}
