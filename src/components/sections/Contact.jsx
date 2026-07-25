import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import { SOCIAL_LINKS } from "../../config/constants";

export default function Contact() {
  const contacts = [
    {
      label: "Email",
      value: "umar24nov@gmail.com",
      href: SOCIAL_LINKS.email,
      icon: "📧",
    },
    {
      label: "GitHub",
      value: "github.com/umar24nov",
      href: SOCIAL_LINKS.github,
      icon: "🐙",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/mohammadumarfarook",
      href: SOCIAL_LINKS.linkedin,
      icon: "💼",
    },
  ];

  return (
    <Section id="contact">
      <SectionHeading label="06 // LET'S CONNECT" title="Contact" />

      <div className="max-w-[640px]">
        <p className="font-dmsans text-[#6b8599] text-base leading-relaxed mb-10">
          I'm actively looking for internships, projects and collaborations. Feel free to
          reach out!
        </p>

        <div className="flex flex-col gap-4">
          {contacts.map((c, i) => (
            <motion.a
              key={c.label}
              href={c.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              whileHover={{ x: 8, borderColor: "#00d4ff" }}
              className="flex items-center gap-4 bg-[#0d1a2a] border border-[#1a3040] rounded-xl px-4 md:px-6 py-4 md:py-5 no-underline group transition-all duration-200"
            >
              <span className="text-2xl">{c.icon}</span>
              <div>
                <div className="font-spacemono text-[#00d4ff] text-[11px] tracking-[3px] mb-1">
                  {c.label}
                </div>
                <div className="font-dmsans text-[#e2eaf2] text-sm">{c.value}</div>
              </div>
              <motion.span
                whileHover={{ x: 4 }}
                className="ml-auto text-[#6b8599] text-lg group-hover:text-[#00d4ff] transition-colors"
              >
                →
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </Section>
  );
}
