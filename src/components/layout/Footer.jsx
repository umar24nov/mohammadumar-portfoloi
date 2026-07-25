import { motion } from "framer-motion";
import { useTheme } from "../../context/ThemeContext";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer
      className={`border-t py-7 text-center relative z-10 transition-colors duration-500 ${
        theme === "dark" ? "border-[#1a3040]" : "border-gray-200"
      }`}
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-spacemono text-[#6b8599] text-xs tracking-wide"
      >
        Designed & Built by{" "}
        <span className="text-[#00d4ff]">Mohd Umar</span> · {new Date().getFullYear()} ·
        All Rights Reserved
      </motion.p>
    </footer>
  );
}
