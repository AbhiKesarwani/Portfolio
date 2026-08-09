import { Download, Github, Linkedin, Mail, Sparkles } from "lucide-react";
import { socialLinks } from "../../data/navigation";
import { PrimaryLinkButton, SecondaryLinkButton } from "../ui/Button";

type HomeHeroProps = {
  resumeHref: string | null;
};

const heroAssetPath = "/photo/profile/abhinav-hero.png";

const metricItems = [
  { value: "8.90/10", label: "CGPA" },
  { value: "2+", label: "Internships" },
  { value: "5+", label: "Major Projects" },
  { value: "1", label: "Research Paper" },
  { value: "3+", label: "Achievements" },
];

export function HomeHero({ resumeHref }: HomeHeroProps) {
  return (
    <section id="home" className="home-hero" aria-label="Home hero">
      <div className="hero-left">
        <p className="hero-kicker">Hello, I&apos;m</p>
        <h1 className="hero-name">
          <span>Abhinav</span>
          <span className="accent">Kesarwani</span>
        </h1>

        <p className="hero-role">AI Engineer | LLM &amp; RAG Developer | Software Engineer</p>

        <p className="hero-intro">
          I build practical AI systems focused on Generative AI, LLM workflows, and RAG-powered
          applications that deliver reliable, intelligent software experiences.
        </p>

        <div className="hero-actions">
          <PrimaryLinkButton href="#projects" ariaLabel="Explore my work">
            Explore My Work
          </PrimaryLinkButton>
          <SecondaryLinkButton href={resumeHref ?? "/resume/Abhinav4th_year.pdf"} target="_blank" rel="noreferrer" ariaLabel="Download resume">
            Download Resume <Download size={16} aria-hidden="true" />
          </SecondaryLinkButton>
        </div>

        <div className="hero-socials" aria-label="Hero social links">
          {socialLinks.map((link) => {
            const Icon =
              link.label === "LinkedIn" ? Linkedin : link.label === "GitHub" ? Github : Mail;
            return (
              <a
                key={link.label}
                href={link.href}
                target={link.label === "Email" ? undefined : "_blank"}
                rel={link.label === "Email" ? undefined : "noreferrer"}
                className="hero-social-link"
                aria-label={link.label}
              >
                <Icon size={15} aria-hidden="true" />
                <span>{link.label}</span>
              </a>
            );
          })}
        </div>

        <div className="hero-metrics" aria-label="Key profile metrics">
          {metricItems.map((item) => (
            <article key={item.label} className="hero-metric-card card-foundation card-small">
              <p className="metric-value">{item.value}</p>
              <p className="metric-label">{item.label}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="hero-right" aria-hidden="true">
        <img src="/photo/decorative/ai-orbit.png" alt="" className="hero-orbit-asset" />
        <div className="hero-orbit" />
        <div className="hero-code hero-code-top">
          <Sparkles size={13} /> LLM_PIPELINE[OPTIMIZED]
        </div>
        <div className="hero-code hero-code-bottom">RAG_RETRIEVAL score: 0.92</div>
        <img src="/photo/decorative/code-card.png" alt="" className="hero-code-card" />
        <div className="hero-character-frame">
          <img
            src={heroAssetPath}
            alt="Portrait of Abhinav Kesarwani"
            className="hero-character"
          />
        </div>
      </div>
    </section>
  );
}
