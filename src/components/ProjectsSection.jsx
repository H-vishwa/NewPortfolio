import { useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { projectsData } from "../data/projects";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate heading and subtitle
    gsap.to(".projects-header", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".projects-header",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Stagger animate project cards
    gsap.to(".project-card", {
      opacity: 1,
      y: 0,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".projects-grid",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="projects" className="py-16 sm:py-20 md:py-24 px-4 relative bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 select-none">
          <div className="text-left">
            <span className="projects-header inline-block text-xs uppercase font-bold tracking-widest text-foreground/50 opacity-0 -translate-y-6 mb-2">
              Portfolio &amp; Selected Works
            </span>
            <h2 className="projects-header text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tighter leading-[0.95] opacity-0 -translate-y-6">
              Featured <br className="hidden sm:inline" /> Projects
            </h2>
          </div>

          {/* Conditional "View All Work" link: ONLY shown if projects count exceeds 4 */}
          {projectsData.length > 4 && (
            <a
              href="https://github.com/H-vishwa"
              target="_blank"
              rel="noopener noreferrer"
              className="projects-header flex items-center gap-3 text-xs uppercase font-bold tracking-widest text-foreground hover:opacity-75 transition-all duration-300 mt-4 md:mt-0">
              View All Work
              <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-card hover:border-foreground/30 transition-colors duration-300 text-sm font-semibold">
                ↗
              </span>
            </a>
          )}
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 justify-items-center">
          {projectsData.map((project) => (
            <div
              className="project-card group rounded-2xl border border-border/80 bg-card p-4 sm:p-5 flex flex-col justify-between opacity-0 translate-y-12 w-full text-left transition-all duration-300 hover:border-foreground/35 hover:shadow-lg"
              key={project.id}>
              
              <div>
                {/* Image linking to Case Study */}
                <Link
                  to={`/projects/${project.slug}`}
                  className="block w-full overflow-hidden rounded-xl bg-foreground/5 border border-border/40 mb-4 relative"
                  title={`View ${project.title} case study`}>
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                    decoding="async"
                  />
                  <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-xs text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Case Study</span>
                    <ArrowUpRight size={11} />
                  </div>
                </Link>

                {/* Title & Description */}
                <div className="mb-3">
                  <div className="flex items-center justify-between gap-2">
                    <Link
                      to={`/projects/${project.slug}`}
                      className="text-lg sm:text-xl font-bold uppercase tracking-tight text-foreground hover:text-primary transition-colors duration-300">
                      {project.title}
                    </Link>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed mt-2 line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tech Stack Chips */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/70 border border-border/40">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom labeled action buttons */}
              <div className="flex items-center justify-between pt-3 border-t border-border/50 gap-1.5 xs:gap-2">

                <div className="flex items-center gap-1.5 xs:gap-2 shrink-0">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1.5 rounded-lg border border-border bg-card text-foreground/80 hover:text-foreground text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-foreground/5 shrink-0">
                  <Github size={12} className="shrink-0" />
                  <span className="hidden md:block">GitHub</span>
                </a>
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1.5 rounded-lg border border-border bg-foreground text-background hover:opacity-90 text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-opacity shadow-2xs shrink-0">
                    <ExternalLink size={12} className="shrink-0" />
                    <span className="hidden md:block">Live Demo</span>
                  </a>
                </div>
                  <Link
                    to={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1.5 rounded-lg border border-border bg-card hover:bg-foreground/5 text-foreground/80 hover:text-foreground text-[10px] xs:text-[11px] sm:text-xs font-semibold uppercase tracking-wider transition-colors shrink-0">
                    <span>Case Study</span>
                    <ArrowUpRight size={12} className="shrink-0" />
                  </Link>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
