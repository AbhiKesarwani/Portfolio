import { Building2, CalendarDays, MapPin } from "lucide-react";

type ExperienceItem = {
  company: string;
  role: string;
  location: string;
  period: string;
  highlights?: string[];
};

const experienceItems: ExperienceItem[] = [
  {
    company: "Siemens",
    role: "Technical Intern",
    location: "Pune, Maharashtra",
    period: "May 2026-Present",
    highlights: [
      "Python-based Excel/report automation",
      "Reduced manual engineering effort by 6-7 hours per delivery",
      "Contributing to AI-assisted intelligent code review platform",
    ],
  },
  {
    company: "Delhi Metro Rail Corporation (DMRC)",
    role: "IT Intern",
    location: "Delhi, India",
    period: "May 2025-Jun 2025",
    highlights: [
      "Developed and deployed DMRC Indoor Navigation System",
      "Supporting 100+ daily visitors",
      "Automated trip-chart generation",
    ],
  },
  {
    company: "Western Railway — DRM Vadodara",
    role: "Internship",
    location: "Vadodara, Gujarat",
    period: "May 2024",
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="experience-section" aria-label="Experience section">
      <img src="/photo/backgrounds/experience-circuit.png" alt="" className="experience-circuit-bg" />
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Experience</p>
        <h2>Industry Experience</h2>
      </div>

      <div className="experience-timeline" aria-label="Experience timeline">
        {experienceItems.map((item) => (
          <article key={`${item.company}-${item.period}`} className="timeline-item reveal-on-scroll">
            <span className="timeline-dot" aria-hidden="true" />
            <div className="timeline-card card-foundation card-standard">
              <header>
                <h3>{item.company}</h3>
                <p>{item.role}</p>
              </header>

              <div className="timeline-meta">
                <span>
                  <MapPin size={14} aria-hidden="true" /> {item.location}
                </span>
                <span>
                  <CalendarDays size={14} aria-hidden="true" /> {item.period}
                </span>
                <span>
                  <Building2 size={14} aria-hidden="true" /> Internship
                </span>
              </div>

              {item.highlights && item.highlights.length > 0 ? (
                <ul>
                  {item.highlights.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
