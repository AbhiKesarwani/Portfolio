import { ChevronLeft, ChevronRight, Database, FileText, GitBranch, ShieldCheck } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectCard = {
  title: string;
  description: string;
  technologies: string[];
  highlights: string[];
  visualPath: string;
  links?: {
    liveDemo?: string;
    demo?: string;
    github?: string;
  };
  featured?: boolean;
};

const projects: ProjectCard[] = [
  {
    title: "AI-Powered Code Review",
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
  {
    title: "AI-Powered Academic Timetable Generator",
    description:
      "An intelligent academic scheduling system that automatically generates conflict-free timetables using a Genetic Algorithm while considering faculty availability, subject credits, working hours, holidays, and existing timetables.",
    technologies: ["Python", "Flask", "MySQL", "Jinja2", "JavaScript", "Genetic Algorithm"],
    highlights: [
      "Genetic Algorithm scheduling",
      "Faculty conflict prevention",
      "Holiday-aware scheduling",
      "Cross-semester conflict detection",
      "Public student & faculty timetables",
      "Intelligent handling of impossible schedules",
    ],
    visualPath: "/photo/projects/timetable-generator.svg",
    links: {
      liveDemo: "https://timetable-generator-genetic-algorit.vercel.app/",
      demo:
        "https://www.linkedin.com/posts/abhinav-kesarwani_python-flask-mysql-activity-7477956766601826304-eju1?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEIUa9IB1N78githf0Fv8-dUSg7-hw3D9hI",
      github: "https://github.com/AbhiKesarwani/Timetable_Generator_Genetic_Algorithm",
    },
  },
];

const carouselProjects = projects;

function ProjectVisual({ path, title }: { path: string; title: string }) {
  return (
    <figure className="project-visual" aria-label={`${title} preview`}>
      <img src={path} alt={`${title} project preview`} className="project-image" loading="lazy" />
    </figure>
  );
}

export function ProjectsSection() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateScrollState = useCallback(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const maxLeft = Math.max(0, track.scrollWidth - track.clientWidth);
    setCanScrollPrev(track.scrollLeft > 4);
    setCanScrollNext(track.scrollLeft < maxLeft - 4);
  }, []);

  useEffect(() => {
    updateScrollState();
    window.addEventListener("resize", updateScrollState);
    return () => window.removeEventListener("resize", updateScrollState);
  }, [updateScrollState]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) {
      return;
    }

    const onWheel = (event: WheelEvent) => {
      const shouldShiftHorizontally = Math.abs(event.deltaY) > Math.abs(event.deltaX);
      const canShift = track.scrollWidth > track.clientWidth;
      if (shouldShiftHorizontally && canShift) {
        event.preventDefault();
        track.scrollBy({ left: event.deltaY, behavior: "auto" });
      }
    };

    track.addEventListener("wheel", onWheel, { passive: false });
    return () => track.removeEventListener("wheel", onWheel);
  }, []);

  const scrollByCard = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) {
      return;
    }
    const amount = Math.max(260, Math.round(track.clientWidth * 0.56)) * direction;
    track.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <section id="projects" className="projects-section" aria-label="Projects section">
      <div className="section-head reveal-on-scroll">
        <p className="section-kicker">Projects</p>
        <h2>Projects</h2>
      </div>

      <div className="projects-carousel reveal-on-scroll">
        <p className="project-scroll-cue" aria-hidden="true">
          Scroll to explore more projects
        </p>
        <div className="projects-carousel-shell">
          <div className="project-carousel-controls" aria-hidden="true">
            <button
              type="button"
              className="project-carousel-arrow project-carousel-arrow-prev"
              onClick={() => scrollByCard(-1)}
              disabled={!canScrollPrev}
              tabIndex={-1}
              aria-label="Scroll projects left"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              className="project-carousel-arrow project-carousel-arrow-next"
              onClick={() => scrollByCard(1)}
              disabled={!canScrollNext}
              tabIndex={-1}
              aria-label="Scroll projects right"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <div
            ref={trackRef}
            className="projects-grid"
            onScroll={updateScrollState}
            aria-label="Horizontal project showcase"
          >
            {carouselProjects.map((project) => (
              <article
                key={project.title}
                className={project.featured ? "project-card card-foundation card-featured reveal-on-scroll featured" : "project-card card-foundation card-standard reveal-on-scroll"}
              >
                <div className="project-card-top">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                </div>

                <ProjectVisual path={project.visualPath} title={project.title} />

                <div className="project-content-stack">
                  <div className="project-tech-list" aria-label={`${project.title} technologies`}>
                    {project.technologies.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>

                  <ul className="project-highlights" aria-label={`${project.title} key information`}>
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>

                  {project.links ? (
                    <div className="project-resource-links" aria-label={`${project.title} links`}>
                      {project.links.liveDemo ? (
                        <a href={project.links.liveDemo} target="_blank" rel="noreferrer">
                          Live Demo
                        </a>
                      ) : null}
                      {project.links.demo ? (
                        <a href={project.links.demo} target="_blank" rel="noreferrer">
                          Demo
                        </a>
                      ) : null}
                      {project.links.github ? (
                        <a href={project.links.github} target="_blank" rel="noreferrer">
                          GitHub
                        </a>
                      ) : null}
                    </div>
                  ) : null}

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
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
