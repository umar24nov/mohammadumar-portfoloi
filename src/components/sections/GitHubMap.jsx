import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeading from "../ui/SectionHeading";
import { GITHUB_USERNAME } from "../../config/constants";

export default function GitHubMap() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const u = GITHUB_USERNAME;
  const q = "bg_color=0a0a0f&hide_border=true";

  return (
    <section
      ref={ref}
      className="py-16 md:py-28 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10"
    >
      <SectionHeading label="07 // OPEN SOURCE" title="GitHub Activity" />

      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(4px)" }}
        animate={isInView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[760px] mx-auto relative rounded-sm overflow-hidden"
        style={{ border: "1px solid var(--border-primary)" }}
      >
        {/* Scanning line */}
        <motion.div
          animate={isInView ? { top: ["0%", "100%"] } : {}}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          className="left-0 right-0 h-[1px] z-20 pointer-events-none opacity-40 absolute"
          style={{ background: "linear-gradient(to right, transparent, var(--accent), transparent)" }}
        />

        {/* Corner brackets */}
        {[
          "top-2 left-2 border-t border-l",
          "top-2 right-2 border-t border-r",
          "bottom-2 left-2 border-b border-l",
          "bottom-2 right-2 border-b border-r",
        ].map((cls, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.5 } : {}}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`absolute ${cls} w-4 h-4 z-10`}
            style={{ borderColor: "var(--accent)" }}
          />
        ))}

        <div className="p-5 md:p-7" style={{ backgroundColor: "var(--code-bg)" }}>
          <div className="flex items-center gap-2 mb-5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: "var(--green)", boxShadow: "0 0 6px var(--green)" }}
            />
            <span className="font-code text-[9px] tracking-[3px]" style={{ color: "var(--green)" }}>
              LIVE — github.com/{u}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex justify-center">
              <motion.a
                href={`https://github.com/${u}`}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.02 }}
                title="View GitHub profile"
              >
                <img
                  src={`https://github-readme-streak-stats.herokuapp.com/?user=${u}&theme=transparent&${q}&ring=ff6b35&fire=ff6b35&currStreakLabel=ff6b35&sideLabels=8888a0&dates=8888a0&stroke=22223a`}
                  alt="GitHub Streak"
                  className="rounded h-auto"
                  onError={(e) => (e.target.style.display = "none")}
                  style={{
                    filter: "drop-shadow(0 0 8px rgba(255,107,53,0.15))",
                    maxWidth: "min(400px, 100%)",
                    width: "100%",
                  }}
                />
              </motion.a>
            </div>

            <motion.a
              href={`https://github.com/${u}?tab=overview`}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.01 }}
              className="block"
              title="View contribution activity"
            >
              <img
                src={`https://github-readme-activity-graph.vercel.app/graph?username=${u}&bg_color=0a0a0f&color=ff6b35&line=d63384&point=ffffff&area=true&area_color=ff6b35&hide_border=true&radius=4`}
                alt="GitHub Activity"
                className="w-full rounded h-auto"
                onError={(e) => (e.target.style.display = "none")}
                style={{ filter: "drop-shadow(0 0 8px rgba(255,107,53,0.1))" }}
              />
            </motion.a>

            <div className="flex flex-wrap justify-center gap-2 px-2">
              {[
                {
                  label: "Followers",
                  href: `https://github.com/${u}?tab=followers`,
                  img: `https://img.shields.io/github/followers/${u}?label=Followers&style=for-the-badge&color=ff6b35&labelColor=12121a&logo=github`,
                },
                {
                  label: "Stars",
                  href: `https://github.com/${u}?tab=repositories`,
                  img: `https://img.shields.io/github/stars/${u}?label=Total%20Stars&style=for-the-badge&color=7c3aed&labelColor=12121a&logo=github`,
                },
                {
                  label: "Repos",
                  href: `https://github.com/${u}?tab=repositories`,
                  img: `https://img.shields.io/badge/dynamic/json?url=https://api.github.com/users/${u}&query=public_repos&label=Public%20Repos&style=for-the-badge&color=00ff88&labelColor=12121a&logo=github`,
                },
              ].map((b) => (
                <motion.a
                  key={b.label}
                  href={b.href}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={b.img}
                    alt={b.label}
                    className="h-7 rounded"
                    onError={(e) => (e.target.style.display = "none")}
                  />
                </motion.a>
              ))}
            </div>
          </div>

          <div className="mt-5 text-center">
            <motion.a
              href={`https://github.com/${u}`}
              target="_blank"
              rel="noreferrer"
              whileHover={{ color: "var(--accent)" }}
              className="font-code text-[10px] tracking-[3px] no-underline"
              style={{ color: "var(--text-muted)" }}
            >
              VIEW FULL PROFILE ↗
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
