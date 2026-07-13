import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { PORTFOLIO_DATA } from "../data";

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { id: "about", label: "ABOUT" },
    { id: "work", label: "SELECTED WORK" },
    { id: "process", label: "PROCESS" },
    { id: "contact", label: "CONTACT" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
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

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-primary-bg/85 backdrop-blur-md border-b border-border-dark/60 py-4"
          : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Left Side: Logo/Name */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, "hero")}
          className="group flex flex-col focus:outline-none"
          id="nav-logo"
        >
          <span className="font-display font-medium text-lg uppercase tracking-widest text-text-light group-hover:text-accent-sage transition-colors duration-200">
            {PORTFOLIO_DATA.personal.firstName}
          </span>
          <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-text-muted">
            {PORTFOLIO_DATA.personal.lastName}
          </span>
        </a>

        {/* Center/Right: Nav items */}
        <nav className="hidden md:flex items-center gap-12" id="desktop-nav">
          {navItems.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`font-mono text-xs tracking-widest relative py-1 focus:outline-none focus:text-accent-crimson transition-colors duration-200 ${
                activeSection === item.id
                  ? "text-text-light"
                  : "text-text-muted hover:text-text-light"
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-accent-crimson" />
              )}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, "contact")}
            className="group flex items-center gap-1 bg-text-light hover:bg-accent-sage text-primary-bg px-4 py-2 text-xs font-mono tracking-widest transition-all duration-300 rounded-sm"
          >
            LET'S TALK
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-250" />
          </a>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-text-light hover:text-accent-sage p-1 transition-colors duration-200 focus:outline-none"
            aria-label="Toggle menu"
            id="mobile-menu-btn"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-xs bg-secondary-bg border-l border-border-dark z-50 transform transition-transform duration-350 ease-out flex flex-col justify-between py-12 px-8 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        id="mobile-drawer"
      >
        <div className="flex flex-col gap-10">
          <div className="flex justify-between items-center border-b border-border-dark pb-6">
            <div className="flex flex-col">
              <span className="font-display font-medium text-base uppercase tracking-widest text-text-light">
                {PORTFOLIO_DATA.personal.firstName}
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-muted">
                {PORTFOLIO_DATA.personal.lastName}
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-text-light hover:text-accent-crimson p-1 focus:outline-none"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <nav className="flex flex-col gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`font-display text-xl tracking-wider uppercase focus:outline-none ${
                  activeSection === item.id
                    ? "text-accent-crimson font-medium"
                    : "text-text-muted hover:text-text-light"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-6 border-t border-border-dark pt-8">
          <a
            href={`mailto:${PORTFOLIO_DATA.personal.email}`}
            className="font-mono text-xs text-text-light tracking-wide hover:text-accent-sage transition-colors duration-200"
          >
            {PORTFOLIO_DATA.personal.email}
          </a>
          <div className="flex gap-4">
            {PORTFOLIO_DATA.socials.slice(0, 3).map((soc) => (
              <a
                key={soc.platform}
                href={soc.url}
                target="_blank"
                rel="noreferrer"
                className="font-mono text-[10px] text-text-muted uppercase tracking-widest hover:text-text-light transition-colors duration-200"
              >
                {soc.platform}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Backdrop overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-primary-bg/70 backdrop-blur-sm z-45 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
}
