import { BriefcaseBusiness, Megaphone, UsersRound } from "lucide-react";

type LeadershipItem = {
  role: string;
  org: string;
};

const leadershipItems: LeadershipItem[] = [
  { role: "Placement Coordinator", org: "GSV" },
  { role: "Internship Coordinator", org: "GSV" },
  { role: "Head — Marketing & PR", org: "Hult Prize GSV" },
  { role: "Co-Coordinator — PR & Marketing", org: "Business Club, GSV" },
];

export function LeadershipSection() {
  return (
    <section id="leadership" className="leadership-section" aria-label="Leadership section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Leadership</p>
        <h2>Leadership and Coordination</h2>
      </div>

      <div className="leadership-timeline">
        {leadershipItems.map((item, index) => (
          <article key={`${item.role}-${item.org}`} className="leadership-item reveal-on-scroll">
            <span className="leadership-dot" aria-hidden="true" />
            <div className="leadership-card card-foundation card-standard">
              <h3>{item.role}</h3>
              <p>{item.org}</p>
              <div className="leadership-meta" aria-hidden="true">
                <span>{index % 2 === 0 ? <UsersRound size={14} /> : <BriefcaseBusiness size={14} />} Student Leadership</span>
                <span><Megaphone size={14} /> Coordination</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
