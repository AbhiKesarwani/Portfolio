import { Github, Linkedin, Mail } from "lucide-react";
import { socialLinks } from "../../data/navigation";

const iconMap = {
  LinkedIn: Linkedin,
  GitHub: Github,
  Email: Mail,
} as const;

type SocialLinksProps = {
  compact?: boolean;
};

export function SocialLinks({ compact = false }: SocialLinksProps) {
  return (
    <div className={compact ? "social-links compact" : "social-links"} aria-label="Social links">
      {socialLinks.map((link) => {
        const Icon = iconMap[link.label];
        return (
          <a
            key={link.label}
            href={link.href}
            target={link.label === "Email" ? undefined : "_blank"}
            rel={link.label === "Email" ? undefined : "noreferrer"}
            className="social-link"
            aria-label={link.label}
          >
            <Icon size={16} aria-hidden="true" />
            <span>{link.label}</span>
          </a>
        );
      })}
    </div>
  );
}
