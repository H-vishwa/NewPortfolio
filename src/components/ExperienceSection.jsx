import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  GraduationCap,
  Calendar,
  MapPin,
  CheckCircle2,
  X,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: "exp-1",
    type: "work",
    role: "Freelance Full-Stack Developer",
    organization: "Coaching Center Client Platform",
    location: "Remote / Hybrid",
    period: "Jul 2026 – Sep 2026",
    status: "Completed",
    shortSummary: "Engineered an automated question-paper generator & assessment platform with RBAC question bank and fast REST APIs.",
    description:
      "Successfully engineered and delivered an end-to-end question-paper generation and assessment platform for educators, streamlining the creation of curriculum-aligned examinations.",
    bullets: [
      "Architected and deployed an automated question-paper generation engine enabling teachers to build customized tests without manual question compilation.",
      "Designed a centralized question bank with strict Role-Based Access Control (RBAC), allowing administrators to manage curriculum pools while teachers configure test papers.",
      "Modeled scalable MongoDB schemas supporting hierarchical question categorization, permission levels, and paper-generation workflows.",
      "Developed high-performance Express.js REST APIs with JWT authentication, achieving sub-200ms response benchmarks in API testing.",
      "Conducted rigorous software testing, performance audits, and continuous feature refinements based on active instructor feedback.",
    ],
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs", "JWT", "Tailwind CSS", "Postman"],
  },
  {
    id: "edu-1",
    type: "education",
    role: "Master of Computer Applications (MCA)",
    organization: "Kurukshetra University",
    location: "Kurukshetra, Haryana",
    mode: "Correspondence",
    period: "Sep 2024 – Present",
    status: "Pursuing",
    shortSummary: "Postgraduate master's degree (Correspondence mode) focusing on software engineering, scalable backend systems, algorithms, and system design.",
    description:
      "Pursuing master's level advanced computer science education via correspondence from Kurukshetra University, focusing on software architecture, scalable backend systems, algorithms, and distributed web services.",
    bullets: [
      "Enrolled in correspondence / distance learning mode alongside active full-stack software development projects.",
      "In-depth focus on advanced database architectures, cloud computing concepts, and enterprise software design.",
      "Active research and practical development in modern web frameworks and full-stack API integration.",
    ],
    skills: ["System Design", "Web Architecture", "Database Systems", "Data Structures"],
  },
  {
    id: "edu-2",
    type: "education",
    role: "Bachelor of Computer Applications (BCA)",
    organization: "Seth Jai Parkash Mukand Lal Institute (JMIT)",
    location: "Radaur, Haryana",
    period: "Sep 2021 – Jul 2024",
    status: "Completed",
    shortSummary: "Graduated with core foundations in programming, database systems, object-oriented design, and web development.",
    description:
      "Graduated with foundational expertise across computer programming, software engineering paradigms, relational databases, and modern web development.",
    bullets: [
      "Completed rigorous coursework in C++, JavaScript, Web Technologies, DBMS, and Object-Oriented Software Design.",
      "Built multiple real-world academic projects and actively participated in technical workshops.",
    ],
    skills: ["C++", "JavaScript", "DBMS & SQL", "OOP", "Web Technologies"],
  },
  {
    id: "edu-3",
    type: "education",
    role: "Complete Full-Stack Web Development Bootcamp",
    organization: "Professional Technical Training",
    location: "Online",
    period: "Dec 2024 – Jul 2025",
    status: "Completed",
    shortSummary: "Intensive bootcamp covering full-stack MERN engineering, state management, REST API architecture, and deployment.",
    description:
      "Comprehensive bootcamp covering end-to-end software development across the entire MERN stack, secure authentications, state management, and modern cloud deployment.",
    bullets: [
      "Built and deployed production-grade applications using React, Node.js, Express, and MongoDB.",
      "Mastered RESTful API design, state management with Redux, JWT authentication, and Lighthouse performance optimization.",
    ],
    skills: ["MERN Stack", "Redux", "Authentication", "API Design", "Deployment","PostgreSQL"],
  },
];

