import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";

export default function CodeSignature() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const lines = [
    <><span className="cc"># Who is Mohd Umar? Let the code explain.</span></>,
    " ",
    <><span className="ck">class </span><span className="cf">Developer</span><span className="co">:</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ck">def </span><span className="cf">__init__</span><span className="co">(</span><span className="cv">self</span><span className="co">):</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">name</span> <span className="co">=</span> <span className="cs">"Mohd Umar"</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">role</span> <span className="co">=</span> <span className="cs">"CS Fresher → Full Stack + ML"</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">skills</span> <span className="co">=</span> <span className="co">[</span><span className="cs">React</span><span className="co">,</span> <span className="cs">Node.js</span><span className="co">,</span> <span className="cs">Python</span><span className="co">,</span> <span className="cs">ML</span><span className="co">]</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">philosophy</span> <span className="co">=</span> <span className="cs">"Ship it. Improve it. Repeat."</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">chai</span> <span className="co">=</span> <span className="cn">float</span><span className="co">("inf")</span> <span className="cc"># essential ☕</span></>,
    " ",
    <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ck">def </span><span className="cf">solve</span><span className="co">(</span><span className="cv">self</span><span className="co">, </span><span className="cv">problem</span><span className="co">):</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cc"># Never give up — iterate until elegant</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="ck">while not </span><span className="cv">problem</span><span className="co">.</span><span className="cf">solved</span><span className="co">():</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">approach</span> <span className="co">=</span> <span className="cv">self</span><span className="co">.</span><span className="cf">think_differently</span><span className="co">()</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">problem</span><span className="co">.</span><span className="cf">attack</span><span className="co">(</span><span className="cv">approach</span><span className="co">)</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="ck">if </span><span className="cv">self</span><span className="co">.</span><span className="cv">chai</span> <span className="co">==</span> <span className="cn">0</span><span className="co">: </span><span className="cf">self</span><span className="co">.</span><span className="cf">refill</span><span className="co">()</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="ck">return </span><span className="cs">"elegant solution ✓"</span></>,
    " ",
    <><span className="cc"># Entry point</span></>,
    <><span className="cv">umar</span> <span className="co">=</span> <span className="cf">Developer</span><span className="co">()</span></>,
    <><span className="cf">print</span><span className="co">(</span><span className="cv">umar</span><span className="co">.</span><span className="cf">solve</span><span className="co">(</span><span className="cs">"your next big idea"</span><span className="co">))</span></>,
    <><span className="cc"># output → "elegant solution ✓"</span></>,
  ];

  return (
    <section ref={ref} className="py-16 md:py-28 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10">
      <SectionHeading label="04 // MY THINKING" title="Code Signature" />

      <motion.div
        initial={{ opacity: 0, y: 40, filter: "blur(6px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative rounded-sm overflow-hidden"
        style={{ border: "1px solid var(--border-primary)", boxShadow: "var(--shadow-glow)" }}
      >
        {/* Title bar */}
        <div className="px-5 py-3 flex items-center gap-3" style={{ backgroundColor: "var(--bg-tertiary)", borderBottom: "1px solid var(--border-primary)" }}>
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--red)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--orange)" }} />
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "var(--green)" }} />
          </div>
          <span className="font-code text-[11px] ml-3 tracking-wide" style={{ color: "var(--text-secondary)" }}>umar.py</span>
          <span className="ml-auto font-code text-[9px] tracking-[3px]" style={{ color: "var(--accent)" }}>PYTHON 3.11</span>
        </div>

        {/* Code content */}
        <div className="p-4 sm:p-6 md:p-8 overflow-x-auto" style={{ backgroundColor: "var(--code-bg)" }}>
          <pre className="font-mono text-[11px] sm:text-xs md:text-sm leading-7 m-0">
            {lines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.035, duration: 0.3 }}
                className="flex gap-6 rounded px-2 -mx-2 cursor-default"
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "var(--code-line-hover)")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
              >
                <span className="select-none text-[10px] w-5 shrink-0 text-right mt-0.5" style={{ color: "var(--code-linenum)" }}>{i + 1}</span>
                <span>{line}</span>
              </motion.div>
            ))}
          </pre>
        </div>

        {/* Status bar */}
        <div className="px-5 py-2 flex items-center gap-4" style={{ backgroundColor: "var(--bg-tertiary)", borderTop: "1px solid var(--border-primary)" }}>
          <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="font-code text-[9px] tracking-[3px]" style={{ color: "var(--green)" }}>
            ● RUNNING
          </motion.span>
          <span className="font-code text-[9px] ml-auto tracking-wider" style={{ color: "var(--text-muted)" }}>UTF-8 · LF · PYTHON</span>
        </div>
      </motion.div>
    </section>
  );
}
