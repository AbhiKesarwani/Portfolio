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

      <div className="tech-visual reveal-on-scroll" aria-hidden="true">
        <div className="tech-visual-grid" />
        <svg className="tech-visual-lines" viewBox="0 0 600 220" preserveAspectRatio="none" focusable="false">
          <line x1="58" y1="44" x2="216" y2="112" />
          <line x1="216" y1="112" x2="378" y2="52" />
          <line x1="216" y1="112" x2="336" y2="172" />
          <line x1="378" y1="52" x2="518" y2="88" />
          <line x1="336" y1="172" x2="500" y2="148" />
          <line x1="58" y1="44" x2="148" y2="172" />
        </svg>
        <span className="tech-node tech-node-a" style={{ left: "10%", top: "20%" }} />
        <span className="tech-node tech-node-b" style={{ left: "36%", top: "51%" }} />
        <span className="tech-node tech-node-c" style={{ left: "63%", top: "24%" }} />
        <span className="tech-node tech-node-d" style={{ left: "56%", top: "78%" }} />
        <span className="tech-node tech-node-e" style={{ left: "86%", top: "40%" }} />
        <span className="tech-node tech-node-f" style={{ left: "25%", top: "78%" }} />
        <span className="tech-point" style={{ left: "18%", top: "66%" }} />
        <span className="tech-point" style={{ left: "72%", top: "60%" }} />
        <span className="tech-point" style={{ left: "48%", top: "16%" }} />
        <div className="tech-fragment tech-fragment-a">const rag = retrieve(query);</div>
        <div className="tech-fragment tech-fragment-b">model.infer(context)</div>
      </div>

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
