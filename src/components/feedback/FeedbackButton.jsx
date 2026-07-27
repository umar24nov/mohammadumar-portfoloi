import { motion } from "framer-motion";

export default function FeedbackButton({ onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay: 1.5, stiffness: 200 }}
      whileHover={{ scale: 1.08, boxShadow: "0 0 20px var(--accent-glow-strong)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      title="Report a bug or share feedback"
      className="fixed bottom-6 right-6 z-[150] flex items-center gap-2 font-code text-[10px] tracking-widest px-4 py-3 rounded-sm cursor-pointer"
      style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border-primary)", color: "var(--text-primary)" }}
    >
      <motion.span
        animate={{ boxShadow: ["0 0 6px var(--red)", "0 0 16px var(--red)", "0 0 6px var(--red)"] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: "var(--red)" }}
      />
      <span className="hidden sm:inline">BUG</span>
    </motion.button>
  );
}
