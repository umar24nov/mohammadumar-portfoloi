import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import timeline from "../../config/timelineData";

export default function Education() {
  return (
    <Section id="education">
      <SectionHeading label="05 // MY JOURNEY" title="Education" />

      <div className="relative pl-8 md:pl-10">
        {/* Timeline line */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-3.5 top-0 bottom-0 w-[2px] origin-top"
          style={{ background: "var(--gradient-accent)" }}
        />

        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
            className="relative mb-10"
          >
            {/* Dot */}
            <motion.div
              animate={{ boxShadow: ["0 0 8px var(--accent)", "0 0 16px var(--accent)", "0 0 8px var(--accent)"] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
              className="absolute -left-[26px] md:-left-[28px] top-5 w-3 h-3 rounded-full border-[3px]"
              style={{ backgroundColor: "var(--accent)", borderColor: "var(--bg-primary)" }}
            />

            <div className="tech-card p-5 md:p-6">
              <span className="font-code text-[9px] tracking-[3px]" style={{ color: "var(--accent)" }}>
                {item.period}
              </span>
              <h3 className="font-code text-base font-bold mt-2.5 mb-1 tracking-tight" style={{ color: "var(--text-primary)" }}>
                {item.degree}
              </h3>
              <p className="font-body text-sm mb-3" style={{ color: "var(--accent-mid)" }}>{item.institution}</p>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.detail}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
