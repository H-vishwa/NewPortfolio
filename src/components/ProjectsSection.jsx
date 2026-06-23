import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ExternalLink, Github } from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: 1,
    title: "InterviewIQ.ai",
    description:
      "InterviewIQ is an AI-powered mock interview platform that conducts realistic, customizable technical and behavioral interviews, scores responses, and delivers detailed feedback and improvement suggestions to help candidates prepare confidently for real interviews.",
    imageUrl: "/projects/InterviewIQ.png",
    tags: [
      "JavaScript",
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "Firebase",
    ],
    demoUrl: "https://interviewiq-client-sw9d.onrender.com/",
    githubUrl: "https://github.com/H-vishwa/InterviewIQ",
  },
  {
    id: 2,
    title: "Welth AI",
    description:
      "An AI-powered finance platform with smart receipt scanning, budget planning, and automated insights for managing personal and business finances.",
    imageUrl: "/projects/WelthAi.png",
    tags: [
      "Tailwind CSS",
      "React",
      "Next.js",
      "AI",
      "Supabase",
      "Prisma",
      "Inngest",
    ],
    demoUrl: "https://welth-ai-finance-platform-orpin.vercel.app/",
    githubUrl: "https://github.com/H-vishwa/welth-ai-finance-platform",
  },
  {
    id: 3,
    title: "IPrep AI",
    description:
      "An AI-powered interview preparation platform that helps users practice and improve their interview skills.",
    imageUrl: "/projects/IPrepAI.png",
    tags: [
      "Tailwind CSS",
      "JavaScript",
      "AI",
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
    ],
    demoUrl: "https://iprep-ai-1.onrender.com/",
    githubUrl: "https://github.com/H-vishwa/IPrep-AI",
  },
  {
    id: 4,
    title: "Car Rental",
    description:
      "A comprehensive car rental application where users can browse, book, and manage car reservations with an admin panel.",
    imageUrl: "/projects/CarRental.png",
    tags: [
      "JavaScript",
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Tailwind CSS",
    ],
    demoUrl: "https://car-rental-six-ivory.vercel.app/",
    githubUrl: "https://github.com/H-vishwa/Car-Rental",
  },
];

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
    <section ref={containerRef} id="projects" className="py-16 md:py-24 px-3 sm:px-4 relative bg-background">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 select-none">
          <h2 className="projects-header text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase tracking-tighter text-left leading-[0.95] opacity-0 -translate-y-8">
            Featured <br /> Projects
          </h2>
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
        </div>

        {/* Project Cards Grid */}
        <div className="projects-grid grid grid-cols-1 md:grid-cols-2 gap-x-6 md:gap-x-8 gap-y-10 md:gap-y-12 justify-items-center">
          {projects.map((project, key) => (
            <div
              className="project-card group cursor-pointer opacity-0 translate-y-12 w-full text-left"
              key={key}>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full overflow-hidden rounded-2xl bg-foreground/5 border border-border/10 mb-4">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </a>
              <div className="flex items-start justify-between px-1">
                <div>
                  <h3 className="text-lg font-bold uppercase tracking-tight text-foreground group-hover:text-primary transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-[10px] uppercase font-bold tracking-wider mt-1.5">
                    {project.tags.slice(0, 3).join(" / ")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={project.githubUrl}
                    className="text-foreground/40 hover:text-foreground transition-colors duration-300 p-1.5 border border-border rounded-full bg-card hover:border-gray-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Source Code">
                    <Github size={14} />
                  </a>
                  <a
                    href={project.demoUrl}
                    className="text-foreground/40 hover:text-foreground transition-colors duration-300 p-1.5 border border-border rounded-full bg-card hover:border-gray-400"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Live Demo">
                    <ExternalLink size={14} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
