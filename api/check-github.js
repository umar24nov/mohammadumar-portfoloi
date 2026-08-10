const GITHUB_USER = process.env.GITHUB_USERNAME || "umar24nov";

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

function todayInIST() {
  const now = new Date();
  const ist = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));
  ist.setHours(0, 0, 0, 0);
  return ist;
}

function sameISTDay(a, b) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

async function getTodayCommits() {
  const url = `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "portfolio-github-monitor",
      ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
    },
  });

  if (!res.ok) {
    throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  }

  const events = await res.json();
  const startIST = todayInIST();
  let totalCommits = 0;
  let pushes = 0;

  for (const e of events) {
    if (e.type !== "PushEvent") continue;
    const when = new Date(e.created_at);
    if (!sameISTDay(when, startIST)) continue;
    pushes += 1;
    totalCommits += e.payload?.size ?? e.payload?.commits?.length ?? 0;
  }

  return { totalCommits, pushes };
}

async function sendEmail(totalCommits, pushes) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY not configured");
  }

  const to = process.env.CONTACT_TO || "umar24nov@gmail.com";
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";
  const dateStr = new Date().toLocaleDateString("en-IN", {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    day: "numeric",
    month: "short",
  });

  const html = `
    <div style="font-family: 'JetBrains Mono', monospace; background: #0a0a0f; color: #e6e6f0; padding: 24px; border-radius: 8px;">
      <div style="font-size: 12px; letter-spacing: 3px; color: #ff6b35; margin-bottom: 16px;">GITHUB STREAK ALERT</div>
      <p style="margin: 4px 0; font-size: 14px;">Your contribution graph didn't move on <strong style="color: #00ff88;">${esc(dateStr)}</strong>.</p>
      <p style="margin: 8px 0 0; font-size: 13px; color: #8888a0;">${totalCommits} commits (${pushes} pushes) on <a href="https://github.com/${esc(GITHUB_USER)}" style="color: #d63384;">github.com/${esc(GITHUB_USER)}</a>.</p>
      <p style="margin-top: 20px; font-size: 11px; color: #555570;">Push a commit to keep your streak alive!</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({
      from,
      to,
      subject: `⚠️ No GitHub commits today (${dateStr})`,
      html,
    }),
  });

  if (!res.ok) {
    throw new Error(`Resend ${res.status}: ${await res.text()}`);
  }
}

export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { totalCommits, pushes } = await getTodayCommits();

    if (totalCommits === 0) {
      await sendEmail(totalCommits, pushes);
      return res.status(200).json({
        date: new Date().toISOString(),
        commits: 0,
        alerted: true,
        message: "No commits today — alert email sent.",
      });
    }

    return res.status(200).json({
      date: new Date().toISOString(),
      commits: totalCommits,
      pushes,
      alerted: false,
      message: "Commits detected today. All good.",
    });
  } catch (err) {
    console.error("GitHub monitor error:", err);
    return res.status(500).json({ error: err.message || "Monitor failed" });
  }
}
