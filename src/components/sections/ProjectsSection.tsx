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
    description:
      "AI-powered GitHub code review platform that analyzes pull requests using parallel AI agents for security, static analysis, code quality, style, and architecture issues, then delivers actionable findings directly to developers.",
    technologies: ["Python", "AI", "LangGraph", "GitHub App", "AWS", "Docker", "Kubernetes", "PostgreSQL"],
    highlights: [
      "Webhook-triggered PR analysis across security, style, architecture, and quality",
      "Inline review comments, OWASP-focused checks, and secret/SQL injection detection",
      "LangGraph orchestration with AWS Kubernetes-backed observability",
    ],
    visualPath: "/photo/projects/code-reviewer.svg",
    links: {
      github: "https://github.com/AbhiKesarwani/AI_Reviewer",
    },
    featured: true,
  },
  {
    title: "SecureDocAI",
    description:
      "Privacy-preserving offline document intelligence system combining OCR, hybrid BM25 + vector retrieval, cross-encoder reranking, local LLMs, and evidence-based confidence scoring.",
    technologies: ["OCR", "Hybrid Retrieval", "BM25", "Vector Search", "Reranking", "Offline AI"],
    highlights: [
      "Offline RAG workflows for private document intelligence",
      "Evidence-grounded responses with confidence scoring",
      "Semantic plus lexical retrieval for high-recall search",
    ],
    visualPath: "/photo/projects/securedocai.svg",
    featured: true,
  },
  {
    title: "AI Interview Coach",
    description:
      "Real-time speech-to-speech AI interview platform that conducts contextual technical interviews using WebRTC, Deepgram STT, Groq LLM, and Cartesia TTS, with dynamic follow-up questions and an animated interviewer.",
    technologies: ["React", "WebRTC", "Python", "FastAPI", "Deepgram", "Groq", "Cartesia", "Pipecat"],
    highlights: [
      "Context-aware technical interviews with dynamic follow-up questions",
      "JD-aware generation with optional resume upload",
      "Low-latency conversational pipeline via WebSockets and AsyncIO",
    ],
    visualPath: "/photo/projects/interview-coach.png",
    links: {
      github: "https://github.com/AbhiKesarwani/AI_Interview_Coach",
    },
  },
  {
    title: "AI-Powered Academic Timetable Generator",
    description:
      "Intelligent academic timetable generator that uses a Genetic Algorithm to create conflict-free schedules while considering faculty availability, subject credits, working hours, holidays, and cross-semester faculty constraints.",
    technologies: ["Python", "Flask", "MySQL", "Genetic Algorithm", "JavaScript"],
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
