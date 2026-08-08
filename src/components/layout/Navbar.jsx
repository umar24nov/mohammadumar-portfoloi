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
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 20, delay: 0.1 }}
      className="fixed top-0 w-full z-50 px-[5vw]"
      style={{
        backgroundColor: scrolled ? "var(--bg-navbar)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(180%)" : "none",
        borderBottom: scrolled ? "1px solid var(--border-primary)" : "1px solid transparent",
        transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16">
        {/* Logo */}
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="nav-logo font-code text-lg font-bold tracking-[2px] bg-transparent border-none cursor-pointer whitespace-nowrap"
          style={{ color: "var(--text-primary)" }}
        >
          <span className="inline-block">M</span>
          <span className="gradient-text inline-block">U</span>
        </motion.button>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map((link, i) => (
            <motion.button
              key={link}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.06 }}
              whileHover={{ y: -1 }}
              onClick={() => scrollTo(link)}
              className="font-code text-[11px] tracking-[2px] bg-transparent border-none cursor-pointer"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.target.style.color = "var(--accent)")}
              onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
            >
              {link}
            </motion.button>
          ))}

          <motion.button
            whileHover={{ rotate: 90, scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 200 }}
            onClick={toggleTheme}
            className="text-base bg-transparent border-none cursor-pointer"
            title="Toggle theme"
          >
            {theme === "dark" ? "☀" : "☾"}
          </motion.button>

          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            whileHover={{ scale: 1.05, borderColor: "var(--red)" }}
            whileTap={{ scale: 0.95 }}
            onClick={onFeedback}
            className="font-code text-[10px] px-3 py-1.5 rounded-sm bg-transparent cursor-pointer tracking-widest"
            style={{ color: "var(--red)", border: "1px solid rgba(255,71,87,0.3)" }}
          >
            BUG
          </motion.button>
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMenuOpen((m) => !m)}
          className="md:hidden text-xl bg-transparent border-none cursor-pointer font-code"
          style={{ color: "var(--accent)" }}
        >
          {menuOpen ? "✕" : "≡"}
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
            className="md:hidden px-[5vw] pb-6 flex flex-col gap-4 overflow-hidden"
            style={{ backgroundColor: "var(--bg-navbar)" }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(link)}
                className="font-code text-sm text-left bg-transparent border-none cursor-pointer tracking-wide"
                style={{ color: "var(--text-primary)" }}
              >
                {link}
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: NAV_LINKS.length * 0.05 }}
              onClick={() => { onFeedback(); setMenuOpen(false); }}
              className="font-code text-sm text-left bg-transparent border-none cursor-pointer"
              style={{ color: "var(--red)" }}
            >
              BUG / FEEDBACK
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
