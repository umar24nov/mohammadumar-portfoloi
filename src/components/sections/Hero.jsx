import { motion } from "framer-motion";
import useTypewriter from "../../hooks/useTypewriter";
import LottieCube from "../ui/LottieCube";
import { TYPEWRITER_WORDS, SOCIAL_LINKS } from "../../config/constants";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const lineReveal = {
  hidden: { scaleX: 0 },
  show: { scaleX: 1, transition: { duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.8 } },
};

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_WORDS);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-[5vw] relative z-10 grid-bg pt-20 md:pt-24"
    >
      {/* Ambient glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(255,107,53,0.12) 0%, transparent 70%)" }}
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.18, 0.1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute w-[400px] h-[400px] rounded-full pointer-events-none bottom-1/3 right-1/4 translate-x-1/2 translate-y-1/2"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)" }}
      />

      {/* Rotating wireframe cube flanking backdrops */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0.6, 0.85, 0.6], scale: [1, 1.04, 1] }}
        transition={{
          opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-1/2 -translate-y-1/2 left-[2%] 2xl:left-[5%] pointer-events-none z-0"
      >
        <div className="w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] md:w-[190px] md:h-[190px] lg:w-[230px] lg:h-[230px] xl:w-[260px] xl:h-[260px] 2xl:w-[340px] 2xl:h-[340px]">
          <LottieCube />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: [0.6, 0.85, 0.6], scale: [1, 1.04, 1] }}
        transition={{
          opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute top-1/2 -translate-y-1/2 right-[2%] 2xl:right-[5%] pointer-events-none z-0"
      >
        <div className="w-[110px] h-[110px] sm:w-[150px] sm:h-[150px] md:w-[190px] md:h-[190px] lg:w-[230px] lg:h-[230px] xl:w-[260px] xl:h-[260px] 2xl:w-[340px] 2xl:h-[340px]">
          <LottieCube />
        </div>
      </motion.div>

      <motion.div variants={container} initial="hidden" animate="show" className="max-w-[820px] text-center relative z-10">
        {/* Terminal status line */}
        <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-8">
          <motion.div
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: "var(--green)", boxShadow: "0 0 8px var(--green)" }}
          />
          <span className="font-code text-[11px] tracking-[4px]" style={{ color: "var(--green)" }}>
            STATUS: AVAILABLE FOR HIRE
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp} className="font-code font-bold text-[clamp(36px,7.5vw,76px)] leading-[1.05] m-0 tracking-tight">
          <span style={{ color: "var(--text-primary)" }}>MOHD </span>
          <span className="gradient-text">UMAR</span>
        </motion.h1>

        {/* Accent line */}
        <motion.div variants={lineReveal} className="h-[2px] mx-auto mt-5 mb-6 origin-left max-w-[200px]" style={{ background: "var(--gradient-accent)" }} />

        <motion.div variants={fadeUp} className="h-10 mt-2">
          <span className="font-mono text-[clamp(14px,2.5vw,20px)]" style={{ color: "var(--text-secondary)" }}>
            {typed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.7, repeat: Infinity }}
              className="inline-block w-[2px] h-[1em] ml-1 align-middle"
              style={{ backgroundColor: "var(--accent)" }}
            />
          </span>
        </motion.div>

        <motion.p variants={fadeUp} className="font-body text-[clamp(14px,1.8vw,17px)] mt-7 leading-relaxed max-w-[540px] mx-auto" style={{ color: "var(--text-secondary)" }}>
          CS fresher shipping real-world solutions — from study platforms
          to ML performance prediction engines.
        </motion.p>

        <motion.div variants={fadeUp} className="flex gap-3 justify-center flex-wrap mt-9">
          <motion.button
            whileHover={{ y: -2, boxShadow: "0 0 30px var(--accent-glow-strong)" }}
            whileTap={{ scale: 0.97 }}
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="font-code text-[11px] font-bold tracking-widest px-7 py-3 rounded-sm cursor-pointer border-none"
            style={{ background: "var(--gradient-accent)", color: "#fff", boxShadow: "0 0 20px var(--accent-glow)" }}
          >
            VIEW PROJECTS →
          </motion.button>

          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, borderColor: "var(--accent)" }}
            whileTap={{ scale: 0.97 }}
            className="font-code text-[11px] font-bold tracking-widest px-7 py-3 rounded-sm bg-transparent no-underline inline-block"
            style={{ color: "var(--text-primary)", border: "1px solid var(--border-primary)" }}
          >
            GITHUB ↗
          </motion.a>

          <motion.a
            href={SOCIAL_LINKS.resume}
            download="Resume"
            whileHover={{ y: -2, boxShadow: "0 0 20px rgba(0,255,136,0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="font-code text-[11px] font-bold tracking-widest px-7 py-3 rounded-sm bg-transparent no-underline inline-flex items-center gap-2"
            style={{ color: "var(--green)", border: "1px solid rgba(0,255,136,0.3)" }}
          >
            ⬇ DOWNLOAD CV
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div variants={fadeUp} className="mt-14 md:mt-20">
          <div className="flex flex-col items-center gap-2">
            <span className="font-code text-[9px] tracking-[4px]" style={{ color: "var(--text-muted)" }}>SCROLL</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-[1px] h-8"
              style={{ background: "var(--gradient-accent)" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
