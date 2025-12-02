import { ChevronsDown } from "lucide-react";
import Button from "./Button";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="min-h-screen relative flex flex-col items-center justify-center px-4 ">
      <div className="container max-w-4xl mx-auto text-cener z-10 ">
        <div className="space-y-6">
          <h1 className="text-3xl md:text-6xl font-bold tracking-tight">
            <span className="opacity-0 animate-fade-in">Hi, I'm </span>
            <span className="text-primary opacity-0 animate-fade-in-delay-1">
              Himanshu
            </span>
            <span className="text-gradient ml-2 opacity-0 animate-fade-in-delay-2">
              Kumar
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-2-2xl mx-auto opacity-0 animate-fade-in-delay-3">
            MERN stack developer focused on building clean, responsive, and
            functional digital experiences with modern UI and backend logic.
          </p>

          <div className="opacity-0 animate-fade-in-delay-4 ">
            <a href="#projects">
              <Button />
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2  transform -translate-x-1/2  flex flex-col items-center animate-bounce">
        <ChevronsDown className="h-5 w-5  text-primary" />
      </div>
    </section>
  );
};

export default HeroSection;
