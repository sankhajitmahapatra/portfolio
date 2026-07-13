import { useEffect } from "react";
import { X, Calendar, User, Layout, CheckCircle, ArrowRight } from "lucide-react";
import { Project } from "../data";

interface CaseStudyModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyModal({ project, onClose }: CaseStudyModalProps) {
  useEffect(() => {
    // Disable body scroll when modal is open
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  // Support Escape key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-end"
      role="dialog"
      aria-modal="true"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary-bg/90 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
        id="modal-backdrop"
      />

      {/* Content Side Drawer (Slide out from right) */}
      <div
        className="relative w-full max-w-4xl h-full bg-[#0a0a0a] border-l border-border-dark flex flex-col overflow-y-auto shadow-2xl z-10 animate-fade-up"
        id="modal-content"
      >
        {/* Sticky Modal Header */}
        <div className="sticky top-0 bg-[#0a0a0a]/95 backdrop-blur-md border-b border-border-dark/60 py-6 px-8 md:px-12 flex justify-between items-center z-20">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-accent-crimson animate-pulse" />
            <span className="font-mono text-xs text-text-muted tracking-[0.2em] uppercase">
              CASE STUDY // {project.category}
            </span>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 font-mono text-xs text-text-muted hover:text-text-light transition-colors duration-200 focus:outline-none"
            aria-label="Close Case Study"
            id="close-modal-btn"
          >
            CLOSE
            <X className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="relative w-full aspect-video md:aspect-[21/9] bg-secondary-bg overflow-hidden border-b border-border-dark">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover grayscale opacity-80"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 w-full px-8 md:px-12 pb-8">
            <h2 className="font-display font-medium text-4xl md:text-5xl uppercase tracking-tight text-text-light max-w-2xl">
              {project.title}
            </h2>
            <p className="font-mono text-sm text-accent-sage mt-2 tracking-wider">
              {project.description}
            </p>
          </div>
        </div>

        {/* Project Metadata Grid */}
        <div className="px-8 md:px-12 py-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-b border-border-dark bg-secondary-bg/30">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-text-muted">
              <User className="w-4 h-4 text-accent-sage" />
              <span className="font-mono text-[10px] uppercase tracking-widest">CLIENT</span>
            </div>
            <span className="font-display text-sm text-text-light">{project.client}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-text-muted">
              <Calendar className="w-4 h-4 text-accent-sage" />
              <span className="font-mono text-[10px] uppercase tracking-widest">YEAR</span>
            </div>
            <span className="font-display text-sm text-text-light">{project.year}</span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-text-muted">
              <Layout className="w-4 h-4 text-accent-sage" />
              <span className="font-mono text-[10px] uppercase tracking-widest">ROLE</span>
            </div>
            <span className="font-display text-sm text-text-light">{project.role}</span>
          </div>

          <div className="flex flex-col gap-1 col-span-2 md:col-span-1">
            <div className="flex items-center gap-1.5 text-text-muted">
              <CheckCircle className="w-4 h-4 text-accent-crimson" />
              <span className="font-mono text-[10px] uppercase tracking-widest">SERVICES</span>
            </div>
            <div className="flex flex-wrap gap-1 mt-1">
              {project.services.map((service, idx) => (
                <span
                  key={idx}
                  className="bg-primary-bg border border-border-dark px-2 py-0.5 rounded-sm font-mono text-[9px] text-text-muted tracking-wide"
                >
                  {service}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Narrative Section */}
        <div className="px-8 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-12 flex-grow">
          {/* Left Column: Conceptual Overview */}
          <div className="md:col-span-2 flex flex-col gap-8">
            <div>
              <h3 className="font-mono text-[11px] text-accent-sage tracking-[0.2em] uppercase mb-4">
                THE CHALLENGE & STRATEGY
              </h3>
              <p className="font-display text-lg md:text-xl text-text-light font-light leading-relaxed mb-6">
                {project.detailedConcept}
              </p>
            </div>

            <div className="border-t border-border-dark pt-8">
              <h3 className="font-mono text-[11px] text-accent-sage tracking-[0.2em] uppercase mb-4">
                DELIVERABLE DETAILS
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-6">
                Our collaborative framework centered on stripping away superfluous marketing layers. By introducing structured editorial typography grids and desaturated imagery, we designed a visual hierarchy that highlights product essence and authenticity. Every layout choice serves as an extension of the brand's quiet luxury positioning.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-secondary-bg p-4 border border-border-dark rounded-sm">
                  <h4 className="font-mono text-xs text-text-light mb-1">01 / BRAND PLATFORM</h4>
                  <p className="text-xs text-text-muted">Positioning guidelines, values translation, voice matrices.</p>
                </div>
                <div className="bg-secondary-bg p-4 border border-border-dark rounded-sm">
                  <h4 className="font-mono text-xs text-text-light mb-1">02 / VISUAL GRID</h4>
                  <p className="text-xs text-text-muted">Responsive digital frameworks, typesetting guides, scale standards.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Key Outcomes */}
          <div className="flex flex-col gap-8 bg-secondary-bg/20 border border-border-dark p-6 rounded-sm h-fit">
            <div>
              <h3 className="font-mono text-[11px] text-accent-crimson tracking-[0.2em] uppercase mb-4">
                PROJECT METRICS
              </h3>
              <div className="flex flex-col gap-6">
                <div>
                  <span className="font-display text-3xl font-bold text-text-light block">100%</span>
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">PRE-LAUNCH OCCUPANCY</span>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-text-light block">2.4M+</span>
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">ORGANIC REACH IN PRINT</span>
                </div>
                <div>
                  <span className="font-display text-3xl font-bold text-text-light block">3.5X</span>
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-wider block">INVESTMENT RECOVERY RATE</span>
                </div>
              </div>
            </div>

            <div className="border-t border-border-dark pt-6">
              <h3 className="font-mono text-[11px] text-text-muted tracking-[0.15em] uppercase mb-2">
                PROJECT OUTCOME
              </h3>
              <p className="text-xs text-text-muted leading-relaxed">
                {project.outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Modal Bottom Action Banner */}
        <div className="bg-secondary-bg border-t border-border-dark py-8 px-8 md:px-12 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div>
            <h4 className="font-display text-sm font-medium text-text-light uppercase tracking-wide">
              HAVE A SIMILAR STRATEGIC CHALLENGE?
            </h4>
            <p className="text-xs text-text-muted font-mono mt-1">
              Let's align to make your brand presence razor sharp.
            </p>
          </div>
          <button
            onClick={() => {
              onClose();
              const contactSec = document.getElementById("contact");
              if (contactSec) {
                contactSec.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="group flex items-center gap-2 bg-text-light text-primary-bg px-5 py-2.5 text-xs font-mono tracking-widest rounded-sm hover:bg-accent-sage hover:text-primary-bg transition-all duration-300 focus:outline-none"
          >
            DISCUSS PROJECT
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
