const chipStyles = {
  cyan:   { color: "var(--cyan)",    bg: "rgba(34,211,238,0.06)",  border: "rgba(34,211,238,0.15)" },
  purple: { color: "var(--purple)",  bg: "rgba(124,58,237,0.06)",  border: "rgba(124,58,237,0.15)" },
  green:  { color: "var(--green)",   bg: "rgba(0,255,136,0.06)",   border: "rgba(0,255,136,0.15)" },
  orange: { color: "var(--orange)",  bg: "rgba(255,107,53,0.06)",  border: "rgba(255,107,53,0.15)" },
  pink:   { color: "var(--magenta)", bg: "rgba(214,51,132,0.06)",  border: "rgba(214,51,132,0.15)" },
};

export default function Chip({ label, color = "cyan" }) {
  const s = chipStyles[color] || chipStyles.cyan;
  return (
    <span
      className="font-code text-[10px] px-3 py-1.5 rounded-sm tracking-wider"
      style={{ backgroundColor: s.bg, color: s.color, border: `1px solid ${s.border}` }}
    >
      {label}
    </span>
  );
}
