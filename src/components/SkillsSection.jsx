import { useEffect, useState } from "react";

const TechStackGrid = () => {
  const [activeCards, setActiveCards] = useState([]);

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
  ];

  useEffect(() => {
    technologies.forEach((_, index) => {
      setTimeout(() => {
        setActiveCards((prev) => [...prev, index]);
      }, index * 100);
    });
  }, []);

  return (
    <section id="skill" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl grid justify-center md:flex md:justify-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-20 md:mr-[100px] text-center">
          My <span className="text-primary">Skills</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 items-center justify-center gap-6 max-w-3xl w-full">
          {technologies.map((tech, index) => (
            <a
              key={tech.name}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`framework-card gap-9 ${
                activeCards.includes(index) ? "active" : ""
              }`}
              style={{ "--glow-color": tech.color }}
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
