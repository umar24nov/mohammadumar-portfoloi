const chipColors = {
  cyan:   "bg-[rgba(0,212,255,0.08)]   text-[#00d4ff]  border-[rgba(0,212,255,0.2)]",
  purple: "bg-[rgba(167,139,250,0.08)] text-[#a78bfa]  border-[rgba(167,139,250,0.2)]",
  green:  "bg-[rgba(52,211,153,0.08)]  text-[#34d399]  border-[rgba(52,211,153,0.2)]",
  orange: "bg-[rgba(251,146,60,0.08)]  text-[#fb923c]  border-[rgba(251,146,60,0.2)]",
  pink:   "bg-[rgba(244,114,182,0.08)] text-[#f472b6]  border-[rgba(244,114,182,0.2)]",
};

export default function Chip({ label, color = "cyan" }) {
  return (
    <span
      className={`${chipColors[color]} border font-spacemono text-[11px] px-3 py-1.5 rounded-md tracking-wide`}
    >
      {label}
    </span>
  );
}
