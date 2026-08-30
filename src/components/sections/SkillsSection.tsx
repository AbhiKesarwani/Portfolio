import {
  BarChart3,
  Brain,
  BrainCircuit,
  Braces,
  Cloud,
  Cpu,
  CloudCog,
  Database,
  Link2,
  Search,
  Server,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import {
  SiCplusplus,
  SiDocker,
  SiGithub,
  SiHuggingface,
  SiGit,
  SiKubernetes,
  SiMysql,
  SiNumpy,
  SiOpenjdk,
  SiPandas,
  SiPython,
  SiPytorch,
  SiScikitlearn,
  SiTensorflow,
} from "react-icons/si";

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

type TechIconComponent = LucideIcon | IconType;

type EcosystemLogo = {
  label: string;
  icon: TechIconComponent;
  className: string;
};

const ecosystemTopRow: EcosystemLogo[] = [
  { label: "Python", icon: SiPython, className: "logo-python" },
  { label: "C++", icon: SiCplusplus, className: "logo-cpp" },
  { label: "Java", icon: SiOpenjdk, className: "logo-java" },
  { label: "Machine Learning", icon: BrainCircuit, className: "logo-ml" },
  { label: "Deep Learning", icon: Brain, className: "logo-dl" },
  { label: "PyTorch", icon: SiPytorch, className: "logo-pytorch" },
  { label: "TensorFlow", icon: SiTensorflow, className: "logo-tensorflow" },
  { label: "Scikit-learn", icon: SiScikitlearn, className: "logo-scikit" },
  { label: "Pandas", icon: SiPandas, className: "logo-pandas" },
  { label: "NumPy", icon: SiNumpy, className: "logo-numpy" },
  { label: "Data Analysis", icon: BarChart3, className: "logo-analysis" },
  { label: "SQL", icon: Database, className: "logo-sql" },
];

const ecosystemBottomRow: EcosystemLogo[] = [
  { label: "MySQL", icon: SiMysql, className: "logo-mysql" },
  { label: "Generative AI", icon: Sparkles, className: "logo-genai" },
  { label: "LLMs", icon: Cpu, className: "logo-llms" },
  { label: "RAG", icon: Search, className: "logo-rag" },
  { label: "LangChain", icon: Link2, className: "logo-langchain" },
  { label: "Hugging Face", icon: SiHuggingface, className: "logo-hf" },
  { label: "Git", icon: SiGit, className: "logo-git" },
  { label: "Docker", icon: SiDocker, className: "logo-docker" },
  { label: "Kubernetes", icon: SiKubernetes, className: "logo-kubernetes" },
  { label: "AWS", icon: Cloud, className: "logo-aws" },
  { label: "GitHub", icon: SiGithub, className: "logo-github" },
];

export function SkillsSection() {
  const [activeTech, setActiveTech] = useState<string | null>(null);

  useEffect(() => {
    if (!activeTech) {
      return;
    }
    const timer = window.setTimeout(() => setActiveTech(null), 560);
    return () => window.clearTimeout(timer);
  }, [activeTech]);

  const activateTech = (label: string) => {
    setActiveTech((current) => (current === label ? null : label));
    window.setTimeout(() => setActiveTech(label), 0);
  };

  return (
    <section id="skills" className="skills-section" aria-label="Skills section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Skills</p>
        <h2>Technology Ecosystem</h2>
      </div>

      <div className="tech-ecosystem reveal-on-scroll">
        <div className="tech-ecosystem-grid" />
        <div className="tech-ecosystem-network" />
        <div className="tech-ecosystem-panel">
          <div className="tech-ecosystem-header">
            <span className="tech-ecosystem-badge">Stack</span>
          </div>

          <div className="tech-logo-cloud" role="list" aria-label="Technology ecosystem">
            {[ecosystemTopRow, ecosystemBottomRow].map((row, index) => (
              <div key={`tech-row-${index}`} className="tech-logo-row" role="presentation">
                {row.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTech === item.label;
                  return (
                    <button
                      key={item.label}
                      type="button"
                      role="listitem"
                      aria-label={`Highlight ${item.label}`}
                      className={`tech-logo-chip ${item.className}${isActive ? " is-active" : ""}`}
                      onClick={() => activateTech(item.label)}
                    >
                      <Icon size={16} />
                      <em>{item.label}</em>
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
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
