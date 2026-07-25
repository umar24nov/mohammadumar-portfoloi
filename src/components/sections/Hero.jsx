import useTypewriter from "../../hooks/useTypewriter";
import { TYPEWRITER_WORDS, SOCIAL_LINKS } from "../../config/constants";

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_WORDS);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-[5vw] relative z-10"
    >
      {/* Background glow blob */}
      <div className="absolute w-[480px] h-[480px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,212,255,0.12)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />

      <div className="max-w-[780px] text-center">
        <p className="font-spacemono text-[#00d4ff] text-xs tracking-[5px] mb-5 anim-fadeUp-d1">
          &lt; Hello, World! /&gt;
        </p>

        <h1 className="font-orbitron font-black text-[clamp(40px,8vw,80px)] text-[#e2eaf2] leading-tight m-0 anim-fadeUp-d2">
          MOHD <span className="text-[#00d4ff] [text-shadow:0_0_30px_#00d4ff]">UMAR</span>
        </h1>

        <div className="h-10 mt-4 anim-fadeUp-d3">
          <span className="font-spacemono text-[clamp(16px,3vw,22px)] text-[#00aacc]">
            {typed}
            <span className="inline-block w-[2px] h-[1em] bg-[#00d4ff] ml-1 align-middle anim-blink" />
          </span>
        </div>

        <p className="font-dmsans text-[#6b8599] text-[clamp(15px,2vw,17px)] mt-6 leading-relaxed max-w-[560px] mx-auto anim-fadeUp-d4">
          A passionate CS fresher building real-world solutions — from study tools to
          performance prediction engines.
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-3 justify-center flex-wrap mt-8 md:mt-10 anim-fadeUp-d5">
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-[#00d4ff] text-black cursor-pointer border-none shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:-translate-y-1 hover:shadow-[0_0_32px_#00d4ff] transition-all duration-200"
          >
            View Projects
          </button>

          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-transparent text-[#00d4ff] border border-[#00d4ff] no-underline hover:bg-[rgba(0,212,255,0.1)] hover:-translate-y-1 transition-all duration-200 inline-block"
          >
            GitHub ↗
          </a>

          <a
            href={SOCIAL_LINKS.resume}
            download="Resume"
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-transparent text-[#34d399] border border-[#34d399] no-underline hover:bg-[rgba(52,211,153,0.1)] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-200 inline-flex items-center gap-2"
          >
            ⬇ Download CV
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="mt-10 md:mt-16 anim-fadeUp-d6">
          <div className="w-6 h-10 border-2 border-[#6b8599] rounded-xl mx-auto flex justify-center pt-1.5">
            <div className="w-1 h-2 rounded-sm bg-[#00d4ff] anim-scrollDot" />
          </div>
        </div>
      </div>
    </section>
  );
}
