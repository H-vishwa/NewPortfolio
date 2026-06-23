import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const TechStackGrid = () => {
  const containerRef = useRef(null);

  const technologies = [
    {
      name: "HTML",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      color: "#E34F26",
      url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
    },
    {
      name: "CSS",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      color: "#1572B6",
      url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      name: "JavaScript",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      color: "#F7DF1E",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      name: "PostgreSQL",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
      color: "#4169E1",
      url: "https://www.postgresql.org/",
    },
    {
      name: "MongoDB",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
      color: "#47A248",
      url: "https://www.mongodb.com/",
    },
    {
      name: "Express.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
      color: "#FFFFFF",
      url: "https://expressjs.com/",
    },
    {
      name: "React.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      color: "#00D6FD",
      url: "https://react.dev/",
    },
    {
      name: "Node.js",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
      color: "#339933",
      url: "https://nodejs.org/",
    },
    {
      name: "C++",
      icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg",
      color: "#00599C",
      url: "https://isocpp.org/",
    },
    {
      name: "MS Office",
      icon: "https://img.icons8.com/fluency/96/microsoft-office-2019.png",
      color: "#D83B01",
      url: "https://www.microsoft.com/en-us/microsoft-365",
    },
    {
      name: "Redux",
      icon: "https://img.icons8.com/color/96/redux.png",
      color: "#764ABC",
      url: "https://redux.js.org",
    },
  ];

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

    // Stagger animate tech cards with a nice elastic pop-up
    gsap.fromTo(
      ".framework-card",
      { opacity: 0, scale: 0.4 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.08,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".skills-grid",
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} id="skill" className="py-24 px-4 relative bg-background select-none">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 select-none gap-2 md:gap-0">
          <span className="skills-heading text-xs uppercase font-bold tracking-widest text-foreground/50 opacity-0 -translate-y-8">
            Tech Stack &amp; Tools
          </span>
          <h2 className="skills-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tighter md:text-right leading-[0.95] opacity-0 -translate-y-8">
            My <br /> Skills
          </h2>
        </div>

        {/* Skills Grid Section (below the heading, full width) */}
        <div className="skills-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 w-full justify-items-center ">
          {technologies.map((tech) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="framework-card gap-9"
              title={tech.name}>
              <img src={tech.icon} alt={tech.name} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackGrid;
