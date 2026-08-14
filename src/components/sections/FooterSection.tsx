import { Github, Linkedin, Mail } from "lucide-react";

export function FooterSection() {
  return (
    <footer className="site-footer reveal-on-scroll" aria-label="Site footer">
      <div className="footer-left">
        <p className="footer-brand">AK / Abhinav Kesarwani</p>
        <p className="footer-role">AI Engineer • Machine Learning • Deep Learning • Generative AI • LLMs • RAG</p>
      </div>

      <div className="footer-right">
        <div className="footer-links" aria-label="Footer social links">
          <a href="https://www.linkedin.com/in/abhinav-kesarwani/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="footer-link">
            <Linkedin size={14} aria-hidden="true" /> LinkedIn
          </a>
          <a href="https://github.com/AbhiKesarwani/" target="_blank" rel="noreferrer" aria-label="GitHub" className="footer-link">
            <Github size={14} aria-hidden="true" /> GitHub
          </a>
          <a href="mailto:abhinavkesarwani38@gmail.com" aria-label="Email" className="footer-link">
            <Mail size={14} aria-hidden="true" /> Email
          </a>
        </div>

        <p className="footer-copy">© 2026 Abhinav Kesarwani</p>
      </div>
    </footer>
  );
}
