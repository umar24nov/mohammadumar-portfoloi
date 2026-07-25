import Section from "../ui/Section";
import SectionHeading from "../ui/SectionHeading";
import useScrollReveal from "../../hooks/useScrollReveal";
import projects from "../../config/projectsData";

function ProjectCard({ project, index }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`reveal bg-[#0d1a2a] border border-[#1a3040] ${project.border} rounded-xl p-4 md:p-7 relative overflow-hidden hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.5)] transition-all duration-300`}
      style={{ transitionDelay: `${index * 0.12}s` }}
    >
      <div
        className={`absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r ${project.topBar} to-transparent opacity-40`}
      />

      <div className="flex gap-2 flex-wrap mb-4">
        {project.featured && (
          <span
            className={`${project.tag} border font-spacemono text-[10px] tracking-widest px-2.5 py-1 rounded-full`}
          >
            FEATURED
          </span>
        )}
        <span
          className={`${project.tag} border font-spacemono text-[10px] tracking-widest px-2.5 py-1 rounded-full`}
        >
          ✓ {project.status}
        </span>
      </div>

      <div className="text-3xl mb-3">{project.emoji}</div>
      <h3 className="font-orbitron text-[#e2eaf2] text-lg font-bold mb-1">
        {project.name}
      </h3>
      <p className={`font-spacemono ${project.accent} text-[11px] tracking-[2px] mb-4`}>
        {project.tagline}
      </p>
      <p className="font-dmsans text-[#6b8599] text-sm leading-relaxed mb-5">
        {project.description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className={`${project.tag} border font-spacemono text-[10px] px-2.5 py-1 rounded`}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap">
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          className={`font-spacemono text-[11px] font-bold tracking-wide no-underline px-4 py-2 rounded border ${project.tag} hover:opacity-80 transition-opacity duration-200 inline-flex items-center gap-1.5`}
        >
          🚀 Live Demo
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="font-spacemono text-[11px] tracking-wide no-underline px-4 py-2 rounded border border-[#1a3040] text-[#6b8599] hover:border-[#e2eaf2] hover:text-[#e2eaf2] transition-all duration-200 inline-flex items-center gap-1.5"
        >
          🐙 GitHub
        </a>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeading label="02 // WHAT I'VE BUILT" title="Projects" />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.name} project={p} index={i} />
        ))}
      </div>
    </Section>
  );
}
