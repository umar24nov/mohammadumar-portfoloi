import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { feedbackAPI } from "../../config/api";
import { FEEDBACK_TYPES } from "../../config/constants";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, y: 60, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 25 },
  },
  exit: { opacity: 0, y: 40, scale: 0.95, transition: { duration: 0.2 } },
};

export default function FeedbackModal({ onClose }) {
  const [type, setType] = useState("Bug Report");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setError("");
    try {
      await feedbackAPI.submit({ type, name, email, message });
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-[340px] bg-[#0a1929] border border-[#1a3040] rounded-xl shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-orbitron text-[#e2eaf2] text-[13px] font-bold leading-tight">
                  Report / Feedback
                </h3>
                <p className="font-dmsans text-[#6b8599] text-[11px] mt-0.5">
                  Bug? Idea? Let me know!
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, color: "#e2eaf2" }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-[#6b8599] text-base bg-transparent border-none cursor-pointer ml-2"
              >
                ✕
              </motion.button>
            </div>

            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="h-px bg-gradient-to-r from-[#00d4ff] via-[#1a3040] to-transparent mb-3 origin-left"
            />

            <AnimatePresence mode="wait">
              {sent ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-center py-5"
                >
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-3xl mb-2"
                  >
                    🎉
                  </motion.div>
                  <p className="font-orbitron text-[#00d4ff] text-xs mb-1">Thanks!</p>
                  <p className="font-dmsans text-[#6b8599] text-[11px]">
                    I'll get back to you soon.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onClose}
                    className="font-spacemono text-[11px] text-[#00d4ff] border border-[#00d4ff] px-4 py-1.5 rounded mt-3 bg-transparent cursor-pointer hover:bg-[rgba(0,212,255,0.1)] transition-all"
                  >
                    Close ✓
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col gap-2.5"
                >
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="bg-[rgba(255,107,107,0.1)] border border-[#ff6b6b] rounded px-3 py-2"
                    >
                      <p className="font-dmsans text-[#ff6b6b] text-[11px]">{error}</p>
                    </motion.div>
                  )}
                  {/* Type selector */}
                  <div>
                    <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[3px] mb-1.5">
                      TYPE
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {FEEDBACK_TYPES.map(({ emoji, label }) => (
                        <motion.button
                          key={label}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setType(label)}
                          className={`font-spacemono text-[10px] px-2 py-1.5 rounded border cursor-pointer transition-all text-left leading-tight ${
                            type === label
                              ? "bg-[rgba(0,212,255,0.15)] border-[#00d4ff] text-[#00d4ff]"
                              : "bg-transparent border-[#1a3040] text-[#6b8599] hover:border-[#00d4ff]"
                          }`}
                        >
                          {emoji} {label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  {/* Name + Email */}
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[2px] mb-1">
                        NAME
                      </p>
                      <input
                        className="form-input"
                        style={{ padding: "7px 10px", fontSize: "12px" }}
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[2px] mb-1">
                        EMAIL
                      </p>
                      <input
                        className="form-input"
                        style={{ padding: "7px 10px", fontSize: "12px" }}
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[2px] mb-1">
                      MESSAGE <span className="text-[#ff6b6b]">*</span>
                    </p>
                    <textarea
                      className="form-input resize-none"
                      style={{ padding: "7px 10px", fontSize: "12px" }}
                      rows={3}
                      placeholder="Describe the issue or idea..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    whileHover={message.trim() ? { boxShadow: "0 0 16px rgba(0,212,255,0.4)" } : {}}
                    whileTap={message.trim() ? { scale: 0.97 } : {}}
                    onClick={handleSubmit}
                    disabled={!message.trim() || loading}
                    className={`font-spacemono text-[11px] font-bold tracking-widest py-2 rounded border-none transition-all cursor-pointer ${
                      message.trim() && !loading
                        ? "bg-[#00d4ff] text-black"
                        : "bg-[#1a3040] text-[#3a5060] cursor-not-allowed"
                    }`}
                  >
                    {loading ? "Sending..." : "Send Feedback ✈"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
