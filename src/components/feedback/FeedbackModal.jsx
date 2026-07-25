import { useState } from "react";
import { db } from "../../config/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { FEEDBACK_TYPES } from "../../config/constants";

export default function FeedbackModal({ onClose }) {
  const [type, setType] = useState("Bug Report");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = async () => {
    if (!message.trim()) return;
    try {
      await addDoc(collection(db, "feedback"), {
        type,
        name,
        email,
        message,
        createdAt: serverTimestamp(),
      });
      setSent(true);
    } catch (err) {
      console.error("Firebase error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[340px] bg-[#0a1929] border border-[#1a3040] rounded-xl anim-slideUp shadow-[0_8px_40px_rgba(0,0,0,0.8)]"
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
            <button
              onClick={onClose}
              className="text-[#6b8599] hover:text-[#e2eaf2] text-base bg-transparent border-none cursor-pointer ml-2"
            >
              ✕
            </button>
          </div>

          <div className="h-px bg-gradient-to-r from-[#00d4ff] via-[#1a3040] to-transparent mb-3" />

          {sent ? (
            <div className="text-center py-5">
              <div className="text-3xl mb-2">🎉</div>
              <p className="font-orbitron text-[#00d4ff] text-xs mb-1">Thanks!</p>
              <p className="font-dmsans text-[#6b8599] text-[11px]">
                I'll get back to you soon.
              </p>
              <button
                onClick={onClose}
                className="font-spacemono text-[11px] text-[#00d4ff] border border-[#00d4ff] px-4 py-1.5 rounded mt-3 bg-transparent cursor-pointer hover:bg-[rgba(0,212,255,0.1)] transition-all"
              >
                Close ✓
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {/* Type selector */}
              <div>
                <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[3px] mb-1.5">
                  TYPE
                </p>
                <div className="grid grid-cols-2 gap-1.5">
                  {FEEDBACK_TYPES.map(({ emoji, label }) => (
                    <button
                      key={label}
                      onClick={() => setType(label)}
                      className={`font-spacemono text-[10px] px-2 py-1.5 rounded border cursor-pointer transition-all text-left leading-tight ${
                        type === label
                          ? "bg-[rgba(0,212,255,0.15)] border-[#00d4ff] text-[#00d4ff]"
                          : "bg-transparent border-[#1a3040] text-[#6b8599] hover:border-[#00d4ff]"
                      }`}
                    >
                      {emoji} {label}
                    </button>
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
              <button
                onClick={handleSubmit}
                disabled={!message.trim()}
                className={`font-spacemono text-[11px] font-bold tracking-widest py-2 rounded border-none transition-all cursor-pointer ${
                  message.trim()
                    ? "bg-[#00d4ff] text-black hover:shadow-[0_0_16px_rgba(0,212,255,0.4)]"
                    : "bg-[#1a3040] text-[#3a5060] cursor-not-allowed"
                }`}
              >
                Send Feedback ✈
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
