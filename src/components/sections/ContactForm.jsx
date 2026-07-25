import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        initial={{ opacity: 0, scale: 0.8 }}
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
        <p className="font-orbitron text-[#00d4ff] text-sm mb-1">Message Sent!</p>
        <p className="font-dmsans text-[#6b8599] text-sm mb-4">
          Thanks for reaching out. I'll get back to you soon.
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setSent(false)}
          className="font-spacemono text-[11px] text-[#00d4ff] border border-[#00d4ff] px-4 py-2 rounded bg-transparent cursor-pointer hover:bg-[rgba(0,212,255,0.1)] transition-all"
        >
          Send Another Message
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
          className="bg-[rgba(255,107,107,0.1)] border border-[#ff6b6b] rounded px-4 py-3"
        >
          <p className="font-dmsans text-[#ff6b6b] text-xs">{error}</p>
        </motion.div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[3px] mb-1.5">
            NAME <span className="text-[#ff6b6b]">*</span>
          </p>
          <input
            {...register("name", {
              required: "Name is required",
              maxLength: { value: 100, message: "Name too long" },
            })}
            className={`form-input ${errors.name ? "border-[#ff6b6b]" : ""}`}
            placeholder="Your name"
          />
          {errors.name && (
            <p className="font-dmsans text-[#ff6b6b] text-[10px] mt-1">{errors.name.message}</p>
          )}
        </div>
        <div>
          <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[3px] mb-1.5">
            EMAIL <span className="text-[#ff6b6b]">*</span>
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
            className={`form-input ${errors.email ? "border-[#ff6b6b]" : ""}`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="font-dmsans text-[#ff6b6b] text-[10px] mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[3px] mb-1.5">
          SUBJECT
        </p>
        <input
          {...register("subject", { maxLength: { value: 200, message: "Subject too long" } })}
          className="form-input"
          placeholder="What's this about?"
        />
      </div>

      <div>
        <p className="font-spacemono text-[#6b8599] text-[10px] tracking-[3px] mb-1.5">
          MESSAGE <span className="text-[#ff6b6b]">*</span>
        </p>
        <textarea
          {...register("message", {
            required: "Message is required",
            maxLength: { value: 5000, message: "Message too long" },
          })}
          rows={5}
          className={`form-input resize-none ${errors.message ? "border-[#ff6b6b]" : ""}`}
          placeholder="Tell me about your project, idea, or just say hi..."
        />
        {errors.message && (
          <p className="font-dmsans text-[#ff6b6b] text-[10px] mt-1">{errors.message.message}</p>
        )}
      </div>

      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={!isSubmitting ? { boxShadow: "0 0 20px rgba(0,212,255,0.4)" } : {}}
        whileTap={!isSubmitting ? { scale: 0.97 } : {}}
        className={`font-spacemono text-[11px] font-bold tracking-widest py-3 rounded border-none transition-all cursor-pointer ${
          isSubmitting
            ? "bg-[#1a3040] text-[#3a5060] cursor-not-allowed"
            : "bg-[#00d4ff] text-black hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
        }`}
      >
        {isSubmitting ? "Sending..." : "Send Message ✈"}
      </motion.button>
    </form>
  );
}
