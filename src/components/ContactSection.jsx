import { useRef } from "react";
import { Github, Linkedin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const containerRef = useRef(null);

  useGSAP(() => {
    // Slide in left info column
    gsap.fromTo(
      ".contact-info",
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );

    // Slide in image container from the right
    gsap.fromTo(
      ".contact-image-container",
      { opacity: 0, x: 30 },
      {
        opacity: 1,
        x: 0,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="py-14 sm:py-16 md:py-24 relative bg-background overflow-hidden" id="contact">
      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
        {/* Left Column: Heading, subtitle, socials */}
        <div className="contact-info text-left flex flex-col justify-between h-full gap-6 sm:gap-8 md:gap-12 px-4 sm:px-6 md:pl-[max(1.5rem,calc((100vw-64rem)/2+1.5rem))] md:pr-4">
          <div>
            <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-[0.95] mb-3 sm:mb-6 select-none">
              Let's talk.
            </h2>
            <p className="text-xs sm:text-base text-foreground/60 font-medium leading-relaxed max-w-sm mb-6 sm:mb-8">
              I'm a passionate developer always looking for new opportunities. Whether it's a freelance project, collaboration, or just a hello — feel free to reach out.
            </p>

            {/* Contact Details */}
            <div className="space-y-3 sm:space-y-4">
              <div className="flex items-start sm:items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/35 w-14 shrink-0 pt-0.5 sm:pt-0">Email</span>
                <a
                  href="mailto:himanshukumar62028@gmail.com"
                  className="text-xs sm:text-sm font-semibold text-foreground/75 hover:text-foreground transition-colors duration-300 break-all sm:break-normal">
                  himanshukumar62028@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/35 w-14 shrink-0">Mobile</span>
                <a
                  href="tel:+918708567019"
                  className="text-xs sm:text-sm font-semibold text-foreground/75 hover:text-foreground transition-colors duration-300">
                  +91 87085 67019
                </a>
              </div>
              <div className="flex items-start sm:items-center gap-3">
                <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/35 w-14 shrink-0 pt-0.5 sm:pt-0">Based</span>
                <span className="text-xs sm:text-sm font-semibold text-foreground/75">Yamunanagar, Haryana, India</span>
              </div>
            </div>
          </div>

          {/* Social icons row */}
          <div className="flex items-center gap-3 mt-4 md:mt-auto pt-2 sm:pt-0">
            <a
              href="https://github.com/H-vishwa"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/40 bg-card transition-all duration-300">
              <Github size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/himanshu-k-54aba5227/"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/40 bg-card transition-all duration-300">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Right Column: Full Bleed on desktop, neat responsive card on mobile */}
        <div className="contact-image-container relative group overflow-hidden px-4 sm:px-6 md:px-0 flex w-full">
          <div className="relative w-full h-full min-h-[300px] sm:min-h-[360px] md:min-h-[480px]  border md:border-y-0 md:border-l border-border/80 bg-card overflow-hidden shadow-sm">
            <img
              src="/contact.webp"
              alt="Workspace and Development Setup"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
              decoding="async"
            />
            {/* Ambient gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />

            {/* Bottom live status pill overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-center justify-between text-white select-none">
              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 sm:px-3.5 rounded-full border border-white/15 text-[10px] sm:text-xs font-medium text-white/90">
                <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span className="truncate">Available for freelance &amp; full-time roles</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
