const GITHUB_USER = process.env.GITHUB_USERNAME || "umar24nov";
const STRONG_THRESHOLD = parseInt(process.env.STRONG_THRESHOLD || "5", 10);
const IST_OFFSET = 5.5 * 60 * 60 * 1000;

const esc = (s) =>
  String(s ?? "").replace(/[&<>"']/g, (c) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[c]));

const plural = (n) => (n === 1 ? "commit" : "commits");
const render = (tpl, n) => tpl.replaceAll("{n}", n).replaceAll("{c}", plural(n));

const ZERO = [
  ["Make your next move.", "Zero commits so far. Your day isn't over — make your next move."],
  ["Open the editor.", "Nothing pushed yet. Open the editor. Start."],
  ["Change the quiet.", "The repo is quiet. Change that."],
  ["One push changes the day.", "0 commits. One push can change the whole day."],
  ["Don't end at zero.", "Still at zero. Don't let the day end there."],
  ["Go build something.", "Your GitHub is waiting. Go build something."],
  ["Start small.", "No commits yet. Start small. Just start."],
  ["Make your code move.", "The clock is moving. Make your code move too."],
];

const LOW = [
  ["Keep it alive.", "Good start — {n} {c} today. Don't stop now."],
  ["Momentum.", "You've started. Keep the momentum alive."],
  ["Push further.", "A few {c} are progress. Push further."],
  ["Stay with it.", "Momentum is building. Stay with it."],
  ["Keep going.", "Keep going. Today's work is tomorrow's skill."],
  ["One more push.", "You're moving. One more push."],
  ["Don't lose the rhythm.", "Don't lose the rhythm now."],
  ["Keep building.", "Small progress still counts. Keep building."],
];

const STRONG = [
  ["That's the momentum.", "{n} {c} today. That's the momentum I wanted. Keep going."],
  ["Strong work.", "{n} {c}. You're building something real."],
  ["Now that's a day.", "{n} {c}. Now that's a productive day."],
  ["Keep pushing.", "Your GitHub is showing the work — {n} {c}. Keep pushing."],
  ["Finish strong.", "Excellent momentum — {n} {c}. Finish strong."],
  ["Respect the consistency.", "{n} {c} today. You're putting in the work. Respect it."],
];

const WRAPUP_GOOD = [
  ["Proud of today.", "{n} {c} today. Be proud of the work. Prepare for tomorrow."],
  ["Another step forward.", "Another day, another step forward — {n} {c}. Rest well. Tomorrow, we build again."],
  ["You showed up.", "You showed up today — that's what matters. Tomorrow is another chance to grow."],
  ["Progress is real.", "Great job today — {n} {c}. The progress is real. Get ready for tomorrow."],
  ["Rest and reset.", "You put in {n} {c} today. Now rest, reset, and come back stronger tomorrow."],
  ["See you tomorrow.", "Today's work is tomorrow's advantage — {n} {c}. Great job. See you tomorrow."],
  ["We go again.", "You made progress today — {n} {c}. Be proud of it. Tomorrow, we go again."],
];

const WRAPUP_LOW = [
  ["Tomorrow is still yours.", "Today wasn't your strongest day. That's okay. Tomorrow is still yours."],
  ["Reset tonight.", "One slow day doesn't define you. Reset tonight. Come back stronger tomorrow."],
  ["Attack tomorrow.", "Today is done. Learn from it, reset, and attack tomorrow."],
  ["Come back ready.", "You can do better tomorrow. Rest now. Come back ready."],
  ["Carry the lesson.", "The day is over. Don't carry the regret — carry the lesson."],
];

const STREAK_LINES = [
  "Day {n}. Don't break the chain.",
  "{n} days of showing up. Keep it alive.",
  "The streak is yours. Protect it.",
  "Consistency is becoming a habit.",
  "{n} days strong. Your future self is grateful.",
];

const STREAK_RISK = [
  "Day {n} is on the line. Protect it.",
  "{n} days of momentum — don't let it slip.",
  "The chain is {n} days long. One push keeps it alive.",
];

const BROKEN = [
  ["Keep the journey.", "The streak ended. The journey didn't."],
  ["Reset and rebuild.", "Reset. Start a new streak tomorrow."],
  ["The road continues.", "A streak fell today, but the road is still ahead."],
];

function istDate(iso) {
  return new Date(new Date(iso).getTime() + IST_OFFSET).toISOString().slice(0, 10);
}

function prevDay(iso) {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() - 1);
  return d.toISOString().slice(0, 10);
}

async function getActivity() {
  const commitsByDay = {};
  const pushesByDay = {};

  for (let page = 1; page <= 4; page++) {
    const url = `https://api.github.com/users/${GITHUB_USER}/events/public?per_page=100&page=${page}`;
    const res = await fetch(url, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "portfolio-github-monitor",
        ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
      },
    });

    if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);

    const events = await res.json();
    for (const e of events) {
      if (e.type !== "PushEvent") continue;
      const day = istDate(e.created_at);
      commitsByDay[day] = (commitsByDay[day] || 0) + (e.payload?.size ?? 1);
      pushesByDay[day] = (pushesByDay[day] || 0) + 1;
    }

    if (events.length < 100) break;
  }

  return { commitsByDay, pushesByDay };
}

