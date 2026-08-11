import { useEffect, useRef } from "react";

/**
 * Attaches a subtle mouse-follow parallax effect to the returned element ref.
 * Sets CSS custom properties (--tilt-x, --tilt-y) in the range [-1, 1] based
 * on cursor position relative to the element's center. No-ops for touch
 * devices and when the user prefers reduced motion.
 */
export function useMouseParallax<T extends HTMLElement>() {
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
        const rect = node.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        node.style.setProperty("--tilt-x", (x * 2).toFixed(3));
        node.style.setProperty("--tilt-y", (y * 2).toFixed(3));
      });
    };

    const onMouseLeave = () => {
      node.style.setProperty("--tilt-x", "0");
      node.style.setProperty("--tilt-y", "0");
    };

    node.addEventListener("mousemove", onMouseMove);
    node.addEventListener("mouseleave", onMouseLeave);

    return () => {
      node.removeEventListener("mousemove", onMouseMove);
      node.removeEventListener("mouseleave", onMouseLeave);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);

  return ref;
}
