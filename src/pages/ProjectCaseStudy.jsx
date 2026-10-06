import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Github,
  CheckCircle2,
  Cpu,
  ShieldAlert,
  ShieldCheck,
  Code2,
  Database,
  Server,
  Moon,
  Sun,
  Flame,
} from "lucide-react";
import { projectsData } from "../data/projects";
import StarBackground from "../components/StarBackground";
import Footer from "../components/Footer";

export default function ProjectCaseStudy() {
  const { slug } = useParams();

  // Find current project
  const currentIndex = projectsData.findIndex((p) => p.slug === slug);
  const project = projectsData[currentIndex];

  // Dark mode state synchronization
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return typeof document !== "undefined" && document.documentElement.classList.contains("dark");
  });

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  // If project not found
  if (!project) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center">
        <StarBackground />
        <div className="relative z-10 max-w-md">
          <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 mb-3 block">
            404 Error
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight mb-4">
            Case Study Not Found
          </h1>
          <p className="text-foreground/70 text-sm mb-6">
            The project case study you are looking for doesn't exist or has been relocated.
          </p>
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity">
            <ArrowLeft size={14} />
            <span>Back to Projects</span>
          </Link>
        </div>
      </div>
    );
  }

  // Next and Previous projects for easy browsing
  const prevProject =
    currentIndex > 0 ? projectsData[currentIndex - 1] : projectsData[projectsData.length - 1];
  const nextProject =
    currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : projectsData[0];

  return (
    <div className="min-h-screen bg-background text-foreground relative selection:bg-foreground selection:text-background">
      {/* Background Particles  */}
      <StarBackground />

      {/* Top Sticky Header */}
      <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border/80 transition-all">
        <div className="container mx-auto max-w-5xl px-4 py-3.5 flex items-center justify-between">
          <Link
            to="/#projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors group">
            <span className="w-7 h-7 rounded-full border border-border flex items-center justify-center bg-card group-hover:border-foreground/30 transition-colors">
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-0.5" />
            </span>
            <span className="hidden sm:inline">Back to Projects</span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="p-2 rounded-full border border-border bg-card text-foreground/80 hover:text-foreground hover:bg-foreground/5 transition-colors">
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Code button */}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-foreground/80 hover:text-foreground text-xs font-semibold uppercase tracking-wider transition-colors hover:bg-foreground/5">
                <Github size={13} />
                <span>Code</span>
              </a>
            )}

            {/* Live Demo button */}
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-border bg-foreground text-background hover:opacity-90 text-xs font-semibold uppercase tracking-wider transition-opacity shadow-xs">
                <span>Live Demo</span>
                <ExternalLink size={13} />
              </a>
            )}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="container mx-auto max-w-5xl px-4 py-10 sm:py-14 md:py-16 relative z-10 text-left">
        
        {/* Hero Section */}
        <div className="mb-10 sm:mb-14 text-left">
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-foreground/10 text-foreground">
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1 rounded-full border border-border bg-card text-foreground/80">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              {project.status || "Completed"}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tight leading-[1.05] mb-4">
            {project.title}
          </h1>

          <p className="text-base sm:text-xl text-foreground/80 font-normal max-w-3xl leading-relaxed mb-8">
            {project.tagline || project.description}
          </p>

          {/* Quick Meta Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-xs">
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                Role
              </span>
              <p className="text-xs sm:text-sm font-semibold text-foreground">
                {project.role}
              </p>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                Timeline
              </span>
              <p className="text-xs sm:text-sm font-semibold text-foreground">
                {project.timeline}
              </p>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                Focus Area
              </span>
              <p className="text-xs sm:text-sm font-semibold text-foreground">
                {project.category}
              </p>
            </div>
            <div className="text-left">
              <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/50 block mb-1">
                Deliverable
              </span>
              <p className="text-xs sm:text-sm font-semibold text-foreground">
                Web App &amp; API
              </p>
            </div>
          </div>
        </div>

        {/* Hero Image Showcase */}
        <div className="mb-14 sm:mb-20">
          <div className="relative group overflow-hidden rounded-2xl border border-border/80 bg-card shadow-xl">
            <img
              src={project.imageUrl}
              alt={`${project.title} preview`}
              className="w-full aspect-[16/9] sm:aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.01]"
            />
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 bg-black/75 hover:bg-black/90 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wider uppercase inline-flex items-center gap-1.5 transition-all shadow-md">
                <span>View Live Site</span>
                <ArrowUpRight size={13} />
              </a>
            )}
          </div>
        </div>

        {/* Section: Overview */}
        <section className="mb-14 sm:mb-20 text-left">
          <div className="mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 block mb-2">
              01 // Overview
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              Project In Depth
            </h2>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
            <p className="text-sm sm:text-base text-foreground/85 leading-relaxed font-normal">
              {project.overview}
            </p>
          </div>
        </section>

        {/* Section: The Problem vs The Solution */}
        <section className="mb-14 sm:mb-20">
          <div className="mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 block mb-2">
              02 // The Challenge &amp; Solution
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              Understanding The Core Need
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* The Problem */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 relative overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
                <ShieldAlert size={18} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-3">
                The Problem
              </h3>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-7 relative overflow-hidden">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-4">
                <ShieldCheck size={18} />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-3">
                The Solution
              </h3>
              <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </section>

        {/* Section: Key Features */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <section className="mb-14 sm:mb-20">
            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 block mb-2">
                03 // Core Capabilities
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                Key Features &amp; Architecture Highlights
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {project.keyFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 transition-all hover:border-foreground/30 hover:shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-7 h-7 rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-xs font-bold text-foreground/70">
                      0{idx + 1}
                    </span>
                    <h3 className="text-base font-bold text-foreground">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/70 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Technical Stack & Architecture */}
        <section className="mb-14 sm:mb-20">
          <div className="mb-6">
            <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 block mb-2">
              04 // Engineering Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
              Architecture &amp; Technology Stack
            </h2>
          </div>

          <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {project.architecture?.frontend && (
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-foreground/5 border border-border shrink-0">
                    <Code2 size={18} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1">
                      Frontend Interface
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                      {project.architecture.frontend}
                    </p>
                  </div>
                </div>
              )}

              {project.architecture?.backend && (
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-foreground/5 border border-border shrink-0">
                    <Server size={18} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1">
                      Backend &amp; API Layer
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                      {project.architecture.backend}
                    </p>
                  </div>
                </div>
              )}

              {project.architecture?.database && (
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-foreground/5 border border-border shrink-0">
                    <Database size={18} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1">
                      Database &amp; Data Models
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                      {project.architecture.database}
                    </p>
                  </div>
                </div>
              )}

              {(project.architecture?.aiIntegration ||
                project.architecture?.backgroundEngine ||
                project.architecture?.security) && (
                <div className="flex items-start gap-3.5">
                  <div className="p-2.5 rounded-xl bg-foreground/5 border border-border shrink-0">
                    <Cpu size={18} className="text-foreground" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-foreground/60 mb-1">
                      Specialized Engine &amp; Services
                    </h4>
                    <p className="text-xs sm:text-sm text-foreground/90 font-medium">
                      {project.architecture.aiIntegration ||
                        project.architecture.backgroundEngine ||
                        project.architecture.security}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Tags Pills */}
            <div className="pt-6 border-t border-border/60">
              <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/50 block mb-3">
                Technologies &amp; Libraries Used
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs font-medium px-3 py-1 rounded-lg bg-foreground/5 text-foreground/80 border border-border/60">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Section: Technical Challenges Overcome */}
        {project.challenges && project.challenges.length > 0 && (
          <section className="mb-14 sm:mb-20">
            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 block mb-2">
                05 // Problem Solving
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                Engineering Challenges &amp; Solutions
              </h2>
            </div>

            <div className="space-y-4">
              {project.challenges.map((item, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl border border-border/80 bg-card p-5 sm:p-6 text-left">
                  <div className="flex items-start gap-3 mb-2">
                    <Flame size={16} className="text-amber-500 shrink-0 mt-0.5" />
                    <h3 className="text-sm sm:text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/75 leading-relaxed pl-7">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Section: Results & Outcomes */}
        {project.results && project.results.length > 0 && (
          <section className="mb-14 sm:mb-20">
            <div className="mb-6">
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 block mb-2">
                06 // Impact
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight">
                Outcomes &amp; Key Takeaways
              </h2>
            </div>

            <div className="rounded-2xl border border-border/80 bg-card p-6 sm:p-8">
              <div className="space-y-3.5">
                {project.results.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-foreground/80 leading-relaxed">
                      {result}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Action Banner */}
        <section className="mb-16 sm:mb-24 rounded-3xl border border-border/80 bg-card p-8 sm:p-12 text-center relative overflow-hidden">
          <div className="max-w-2xl mx-auto relative z-10">
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight mb-4">
              Explore {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-foreground/70 mb-8 leading-relaxed">
              Experience the deployed application in your browser or inspect the source repository on GitHub.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-sm">
                  <span>Launch Live Demo</span>
                  <ExternalLink size={14} />
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border bg-card text-foreground font-semibold text-xs uppercase tracking-wider hover:bg-foreground/5 transition-colors">
                  <Github size={14} />
                  <span>View Repository</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Next / Previous Project Navigation */}
        <section className="pt-8 border-t border-border/60">
          <span className="text-[10px] font-bold uppercase tracking-widest text-foreground/50 block mb-4 text-center sm:text-left">
            Continue Reading
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Previous Project */}
            <Link
              to={`/projects/${prevProject.slug}`}
              className="group rounded-2xl border border-border/80 bg-card p-5 flex items-center justify-between hover:border-foreground/30 transition-all text-left">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-card group-hover:border-foreground/30 transition-colors">
                  <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-0.5" />
                </span>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/50 block">
                    Previous Project
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {prevProject.title}
                  </span>
                </div>
              </div>
            </Link>

            {/* Next Project */}
            <Link
              to={`/projects/${nextProject.slug}`}
              className="group rounded-2xl border border-border/80 bg-card p-5 flex items-center justify-between hover:border-foreground/30 transition-all text-right">
              <div className="flex items-center justify-end gap-3 w-full">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/50 block">
                    Next Project
                  </span>
                  <span className="text-sm font-bold text-foreground">
                    {nextProject.title}
                  </span>
                </div>
                <span className="w-8 h-8 rounded-full border border-border flex items-center justify-center bg-card group-hover:border-foreground/30 transition-colors">
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
