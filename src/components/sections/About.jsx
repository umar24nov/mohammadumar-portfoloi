import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import { SOCIAL_LINKS } from "../../config/constants";

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

          <div className="mt-7 flex gap-3 flex-wrap">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="font-spacemono text-[#00d4ff] text-[11px] tracking-wide no-underline border border-[#1a3040] px-3 py-2 rounded hover:border-[#00d4ff] transition-colors duration-200 inline-block"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-5">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-[#0d1a2a] border border-[#1a3040] rounded-xl p-4 md:p-6 hover:border-[#00d4ff] transition-colors duration-300"
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
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