const ExperienceSection = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const containerRef = useRef(null);

  const workExperiences = experiences.filter((item) => item.type === "work");
  const educationExperiences = experiences.filter((item) => item.type === "education");

  // Lock body scroll and pause Lenis when modal is open & listen for Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setSelectedItem(null);
      }
    };

    if (selectedItem) {
      document.body.style.overflow = "hidden";
      if (window.lenis) window.lenis.stop();
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
    }

    return () => {
      document.body.style.overflow = "unset";
      if (window.lenis) window.lenis.start();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedItem]);

  useGSAP(() => {
    // Header animation - runs once on mount
    gsap.fromTo(
      ".experience-header-item",
      { opacity: 0, y: -20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Stagger animation for compact cards
    gsap.fromTo(
      ".experience-compact-card",
      { opacity: 0, y: 25 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="experience"
      className="py-14 sm:py-16 md:py-24 px-2 sm:px-4 md:px-6 relative bg-background select-none">
      <div className="w-full max-w-5xl mx-auto px-1 sm:px-2 md:px-0">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 md:mb-16 select-none gap-3 sm:gap-4 px-1 sm:px-0">
          <div>
            <h2 className="experience-header-item text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tighter text-left leading-[0.95]">
              Experience &amp; <br className="hidden sm:inline" /> Education
            </h2>
          </div>

          <span className="experience-header-item text-[11px] sm:text-xs uppercase font-bold tracking-widest text-foreground/50 text-left md:text-right">
            Career &amp; Background
          </span>
        </div>

        {/* 1. Work Experience Sub-section */}
        <div className="mb-10 sm:mb-12 md:mb-16">
          <div className="experience-header-item flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5 text-left px-1 sm:px-0">
            <span className="p-1.5 rounded-lg bg-foreground/5 text-foreground/80 border border-border/60 shrink-0">
              <Briefcase size={14} />
            </span>
            <h3 className="text-xs uppercase font-bold tracking-widest text-foreground/75">
              Work Experience
            </h3>
            <span className="h-px flex-1 bg-border/60 ml-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 items-stretch w-full">
            {workExperiences.map((item) => (
              <CompactCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>

        {/* 2. Education Sub-section */}
        <div>
          <div className="experience-header-item flex items-center gap-2 sm:gap-2.5 mb-4 sm:mb-5 text-left px-1 sm:px-0">
            <span className="p-1.5 rounded-lg bg-foreground/5 text-foreground/80 border border-border/60 shrink-0">
              <GraduationCap size={14} />
            </span>
            <h3 className="text-xs uppercase font-bold tracking-widest text-foreground/75">
              Education &amp; Credentials
            </h3>
            <span className="h-px flex-1 bg-border/60 ml-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 sm:gap-4 md:gap-5 items-stretch w-full">
            {educationExperiences.map((item) => (
              <CompactCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItem(item)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {selectedItem && (
        <div
          role="dialog"
          aria-modal="true"
          data-lenis-prevent="true"
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm transition-all duration-300">
          <div
            onClick={(e) => e.stopPropagation()}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto overscroll-contain modal-scrollable rounded-2xl border border-border bg-card p-4 sm:p-7 md:p-8 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full border border-border text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer focus:outline-none z-10 bg-card/80">
              <X size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Modal Header */}
            <div className="pr-8 mb-4 sm:mb-5">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2.5 sm:mb-3">
                <span className="p-1.5 sm:p-2 rounded-lg bg-foreground/5 text-foreground/80 border border-border/60 shrink-0">
                  {selectedItem.type === "work" ? (
                    <Briefcase size={14} className="sm:w-4 sm:h-4" />
                  ) : (
                    <GraduationCap size={14} className="sm:w-4 sm:h-4" />
                  )}
                </span>
                {selectedItem.status === "Completed" ? (
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] uppercase font-bold tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <CheckCircle2 size={11} className="text-emerald-500" />
                    Completed
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] uppercase font-bold tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Pursuing
                  </span>
                )}
                {selectedItem.mode && (
                  <span className="text-[10px] sm:text-[11px] uppercase font-bold tracking-wider px-2 sm:px-2.5 py-0.5 rounded-full bg-foreground/5 text-foreground/75 border border-border/50">
                    {selectedItem.mode}
                  </span>
                )}
                <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-foreground/5 px-2 sm:px-2.5 py-0.5 rounded-md border border-border/60">
                  {selectedItem.period}
                </span>
              </div>

              <h3 className="text-lg sm:text-2xl font-bold tracking-tight text-foreground leading-snug">
                {selectedItem.role}
              </h3>

              <div className="text-xs sm:text-sm font-semibold text-foreground/80 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1.5">
                <span>{selectedItem.organization}</span>
                <span className="text-foreground/30 hidden xs:inline">•</span>
                <span className="font-normal text-muted-foreground flex items-center gap-1 text-xs">
                  <MapPin size={12} />
                  {selectedItem.location}
                </span>
              </div>

              {/* Tech Stack & Skills Placed Right Under Title & Info */}
              <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-3 border-t border-border/50">
                <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mr-1">
                  Stack:
                </span>
                {selectedItem.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-[11px] sm:text-xs font-medium px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-md bg-foreground/5 text-foreground/85 border border-border/50">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Overview / Description */}
            <div className="mb-4 sm:mb-5 p-3.5 sm:p-4 rounded-xl bg-foreground/[0.03] border border-border/50">
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">
                {selectedItem.description}
              </p>
            </div>

            {/* Detailed Highlights */}
            {selectedItem.bullets && selectedItem.bullets.length > 0 && (
              <div className="pb-1">
                <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-foreground/60 mb-2.5 sm:mb-3">
                  Key Highlights &amp; Responsibilities
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {selectedItem.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                      <CheckCircle2
                        size={14}
                        className="text-foreground/50 shrink-0 mt-0.5 sm:w-[15px] sm:h-[15px]"
                      />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

// Compact Card Component
const CompactCard = ({ item, onClick }) => {
  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="experience-compact-card group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 sm:p-5 transition-all duration-300 hover:border-foreground/40 hover:-translate-y-0.5 hover:shadow-md cursor-pointer text-left select-none w-full">
      <div>
        {/* Top Row: Icon, Status, and View Details Arrow */}
        <div className="flex items-center justify-between gap-2 mb-2.5 sm:mb-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="p-1 sm:p-1.5 rounded-md bg-foreground/5 text-foreground/80 border border-border/60 shrink-0">
              {item.type === "work" ? (
                <Briefcase size={13} className="text-foreground/80 sm:w-3.5 sm:h-3.5" />
              ) : (
                <GraduationCap size={13} className="text-foreground/80 sm:w-3.5 sm:h-3.5" />
              )}
            </span>
            {item.status === "Completed" ? (
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                <CheckCircle2 size={10} className="text-emerald-500" />
                Completed
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                Pursuing
              </span>
            )}
          </div>

          <div className="flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-muted-foreground uppercase tracking-wider group-hover:text-foreground transition-colors shrink-0">
            <span>Details</span>
            <ArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </div>
        </div>

        {/* Role & Org */}
        <h3 className="text-sm sm:text-base font-bold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors leading-snug">
          {item.role}
        </h3>
        <div className="text-[11px] sm:text-xs font-semibold text-foreground/75 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
          <span>{item.organization}</span>
          {item.mode && (
            <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-foreground/5 text-foreground/70 border border-border/50">
              {item.mode}
            </span>
          )}
          <span className="text-foreground/30">•</span>
          <span className="font-normal text-muted-foreground flex items-center gap-1">
            <MapPin size={10} />
            {item.location}
          </span>
        </div>

        {/* Short Summary */}
        <p className="text-xs leading-relaxed text-foreground/60 mt-2 sm:mt-2.5 line-clamp-2">
          {item.shortSummary}
        </p>
      </div>

      {/* Bottom Period & Skill Teasers */}
      <div className="flex items-center justify-between gap-2 pt-2.5 sm:pt-3 mt-3 sm:mt-4 border-t border-border/40 text-[10px] sm:text-[11px] overflow-hidden">
        <span className="font-medium text-muted-foreground flex items-center gap-1 shrink-0">
          <Calendar size={11} className="sm:w-3 sm:h-3" />
          {item.period}
        </span>
        <div className="flex items-center gap-1 min-w-0 justify-end">
          {item.skills.slice(0, 2).map((s) => (
            <span
              key={s}
              title={s}
              className="text-[9px] sm:text-[10px] font-medium px-1.5 sm:px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/70 border border-border/40 truncate max-w-[85px] sm:max-w-[110px]">
              {s}
            </span>
          ))}
          {item.skills.length > 2 && (
            <span className="text-[9px] sm:text-[10px] text-muted-foreground shrink-0 font-medium">
              +{item.skills.length - 2}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;
