import { ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";

const contactLinks = [
  {
    label: "Email",
    href: "mailto:abhinavkesarwani38@gmail.com",
    value: "abhinavkesarwani38@gmail.com",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/abhinav-kesarwani/",
    value: "linkedin.com/in/abhinav-kesarwani",
    icon: Linkedin,
  },
  {
    label: "GitHub",
    href: "https://github.com/AbhiKesarwani/",
    value: "github.com/AbhiKesarwani",
    icon: Github,
  },
] as const;

export function ContactSection() {
  return (
    <section id="contact" className="contact-section" aria-label="Contact section">
      <div className="contact-shell card-foundation card-featured reveal-on-scroll">
        <div className="contact-copy">
          <p className="section-kicker">Contact</p>
          <h2>
            Have an interesting problem?
            <br />
            Let&apos;s build something intelligent.
          </h2>

          <a href="mailto:abhinavkesarwani38@gmail.com" className="btn btn-primary contact-cta" aria-label="Let's Connect via email">
            Let&apos;s Connect <ArrowUpRight size={16} aria-hidden="true" />
          </a>

          <div className="contact-links" aria-label="Direct contact links">
            {contactLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a key={item.label} href={item.href} target={item.label === "Email" ? undefined : "_blank"} rel={item.label === "Email" ? undefined : "noreferrer"} className="contact-link" aria-label={item.label}>
                  <span className="contact-link-icon" aria-hidden="true">
                    <Icon size={14} />
                  </span>
                  <span>
                    <strong>{item.label}</strong>
                    <em>{item.value}</em>
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        <div className="contact-visual">
          <img src="/photo/profile/abhinav-workstation.png" alt="Abhinav workstation environment" className="contact-image" loading="lazy" />
          <div className="contact-visual-glow" />
        </div>
      </div>
    </section>
  );
}
