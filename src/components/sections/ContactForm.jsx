import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { contactAPI } from "../../config/api";

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    setError("");
    try {
      await contactAPI.submit(data);
      setSent(true);
      reset();
    } catch (err) {
      setError(err.message || "Failed to send message. Please try again.");
    }
  };

  if (sent) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-8"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-4xl mb-3"
        >
          🎉
        </motion.div>
        <p className="font-code text-sm mb-1 tracking-wide" style={{ color: "var(--green)" }}>MESSAGE SENT!</p>
        <p className="font-body text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setSent(false)}
          className="font-code text-[10px] tracking-widest px-5 py-2 rounded-sm bg-transparent cursor-pointer"
          style={{ color: "var(--accent)", border: "1px solid var(--accent)" }}
        >
          SEND ANOTHER
        </motion.button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-sm px-4 py-3"
          style={{ backgroundColor: "rgba(255,71,87,0.08)", border: "1px solid var(--red)" }}
        >
          <p className="font-code text-[11px]" style={{ color: "var(--red)" }}>{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="font-code text-[9px] tracking-[3px] mb-1.5" style={{ color: "var(--text-muted)" }}>
            NAME <span style={{ color: "var(--red)" }}>*</span>
          </p>
          <input
            {...register("name", {
              required: "Name is required",
              maxLength: { value: 100, message: "Name too long" },
            })}
            className={`form-input ${errors.name ? "border-[#ff4757]" : ""}`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="font-code text-[10px] mt-1" style={{ color: "var(--red)" }}>{errors.name.message}</p>
          )}
        </div>
        <div>
          <p className="font-code text-[9px] tracking-[3px] mb-1.5" style={{ color: "var(--text-muted)" }}>
            EMAIL <span style={{ color: "var(--red)" }}>*</span>
          </p>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email",
              },
            })}
            className={`form-input ${errors.email ? "border-[#ff4757]" : ""}`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="font-code text-[10px] mt-1" style={{ color: "var(--red)" }}>{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <p className="font-code text-[9px] tracking-[3px] mb-1.5" style={{ color: "var(--text-muted)" }}>
          SUBJECT
        </p>
        <input
          {...register("subject", { maxLength: { value: 200, message: "Subject too long" } })}
          className="form-input"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <p className="font-code text-[9px] tracking-[3px] mb-1.5" style={{ color: "var(--text-muted)" }}>
          MESSAGE <span style={{ color: "var(--red)" }}>*</span>
        </p>
        <textarea
          {...register("message", {
            required: "Message is required",
            maxLength: { value: 5000, message: "Message too long" },
          })}
          rows={5}
          className={`form-input resize-none ${errors.message ? "border-[#ff4757]" : ""}`}
          placeholder="Tell me about your project, idea, or just say hi..."
        />
        {errors.message && (
          <p className="font-code text-[10px] mt-1" style={{ color: "var(--red)" }}>{errors.message.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={!isSubmitting ? { boxShadow: "0 0 24px var(--accent-glow-strong)" } : {}}
        whileTap={!isSubmitting ? { scale: 0.97 } : {}}
        className="font-code text-[11px] font-bold tracking-widest py-3 rounded-sm border-none cursor-pointer"
        style={{
          background: isSubmitting ? "var(--bg-tertiary)" : "var(--gradient-accent)",
          color: isSubmitting ? "var(--text-muted)" : "#fff",
          cursor: isSubmitting ? "not-allowed" : "pointer",
        }}
      >
        {isSubmitting ? "SENDING..." : "SEND MESSAGE →"}
      </motion.button>
    </form>
  );
}
