import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../ui/SectionHeading";

export default function CodeSignature() {
  const ref = useScrollReveal();

  const lines = [
    <>
      <span className="cc"># Who is Mohd Umar? Let the code explain.</span>
    </>,
    " ",
    <>
      <span className="ck">class </span>
      <span className="cf">Developer</span>
      <span className="co">:</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span className="ck">def </span>
      <span className="cf">__init__</span>
      <span className="co">(</span>
      <span className="cv">self</span>
      <span className="co">):</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="cv">self</span>
      <span className="co">.</span>
      <span className="cv">name</span> <span className="co">=</span>{" "}
      <span className="cs">"Mohd Umar"</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="cv">self</span>
      <span className="co">.</span>
      <span className="cv">role</span> <span className="co">=</span>{" "}
      <span className="cs">"CS Fresher → Full Stack + ML"</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="cv">self</span>
      <span className="co">.</span>
      <span className="cv">skills</span> <span className="co">=</span>{" "}
      <span className="co">[</span>
      <span className="cs">React</span>
      <span className="co">,</span>{" "}
      <span className="cs">Node.js</span>
      <span className="co">,</span>{" "}
      <span className="cs">Python</span>
      <span className="co">,</span>{" "}
      <span className="cs">ML</span>
      <span className="co">]</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="cv">self</span>
      <span className="co">.</span>
      <span className="cv">philosophy</span> <span className="co">=</span>{" "}
      <span className="cs">"Ship it. Improve it. Repeat."</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="cv">self</span>
      <span className="co">.</span>
      <span className="cv">chai</span> <span className="co">=</span>{" "}
      <span className="cn">float</span>
      <span className="co">("inf")</span>{" "}
      <span className="cc"># essential ☕</span>
    </>,
    " ",
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <span className="ck">def </span>
      <span className="cf">solve</span>
      <span className="co">(</span>
      <span className="cv">self</span>
      <span className="co">, </span>
      <span className="cv">problem</span>
      <span className="co">):</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="cc"># Never give up — iterate until elegant</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="ck">while not </span>
      <span className="cv">problem</span>
      <span className="co">.</span>
      <span className="cf">solved</span>
      <span className="co">():</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="cv">approach</span> <span className="co">=</span>{" "}
      <span className="cv">self</span>
      <span className="co">.</span>
      <span className="cf">think_differently</span>
      <span className="co">()</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="cv">problem</span>
      <span className="co">.</span>
      <span className="cf">attack</span>
      <span className="co">(</span>
      <span className="cv">approach</span>
      <span className="co">)</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="ck">if </span>
      <span className="cv">self</span>
      <span className="co">.</span>
      <span className="cv">chai</span> <span className="co">==</span>{" "}
      <span className="cn">0</span>
      <span className="co">: </span>
      <span className="cf">self</span>
      <span className="co">.</span>
      <span className="cf">refill</span>
      <span className="co">()</span>
    </>,
    <>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <span className="ck">return </span>
      <span className="cs">"elegant solution ✓"</span>
    </>,
    " ",
    <>
      <span className="cc"># Entry point</span>
    </>,
    <>
      <span className="cv">umar</span> <span className="co">=</span>{" "}
      <span className="cf">Developer</span>
      <span className="co">()</span>
    </>,
    <>
      <span className="cf">print</span>
      <span className="co">(</span>
      <span className="cv">umar</span>
      <span className="co">.</span>
      <span className="cf">solve</span>
      <span className="co">(</span>
      <span className="cs">"your next big idea"</span>
      <span className="co">))</span>
    </>,
    <>
      <span className="cc"># output → "elegant solution ✓"</span>
    </>,
  ];

  return (
    <section
      ref={ref}
      className="reveal py-14 md:py-24 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10"
    >
      <SectionHeading label="04 // MY THINKING" title="Code Signature" />

      <div className="relative rounded-2xl overflow-hidden border border-[#1a3040] hover:border-[#00d4ff] transition-colors duration-500 shadow-[0_0_40px_rgba(0,212,255,0.04)]">
        {/* Editor title bar */}
        <div className="bg-[#0a1622] border-b border-[#1a3040] px-5 py-3 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="font-spacemono text-[#6b8599] text-xs ml-4 tracking-wide">
            umar.py
          </span>
          <span className="ml-auto font-spacemono text-[#00d4ff] text-[10px] tracking-widest">
            Python 3.11
          </span>
        </div>

        {/* Code body */}
        <div className="bg-[#070f1a] p-3 sm:p-5 md:p-8 overflow-x-auto">
          <pre className="font-spacemono text-[11px] sm:text-xs md:text-sm leading-6 md:leading-7 m-0">
            {lines.map((line, i) => (
              <div
                key={i}
                className="flex gap-6 hover:bg-[rgba(0,212,255,0.03)] rounded px-2 -mx-2 transition-colors"
              >
                <span className="select-none text-[#2a4050] text-xs w-5 shrink-0 text-right mt-0.5">
                  {i + 1}
                </span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* Status bar */}
        <div className="bg-[#0a1622] border-t border-[#1a3040] px-5 py-2 flex items-center gap-4">
          <span className="font-spacemono text-[#00d4ff] text-[10px] tracking-widest">
            ● RUNNING
          </span>
          <span className="font-spacemono text-[#6b8599] text-[10px] ml-auto">
            UTF-8 · LF · Python
          </span>
        </div>
      </div>
    </section>
  );
}
