import { useEffect } from "react";

/**
 * Global, reusable cursor-illumination mechanism.
 *
 * Attaches a single delegated `mousemove` listener to the document and, on
 * each frame, finds the nearest ancestor of the hovered element matching
 * `GLOW_SELECTOR`. It writes the pointer position as `--mouse-x`/`--mouse-y`
 * (percentages relative to that element) so CSS radial-gradients and masked
 * borders can track the cursor without any per-component wiring.
 *
 * No-ops entirely for touch devices and when the user prefers reduced motion.
 */
const GLOW_SELECTOR = [
  ".card-foundation",
  ".btn",
  ".contact-link",
  ".home-hero",
  ".about-section",
  ".experience-section",
  ".projects-section",
  ".research-section",
  ".skills-section",
  ".achievements-section",
  ".leadership-section",
  ".certifications-section",
  ".contact-section",
].join(", ");

export function useCursorGlow() {
  useEffect(() => {
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
        const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(GLOW_SELECTOR);
        if (!target) {
          return;
        }
        const rect = target.getBoundingClientRect();
        if (rect.width === 0 || rect.height === 0) {
          return;
        }
        const x = ((event.clientX - rect.left) / rect.width) * 100;
        const y = ((event.clientY - rect.top) / rect.height) * 100;
        target.style.setProperty("--mouse-x", `${x.toFixed(2)}%`);
        target.style.setProperty("--mouse-y", `${y.toFixed(2)}%`);
      });
    };

    document.addEventListener("mousemove", onMouseMove, { passive: true });

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      if (frame) {
        cancelAnimationFrame(frame);
      }
    };
  }, []);
}
