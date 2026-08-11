import { useEffect, useState } from "react";

export type TypewriterOptions = {
  phrases: string[];
  typingSpeedMs?: number;
  deletingSpeedMs?: number;
  pauseAfterPhraseMs?: number;
  pauseBeforeNextMs?: number;
};

/**
 * Cycles through a list of phrases with a type/pause/delete/pause rhythm.
 * Respects prefers-reduced-motion: when reduced motion is preferred, the
 * hook immediately returns the first phrase fully typed with no animation.
 */
export function useTypewriter({
  phrases,
  typingSpeedMs = 85,
  deletingSpeedMs = 45,
  pauseAfterPhraseMs = 1500,
  pauseBeforeNextMs = 320,
}: TypewriterOptions) {
  const prefersReducedMotion =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const [text, setText] = useState(prefersReducedMotion ? phrases[0] ?? "" : "");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting" | "waiting">("typing");

  useEffect(() => {
    if (prefersReducedMotion || phrases.length === 0) {
      return;
    }

    const currentPhrase = phrases[phraseIndex % phrases.length];
    let timeoutId: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (text.length < currentPhrase.length) {
        timeoutId = setTimeout(() => setText(currentPhrase.slice(0, text.length + 1)), typingSpeedMs);
      } else {
        timeoutId = setTimeout(() => setPhase("pausing"), pauseAfterPhraseMs);
      }
    } else if (phase === "pausing") {
      timeoutId = setTimeout(() => setPhase("deleting"), 0);
    } else if (phase === "deleting") {
      if (text.length > 0) {
        timeoutId = setTimeout(() => setText(text.slice(0, -1)), deletingSpeedMs);
      } else {
        timeoutId = setTimeout(() => setPhase("waiting"), pauseBeforeNextMs);
      }
    } else if (phase === "waiting") {
      setPhraseIndex((index) => (index + 1) % phrases.length);
      setPhase("typing");
    }

    return () => clearTimeout(timeoutId);
  }, [
    text,
    phase,
    phraseIndex,
    phrases,
    typingSpeedMs,
    deletingSpeedMs,
    pauseAfterPhraseMs,
    pauseBeforeNextMs,
    prefersReducedMotion,
  ]);

  return { text, isDeleting: phase === "deleting", prefersReducedMotion };
}
