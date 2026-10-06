import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import StarBackground from "../components/StarBackground";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
      <StarBackground />
      <div className="relative z-10 max-w-md">
        <span className="text-xs uppercase font-bold tracking-widest text-foreground/50 mb-3 block">
          404 Not Found
        </span>
        <h1 className="text-5xl sm:text-6xl font-extrabold uppercase tracking-tight mb-4">
          Page Lost
        </h1>
        <p className="text-foreground/75 text-sm sm:text-base mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity shadow-sm">
          <ArrowLeft size={14} />
          <span>Return Home</span>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
