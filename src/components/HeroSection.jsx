import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalData } from "../data/personal";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Center the hero image within its container column
    gsap.set(".hero-profile-container", { xPercent: -50, yPercent: -50 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Fade and scale in the profile image
    tl.fromTo(
      ".hero-profile-container",
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }
    );

    // Stagger animate title letters
    tl.to(
      ".title-letter",
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.04,
        ease: "back.out(1.5)",
      },
      "-=0.8"
    );

    // Fade in decorations, subtitle, CTAs, and bottom info
    tl.to(
      ".hero-decor",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.08,
      },
      "-=0.4"
    );

    // Animate About text column when scrolling into view
    gsap.to(".about-text-content", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#about",
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    // If user prefers reduced motion, skip the intensive scrub animation
    if (prefersReducedMotion) {
      return;
    }

    // Dynamic scroll translation timeline to move and flip the image into the About section placeholder
    const runScrollTrigger = () => {
      const heroImg = containerRef.current?.querySelector(".hero-profile-container");
      const placeholder = containerRef.current?.querySelector(".about-image-placeholder");

      if (!heroImg || !placeholder) return;

      let deltaX = 0;
      let deltaY = 0;
      let deltaW = 1;
      let deltaH = 1;

      const calculateDeltas = () => {
        // Reset transforms temporarily to get a clean layout slate
        gsap.set(heroImg, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotationY: 0 });

        const heroRect = heroImg.getBoundingClientRect();
        const placeholderRect = placeholder.getBoundingClientRect();

        const heroDocLeft = heroRect.left + window.scrollX;
        const heroDocTop = heroRect.top + window.scrollY;
        const placeholderDocLeft = placeholderRect.left + window.scrollX;
        const placeholderDocTop = placeholderRect.top + window.scrollY;

        // Calculate centers to avoid displacement issues when scaling
        const heroCenterX = heroDocLeft + heroRect.width / 2;
        const heroCenterY = heroDocTop + heroRect.height / 2;
        const placeholderCenterX = placeholderDocLeft + placeholderRect.width / 2;
        const placeholderCenterY = placeholderDocTop + placeholderRect.height / 2;

        deltaX = placeholderCenterX - heroCenterX;
        deltaY = placeholderCenterY - heroCenterY;
        deltaW = placeholderRect.width / heroRect.width;
        deltaH = placeholderRect.height / heroRect.height;
      };

      // Initial calculation
      calculateDeltas();

      // Scroll timeline
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: "#hero",
          start: "top top",
          endTrigger: "#about",
          end: "top center",
          scrub: 1.5, // smooth scrubbing transition
          invalidateOnRefresh: true,
          onRefresh: () => {
            calculateDeltas();
          },
        },
      });

      scrollTl.to(heroImg, {
        x: () => deltaX,
        y: () => deltaY,
        scaleX: () => deltaW,
        scaleY: () => deltaH,
        rotationY: 360, // full 3D spin so it lands facing forward
        ease: "power1.inOut",
      });

      // Gradually remove grayscale filter as it scrolls down to the About section
      scrollTl.to(
        heroImg.querySelector("img"),
        {
          filter: "grayscale(0%) contrast(1.0)",
          ease: "power1.inOut",
        },
        0
      );
    };

    // Delay run to let Vite components render fully
    const timeout = setTimeout(runScrollTrigger, 200);
    return () => clearTimeout(timeout);
  }, { scope: containerRef });

  const handleScrollTo = (e, target) => {
    e.preventDefault();
    if (window.lenis) {
      window.lenis.scrollTo(target, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const isReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <div ref={containerRef} style={{ perspective: "1500px" }} className="w-full relative">
      
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen relative z-20 flex flex-col justify-between px-4 sm:px-6 md:px-10 bg-background select-none pt-24 pb-8">
        
        {/* Main 2-Column Hero Grid: Content on Left, Image on Right */}
        <div className="container mx-auto max-w-6xl w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-8 items-center my-auto">
          
          {/* Left Column (7 cols): Typography, Value Prop, Action Buttons */}
          <div className="md:col-span-7 flex flex-col items-start text-left z-20">
            
            {/* Row 1: MERN STACK + Sparkle */}
            <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] font-black uppercase tracking-tighter text-foreground flex items-center leading-[0.95] mb-1 sm:mb-2 select-none">
              <span className="hero-decor text-2xl sm:text-3xl md:text-5xl mr-2 sm:mr-3 text-foreground/50 animate-pulse-subtle opacity-0 translate-y-4">
                ✦
              </span>
              <span className="inline-flex">
                {personalData.titlePrefix.split("").map((char, index) => (
                  <span
                    key={index}
                    className="title-letter relative inline-block opacity-0 translate-y-8"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
            </h1>

            {/* Row 2: DEVELOPER + Lightning */}
            <h1 className="text-4xl sm:text-6xl md:text-6xl lg:text-[4.75rem] xl:text-[5.25rem] font-black uppercase tracking-tighter text-foreground flex items-center leading-[0.95] mb-4 sm:mb-6 select-none">
              <span className="inline-flex">
                {personalData.titleSuffix.split("").map((char, index) => (
                  <span
                    key={index}
                    className="title-letter relative inline-block opacity-0 translate-y-8"
                  >
                    {char}
                  </span>
                ))}
              </span>
              <span className="hero-decor text-2xl sm:text-3xl md:text-5xl ml-2 sm:ml-3 text-foreground/50 opacity-0 translate-y-4">
                ⚡
              </span>
            </h1>

            {/* One-Line Value Proposition Directly Under Headline */}
            <p className="hero-decor text-sm sm:text-base md:text-lg text-foreground/80 max-w-lg font-medium mb-6 sm:mb-8 text-left leading-relaxed opacity-0 translate-y-4">
              {personalData.valueProposition}
            </p>

            {/* Call to Action Buttons */}
            <div className="hero-decor flex flex-wrap items-center gap-3 sm:gap-4 opacity-0 translate-y-4">
              <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
                <button className="cosmic-button uppercase tracking-wider text-xs font-bold px-6 sm:px-7 py-3 cursor-pointer shadow-md">
                  Hire Me
                </button>
              </a>
              <a href="#projects" onClick={(e) => handleScrollTo(e, "#projects")}>
                <button className="px-6 sm:px-7 py-3 rounded-lg border border-border text-foreground font-bold text-xs uppercase tracking-wider transition-colors duration-300 hover:bg-foreground/5 bg-card cursor-pointer">
                  View My Work
                </button>
              </a>
            </div>

            {/* Core Tech Stack Badges */}
            <div className="hero-decor mt-6 sm:mt-7 flex flex-wrap items-center gap-2 opacity-0 translate-y-4 select-none">
              <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/45 mr-1">
                Core Stack:
              </span>
              {["React", "Next.js", "Node.js", "Python", "SQL", "Data Analytics"].map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-semibold text-foreground/75 bg-foreground/5 border border-border/60 px-2.5 py-0.5 rounded-full backdrop-blur-xs">
                  {tech}
                </span>
              ))}
            </div>

          </div>

          {/* Right Column (5 cols): Beautiful Profile Image */}
          <div className="md:col-span-5 flex justify-center items-center relative w-full h-[360px] sm:h-[420px] md:h-[480px]">
            <div
              className="hero-profile-container absolute top-1/2 left-1/2 w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-88 opacity-0 shadow-2xl rounded-3xl overflow-hidden border border-foreground/15 bg-card/50 backdrop-blur-xs"
              style={{ zIndex: 10 }}>
              <img
                src="/ME.webp"
                alt={personalData.name}
                className="w-full h-full object-cover rounded-3xl filter grayscale contrast-[1.10]"
                loading="eager"
                fetchPriority="high"
                decoding="async"
              />
            </div>
          </div>

        </div>

        {/* Bottom Bar: Location & Availability & Developing Since */}
        <div className="container mx-auto max-w-6xl w-full flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-border/30">
          <div className="hero-decor flex items-center gap-2 text-foreground/80 opacity-0 translate-y-4 select-none bg-card/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-border/60">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shrink-0" />
            <span className="text-[10px] sm:text-xs font-semibold tracking-wide">
              {personalData.locationAvailability}
            </span>
          </div>

          <div className="hero-decor hidden sm:block opacity-0 translate-y-4 select-none">
            <span className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-foreground/45">
              / {personalData.developingSince}
            </span>
          </div>
        </div>

      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-16 sm:py-20 md:py-28 px-4 sm:px-6 relative z-10 bg-background overflow-hidden select-none border-t border-border/30"
      >
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
            
            {/* Column 1 (5 cols): Scrolled Image Placeholder (Lands here from Hero) */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div className="about-image-placeholder w-48 h-64 sm:w-56 sm:h-76 md:w-64 md:h-88 rounded-3xl bg-foreground/5 border border-border/40 relative flex items-center justify-center overflow-hidden shadow-md">
                {/* Fallback image for users with prefers-reduced-motion */}
                {isReducedMotion && (
                  <img
                    src="/ME.webp"
                    alt={personalData.name}
                    className="w-full h-full object-cover rounded-3xl filter contrast-[1.05]"
                  />
                )}
              </div>
            </div>

            {/* Column 2 (7 cols): Tidy Bio & CTAs */}
            <div className="md:col-span-7 about-text-content space-y-4 sm:space-y-5 text-left opacity-0 translate-x-8">
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/50">
                About Me
              </span>
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter text-foreground leading-none">
                {personalData.aboutHeading}
              </h3>
              
              <div className="space-y-3 text-sm sm:text-base md:text-lg font-normal leading-relaxed text-foreground/80">
                {personalData.aboutParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#contact"
                  onClick={(e) => handleScrollTo(e, "#contact")}
                  className="cosmic-button uppercase tracking-wider text-xs font-semibold px-6 py-2.5 text-center cursor-pointer">
                  Hire Me
                </a>
                <a
                  href={personalData.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-lg border border-border text-foreground font-semibold text-xs transition-colors duration-300 hover:bg-foreground/5 text-center uppercase tracking-wider">
                  Download CV
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
