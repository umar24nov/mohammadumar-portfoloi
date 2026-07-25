import { useState, useEffect } from "react";
import { NAV_LINKS } from "../../config/constants";

export default function Navbar({ onFeedback }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 px-[5vw] ${
        scrolled
          ? "bg-[#050b14]/90 backdrop-blur-md border-b border-[#1a3040]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="nav-logo font-orbitron text-sm font-bold text-[#00d4ff] tracking-[2px] bg-transparent border-none cursor-pointer whitespace-nowrap"
        >
          &lt;MOHD UMAR /&gt;
        </button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-spacemono text-xs text-[#6b8599] tracking-widest bg-transparent border-none cursor-pointer hover:text-[#00d4ff] transition-colors duration-200"
            >
              {link}
            </button>
          ))}
          <button
            onClick={onFeedback}
            className="font-spacemono text-[11px] text-[#ff6b6b] border border-[rgba(255,107,107,0.4)] px-3 py-1.5 rounded bg-transparent cursor-pointer hover:bg-[rgba(255,107,107,0.1)] hover:border-[#ff6b6b] transition-all duration-200 tracking-wide"
          >
            🐛 Report
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((m) => !m)}
          className="md:hidden text-[#00d4ff] text-2xl bg-transparent border-none cursor-pointer"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#050b14]/97 px-[5vw] pb-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className="font-spacemono text-sm text-[#e2eaf2] text-left bg-transparent border-none cursor-pointer"
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => {
              onFeedback();
              setMenuOpen(false);
            }}
            className="font-spacemono text-sm text-[#ff6b6b] text-left bg-transparent border-none cursor-pointer"
          >
            🐛 Report / Feedback
          </button>
        </div>
      )}
    </nav>
  );
}
