import { ArrowUp } from "lucide-react";
import { personalData } from "../data/personal";

export default function Footer() {
  const scrollToTop = () => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { duration: 1.5 });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const navLinks = [
    { label: "Home", href: "/#hero" },
    { label: "About Me", href: "/#about" },
    { label: "Skills", href: "/#skill" },
    { label: "Experience", href: "/#experience" },
    { label: "Certificates", href: "/#certifications" },
    { label: "Projects", href: "/#projects" },
    { label: "Contact", href: "/#contact" },
  ];

  return (
    <footer
      className="overflow-hidden relative pt-14 pb-0 px-4"
      style={{ backgroundColor: "#0a0a0f", color: "#f5f5f5" }}>

      <div className="container mx-auto max-w-5xl">
        {/* Top three-column grid */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-12 md:pb-14"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Left – Statement */}
          <div className="md:col-span-1 text-left">
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] select-none text-left"
              style={{ color: "#f5f5f5" }}>
              Building &amp;<br />Crafting Modern<br />Web Experiences.
            </h2>
            <p className="text-xs text-white/50 mt-4 leading-relaxed font-normal">
              Specialized in scalable MERN architectures, responsive interfaces, and production-ready applications.
            </p>
          </div>

          {/* Center – Quick Navigation Links */}
          <div className="text-left">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              /Navigation
            </p>
            <div className="flex flex-wrap gap-2">
              {navLinks.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 no-underline"
                  style={{
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.background = "transparent";
                  }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right – Status & Back to Top (De-duplicated) */}
          <div className="text-left flex flex-col justify-between">
            <div>
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: "rgba(255,255,255,0.38)" }}>
                /Status &amp; Availability
              </p>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="text-xs font-medium text-white/80">
                  {personalData.availability}
                </span>
              </div>
              <p className="text-xs text-white/50">
                Based in {personalData.location}
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={scrollToTop}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-white/15 text-white/70 hover:text-white hover:border-white/40 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer bg-white/5">
                <span>Back to Top</span>
                <ArrowUp size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Copyright row */}
        <div className="py-5 flex items-center justify-between">
          <p
            className="text-[10px] uppercase font-bold tracking-widest select-none"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} {personalData.name}. All rights reserved.
          </p>
          <span
            className="text-[10px] uppercase font-bold tracking-widest select-none"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            {personalData.developingSince}
          </span>
        </div>
      </div>

      {/* Giant watermark */}
      <div
        className="w-screen select-none pointer-events-none -mx-4"
        style={{ transform: "translateY(10%)" }}
        aria-hidden="true">
        <p
          className="text-5xl sm:text-9xl md:text-[130px] lg:text-[175px] xl:text-[200px]"
          style={{
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.10)",
            fontWeight: 900,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}>
          HIMANSHU
        </p>
      </div>
    </footer>
  );
}
