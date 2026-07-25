import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import timeline from "../../config/timelineData";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading label="05 // MY JOURNEY" title="Education" />

      <div className="relative pl-7 md:pl-10">
        <div className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00d4ff] to-[#1a3040]" />

        {timeline.map((item, i) => (
          <div key={i} className="relative mb-11">
            <div className="absolute -left-[27px] md:-left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-[#00d4ff] border-[3px] border-[#050b14] shadow-[0_0_10px_#00d4ff]" />

            <div className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-6 hover:border-[#00d4ff] transition-colors duration-300">
              <span className="font-spacemono text-[#00d4ff] text-[11px] tracking-[3px]">
                {item.period}
              </span>
              <h3 className="font-orbitron text-[#e2eaf2] text-lg font-bold mt-2.5 mb-1">
                {item.degree}
              </h3>
              <p className="font-dmsans text-[#00aacc] text-sm mb-3">{item.institution}</p>
              <p className="font-dmsans text-[#6b8599] text-sm leading-relaxed">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
