import { motion } from "framer-motion";

export default function SectionHeading({ label, title }) {
  return (
    <div className="mb-10 md:mb-16">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
        <p className="font-code text-[10px] tracking-[4px]" style={{ color: "var(--accent)" }}>
          {label}
        </p>
      </div>
      <h2 className="font-code font-bold text-[clamp(26px,5vw,42px)] m-0 tracking-tight" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        className="mt-4 w-16 h-[2px] origin-left"
        style={{ background: "var(--gradient-accent)" }}
      />
    </div>
  );
}
