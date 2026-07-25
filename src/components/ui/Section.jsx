import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Section({ id, children }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="py-14 md:py-24 px-4 sm:px-6 md:px-[5vw] max-w-[1100px] mx-auto relative z-10"
    >
      {children}
    </motion.section>
  );
}
