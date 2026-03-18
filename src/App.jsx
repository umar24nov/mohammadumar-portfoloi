/**
 * ============================================================
 * MOHD UMAR — Portfolio Website  (v3 — Full Update)
 * Pure Tailwind CSS + React
 * ============================================================
 * SECTIONS:
 *   1.  GlobalStyles       — fonts + @keyframes
 *   2.  AnimatedCanvas     — drifting geometric shapes
 *   3.  Navbar             — "MOHD UMAR" logo + Report button
 *   4.  Hero               — typewriter + CTA + Download CV
 *   5.  About              — bio + stat cards
 *   6.  Projects           — cards with Live Demo + GitHub
 *   7.  Skills             — YOUR exact skills, cleanly laid out
 *   8.  CodeSignature      — Python code block showing personality
 *   9.  Education          — glowing dot timeline
 *   10. Contact            — link cards
 *   11. GitHubMap          — contribution graph + stats
 *   12. FeedbackModal      — report/bug slide-up form
 *   13. FeedbackButton     — floating pill (bottom-right)
 *   14. Footer
 * ============================================================
 */

import { useState, useEffect, useRef } from "react";
import { db } from "./firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/* ─────────────────────────────────────────────────────────
   1. GLOBAL STYLES
   Only @keyframes + font imports here.
   All layout / color / spacing = Tailwind classes below.
