"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { SPRING_UI } from "@/lib/motion";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";

/**
 * Desktop-only custom cursor: a small dot that tracks the pointer exactly and
 * a lagging ring on a spring. Hovering interactive elements grows the ring.
 * Renders nothing on touch devices or when reduced motion is preferred.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { ...SPRING_UI, damping: 30 });
  const ringY = useSpring(y, { ...SPRING_UI, damping: 30 });
  const reduce = usePrefersReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      // enable on first real pointer event (setState in a subscription
      // callback, not synchronously in the effect body)
      setEnabled(true);
      document.documentElement.classList.add("has-cursor");
      const t = e.target as HTMLElement;
      setHovering(
        !!t.closest("a, button, [data-cursor='hover'], input, textarea"),
      );
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [reduce, x, y]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden>
      <motion.div
        className="absolute h-1.5 w-1.5 rounded-full bg-accent"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="absolute rounded-full border border-accent/60"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: hovering ? 44 : 26,
          height: hovering ? 44 : 26,
          opacity: hovering ? 1 : 0.7,
        }}
        transition={SPRING_UI}
      />
    </div>
  );
}

