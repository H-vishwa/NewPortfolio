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

    if (window.lenis) {
      window.lenis.scrollTo(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav
      ref={containerRef}
      className={cn(
        "fixed w-full z-40 transition-all duration-300 border-b border-transparent bg-transparent",
        isScrolled ? "py-3.5 bg-background/90 border-border backdrop-blur-md" : "py-5"
      )}>
      <div className="container flex items-center justify-between">
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "#hero")}
          className="nav-logo text-lg font-bold tracking-tight text-foreground flex items-center">
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

        {/* mobile nav  */}
        <button
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="md:hidden p-2 text-foreground z-50"
          aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}>
          {isMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
        </button>

        <div
          className={cn(
            "fixed min-h-screen inset-0 bg-background/95 backdrop-blur-md z-40 flex flex-col items-center justify-center transition-all duration-300",
            "md:hidden ",
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          )}>
          <div className="flex flex-col items-center space-y-7 text-lg font-medium">
            {navItems.map((item, key) => (
              <a
                href={item.href}
                key={key}
                className="text-foreground/70 hover:text-foreground transition-colors duration-300 uppercase tracking-wider text-sm font-semibold"
                onClick={(e) => handleNavClick(e, item.href)}>
                {item.name}
              </a>
            ))}

            {/* Mobile Resume Link */}
            <a
              href={personalData.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/80 hover:text-foreground transition-colors duration-300 uppercase tracking-wider text-sm font-semibold flex items-center gap-1.5"
              onClick={() => setIsMenuOpen(false)}>
              <span>Resume</span>
              <ArrowUpRight size={14} />
            </a>

            {/* Theme toggle in mobile menu */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="mt-2 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors duration-300 focus:outline-none">
              {isDarkMode ? <Sun className="h-4 w-4 text-yellow-400" /> : <Moon className="h-4 w-4" />}
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
