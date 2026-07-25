import { useRef, useEffect } from "react";

export default function SkillBar({ name, level }) {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.classList.add("filled");
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-dmsans text-[#e2eaf2] text-sm">{name}</span>
        <span className="font-spacemono text-[#00d4ff] text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-[#1a3040] rounded-full overflow-hidden">
        <div
          ref={barRef}
          className="skill-bar h-full bg-gradient-to-r from-[#00d4ff] to-[#00aacc] rounded-full shadow-[0_0_8px_#00d4ff]"
          style={{ "--skill-level": `${level}%` }}
        />
      </div>
    </div>
  );
}
