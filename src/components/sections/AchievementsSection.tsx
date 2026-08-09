import { Award, Medal, Trophy } from "lucide-react";

type Achievement = {
  title: string;
  detail: string;
};

const achievements: Achievement[] = [
  { title: "2nd Place", detail: "University Hackathon" },
  { title: "2nd Place", detail: "AI Hackathon" },
  { title: "3rd Rank", detail: "HCL GUVI Scholarship" },
  { title: "AIR 376", detail: "PW Skills Coding Contest" },
  { title: "Rank 136", detail: "Techfest IIT Bombay Campus Ambassador" },
  { title: "Workshop Lead", detail: "Conducted Power BI workshop for 40+ Indian Air Force officers" },
];

export function AchievementsSection() {
  return (
    <section id="achievements" className="achievements-section" aria-label="Achievements section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Achievements</p>
        <h2>Recognitions and Milestones</h2>
      </div>

      <div className="achievements-grid">
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
    </section>
  );
}
