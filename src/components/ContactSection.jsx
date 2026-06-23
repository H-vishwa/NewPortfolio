import { useRef, useState } from "react";
import { Github, Linkedin, Twitter, Youtube } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/useToast";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Slide in left info column
    gsap.to(".contact-info", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-info",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    // Slide in form container from the right
    gsap.to(".contact-form-container", {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".contact-form-container",
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });
  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for reaching out. I'll get back to you as soon as possible.",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <section ref={containerRef} className="py-16 md:py-24 px-3 sm:px-4 relative bg-background" id="contact">
      <div className="container mx-auto max-w-5xl">

        {/* Two-column layout: Left info + Right dark form card */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">

          {/* Left Column: Heading, subtitle, socials */}
          <div className="contact-info opacity-0 -translate-x-12 text-left flex flex-col justify-between h-full gap-10 md:gap-16">
            <div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter text-foreground leading-[0.95] mb-4 sm:mb-6 select-none">
                Let's talk.
              </h2>
              <p className="text-base text-foreground/60 font-medium leading-relaxed max-w-xs mb-8">
                I'm a passionate developer always looking for new opportunities. Whether it's a freelance project, collaboration, or just a hello — feel free to reach out.
              </p>

              {/* Contact Details */}
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/35 w-14 shrink-0">Email</span>
                  <a
                    href="mailto:himanshukumar62028@gmail.com"
                    className="text-sm font-semibold text-foreground/75 hover:text-foreground transition-colors duration-300 truncate">
                    himanshukumar62028@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/35 w-14 shrink-0">Mobile</span>
                  <a
                    href="tel:+918708567019"
                    className="text-sm font-semibold text-foreground/75 hover:text-foreground transition-colors duration-300">
                    +91 87085 67019
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] uppercase font-bold tracking-widest text-foreground/35 w-14 shrink-0">Based</span>
                  <span className="text-sm font-semibold text-foreground/75">Yamunanagar, Haryana</span>
                </div>
              </div>
            </div>

            {/* Social icons row */}
            <div className="flex items-center gap-3 mt-auto">
              <a
                href="https://www.linkedin.com/in/himanshu-k-54aba5227/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-lg border border-border flex items-center justify-center text-foreground/60 hover:text-foreground hover:border-foreground/40 bg-card transition-all duration-300">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Right Column: Dark form card */}
          <div className="contact-form-container opacity-0 translate-x-12 bg-foreground rounded-2xl p-6 md:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="text-left">
                <label
                  htmlFor="name"
                  className="block text-xs font-semibold text-background/60 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-foreground/0 border border-background/15 text-sm text-background placeholder:text-background/35 focus:outline-none focus:border-background/40 font-medium transition-colors duration-300"
                  placeholder="Enter your name"
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="email"
                  className="block text-xs font-semibold text-background/60 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg bg-foreground/0 border border-background/15 text-sm text-background placeholder:text-background/35 focus:outline-none focus:border-background/40 font-medium transition-colors duration-300"
                  placeholder="Enter your email"
                />
              </div>

              <div className="text-left">
                <label
                  htmlFor="message"
                  className="block text-xs font-semibold text-background/60 mb-2">
                  Your Project
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-foreground/0 border border-background/15 text-sm text-background placeholder:text-background/35 focus:outline-none focus:border-background/40 font-medium transition-colors duration-300 resize-none"
                  placeholder="Tell us about your project"
                />
              </div>

              <button
                disabled={isSubmitting}
                className={cn(
                  "w-full py-3.5 rounded-xl bg-background text-foreground font-semibold text-sm tracking-wide hover:opacity-90 transition-all duration-300 cursor-pointer mt-2"
                )}
                type="submit">
                {isSubmitting ? "Sending..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
