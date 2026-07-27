import { motion } from "framer-motion";
import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import ContactForm from "./ContactForm";
import { SOCIAL_LINKS } from "../../config/constants";

export default function Contact() {
  const contacts = [
    { label: "EMAIL", value: "umar24nov@gmail.com", href: SOCIAL_LINKS.email, icon: "✉" },
    { label: "GITHUB", value: "github.com/umar24nov", href: SOCIAL_LINKS.github, icon: "⌘" },
    { label: "LINKEDIN", value: "linkedin.com/in/mohammadumarfarook", href: SOCIAL_LINKS.linkedin, icon: "◆" },
  ];

  return (
    <Section id="contact">
      <SectionHeading label="06 // LET'S CONNECT" title="Contact" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        <div>
          <p className="font-body text-base leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
            I'm actively looking for internships, projects and collaborations. Feel free to
            reach out!
          </p>

          <div className="flex flex-col gap-3 mb-8">
            {contacts.map((c, i) => (
              <motion.a
                key={c.label}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                whileHover={{ x: 6 }}
                className="flex items-center gap-4 rounded-sm px-5 py-4 no-underline group transition-all duration-200"
                style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)" }}
              >
                <span className="text-lg" style={{ color: "var(--accent)" }}>{c.icon}</span>
                <div>
                  <div className="font-code text-[9px] tracking-[3px] mb-1" style={{ color: "var(--accent)" }}>
                    {c.label}
                  </div>
                  <div className="font-body text-sm" style={{ color: "var(--text-primary)" }}>{c.value}</div>
                </div>
                <span className="ml-auto text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                  →
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="tech-card p-5 md:p-7"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--green)" }} />
            <p className="font-code text-[10px] tracking-[3px]" style={{ color: "var(--green)" }}>
              SEND A MESSAGE
            </p>
          </div>
          <ContactForm />
        </motion.div>
      </div>
    </Section>
  );
}
