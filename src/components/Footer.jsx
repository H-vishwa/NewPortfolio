export default function Footer() {
  return (
    <footer
      className="overflow-hidden relative pt-14 pb-0 px-4"
      style={{ backgroundColor: "#0a0a0f", color: "#f5f5f5" }}>

      {/* Top fade — blends dark footer into the warm beige background above */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-full h-24 pointer-events-none"
      />

      <div className="container mx-auto max-w-5xl">
        {/* Top three-column grid — stacks on mobile */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 pb-12 md:pb-14"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>

          {/* Left – Large Statement */}
          <div className="md:col-span-1">
            <h2
              className="text-3xl md:text-4xl font-extrabold tracking-tight leading-[1.1] select-none text-left"
              style={{ color: "#f5f5f5" }}>
              Building &amp;<br />Crafting Webs<br />for Growth.
            </h2>
          </div>

          {/* Center – Quick Links */}
          <div className="text-left">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              /Quick links
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                { label: "Home", href: "#hero" },
                { label: "About Me", href: "#about" },
                { label: "Skills", href: "#skill" },
                { label: "Works", href: "#projects" },
                { label: "Contact", href: "#contact" },
              ].map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 no-underline"
                  style={{
                    border: "1px solid rgba(255,255,255,0.18)",
                    color: "rgba(255,255,255,0.75)",
                    textDecoration: "none",
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.45)";
                    e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = "rgba(255,255,255,0.75)";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                    e.currentTarget.style.background = "transparent";
                  }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right – Contact */}
          <div className="text-left">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "rgba(255,255,255,0.38)" }}>
              /Contact
            </p>
            <div className="space-y-2">
              <a
                href="mailto:himanshukumar62028@gmail.com"
                className="block text-sm font-semibold transition-colors duration-300"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                  wordBreak: "break-all",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                himanshukumar62028@gmail.com
              </a>
              <a
                href="tel:+918708567019"
                className="block text-sm font-semibold transition-colors duration-300"
                style={{
                  color: "rgba(255,255,255,0.75)",
                  textDecoration: "none",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,0.75)")}>
                +91 87085 67019
              </a>
            </div>
          </div>
        </div>

        {/* Copyright row */}
        <div className="py-5 flex items-center justify-between">
          <p
            className="text-[10px] uppercase font-bold tracking-widest select-none"
            style={{ color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} Himanshu Kumar. All rights reserved.
          </p>
        </div>
      </div>

      {/* Giant watermark — partially off the bottom edge, always visible */}
      <div
        className="w-screen select-none pointer-events-none -mx-4"
        style={{ transform: "translateY(10%)" }}
        aria-hidden="true">
        <p
        className="text-5xl sm:text-9xl md:text-[130px] lg:text-[175px] xl:text-[200px]"
          style={{
            // fontSize: "clamp(60px, 20vw, 200px)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "rgba(255,255,255,0.10)",
            fontWeight: 900,
            textTransform: "uppercase",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}>
          HIMANSHU
        </p>
      </div>
    </footer>
  );
}
