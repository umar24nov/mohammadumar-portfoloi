import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import timeline from "../../config/timelineData";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading label="05 // MY JOURNEY" title="Education" />

      <div className="relative pl-7 md:pl-10">
        {/* Timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00d4ff] to-[#1a3040] origin-top"
        />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.5 }}
            className="relative mb-11"
          >
            {/* Glowing dot */}
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 10px #00d4ff",
                  "0 0 20px #00d4ff",
                  "0 0 10px #00d4ff",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
              className="absolute -left-[27px] md:-left-[31px] top-4 w-3.5 h-3.5 rounded-full bg-[#00d4ff] border-[3px] border-[#050b14]"
            />

            <motion.div
              whileHover={{ borderColor: "#00d4ff" }}
              className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-6 transition-colors duration-300"
            >
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
            </motion.div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
