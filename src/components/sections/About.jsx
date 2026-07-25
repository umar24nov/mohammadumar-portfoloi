import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import { SOCIAL_LINKS } from "../../config/constants";

const cardVariant = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 150, damping: 15 } },
};

export default function About() {
  const stats = [
    { icon: "🎓", label: "Degree", value: "B.Tech CSE" },
    { icon: "💻", label: "Projects", value: "3+" },
    { icon: "🌐", label: "Skills", value: "dev+ml" },
    { icon: "📍", label: "Location", value: "India" },
  ];

  const links = [
    { label: "📧 Email", href: SOCIAL_LINKS.email },
    { label: "🐙 GitHub", href: SOCIAL_LINKS.github },
    { label: "💼 LinkedIn", href: SOCIAL_LINKS.linkedin },
  ];

  return (
    <Section id="about">
      <SectionHeading label="01 // WHO AM I" title="About Me" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
        <div>
          <p className="font-dmsans text-[#e2eaf2] text-lg leading-loose mb-5">
            Hi! I'm{" "}
            <span className="text-[#00d4ff] font-bold">Mohd Umar</span>, a CS fresher who
            loves building software that solves real problems. I thrive at the intersection
            of clean frontend design and solid backend logic.
          </p>
          <p className="font-dmsans text-[#6b8599] text-sm leading-loose">
            From study resources platforms to ML performance predictors, I turn ideas into
            polished products. Driven by curiosity — always learning, always shipping.
          </p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-7 flex gap-3 flex-wrap"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 + i * 0.1 }}
                whileHover={{ y: -2, borderColor: "#00d4ff" }}
                className="font-spacemono text-[#00d4ff] text-[11px] tracking-wide no-underline border border-[#1a3040] px-3 py-2 rounded transition-colors duration-200 inline-block"
              >
                {link.label}
              </motion.a>
            ))}
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -5, borderColor: "#00d4ff" }}
              className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-6 transition-colors duration-300"
            >
              <div className="text-3xl mb-3">{stat.icon}</div>
              {stat.value === "dev+ml" ? (
                <div className="font-orbitron text-[#00d4ff] text-sm font-bold mb-1 leading-snug">
                  <div>Frontend</div>
                  <div>Machine Learning</div>
                </div>
              ) : (
                <div className="font-orbitron text-[#00d4ff] text-lg font-bold mb-1">
                  {stat.value}
                </div>
              )}
              <div className="font-spacemono text-[#6b8599] text-[11px] tracking-widest">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
