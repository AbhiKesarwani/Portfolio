import { Award, Medal, Trophy } from "lucide-react";

type Achievement = {
  title: string;
  detail: string;
};

const achievements: Achievement[] = [
  { title: "2nd Place", detail: "2 University Hackathons" },
  { title: "3rd Rank", detail: "HCL GUVI Scholarship" },
  { title: "Power BI Session", detail: "Conducted a Power BI session for 40+ Indian Air Force officers." },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="achievements-section" aria-label="Achievements section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Achievements</p>
        <h2>Recognition</h2>
      </div>

      <div className="achievements-carousel reveal-on-scroll">
        <div className="achievements-carousel-shell">
          <div className="achievements-grid" aria-label="Recognition cards">
            {achievements.map((item, index) => (
              <article key={`${item.title}-${item.detail}`} className="achievement-card card-foundation card-standard reveal-on-scroll">
                <div className="achievement-icon" aria-hidden="true">
                  {index % 3 === 0 ? <Trophy size={16} /> : index % 3 === 1 ? <Medal size={16} /> : <Award size={16} />}
                </div>
                <h3>{item.title}</h3>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
