import { useRef } from "react";
import { Github, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalData } from "../data/personal";

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

    // Slide in right image column
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
    <section ref={containerRef} className="py-16 sm:py-20 md:py-24 relative bg-background overflow-hidden" id="contact">
      <div className="container mx-auto max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 items-stretch">
          
          {/* Left Column: Heading, Direct details, Socials */}
          <div className="contact-info text-left flex flex-col justify-between space-y-8">
            <div>
              <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 mb-2 inline-block">
                Get In Touch
              </span>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-foreground leading-[0.95] mb-4 select-none">
                Let's talk.
              </h2>
              <p className="text-sm sm:text-base text-foreground/75 font-normal leading-relaxed max-w-md mb-8">
                I'm actively looking for full-time frontend and full-stack MERN roles as well as select freelance projects. Connect directly through email, phone, or LinkedIn.
              </p>

              {/* Contact Details List */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-foreground/70 shrink-0">
                    <Mail size={15} />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 block">Email</span>
                    <a
                      href={`mailto:${personalData.email}`}
                      className="text-xs sm:text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors break-all">
                      {personalData.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-foreground/70 shrink-0">
                    <Phone size={15} />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 block">Phone</span>
                    <a
                      href={`tel:${personalData.phone.replace(/\s+/g, '')}`}
                      className="text-xs sm:text-sm font-semibold text-foreground/90 hover:text-foreground transition-colors">
                      {personalData.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-lg bg-foreground/5 border border-border flex items-center justify-center text-foreground/70 shrink-0">
                    <MapPin size={15} />
                  </span>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 block">Location</span>
                    <span className="text-xs sm:text-sm font-semibold text-foreground/90">
                      {personalData.location}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Enlarged Social Buttons with Text Labels */}
            <div className="pt-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/40 block mb-3">
                Social Profiles
              </span>
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={personalData.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-border bg-card hover:border-foreground/40 text-foreground flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 shadow-2xs">
                  <Github size={18} />
                  <span>GitHub</span>
                </a>
                <a
                  href={personalData.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl border border-border bg-card hover:border-foreground/40 text-foreground flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider transition-all duration-300 hover:-translate-y-0.5 shadow-2xs">
                  <Linkedin size={18} />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Workspace Image */}
          <div className="contact-image-container relative rounded-2xl overflow-hidden border border-border/80 bg-card shadow-sm group min-h-[360px] md:min-h-[440px] flex flex-col justify-end">
            <img
              src="/contact.webp"
              alt="Developer workspace"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            {/* Ambient vignette gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

            {/* Status overlay badge */}
            <div className="relative z-10 p-5 sm:p-6 text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-white shadow-sm mb-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider">
                  Available for Hire
                </span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm font-medium drop-shadow-xs">
                Open to full-time roles, contracts, and exciting engineering challenges.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
