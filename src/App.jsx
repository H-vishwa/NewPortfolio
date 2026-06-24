import { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    // Expose lenis instance globally for component-level scrollTo calls
    window.lenis = lenis;

    // Synchronize Lenis scrolling with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Update ScrollTrigger on GSAP ticker
    const tick = (time) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    // Disable lag smoothing in GSAP to prevent jarring jumps
    gsap.ticker.lagSmoothing(0);

    return () => {
      // Clean up on unmount
      lenis.destroy();
      window.lenis = null;
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Toaster />
        <Routes>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
