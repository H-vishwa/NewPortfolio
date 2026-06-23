import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import resumePDF from "../assets/HimanshuResume.pdf";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Set initial centering transform to avoid CSS conflicts
    gsap.set(".hero-profile-container", { xPercent: -50, yPercent: -50 });

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Fade and scale in the profile image first
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

    // Fade in decorations and corner badges
    tl.to(
      ".hero-decor",
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.1,
      },
      "-=0.4"
    );


    gsap.to(".about-left", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-left",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    gsap.to(".about-right", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-right",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Dynamic scroll translation timeline to move and flip the image into the About section placeholder
    const runScrollTrigger = () => {
      const heroImg = containerRef.current.querySelector(".hero-profile-container");
      const placeholder = containerRef.current.querySelector(".about-image-placeholder");

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
          }
        }
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
      scrollTl.to(heroImg.querySelector("img"), {
        filter: "grayscale(0%) contrast(1.0)",
        ease: "power1.inOut",
      }, 0);
    };

    // Delay run to let Vite components render fully
    const timeout = setTimeout(runScrollTrigger, 200);
    return () => clearTimeout(timeout);
  }, { scope: containerRef });

  const handleScrollTo = (e, target) => {
    e.preventDefault();
    const element = document.querySelector(target);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div ref={containerRef} style={{ perspective: "1500px" }} className="w-full relative">
      
      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen relative z-20 flex flex-col items-center justify-center px-4 bg-background select-none">
        
        {/* Centered Profile Image Wrapper (starts smaller: w-32 h-44 / w-40 h-56) */}
        <div className="hero-profile-container absolute top-[60%] sm:top-[68%] md:top-3/4 left-1/2 w-24 h-32 sm:w-32 sm:h-44 md:w-50 md:h-65 z-20 opacity-0">
          <img
            src="/ME.jpeg"
            alt="Himanshu Kumar"
            className="w-full h-full object-cover rounded-2xl filter grayscale contrast-[1.10]"
            loading="eager"
          />
        </div>

        {/* Massive Overlapping Typography */}
        <div className="relative z-30 flex flex-col items-center justify-center text-center pointer-events-none transform -translate-y-6 sm:-translate-y-10 md:-translate-y-13">
          
          {/* Row 1: MERN STACK + Sparkle */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-black uppercase tracking-tighter text-foreground flex items-center leading-none mb-2 select-none">
            <span className="hero-decor text-3xl sm:text-5xl md:text-7xl mr-4 md:mr-6 text-foreground/60 animate-pulse-subtle opacity-0 translate-y-4">
              ✦
            </span>
            <span className="inline-flex">
              {"MERN STACK".split("").map((char, index) => (
                <span
                  key={index}
                  className="title-letter inline-block opacity-0 translate-y-8"
                >
                  {char === " " ? "\u00A0" : char}
                </span>
              ))}
            </span>
          </h1>

          {/* Row 2: DEVELOPER + Lightning */}
          <h1 className="text-4xl sm:text-6xl md:text-8xl lg:text-[8rem] font-black uppercase tracking-tighter text-foreground flex items-center leading-none select-none">
            <span className="inline-flex">
              {"DEVELOPER".split("").map((char, index) => (
                <span
                  key={index}
                  className="title-letter inline-block opacity-0 translate-y-8"
                >
                  {char}
                </span>
              ))}
            </span>
            <span className="hero-decor text-3xl sm:text-5xl md:text-7xl ml-4 md:ml-6 text-foreground/60 opacity-0 translate-y-4">
              ⚡
            </span>
          </h1>
        </div>

        {/* Bottom Left: Copyright Year */}
        <div className="hero-decor absolute bottom-5 left-5 sm:bottom-8 sm:left-8 md:left-16 text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tighter text-foreground opacity-0 translate-y-4 select-none">
          ©{new Date().getFullYear()}
        </div>

        {/* Bottom Right: Stacked CTAs */}
        <div className="hero-decor absolute bottom-5 right-4 sm:bottom-8 sm:right-8 md:right-16 flex flex-col items-end gap-2 text-right opacity-0 translate-y-4">
          <a href="#contact" onClick={(e) => handleScrollTo(e, "#contact")}>
            <button className="cosmic-button uppercase tracking-wider text-[10px] font-bold px-6 py-2.5">
              Hire Me
            </button>
          </a>
          <a href="#projects" onClick={(e) => handleScrollTo(e, "#projects")}>
            <button className="px-6 py-2.5 rounded-lg border border-border text-foreground font-bold text-[10px] uppercase tracking-wider transition-colors duration-300 hover:bg-foreground/5 bg-card">
              View My Work
            </button>
          </a>
          <span className="text-[9px] uppercase font-bold tracking-widest text-foreground/45 mt-1 select-none">
            / DEVELOPING SINCE 2022
          </span>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-24 px-4 relative z-10 bg-background overflow-hidden select-none"
      >
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 items-start">
            {/* Left Column: Intro */}
            <div className="about-left flex flex-col gap-6 sm:gap-16 md:gap-32 space-y-4 opacity-0 -translate-x-12 text-left">
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-foreground leading-none">Hey!</h3>
              <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-foreground/80">
                I'm Himanshu Kumar, a Full Stack Developer passionate about creating fast, user-centric web applications using the MERN stack.
              </p>
            </div>

            {/* Center Column: Scrolled Image Placeholder (lands larger: w-44 h-60 / w-60 h-80) */}
            <div className="flex justify-center items-center py-6">
              <div className="about-image-placeholder w-44 h-60 md:w-60 md:h-80 rounded-2xl  bg-transparent relative flex items-center justify-center">
                {/* The Hero profile photo will dynamically animate into this box on scroll */}
              </div>
            </div>

            {/* Right Column: Details & CTAs */}
            <div className="about-right space-y-6 opacity-0 translate-x-12 text-left">
              <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed text-foreground/80 md:pt-10">
                Focused on building clean frontends, secure authentication flows, and scalable APIs that solve real-world digital problems.
              </p>
              <div className="flex flex-col gap-2 pt-2">
                <a href="#contact" className="cosmic-button uppercase tracking-wider text-xs font-semibold px-6 py-2.5 text-center">
                  Hire Me
                </a>
                <a
                  href={resumePDF}
                  target="_blank"
                  className="px-6 py-2.5 rounded-lg border border-border text-foreground font-semibold text-xs transition-colors duration-300 hover:bg-foreground/5 text-center uppercase tracking-wider"
                >
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
