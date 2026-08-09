import { Database, FileText, GitBranch, ShieldCheck } from "lucide-react";

type ProjectCard = {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  visualPath: string;
  featured?: boolean;
};

const projects: ProjectCard[] = [
  {
    title: "SecureDocAI",
    description: "Privacy-preserving offline Document Intelligence and RAG pipeline for enterprise knowledge retrieval.",
    technologies: ["OCR", "FAISS", "BM25", "Cross-Encoder", "Local SLM"],
    highlights: [
      "25+ enterprise documents",
      "35K+ indexed chunks",
      "125 benchmark questions",
      "15+ evaluation metrics",
      "Evidence-Based Confidence Scoring",
    ],
    visualPath: "/photo/projects/securedocai.png",
    featured: true,
  },
  {
    title: "AI-Powered Code Review / Software Assurance Platform",
    description: "AI-assisted code review system with structural and policy-aware software assurance workflows.",
    technologies: ["AST", "Graph Analysis", "GitHub Integration", "AWS", "Docker", "Kubernetes"],
    highlights: [
      "AST + graph-based analysis",
      "Security, reliability, maintainability, and compliance mapping",
      "AI-assisted code review",
    ],
    visualPath: "/photo/projects/code-reviewer.png",
    featured: true,
  },
  {
    title: "AI Interview Coach",
    description: "Pipecat-based real-time interview assistant for end-to-end conversational interview practice.",
    technologies: ["Pipecat", "STT", "LLM", "TTS", "WebRTC"],
    highlights: [
      "Real-time AI interview system",
      "Integrated STT + LLM + TTS pipeline",
      "Low-latency WebRTC interaction",
    ],
    visualPath: "/photo/projects/interview-coach.png",
  },
];

function ProjectVisual({ path, title }: { path: string; title: string }) {
  return (
    <figure className="project-visual" aria-label={`${title} preview`}>
      <img src={path} alt={`${title} project preview`} className="project-image" loading="lazy" />
    </figure>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="projects-section" aria-label="Projects section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Projects</p>
        <h2>Selected Engineering Projects</h2>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article
            key={project.title}
            className={project.featured ? "project-card card-foundation card-featured reveal-on-scroll featured" : "project-card card-foundation card-standard reveal-on-scroll"}
          >
            <div className="project-card-top">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </div>

            <ProjectVisual path={project.visualPath} title={project.title} />

            <div className="project-tech-list" aria-label={`${project.title} technologies`}>
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>

            <ul className="project-highlights">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="project-meta-icons" aria-hidden="true">
              <span>
                <ShieldCheck size={14} /> Verified Scope
              </span>
              <span>
                <Database size={14} /> Structured Data
              </span>
              <span>
                <GitBranch size={14} /> Engineering Workflow
              </span>
              <span>
                <FileText size={14} /> Technical Notes
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