───────────────────────────────────────────────────────── */
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=Space+Mono:wght@400;700&family=DM+Sans:wght@400;500;700&display=swap');

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(24px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0; }
      }
      @keyframes scrollDot {
        0%   { transform: translateY(0);    opacity: 1; }
        80%  { transform: translateY(14px); opacity: 0; }
        100% { transform: translateY(0);    opacity: 0; }
      }
      @keyframes scan {
        0%   { top: 0%;   }
        100% { top: 100%; }
      }
      @keyframes slideUp {
        from { opacity: 0; transform: translateY(40px); }
        to   { opacity: 1; transform: translateY(0);    }
      }
      @keyframes pulseGlow {
        0%, 100% { box-shadow: 0 0 8px  rgba(0,212,255,0.3); }
        50%       { box-shadow: 0 0 22px rgba(0,212,255,0.8); }
      }

      .anim-fadeUp-d1 { opacity:0; animation: fadeUp 0.6s 0.2s forwards; }
      .anim-fadeUp-d2 { opacity:0; animation: fadeUp 0.6s 0.4s forwards; }
      .anim-fadeUp-d3 { opacity:0; animation: fadeUp 0.6s 0.6s forwards; }
      .anim-fadeUp-d4 { opacity:0; animation: fadeUp 0.6s 0.8s forwards; }
      .anim-fadeUp-d5 { opacity:0; animation: fadeUp 0.6s 1.0s forwards; }
      .anim-fadeUp-d6 { opacity:0; animation: fadeUp 0.6s 1.2s forwards; }
      .anim-blink     { animation: blink     0.8s step-end    infinite; }
      .anim-scrollDot { animation: scrollDot 1.6s ease-in-out infinite; }
      .anim-scan      { position: absolute; animation: scan 4s linear infinite; }
      .anim-slideUp   { animation: slideUp  0.35s ease        forwards; }
      .anim-pulseGlow { animation: pulseGlow 2.2s ease-in-out infinite; }

      /* Scroll reveal — JS adds .visible via IntersectionObserver */
      .reveal         { opacity:0; transform:translateY(36px); transition: opacity 0.7s ease, transform 0.7s ease; }
      .reveal.visible { opacity:1; transform:translateY(0); }

      /* Skill bar — JS adds .filled when scrolled into view */
      .skill-bar        { width: 0%;                 transition: width 1.1s ease; }
      .skill-bar.filled { width: var(--skill-level); }

      ::-webkit-scrollbar       { width: 6px; }
      ::-webkit-scrollbar-track { background: #050b14; }
      ::-webkit-scrollbar-thumb { background: #00d4ff; border-radius: 3px; }
      html { scroll-behavior: smooth; }

      /* ── Responsive tweaks ── */
      @media (max-width: 640px) {
        /* Navbar logo shorter on very small screens */
        .nav-logo { font-size: 12px; letter-spacing: 1px; }

        /* Hero glow blob smaller on mobile */
        .hero-blob { width: 260px; height: 260px; }

        /* Code editor — tighter line height, smaller gap */
        .code-line-num { display: none; }

        /* GitHub images stack nicely */
        .gh-stats-row { flex-direction: column; align-items: center; }
      }

      @media (max-width: 480px) {
        /* Very small phones — hide scroll indicator text */
        .anim-fadeUp-d6 { display: none; }
      }

      .font-orbitron  { font-family: 'Orbitron',   monospace; }
      .font-spacemono { font-family: 'Space Mono', monospace; }
      .font-dmsans    { font-family: 'DM Sans',    sans-serif; }

      /* Form inputs for feedback modal */
      .form-input {
        background: #0a1929; border: 1px solid #1a3040; border-radius: 8px;
        color: #e2eaf2; font-family: 'DM Sans', sans-serif; font-size: 14px;
        padding: 11px 15px; width: 100%; outline: none; transition: border-color 0.2s;
      }
      .form-input:focus        { border-color: #00d4ff; }
      .form-input::placeholder { color: #4a6070; }

      /* Code syntax colours — used in CodeSignature section */
      .ck { color: #c792ea; }   /* keyword  */
      .cf { color: #82aaff; }   /* function */
      .cs { color: #c3e88d; }   /* string   */
      .cc { color: #546e7a; font-style: italic; } /* comment */
      .cn { color: #f78c6c; }   /* number   */
      .cv { color: #eeffff; }   /* variable */
      .co { color: #89ddff; }   /* operator */
    `}</style>
  );
}

/* ─────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────── */
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

function useTypewriter(words, speed = 90, pause = 1800) {
  const [display,  setDisplay]  = useState("");
  const [wordIdx,  setWordIdx]  = useState(0);
  const [charIdx,  setCharIdx]  = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const cur = words[wordIdx], delay = deleting ? speed / 2 : speed;
    const t = setTimeout(() => {
      if (!deleting) {
        setDisplay(cur.slice(0, charIdx + 1));
        if (charIdx + 1 === cur.length) setTimeout(() => setDeleting(true), pause);
        else setCharIdx(c => c + 1);
      } else {
        setDisplay(cur.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) { setDeleting(false); setWordIdx(w => (w + 1) % words.length); setCharIdx(0); }
        else setCharIdx(c => c - 1);
      }
    }, delay);
    return () => clearTimeout(t);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

/* ─────────────────────────────────────────────────────────
   2. ANIMATED CANVAS BACKGROUND
───────────────────────────────────────────────────────── */
function AnimatedCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current, ctx = canvas.getContext("2d");
    let animId;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize(); window.addEventListener("resize", resize);
    const shapes = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight,
      size: 18 + Math.random() * 40, speedX: (Math.random() - 0.5) * 0.4, speedY: (Math.random() - 0.5) * 0.4,
      rotation: Math.random() * Math.PI * 2, rotSpeed: (Math.random() - 0.5) * 0.008,
      type: ["triangle","circle","ring","hex","square"][i % 5], opacity: 0.06 + Math.random() * 0.10,
    }));
    const poly = (x, y, r, sides, rot) => {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) { const a = rot + (i / sides) * Math.PI * 2; i === 0 ? ctx.moveTo(x + r*Math.cos(a), y + r*Math.sin(a)) : ctx.lineTo(x + r*Math.cos(a), y + r*Math.sin(a)); }
      ctx.closePath();
    };
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      shapes.forEach(s => {
        s.x += s.speedX; s.y += s.speedY; s.rotation += s.rotSpeed;
        if (s.x < -s.size) s.x = canvas.width + s.size; if (s.x > canvas.width + s.size) s.x = -s.size;
        if (s.y < -s.size) s.y = canvas.height + s.size; if (s.y > canvas.height + s.size) s.y = -s.size;
        ctx.save(); ctx.globalAlpha = s.opacity; ctx.strokeStyle = "#00d4ff"; ctx.lineWidth = 1.2;
        if      (s.type === "circle")   { ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.stroke(); }
        else if (s.type === "ring")     { ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI*2); ctx.stroke(); ctx.beginPath(); ctx.arc(s.x, s.y, s.size*0.6, 0, Math.PI*2); ctx.stroke(); }
        else if (s.type === "triangle") { poly(s.x, s.y, s.size, 3, s.rotation); ctx.stroke(); }
        else if (s.type === "hex")      { poly(s.x, s.y, s.size, 6, s.rotation); ctx.stroke(); }
        else                            { poly(s.x, s.y, s.size, 4, s.rotation); ctx.stroke(); }
        ctx.restore();
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full pointer-events-none z-0" />;
}

/* ─────────────────────────────────────────────────────────
   3. NAVBAR  — logo now reads "MOHD UMAR"
───────────────────────────────────────────────────────── */
function Navbar({ onFeedback }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = ["About","Projects","Skills","Education","Contact"];
  const go    = id => { document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 px-[5vw]
      ${scrolled ? "bg-[#050b14]/90 backdrop-blur-md border-b border-[#1a3040]" : "bg-transparent"}`}>
      <div className="max-w-[1100px] mx-auto flex items-center justify-between h-16">
        {/* Logo — MOHD UMAR */}
        <button onClick={() => window.scrollTo({ top:0, behavior:"smooth" })}
          className="nav-logo font-orbitron text-sm font-bold text-[#00d4ff] tracking-[2px] bg-transparent border-none cursor-pointer whitespace-nowrap">
          &lt;MOHD UMAR /&gt;
        </button>
        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <button key={l} onClick={() => go(l)}
              className="font-spacemono text-xs text-[#6b8599] tracking-widest bg-transparent border-none cursor-pointer hover:text-[#00d4ff] transition-colors duration-200">
              {l}
            </button>
          ))}
          {/* Report button */}
          <button onClick={onFeedback}
            className="font-spacemono text-[11px] text-[#ff6b6b] border border-[rgba(255,107,107,0.4)] px-3 py-1.5 rounded bg-transparent cursor-pointer hover:bg-[rgba(255,107,107,0.1)] hover:border-[#ff6b6b] transition-all duration-200 tracking-wide">
            🐛 Report
          </button>
        </div>
        <button onClick={() => setMenuOpen(m => !m)} className="md:hidden text-[#00d4ff] text-2xl bg-transparent border-none cursor-pointer">
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>
      {menuOpen && (
        <div className="md:hidden bg-[#050b14]/97 px-[5vw] pb-6 flex flex-col gap-4">
          {links.map(l => <button key={l} onClick={() => go(l)} className="font-spacemono text-sm text-[#e2eaf2] text-left bg-transparent border-none cursor-pointer">{l}</button>)}
          <button onClick={() => { onFeedback(); setMenuOpen(false); }} className="font-spacemono text-sm text-[#ff6b6b] text-left bg-transparent border-none cursor-pointer">🐛 Report / Feedback</button>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────
   4. HERO
───────────────────────────────────────────────────────── */
function Hero() {
  const typed = useTypewriter(["Developer","CS Fresher","Problem Solver","Open Source Enthusiast","ML Explorer"]);
  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-[5vw] relative z-10">
      <div className="absolute w-[480px] h-[480px] rounded-full pointer-events-none bg-[radial-gradient(circle,rgba(0,212,255,0.12)_0%,transparent_70%)] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      <div className="max-w-[780px] text-center">
        <p className="font-spacemono text-[#00d4ff] text-xs tracking-[5px] mb-5 anim-fadeUp-d1">&lt; Hello, World! /&gt;</p>
        <h1 className="font-orbitron font-black text-[clamp(40px,8vw,80px)] text-[#e2eaf2] leading-tight m-0 anim-fadeUp-d2">
          MOHD <span className="text-[#00d4ff] [text-shadow:0_0_30px_#00d4ff]">UMAR</span>
        </h1>
        <div className="h-10 mt-4 anim-fadeUp-d3">
          <span className="font-spacemono text-[clamp(16px,3vw,22px)] text-[#00aacc]">
            {typed}<span className="inline-block w-[2px] h-[1em] bg-[#00d4ff] ml-1 align-middle anim-blink" />
          </span>
        </div>
        <p className="font-dmsans text-[#6b8599] text-[clamp(15px,2vw,17px)] mt-6 leading-relaxed max-w-[560px] mx-auto anim-fadeUp-d4">
          A passionate CS fresher building real-world solutions — from study tools to performance prediction engines.
        </p>
        {/* CTA Buttons */}
        <div className="flex gap-3 justify-center flex-wrap mt-8 md:mt-10 anim-fadeUp-d5">
          <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior:"smooth" })}
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-[#00d4ff] text-black cursor-pointer border-none shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:-translate-y-1 hover:shadow-[0_0_32px_#00d4ff] transition-all duration-200">
            View Projects
          </button>
          <a href="https://github.com/umar24nov" target="_blank" rel="noreferrer"
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-transparent text-[#00d4ff] border border-[#00d4ff] no-underline hover:bg-[rgba(0,212,255,0.1)] hover:-translate-y-1 transition-all duration-200 inline-block">
            GitHub ↗
          </a>
          {/*
            ── Download CV ──
            Put your resume PDF in /public as "resume.pdf"
            OR replace href with your Google Drive shareable link.
          */}
          <a href="https://drive.google.com/file/d/16Bk4XIqJMVFBl5IrY5vYOi05B_XoEzQ8/view?usp=drive_link" download="Resume"
            className="font-spacemono text-[11px] md:text-xs font-bold tracking-widest px-5 md:px-8 py-2.5 md:py-3 rounded bg-transparent text-[#34d399] border border-[#34d399] no-underline hover:bg-[rgba(52,211,153,0.1)] hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(52,211,153,0.3)] transition-all duration-200 inline-flex items-center gap-2">
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

/* ─────────────────────────────────────────────────────────
   SHARED COMPONENTS
───────────────────────────────────────────────────────── */
function Section({ id, children }) {
  const ref = useScrollReveal();
  return <section id={id} ref={ref} className="reveal py-14 md:py-24 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10">{children}</section>;
}

function SectionHeading({ label, title }) {
  return (
    <div className="mb-8 md:mb-14">
      <p className="font-spacemono text-[#00d4ff] text-[11px] tracking-[5px] mb-2">{label}</p>
      <h2 className="font-orbitron font-extrabold text-[clamp(28px,5vw,44px)] text-[#e2eaf2] m-0">{title}</h2>
      <div className="mt-3 w-14 h-[3px] rounded bg-gradient-to-r from-[#00d4ff] to-transparent" />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   5. ABOUT
───────────────────────────────────────────────────────── */
function About() {
  const hi = [
    { icon:"🎓", label:"Degree",   value:"B.Tech CSE" },
    { icon:"💻", label:"Projects", value:"3+"          },
    { icon:"🌐", label:"Skills",    value:"dev+ml"     },
    { icon:"📍", label:"Location", value:"India"       },
  ];
  return (
    <Section id="about">
      <SectionHeading label="01 // WHO AM I" title="About Me" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <p className="font-dmsans text-[#e2eaf2] text-lg leading-loose mb-5">
            Hi! I'm <span className="text-[#00d4ff] font-bold">Mohd Umar</span>, a CS fresher who loves building software that solves real problems. I thrive at the intersection of clean frontend design and solid backend logic.
          </p>
          <p className="font-dmsans text-[#6b8599] text-sm leading-loose">
            From study resources platforms to ML performance predictors, I turn ideas into polished products. Driven by curiosity — always learning, always shipping.
          </p>
          <div className="mt-7 flex gap-3 flex-wrap">
            {[
              { label:"📧 Email",    href:"mailto:umar24nov@gmail.com" },
              { label:"🐙 GitHub",   href:"https://github.com/umar24nov" },
              { label:"💼 LinkedIn", href:"https://www.linkedin.com/in/mohammadumarfarook" },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
                className="font-spacemono text-[#00d4ff] text-[11px] tracking-wide no-underline border border-[#1a3040] px-3 py-2 rounded hover:border-[#00d4ff] transition-colors duration-200 inline-block">
                {l.label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {hi.map(h => (
            <div key={h.label} className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-6 hover:border-[#00d4ff] transition-colors duration-300">
              <div className="text-3xl mb-3">{h.icon}</div>
              {h.value === "dev+ml" ? (
                <div className="font-orbitron text-[#00d4ff] text-sm font-bold mb-1 leading-snug">
                  <div>Frontend</div>
                  <div>Machine Learning</div>
                </div>
              ) : (
                <div className="font-orbitron text-[#00d4ff] text-lg font-bold mb-1">{h.value}</div>
              )}
              <div className="font-spacemono text-[#6b8599] text-[11px] tracking-widest">{h.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   6. PROJECTS — with Live Demo + GitHub buttons
   Replace demo:"#" with your actual hosted URLs.
───────────────────────────────────────────────────────── */
const projects = [
  {
    name:"StudyVault", emoji:"📚", tagline:"Full Stack Study Companion",
    description:"A comprehensive full-stack academic platform designed to empower students with instant access to high-quality educational resources—completely free.",
    tech:["React","Node.js","Firebase","Cloudinary"],
    accent:"text-[#00d4ff]", border:"hover:border-[#00d4ff]", topBar:"from-[#00d4ff]",
    tag:"bg-[rgba(0,212,255,0.08)] text-[#00d4ff] border-[rgba(0,212,255,0.2)]",
    featured:true, status:"Deployed on Vercel",
    github:"https://github.com/umar24nov", demo:"https://studyvaultapp.vercel.app/",
  },
  {
    name:"AcademicAI", emoji:"📊", tagline:"ML-Based Academic Forecasting",
    description:"ML app that analyses student attendance, grades and behaviour patterns to predict performance and flag at-risk students early — backed by a clean Fast API.",
    tech:["Python","Scikit-learn","Pandas","NumPy","Fast API","MySQL"],
    accent:"text-[#a78bfa]", border:"hover:border-[#a78bfa]", topBar:"from-[#a78bfa]",
    tag:"bg-[rgba(167,139,250,0.08)] text-[#a78bfa] border-[rgba(167,139,250,0.2)]",
    featured:true, status:"Deployed on Render",
    github:"https://github.com/umar24nov", demo:"https://academic-ai.onrender.com",
  },
  {
    name:"Portfolio Website", emoji:"🌐", tagline:"Personal Brand & Showcase",
    description:"This very site — animated React portfolio with canvas geometry, scroll reveals, a code signature and GitHub stats. Built purely with React & Tailwind CSS.",
    tech:["React","Tailwind CSS","CSS Animations","Render"],
    accent:"text-[#34d399]", border:"hover:border-[#34d399]", topBar:"from-[#34d399]",
    tag:"bg-[rgba(52,211,153,0.08)] text-[#34d399] border-[rgba(52,211,153,0.2)]",
    featured:false, status:"Live Now",
    github:"https://github.com/umar24nov", demo:"#",
  },
];

function ProjectCard({ project, index }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref}
      className={`reveal bg-[#0d1a2a] border border-[#1a3040] ${project.border} rounded-xl p-4 md:p-7 relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300`}
      style={{ transitionDelay:`${index*0.12}s` }}>
      <div className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${project.topBar} to-transparent opacity-40`} />
      <div className="flex gap-2 flex-wrap mb-4">
        {project.featured && <span className={`${project.tag} border font-spacemono text-[10px] tracking-widest px-2.5 py-1 rounded-full`}>FEATURED</span>}
        <span className={`${project.tag} border font-spacemono text-[10px] tracking-widest px-2.5 py-1 rounded-full`}>✓ {project.status}</span>
      </div>
      <div className="text-3xl mb-3">{project.emoji}</div>
      <h3 className="font-orbitron text-[#e2eaf2] text-lg font-bold mb-1">{project.name}</h3>
      <p className={`font-spacemono ${project.accent} text-[11px] tracking-[2px] mb-4`}>{project.tagline}</p>
      <p className="font-dmsans text-[#6b8599] text-sm leading-relaxed mb-5">{project.description}</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map(t => <span key={t} className={`${project.tag} border font-spacemono text-[10px] px-2.5 py-1 rounded`}>{t}</span>)}
      </div>
      <div className="flex gap-3 flex-wrap">
        <a href={project.demo} target="_blank" rel="noreferrer"
          className={`font-spacemono text-[11px] font-bold tracking-wide no-underline px-4 py-2 rounded border ${project.tag} hover:opacity-80 transition-opacity duration-200 inline-flex items-center gap-1.5`}>
          🚀 Live Demo
        </a>
        <a href={project.github} target="_blank" rel="noreferrer"
          className="font-spacemono text-[11px] tracking-wide no-underline px-4 py-2 rounded border border-[#1a3040] text-[#6b8599] hover:border-[#e2eaf2] hover:text-[#e2eaf2] transition-all duration-200 inline-flex items-center gap-1.5">
          🐙 GitHub
        </a>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <Section id="projects">
      <SectionHeading label="02 // WHAT I'VE BUILT" title="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((p,i) => <ProjectCard key={p.name} project={p} index={i} />)}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   7. SKILLS — YOUR exact skills, 2-row layout
   Row 1: Languages (bars) + Tools (chips)
   Row 2: Frontend | Backend | ML + Database
───────────────────────────────────────────────────────── */
function SkillBar({ name, level }) {
  const barRef = useRef(null);
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add("filled"); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-dmsans text-[#e2eaf2] text-sm">{name}</span>
        <span className="font-spacemono text-[#00d4ff] text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#1a3040] rounded-full overflow-hidden">
        <div ref={barRef} className="skill-bar h-full bg-gradient-to-r from-[#00d4ff] to-[#00aacc] rounded-full shadow-[0_0_8px_#00d4ff]" style={{ "--skill-level":`${level}%` }} />
      </div>
    </div>
  );
}

/* Reusable chip with colour variants */
const chipColors = {
  cyan:   "bg-[rgba(0,212,255,0.08)]   text-[#00d4ff]  border-[rgba(0,212,255,0.2)]",
  purple: "bg-[rgba(167,139,250,0.08)] text-[#a78bfa]  border-[rgba(167,139,250,0.2)]",
  green:  "bg-[rgba(52,211,153,0.08)]  text-[#34d399]  border-[rgba(52,211,153,0.2)]",
  orange: "bg-[rgba(251,146,60,0.08)]  text-[#fb923c]  border-[rgba(251,146,60,0.2)]",
  pink:   "bg-[rgba(244,114,182,0.08)] text-[#f472b6]  border-[rgba(244,114,182,0.2)]",
};
function Chip({ label, color="cyan" }) {
  return <span className={`${chipColors[color]} border font-spacemono text-[11px] px-3 py-1.5 rounded-md tracking-wide`}>{label}</span>;
}

function Skills() {
  return (
    <Section id="skills">
      <SectionHeading label="03 // TOOLBOX" title="Skills" />

      {/* Row 1: Languages + Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">

        {/* Languages — with animated bars */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#00d4ff] transition-colors duration-300">
          <p className="font-spacemono text-[#00d4ff] text-[11px] tracking-[3px] mb-6">LANGUAGES</p>
          <SkillBar name="Python"      level={82} />
          <SkillBar name="C"           level={70} />
          <SkillBar name="C++"         level={90} />
          <SkillBar name="JavaScript"  level={80} />
          <SkillBar name="SQL"         level={75} />
        </div>

        {/* Tools & Platforms */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#34d399] transition-colors duration-300">
          <p className="font-spacemono text-[#34d399] text-[11px] tracking-[3px] mb-5">TOOLS & PLATFORMS</p>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {[{n:"Git",c:"green"},{n:"GitHub",c:"green"},{n:"VS Code",c:"cyan"},{n:"Jupyter",c:"orange"}].map(t=><Chip key={t.n} label={t.n} color={t.c}/>)}
          </div>
          <p className="font-spacemono text-[#34d399] text-[10px] tracking-[2px] mb-3">CLOUD / HOSTING</p>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {[{n:"Firebase",c:"orange"},{n:"Cloudinary",c:"purple"},{n:"Vercel",c:"cyan"},{n:"Render",c:"green"}].map(t=><Chip key={t.n} label={t.n} color={t.c}/>)}
          </div>
        </div>
      </div>

      {/* Row 2: Frontend | Backend | ML + DB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">

        {/* Frontend */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#a78bfa] transition-colors duration-300">
          <p className="font-spacemono text-[#a78bfa] text-[11px] tracking-[3px] mb-6">FRONTEND</p>
          <SkillBar name="React.js"     level={82} />
          <SkillBar name="Tailwind CSS" level={80} />
          <SkillBar name="HTML / CSS"   level={88} />
        </div>

        {/* Backend */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#fb923c] transition-colors duration-300">
          <p className="font-spacemono text-[#fb923c] text-[11px] tracking-[3px] mb-6">BACKEND</p>
          <SkillBar name="Node.js"  level={75} />
          <SkillBar name="Express"  level={72} />
          <SkillBar name="FAST API" level={70} />
        </div>

        {/* ML + Database — chips only (honest, no fake bars) */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#f472b6] transition-colors duration-300">
          <p className="font-spacemono text-[#f472b6] text-[11px] tracking-[3px] mb-4">ML / DATA SCIENCE</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {[{n:"NumPy",c:"pink"},{n:"Pandas",c:"pink"},{n:"Scikit-learn",c:"purple"},{n:"Matplotlib",c:"purple"}].map(t=><Chip key={t.n} label={t.n} color={t.c}/>)}
          </div>
          <p className="font-spacemono text-[#f472b6] text-[11px] tracking-[3px] mb-4">DATABASE</p>
          <div className="flex flex-wrap gap-2">
            {[{n:"MySQL",c:"orange"},{n:"MongoDB",c:"green"},{n:"Firebase",c:"orange"}].map(t=><Chip key={t.n} label={t.n} color={t.c}/>)}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   8. CODE SIGNATURE
   A fake Python editor showing Mohd Umar's philosophy.
   Syntax-highlighted with CSS classes defined in GlobalStyles.
───────────────────────────────────────────────────────── */
function CodeSignature() {
  const ref = useScrollReveal();
  /* Each line is a JSX element with coloured spans */
  const lines = [
    <><span className="cc"># Who is Mohd Umar? Let the code explain.</span></>,
    " ",
    <><span className="ck">class </span><span className="cf">Developer</span><span className="co">:</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;<span className="ck">def </span><span className="cf">__init__</span><span className="co">(</span><span className="cv">self</span><span className="co">):</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">name</span>        <span className="co">=</span> <span className="cs">"Mohd Umar"</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">role</span>        <span className="co">=</span> <span className="cs">"CS Fresher → Full Stack + ML"</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">skills</span>      <span className="co">=</span> <span className="co">["</span><span className="cs">React</span><span className="co">","</span><span className="cs">Node.js</span><span className="co">","</span><span className="cs">Python</span><span className="co">","</span><span className="cs">ML</span><span className="co">"]</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">philosophy</span>  <span className="co">=</span> <span className="cs">"Ship it. Improve it. Repeat."</span></>,
    <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="cv">self</span><span className="co">.</span><span className="cv">chai</span>      <span className="co">=</span> <span className="cn">float</span><span className="co">("inf")</span>  <span className="cc"># essential ☕</span></>,
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
    <section ref={ref} className="reveal py-14 md:py-24 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10">
      <SectionHeading label="04 // MY THINKING" title="Code Signature" />
      <div className="relative rounded-2xl overflow-hidden border border-[#1a3040] hover:border-[#00d4ff] transition-colors duration-500 shadow-[0_0_40px_rgba(0,212,255,0.04)]">

        {/* Fake editor title bar */}
        <div className="bg-[#0a1622] border-b border-[#1a3040] px-5 py-3 flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
          <span className="font-spacemono text-[#6b8599] text-xs ml-4 tracking-wide">umar.py</span>
          <span className="ml-auto font-spacemono text-[#00d4ff] text-[10px] tracking-widest">Python 3.11</span>
        </div>

        {/* Code body */}
        <div className="bg-[#070f1a] p-3 sm:p-5 md:p-8 overflow-x-auto">
          <pre className="font-spacemono text-[11px] sm:text-xs md:text-sm leading-6 md:leading-7 m-0">
            {lines.map((line, i) => (
              <div key={i} className="flex gap-6 hover:bg-[rgba(0,212,255,0.03)] rounded px-2 -mx-2 transition-colors">
                <span className="select-none text-[#2a4050] text-xs w-5 shrink-0 text-right mt-0.5">{i + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        </div>

        {/* Status bar */}
        <div className="bg-[#0a1622] border-t border-[#1a3040] px-5 py-2 flex items-center gap-4">
          <span className="font-spacemono text-[#00d4ff] text-[10px] tracking-widest">● RUNNING</span>
          <span className="font-spacemono text-[#6b8599] text-[10px] ml-auto">UTF-8 · LF · Python</span>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   9. EDUCATION
───────────────────────────────────────────────────────── */
const timeline = [
  { period:"2023 – 2027", degree:"B.Tech in Computer Science & Engineering", institution:"COER University", detail:"DSA, Web Dev, Machine Learning, DBMS and Operating Systems.", icon:"🎓" },
  { period:"2021", degree:"Higher Secondary (Class XII)", institution:"Doon Public School", detail:"Physics, Chemistry, Mathematics", icon:"📘" },
];
function Education() {
  return (
    <Section id="education">
      <SectionHeading label="05 // MY JOURNEY" title="Education" />
      <div className="relative pl-7 md:pl-10">
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00d4ff] to-[#1a3040]" />
        {timeline.map((item,i) => (
          <div key={i} className="relative mb-11">
            <div className="absolute -left-[27px] md:-left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-[#00d4ff] border-[3px] border-[#050b14] shadow-[0_0_10px_#00d4ff]" />
            <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-6 hover:border-[#00d4ff] transition-colors duration-300">
              <span className="font-spacemono text-[#00d4ff] text-[11px] tracking-[3px]">{item.period}</span>
              <h3 className="font-orbitron text-[#e2eaf2] text-lg font-bold mt-2.5 mb-1">{item.degree}</h3>
              <p className="font-dmsans text-[#00aacc] text-sm mb-3">{item.institution}</p>
              <p className="font-dmsans text-[#6b8599] text-sm leading-relaxed">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   10. CONTACT
───────────────────────────────────────────────────────── */
function Contact() {
  const contacts = [
    { label:"Email",    value:"umar24nov@gmail.com",                href:"mailto:umar24nov@gmail.com",                              icon:"📧" },
    { label:"GitHub",   value:"github.com/umar24nov",               href:"https://github.com/umar24nov",                           icon:"🐙" },
    { label:"LinkedIn", value:"linkedin.com/in/mohammadumarfarook", href:"https://www.linkedin.com/in/mohammadumarfarook",          icon:"💼" },
  ];
  return (
    <Section id="contact">
      <SectionHeading label="06 // LET'S CONNECT" title="Contact" />
      <div className="max-w-[640px]">
        <p className="font-dmsans text-[#6b8599] text-base leading-relaxed mb-10">
          I'm actively looking for internships, projects and collaborations. Feel free to reach out!
        </p>
        <div className="flex flex-col gap-4">
          {contacts.map(c => (
            <a key={c.label} href={c.href} target="_blank" rel="noreferrer"
              className="flex items-center gap-4 bg-[#0d1a2a] border border-[#1a3040] rounded-xl px-4 md:px-6 py-4 md:py-5 no-underline group hover:border-[#00d4ff] hover:translate-x-2 transition-all duration-200">
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="font-spacemono text-[#00d4ff] text-[11px] tracking-[3px] mb-1">{c.label}</div>
                <div className="font-dmsans text-[#e2eaf2] text-sm">{c.value}</div>
              </div>
              <span className="ml-auto text-[#6b8599] text-lg group-hover:text-[#00d4ff] transition-colors">→</span>
            </a>
          ))}
        </div>
      </div>
    </Section>
  );
}

/* ─────────────────────────────────────────────────────────
   11. GITHUB MAP
   Uses github-readme-stats + activity-graph — free, no API key.
   Images loaded from external CDNs — requires internet connection.
───────────────────────────────────────────────────────── */
function GitHubMap() {
  const ref     = useScrollReveal();
  const scanRef = useRef(null);
  useEffect(() => { scanRef.current?.classList.add("anim-scan"); }, []);
  const u = "umar24nov";
  const q = "bg_color=070f1a&hide_border=true";
  return (
    <section ref={ref} className="reveal py-14 md:py-24 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10">
      <SectionHeading label="07 // OPEN SOURCE" title="GitHub Activity" />

      {/* Constrain the whole card to a comfortable reading width */}
      <div className="max-w-[760px] mx-auto relative rounded-xl md:rounded-2xl overflow-hidden border border-[#1a3040] hover:border-[#00d4ff] transition-colors duration-500">
        <div ref={scanRef} className="left-0 right-0 h-[2px] z-20 pointer-events-none bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50" />
        {["top-3 left-3 border-t-2 border-l-2 rounded-tl","top-3 right-3 border-t-2 border-r-2 rounded-tr","bottom-3 left-3 border-b-2 border-l-2 rounded-bl","bottom-3 right-3 border-b-2 border-r-2 rounded-br"].map((cls,i)=>(
          <div key={i} className={`absolute ${cls} border-[#00d4ff] w-5 h-5 z-10`} />
        ))}
        <div className="bg-[#070f1a] p-4 md:p-7">
          {/* Live indicator */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff] anim-blink" />
            <span className="font-spacemono text-[#00d4ff] text-[10px] tracking-[3px]">LIVE — github.com/{u}</span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Streak — clicks to GitHub profile */}
            <div className="flex justify-center">
              <a href={`https://github.com/${u}`} target="_blank" rel="noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                title="View GitHub profile">
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=transparent&${q}&ring=00d4ff&fire=00d4ff&currStreakLabel=00d4ff&sideLabels=6b8599&dates=6b8599&stroke=1a3040`}
                  alt="GitHub Streak"
                  className="rounded-lg h-auto"
                  onError={e => e.target.style.display="none"}
                  style={{filter:"drop-shadow(0 0 8px rgba(0,212,255,0.18))", maxWidth:"min(400px, 100%)", width:"100%"}}
                />
              </a>
            </div>

            {/* Activity graph — clicks to contribution page */}
            <a href={`https://github.com/${u}?tab=overview`} target="_blank" rel="noreferrer"
              className="hover:opacity-80 transition-opacity duration-200 block"
              title="View contribution activity">
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${u}&bg_color=070f1a&color=00d4ff&line=00d4ff&point=ffffff&area=true&area_color=00d4ff&hide_border=true&radius=6`}
                alt="GitHub Activity"
                className="w-full rounded-lg h-auto"
                onError={e => e.target.style.display="none"}
                style={{filter:"drop-shadow(0 0 8px rgba(0,212,255,0.1))"}}
              />
            </a>

            {/* Stats — Shields.io badges, always reliable */}
            <div className="flex flex-wrap justify-center gap-2 px-2">
              {[
                { label:"Followers",   message:"GitHub",  color:"00d4ff", href:`https://github.com/${u}?tab=followers`,    img:`https://img.shields.io/github/followers/${u}?label=Followers&style=for-the-badge&color=00d4ff&labelColor=0d1a2a&logo=github` },
                { label:"Stars",       message:"Stars",   color:"a78bfa", href:`https://github.com/${u}?tab=repositories`, img:`https://img.shields.io/github/stars/${u}?label=Total%20Stars&style=for-the-badge&color=a78bfa&labelColor=0d1a2a&logo=github` },
                { label:"Repos",       message:"Repos",   color:"34d399", href:`https://github.com/${u}?tab=repositories`, img:`https://img.shields.io/badge/dynamic/json?url=https://api.github.com/users/${u}&query=public_repos&label=Public%20Repos&style=for-the-badge&color=34d399&labelColor=0d1a2a&logo=github` },
              ].map(b => (
                <a key={b.label} href={b.href} target="_blank" rel="noreferrer"
                  className="hover:opacity-80 hover:scale-105 transition-all duration-200">
                  <img src={b.img} alt={b.label} className="h-7 rounded" onError={e => e.target.style.display="none"} />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-5 text-center">
            <a href={`https://github.com/${u}`} target="_blank" rel="noreferrer"
              className="font-spacemono text-[#6b8599] text-[11px] tracking-widest no-underline hover:text-[#00d4ff] transition-colors duration-200">
              View full profile on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────
   12. FEEDBACK MODAL
   Slide-up panel. To actually send emails, integrate
   Formspree (free) — see comment inside handleSubmit.
───────────────────────────────────────────────────────── */
const typeOptions = [
  { emoji:"🐛", label:"Bug Report"  },
  { emoji:"💡", label:"Suggestion"  },
  { emoji:"⭐", label:"Compliment"  },
  { emoji:"🤝", label:"Collaborate" },
];
function FeedbackModal({ onClose }) {
  const [type,    setType]    = useState("Bug Report");
  const [name,    setName]    = useState("");
  const [email,   setEmail]   = useState("");
  const [message, setMessage] = useState("");
  const [sent,    setSent]    = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    try {
      await addDoc(collection(db, "feedback"), {
        type,
        name,
        email,
        message,
        createdAt: serverTimestamp()
      });
      setSent(true);
    } catch (err) {
      console.error("Firebase error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    /* Backdrop */
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4" onClick={onClose}>
      {/* Card — narrow (340px), short inputs, 3-row textarea */}
      <div className="w-full max-w-[340px] bg-[#0a1929] border border-[#1a3040] rounded-xl anim-slideUp shadow-[0_8px_40px_rgba(0,0,0,0.8)]" onClick={e=>e.stopPropagation()}>
        <div className="p-4">

          {/* Header row */}
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="font-orbitron text-[#e2eaf2] text-[13px] font-bold leading-tight">Report / Feedback</h3>
              <p className="font-dmsans text-[#6b8599] text-[11px] mt-0.5">Bug? Idea? Let me know!</p>
            </div>
            <button onClick={onClose} className="text-[#6b8599] hover:text-[#e2eaf2] text-base bg-transparent border-none cursor-pointer ml-2">✕</button>
          </div>

          <div className="h-px bg-gradient-to-r from-[#00d4ff] via-[#1a3040] to-transparent mb-3" />

          {sent ? (
            <div className="text-center py-5">
              <div className="text-3xl mb-2">🎉</div>
              <p className="font-orbitron text-[#00d4ff] text-xs mb-1">Thanks!</p>
              <p className="font-dmsans text-[#6b8599] text-[11px]">I'll get back to you soon.</p>
              <button onClick={onClose} className="font-spacemono text-[11px] text-[#00d4ff] border border-[#00d4ff] px-4 py-1.5 rounded mt-3 bg-transparent cursor-pointer hover:bg-[rgba(0,212,255,0.1)] transition-all">Close ✓</button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">

              {/* Type — 2×2 compact grid */}
              <div>
                <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[3px] mb-1.5">TYPE</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {typeOptions.map(({emoji,label}) => (
                    <button key={label} onClick={() => setType(label)}
                      className={`font-spacemono text-[10px] px-2 py-1.5 rounded border cursor-pointer transition-all text-left leading-tight
                                  ${type===label
                                    ? "bg-[rgba(0,212,255,0.15)] border-[#00d4ff] text-[#00d4ff]"
                                    : "bg-transparent border-[#1a3040] text-[#6b8599] hover:border-[#00d4ff]"}`}>
                      {emoji} {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name + Email — side by side */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[2px] mb-1">NAME</p>
                  <input className="form-input" style={{padding:"7px 10px",fontSize:"12px"}} placeholder="Your name" value={name} onChange={e=>setName(e.target.value)} />
                </div>
                <div>
                  <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[2px] mb-1">EMAIL</p>
                  <input className="form-input" style={{padding:"7px 10px",fontSize:"12px"}} type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
                </div>
              </div>

              {/* Message */}
              <div>
                <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[2px] mb-1">MESSAGE <span className="text-[#ff6b6b]">*</span></p>
                <textarea className="form-input resize-none" style={{padding:"7px 10px",fontSize:"12px"}} rows={3} placeholder="Describe the issue or idea..." value={message} onChange={e=>setMessage(e.target.value)} />
              </div>

              {/* Submit */}
              <button onClick={handleSubmit} disabled={!message.trim()}
                className={`font-spacemono text-[11px] font-bold tracking-widest py-2 rounded border-none transition-all cursor-pointer
                            ${message.trim() ? "bg-[#00d4ff] text-black hover:shadow-[0_0_16px_rgba(0,212,255,0.4)]" : "bg-[#1a3040] text-[#3a5060] cursor-not-allowed"}`}>
                Send Feedback ✈
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   13. FLOATING FEEDBACK BUTTON — always bottom-right
───────────────────────────────────────────────────────── */
function FeedbackButton({ onClick }) {
  return (
    <button onClick={onClick} title="Report a bug or share feedback"
      className="fixed bottom-6 right-6 z-[150] flex items-center gap-2 bg-[#0d1a2a] border border-[#1a3040] font-spacemono text-[11px] tracking-wide text-[#e2eaf2] px-4 py-3 rounded-full cursor-pointer hover:border-[#00d4ff] hover:text-[#00d4ff] hover:shadow-[0_0_24px_rgba(0,212,255,0.2)] transition-all duration-200 anim-pulseGlow">
      🐛 <span className="hidden sm:inline">Report / Feedback</span>
    </button>
  );
}

/* ─────────────────────────────────────────────────────────
   14. FOOTER
───────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#1a3040] py-7 text-center relative z-10">
      <p className="font-spacemono text-[#6b8599] text-xs tracking-wide">
        Designed & Built by <span className="text-[#00d4ff]">Mohd Umar</span> · {new Date().getFullYear()} · All Rights Reserved
      </p>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────
   ROOT APP
───────────────────────────────────────────────────────── */
export default function App() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  return (
    <div className="bg-[#050b14] text-[#e2eaf2] min-h-screen overflow-x-hidden">
      <GlobalStyles />
      <AnimatedCanvas />
      <Navbar onFeedback={() => setFeedbackOpen(true)} />
      <main>
        <Hero />
        <About />
        <Projects />
        <Skills />
        <CodeSignature />
        <Education />
        <Contact />
        <GitHubMap />
      </main>
      <Footer />
      <FeedbackButton onClick={() => setFeedbackOpen(true)} />
      {feedbackOpen && <FeedbackModal onClose={() => setFeedbackOpen(false)} />}
    </div>
  );
}
