import { useEffect, useState, useRef } from "react";
import { cn } from "../lib/utils";
import { MenuIcon, X, Moon, Sun, ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { personalData } from "../data/personal";

// Register ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skill" },
  { name: "Experience", href: "#experience" },
  { name: "Certificates", href: "#certifications" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

const NavBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored === "dark") {
        document.documentElement.classList.add("dark");
        return true;
      }
    }
    return false;
  });
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll and handle escape key when mobile menu is active
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };

    if (isMenuOpen) {
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
  }, [isMenuOpen]);

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

  // Entrance animations for navbar
  useGSAP(() => {
    gsap.from(".nav-logo", {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".nav-link-item", {
      opacity: 0,
      y: -20,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, { scope: containerRef });

  // Custom smooth scroll handler using GSAP ScrollTo / Lenis
  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    // Give state a tick to unlock scroll
    setTimeout(() => {
      if (window.lenis) {
        window.lenis.scrollTo(href);
      } else {
        const element = document.querySelector(href);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }, 50);
  };

  return (
    <nav
      ref={containerRef}
      className={cn(
        "fixed w-full z-40 transition-all duration-300 border-b border-transparent bg-transparent",
        isScrolled ? "py-3 bg-background/90 border-border backdrop-blur-md shadow-xs" : "py-4 sm:py-5"
      )}>
      <div className="container flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="nav-logo text-base sm:text-lg font-bold tracking-tight text-foreground flex items-center py-1">
          <span className="relative z-10">
            <span className="text-foreground">Himanshu</span>
            <span className="text-muted-foreground font-normal">.dev</span>
          </span>
        </a>

        {/* desktop nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navItems.map((item, key) => (
            <a
              href={item.href}
              key={key}
              onClick={(e) => handleNavClick(e, item.href)}
              className="nav-link-item text-xs font-semibold uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors duration-300">
              {item.name}
            </a>
          ))}

          {/* Resume / CV button */}
          <a
            href={personalData.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link-item px-3 py-1.5 rounded-lg border border-border text-foreground/80 hover:text-foreground text-xs font-semibold uppercase tracking-wider transition-colors duration-300 hover:bg-foreground/5 flex items-center gap-1">
            <span>Resume</span>
            <ArrowUpRight size={13} />
          </a>

          {/* Theme toggle — inline with nav links */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="nav-link-item p-1.5 rounded-full cursor-pointer text-foreground/60 hover:text-foreground transition-colors duration-300 focus:outline-none">
            {isDarkMode
              ? <Sun className="h-4 w-4 text-yellow-400" />
              : <Moon className="h-4 w-4" />}
          </button>
        </div>

        {/* mobile actions (theme toggle + menu button) */}
        <div className="flex md:hidden items-center gap-2 z-50">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-lg border border-border/70 bg-card/70 text-foreground/75 hover:text-foreground transition-colors focus:outline-none">
            {isDarkMode ? <Sun size={17} className="text-yellow-400" /> : <Moon size={17} />}
          </button>

          <button
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg border border-border/70 bg-card/70 text-foreground focus:outline-none"
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}>
            {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>

        {/* Full-screen mobile menu drawer */}
        <div
          className={cn(
            "fixed inset-0 min-h-dvh bg-background/98 backdrop-blur-xl z-40 flex flex-col items-center justify-start overflow-y-auto py-24 px-6 transition-all duration-300 md:hidden",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}>
          <div className="w-full max-w-xs flex flex-col items-center space-y-3.5 my-auto">
            {navItems.map((item, key) => (
              <a
                href={item.href}
                key={key}
                className="w-full text-center py-2.5 px-4 rounded-xl text-foreground/75 hover:text-foreground hover:bg-foreground/5 active:bg-foreground/10 transition-colors uppercase tracking-wider text-sm font-bold"
                onClick={(e) => handleNavClick(e, item.href)}>
                {item.name}
              </a>
            ))}

            {/* Mobile Resume Link */}
            <a
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full text-center py-2.5 px-4 rounded-xl border border-border bg-foreground/5 hover:bg-foreground/10 text-foreground transition-colors uppercase tracking-wider text-sm font-bold flex items-center justify-center gap-1.5 mt-2"
              onClick={() => setIsMenuOpen(false)}>
              <span>View Resume</span>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