function computeStreak(commitsByDay, today) {
  const days = new Set(Object.keys(commitsByDay).filter((d) => commitsByDay[d] > 0));
  let active = 0;
  for (let d = today; days.has(d); d = prevDay(d)) active++;
  let prev = 0;
  for (let d = prevDay(today); days.has(d); d = prevDay(d)) prev++;
  return { active, prev };
}

async function sendEmail({ subject, body, streakLine, count, pushes, dateStr }) {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY not configured");

  const to = process.env.CONTACT_TO || "umar24nov@gmail.com";
  const from = process.env.RESEND_FROM || "onboarding@resend.dev";

  const bodyHtml = esc(body) + (streakLine ? `<br/>${esc(streakLine)}` : "");

  const html = `
    <div style="font-family: -apple-system, 'Segoe UI', Roboto, monospace; background: #0a0a0f; color: #e6e6f0; padding: 20px; border-radius: 8px; border-top: 3px solid #00ff88;">
      <div style="font-size: 16px; line-height: 1.7;">${bodyHtml}</div>
      <div style="margin-top: 16px; font-size: 11px; color: #7a7a96;">${count} ${plural(count)} &middot; ${pushes} pushes &middot; ${esc(dateStr)} &middot; github.com/${esc(GITHUB_USER)}</div>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${key}`,
    },
    body: JSON.stringify({ from, to, subject, html }),
  });

  if (!res.ok) throw new Error(`Resend ${res.status}: ${await res.text()}`);
}

function pick(pool, key) {
  return pool[((key % pool.length) + pool.length) % pool.length];
}

export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Method not allowed" });

  const token = process.env.MONITOR_TOKEN;
  if (token && req.headers["x-monitor-token"] !== token && req.headers["authorization"] !== `Bearer ${token}`) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const istNow = new Date(Date.now() + IST_OFFSET);
    const today = istNow.toISOString().slice(0, 10);
    const hour = istNow.getUTCHours();
    const startOfYear = Date.UTC(istNow.getUTCFullYear(), 0, 1);
    const dayOfYear = Math.floor((istNow - startOfYear) / 86400000) + 1;
    const slot = hour >= 23 ? 4 : hour >= 21 ? 3 : hour >= 17 ? 2 : hour >= 13 ? 1 : 0;

    const { commitsByDay, pushesByDay } = await getActivity();
    const count = commitsByDay[today] || 0;
    const pushes = pushesByDay[today] || 0;
    const { active: activeStreak, prev: prevStreak } = computeStreak(commitsByDay, today);

    const dateStr = new Date().toLocaleDateString("en-IN", {
      timeZone: "Asia/Kolkata",
      weekday: "short",
      day: "numeric",
      month: "short",
    });

    let subject, body, streakLine = "";

    if (slot === 4) {
      if (count > 0) {
        [subject, body] = pick(WRAPUP_GOOD, dayOfYear + 1);
        body = render(body, count);
        if (activeStreak >= 2 && Math.random() < 0.6) streakLine = render(pick(STREAK_LINES, dayOfYear + slot + count), activeStreak);
      } else if (prevStreak >= 2) {
        [subject, body] = pick(BROKEN, dayOfYear + 2);
      } else {
        [subject, body] = pick(WRAPUP_LOW, dayOfYear + 3);
      }
    } else if (count === 0) {
      [subject, body] = pick(ZERO, dayOfYear + slot);
      if (prevStreak >= 2) streakLine = render(pick(STREAK_RISK, dayOfYear + slot + prevStreak), prevStreak);
    } else if (count >= STRONG_THRESHOLD) {
      [subject, body] = pick(STRONG, dayOfYear + slot + 4);
      body = render(body, count);
      if (activeStreak >= 2 && Math.random() < 0.5) streakLine = render(pick(STREAK_LINES, dayOfYear + slot + count), activeStreak);
    } else {
      [subject, body] = pick(LOW, dayOfYear + slot + 2);
      body = render(body, count);
      if (activeStreak >= 2 && Math.random() < 0.5) streakLine = render(pick(STREAK_LINES, dayOfYear + slot + count), activeStreak);
    }

    await sendEmail({ subject, body, streakLine, count, pushes, dateStr });

    return res.status(200).json({
      ok: true,
      date: new Date().toISOString(),
      today,
      slot,
      commits: count,
      pushes,
      activeStreak,
      prevStreak,
      subject,
      body,
      streakLine,
    });
  } catch (err) {
    console.error("GitHub monitor error:", err);
    return res.status(500).json({ error: err.message || "Monitor failed" });
  }
}
