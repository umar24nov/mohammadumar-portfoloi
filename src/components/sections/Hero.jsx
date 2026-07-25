import { motion } from "framer-motion";
import useTypewriter from "../../hooks/useTypewriter";
import { TYPEWRITER_WORDS, SOCIAL_LINKS } from "../../config/constants";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_WORDS);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-[5vw] relative z-10"
    >
      {/* Animated glow blob */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.12, 0.18, 0.12],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[480px] h-[480px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,212,255,0.12)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="max-w-[780px] text-center"
      >
        <motion.p
          variants={fadeUp}
          className="font-spacemono text-[#00d4ff] text-xs tracking-[5px] mb-5"
        >
          &lt; Hello, World! /&gt;
        </motion.p>

        <motion.h1
          variants={fadeUp}
          className="font-orbitron font-black text-[clamp(40px,8vw,80px)] text-[#e2eaf2] leading-tight m-0"
        >
          MOHD{" "}
          <span className="text-[#00d4ff] [text-shadow:0_0_30px_#00d4ff]">UMAR</span>
        </motion.h1>

        <motion.div variants={fadeUp} className="h-10 mt-4">
          <span className="font-spacemono text-[clamp(16px,3vw,22px)] text-[#00aacc]">
            {typed}
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="inline-block w-[2px] h-[1em] bg-[#00d4ff] ml-1 align-middle"
            />
          </span>
        </motion.div>

        <motion.p
          variants={fadeUp}
          className="font-dmsans text-[#6b8599] text-[clamp(15px,2vw,17px)] mt-6 leading-relaxed max-w-[560px] mx-auto"
        >
          A passionate CS fresher building real-world solutions — from study tools to
          performance prediction engines.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-3 justify-center flex-wrap mt-8 md:mt-10"
        >
          <motion.button
            whileHover={{ y: -3, boxShadow: "0 0 32px #00d4ff" }}
            whileTap={{ scale: 0.97 }}
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-[#00d4ff] text-black cursor-pointer border-none shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all duration-200"
          >
            View Projects
          </motion.button>

          <motion.a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -3, backgroundColor: "rgba(0,212,255,0.1)" }}
            whileTap={{ scale: 0.97 }}
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-transparent text-[#00d4ff] border border-[#00d4ff] no-underline transition-all duration-200 inline-block"
          >
            GitHub ↗
          </motion.a>

          <motion.a
            href={SOCIAL_LINKS.resume}
            download="Resume"
            whileHover={{ y: -3, boxShadow: "0 0 20px rgba(52,211,153,0.3)" }}
            whileTap={{ scale: 0.97 }}
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-transparent text-[#34d399] border border-[#34d399] no-underline transition-all duration-200 inline-flex items-center gap-2"
          >
            ⬇ Download CV
          </motion.a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          variants={fadeUp}
          className="mt-10 md:mt-16"
        >
          <div className="w-6 h-10 border-2 border-[#6b8599] rounded-xl mx-auto flex justify-center pt-1.5">
            <motion.div
              animate={{ y: [0, 14, 0], opacity: [1, 0, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2 rounded-sm bg-[#00d4ff]"
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
