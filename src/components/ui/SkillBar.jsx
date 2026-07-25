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
    <div className="mb-4">
      <div className="flex justify-between mb-1.5">
        <span className="font-dmsans text-[#e2eaf2] text-sm">{name}</span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3 }}
          className="font-spacemono text-[#00d4ff] text-xs"
        >
          {level}%
        </motion.span>
      </div>
      <div className="h-1.5 bg-[#1a3040] rounded-full overflow-hidden" ref={ref}>
        <motion.div
          initial={{ width: 0 }}
          animate={animated ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#00d4ff] to-[#00aacc] rounded-full shadow-[0_0_8px_#00d4ff]"
        />
      </div>
    </div>
  );
}
