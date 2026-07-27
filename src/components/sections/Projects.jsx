import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import projects from "../../config/projectsData";

const cardVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(4px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

function ProjectCard({ project, index }) {
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -6 }}
      className="tech-card tech-card-corners p-5 md:p-7"
    >
      <div className="flex gap-2 flex-wrap mb-4">
        {project.featured && (
          <span className="font-code text-[9px] tracking-[2px] px-2.5 py-1 rounded-sm"
            style={{ color: "var(--accent)", backgroundColor: "var(--accent-glow)", border: "1px solid rgba(255,107,53,0.2)" }}>
            FEATURED
          </span>
        )}
        <span className="font-code text-[9px] tracking-[2px] px-2.5 py-1 rounded-sm"
          style={{ color: "var(--green)", backgroundColor: "rgba(0,255,136,0.06)", border: "1px solid rgba(0,255,136,0.15)" }}>
          ✓ {project.status}
        </span>
      </div>

      <div className="text-3xl mb-3">{project.emoji}</div>
      <h3 className="font-code text-base font-bold mb-1 tracking-tight" style={{ color: "var(--text-primary)" }}>
        {project.name}
      </h3>
      <p className="font-code text-[10px] tracking-[2px] mb-4" style={{ color: "var(--accent-mid)" }}>{project.tagline}</p>
      <p className="font-body text-sm leading-relaxed mb-5" style={{ color: "var(--text-secondary)" }}>
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span key={t} className="font-code text-[9px] tracking-wider px-2.5 py-1 rounded-sm"
            style={{ color: "var(--text-secondary)", backgroundColor: "var(--bg-tertiary)", border: "1px solid var(--border-primary)" }}>
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <motion.a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="font-code text-[10px] font-bold tracking-widest no-underline px-4 py-2 rounded-sm inline-flex items-center gap-1.5"
          style={{ background: "var(--gradient-accent)", color: "#fff" }}
        >
          🚀 LIVE DEMO
        </motion.a>
        <motion.a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="font-code text-[10px] tracking-widest no-underline px-4 py-2 rounded-sm inline-flex items-center gap-1.5"
          style={{ border: "1px solid var(--border-primary)", color: "var(--text-secondary)" }}
        >
          🐙 CODE
        </motion.a>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading label="02 // WHAT I'VE BUILT" title="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
