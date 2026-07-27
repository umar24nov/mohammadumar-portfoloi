import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer
      className="py-8 text-center relative z-10"
      style={{ borderTop: "1px solid var(--border-primary)" }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-col items-center gap-3"
      >
        <p className="font-code text-[10px] tracking-[3px]" style={{ color: "var(--text-muted)" }}>
          DESIGNED & BUILT BY
        </p>
        <p className="font-code text-xs tracking-widest" style={{ color: "var(--accent)" }}>
          MOHD UMAR
        </p>
        <div className="w-8 h-[1px] my-1" style={{ background: "var(--gradient-accent)" }} />
        <p className="font-code text-[10px] tracking-wide" style={{ color: "var(--text-muted)" }}>
          © {new Date().getFullYear()} · ALL RIGHTS RESERVED
        </p>
      </motion.div>
    </footer>
  );
}
