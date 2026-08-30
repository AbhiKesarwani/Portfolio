import { Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { socialLinks } from "../../data/navigation";

const iconMap = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Email: Mail,
} as const;

const accentByLabel: Record<string, string> = {
  LinkedIn: "sky",
  GitHub: "violet",
  Email: "emerald",
};

function useMagneticIcon<T extends HTMLElement>() {
  const badgeRef = useRef<HTMLSpanElement | null>(null);
  const glyphRef = useRef<T | null>(null);

  useEffect(() => {
    const badge = badgeRef.current;
    const glyph = glyphRef.current;
    if (!badge || !glyph) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (prefersReducedMotion || isCoarsePointer) {
      return;
    }

    const onMouseMove = (event: MouseEvent) => {
      const rect = badge.getBoundingClientRect();
      const relX = (event.clientX - rect.left) / rect.width - 0.5;
      const relY = (event.clientY - rect.top) / rect.height - 0.5;
      glyph.style.transform = `translate(${(relX * 8).toFixed(1)}px, ${(relY * 8).toFixed(1)}px)`;
      badge.style.setProperty("--dock-rx", `${(-relY * 2).toFixed(2)}deg`);
      badge.style.setProperty("--dock-ry", `${(relX * 2).toFixed(2)}deg`);
    };

    const onMouseLeave = () => {
      glyph.style.transform = "translate(0, 0)";
      badge.style.setProperty("--dock-rx", "0deg");
      badge.style.setProperty("--dock-ry", "0deg");
    };

    badge.addEventListener("mousemove", onMouseMove);
    badge.addEventListener("mouseleave", onMouseLeave);

    return () => {
      badge.removeEventListener("mousemove", onMouseMove);
      badge.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return { badgeRef, glyphRef };
}

function ContactDockLink({ label, href }: { label: "LinkedIn" | "GitHub" | "Email"; href: string }) {
  const Icon = iconMap[label];
  const { badgeRef, glyphRef } = useMagneticIcon<HTMLSpanElement>();

  return (
    <a
      href={href}
      target={label === "Email" ? undefined : "_blank"}
      rel={label === "Email" ? undefined : "noreferrer"}
      className="contact-dock-link"
      aria-label={label}
    >
      <span className="contact-dock-icon" data-accent={accentByLabel[label]} ref={badgeRef}>
        <span className="contact-dock-icon-glyph" ref={glyphRef}>
          <Icon size={17} aria-hidden="true" />
        </span>
      </span>
      <span className="contact-dock-label" role="tooltip">
        {label}
      </span>
    </a>
  );
}

export function ContactDock() {
  return (
    <div className="contact-dock" aria-label="Quick social contact links">
      {socialLinks.map((link) => (
        <ContactDockLink key={link.label} label={link.label} href={link.href} />
      ))}
    </div>
  );
}

