import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "AplusClasses",
    description:
      "A question paper generator application that automates the creation of customized exam papers and assessments. Helps educators efficiently generate varied question sets for testing and evaluation purposes.",
    imageUrl: "/projects/InterviewIQ.png",
    tags: ["JavaScript"],
    demoUrl: "https://interviewiq-client-sw9d.onrender.com/",
    githubUrl: "https://github.com/H-vishwa/InterviewIQ",
  },
  {
    id: 2,
    title: "Welth AI",
    description:
      "An AI-powered finance platform with smart receipt scanning, budget planning, and automated insights for managing personal and business finances.",
    imageUrl: "/projects/WelthAi.jpg",
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
    imageUrl: "/projects/IPrepAI.jpg",
    tags: [
      "Tailwind CSS",
      "JavaScript",
      "AI",
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
    ],
    demoUrl: "https://sparkly-tanuki-37ddcb.netlify.app/",
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
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured <span className="text-primary">Projects</span>
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A selection of projects showcasing my skills and experience in Web
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8  ">
          {projects.map((project, key) => (
            <div
              className="group bg-background gradient-border rounded-lg overflow-hidden shadow-2xl card-hover md:w-[400px] "
              key={key}>
              <div className=" overflow-hidden">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-lg transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-3 py-1 text-xs shadow-2xs font-medium rounded-full bg-background">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                <div className="flex justify-center items-center">
                  <div className="flex space-x-3 ">
                    <a
                      href={project.demoUrl}
                      className="p-3 rounded-full text-muted-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors duration-300"
                      target="_blank">
                      <ExternalLink size={20} />
                    </a>
                    <a
                      href={project.githubUrl}
                      className="p-3 rounded-full text-muted-foreground/80 hover:text-primary hover:bg-primary/10 transition-colors duration-300"
                      target="_blank">
                      <Github size={20} />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/H-vishwa"
            target="_blank"
            className="cosmic-button w-fit flex items-center mx-auto gap-2">
            Check My Github <ExternalLink size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
