export default function SectionHeading({ label, title }) {
  return (
    <div className="mb-8 md:mb-14">
      <p className="font-spacemono text-[#00d4ff] text-[11px] tracking-[5px] mb-2">
        {label}
      </p>
      <h2 className="font-orbitron font-extrabold text-[clamp(28px,5vw,44px)] text-[#e2eaf2] m-0">
        {title}
      </h2>
      <div className="mt-3 w-14 h-[3px] rounded bg-gradient-to-r from-[#00d4ff] to-transparent" />
    </div>
  );
}
