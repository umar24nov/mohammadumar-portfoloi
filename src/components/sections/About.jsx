import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import { SOCIAL_LINKS } from "../../config/constants";

export default function About() {
  const stats = [
    { icon: "🎓", label: "DEGREE", value: "B.Tech CSE" },
    { icon: "💻", label: "PROJECTS", value: "3+" },
    { icon: "🌐", label: "STACK", value: "FULL STACK + ML" },
    { icon: "📍", label: "LOCATION", value: "INDIA" },
  ];

  const links = [
    { label: "EMAIL", href: SOCIAL_LINKS.email, icon: "✉" },
    { label: "GITHUB", href: SOCIAL_LINKS.github, icon: "⌘" },
    { label: "LINKEDIN", href: SOCIAL_LINKS.linkedin, icon: "◆" },
  ];

  return (
    <Section id="about">
      <SectionHeading label="01 // WHO AM I" title="About Me" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        <div>
          <p className="font-body text-lg leading-[1.8] mb-5" style={{ color: "var(--text-primary)" }}>
            Hi! I'm{" "}
            <span className="font-semibold gradient-text">Mohd Umar</span>, a CS fresher who
            loves building software that solves real problems. I thrive at the intersection
            of clean frontend design and solid backend logic.
          </p>
          <p className="font-body text-sm leading-[1.8]" style={{ color: "var(--text-secondary)" }}>
            From study resources platforms to ML performance predictors, I turn ideas into
            polished products. Driven by curiosity — always learning, always shipping.
          </p>

          <div className="mt-8 flex gap-3 flex-wrap">
            {links.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ y: -2, borderColor: "var(--accent)" }}
                className="font-code text-[10px] tracking-[2px] no-underline px-4 py-2.5 rounded-sm inline-flex items-center gap-2"
                style={{ color: "var(--accent)", border: "1px solid var(--border-primary)" }}
              >
                <span>{link.icon}</span> {link.label}
              </motion.a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="tech-card tech-card-corners p-5"
            >
              <div className="text-2xl mb-3">{stat.icon}</div>
              <div className="font-code text-sm font-bold mb-1 tracking-wide" style={{ color: "var(--accent)" }}>
                {stat.value}
              </div>
              <div className="font-code text-[9px] tracking-[3px]" style={{ color: "var(--text-muted)" }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
