import { useState, useEffect, useRef } from "react";
import {
  ArrowUpRight,
  ArrowDown,
  Mail,
  Search,
  Filter,
  ArrowUp,
  MapPin,
  Compass,
  Sparkles,
  ExternalLink,
  Info
} from "lucide-react";
import Header from "./components/Header";
import Marquee from "./components/Marquee";
import CaseStudyModal from "./components/CaseStudyModal";
import { PORTFOLIO_DATA, Project } from "./data";

export default function App() {
  const [activeSection, setActiveSection] = useState("hero");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [portraitUrl, setPortraitUrl] = useState(PORTFOLIO_DATA.personal.portraitUrl);
  
  // Interactive Project Index Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [hoveredRowIdx, setHoveredRowIdx] = useState<number | null>(null);

  // References for sections to observe scrolling
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const processRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = [
      { id: "hero", ref: heroRef },
      { id: "about", ref: aboutRef },
      { id: "work", ref: workRef },
      { id: "process", ref: processRef },
      { id: "contact", ref: contactRef },
    ];

    const observerOptions = {
      root: null,
      rootMargin: "-25% 0px -25% 0px", // Trigger active state when section takes up the center viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((sec) => {
      if (sec.ref.current) {
        observer.observe(sec.ref.current);
      }
    });

    return () => {
      sections.forEach((sec) => {
        if (sec.ref.current) {
          observer.unobserve(sec.ref.current);
        }
      });
    };
  }, []);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  // Filter additional projects index table
  const filteredIndexProjects = PORTFOLIO_DATA.additionalProjects.filter((proj) => {
    const matchesSearch =
      proj.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.role.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      selectedCategory === "ALL" ||
      proj.category.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  const indexCategories = ["ALL", "Brand Identity", "Creative Direction", "Editorial Design", "Digital Experience"];

  return (
    <div className="relative min-h-screen bg-primary-bg text-text-light selection:bg-accent-crimson selection:text-text-light font-sans overflow-hidden">
      {/* Navigation Header */}
      <Header activeSection={activeSection} />

      {/* 1. HERO SECTION */}
      <section
        id="hero"
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-center pt-24 pb-12 overflow-hidden border-b border-border-dark"
      >
        {/* Visual grid line accents (Swiss Layout) */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-border-dark/40" />
        <div className="absolute left-6 md:left-12 top-0 bottom-0 w-[1px] bg-border-dark/20" />
        <div className="absolute right-6 md:right-12 top-0 bottom-0 w-[1px] bg-border-dark/20" />

        <div className="max-w-7xl mx-auto w-full px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10 flex-grow flex items-center">
          
          {/* Left Column: Bold Editorial Typography Statement */}
          <div className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1 relative">
            <div className="absolute -left-4 -top-8 w-8 h-8 font-mono text-[9px] text-accent-crimson tracking-[0.3em] flex items-center justify-center border border-border-dark/60 rounded-full select-none">
              v1
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-sage mb-3 block">
              PORTFOLIO OF SANKHAJIT MAHAPATRA // MUMBAI
            </span>

            {/* Huge display text */}
            <h1 className="font-display font-semibold text-5xl sm:text-7xl md:text-8xl xl:text-[110px] tracking-tighter leading-[0.85] uppercase text-text-light mb-8">
              BUILDING
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-text-light via-text-muted to-border-dark">CODE</span>
              THAT MOVE
            </h1>

            {/* Support notes block */}
            <div className="mt-8 max-w-lg border-l-2 border-accent-crimson pl-6 py-2">
              <p className="font-display text-lg md:text-xl text-text-muted font-light italic leading-relaxed">
                “{PORTFOLIO_DATA.personal.philosophyTitle}”
              </p>
              <p className="text-sm text-text-muted mt-3 leading-relaxed">
                {PORTFOLIO_DATA.personal.shortBio}
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => handleScrollTo("work")}
                className="group flex items-center gap-2 bg-text-light hover:bg-accent-sage text-primary-bg px-6 py-3 text-xs font-mono tracking-widest transition-all duration-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent-crimson"
                id="hero-cta-work"
              >
                VIEW SELECTED WORK
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
              <button
                onClick={() => handleScrollTo("contact")}
                className="group flex items-center gap-2 border border-border-dark hover:border-text-light text-text-light px-6 py-3 text-xs font-mono tracking-widest transition-all duration-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-accent-crimson"
                id="hero-cta-contact"
              >
                CONTACT ME
              </button>
            </div>

            {/* Micro details block */}
            <div className="mt-16 pt-6 border-t border-border-dark/60 grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-xl">
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">FOCUS</span>
                <span className="font-display text-xs text-text-light uppercase tracking-wider block mt-1">SOFTWARE ENGINEERING</span>
              </div>
              <div>
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">GEOGRAPHY</span>
                <span className="font-display text-xs text-text-light uppercase tracking-wider block mt-1">KOLKATA, INDIA</span>
              </div>
              <div className="hidden sm:block">
                <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted block">VERSION</span>
                <span className="font-display text-xs text-text-light uppercase tracking-wider block mt-1">2026 EDITION</span>
              </div>
            </div>
          </div>

          {/* Right Column: Centered Moody Portrait */}
          <div className="lg:col-span-5 flex items-center justify-center order-1 lg:order-2 relative group min-h-[350px] lg:min-h-[450px]">
            {/* Background elements */}
            <div className="absolute w-[90%] aspect-[3/4] border border-border-dark/60 -translate-x-3 translate-y-3 group-hover:-translate-x-1 group-hover:translate-y-1 transition-transform duration-500 rounded-sm" />
            
            {/* Main Portrait Frame */}
            <div className="relative w-[90%] aspect-[3/4] overflow-hidden bg-secondary-bg border border-border-dark rounded-sm z-10 shadow-2xl">
              <img
                src={portraitUrl}
                alt="Sankhajit Mahapatra Portrait"
                className="w-full h-full object-cover object-top"
                referrerPolicy="no-referrer"
              />
              
              {/* Tiny graphic labels inside the frame */}
              <div className="absolute bottom-4 left-4 font-mono text-[9px] text-text-light/80 tracking-widest uppercase bg-primary-bg/80 backdrop-blur-sm px-2.5 py-1 rounded-sm">
                ë. mercer // model 01
              </div>
            </div>

            {/* Elegant compass/coordinates widget on the side */}
            <div className="absolute -right-2 top-1/4 -translate-y-1/2 rotate-90 origin-right hidden xl:flex items-center gap-3 font-mono text-[9px] text-text-muted uppercase tracking-[0.25em]">
              <Compass className="w-3.5 h-3.5 text-accent-crimson -rotate-90 animate-spin-slow" />
              COORD // 40.7128° N, 74.0060° W
            </div>
          </div>
        </div>

        {/* Scroll indicator banner at bottom */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-text-muted animate-bounce pointer-events-none">
          <span className="font-mono text-[9px] uppercase tracking-widest">SCROLL DOWN</span>
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </section>

      {/* 2. ABOUT & POSITIONING SECTION */}
      <section
        id="about"
        ref={aboutRef}
        className="relative py-24 md:py-36 bg-secondary-bg/25 border-b border-border-dark"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative z-10">
          
          {/* Left: Creative Statement & Brand Assets Collage */}
          <div className="lg:col-span-7 flex flex-col gap-10">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-crimson mb-4 block">
                01 / POSITIONING THESIS
              </span>
              <h2 className="font-display font-medium text-3xl md:text-4xl lg:text-5xl uppercase tracking-tight text-text-light leading-tight">
                WRITING CODE THAT FEELS AS CLEAR AS IT IS EFFICIENT.
              </h2>
            </div>

            {/* Collage of generated brand asset cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Asset Box 1: MNLTH */}
              <div className="group relative aspect-video sm:aspect-square bg-primary-bg border border-border-dark p-4 rounded-sm overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: `url(${PORTFOLIO_DATA.featuredProjects[0].image})` }} />
                <div className="flex justify-between items-start z-10">
                  <span className="font-mono text-[9px] text-accent-sage tracking-widest">01 / BRANDING</span>
                  <span className="font-mono text-[9px] text-text-muted">© 2025</span>
                </div>
                <div className="z-10">
                  <h4 className="font-display text-sm font-medium text-text-light uppercase tracking-wide">MNLTH SYSTEM</h4>
                  <p className="text-[11px] text-text-muted font-mono mt-0.5 uppercase tracking-wide">Brutalist Geometry Guidelines</p>
                </div>
              </div>

              {/* Asset Box 2: Aurel Vance Lookbook */}
              <div className="group relative aspect-video sm:aspect-square bg-primary-bg border border-border-dark p-4 rounded-sm overflow-hidden flex flex-col justify-between">
                <div className="absolute inset-0 bg-cover bg-center opacity-30 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none" style={{ backgroundImage: `url(${PORTFOLIO_DATA.featuredProjects[1].image})` }} />
                <div className="flex justify-between items-start z-10">
                  <span className="font-mono text-[9px] text-accent-sage tracking-widest">02 / EDITORIAL</span>
                  <span className="font-mono text-[9px] text-text-muted">© 2025</span>
                </div>
                <div className="z-10">
                  <h4 className="font-display text-sm font-medium text-text-light uppercase tracking-wide">AUREL PUBLICATION</h4>
                  <p className="text-[11px] text-text-muted font-mono mt-0.5 uppercase tracking-wide">Italian Press Serif Layouts</p>
                </div>
              </div>
            </div>

            {/* Quote Block / Philosophy */}
            <div className="bg-secondary-bg border border-border-dark p-8 rounded-sm relative">
              <div className="absolute top-4 right-4 text-accent-sage/30">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-mono text-xs text-text-muted tracking-widest uppercase mb-3">OUR CORE CREED</h4>
              <p className="font-display text-base text-text-light leading-relaxed font-light">
                “{PORTFOLIO_DATA.personal.philosophyStatement}”
              </p>
            </div>
          </div>

          {/* Right: Expertise list, small bio, CV details */}
          <div className="lg:col-span-5 flex flex-col gap-12 lg:sticky lg:top-32">
            <div>
              <h3 className="font-mono text-[10px] uppercase tracking-[0.25em] text-text-muted mb-4 pb-2 border-b border-border-dark/60">
                CREATIVE EXPERTISE
              </h3>
              <p className="text-text-muted text-sm leading-relaxed mb-8">
                Every project is rooted in deep strategy. I operate at the intersection of business intelligence, fine art direction, and meticulous spatial layouts to cultivate strong emotional resonances.
              </p>
              
              {/* Vertical list of core services */}
              <div className="flex flex-col border-t border-border-dark">
                {[
                  { num: "01", name: "BRAND STRATEGY", desc: "Isolating positioning, core messaging, and tone guidelines" },
                  { num: "02", name: "ART DIRECTION", desc: "Crafting atmospheric campaigns, photoshoots, and lookbooks" },
                  { num: "03", name: "VISUAL IDENTITY", desc: "Forging dynamic logo systems, Swiss typography grids, and color standards" },
                  { num: "04", name: "DIGITAL EXPERIENCE", desc: "Coding custom, desaturated web interfaces with heavy attention to detail" },
                  { num: "05", name: "PRODUCT STORYTELLING", desc: "Elevating luxury physical products into compelling tactile and virtual spaces" }
                ].map((serv) => (
                  <div key={serv.num} className="group py-5 border-b border-border-dark flex items-start gap-4 hover:bg-secondary-bg/40 px-3 transition-colors duration-200">
                    <span className="font-mono text-xs text-accent-crimson font-medium">{serv.num}</span>
                    <div>
                      <h4 className="font-display text-sm text-text-light tracking-wide uppercase font-medium">{serv.name}</h4>
                      <p className="text-xs text-text-muted mt-1 leading-relaxed">{serv.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-border-dark/60 pt-6">
              <div>
                <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block">CLIENT SATISFACTION</span>
                <span className="font-display text-xl font-medium text-text-light block mt-1">100% SUCCESS RATE</span>
              </div>
              <div>
                <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block">RECOGNITIONS</span>
                <span className="font-display text-xl font-medium text-text-light block mt-1">FWA & CSS AWARD</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ANGLED RIbbon / TYPOGRAPHY BAND 1 */}
      <div className="relative z-20 py-2 bg-primary-bg overflow-hidden">
        <Marquee
          texts={["TURNING COMPLEXITY INTO CLARITY", "SOFTWARE ENGINEER", "SANKHAJIT MAHAPATRA", "FULL-STACK DEVELOPER"]}
          direction="left"
          rotate="-rotate-1"
          bgClass="bg-[#0c0c0c] border-accent-crimson/30"
          textClass="text-text-light font-medium"
        />
      </div>

      {/* 3. SELECTED WORK SECTION */}
      <section
        id="work"
        ref={workRef}
        className="relative py-24 md:py-36 bg-primary-bg border-b border-border-dark"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-6 border-b border-border-dark">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-crimson mb-3 block">
                02 / FEATURED ARCHIVE
              </span>
              <h2 className="font-display font-medium text-3xl md:text-4xl uppercase tracking-tight text-text-light">
                SELECTED WORK
              </h2>
            </div>
            <p className="font-mono text-xs text-text-muted mt-4 md:mt-0 uppercase tracking-widest max-w-xs md:text-right">
              Meticulously executed brand identities and sensory lookbooks.
            </p>
          </div>

          {/* Editorial Work Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-24">
            {PORTFOLIO_DATA.featuredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group cursor-pointer bg-secondary-bg border border-border-dark rounded-sm overflow-hidden flex flex-col justify-between hover:border-accent-sage transition-all duration-300"
                id={`project-${proj.id}`}
              >
                {/* Image Wrap */}
                <div className="relative aspect-[4/3] bg-[#121212] overflow-hidden border-b border-border-dark">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:scale-[1.04] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Hover detail overlay */}
                  <div className="absolute inset-0 bg-primary-bg/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-text-light text-primary-bg px-4 py-2 text-xs font-mono tracking-widest rounded-sm flex items-center gap-1.5 shadow-2xl">
                      READ CASE STUDY
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                  
                  {/* Tiny floating labels inside the card */}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    {proj.tags.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="bg-primary-bg/90 backdrop-blur-sm border border-border-dark/50 px-2 py-0.5 rounded-sm font-mono text-[8px] text-text-light tracking-wide uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Content Footer */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-mono text-[9px] text-accent-sage uppercase tracking-widest">
                        {proj.category}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">
                        {proj.year}
                      </span>
                    </div>
                    <h3 className="font-display font-medium text-lg uppercase tracking-wide text-text-light group-hover:text-accent-sage transition-colors duration-250">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-text-muted mt-2 leading-relaxed line-clamp-2 font-light">
                      {proj.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-border-dark/60 flex justify-between items-center">
                    <span className="font-mono text-[10px] text-text-muted uppercase">
                      ROLE: {proj.role}
                    </span>
                    <span className="font-mono text-[10px] text-accent-crimson group-hover:translate-x-1.5 transition-transform duration-250 flex items-center gap-1">
                      VIEW CASE →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* PROJECT INDEX TABLE - INTERACTIVE SEARCH & FILTERS */}
          <div className="border border-border-dark p-6 md:p-10 rounded-sm bg-secondary-bg/15 relative">
            <div className="absolute top-4 right-4 text-text-muted/10 font-mono text-[60px] font-bold select-none leading-none">
              INDEX
            </div>

            <div className="mb-10">
              <h3 className="font-display text-lg uppercase tracking-wider text-text-light mb-2">
                ADDITIONAL PROJECT INDEX
              </h3>
              <p className="text-xs text-text-muted font-mono uppercase tracking-widest mb-6">
                A historical log of auxiliary branding campaigns, visual assets, and consultancies.
              </p>

              {/* Filter and Search Bar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-4 border-t border-border-dark/60">
                
                {/* Search Input */}
                <div className="md:col-span-5 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search client, category, or role..."
                    className="w-full bg-primary-bg border border-border-dark py-2 pl-9 pr-4 text-xs font-mono tracking-wide text-text-light rounded-sm focus:outline-none focus:border-accent-sage focus:ring-1 focus:ring-accent-sage placeholder-text-muted"
                  />
                </div>

                {/* Categories filtering options */}
                <div className="md:col-span-7 flex flex-wrap gap-2 md:justify-end">
                  {indexCategories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-sm font-mono text-[9px] tracking-widest uppercase transition-all duration-200 border ${
                        selectedCategory === cat
                          ? "bg-text-light text-primary-bg border-text-light"
                          : "bg-primary-bg text-text-muted border-border-dark hover:text-text-light hover:border-text-light"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Structured Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="border-b border-border-dark text-text-muted font-mono text-[10px] tracking-widest uppercase pb-4">
                    <th className="py-4 font-normal">01 / CLIENT</th>
                    <th className="py-4 font-normal">02 / DISCIPLINE / CATEGORY</th>
                    <th className="py-4 font-normal">03 / POSITION / ROLE</th>
                    <th className="py-4 font-normal text-right">04 / YEAR</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-dark/50">
                  {filteredIndexProjects.length > 0 ? (
                    filteredIndexProjects.map((proj, idx) => (
                      <tr
                        key={idx}
                        className="group text-xs text-text-muted hover:text-text-light transition-colors duration-150 relative cursor-default"
                        onMouseEnter={() => setHoveredRowIdx(idx)}
                        onMouseLeave={() => setHoveredRowIdx(null)}
                      >
                        <td className="py-4 font-display font-medium text-sm text-text-light tracking-wide uppercase flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full transition-colors ${hoveredRowIdx === idx ? 'bg-accent-crimson' : 'bg-transparent'}`} />
                          {proj.client}
                        </td>
                        <td className="py-4 font-mono tracking-wider text-text-muted group-hover:text-accent-sage transition-colors">
                          {proj.category}
                        </td>
                        <td className="py-4 font-mono tracking-wider">
                          {proj.role}
                        </td>
                        <td className="py-4 font-mono tracking-widest text-right text-text-muted group-hover:text-text-light transition-colors">
                          {proj.year}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-xs text-text-muted font-mono uppercase tracking-widest">
                        NO RESULTS MATCH YOUR ARCHIVE SEARCH.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Counter bar */}
            <div className="mt-6 pt-4 border-t border-border-dark flex justify-between items-center font-mono text-[9px] text-text-muted uppercase tracking-widest">
              <span>ARCHIVE DATABASE v2.66</span>
              <span>SHOWING {filteredIndexProjects.length} OF {PORTFOLIO_DATA.additionalProjects.length} RECORDS</span>
            </div>
          </div>

        </div>
      </section>

      {/* ANGLED RIbbon / TYPOGRAPHY BAND 2 */}
      <div className="relative z-20 py-2 bg-primary-bg overflow-hidden">
        <Marquee
          texts={["BUILDING SYSTEMS THAT ENDURE", "AURAL VANCE LOOKBOOK", "MNLTH IDENTITY", "AUREUS OBJECTS"]}
          direction="right"
          rotate="rotate-1"
          bgClass="bg-[#0f0f0f] border-accent-sage/30"
          textClass="text-accent-sage font-medium"
        />
      </div>

      {/* 4. CREATIVE PROCESS SECTION */}
      <section
        id="process"
        ref={processRef}
        className="relative py-24 md:py-36 bg-secondary-bg/15 border-b border-border-dark"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 pb-6 border-b border-border-dark">
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-crimson mb-3 block">
                03 / THE METHODOLOGY
              </span>
              <h2 className="font-display font-medium text-3xl md:text-4xl uppercase tracking-tight text-text-light">
                INSIDE THE CREATIVE PROCESS
              </h2>
            </div>
            <p className="font-mono text-xs text-text-muted mt-4 md:mt-0 uppercase tracking-widest max-w-xs md:text-right">
              Strategic, transparent, and standard-setting workflow.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left side: Guide image & Short Statement */}
            <div className="lg:col-span-5 flex flex-col gap-8 lg:sticky lg:top-32">
              <div className="relative aspect-[4/3] bg-secondary-bg border border-border-dark rounded-sm overflow-hidden shadow-xl group">
                {/* Secondary use of portrait in process as requested */}
                <img
                  src={portraitUrl}
                  alt="Ethan Mercer Process Guide"
                  className="w-full h-full object-cover object-top grayscale brightness-75 scale-105 group-hover:scale-100 transition-transform duration-700 pointer-events-none"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-bg via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div className="flex flex-col">
                    <span className="font-mono text-[9px] text-accent-crimson tracking-widest uppercase">ETHAN MERCER</span>
                    <span className="font-display text-xs text-text-light tracking-wide uppercase mt-0.5">STRATEGIC PRINCIPLE DIRECTOR</span>
                  </div>
                  <span className="font-mono text-[10px] text-text-muted">GUIDE v1</span>
                </div>
              </div>

              <div>
                <h4 className="font-display text-sm font-medium text-text-light uppercase tracking-wide mb-3">
                  A SPACE TO SHARE IDEAS, STRATEGIES, AND SPECIFIC OUTCOMES.
                </h4>
                <p className="text-xs text-text-muted leading-relaxed font-light">
                  We maintain a rigorous standard of creative research. By operating inside a transparent loop of discovery and meticulous typography system deployment, we build distinct milestones that keep projects on schedule and within strategic bounds.
                </p>
              </div>
            </div>

            {/* Right side: 4 process cards */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6" id="process-cards-grid">
              {PORTFOLIO_DATA.processSteps.map((step) => {
                const isFourth = step.number === "04";
                return (
                  <div
                    key={step.number}
                    className={`group p-6 rounded-sm flex flex-col justify-between aspect-square hover:translate-y-[-4px] transition-all duration-300 relative overflow-hidden border ${
                      isFourth
                        ? "bg-accent-crimson text-text-light border-transparent"
                        : "bg-secondary-bg border-border-dark hover:border-accent-sage"
                    }`}
                  >
                    {/* Absolute number in background */}
                    <div className={`absolute -bottom-6 -right-4 font-mono text-[120px] font-bold select-none leading-none transition-colors duration-300 ${
                      isFourth
                        ? "text-[#F2F0EA]/10"
                        : "text-border-dark/15 group-hover:text-accent-sage/10"
                    }`}>
                      {step.number}
                    </div>

                    <div>
                      {/* Header bar */}
                      <div className={`flex justify-between items-center mb-6 border-b pb-3 ${
                        isFourth ? "border-[#F2F0EA]/20" : "border-border-dark/60"
                      }`}>
                        <span className={`font-mono text-xs font-medium ${
                          isFourth ? "text-[#F2F0EA]/70" : "text-accent-crimson"
                        }`}>
                          {step.number} // STAGE
                        </span>
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          isFourth ? "bg-[#F2F0EA]" : "bg-accent-sage group-hover:scale-150 transition-transform"
                        }`} />
                      </div>

                      <h3 className="font-display font-medium text-xl uppercase tracking-wide mb-1">
                        {step.title}
                      </h3>
                      <p className={`font-mono text-[9px] tracking-wider uppercase mb-4 block ${
                        isFourth ? "text-[#F2F0EA]/80" : "text-accent-sage"
                      }`}>
                        {step.label}
                      </p>
                    </div>

                    <p className={`text-xs leading-relaxed z-10 font-light ${
                      isFourth ? "text-[#F2F0EA]/90" : "text-text-muted"
                    }`}>
                      {step.description}
                    </p>
                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </section>

      {/* 5. CONTACT & FOOTER SECTION */}
      <section
        id="contact"
        ref={contactRef}
        className="relative pt-24 pb-12 bg-[#050505] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-16 border-b border-border-dark">
            
            {/* Left side: Dramatic heading, Invitation & Location */}
            <div className="lg:col-span-7 flex flex-col gap-8">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent-crimson mb-4 block">
                  04 / COLLABORATION GATE
                </span>
                <h2 className="font-display font-medium text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-text-light leading-[1.05]">
                  LET’S CREATE SOMETHING MEANINGFUL.
                </h2>
              </div>

              <p className="text-text-muted text-sm md:text-base leading-relaxed max-w-xl font-light">
                Whether you need a bold visual identity, premium creative direction, or an immersive digital lookbook, I am always seeking partners who appreciate precision, beauty, and long-form design.
              </p>

              {/* Location Tag */}
              <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                <MapPin className="w-4 h-4 text-accent-crimson" />
                <span>OPERATING OUT OF NEW YORK, NY // CURRENTLY AVAILABLE FOR GLOBAL WORK</span>
              </div>
            </div>

            {/* Right side: Email CTA & Social Links */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-10">
              
              {/* Direct Mailbox Trigger */}
              <a
                href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                className="group bg-secondary-bg border border-border-dark hover:border-accent-crimson p-8 rounded-sm block transition-all duration-300 hover:shadow-2xl hover:translate-y-[-2px]"
                id="contact-email-card"
              >
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[10px] text-text-muted uppercase tracking-widest">
                    DIRECT COMMUNICATIVE INBOX
                  </span>
                  <Mail className="w-4 h-4 text-accent-crimson group-hover:animate-pulse" />
                </div>
                <span className="font-display text-xl sm:text-2xl text-text-light group-hover:text-accent-crimson transition-colors block font-medium truncate">
                  {PORTFOLIO_DATA.personal.email}
                </span>
                <span className="font-mono text-[9px] text-accent-sage uppercase tracking-widest mt-2 block group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                  TAP TO LAUNCH EMAIL CLIENT <ArrowUpRight className="w-3 h-3" />
                </span>
              </a>

              {/* Social links grid */}
              <div>
                <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest block mb-4">
                  VIRTUAL CHANNELS // NETWORKS
                </span>
                <div className="grid grid-cols-2 gap-4">
                  {PORTFOLIO_DATA.socials.map((soc) => (
                    <a
                      key={soc.platform}
                      href={soc.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex justify-between items-center border border-border-dark/60 hover:border-text-light p-4 rounded-sm font-mono text-xs text-text-muted hover:text-text-light transition-all duration-200"
                    >
                      <span>{soc.platform.toUpperCase()}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-text-muted group-hover:text-accent-sage group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* Footer Bottom Block */}
          <div className="mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
            {/* Quick Micro Credit lines */}
            <div className="flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
              <span className="font-mono text-[9px] text-text-muted uppercase tracking-widest">
                © {new Date().getFullYear()} SANKHAJIT MAHAPATRA PORTFOLIO. ALL RIGHTS RESERVED.
              </span>
              <span className="font-mono text-[8px] text-text-muted/60 uppercase tracking-widest">
                SWISS GRID STANDARD // DEVELOPED FOR THE VISIONARY
              </span>
            </div>

            {/* Anchor navigation footer map */}
            <div className="flex gap-6 font-mono text-[10px] text-text-muted tracking-widest uppercase">
              <a href="#hero" onClick={(e) => { e.preventDefault(); handleScrollTo("hero"); }} className="hover:text-text-light transition-colors">
                HOME
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); handleScrollTo("about"); }} className="hover:text-text-light transition-colors">
                ABOUT
              </a>
              <a href="#work" onClick={(e) => { e.preventDefault(); handleScrollTo("work"); }} className="hover:text-text-light transition-colors">
                WORK
              </a>
              <a href="#process" onClick={(e) => { e.preventDefault(); handleScrollTo("process"); }} className="hover:text-text-light transition-colors">
                PROCESS
              </a>
            </div>

            {/* Scroll-To-Top button */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="group bg-secondary-bg border border-border-dark/80 hover:border-text-light p-3 rounded-full text-text-muted hover:text-text-light transition-all focus:outline-none"
              aria-label="Scroll to top"
              id="scroll-to-top-btn"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Massive Low-Opacity Crop Background Text at the very bottom base of the section */}
          <div className="w-full text-center mt-12 overflow-hidden select-none pointer-events-none h-20 md:h-32 xl:h-44 relative flex items-end justify-center">
            <span className="font-display font-bold text-[8vw] leading-none uppercase text-[#121212]/30 tracking-widest whitespace-nowrap">
              Sankhajit Mahapatra
            </span>
          </div>

        </div>
      </section>

      {/* Case Study Detail Modal Overlay */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
}
