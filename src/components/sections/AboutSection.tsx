import { BriefcaseBusiness, Github, GraduationCap, Linkedin, Mail, MapPin } from "lucide-react";
import { socialLinks } from "../../data/navigation";

export function AboutSection() {
  return (
    <section id="about" className="about-section" aria-label="About section">
      <img src="/photo/backgrounds/about-network.png" alt="" className="about-network-bg" />
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">About</p>
        <h2>Turning Ideas into Intelligent Solutions</h2>
      </div>

      <div className="about-grid">
        <article className="card-foundation card-standard reveal-on-scroll about-intro-card about-intro-layout">
          <img src="/photo/profile/abhinav-about.png" alt="Abhinav Kesarwani" className="about-profile-image" />
          <p>
            I am an AI &amp; Data Science undergraduate at Gati Shakti Vishwavidyalaya focused on
            AI, Generative AI, LLMs, RAG, and building intelligent software systems.
          </p>
        </article>

        <article className="card-foundation card-standard reveal-on-scroll about-info-card">
          <ul className="about-info-list">
            <li>
              <MapPin size={16} aria-hidden="true" />
              <span>
                <strong>Location</strong>
                <em>Vadodara, Gujarat, India</em>
              </span>
            </li>
            <li>
              <GraduationCap size={16} aria-hidden="true" />
              <span>
                <strong>Education</strong>
                <em>B.Tech — AI &amp; Data Science</em>
              </span>
            </li>
            <li>
              <BriefcaseBusiness size={16} aria-hidden="true" />
              <span>
                <strong>Current Role</strong>
                <em>Technical Intern — Siemens</em>
              </span>
            </li>
          </ul>

          <div className="about-socials" aria-label="About social links">
            {socialLinks.map((link) => {
              const Icon =
                link.label === "LinkedIn" ? Linkedin : link.label === "GitHub" ? Github : Mail;

              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "Email" ? undefined : "_blank"}
                  rel={link.label === "Email" ? undefined : "noreferrer"}
                  className="about-social-link"
                  aria-label={link.label}
                >
                  <Icon size={14} aria-hidden="true" />
                  <span>{link.label}</span>
                </a>
              );
            })}
          </div>
        </article>
      </div>
    </section>
  );
}
