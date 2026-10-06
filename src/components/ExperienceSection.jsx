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
  ChevronDown,
} from "lucide-react";
import { experiencesData } from "../data/experience";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ExperienceSection = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [freelanceExpanded, setFreelanceExpanded] = useState(false);
  const containerRef = useRef(null);

  const workExperiences = experiencesData.filter((item) => item.type === "work");
  const educationExperiences = experiencesData.filter((item) => item.type === "education");

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
      className="py-16 sm:py-20 md:py-24 px-4 relative bg-background select-none">
      <div className="w-full max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 select-none gap-3">
          <div>
            <span className="experience-header-item inline-block mr-70 text-xs uppercase font-bold tracking-widest text-foreground/50 mb-2">
              Career &amp; Background
            </span>
            <h2 className="experience-header-item text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tighter text-left leading-[0.95]">
              Experience &amp; <br className="hidden sm:inline" /> Education
            </h2>
          </div>

          <p className="experience-header-item text-xs sm:text-sm text-foreground/60 max-w-xs md:text-right font-medium">
            Academic qualifications paired with production freelance software development.
          </p>
        </div>

        {/* 1. Work Experience Sub-section */}
        <div className="mb-12 sm:mb-16">
          <div className="experience-header-item flex items-center gap-2.5 mb-5 text-left">
            <span className="p-1.5 rounded-lg bg-foreground/5 text-foreground/80 border border-border/60 shrink-0">
              <Briefcase size={14} />
            </span>
            <h3 className="text-xs uppercase font-bold tracking-widest text-foreground/75">
              Work Experience
            </h3>
            <span className="h-px flex-1 bg-border/60 ml-2" />
          </div>

          <div className="grid grid-cols-1 gap-5 w-full text-left">
            {workExperiences.map((item) => (
              <div
                key={item.id}
                className="experience-compact-card rounded-2xl border border-border/80 bg-card p-5 sm:p-7 transition-all duration-300 shadow-2xs hover:border-foreground/30">
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="p-1.5 rounded-md bg-foreground/5 text-foreground/80 border border-border/60 shrink-0">
                        <Briefcase size={14} />
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                        <CheckCircle2 size={11} className="text-emerald-500" />
                        {item.status}
                      </span>
                      <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider bg-foreground/5 px-2.5 py-0.5 rounded-md border border-border/60">
                        {item.period}
                      </span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-bold tracking-tight text-foreground">
                      {item.role}
                    </h3>
                    <div className="text-xs sm:text-sm font-semibold text-foreground/75 flex flex-wrap items-center gap-x-2 gap-y-1 mt-1">
                      <span>{item.organization}</span>
                      <span className="text-foreground/30">•</span>
                      <span className="font-normal text-muted-foreground flex items-center gap-1 text-xs">
                        <MapPin size={11} />
                        {item.location}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setFreelanceExpanded(!freelanceExpanded)}
                      className="px-3.5 py-1.5 rounded-lg border border-border bg-foreground/5 hover:bg-foreground/10 text-foreground text-xs font-semibold uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer">
                      <span>{freelanceExpanded ? "Hide Details" : "Expand Details"}</span>
                      <ChevronDown
                        size={14}
                        className={`transition-transform duration-300 ${freelanceExpanded ? "rotate-180" : ""}`}
                      />
                    </button>
                  </div>
                </div>

                {/* Short summary */}
                <p className="text-xs sm:text-sm leading-relaxed text-foreground/75 mb-3">
                  {item.shortSummary}
                </p>

                {/* Stack chips */}
                <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/40">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground mr-1">
                    Tech Stack:
                  </span>
                  {item.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] sm:text-[11px] font-medium px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/80 border border-border/50">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Expandable Details Panel */}
                {freelanceExpanded && (
                  <div className="mt-4 pt-4 border-t border-border/60 animate-in fade-in slide-in-from-top-2 duration-300 space-y-3">
                    <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-foreground/60">
                      Key Highlights &amp; Responsibilities
                    </h4>
                    <ul className="space-y-2">
                      {item.bullets.slice(0, 3).map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/80 leading-relaxed">
                          <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 2. Education Sub-section (Equal height grid) */}
        <div>
          <div className="experience-header-item flex items-center gap-2.5 mb-5 text-left">
            <span className="p-1.5 rounded-lg bg-foreground/5 text-foreground/80 border border-border/60 shrink-0">
              <GraduationCap size={14} />
            </span>
            <h3 className="text-xs uppercase font-bold tracking-widest text-foreground/75">
              Education &amp; Credentials
            </h3>
            <span className="h-px flex-1 bg-border/60 ml-2" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 items-stretch w-full">
            {educationExperiences.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedItem(item)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setSelectedItem(item);
                  }
                }}
                className="experience-compact-card group relative flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 sm:p-5 transition-all duration-300 hover:border-foreground/40 hover:-translate-y-0.5 hover:shadow-md cursor-pointer text-left select-none h-full">
                <div>
                  {/* Top status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="p-1.5 rounded-md bg-foreground/5 text-foreground/80 border border-border/60 shrink-0">
                      <GraduationCap size={13} />
                    </span>
                    {item.status === "Completed" ? (
                      <span className="inline-flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                        <CheckCircle2 size={10} className="text-emerald-500" />
                        Completed
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 shrink-0">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        Pursuing
                      </span>
                    )}
                  </div>

                  <h3 className="text-sm font-bold tracking-tight text-foreground group-hover:text-foreground/90 transition-colors leading-snug">
                    {item.role}
                  </h3>
                  
                  <div className="text-[11px] font-semibold text-foreground/75 flex flex-wrap items-center gap-1.5 mt-1">
                    <span>{item.organization}</span>
                    {item.mode && (
                      <span className="text-[9px] uppercase font-bold tracking-wider px-1.5 py-0.2 rounded-full bg-foreground/5 text-foreground/70 border border-border/50">
                        {item.mode}
                      </span>
                    )}
                  </div>

                  <p className="text-xs leading-relaxed text-foreground/65 mt-2.5 line-clamp-3">
                    {item.shortSummary}
                  </p>
                </div>

                {/* Bottom details */}
                <div className="pt-3 mt-4 border-t border-border/40 flex items-center justify-between text-[10px]">
                  <span className="font-medium text-muted-foreground flex items-center gap-1">
                    <Calendar size={11} />
                    {item.period}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] font-semibold text-muted-foreground group-hover:text-foreground transition-colors">
                    <span>Details</span>
                    <ArrowUpRight size={11} />
                  </div>
                </div>
              </div>
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
            className="relative w-full max-w-2xl max-h-[88vh] overflow-y-auto overscroll-contain modal-scrollable rounded-2xl border border-border bg-card p-5 sm:p-7 md:p-8 shadow-2xl text-left animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              aria-label="Close modal"
              className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full border border-border text-foreground/60 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer focus:outline-none z-10 bg-card/80">
              <X size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>

            {/* Modal Header */}
            <div className="pr-8 mb-5">
              <div className="flex flex-wrap items-center gap-2 mb-3">
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
                <span className="text-foreground/30">•</span>
                <span className="font-normal text-muted-foreground flex items-center gap-1 text-xs">
                  <MapPin size={12} />
                  {selectedItem.location}
                </span>
              </div>

              {/* Skills */}
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
            <div className="mb-5 p-4 rounded-xl bg-foreground/[0.03] border border-border/50">
              <p className="text-xs sm:text-sm leading-relaxed text-foreground/80">
                {selectedItem.description}
              </p>
            </div>

            {/* Detailed Highlights */}
            {selectedItem.bullets && selectedItem.bullets.length > 0 && (
              <div className="pb-1">
                <h4 className="text-[11px] sm:text-xs uppercase font-bold tracking-widest text-foreground/60 mb-3">
                  Key Highlights &amp; Responsibilities
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {selectedItem.bullets.map((bullet, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground/75 leading-relaxed">
                      <CheckCircle2
                        size={14}
                        className="text-emerald-500 shrink-0 mt-0.5"
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

export default ExperienceSection;
