import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import SkillBar from "../ui/SkillBar";
import Chip from "../ui/Chip";
import { languages, tools, cloud, frontend, backend, mlTools, databases } from "../../config/skillsData";

const panelVariant = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  show: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  const panels = [
    { color: "var(--accent)",  title: "LANGUAGES",           content: <div>{languages.map((l) => <SkillBar key={l.name} name={l.name} level={l.level} />)}</div> },
    { color: "var(--green)",   title: "TOOLS & PLATFORMS",   content: (
      <>
        <div className="flex flex-wrap gap-2 mb-5">{tools.map((t) => <Chip key={t.n} label={t.n} color={t.c} />)}</div>
        <p className="font-code text-[9px] tracking-[3px] mb-3" style={{ color: "var(--green)" }}>CLOUD / HOSTING</p>
        <div className="flex flex-wrap gap-2">{cloud.map((t) => <Chip key={t.n} label={t.n} color={t.c} />)}</div>
      </>
    )},
    { color: "var(--purple)",  title: "FRONTEND",            content: <div>{frontend.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}</div> },
    { color: "var(--orange)",  title: "BACKEND",             content: <div>{backend.map((s) => <SkillBar key={s.name} name={s.name} level={s.level} />)}</div> },
    { color: "var(--magenta)", title: "ML / DATA + DATABASE", content: (
      <>
        <div className="flex flex-wrap gap-2 mb-5">{mlTools.map((t) => <Chip key={t.n} label={t.n} color={t.c} />)}</div>
        <p className="font-code text-[9px] tracking-[3px] mb-3" style={{ color: "var(--magenta)" }}>DATABASE</p>
        <div className="flex flex-wrap gap-2">{databases.map((t) => <Chip key={t.n} label={t.n} color={t.c} />)}</div>
      </>
    )},
  ];

  return (
    <Section id="skills">
      <SectionHeading label="03 // TOOLBOX" title="Skills" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mb-4 md:mb-5">
        {panels.slice(0, 2).map((panel, i) => (
          <motion.div
            key={panel.title}
            custom={i}
            variants={panelVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="tech-card p-5 md:p-7"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: panel.color }} />
              <p className="font-code text-[10px] tracking-[3px]" style={{ color: panel.color }}>{panel.title}</p>
            </div>
            {panel.content}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
        {panels.slice(2).map((panel, i) => (
          <motion.div
            key={panel.title}
            custom={i + 2}
            variants={panelVariant}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            whileHover={{ y: -3 }}
            className="tech-card p-5 md:p-7"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: panel.color }} />
              <p className="font-code text-[10px] tracking-[3px]" style={{ color: panel.color }}>{panel.title}</p>
            </div>
            {panel.content}
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
