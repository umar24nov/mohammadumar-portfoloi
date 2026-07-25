import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";
import { NAV_LINKS } from "../../config/constants";

export default function Navbar({ onFeedback }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

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
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
      className={`fixed top-0 w-full z-50 transition-all duration-500 px-[5vw] ${
        scrolled
          ? theme === "dark"
            ? "bg-[#050b14]/90 backdrop-blur-md border-b border-[#1a3040]"
            : "bg-white/90 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="nav-logo font-orbitron text-sm font-bold text-[#00d4ff] tracking-[2px] bg-transparent border-none cursor-pointer whitespace-nowrap"
        >
          &lt;MOHD UMAR /&gt;
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.08 }}
              whileHover={{ y: -2 }}
              onClick={() => scrollTo(link)}
              className="font-spacemono text-xs text-[#6b8599] tracking-widest bg-transparent border-none cursor-pointer hover:text-[#00d4ff] transition-colors duration-200"
            >
              {link}
            </motion.button>
          ))}

          {/* Theme toggle */}
          <motion.button
            whileHover={{ rotate: 180, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={toggleTheme}
            className="text-lg bg-transparent border-none cursor-pointer"
            title="Toggle theme"
          >
            {theme === "dark" ? "☀️" : "🌙"}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onFeedback}
            className="font-spacemono text-[11px] text-[#ff6b6b] border border-[rgba(255,107,107,0.4)] px-3 py-1.5 rounded bg-transparent cursor-pointer hover:bg-[rgba(255,107,107,0.1)] hover:border-[#ff6b6b] transition-all duration-200 tracking-wide"
          >
            🐛 Report
          </motion.button>
        </div>

        {/* Mobile menu toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen((m) => !m)}
          className="md:hidden text-[#00d4ff] text-2xl bg-transparent border-none cursor-pointer"
        >
          {menuOpen ? "✕" : "☰"}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#050b14]/97 px-[5vw] pb-6 flex flex-col gap-4 overflow-hidden"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link)}
                className="font-spacemono text-sm text-[#e2eaf2] text-left bg-transparent border-none cursor-pointer"
              >
                {link}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              onClick={() => { onFeedback(); setMenuOpen(false); }}
              className="font-spacemono text-sm text-[#ff6b6b] text-left bg-transparent border-none cursor-pointer"
            >
              🐛 Report / Feedback
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
