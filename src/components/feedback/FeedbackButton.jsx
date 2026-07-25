export default function FeedbackButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      title="Report a bug or share feedback"
      className="fixed bottom-6 right-6 z-[150] flex items-center gap-2 bg-[#0d1a2a] border border-[#1a3040] font-spacemono text-[11px] tracking-wide text-[#e2eaf2] px-4 py-3 rounded-full cursor-pointer hover:border-[#00d4ff] hover:text-[#00d4ff] hover:shadow-[0_0_24px_rgba(0,212,255,0.2)] transition-all duration-200 anim-pulseGlow"
    >
      🐛 <span className="hidden sm:inline">Report / Feedback</span>
    </button>
  );
}
