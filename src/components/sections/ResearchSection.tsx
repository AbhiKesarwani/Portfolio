import { BadgeCheck, BookOpenText, Network } from "lucide-react";

const researchData = {
  title: "Accident Analysis and Safety Improvements in Indian Railways",
  venue: "Accepted at ICICST 2026",
  proceedings: "SSRN Proceedings (Elsevier)",
  backgroundPath: "/photo/backgrounds/research-data.png",
};

function ResearchVisual() {
  return (
    <figure className="research-visual" aria-label="Research data visualization">
      <img src={researchData.backgroundPath} alt="Research data visualization" className="research-image" loading="lazy" />
      <div className="research-network" />
    </figure>
  );
}

export function ResearchSection() {
  return (
    <section id="research" className="research-section" aria-label="Research section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Research</p>
        <h2>Publication and Research Work</h2>
      </div>

      <article className="research-card card-foundation card-featured reveal-on-scroll">
        <header className="research-header">
          <div>
            <h3>{researchData.title}</h3>
            <p>
              Data-driven accident analysis and safety improvement direction for Indian Railways,
              aligned to applied technical research workflows.
            </p>
          </div>
          <span className="publication-badge">
            <BadgeCheck size={14} /> Publication
          </span>
        </header>

        <div className="research-meta">
          <span>
            <BookOpenText size={14} /> {researchData.venue}
          </span>
          <span>
            <Network size={14} /> {researchData.proceedings}
          </span>
        </div>

        <ResearchVisual />
      </article>
    </section>
  );
}
