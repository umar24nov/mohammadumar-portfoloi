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
  hidden: { opacity: 0, y: 50, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 28 },
  },
  exit: { opacity: 0, y: 30, scale: 0.96, transition: { duration: 0.2 } },
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
        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
        onClick={onClose}
      >
        <motion.div
          key="modal"
          variants={modal}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="w-full max-w-[340px] rounded-sm overflow-hidden"
          style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border-primary)" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="font-code text-[12px] font-bold tracking-wide" style={{ color: "var(--text-primary)" }}>
                  REPORT / FEEDBACK
                </h3>
                <p className="font-code text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
                  Bug? Idea? Let me know!
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="text-base bg-transparent border-none cursor-pointer ml-2"
                style={{ color: "var(--text-muted)" }}
              >
                ✕
              </motion.button>
            </div>

            <div className="h-[1px] my-3" style={{ background: "var(--gradient-accent)", opacity: 0.4 }} />

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
                  <p className="font-code text-[11px] tracking-widest mb-1" style={{ color: "var(--green)" }}>THANKS!</p>
                  <p className="font-body text-[11px]" style={{ color: "var(--text-muted)" }}>
                    I'll get back to you soon.
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={onClose}
                    className="font-code text-[10px] tracking-widest px-4 py-1.5 rounded-sm mt-3 bg-transparent cursor-pointer"
                    style={{ color: "var(--accent)", border: "1px solid var(--accent)" }}
                  >
                    CLOSE ✓
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
                      className="rounded-sm px-3 py-2"
                      style={{ backgroundColor: "rgba(255,71,87,0.08)", border: "1px solid var(--red)" }}
                    >
                      <p className="font-code text-[10px]" style={{ color: "var(--red)" }}>{error}</p>
                    </motion.div>
                  )}

                  <div>
                    <p className="font-code text-[9px] tracking-[3px] mb-1.5" style={{ color: "var(--text-muted)" }}>TYPE</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      {FEEDBACK_TYPES.map(({ emoji, label }) => (
                        <motion.button
                          key={label}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setType(label)}
                          className="font-code text-[9px] px-2 py-1.5 rounded-sm border cursor-pointer text-left leading-tight tracking-wider"
                          style={{
                            backgroundColor: type === label ? "var(--accent-glow)" : "transparent",
                            borderColor: type === label ? "var(--accent)" : "var(--border-primary)",
                            color: type === label ? "var(--accent)" : "var(--text-muted)",
                          }}
                        >
                          {emoji} {label}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="font-code text-[9px] tracking-[2px] mb-1" style={{ color: "var(--text-muted)" }}>NAME</p>
                      <input
                        className="form-input"
                        style={{ padding: "7px 10px", fontSize: "12px" }}
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div>
                      <p className="font-code text-[9px] tracking-[2px] mb-1" style={{ color: "var(--text-muted)" }}>EMAIL</p>
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

                  <div>
                    <p className="font-code text-[9px] tracking-[2px] mb-1" style={{ color: "var(--text-muted)" }}>
                      MESSAGE <span style={{ color: "var(--red)" }}>*</span>
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

                  <motion.button
                    whileHover={message.trim() ? { boxShadow: "0 0 16px var(--accent-glow-strong)" } : {}}
                    whileTap={message.trim() ? { scale: 0.97 } : {}}
                    onClick={handleSubmit}
                    disabled={!message.trim() || loading}
                    className="font-code text-[10px] font-bold tracking-widest py-2 rounded-sm border-none cursor-pointer"
                    style={{
                      background: message.trim() && !loading ? "var(--gradient-accent)" : "var(--bg-tertiary)",
                      color: message.trim() && !loading ? "#fff" : "var(--text-muted)",
                      cursor: message.trim() && !loading ? "pointer" : "not-allowed",
                    }}
                  >
                    {loading ? "SENDING..." : "SEND FEEDBACK →"}
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
