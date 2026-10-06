import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ExternalLink,
  Copy,
  Check,
  ChevronDown,
  X,
  Code2,
  BarChart3,
  Terminal,
  Sparkles,
  Filter,
  Clock,
  Calendar,
  Maximize2,
} from "lucide-react";
import { certifications } from "../data/certifications";

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Metadata for distinct category labeling across the section
const categoryMeta = {
  "Full Stack": {
    label: "Full Stack Development",
    shortLabel: "Full Stack",
    description: "End-to-end web engineering, frontend, backend APIs, and systems.",
    icon: Code2,
    badgeClass: "bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/25",
  },
  "Data Analytics": {
    label: "Data Analytics & Insights",
    shortLabel: "Data Analytics",
    description: "Business intelligence, job simulations, data exploration, and visualization.",
    icon: BarChart3,
    badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/25",
  },
  "Programming": {
    label: "Programming Foundations",
    shortLabel: "Programming",
    description: "Core algorithms, data structures, and computer science fundamentals.",
    icon: Terminal,
    badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/25",
  },
  "AI & Tools": {
    label: "AI, Dev Tools & Automation",
    shortLabel: "AI & Tools",
    description: "LLMs, AI agents, developer tooling, and modern automated workflows.",
    icon: Sparkles,
    badgeClass: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/25",
  },
};

const getCategoryBadge = (category) => {
  return (
    categoryMeta[category]?.badgeClass ||
    "bg-foreground/5 text-foreground/75 border-border/50"
  );
};

const getTypeBadge = (type) => {
  switch (type) {
    case "Course":
      return "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20";
    case "Virtual Job Simulation":
    case "Job Simulation":
      return "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20";
    case "Skill Test":
    case "Skill Test & Simulation":
      return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20";
    default:
      return "bg-foreground/5 text-foreground/75 border-border/50";
  }
};

