import { useEffect, useRef } from "react";

/**
 * Sets --page-tilt-x/--page-tilt-y CSS custom properties (range [-1, 1]) on
 * the returned element ref, tracking cursor position across the whole
 * viewport. Used to drive subtle background parallax depth layers.
 * No-ops for touch devices and when reduced motion is preferred.
 */
export function usePageParallax<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    let frame = 0;

    const onMouseMove = (event: MouseEvent) => {
      if (frame) {
        return;
      }
      frame = requestAnimationFrame(() => {
        frame = 0;
        const x = event.clientX / window.innerWidth - 0.5;
        const y = event.clientY / window.innerHeight - 0.5;
        node.style.setProperty("--page-tilt-x", (x * 2).toFixed(3));
        node.style.setProperty("--page-tilt-y", (y * 2).toFixed(3));
      });
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return ref;
}
