import { BadgeCheck, BookMarked, GraduationCap } from "lucide-react";

type Certification = {
  title: string;
  issuer: string;
};

const certifications: Certification[] = [
  { title: "Applications of AI for Predictive Maintenance", issuer: "NVIDIA" },
  { title: "Fundamentals of Deep Learning", issuer: "NVIDIA" },
  { title: "Computer Vision for Industrial Inspection", issuer: "NVIDIA" },
  { title: "Artificial Intelligence Fundamentals", issuer: "IBM" },
  { title: "Generative AI Fundamentals", issuer: "IBM" },
];

export function CertificationsSection() {
  return (
    <section id="certifications" className="certifications-section" aria-label="Certifications section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Certifications</p>
        <h2>Professional Credentials</h2>
      </div>

      <div className="certifications-grid">
        {certifications.map((cert, index) => (
          <article key={`${cert.issuer}-${cert.title}`} className="certification-card card-foundation card-small reveal-on-scroll">
            <div className="certification-icon" aria-hidden="true">
              {index % 2 === 0 ? <BadgeCheck size={16} /> : <GraduationCap size={16} />}
            </div>
            <h3>{cert.title}</h3>
            <p>{cert.issuer}</p>
            <span className="certification-tag" aria-hidden="true">
              <BookMarked size={13} /> Verified Certificate
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
