import { BadgeCheck, BookOpenText, Network } from "lucide-react";

const researchData = {
  title: "Accident Analysis and Safety Improvements in Indian Railways",
  venue: "Accepted at ICICST 2026",
  proceedings: "SSRN Proceedings (Elsevier)",
  topics: ["Accident Analysis", "Railway Safety", "Applied Research"],
  focusAreas: [
    "Data-driven accident trend analysis",
    "Safety improvement recommendation mapping",
    "Applied research workflow alignment",
  ],
};

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
            <p>Data-driven accident analysis and safety improvement direction for Indian Railways, aligned to applied technical research workflows.</p>
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

        <div className="research-topics" aria-label="Research topics">
          {researchData.topics.map((topic) => (
            <span key={topic}>{topic}</span>
          ))}
        </div>

        <div className="research-focus-grid" aria-label="Research focus areas">
          {researchData.focusAreas.map((area) => (
            <article key={area} className="research-focus-item">
              <h4>Research Focus</h4>
              <p>{area}</p>
            </article>
          ))}
        </div>
      </article>
    </section>
  );
}
