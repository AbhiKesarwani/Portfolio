export function FooterSection() {
  return (
    <footer className="site-footer reveal-on-scroll" aria-label="Site footer">
      <div className="footer-shell">
        <div className="footer-top">
          <div className="footer-brand-cluster">
            <p className="footer-brand">Abhinav Kesarwani</p>
            <p className="footer-role">AI Engineer • Machine Learning • Deep Learning • LLMs • RAG</p>
          </div>

          <div className="footer-centerpiece">
            <div className="footer-emblem" aria-hidden="true">
              <img src="/brand/ak-monogram.svg" alt="" className="footer-emblem-mark" />
            </div>
          </div>

          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="#home">Home</a>
            <a href="#about">About</a>
            <a href="#experience">Experience</a>
            <a href="#projects">Projects</a>
            <a href="#research">Research</a>
            <a href="#achievements">Achievements</a>
          </nav>
        </div>

        <div className="footer-meta">
          <p className="footer-status">Available for opportunities</p>
          <p className="footer-copy">© 2026 Abhinav Kesarwani. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
