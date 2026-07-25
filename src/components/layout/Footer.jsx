export default function Footer() {
  return (
    <footer className="border-t border-[#1a3040] py-7 text-center relative z-10">
      <p className="font-spacemono text-[#6b8599] text-xs tracking-wide">
        Designed & Built by{" "}
        <span className="text-[#00d4ff]">Mohd Umar</span> · {new Date().getFullYear()} · All
        Rights Reserved
      </p>
    </footer>
  );
}
