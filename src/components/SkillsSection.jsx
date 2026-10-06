import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skillsData } from "../data/skills";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const TechStackGrid = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Animate section heading
    gsap.to(".skills-heading", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".skills-heading",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Stagger animate skill categories and cards
    gsap.fromTo(
      ".skill-category-block",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".skills-container",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="skill" className="py-16 sm:py-20 md:py-24 px-4 relative bg-background select-none">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 select-none gap-2 md:gap-0">
          <div className="text-left">
            <span className="skills-heading inline-block text-xs uppercase font-bold tracking-widest text-foreground/50 opacity-0 -translate-y-6 mb-2">
              Expertise &amp; Technologies
            </span>
            <h2 className="skills-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tighter leading-[0.95] opacity-0 -translate-y-6">
              My <br className="hidden sm:inline" /> Skills
            </h2>
          </div>

          <p className="skills-heading text-xs sm:text-sm text-foreground/60 max-w-xs md:text-right opacity-0 -translate-y-6 mt-2 md:mt-0 font-medium">
            Production-tested stack specialized in full-stack engineering, data analytics, scalable architectures, and modern UI workflows.
          </p>
        </div>

        {/* Categorized Skills Grid */}
        <div className="skills-container space-y-8 sm:space-y-10">
          {skillsData.map((categoryGroup) => (
            <div key={categoryGroup.category} className="skill-category-block text-left">
              {/* Category Title */}
              <div className="flex items-center gap-2 mb-3 sm:mb-4">
                <span className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-foreground/70">
                  {categoryGroup.category}
                </span>
                <span className="h-px flex-1 bg-border/60" />
                <span className="text-[10px] uppercase font-bold text-muted-foreground/60 tracking-wider">
                  {categoryGroup.skills.length} tools
                </span>
              </div>

              {/* Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 sm:gap-3.5">
                {categoryGroup.skills.map((skill) => (
                  <a
                    key={skill.name}
                    href={skill.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex items-center gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl border border-border/80 bg-card hover:border-foreground/35 hover:-translate-y-0.5 transition-all duration-300 shadow-2xs hover:shadow-sm"
                    title={`${skill.name} documentation`}
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 shrink-0 flex items-center justify-center p-1 rounded-lg bg-foreground/5 group-hover:bg-foreground/10 transition-colors">
                      <img
                        src={skill.icon}
                        alt={skill.name}
                        loading="lazy"
                        className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-110 ${
                          skill.isExpress || skill.darkInvert ? "dark:invert brightness-0 dark:brightness-100" : ""
                        }`}
                      />
                    </div>
                    <span className="text-xs sm:text-sm font-semibold tracking-tight text-foreground/85 group-hover:text-foreground transition-colors truncate">
                      {skill.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackGrid;
