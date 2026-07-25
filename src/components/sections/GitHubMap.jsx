import { useEffect, useRef } from "react";
import useScrollReveal from "../../hooks/useScrollReveal";
import SectionHeading from "../ui/SectionHeading";
import { GITHUB_USERNAME } from "../../config/constants";

export default function GitHubMap() {
  const ref = useScrollReveal();
  const scanRef = useRef(null);

  useEffect(() => {
    scanRef.current?.classList.add("anim-scan");
  }, []);

  const u = GITHUB_USERNAME;
  const q = "bg_color=070f1a&hide_border=true";

  return (
    <section
      ref={ref}
      className="reveal py-14 md:py-24 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10"
    >
      <SectionHeading label="07 // OPEN SOURCE" title="GitHub Activity" />

      <div className="max-w-[760px] mx-auto relative rounded-xl md:rounded-2xl overflow-hidden border border-[#1a3040] hover:border-[#00d4ff] transition-colors duration-500">
        <div
          ref={scanRef}
          className="left-0 right-0 h-[2px] z-20 pointer-events-none bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-50"
        />

        {[
          "top-3 left-3 border-t-2 border-l-2 rounded-tl",
          "top-3 right-3 border-t-2 border-r-2 rounded-tr",
          "bottom-3 left-3 border-b-2 border-l-2 rounded-bl",
          "bottom-3 right-3 border-b-2 border-r-2 rounded-br",
        ].map((cls, i) => (
          <div
            key={i}
            className={`absolute ${cls} border-[#00d4ff] w-5 h-5 z-10`}
          />
        ))}

        <div className="bg-[#070f1a] p-4 md:p-7">
          {/* Live indicator */}
          <div className="flex items-center gap-2 mb-5">
            <div className="w-2 h-2 rounded-full bg-[#00d4ff] shadow-[0_0_6px_#00d4ff] anim-blink" />
            <span className="font-spacemono text-[#00d4ff] text-[10px] tracking-[3px]">
              LIVE — github.com/{u}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            {/* Streak */}
            <div className="flex justify-center">
              <a
                href={`https://github.com/${u}`}
                target="_blank"
                rel="noreferrer"
                className="hover:opacity-80 transition-opacity duration-200"
                title="View GitHub profile"
              >
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=transparent&${q}&ring=00d4ff&fire=00d4ff&currStreakLabel=00d4ff&sideLabels=6b8599&dates=6b8599&stroke=1a3040`}
                  alt="GitHub Streak"
                  className="rounded-lg h-auto"
                  onError={(e) => (e.target.style.display = "none")}
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(0,212,255,0.18))",
                    maxWidth: "min(400px, 100%)",
                    width: "100%",
                  }}
                />
              </a>
            </div>

            {/* Activity graph */}
            <a
              href={`https://github.com/${u}?tab=overview`}
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80 transition-opacity duration-200 block"
              title="View contribution activity"
            >
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${u}&bg_color=070f1a&color=00d4ff&line=00d4ff&point=ffffff&area=true&area_color=00d4ff&hide_border=true&radius=6`}
                alt="GitHub Activity"
                className="w-full rounded-lg h-auto"
                onError={(e) => (e.target.style.display = "none")}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(0,212,255,0.1))",
                }}
              />
            </a>

            {/* Stats badges */}
            <div className="flex flex-wrap justify-center gap-2 px-2">
              {[
                {
                  label: "Followers",
                  href: `https://github.com/${u}?tab=followers`,
                  img: `https://img.shields.io/github/followers/${u}?label=Followers&style=for-the-badge&color=00d4ff&labelColor=0d1a2a&logo=github`,
                },
                {
                  label: "Stars",
                  href: `https://github.com/${u}?tab=repositories`,
                  img: `https://img.shields.io/github/stars/${u}?label=Total%20Stars&style=for-the-badge&color=a78bfa&labelColor=0d1a2a&logo=github`,
                },
                {
                  label: "Repos",
                  href: `https://github.com/${u}?tab=repositories`,
                  img: `https://img.shields.io/badge/dynamic/json?url=https://api.github.com/users/${u}&query=public_repos&label=Public%20Repos&style=for-the-badge&color=34d399&labelColor=0d1a2a&logo=github`,
                },
              ].map((b) => (
                <a
                  key={b.label}
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:opacity-80 hover:scale-105 transition-all duration-200"
                >
                  <img
                    src={b.img}
                    alt={b.label}
                    className="h-7 rounded"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-5 text-center">
            <a
              href={`https://github.com/${u}`}
              target="_blank"
              rel="noreferrer"
              className="font-spacemono text-[#6b8599] text-[11px] tracking-widest no-underline hover:text-[#00d4ff] transition-colors duration-200"
            >
              View full profile on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
