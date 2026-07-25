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

export default function Skills() {
  return (
    <Section id="skills">
      <SectionHeading label="03 // TOOLBOX" title="Skills" />

      {/* Row 1: Languages + Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-4 md:mb-6">
        {/* Languages — with animated bars */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#00d4ff] transition-colors duration-300">
          <p className="font-spacemono text-[#00d4ff] text-[11px] tracking-[3px] mb-6">
            LANGUAGES
          </p>
          {languages.map((lang) => (
            <SkillBar key={lang.name} name={lang.name} level={lang.level} />
          ))}
        </div>

        {/* Tools & Platforms */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#34d399] transition-colors duration-300">
          <p className="font-spacemono text-[#34d399] text-[11px] tracking-[3px] mb-5">
            TOOLS & PLATFORMS
          </p>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {tools.map((t) => (
              <Chip key={t.n} label={t.n} color={t.c} />
            ))}
          </div>
          <p className="font-spacemono text-[#34d399] text-[10px] tracking-[2px] mb-3">
            CLOUD / HOSTING
          </p>
          <div className="flex flex-wrap gap-2.5 mb-5">
            {cloud.map((t) => (
              <Chip key={t.n} label={t.n} color={t.c} />
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: Frontend | Backend | ML + DB */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {/* Frontend */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#a78bfa] transition-colors duration-300">
          <p className="font-spacemono text-[#a78bfa] text-[11px] tracking-[3px] mb-6">
            FRONTEND
          </p>
          {frontend.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>

        {/* Backend */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#fb923c] transition-colors duration-300">
          <p className="font-spacemono text-[#fb923c] text-[11px] tracking-[3px] mb-6">
            BACKEND
          </p>
          {backend.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </div>

        {/* ML + Database */}
        <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-7 hover:border-[#f472b6] transition-colors duration-300">
          <p className="font-spacemono text-[#f472b6] text-[11px] tracking-[3px] mb-4">
            ML / DATA SCIENCE
          </p>
          <div className="flex flex-wrap gap-2 mb-6">
            {mlTools.map((t) => (
              <Chip key={t.n} label={t.n} color={t.c} />
            ))}
          </div>
          <p className="font-spacemono text-[#f472b6] text-[11px] tracking-[3px] mb-4">
            DATABASE
          </p>
          <div className="flex flex-wrap gap-2">
            {databases.map((t) => (
              <Chip key={t.n} label={t.n} color={t.c} />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
