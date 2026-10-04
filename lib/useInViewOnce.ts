"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Reveals once, exactly one element ever enters the viewport.
 * Primary path is IntersectionObserver; a passive scroll/resize listener does
 * the same rect test as a belt-and-braces fallback, because IO callbacks can
 * silently never arrive on occluded/background windows. Content must never
 * be trapped invisible waiting for an observer that won't fire.
 *
 * Returns a callback ref — `(el) => void` is assignable to Ref<T> for any
 * element T, so one hook works on span/h1/ol/article/div without variance
 * complaints.
 */
export function useInViewOnce(
  rootMargin = "-12% 0px",
): [(el: HTMLElement | null) => void, boolean] {
  const [seen, setSeen] = useState(false);
  const [attached, setAttached] = useState(false);
  const nodeRef = useRef<HTMLElement | null>(null);

  const ref = useCallback((el: HTMLElement | null) => {
    nodeRef.current = el;
    setAttached(el !== null);
  }, []);

  useEffect(() => {
    if (seen || !attached) return;
    const el = nodeRef.current;
    if (!el) return;
    const done = () => setSeen(true);

    const io =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              if (entries.some((e) => e.isIntersecting)) done();
            },
            { rootMargin },
          )
        : null;
    io?.observe(el);

    const check = () => {
      const r = el.getBoundingClientRect();
      // reveal when the element reaches the line — or has already been
      // passed (top above viewport): content the user scrolled by must never
      // sit trapped hidden below.
      if (r.top < window.innerHeight * 0.88) done();
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check, { passive: true });
    check();

    return () => {
      io?.disconnect();
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
    };
  }, [seen, attached, rootMargin]);

  return [ref, seen];
}