const CertificationsSection = () => {
  const containerRef = useRef(null);
  const [showAll, setShowAll] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [expandedCategories, setExpandedCategories] = useState({});

  // Toggle category expand/collapse state
  const toggleCategory = (cat) => {
    setExpandedCategories((prev) => {
      const next = { ...prev, [cat]: !prev[cat] };
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 60);
      return next;
    });
  };

  // When user clicks a category filter tab, ensure that category is expanded
  const handleSelectCategory = (cat) => {
    setSelectedCategory(cat);
    if (cat !== "All") {
      setExpandedCategories((prev) => ({
        ...prev,
        [cat]: true,
      }));
    }
    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 60);
  };


  // Handle escape key and body scroll lock for lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setLightboxImage(null);
      }
    };

    if (lightboxImage) {
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
  }, [lightboxImage]);

  // Copy code helper with feedback
  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => {
      setCopiedCode(null);
    }, 2000);
  };

  // Predefined category filters for clean display
  const categoriesList = ["All", "Full Stack", "Data Analytics", "Programming", "AI & Tools"];

  // Sorting: priority first, then newest date
  const sortedCertifications = [...certifications].sort((a, b) => {
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return new Date(b.date || 0) - new Date(a.date || 0);
  });

  // Filter logic: category matching and featured threshold
  const displayedCertifications = sortedCertifications.filter((cert) => {
    const matchesCategory =
      selectedCategory === "All" || cert.category === selectedCategory;

    if (!matchesCategory) {
      return false;
    }

    // If viewing "All", show featured only unless "showAll" is toggled or a specific category is chosen
    if (selectedCategory === "All" && !showAll && !cert.featured) {
      return false;
    }

    return true;
  });

  // Group displayed certifications by category
  const orderedCategories = ["Full Stack", "Data Analytics", "Programming", "AI & Tools"];
  const groupedCategories = (
    selectedCategory === "All" ? orderedCategories : [selectedCategory]
  )
    .map((cat) => ({
      category: cat,
      meta:
        categoryMeta[cat] || {
          label: cat,
          shortLabel: cat,
          icon: Code2,
          badgeClass: "bg-foreground/5 text-foreground/75 border-border/50",
        },
      items: displayedCertifications.filter((cert) => cert.category === cat),
    }))
    .filter((group) => group.items.length > 0);

  useGSAP(
    () => {
      // Heading animation
      gsap.fromTo(
        ".cert-heading",
        { opacity: 0, y: -20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // List items entrance animation
      gsap.fromTo(
        ".cert-list-item",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".cert-list",
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    },
    { scope: containerRef }
  );

  const formatDate = (dateString) => {
    if (!dateString || dateString === "TODO") return "Date: TODO";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch {
      return dateString;
    }
  };

  if (!certifications || certifications.length === 0) {
    return null;
  }

  return (
    <section
      ref={containerRef}
      id="certifications"
      className="py-16 sm:py-20 md:py-24 px-4 relative bg-background select-none">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 select-none gap-3">
          <div className="text-left">
            <span className="cert-heading inline-block text-xs uppercase font-bold tracking-widest text-foreground/50 mb-2">
              Credentials &amp; Proof of Work
            </span>
            <h2 className="cert-heading text-4xl sm:text-5xl md:text-6xl font-extrabold uppercase tracking-tighter leading-[0.95]">
              Certifications
            </h2>
          </div>

          <p className="cert-heading text-xs sm:text-sm text-foreground/60 max-w-xs md:text-right font-medium">
            Verified learning, credentials, and job simulations categorized by domain.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-8 sm:mb-10 text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-foreground/45 mr-1 flex items-center gap-1.5">
            <Filter size={12} />
            <span>Category:</span>
          </span>
          {categoriesList.map((cat) => {
            const count =
              cat === "All"
                ? certifications.length
                : certifications.filter((c) => c.category === cat).length;
            const meta = categoryMeta[cat];
            const Icon = meta?.icon;

            return (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                  selectedCategory === cat
                    ? "bg-foreground text-background shadow-xs font-bold"
                    : "bg-card border border-border/80 text-foreground/70 hover:text-foreground hover:border-foreground/40"
                }`}>
                {Icon && (
                  <Icon
                    size={13}
                    className={
                      selectedCategory === cat ? "text-background" : "text-foreground/60"
                    }
                  />
                )}
                <span>{cat}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedCategory === cat
                      ? "bg-background/20 text-background"
                      : "bg-foreground/5 text-foreground/60"
                  }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Certifications Grouped by Category */}
        <div className="cert-list space-y-8 sm:space-y-10">
          {groupedCategories.map(({ category, meta, items }) => {
            const CategoryIcon = meta.icon || Code2;
            const isExpanded = !!expandedCategories[category];

            return (
              <div key={category} className="space-y-3 sm:space-y-4 text-left">
                {/* Category Group Header Label with Collapse / Expand Toggle */}
                <div
                  onClick={() => toggleCategory(category)}
                  className="flex items-center justify-between pb-2.5 border-b border-border/60 cursor-pointer group/cat-header select-none">
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`p-1.5 rounded-lg border transition-transform duration-200 group-hover/cat-header:scale-105 ${meta.badgeClass}`}>
                      <CategoryIcon size={16} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm sm:text-base font-bold text-foreground uppercase tracking-wider group-hover/cat-header:text-foreground/80 transition-colors">
                          {meta.label}
                        </h3>
                        <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/70 border border-border/40">
                          {items.length} {items.length === 1 ? "Credential" : "Credentials"}
                        </span>
                      </div>
                      {meta.description && (
                        <p className="text-[11px] sm:text-xs text-muted-foreground font-medium mt-0.5 hidden sm:block">
                          {meta.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Collapse / Expand Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleCategory(category);
                    }}
                    aria-expanded={isExpanded}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-xl border border-border/80 bg-foreground/5 hover:bg-foreground/10 text-foreground transition-all cursor-pointer shadow-2xs shrink-0">
                    <span>
                      {isExpanded
                        ? "Collapse"
                        : `View ${items.length} ${items.length === 1 ? "Certificate" : "Certificates"}`}
                    </span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 ${
                        isExpanded ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Certificate Cards in this Category */}
                {isExpanded && (
                  <div className="space-y-3 sm:space-y-4 animate-in fade-in-50 duration-200">
                    {items.map((cert) => (
                      <div
                        key={cert.id}
                        className="cert-list-item rounded-2xl border border-border/80 bg-card p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 text-left transition-all duration-300 hover:border-foreground/35 shadow-2xs hover:shadow-sm">
                        {/* Left Side: Thumbnail + Info */}
                        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-1 min-w-0">
                          {/* Uncropped Certificate Thumbnail */}
                          {cert.image && (
                            <div
                              onClick={() =>
                                setLightboxImage({
                                  src: cert.image,
                                  alt: cert.alt || cert.title,
                                  title: cert.title,
                                })
                              }
                              role="button"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  setLightboxImage({
                                    src: cert.image,
                                    alt: cert.alt || cert.title,
                                    title: cert.title,
                                  });
                                }
                              }}
                              className="group/thumb relative w-24 sm:w-28 md:w-32 aspect-[16/10] shrink-0 rounded-xl overflow-hidden border border-border/60 bg-foreground/[0.02] p-1.5 flex items-center justify-center cursor-pointer hover:border-foreground/30 transition-colors">
                              <img
                                src={cert.image}
                                alt={cert.alt || cert.title}
                                loading="lazy"
                                decoding="async"
                                className="w-full h-full object-contain group-hover/thumb:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
                                <Maximize2 size={14} />
                              </div>
                            </div>
                          )}

                          {/* Text Details */}
                          <div className="flex-1 min-w-0">
                            {/* Top Badges & Meta */}
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-1.5">
                              {/* Explicit Category Label Badge */}
                              <span
                                className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getCategoryBadge(
                                  cert.category
                                )}`}>
                                {cert.category}
                              </span>
                              {/* Credential Type Badge */}
                              <span
                                className={`text-[10px] sm:text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${getTypeBadge(
                                  cert.type
                                )}`}>
                                {cert.type}
                              </span>
                              {/* Official Credential ID */}
                              {cert.certificateId && (
                                <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground bg-foreground/5 px-2 py-0.5 rounded-full border border-border/50">
                                  ID: {cert.certificateId}
                                </span>
                              )}
                              {/* Course Duration Hours */}
                              {cert.hours && (
                                <span className="text-[10px] sm:text-[11px] text-muted-foreground font-medium inline-flex items-center gap-1">
                                  <Clock size={11} />
                                  {cert.hours} hrs
                                </span>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-base sm:text-lg font-bold tracking-tight text-foreground leading-snug">
                              {cert.title}
                            </h3>

                            {/* Issuer */}
                            <p className="text-xs sm:text-sm text-foreground/75 font-medium mt-0.5">
                              Issued by <span className="font-semibold text-foreground">{cert.issuer}</span>
                            </p>

                            {/* Topics / Covers chips if present */}
                            {cert.covers && cert.covers.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1">
                                {cert.covers.map((c, i) => (
                                  <span
                                    key={i}
                                    className="text-[10px] font-medium text-foreground/75 bg-foreground/5 px-2 py-0.5 rounded border border-border/40">
                                    {c}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right Side: Date & Verify / Copy Action */}
                        <div className="flex items-center justify-between md:justify-end gap-3 sm:gap-4 shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-border/40">
                          {/* Date */}
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                            <Calendar size={13} />
                            <span>{formatDate(cert.date)}</span>
                          </div>

                          {/* Actions */}
                          {cert.credentialUrl && cert.credentialUrl !== "TODO" ? (
                            <a
                              href={cert.credentialUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity cursor-pointer shadow-2xs">
                              <span>Verify</span>
                              <ExternalLink size={12} />
                            </a>
                          ) : cert.verificationCode || cert.certificateId ? (
                            <div className="flex items-center gap-1.5">
                              <span className="text-[11px] font-mono text-muted-foreground bg-foreground/5 px-2.5 py-1.5 rounded-lg border border-border/60">
                                {cert.verificationCode || cert.certificateId}
                              </span>
                              <button
                                onClick={() =>
                                  handleCopy(cert.verificationCode || cert.certificateId)
                                }
                                className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg border border-border hover:bg-foreground/5 text-foreground transition-colors cursor-pointer"
                                title="Copy Verification Code">
                                {copiedCode ===
                                (cert.verificationCode || cert.certificateId) ? (
                                  <>
                                    <Check size={12} className="text-emerald-500" />
                                    <span className="text-emerald-500 text-[10px]">Copied</span>
                                  </>
                                ) : (
                                  <>
                                    <Copy size={12} />
                                    <span className="text-[10px]">Copy</span>
                                  </>
                                )}
                              </button>
                            </div>
                          ) : (
                            <span className="text-[11px] text-muted-foreground font-medium italic bg-foreground/5 px-2.5 py-1.5 rounded-lg border border-border/40">
                              Pending link
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* View All / Collapse Button (shown when viewing All and there are unfeatured items) */}
        {selectedCategory === "All" &&
          certifications.some((c) => !c.featured) && (
            <div className="mt-8 sm:mt-10 text-center">
              <button
                onClick={() => setShowAll(!showAll)}
                className="px-6 py-2.5 rounded-full border border-border hover:border-foreground/40 bg-card hover:bg-foreground/5 text-foreground text-xs font-semibold uppercase tracking-wider transition-all duration-300 inline-flex items-center gap-2 cursor-pointer shadow-xs">
                <span>
                  {showAll ? "Show Featured Only" : "View All Certificates"}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-300 ${
                    showAll ? "rotate-180" : ""
                  }`}
                />
              </button>
            </div>
          )}
      </div>

      {/* Lightbox Modal: Ensures complete certificate is 100% visible and uncropped */}
      {lightboxImage && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[92vh] bg-card rounded-2xl border border-border overflow-hidden shadow-2xl p-4 sm:p-6 text-left flex flex-col">
            {/* Header with Title and Close Button */}
            <div className="flex items-center justify-between gap-3 mb-3 pb-2 border-b border-border/50">
              <h4 className="text-sm sm:text-base font-bold text-foreground truncate pr-6">
                {lightboxImage.title}
              </h4>
              <button
                onClick={() => setLightboxImage(null)}
                aria-label="Close lightbox"
                className="p-1.5 sm:p-2 rounded-full border border-border text-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-colors cursor-pointer shrink-0">
                <X size={16} />
              </button>
            </div>

            {/* Image Container with Full Containment */}
            <div className="flex-1 min-h-0 flex items-center justify-center p-1 sm:p-2 bg-foreground/[0.02] rounded-xl overflow-hidden">
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-lg drop-shadow-md"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default CertificationsSection;
