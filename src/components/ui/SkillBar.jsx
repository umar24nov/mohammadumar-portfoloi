import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

export default function SkillBar({ name, level }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setAnimated(true), 100);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-code text-[12px] tracking-wide" style={{ color: "var(--text-primary)" }}>{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-code text-[10px]"
          style={{ color: "var(--accent)" }}
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1 rounded-full overflow-hidden" ref={ref} style={{ backgroundColor: "var(--bg-tertiary)" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={animated ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full"
          style={{ background: "var(--gradient-accent)", boxShadow: "0 0 10px var(--accent-glow-strong)" }}
        />
      </div>
    </div>
  );
}
