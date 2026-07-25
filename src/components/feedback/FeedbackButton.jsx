import { motion } from "framer-motion";

export default function FeedbackButton({ onClick }) {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", delay: 1.5, stiffness: 200 }}
      whileHover={{ scale: 1.1, borderColor: "#00d4ff", color: "#00d4ff", boxShadow: "0 0 24px rgba(0,212,255,0.2)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      title="Report a bug or share feedback"
      className="fixed bottom-6 right-6 z-[150] flex items-center gap-2 bg-[#0d1a2a] border border-[#1a3040] font-spacemono text-[11px] tracking-wide text-[#e2eaf2] px-4 py-3 rounded-full cursor-pointer transition-all duration-200"
    >
      <motion.span
        animate={{
          boxShadow: [
            "0 0 8px rgba(0,212,255,0.3)",
            "0 0 22px rgba(0,212,255,0.8)",
            "0 0 8px rgba(0,212,255,0.3)",
          ],
        }}
        transition={{ duration: 2.2, repeat: Infinity }}
        className="px-1"
      >
        🐛
      </motion.span>
      <span className="hidden sm:inline">Report / Feedback</span>
    </motion.button>
  );
}
