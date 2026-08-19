import { useEffect } from "react";

const SECTION_REVEAL_SELECTOR =
  ".home-hero, .about-section, .experience-section, .projects-section, .research-section, .skills-section, .achievements-section, .leadership-section, .certifications-section, .contact-section, .site-footer";

export function useScrollReveal(selector = SECTION_REVEAL_SELECTOR) {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(selector));
    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [selector]);
}
