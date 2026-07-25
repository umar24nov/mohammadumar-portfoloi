import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import SkillBar from "../ui/SkillBar";
import Chip from "../ui/Chip";
import {
  languages,
  tools,
  cloud,
  frontend,
  backend,
  mlTools,
  databases,
} from "../../config/skillsData";

const panelVariant = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1, ease: "easeOut" },
  }),
};

export default function Skills() {
  const panels = [
    // Row 1
    {
      color: "#00d4ff",
      title: "LANGUAGES",
      content: <div>{languages.map((l) => <SkillBar key={l.name} name={l.name} level={l.level} />)}</div>,
    },
    {
      color: "#34d399",
      title: "TOOLS & PLATFORMS",
      content: (
        <>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {tools.map((t) => <Chip key={t.n} label={t.n} color={t.c} />)}
          </div>
          <p className="font-spacemono text-[#34d399] text-[10px] tracking-[2px] mb-3">CLOUD / HOSTING</p>
          <div className="flex flex-wrap gap-2.5">
            {cloud.map((t) => <Chip key={t.n} label={t.n} color={t.c} />)}
          </div>
        </>
      ),
    },
    // Row 2
    {
      color: "#a78bfa",
      title: "FRONTEND",
      content: <div>{frontend.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}</div>,
    },
    {
      color: "#fb923c",
      title: "BACKEND",
      content: <div>{backend.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}</div>,
    },
    {
      color: "#f472b6",
      title: "ML / DATA SCIENCE + DATABASE",
      content: (
        <>
          <div className="flex flex-wrap gap-2 mb-6">
            {mlTools.map((t) => <Chip key={t.n} label={t.n} color={t.c} />)}
          </div>
          <p className="font-spacemono text-[#f472b6] text-[11px] tracking-[3px] mb-4">DATABASE</p>
          <div className="flex flex-wrap gap-2">
            {databases.map((t) => <Chip key={t.n} label={t.n} color={t.c} />)}
          </div>
        </>
      ),
    },
  ];

  return (
    <Section id="skills">
      <SectionHeading label="03 // TOOLBOX" title="Skills" />

      {/* Row 1: Languages + Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        {panels.slice(0, 2).map((panel, i) => (
          <motion.div
            key={panel.title}
            custom={i}
            variants={panelVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ borderColor: panel.color }}
            className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 transition-colors duration-300"
          >
            <p className="font-spacemono text-[11px] tracking-[3px] mb-6" style={{ color: panel.color }}>
              {panel.title}
            </p>
            {panel.content}
          </motion.div>
        ))}
      </div>

      {/* Row 2: Frontend | Backend | ML */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {panels.slice(2).map((panel, i) => (
          <motion.div
            key={panel.title}
            custom={i + 2}
            variants={panelVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ borderColor: panel.color }}
            className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 transition-colors duration-300"
          >
            <p className="font-spacemono text-[11px] tracking-[3px] mb-6" style={{ color: panel.color }}>
              {panel.title}
            </p>
            {panel.content}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
