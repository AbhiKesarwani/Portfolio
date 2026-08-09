import {
  BrainCircuit,
  Braces,
  CloudCog,
  Database,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

const skillGroups: SkillGroup[] = [
  {
    title: "Generative AI",
    icon: Sparkles,
    items: ["LLMs", "RAG", "Fine-tuning", "Transformers", "Prompt Engineering"],
  },
  {
    title: "Programming",
    icon: Braces,
    items: ["Python", "C++", "SQL", "Java", "C"],
  },
  {
    title: "AI/ML",
    icon: BrainCircuit,
    items: ["PyTorch", "Hugging Face", "Scikit-learn", "TensorFlow"],
  },
  {
    title: "Retrieval/NLP",
    icon: Database,
    items: ["FAISS", "BM25", "Sentence Transformers", "Cross-Encoder"],
  },
  {
    title: "Backend",
    icon: Server,
    items: ["FastAPI", "Flask", "MySQL"],
  },
  {
    title: "Cloud/DevOps",
    icon: CloudCog,
    items: ["AWS", "Docker", "Kubernetes", "GitHub Actions", "CI/CD"],
  },
  {
    title: "Data",
    icon: Database,
    items: ["Pandas", "NumPy", "Matplotlib", "Streamlit"],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="skills-section" aria-label="Skills section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Skills</p>
        <h2>Technology Ecosystem</h2>
      </div>

      <figure className="skills-visual reveal-on-scroll" aria-label="Abhinav technical setup">
        <img src="/photo/profile/abhinav-laptop.png" alt="Abhinav working on a laptop" className="skills-image" loading="lazy" />
      </figure>

      <div className="skills-grid">
        {skillGroups.map((group) => {
          const Icon = group.icon;
          return (
            <article key={group.title} className="skill-card card-foundation card-standard reveal-on-scroll">
              <header>
                <span className="skill-icon" aria-hidden="true">
                  <Icon size={16} />
                </span>
                <h3>{group.title}</h3>
              </header>

              <div className="skill-tags" aria-label={`${group.title} skills`}>
                {group.items.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
